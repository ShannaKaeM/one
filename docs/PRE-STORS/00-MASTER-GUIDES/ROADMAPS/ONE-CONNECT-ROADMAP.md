# ONE-CONNECT System Documentation

## Overview
ONE-CONNECT is our unified component orchestration system that merges UIConnect (layout) + UISource (data) into a single, powerful system for building data-driven UIs.

---

## Core Architecture

### System Components
```
src/components/one-connect/
├── OneConnect.tsx          // Main orchestrator
├── types.ts               // Unified types
├── layoutBuilder.ts       // Grid/layout orchestration
├── dataHydrator.ts       // Data loading & transformation
├── componentLoader.ts     // Dynamic component loading
├── storeConnector.ts     // Zustand store subscriptions
└── GenericWrapper.tsx     // Generic container component
```

### Core Features
- **Layout Orchestration**: Dynamic grid-based layouts from theme
- **Data Hydration**: Automatic data loading from stores
- **Store Subscriptions**: Real-time updates from Zustand
- **Preset Mapping**: Theme-based styling system
- **Component Registry**: Dynamic component loading

---

## Theme Configuration

### Component Definition in ui-theme.json
```json
{
  "component-id": {
    "type": "ui",
    "data-component": "component-name",
    "data-source": "store.property",
    "data-subscriptions": ["store.property1", "store.property2"],
    "data-actions": {
      "onAction": "store.method"
    },
    "data-preset-targets": [":wrapper", "internal:preset"],
    "children": ["child1", "child2"]
  }
}
```

### Data Flow Properties
- **data-source**: Primary data source from stores
- **data-subscriptions**: Store properties to watch for changes
- **data-actions**: Map UI events to store methods
- **data-preset-targets**: Apply presets to wrapper and internal elements

---

## Current Status

### ✅ Phase 1: Foundation COMPLETE
- Built ONE-CONNECT core system
- Created all 7 system files
- Integrated with existing theme system
- Switched App.tsx from UIConnect to ONE-CONNECT

### ✅ Phase 2: Component Integration COMPLETE
All components updated to ONE-CONNECT pattern:
- **LayerTree**: Direct store access, no props
- **Library**: Removed onAddToCanvas, uses stores
- **LayoutSwitcher**: Uses uiStore/presetStore
- **CanvasControls**: Direct store integration
- **Editors**: All sub-components ONE-CONNECT ready

**Note**: Component-specific details in individual roadmaps

### ✅ Phase 3: DirectRenderer COMPLETE
- Updated component registration for ONE-CONNECT
- Removed all prop dependencies  
- All data flows through stores
- Child components already using stores correctly

### ✅ Phase 4: App.tsx Cleanup COMPLETE
- Reduced from 548 to 105 lines
- Removed ALL event listeners
- Deleted appState object
- Zero local state
- Extracted utilities
- Clean initialization only

---

## Store Integration

### Required Store Methods
Components in theme may reference these store methods:
- `oneStore.updateElement(id, updates)`
- `oneStore.updateElementStyle(id, property, value)`
- `oneStore.getElementStyle(id, property)` ✅ Added
- `uiStore.toggleGrid()`
- `uiStore.toggleSnap()`
- `uiStore.setLayout(layout)`
- `presetStore.switchLayout(layout)`
- `elementStore.createElement(type)`

### Store Connections
```typescript
const stores = { 
  uiStore, 
  oneStore, 
  libraryStore, 
  presetStore, 
  projectStore,
  elementStore
};
```

---

## Component Registration

### Pattern for ONE-CONNECT Components
```typescript
componentRegistry.register('component-name', {
  mapProps: (element, appState) => {
    const dataProps = element.data || {};
    
    return {
      // Only pass through display props
      className: element.props?.className,
      presetClassMap: element.props?.presetClassMap || {},
      // Data comes through ONE-CONNECT
    };
  },
  supportedTargets: ['container', 'internal-elements'],
  defaultProps: {}
});
```

---

## Benefits Achieved

1. **Unified Data Flow**: All components use stores directly
2. **No Event System**: Direct store actions instead of events
3. **Type Safety**: Full TypeScript support
4. **Dynamic Layouts**: Theme-driven UI structure
5. **Real-time Updates**: Automatic re-renders on store changes
6. **Clean Architecture**: Separation of concerns

---

## Files Deleted ✅

Successfully removed:
- `elementFactory.ts` ✅ (migrated to elementStore)
- `elementActions.ts` ✅ (migrated to oneStore)
- `UIConnect/` folder ✅ (replaced by ONE-CONNECT)
- `UISource/` folder ✅ (replaced by ONE-CONNECT)
- `useElementHandlers.ts` ✅ (event-based, not needed)

Still keeping:
- `elementRenderer.ts` ✅ (pure function)
- `componentRegistry.ts` ✅ (setup)
- `registerComponents.ts` ✅ (setup)

---

## Next Steps

### ✅ ONE-CONNECT Phase 1: Data Flow COMPLETE 🎉

**All components migrated:**
- DirectRenderer ✅
- Library ✅  
- LayerTree ✅
- Editors ✅
- CanvasControls ✅
- LayoutSwitcher ✅
- App.tsx ✅

**Zero event-based communication:**
- All event listeners removed
- Direct store integration everywhere
- Clean data flow throughout

### 🚧 Ready for Phase 2: Styling & Presets

**Component Styling Refactor:**
1. Remove inline styles from components
2. Apply theme presets properly
3. One component at a time (careful approach)
4. Organize unified composable presets
5. Test each component thoroughly

**Component Splitting (after styling):**
- Break up large components if needed
- DirectRenderer modularization postponed

### Final Steps (after Phase 2):
1. **Clean Up Utils**: Delete deprecated files
2. **Final Testing**: Full integration test
3. **Performance**: Check for unnecessary re-renders
4. **Documentation**: Final architecture docs

---

## Success Criteria

### Phase 1 (COMPLETE) ✅
- [x] All components use ONE-CONNECT pattern
- [x] Zero event listeners for state management
- [x] Direct store integration everywhere
- [x] DirectRenderer refactored
- [x] App.tsx cleaned up (105 lines)
- [x] All event-based communication removed

### Phase 2 (Pending)
- [ ] Component styling refactored
- [ ] Inline styles removed
- [ ] Theme presets applied
- [ ] Old utils deleted
- [ ] Full system test complete

---

*ONE-CONNECT: Unified orchestration for modern React apps!*