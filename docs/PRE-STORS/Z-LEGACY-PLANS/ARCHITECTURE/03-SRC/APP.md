# App.tsx

## 🎯 Quick Summary
> **Purpose**: Central orchestrator that manages all state and coordinates component communication  
> **Type**: React Component  
> **Location**: `/src/App.tsx`  
> **Related**: [JTR](./JTR.md), [DIRECT-RENDERER](./DIRECT-RENDERER.md), [EVENT-SYSTEM](./EVENT-SYSTEM.md)

---

## 🔄 Simple Explanation

App.tsx is the **control center** that:
1. **Holds all state** (selections, visibility, settings)
2. **Listens for events** from components
3. **Updates state** based on events
4. **Passes state** to components via props

```
User Action → Event → App.tsx → State Update → Components Re-render
```

---

## 📋 Technical Specification

### State Management

```javascript
const [appState, setAppState] = useState({
  gridVisible: false,
  snapEnabled: false,
  multiSelectionCount: 0,
  selectedGroupId: null,
  leftSidebarVisible: true,
  rightSidebarVisible: true,
  libraryVisible: true,
  libraryCollapsed: false
})

const [selectedElement, setSelectedElement] = useState(null)
const [selectedElementData, setSelectedElementData] = useState(null)
const [selectedElementIds, setSelectedElementIds] = useState([])
const [canvasElements, setCanvasElements] = useState([])
```

### Events Listened

| Event | Purpose |
|-------|---------|
| `ui-action` | Toggle states, navigate, update properties |
| `element-selected` | Single element selection |
| `elements-selected` | Multiple element selection |
| `canvas-elements-updated` | Canvas state changes |
| `set-layout` | Layout switching |
| `jtor-action` | Actions from JSONtoREACT buttons |

### Component Registration

```javascript
const dataComponentsMap = {
  'direct-renderer': DirectRenderer,
  'library': Library,
  'layertree': LayerTree,
  'editors': Editors
}
```

### Main Render

```javascript
return (
  <JSONtoREACT
    theme="ui"
    appState={enhancedAppState}
    selectedElement={selectedElement}
    selectedElementData={selectedElementData}
    dataComponents={dataComponentsMap}
  />
)
```

---

## 🔗 Integration

### Inputs
- **Events**: From all components
- **Theme**: From runtimeThemeProcessor
- **URL Params**: For initial configuration

### Outputs  
- **Props**: To all components via JSONtoREACT
- **Events**: Property changes, save requests
- **State**: Enhanced state object

### Data Flow
```
Events → App.tsx → State Update → Props → Components
         ↑                                    ↓
         └────────── Events ←─────────────────┘
```

---

## 📊 Quick Reference

### State Properties
| Property | Type | Purpose |
|----------|------|---------|
| `gridVisible` | boolean | Grid overlay on/off |
| `snapEnabled` | boolean | Grid snapping on/off |
| `selectedElement` | string | Current selection ID |
| `canvasElements` | array | All canvas elements |
| `libraryVisible` | boolean | Library panel visibility |

### Key Methods
- `handleUIAction()` - Processes UI events
- `handleElementSelected()` - Updates selection
- `handleLayerTreeSelect()` - Multi-selection
- `handlePropertyChange()` - Property updates

### Enhanced State
```javascript
const enhancedAppState = {
  ...appState,
  canvasElements,
  selectedElementIds,
  // Handler functions for components
}