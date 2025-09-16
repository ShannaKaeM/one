---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: Implementation patterns
related: [drag-drop-system, grid-position-system, canvas-architecture]
---

# Grid Snap System

## Definition
A positioning system that automatically aligns elements to an invisible grid during movement and resizing, ensuring consistent spacing and professional layouts.

## Key Principles
- Invisible alignment grid
- Automatic snapping
- Toggle capability
- Visual feedback

## Grid Configuration

### Default Settings
```javascript
const gridConfig = {
  size: 20,              // 20px grid
  enabled: false,        // Off by default
  visible: false,        // Grid overlay
  color: 'rgba(0, 0, 0, 0.1)',
  thickness: 1
};
```

### Configurable Options
```javascript
// User preferences
const gridSettings = {
  sizes: [10, 20, 40],   // Available grid sizes
  snapStrength: 0.5,     // How "magnetic" the grid is
  showGuides: true,      // Show alignment guides
  snapToElements: true   // Snap to other elements too
};
```

## Snap Algorithm

### Basic Snapping
```javascript
function snapToGrid(value, gridSize = 20) {
  return Math.round(value / gridSize) * gridSize;
}

// Usage
const snappedX = snapToGrid(123); // Returns 120
const snappedY = snapToGrid(157); // Returns 160
```

### Smart Snapping
```javascript
function smartSnap(value, gridSize, threshold = 0.3) {
  const gridValue = Math.round(value / gridSize) * gridSize;
  const distance = Math.abs(value - gridValue);
  
  // Only snap if close enough
  if (distance < gridSize * threshold) {
    return gridValue;
  }
  
  return value;
}
```

### Directional Snapping
```javascript
function snapWithDirection(value, lastValue, gridSize) {
  const direction = value > lastValue ? 1 : -1;
  const gridLines = Math.floor(value / gridSize);
  
  // Snap to next grid line in movement direction
  if (direction > 0) {
    return (gridLines + 1) * gridSize;
  } else {
    return gridLines * gridSize;
  }
}
```

## Visual Grid Overlay

### Grid Rendering
```javascript
function GridOverlay({ size = 20, visible = true }) {
  if (!visible) return null;
  
  return (
    <svg className="grid-overlay">
      <defs>
        <pattern 
          id="grid" 
          width={size} 
          height={size} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d={`M ${size} 0 L 0 0 0 ${size}`} 
            fill="none" 
            stroke="rgba(0, 0, 0, 0.1)" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
```

### CSS Grid Background
```css
.canvas.grid-visible {
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 19px,
      rgba(0, 0, 0, 0.1) 19px,
      rgba(0, 0, 0, 0.1) 20px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 19px,
      rgba(0, 0, 0, 0.1) 19px,
      rgba(0, 0, 0, 0.1) 20px
    );
  background-size: 20px 20px;
}
```

## Snap During Operations

### Drag Snapping
```javascript
function handleDragWithSnap(element, deltaX, deltaY) {
  let newX = element.startX + deltaX;
  let newY = element.startY + deltaY;
  
  if (gridConfig.enabled) {
    newX = snapToGrid(newX, gridConfig.size);
    newY = snapToGrid(newY, gridConfig.size);
  }
  
  element.style.left = `${newX}px`;
  element.style.top = `${newY}px`;
}
```

### Resize Snapping
```javascript
function handleResizeWithSnap(element, deltaW, deltaH) {
  let newWidth = element.startWidth + deltaW;
  let newHeight = element.startHeight + deltaH;
  
  if (gridConfig.enabled) {
    newWidth = snapToGrid(newWidth, gridConfig.size);
    newHeight = snapToGrid(newHeight, gridConfig.size);
  }
  
  element.style.width = `${newWidth}px`;
  element.style.height = `${newHeight}px`;
}
```

### Creation Snapping
```javascript
function createElementAtPosition(x, y, type) {
  const snappedPos = gridConfig.enabled 
    ? {
        x: snapToGrid(x, gridConfig.size),
        y: snapToGrid(y, gridConfig.size)
      }
    : { x, y };
  
  return createElement(type, snappedPos);
}
```

## Alignment Guides

### Visual Guides
```javascript
function showAlignmentGuides(element, nearbyElements) {
  const guides = [];
  const threshold = 5;
  
  nearbyElements.forEach(other => {
    // Vertical alignment
    if (Math.abs(element.left - other.left) < threshold) {
      guides.push({
        type: 'vertical',
        position: other.left,
        from: Math.min(element.top, other.top),
        to: Math.max(element.bottom, other.bottom)
      });
    }
    
    // Horizontal alignment
    if (Math.abs(element.top - other.top) < threshold) {
      guides.push({
        type: 'horizontal',
        position: other.top,
        from: Math.min(element.left, other.left),
        to: Math.max(element.right, other.right)
      });
    }
  });
  
  return guides;
}
```

### Guide Rendering
```css
.alignment-guide {
  position: absolute;
  background: #4CAF50;
  z-index: 1000;
  pointer-events: none;
}

.alignment-guide.vertical {
  width: 1px;
  background: linear-gradient(180deg, transparent 0%, #4CAF50 20%, #4CAF50 80%, transparent 100%);
}

.alignment-guide.horizontal {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #4CAF50 20%, #4CAF50 80%, transparent 100%);
}
```

## Edge Snapping

### Element-to-Element
```javascript
function snapToNearbyElements(movingElement, otherElements) {
  const snapDistance = 10;
  let snapX = null;
  let snapY = null;
  
  otherElements.forEach(other => {
    // Left edge to left edge
    if (Math.abs(movingElement.left - other.left) < snapDistance) {
      snapX = other.left;
    }
    
    // Right edge to right edge
    if (Math.abs(movingElement.right - other.right) < snapDistance) {
      snapX = other.right - movingElement.width;
    }
    
    // Top edge to top edge
    if (Math.abs(movingElement.top - other.top) < snapDistance) {
      snapY = other.top;
    }
    
    // Bottom edge to bottom edge
    if (Math.abs(movingElement.bottom - other.bottom) < snapDistance) {
      snapY = other.bottom - movingElement.height;
    }
  });
  
  return { snapX, snapY };
}
```

### Center Snapping
```javascript
function snapToCenters(element, container) {
  const elementCenter = {
    x: element.left + element.width / 2,
    y: element.top + element.height / 2
  };
  
  const containerCenter = {
    x: container.width / 2,
    y: container.height / 2
  };
  
  const threshold = 10;
  
  // Snap to horizontal center
  if (Math.abs(elementCenter.x - containerCenter.x) < threshold) {
    element.left = containerCenter.x - element.width / 2;
  }
  
  // Snap to vertical center
  if (Math.abs(elementCenter.y - containerCenter.y) < threshold) {
    element.top = containerCenter.y - element.height / 2;
  }
}
```

## Performance Optimization

### Spatial Indexing
```javascript
// Grid-based spatial index for fast lookups
class SpatialGrid {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.grid = new Map();
  }
  
  add(element) {
    const cells = this.getCells(element);
    cells.forEach(cell => {
      if (!this.grid.has(cell)) {
        this.grid.set(cell, []);
      }
      this.grid.get(cell).push(element);
    });
  }
  
  getNearby(element) {
    const cells = this.getCells(element);
    const nearby = new Set();
    
    cells.forEach(cell => {
      const elements = this.grid.get(cell) || [];
      elements.forEach(el => nearby.add(el));
    });
    
    return Array.from(nearby);
  }
}
```

### Debounced Updates
```javascript
const debouncedSnap = debounce((element) => {
  const snapped = snapToGrid(element.position);
  if (snapped !== element.position) {
    updateElementPosition(element, snapped);
  }
}, 50);
```

## User Controls

### Toggle UI
```javascript
// Grid toggle button
<button onClick={() => setGridEnabled(!gridEnabled)}>
  {gridEnabled ? 'Disable Grid' : 'Enable Grid'}
</button>

// Grid size selector
<select onChange={(e) => setGridSize(Number(e.target.value))}>
  <option value="10">10px</option>
  <option value="20">20px</option>
  <option value="40">40px</option>
</select>
```

### Keyboard Shortcuts
```javascript
// Toggle grid with keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'g' && e.ctrlKey) {
    toggleGrid();
  }
  
  if (e.key === 'G' && e.ctrlKey && e.shiftKey) {
    toggleGridVisibility();
  }
});
```

## Related Atoms
- `drag-drop-system` - Drag implementation
- `grid-position-system` - Grid areas
- `canvas-architecture` - Canvas system