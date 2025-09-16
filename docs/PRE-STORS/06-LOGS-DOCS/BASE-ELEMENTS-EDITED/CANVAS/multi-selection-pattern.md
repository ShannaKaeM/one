---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L123-132
related: [element-selection, canvas-architecture, drag-drop-system]
---

# Multi-Selection Pattern

## Definition
A selection system that allows multiple elements to be selected simultaneously through keyboard modifiers or drag rectangles, enabling batch operations.

## Key Principles
- Shift+Click for additive selection
- Drag rectangle for area selection
- Visual distinction from single selection
- Escape key clears all

## Selection Methods

### 1. Shift+Click Selection
- Click first element (blue outline)
- Shift+Click additional elements
- All selected show purple outline
- Toggle selection with Shift+Click

### 2. Drag-to-Select Rectangle
- Click and drag on empty canvas
- Purple dashed border rectangle
- 5px movement threshold before drag starts
- Selects all elements within bounds

### 3. Keyboard Shortcuts
- **Escape** - Deselect all elements
- **Ctrl/Cmd+A** - Select all (future)
- **Shift+Click** - Add to selection

## Visual Feedback

### Outline Colors
```css
/* Single selection */
.selected {
  outline: 2px solid blue;
}

/* Multi-selection */
.multi-selected {
  outline: 2px solid purple;
}

/* Drag rectangle */
.selection-rectangle {
  border: 1px dashed purple;
  background: rgba(138, 43, 226, 0.1);
}
```

### State Indicators
- **Blue outline** - Single element selected
- **Purple outline** - Multiple elements selected
- **Purple rectangle** - Active drag selection
- **No outline** - Not selected

## Implementation

### State Management
```javascript
// Selection state tracked in array
const [selectedElementIds, setSelectedElementIds] = useState<string[]>([])

// Single vs multi detection
const isMultiSelection = selectedElementIds.length > 1;
```

### Selection Logic
```javascript
// Shift+Click handling
if (event.shiftKey) {
  if (selectedElementIds.includes(elementId)) {
    // Remove from selection
    setSelectedElementIds(prev => 
      prev.filter(id => id !== elementId)
    );
  } else {
    // Add to selection
    setSelectedElementIds(prev => 
      [...prev, elementId]
    );
  }
} else {
  // Regular click - single selection
  setSelectedElementIds([elementId]);
}
```

## Drag Rectangle Behavior

### Threshold
- 5px movement required
- Prevents accidental drags
- Smooth interaction feel

### Selection Rules
- Elements fully within rectangle
- Boundary intersection (optional)
- Ignore locked elements
- Skip hidden elements

## Operations on Multi-Selection

### Available Actions
- Group selected elements
- Move together
- Delete batch
- Apply preset to all
- Align/distribute

### UI Updates
- Show group button when 2+ selected
- Update property panel
- Enable batch operations
- Show selection count

## Related Atoms
- `element-selection` - Single selection details
- `canvas-architecture` - Overall canvas system
- `drag-drop-system` - Dragging implementation