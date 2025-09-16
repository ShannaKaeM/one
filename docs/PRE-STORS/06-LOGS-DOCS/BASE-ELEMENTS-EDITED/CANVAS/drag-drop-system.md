---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: Implementation patterns
related: [canvas-architecture, grid-snap-system, multi-selection-pattern]
---

# Drag Drop System

## Definition
The core system enabling direct manipulation of elements through mouse-based dragging, including initialization, movement tracking, constraint application, and completion handling.

## Key Principles
- Direct manipulation
- Visual feedback
- Constraint awareness
- Smooth interaction

## Drag Lifecycle

### 1. Drag Initiation
```javascript
function handleMouseDown(e) {
  if (e.button !== 0) return; // Left click only
  
  const element = e.target.closest('[data-element-id]');
  if (!element) return;
  
  dragState = {
    isDragging: true,
    elementId: element.dataset.elementId,
    startX: e.clientX,
    startY: e.clientY,
    startLeft: parseInt(element.style.left),
    startTop: parseInt(element.style.top),
    hasMoved: false
  };
  
  element.classList.add('dragging');
  document.body.style.cursor = 'grabbing';
}
```

### 2. Drag Movement
```javascript
function handleMouseMove(e) {
  if (!dragState.isDragging) return;
  
  const deltaX = e.clientX - dragState.startX;
  const deltaY = e.clientY - dragState.startY;
  
  // Movement threshold
  if (!dragState.hasMoved && 
      Math.abs(deltaX) < 5 && 
      Math.abs(deltaY) < 5) {
    return;
  }
  
  dragState.hasMoved = true;
  
  // Calculate new position
  let newLeft = dragState.startLeft + deltaX;
  let newTop = dragState.startTop + deltaY;
  
  // Apply constraints
  newLeft = applyConstraints(newLeft, 'x');
  newTop = applyConstraints(newTop, 'y');
  
  // Update element
  updateElementPosition(dragState.elementId, newLeft, newTop);
}
```

### 3. Drag Completion
```javascript
function handleMouseUp(e) {
  if (!dragState.isDragging) return;
  
  const element = document.querySelector(
    `[data-element-id="${dragState.elementId}"]`
  );
  
  element.classList.remove('dragging');
  document.body.style.cursor = '';
  
  if (dragState.hasMoved) {
    // Dispatch move event
    window.dispatchEvent(new CustomEvent('element-moved', {
      detail: {
        id: dragState.elementId,
        from: {
          x: dragState.startLeft,
          y: dragState.startTop
        },
        to: {
          x: parseInt(element.style.left),
          y: parseInt(element.style.top)
        }
      }
    }));
  }
  
  dragState = null;
}
```

## Constraint System

### Grid Snapping
```javascript
function applyGridSnap(value, gridSize = 20) {
  return Math.round(value / gridSize) * gridSize;
}

// Usage in movement
if (snapEnabled) {
  newLeft = applyGridSnap(newLeft);
  newTop = applyGridSnap(newTop);
}
```

### Boundary Constraints
```javascript
function applyBoundaryConstraints(value, axis) {
  const element = getDraggedElement();
  const bounds = getCanvasBounds();
  
  if (axis === 'x') {
    const minX = 0;
    const maxX = bounds.width - element.width;
    return Math.max(minX, Math.min(maxX, value));
  } else {
    const minY = 0;
    const maxY = bounds.height - element.height;
    return Math.max(minY, Math.min(maxY, value));
  }
}
```

### Collision Detection
```javascript
function checkCollisions(elementId, newX, newY) {
  const element = getElement(elementId);
  const otherElements = getAllElements().filter(el => el.id !== elementId);
  
  const elementBounds = {
    left: newX,
    top: newY,
    right: newX + element.width,
    bottom: newY + element.height
  };
  
  return otherElements.filter(other => {
    const otherBounds = getElementBounds(other);
    return boundsIntersect(elementBounds, otherBounds);
  });
}
```

## Multi-Element Dragging

### Group Movement
```javascript
function handleMultiDrag(primaryElement, selectedElements) {
  const offsets = selectedElements.map(el => ({
    id: el.id,
    offsetX: el.left - primaryElement.left,
    offsetY: el.top - primaryElement.top
  }));
  
  // During drag
  function updateAll(primaryX, primaryY) {
    offsets.forEach(({ id, offsetX, offsetY }) => {
      updateElementPosition(id, primaryX + offsetX, primaryY + offsetY);
    });
  }
}
```

### Selection Preservation
```javascript
// Maintain selection during drag
function startMultiDrag(selectedIds) {
  selectedIds.forEach(id => {
    const element = getElement(id);
    element.classList.add('multi-dragging');
  });
}
```

## Visual Feedback

### Cursor States
```css
/* Hover */
[data-element-id]:hover {
  cursor: grab;
}

/* Dragging */
.dragging {
  cursor: grabbing !important;
  opacity: 0.8;
  z-index: 1000;
}

/* Multi-drag */
.multi-dragging {
  opacity: 0.6;
}
```

### Ghost Preview
```javascript
function createDragGhost(element) {
  const ghost = element.cloneNode(true);
  ghost.style.opacity = '0.5';
  ghost.style.pointerEvents = 'none';
  ghost.style.position = 'fixed';
  ghost.classList.add('drag-ghost');
  
  document.body.appendChild(ghost);
  return ghost;
}
```

### Drop Zones
```css
.drop-zone {
  outline: 2px dashed #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.drop-zone.active {
  outline-color: #2196F3;
  background: rgba(33, 150, 243, 0.1);
}
```

## Performance Optimization

### Throttling
```javascript
const throttledDrag = throttle(handleMouseMove, 16); // 60fps

document.addEventListener('mousemove', throttledDrag);
```

### RAF Updates
```javascript
let rafId = null;

function handleDragMove(e) {
  if (rafId) return;
  
  rafId = requestAnimationFrame(() => {
    updateDragPosition(e);
    rafId = null;
  });
}
```

### Batch Updates
```javascript
function batchPositionUpdates(updates) {
  requestAnimationFrame(() => {
    updates.forEach(({ id, x, y }) => {
      const element = getElement(id);
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}
```

## Touch Support

### Touch Events
```javascript
function handleTouchStart(e) {
  const touch = e.touches[0];
  handleMouseDown({
    clientX: touch.clientX,
    clientY: touch.clientY,
    target: touch.target,
    button: 0
  });
}

// Register touch handlers
element.addEventListener('touchstart', handleTouchStart);
element.addEventListener('touchmove', handleTouchMove);
element.addEventListener('touchend', handleTouchEnd);
```

## Advanced Features

### Drag Handles
```javascript
// Specific drag areas
<div class="element">
  <div class="drag-handle">⋮⋮</div>
  <div class="content">Content</div>
</div>

// Only initiate from handle
if (!e.target.classList.contains('drag-handle')) return;
```

### Auto-Scroll
```javascript
function checkAutoScroll(mouseY) {
  const scrollZone = 50;
  const scrollSpeed = 10;
  
  if (mouseY < scrollZone) {
    // Scroll up
    window.scrollBy(0, -scrollSpeed);
  } else if (mouseY > window.innerHeight - scrollZone) {
    // Scroll down
    window.scrollBy(0, scrollSpeed);
  }
}
```

### Magnetic Alignment
```javascript
function magneticSnap(value, targets, threshold = 10) {
  for (const target of targets) {
    if (Math.abs(value - target) < threshold) {
      return target;
    }
  }
  return value;
}
```

## Error Handling

### State Recovery
```javascript
// Clean up on errors
window.addEventListener('error', () => {
  if (dragState) {
    cancelDrag();
  }
});

function cancelDrag() {
  if (dragState?.elementId) {
    const element = getElement(dragState.elementId);
    element.style.left = dragState.startLeft + 'px';
    element.style.top = dragState.startTop + 'px';
  }
  dragState = null;
}
```

## Related Atoms
- `canvas-architecture` - Overall canvas system
- `grid-snap-system` - Snapping behavior
- `multi-selection-pattern` - Multi-element selection