# Layout System & State Management Roadmap

## 🎯 Project Overview

**Goal**: Create a robust, dynamic layout system with state persistence that works as a foundational feature across all themes (ui, one, and future themes).

**Core Problems**: 
1. Layout switching loses canvas content when components unmount/remount
2. Layout IDs are hardcoded in GeneralControls, breaking when theme authors change names
3. No dynamic discovery of available layouts from themes

**Core Principle**: The UI theme is dogfooding for the actual one app - we need production-ready patterns, not quick fixes.

---

## 📋 Current State Analysis

**Update (Jan 7, 2025)**: Layout switching works but canvas rendering is broken. See SESSION-01-COMPONENT-REGISTRY-REFACTOR.md for details.

### What We Have Now

1. **Layout Presets in ui-theme.json**:
   - `dashboard`: Full dashboard with all panels
   - `dashboard-library`: Library + Canvas view
   - `dashaboard-canvas`: Canvas only
   - `dashboard-library`: Library only

2. **Current Behavior**:
   - Switching layouts replaces the entire structure
   - Canvas content disappears because DirectRenderer unmounts/remounts
   - Canvas elements are stored in DirectRenderer's local state
   - State is lost during layout transitions

3. **Architecture**:
   ```
   App.tsx
   └── JSONtoREACT
       └── DirectRenderer (holds canvas elements state)
           └── Canvas content
   ```

---

## 🏗️ Solution Options Analysis

### Option 1: Lift State to App.tsx

**Implementation**:
```javascript
// App.tsx becomes the source of truth for ALL application state
const [canvasElements, setCanvasElements] = useState<any[]>([]);
const [selectedElements, setSelectedElements] = useState<string[]>([]);
const [hiddenElements, setHiddenElements] = useState<Set<string>>(new Set());

// Pass down through props
<JSONtoREACT 
  appState={{
    ...appState,
    canvasElements,
    onCanvasElementsChange: setCanvasElements
  }}
/>
```

**Pros**:
- ✅ Canvas state persists through layout changes
- ✅ Single source of truth for application state
- ✅ Easy to implement undo/redo at app level
- ✅ Can share state between different views/layouts
- ✅ Follows React best practices for state management

**Cons**:
- ❌ More prop drilling through components
- ❌ App.tsx becomes larger and more complex
- ❌ Potential performance issues with frequent updates
- ❌ Tighter coupling between components

**Best For**: Applications where state needs to be shared across multiple views

---

### Option 2: Global State Management (Context/Store)

**Implementation**:
```javascript
// Create a CanvasContext or use a state management library
const CanvasContext = createContext({
  elements: [],
  selectedIds: [],
  updateElements: () => {},
  // ... other canvas state
});

// Wrap app with provider
<CanvasProvider>
  <JSONtoREACT />
</CanvasProvider>
```

**Pros**:
- ✅ No prop drilling
- ✅ Any component can access canvas state
- ✅ Cleaner component interfaces
- ✅ Easier to add new state consumers
- ✅ Natural place for undo/redo, autosave, etc.

**Cons**:
- ❌ More boilerplate code
- ❌ Need to decide on state management approach (Context, Zustand, etc.)
- ❌ Can make components harder to test in isolation
- ❌ Risk of overuse leading to unnecessary re-renders

**Best For**: Complex applications with many components needing canvas state

---

### Option 3: Persistent Storage with Hydration

**Implementation**:
```javascript
// Before layout change
await storageManager.saveState('canvas-elements', elements);

// DirectRenderer on mount
useEffect(() => {
  const loadState = async () => {
    const saved = await storageManager.loadState('canvas-elements');
    if (saved) setElements(saved);
  };
  loadState();
}, []);
```

**Pros**:
- ✅ State survives page refreshes
- ✅ Natural autosave point
- ✅ Can implement versioning/history
- ✅ Minimal changes to current architecture
- ✅ Good for PWA/offline functionality

**Cons**:
- ❌ Async operations add complexity
- ❌ Storage limits and performance considerations
- ❌ Need to handle storage failures
- ❌ Slight delay when switching layouts

**Best For**: Applications needing persistence beyond session

---

### Option 4: Component Key Stabilization

**Implementation**:
```javascript
// Ensure DirectRenderer maintains same key across layouts
<DirectRenderer key="main-canvas" />

// Or use React.memo with custom comparison
const MemoizedDirectRenderer = React.memo(DirectRenderer, (prev, next) => {
  // Custom comparison to prevent unnecessary unmounts
});
```

**Pros**:
- ✅ Minimal code changes
- ✅ React handles state preservation
- ✅ No architectural changes needed
- ✅ Fast implementation

**Cons**:
- ❌ May not work if parent structure changes significantly
- ❌ Relies on React reconciliation behavior
- ❌ Limited control over when state is preserved
- ❌ Brittle - small changes could break it

**Best For**: Quick fixes when layout changes are minimal

---

## 🎯 Recommended Approach: Hybrid Solution

### Phase 1: Lift Critical State (1-2 days)
1. Move canvas elements to App.tsx
2. Keep UI state (selection, hover, etc.) local
3. Pass down via appState prop

### Phase 2: Add Persistence Layer (2-3 days)
1. Implement auto-save to localStorage
2. Add session recovery
3. Handle state migrations

### Phase 3: Optimize with Context (3-4 days)
1. Create CanvasContext for frequently accessed state
2. Keep App.tsx for top-level orchestration
3. Prevent unnecessary re-renders

### Why This Approach?

1. **Immediate Win**: Canvas content persists through layout changes
2. **Future Proof**: Sets foundation for transformer components
3. **Production Ready**: Handles edge cases and failures
4. **Dogfooding Value**: Creates patterns reusable in one app

---

## 📊 Implementation Plan

**⚠️ PREREQUISITE**: Fix canvas rendering issue first (SESSION-01-COMPONENT-REGISTRY-REFACTOR.md)

### Week 1: Foundation
- [ ] Lift canvas elements state to App.tsx
- [ ] Update DirectRenderer to use props instead of local state
- [ ] Test layout switching with state preservation
- [ ] Ensure all element operations still work

### Week 2: Enhancement
- [ ] Add localStorage persistence
- [ ] Implement state versioning
- [ ] Add loading states during hydration
- [ ] Create state migration utilities

### Week 3: Optimization
- [ ] Profile performance with large element counts
- [ ] Implement selective re-rendering
- [ ] Add Canvas Context if needed
- [ ] Document state management patterns

---

## 🚀 Future Considerations

### Transformer Components
With lifted state, transformer components can:
- Pre-populate with default content
- Accept dropped elements into specific zones
- Maintain their own internal transformations
- Share transformed results back to canvas

### Layout-Specific Content
Each layout preset can include:
```json
"db-library-canvas": {
  "defaultCanvasElements": [
    {
      "type": "one",
      "presetType": "dropzone",
      "content": { "placeholder": "Drop items here" }
    }
  ]
}
```

### Multi-Canvas Support
Lifted state enables:
- Split views with different canvases
- Canvas comparison/diff views
- Template/instance relationships
- Real-time collaboration preparation

---

## 🔍 Decision Factors

### Choose Option 1 (Lift to App) if:
- You want the simplest implementation
- State sharing between layouts is important
- You're okay with some prop drilling
- Performance isn't a critical concern yet

### Choose Option 2 (Global State) if:
- Many components need canvas access
- You're building a complex editor
- You want maximum flexibility
- You're comfortable with state management libraries

### Choose Option 3 (Persistence) if:
- Users expect work to survive refreshes
- Autosave is a requirement
- You need version history
- Offline support is planned

### Choose Option 4 (Key Stabilization) if:
- You need a quick fix now
- Layout changes are minimal
- You plan to refactor later
- Testing the concept

---

---

## 🏗️ Combined Solution Architecture

### Phase 1: State Management Foundation (2-3 days)

**Lift State to App.tsx** (Partially Complete ✅)
- Canvas elements state lifted
- Layout state managed at app level
- Component assignments tracked
- Pass down through appState

**Benefits**:
- Canvas state persists through layout changes
- Single source of truth
- Foundation for undo/redo
- Shared state between layouts

### Phase 2: Dynamic Layout Switcher Component (3-4 days)

**New LayoutSwitcher Component**
```typescript
interface LayoutSwitcherProps {
  theme?: string;                    // Current theme (ui, one, etc.)
  activeLayout?: string;             // Currently active layout
  onLayoutChange?: (layout: string) => void;
  displayMode?: 'icons' | 'labels' | 'both';
  availableLayouts?: string[];       // Optional: restrict to specific layouts
}
```

**Dynamic Discovery**:
```typescript
const discoverLayouts = (theme: string) => {
  const themeConfig = runtimeThemeProcessor.getTheme(theme);
  const layouts = themeConfig?.presets?.layouts || {};
  
  return Object.entries(layouts).map(([id, config]) => ({
    id,
    label: config.label || id,
    icon: config.icon || generateIcon(config),
    children: config.children
  }));
};
```

**Registry Integration**:
```typescript
componentRegistry.register('layout-switcher', {
  mapProps: (element, appState) => ({
    theme: element.props?.theme || 'ui',
    activeLayout: appState?.activeLayout,
    onLayoutChange: (layout: string) => {
      window.dispatchEvent(new CustomEvent('set-layout', {
        detail: { layout }
      }));
    }
  })
});
```

### Phase 3: State Persistence Layer (2-3 days)

**Auto-save to localStorage**:
```javascript
// Before layout change
await storageManager.saveState('canvas-elements', elements);

// After layout change
const saved = await storageManager.loadState('canvas-elements');
if (saved) setElements(saved);
```

**Benefits**:
- State survives refreshes
- Natural autosave points
- Version history possible
- Works offline

### Phase 4: Enhanced Features (3-4 days)

1. **Smart Icon Generation**
   - Analyze grid structure
   - Create visual representations
   - Cache generated icons

2. **Layout Categories**
   ```json
   "layoutCategories": {
     "standard": ["dashboard", "canvas-focused"],
     "library": ["library-only", "library-full"],
     "custom": []
   }
   ```

3. **Custom Layout Creation**
   - UI for creating layouts
   - Save to theme
   - Share between projects

---

## 📝 Next Steps

1. **Fix CSS Grid layout issue** (components currently stacking)
2. **Implement Phase 1 state lifting** with LayoutSwitcher in mind
3. **Create LayoutSwitcher component** following its roadmap
4. **Test with real content** to ensure patterns work at scale
5. **Document the patterns** for use in the one app

---

## ❓ Questions to Answer

1. **How important is offline/persistence?**
   - Affects whether we prioritize Option 3

2. **How many components will need canvas state?**
   - Affects choice between Option 1 and 2

3. **What's the timeline pressure?**
   - Affects whether we can do the full hybrid approach

4. **How complex will transformer components be?**
   - Affects how sophisticated our state management needs to be

5. **Will we need undo/redo?**
   - Affects whether we need global state management

---

## 📊 Implementation Checklist

### State Management
- [x] Lift canvas elements state to App.tsx
- [x] Move auto-assignments to App level
- [ ] Implement state persistence layer
- [ ] Add context optimization
- [ ] Create undo/redo system

### Layout Switcher Component
- [ ] Create LayoutSwitcher component
- [ ] Implement dynamic discovery
- [ ] Add to component registry
- [ ] Generate visual icons
- [ ] Support layout categories
- [ ] Enable custom layouts

### Integration
- [ ] Refactor GeneralControls
- [ ] Update theme structure
- [ ] Test with both themes
- [ ] Document for theme authors

---

## 🎯 Success Criteria

- [ ] Canvas content persists through all layout changes
- [ ] Layout IDs discovered dynamically (no hardcoding)
- [ ] Works with ui, one, and future themes
- [ ] No performance degradation with 100+ elements
- [ ] State management pattern is reusable in one app
- [ ] Clear visual indicators of layout structure
- [ ] Easy to add new layouts without code changes
- [ ] Transformer components can be easily added
- [ ] Layout presets can include default content

---

## 🔍 Technical Considerations

### Performance
- Cache discovered layouts
- Minimize re-renders during switching
- Lazy load layout configurations
- Optimize state updates

### Error Handling
- Graceful fallback for missing layouts
- Clear error messages
- Recovery mechanisms
- Validate grid configurations

### Cross-Theme Support
- Theme-aware switching
- Remember last layout per theme
- Handle theme changes gracefully
- Support layout inheritance

---

## 🚀 Current Status & Next Steps

**Session 02 Update**:
- ✅ State partially lifted to App.tsx
- ✅ Auto-assignments moved to App level
- ❌ CSS Grid broken (components stacking)
- ❌ Layout switcher still hardcoded

**Immediate Next Steps**:
1. Fix CSS Grid stacking issue
2. Complete Phase 1 state lifting
3. Implement LayoutSwitcher component
4. Add persistence layer
5. Test with real content

---

## 📚 References

- Previous implementation: `/docs/04-LOGS-DASHBOARD/SESSION-05-LAYOUT-TOGGLES.md`
- Current theme structure: `/public/data/themes/ui-theme.json`
- DirectRenderer: `/src/components/DirectRenderer.tsx`
- App state management: `/src/App.tsx`
- Original goals: `/docs/08-LOGS-CONTENT/CONTENT-ROADMAP.md`