---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L40-79
related: [element-selection, drag-drop-system, multi-selection-pattern]
---

# Canvas Architecture

## Definition
The core visual builder system that enables direct manipulation of elements through creation, selection, and positioning on an absolute-positioned canvas.

## Key Principles
- Direct element creation from buttons
- Absolute positioning for free placement
- Multi-selection with visual feedback
- Event-driven architecture

## Implementation

### Element Creation System
```javascript
// Element creation with theme defaults
const elementTypes = {
  wrapper: { /* 200x200px gray container */ },
  text: { /* Centered text with background */ },
  image: { /* Image with default source */ }
}
```

### Canvas Features
- Canvas header contains "+ Wrapper", "+ Text", "+ Image" buttons
- Shift+Click enables multi-selection with visual feedback
- Drag-to-select rectangle with purple dashed border (5px movement threshold)
- Elements use absolute positioning with staggered placement
- Selection handles work consistently across all element types
- Escape key deselects all elements and cancels drag operations
- Element naming system: "Wrapper 1", "Text 2", "Image 3" based on type counters

### State Management
```javascript
// Multi-selection state management
const [selectedElementIds, setSelectedElementIds] = useState<string[]>([])
// Visual feedback: purple outline for multi-selection, blue for single
```

### Event System
```javascript
// Element creation events
window.addEventListener('add-wrapper-element', handleAddElement)
window.addEventListener('add-text-element', handleAddElement)
window.addEventListener('add-image-element', handleAddElement)

// Selection and interaction
document.addEventListener('keydown', handleKeyDown)  // Escape to deselect
canvasRef.current.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
```

## Visual Feedback

### Selection States
- **Single Selection**: Blue outline
- **Multi-Selection**: Purple outline
- **Drag Selection**: Purple dashed rectangle
- **Hovering**: Cursor changes

### Element Placement
- Staggered positioning (20px offset)
- Absolute positioning
- Z-index management
- Grid snapping (when enabled)

## Examples

### Creating Elements
1. Click "+ Wrapper" button
2. Element appears at staggered position
3. Automatically named "Wrapper 1"
4. Ready for manipulation

### Multi-Selection
1. Click first element (blue outline)
2. Shift+Click additional elements (purple outline)
3. Or drag rectangle to select multiple
4. Group operations available

## Related Atoms
- `element-selection` - Selection system details
- `drag-drop-system` - Dragging implementation
- `multi-selection-pattern` - Multi-select behavior