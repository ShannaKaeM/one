# Data Component System Guide

## 🎯 Overview

The Data Component System allows JSONtoREACT (JTR) to dynamically insert React components without hardcoding. Any component can be registered and used through the theme configuration.

---

## 🏗️ How It Works

### 1. Component Registration

Register your component in `registerComponents.ts`:

```javascript
componentRegistry.register('your-component', {
  mapProps: (element, appState) => ({
    // Map props from element config and appState
    someProp: element.props?.someProp,
    dataFromApp: appState?.someData,
    onClick: () => { /* handle events */ }
  }),
  supportedTargets: ['container', 'button'], // For preset targeting
  defaultProps: {
    someProp: 'default value'
  }
});
```

### 2. Use in Theme

Add to your theme structure (`ui-theme.json`):

```json
{
  "type": "ui",
  "data-label": "my-component",
  "data-component": "your-component",
  "data-preset-targets": [
    ":container-preset"
  ],
  "props": {
    "someProp": "custom value"
  }
}
```

### 3. JTR Processing

JSONtoREACT automatically:
1. Detects `data-component` attribute
2. Looks up component in registry
3. Calls `mapProps` to prepare props
4. Renders the React component
5. Wraps in styled div with grid area

---

## 📦 Registered Components

### DirectRenderer
```javascript
componentRegistry.register('direct-renderer', {
  mapProps: (element, appState) => ({
    theme: element.props?.theme || 'one',
    gridVisible: appState?.gridVisible,
    snapEnabled: appState?.snapEnabled
  })
});
```

### Library
```javascript
componentRegistry.register('library', {
  mapProps: (element, appState) => ({
    onAddToCanvas: (item) => {
      window.dispatchEvent(new CustomEvent('import-content', {
        detail: { type: 'elements', data: [item] }
      }));
    }
  })
});
```

### LayerTree
```javascript
componentRegistry.register('layertree', {
  mapProps: (element, appState) => ({
    elements: appState?.canvasElements || [],
    selectedIds: appState?.selectedElementIds || [],
    onSelect: appState?.onLayerTreeSelect
  })
});
```

### Editors
```javascript
componentRegistry.register('editors', {
  mapProps: (element, appState) => ({
    selectedElement: appState?.selectedElementData,
    onPropertyChange: (property, value) => {
      // Dispatch property change event
    }
  })
});
```

### CanvasControls
```javascript
componentRegistry.register('canvas-controls', {
  mapProps: (element, appState) => ({
    gridVisible: appState?.gridVisible,
    snapEnabled: appState?.snapEnabled,
    onGridToggle: (visible) => {
      window.dispatchEvent(new CustomEvent('grid-toggle', {
        detail: { visible }
      }));
    }
  })
});
```

### LayoutSwitcher
```javascript
componentRegistry.register('layout-switcher', {
  mapProps: (element, appState) => ({
    theme: element.props?.theme || 'ui',
    activeLayout: appState?.activeLayout,
    displayMode: element.props?.displayMode || 'icons'
  })
});
```

---

## 🎨 Preset Targeting

Components can style internal elements using preset targets:

```json
{
  "data-component": "layertree",
  "data-preset-targets": [
    ":layertree-container",
    "title-group:section-header",
    "tree-item:hover-effect"
  ]
}
```

Format: `internal-class:preset-name` or `:wrapper-preset` 

---

## 🔄 Data Flow

```
App.tsx (State)
    ↓
JSONtoREACT (Props)
    ↓
Component Registry (mapProps)
    ↓
React Component (Render)
```

### Key Points:
- State lives in App.tsx
- Registry maps state to props
- Components dispatch events
- App.tsx handles events and updates state

---

## 🔧 Adding New Components

### 1. Create Component
```javascript
export function MyComponent({ data, onAction }) {
  return <div onClick={() => onAction(data)}>...</div>
}
```

### 2. Register It
```javascript
componentRegistry.register('my-component', {
  mapProps: (element, appState) => ({
    data: appState?.myData,
    onAction: (data) => {
      window.dispatchEvent(new CustomEvent('my-action', {
        detail: { data }
      }));
    }
  })
});
```

### 3. Add to Theme
```json
{
  "data-component": "my-component"
}
```

### 4. Handle Events in App
```javascript
window.addEventListener('my-action', (e) => {
  // Update state based on action
});
```

---

## 🐛 Troubleshooting

### Component Not Rendering
- Check if registered in `registerComponents.ts`
- Verify `data-component` name matches
- Look for console errors
- Check if component is in `dataComponentsMap`

### Props Not Passing
- Add console.log in `mapProps`
- Verify appState has the data
- Check prop names match

### Events Not Working
- Verify event listener in App.tsx
- Check event name matches
- Console.log in event handler

---

## 🚀 Benefits

1. **No Hardcoding** - Add components without touching JTR
2. **Reusable** - Same component in multiple places
3. **Configurable** - Props from theme config
4. **Maintainable** - Clear separation of concerns
5. **Testable** - Components isolated from JTR

---

## 📝 Quick Reference

**Files:**
- `/src/utils/componentRegistry.ts` - Registry system
- `/src/utils/registerComponents.ts` - Component registration
- `/src/components/JSONtoREACT.tsx` - Integration point
- `/src/App.tsx` - State and event handling

**Key Functions:**
- `componentRegistry.register()` - Register component
- `componentRegistry.processElement()` - Get mapped props
- `parsePresetTargets()` - Handle preset targeting

**Theme Attributes:**
- `data-component` - Component to render
- `data-preset-targets` - Style targeting
- `props` - Custom component props