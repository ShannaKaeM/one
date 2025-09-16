# LayerTree

## Overview
**Purpose**: Hierarchical display of canvas elements with visibility/lock controls and drag reordering
**Location**: `/src/components/LAYERTREE/`
**Size**: 660 lines total (LayerTree: 496, LayerTreeItem: 156, Header: 8)
**Type**: Organism

---

## Component Dependencies

### Sub-components Used
- **LayerTreeHeader**: Simple title display
- **LayerTreeItem**: Recursive item renderer with controls
- **Icons**: ChevronRight/Down, View/ViewOff, Lock/Unlock, Square, Text, Image, Group

### Used By Components
- **App**: Placed in layer tree grid area via theme structure

---

## State Management

### Local State (Component Internal)
- `draggedElement`: Currently dragging element (temp UI state)
- `dragOverElement`: Drop target element (temp UI state) 
- `editingElement`: Element being renamed (temp UI state)
- `editingName`: Temporary rename value (temp UI state)

### ONEstore Integration
**Actor**: Designer
- `selectedElementIds`: Currently selected elements
- `hiddenElements`: Set of hidden element IDs
- `lockedElements`: Set of locked element IDs

**Actor**: Projects
- `canvasElements`: All elements to display

**Actions**:
- `setSelectedElement(id)`: Single selection
- `setSelectedElements(ids[])`: Multi-selection
- `toggleElementVisibility(id)`: Show/hide
- `toggleElementLock(id)`: Lock/unlock
- `reorderElements(dragId, targetId)`: Reorder via drag
- `updateElement(id, updates)`: Rename element

---

## System Integration

### ONEconnect
- **Registration Name**: Dynamic
- **Data Source**: `ONEstore.projects.canvasElements`
- **Data Subscriptions**: `ONEstore.designer.selectedElementIds, hiddenElements, lockedElements`
- **Wrapper Type**: None needed (direct store access)

### Theme Processor
- **UI Theme**: Component placement, preset targets
- **ONE Theme**: none

### Presets
- `layer-tree`: Container styles
- `layer-tree-header`: Header styles
- `layer-tree-item`: Item row styles
- `layer-tree-controls`: Button styles

### Icons
- **Used**: Chevrons, visibility, lock, element type icons
- **Source**: `utils/icons.tsx`

### TypeScript
```typescript
interface TreeNode {
  element: Element;
  children: TreeNode[];
  depth: number;
}

interface Element {
  id: string;
  name: string;
  type: 'one' | 'group';
  children?: string[];
  style: ElementStyle;
  content?: ElementContent;
}
```

### Utils
- **icons.tsx**: All SVG icons
- **buildTree**: Constructs hierarchy from flat elements

---

## Data Flow

### Inputs
- **From Store**: Elements array, selection state, visibility/lock states
- **From Props**: presetClassMap for styling
- **From User**: Clicks, drags, double-clicks

### Outputs  
- **To Store**: Selection changes, visibility/lock toggles, reorders, renames
- **Events**: none

---

## Implementation Notes
- Drag & drop for reordering (swaps z-index)
- Double-click to rename elements
- Shift/Cmd click for multi-select
- Recursive rendering for groups
- TypeScript fully implemented
- Zustand migration complete
- Event system removed

---

## Questions
1. [ ] Should expanded groups persist across sessions?
2. [ ] Add keyboard navigation (arrows)?
3. [ ] Context menu for additional actions?