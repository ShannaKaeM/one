# Canvas System Guide

## Overview
The Canvas is where users create and manipulate visual elements. It renders pure HTML/CSS (no React components) for performance and export.

## Architecture Flow
```
Canvas Button Click → Event Dispatch → DirectRenderer → HTML Generation → DOM Update
```

## 1. Canvas Component (DirectRenderer)

### Location
`/src/components/DirectRenderer.tsx`

### What It Does
1. Manages element state (position, content, visibility)
2. Generates pure HTML/CSS from elements
3. Handles drag/drop and selection
4. Dispatches events for other components

### Key State
```javascript
const [elements, setElements] = useState<any[]>([]);
const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
const [hiddenElements, setHiddenElements] = useState<Set<string>>(new Set());
const [lockedElements, setLockedElements] = useState<Set<string>>(new Set());
const [htmlContent, setHtmlContent] = useState<string>('');
```

## 2. Element Structure

### Basic Element
```javascript
{
  id: "element-123",
  type: "one",
  content: { text: "Hello", src: "" },
  style: {
    position: "absolute",
    left: "100px", 
    top: "100px",
    width: "200px",
    height: "200px",
    zIndex: 1000
  },
  presetType: "text",
  appliedPresets: ["text"],
  name: "Text Element"
}
```

### Element Types (via presetType)
- `wrapper` - Container elements
- `text` - Text content
- `media` - Images

## 3. HTML Generation

### Function
`generateDirectHTML()` in DirectRenderer.tsx (line ~1860)

### Process
1. Takes theme config and elements array
2. Builds HTML string with inline styles
3. Adds event handlers via onclick attributes
4. Returns complete HTML document

### Generated HTML Example
```html
<div class="one canvas-area">
  <div id="element-123" class="one text" 
       style="position: absolute; left: 100px; top: 100px;"
       onclick="window.__handleElementClick('element-123', event)">
    <span>Hello World</span>
  </div>
</div>
```

## 4. Event System

### Incoming Events (DirectRenderer listens)
```javascript
// Add elements
'add-one-element' → Creates wrapper element
'add-text-element' → Creates text element  
'add-media-element' → Creates media element

// Import content
'import-content' → Adds elements from library/upload

// Updates
'element-property-changed' → Updates element properties
'preset-applied' → Adds preset to element
'preset-removed' → Removes preset from element

// Canvas controls
'toggle-grid' → Shows/hides grid
'toggle-snap' → Enables/disables snap
```

### Outgoing Events (DirectRenderer dispatches)
```javascript
// Selection
'element-selected' → Single element selected
'elements-selected' → Multiple elements selected

// Content changes  
'canvas-elements-updated' → Elements array changed

// Image handling
'upload-image-for-element' → Triggers file upload
'select-image-for-element' → Opens library modal
```

## 5. Selection System

### Click Handler
Global function attached to window:
```javascript
window.__handleElementClick = (elementId, event) => {
  // Handles single/multi selection
  // Updates selectedElementId state
  // Dispatches selection events
}
```

### Multi-Select
- Hold Shift + Click to add to selection
- Updates `selectedElementIds` array
- Visual feedback via data attributes

## 6. Drag & Drop

### Drop Handler
Location: DirectRenderer.tsx (line ~1462)

### Accepts
1. Library items (`dataTransfer.getData('libraryItem')`)
2. File drops (images)

### Process
1. Calculate drop position relative to canvas
2. Create new element at position
3. Add to elements array

## 7. Canvas Controls Integration

### Grid Toggle
- State: `gridVisible` 
- Component: `<GridOverlay>` 
- Shows 10px grid for alignment

### Snap Toggle  
- State: `snapEnabled`
- Function: `snapToGrid()`
- Snaps to 10px increments

## 8. Selection Overlays

### SelectionHandles
- Shows resize handles on selected element
- Updates element dimensions on drag
- Dispatches `element-property-changed`

### SelectionActionButton
- Shows "+" button on selection
- Opens ElementPopup on click
- Position follows selection

## 9. State Management

### Element Updates
```javascript
// Add element
setElements(prev => [...prev, newElement]);

// Update element
setElements(prev => prev.map(el => 
  el.id === elementId ? { ...el, ...updates } : el
));

// Remove element
setElements(prev => prev.filter(el => el.id !== elementId));
```

### Visibility Control
```javascript
// Hide element
setHiddenElements(prev => new Set(prev).add(elementId));

// Lock element
setLockedElements(prev => new Set(prev).add(elementId));
```

## 10. Performance Optimizations

### Theme Loading
- Loads once on mount
- Cached in runtimeThemeProcessor
- No reload on element changes

### HTML Generation
- Only regenerates when elements change
- Selection handled via data attributes
- No flicker on selection

### Event Delegation
- Single click handler for all elements
- Efficient event bubbling
- Minimal DOM manipulation

## 11. File References

### Core Files
- `/src/components/DirectRenderer.tsx` - Main canvas component
- `/src/components/GridOverlay.tsx` - Grid display and snapping
- `/src/components/SelectionHandles.tsx` - Resize handles
- `/src/components/SelectionActionButton.tsx` - Selection menu
- `/src/components/ElementPopup.tsx` - Element options popup

### Connected Systems
- Canvas Controls → Dispatches add element events
- Library → Dispatches import-content events  
- Editors → Dispatches property change events
- LayerTree → Will dispatch visibility/order events

## 12. Troubleshooting

### Element Not Appearing
1. Check console for element creation logs
2. Verify element has position styles
3. Check if element is in hiddenElements Set
4. Ensure z-index is set (default 1000)

### Selection Not Working
1. Check if element is in lockedElements Set
2. Verify __handleElementClick is on window
3. Check data-locked attribute in HTML
4. Look for event.stopPropagation() calls

### Drag/Drop Failed
1. Check console for drop event logs
2. Verify preventDefault() on drop zone
3. Check dataTransfer content
4. Ensure drop position calculation

### HTML Not Updating
1. Check if elements state actually changed
2. Look for React key warnings
3. Verify generateDirectHTML is called
4. Check htmlContent state value