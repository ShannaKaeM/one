# Data Component Insertion & Preset Targeting Roadmap

## 🎯 Project Overview

**Goal**: Create a dynamic, plugin-based system for data component insertion in JTR with full preset targeting support.

**Core Problem**: Currently, JTR has hardcoded handling for each data component (Library, LayerTree, Editors), preventing dynamic styling and preset targeting from working properly.

---

## 📋 Current State - The Problem

### What's Broken

1. **Hardcoded Component Handling in JTR**:
```javascript
// Current hardcoded approach (lines 235-310 in JSONtoREACT.tsx)
...(element['data-component'] === 'library' ? {
  onAddToCanvas: (item) => { /* hardcoded handler */ }
} : {}),
...(element['data-component'] === 'layertree' ? {
  elements: appState?.canvasElements || [],
  onSelect: appState?.onLayerTreeSelect || (() => {}),
  // etc...
} : {})
```

2. **Preset Targeting Not Working**:
```json
// This doesn't work as expected:
"data-preset-targets": [
  ":layertree-container",
  "title-group:layertree-title-group",
  "title-text:layertree-title-text"  // Can't style this!
]
```

3. **Why It Fails**:
- JTR wraps components but doesn't pass through preset mappings properly
- Components don't know about their preset targets
- Internal component structure isn't accessible for styling

---

## 🏗️ Solution Architecture

### Component Registry Pattern

```typescript
// New approach - dynamic component registry
interface ComponentHandler {
  mapProps: (element: any, appState: any) => object;
  supportedTargets?: string[];
  defaultProps?: object;
}

const componentRegistry: Record<string, ComponentHandler> = {
  'library': {
    mapProps: (element, appState) => ({
      onAddToCanvas: createAddToCanvasHandler(),
      // Other props dynamically mapped from element config
    }),
    supportedTargets: ['grid', 'header', 'items'],
    defaultProps: { /* defaults */ }
  },
  'layertree': {
    mapProps: (element, appState) => ({
      elements: appState?.canvasElements || [],
      onSelect: appState?.onLayerTreeSelect,
      // Props from theme configuration
      ...element.componentProps
    }),
    supportedTargets: ['container', 'title-group', 'title-text', 'item']
  }
};
```

### Preset Target Flow

```
Theme Definition → JTR Processing → Component Wrapper → Internal Elements

"data-preset-targets": [
  ":container",              // Applied to wrapper div by JTR
  "header:dark-header",      // Passed to component as presetClassMap
  "title:bold-text"          // Component applies to internal elements
]
```

---

## 📐 Implementation Plan

### Phase 1: Component Registry System ✅ COMPLETE (Jan 7, 2025)

#### 1.1 Create Registry Infrastructure
```typescript
// utils/componentRegistry.ts
export class ComponentRegistry {
  private handlers: Map<string, ComponentHandler> = new Map();
  
  register(name: string, handler: ComponentHandler) {
    this.handlers.set(name, handler);
  }
  
  getHandler(name: string): ComponentHandler | null {
    return this.handlers.get(name) || null;
  }
  
  processElement(element: any, appState: any) {
    const handler = this.getHandler(element['data-component']);
    if (!handler) return null;
    
    return {
      props: handler.mapProps(element, appState),
      targets: handler.supportedTargets
    };
  }
}

export const componentRegistry = new ComponentRegistry();
```

#### 1.2 Update JTR to Use Registry
```typescript
// In JSONtoREACT.tsx
if (element['data-component']) {
  const result = componentRegistry.processElement(element, appState);
  
  if (result) {
    const ComponentToRender = dataComponents[element['data-component']];
    
    if (ComponentToRender) {
      // Parse preset targets
      const presetTargetMappings = parsePresetTargets(
        element['data-preset-targets'],
        result.targets
      );
      
      children = createElement(ComponentToRender, {
        key: `${props.key}-component`,
        ...result.props,
        presetClassMap: presetTargetMappings,
        className: wrapperClass
      });
    }
  }
}
```

#### 1.3 Register Components
```typescript
// In App.tsx or separate registration file
componentRegistry.register('library', {
  mapProps: (element, appState) => ({
    onAddToCanvas: (item) => {
      window.dispatchEvent(new CustomEvent('import-content', {
        detail: { type: 'elements', data: [createElementFromItem(item)] }
      }));
    },
    // Map any custom props from theme
    ...element.props
  }),
  supportedTargets: ['container', 'header', 'grid', 'item-card']
});

componentRegistry.register('layertree', {
  mapProps: (element, appState) => ({
    elements: appState?.canvasElements || [],
    selectedIds: appState?.selectedElementIds || [],
    onSelect: appState?.onLayerTreeSelect,
    onReorder: appState?.onReorder,
    // Include theme-defined props
    showTitle: element.showTitle !== false,
    titleText: element.titleText || 'Layers',
    ...element.props
  }),
  supportedTargets: ['container', 'title-group', 'title-text', 'tree-item', 'icon']
});
```

---

### Phase 2: Preset Target Enhancement (2-3 days)

#### 2.1 Update Components to Use Preset Classes

**LayerTree Example**:
```typescript
export function LayerTree({ presetClassMap = {}, showTitle, titleText, ...props }) {
  return (
    <div className={`layertree ${presetClassMap['container'] || ''}`}>
      {showTitle && (
        <div className={`layertree-header ${presetClassMap['title-group'] || ''}`}>
          <span className={`layertree-icon ${presetClassMap['title-icon'] || ''}`}>
            📁
          </span>
          <span className={`layertree-title ${presetClassMap['title-text'] || ''}`}>
            {titleText}
          </span>
        </div>
      )}
      {/* rest of component */}
    </div>
  );
}
```

#### 2.2 Enhanced Preset Target Syntax
```json
{
  "data-component": "layertree",
  "data-preset-targets": [
    ":layertree-container",           // Wrapper
    "container:custom-container",      // Component root
    "title-group:dark-header",         // Header group
    "title-text:large-text editable",  // Title text
    "tree-item:hover-effect"           // All tree items
  ],
  "props": {
    "showTitle": true,
    "titleText": "My Layers",
    "allowRename": true
  }
}
```

---

### Phase 3: Theme-Driven Props (1-2 days)

#### 3.1 Allow Theme to Define Component Props
```json
// In ui-theme.json
"layertree": {
  "type": "ui",
  "data-label": "layertree",
  "data-component": "layertree",
  "data-preset-targets": [...],
  "props": {
    "showTitle": true,
    "titleText": "Layers",
    "allowRename": true,
    "showVisibility": true,
    "showLock": true,
    "iconSet": "minimal"  // Theme can control icon style
  }
}
```

#### 3.2 Dynamic Prop Validation
```typescript
// Component handler can validate/transform props
componentRegistry.register('layertree', {
  mapProps: (element, appState) => {
    const themeProps = element.props || {};
    
    // Validate and provide defaults
    return {
      showTitle: themeProps.showTitle ?? true,
      titleText: themeProps.titleText || 'Layers',
      iconSet: ['minimal', 'outlined', 'filled'].includes(themeProps.iconSet) 
        ? themeProps.iconSet 
        : 'minimal',
      // ... rest of props
    };
  }
});
```

---

## 🎯 Benefits After Implementation

### 1. **Full Theme Control**
- Change LayerTree title without touching code
- Style internal elements via presets
- Add/remove features via props

### 2. **Dynamic Component Behavior**
```json
// Different layouts can have different LayerTree configs
"compact-layertree": {
  "data-component": "layertree",
  "props": {
    "showTitle": false,
    "compact": true,
    "iconSet": "none"
  }
}
```

### 3. **Preset Targeting Works**
- Style any internal element
- Components expose their styleable parts
- Theme has full control over appearance

### 4. **Plugin Architecture**
- Add new components without modifying JTR
- Components self-register their handlers
- Extensible and maintainable

---

## 📊 Implementation Checklist

### Phase 1: Registry System ✅ COMPLETE
- [x] Create componentRegistry utility
- [x] Update JTR to use registry instead of hardcoded handlers
- [x] Move Library handler to registry
- [x] Move LayerTree handler to registry  
- [x] Move Editors handler to registry
- [x] Added GeneralControls, CanvasControls, CombinedControls to registry
- [⚠️] Test all components still work - **BLOCKED by canvas rendering issue**

### Phase 2: Preset Targeting
- [ ] Update Library to use presetClassMap
- [ ] Update LayerTree to use presetClassMap
- [ ] Update Editors to use presetClassMap
- [ ] Document supported targets for each component
- [ ] Test preset targeting on all components

### Phase 3: Theme Props
- [ ] Add props support to theme JSON
- [ ] Update registry handlers to pass through props
- [ ] Add prop validation/defaults
- [ ] Update theme with example props
- [ ] Test dynamic prop changes

---

## 🔍 Testing Strategy

### Unit Tests
1. Registry registration and retrieval
2. Prop mapping for each component
3. Preset target parsing

### Integration Tests
1. JTR renders components with registry
2. Preset classes apply correctly
3. Props flow from theme to component
4. Events still work (onSelect, etc.)

### Visual Tests
1. LayerTree title can be edited via theme
2. All preset targets apply styles
3. Components respond to prop changes
4. No regression in functionality

---

## 📚 Documentation Needed

### For Developers
1. How to register a new data component
2. How to expose preset targets
3. Prop validation patterns
4. Event handling patterns

### For Theme Authors  
1. Available data components
2. Supported preset targets per component
3. Available props per component
4. Examples of customization

---

## ✅ JTR Balance Assessment

**Update (Jan 7, 2025)**: Phase 1 complete! JTR is now properly balanced.

After completing this roadmap, JTR will be:

### Well-Balanced ✓
- **Single Responsibility**: Convert JSON to React elements
- **Not Doing Too Much**: Component logic moved to registry
- **Extensible**: Plugin architecture for new components
- **Maintainable**: No hardcoded component handling

### Remaining Responsibilities
1. Parse JSON structure
2. Apply auto-IDs and grid areas
3. Create div wrappers with classes
4. Delegate to registry for data components
5. Handle events (onClick, etc.)
6. Process @ references (if kept)

### What Moves Out
1. Component-specific prop mapping → Registry handlers
2. Hardcoded event handlers → Registry handlers
3. Component knowledge → Self-contained in handlers

---

## 🚀 Next Steps

**Update (Jan 7, 2025)**: Architecture approved and Phase 1 implemented!

1. ✅ **Approve this architecture** - Approved and implemented
2. ✅ **Start with Phase 1** - Registry system complete
3. ⚠️ **Test with LayerTree** - Blocked by canvas issue
4. ✅ **Document as we go** - Session log created
5. ✅ **Roll out to all components** - All components registered

### Remaining Work:
1. Fix canvas rendering issue (critical blocker)
2. Phase 2: Implement preset targeting for all components
3. Phase 3: Add theme-driven props support

This approach will give you the dynamic, theme-driven component system you need while keeping JTR focused and balanced.