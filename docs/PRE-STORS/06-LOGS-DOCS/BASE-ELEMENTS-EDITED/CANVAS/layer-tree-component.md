---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L80-118
related: [layer-hierarchy, layer-operations, layer-tree-events]
---

# Layer Tree Component

## Definition
A Photoshop-like hierarchical panel that displays all canvas elements with professional editing capabilities including visibility, locking, reordering, and renaming.

## Key Principles
- Hierarchical element organization
- Direct manipulation interface
- Bidirectional canvas sync
- Professional editing tools

## Component Interface

```javascript
interface LayerTreeProps {
  elements: any[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onReorder?: (dragId: string, dropId: string) => void;
  onVisibilityToggle?: (elementId: string, visible: boolean) => void;
  onLockToggle?: (elementId: string, locked: boolean) => void;
  onRename?: (elementId: string, newName: string) => void;
}
```

## Core Features

### Display Capabilities
- Hierarchical element display with recursive tree building for nested groups
- Element type icons: □ wrapper, T text, ▭ image, ▣ group
- Expand/collapse groups with arrow indicators
- Visual feedback: blue for selected, purple for multi-selected

### Editing Operations
- Double-click to rename elements with inline editing
- Visibility toggle (👁️) controls element rendering on canvas
- Lock toggle (🔒) prevents selection and editing
- Drag & drop reordering updates z-index positions

### Selection Support
- Multi-selection support synced with canvas (Shift+click)
- Click to select single element
- Shift+click to add to selection
- Selection state shared with canvas

## Event System

### Layer Tree Events
- `element-visibility-changed` - Toggle element visibility
- `element-lock-changed` - Lock/unlock elements
- `elements-reordered` - Drag & drop reordering
- `element-renamed` - Update element names

### Canvas Sync Events
- `canvas-elements-updated` - Receive element updates
- `element-selected` - Sync selection state

## State Management

### Local State
- Expanded groups tracking
- Hidden elements list
- Locked elements list
- Rename mode state

### Shared State
- Canvas elements passed from App.tsx
- Selection state bidirectional sync
- Z-index coordination

## Examples

### Basic Layer Item
```jsx
<div className="layer-item">
  <span className="icon">□</span>
  <span className="name">Wrapper 1</span>
  <button className="visibility">👁️</button>
  <button className="lock">🔒</button>
</div>
```

### Nested Group Structure
```
▼ Group 1
  □ Wrapper 1
  T Text 1
  ▭ Image 1
▶ Group 2
```

## Visual Design
- Clean hierarchical layout
- Indentation for nesting
- Hover states for interactions
- Drag preview during reorder
- Inline edit mode styling

## Related Atoms
- `layer-hierarchy` - Nesting and tree structure
- `layer-operations` - Individual operation details
- `layer-tree-events` - Event system specifics