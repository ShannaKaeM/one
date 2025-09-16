# LayerTree

## 🎯 Quick Summary
> **Purpose**: Hierarchical layer panel showing canvas elements with selection and management  
> **Type**: React Component  
> **Location**: `/src/components/LayerTree.tsx`  
> **Related**: [DIRECT-RENDERER](./DIRECT-RENDERER.md), [APP](../APP.md), [JSONtoREACT](./JSONtoREACT.md)

---

## 🔄 Simple Explanation

The LayerTree is the **layer panel** that shows all canvas elements in a hierarchical tree structure:

1. **Displays elements** - Shows all canvas elements with icons and names
2. **Manages hierarchy** - Groups and nested elements with expand/collapse
3. **Handles selection** - Single/multi-select with shift+click
4. **Controls visibility** - Eye icon to show/hide elements
5. **Lock functionality** - Lock icon to prevent element modification
6. **Drag & drop reorder** - Reorder elements via drag and drop
7. **Inline renaming** - Double-click to rename elements *is this tied to the data-lable, it shouldbe*

```
Canvas elements → Hierarchical tree → User interactions → Events to DirectRenderer
```

---

## 📋 Technical Specification

### Component Props

```typescript
{
  elements: any[];                         // All canvas elements
  selectedIds: string[];                   // Currently selected element IDs
  onSelect: (ids: string[]) => void;      // Selection callback
  onReorder?: (dragId, dropId) => void;  // Drag reorder callback
  onVisibilityToggle?: (id, visible) => void;    // Visibility callback
  onLockToggle?: (id, locked) => void;          // Lock callback
  onRename?: (id, newName) => void;             // Rename callback
  className?: string;                            // CSS class
  presetClassMap?: Record<string, string>;       // Preset overrides
}
```

### State Management

```typescript
const [expandedGroups, setExpandedGroups] = useState<Set<string>>()   // Expanded groups
const [hiddenElements, setHiddenElements] = useState<Set<string>>()   // Hidden elements
const [lockedElements, setLockedElements] = useState<Set<string>>()   // Locked elements
const [draggedElement, setDraggedElement] = useState<string | null>() // Drag state
const [editingElement, setEditingElement] = useState<string | null>() // Editing state
```

### Tree Building Logic

```javascript
const buildTree = () => {
  // 1. Create element map for lookups
  // 2. Recursively build children for groups
  // 3. Filter top-level elements (no parent)
  // 4. Sort by z-index (reverse for layer display)
  return hierarchicalTree;
};
```

---

## 🔗 Integration Points

### App.tsx Integration

Props passed through JSONtoREACT:
```javascript
...(element['data-component'] === 'layertree' ? {
  elements: appState?.canvasElements || [],
  selectedIds: appState?.selectedElementIds || [],
  onSelect: appState?.onLayerTreeSelect,
  onReorder: appState?.onReorder,
  onVisibilityToggle: appState?.onVisibilityToggle,
  onLockToggle: appState?.onLockToggle,
  onRename: appState?.onRename
} : {})
```

### Event System

App.tsx handlers dispatch events to DirectRenderer:

| Handler | Event Dispatched | Purpose |
|---------|------------------|---------|
| `onLayerTreeSelect` | `element-selected` / `elements-selected` | Selection sync |
| `onVisibilityToggle` | `element-visibility-changed` | Hide/show elements |
| `onLockToggle` | `element-lock-changed` | Lock/unlock elements |
| `onReorder` | `elements-reordered` | Change z-order |
| `onRename` | `element-renamed` | Update element name |

### DirectRenderer Integration

1. **Canvas Updates** → `canvas-elements-updated` → App state → LayerTree re-renders
2. **Selection Events** → Both components listen and stay synced
3. **Property Changes** → DirectRenderer updates → Broadcasts to App → LayerTree updates

---

## 🎨 UI Features

### Visual Components

1. **Element Row**
   - Expand arrow (for groups)
   - Type icon (square/text/image/group)
   - Element name
   - Visibility toggle
   - Lock toggle

2. **Visual States**
   - Selected: Highlight background
   - Locked: Reduced opacity + cursor change
   - Hidden: Further reduced opacity
   - Hover: Subtle background highlight
   - Drag over: Top border indicator

3. **Icons**
   - All inline SVG components
   - Consistent 14px sizing
   - Color-coded states

### Interactions

1. **Selection**
   - Click: Single select
   - Shift+click: Multi-select toggle
   - Locked items can't be selected

2. **Drag & Drop**
   - Locked items can't be dragged
   - Visual feedback during drag
   - Drop reorders z-index

3. **Inline Edit**
   - Double-click element name
   - Enter to save, Escape to cancel
   - Blur also saves

---

## 📊 Hierarchical Display

### Group Handling

```javascript
// Groups have:
- isGroup: true flag
- children: array of child elements
- Expand/collapse state
- Visual nesting with padding
- Dashed border styling
```

### Z-Index Display

- Elements sorted by z-index (highest first)
- Visual stacking order matches canvas
- Groups show behind their children

### Nesting Visualization

- Indentation per level (1.5rem)
- Vertical line connector
- Expand/collapse arrows
- Group icon differentiation

---

## 🚧 Suggested Sub-domains

### Core Sub-domains:

1. **TREE-BUILDER**
   - Hierarchy construction
   - Parent-child relationships
   - Z-index sorting
   - Recursive traversal

2. **SELECTION-SYSTEM**
   - Single/multi-select logic
   - Shift+click handling
   - Selection state sync
   - Lock checking

3. **DRAG-DROP-SYSTEM**
   - Drag state management
   - Drop zone detection
   - Reorder logic
   - Visual feedback

4. **VISIBILITY-CONTROL**
   - Show/hide toggle
   - State persistence
   - Visual indicators
   - Batch operations

5. **LOCK-SYSTEM**
   - Lock/unlock toggle
   - Interaction prevention
   - Visual states
   - Lock inheritance

6. **INLINE-EDITING**
   - Double-click detection
   - Input field management
   - Save/cancel logic
   - Keyboard shortcuts

7. **EVENT-COORDINATION**
   - Event listeners
   - Event dispatching
   - App.tsx bridging
   - DirectRenderer sync

8. **VISUAL-RENDERING**
   - Icon components
   - Style generation
   - State-based styling
   - Hover effects

9. **GROUP-MANAGEMENT**
   - Expand/collapse state
   - Children rendering
   - Nesting display
   - Group operations

10. **PERFORMANCE**
    - Virtual scrolling (future)
    - Memoization
    - Update batching
    - Large tree handling