# Direct Renderer

## 🎯 Quick Summary
> **Purpose**: Canvas rendering system that converts elements to pure HTML/CSS and handles all user interactions  
> **Type**: React Component / Canvas System  
> **Location**: `/src/components/DirectRenderer.tsx`  
> **Related**: [JSONtoREACT](./JSONtoREACT.md), [SELECTION-HANDLES](./SelectionHandles.md), [GRID-OVERLAY](./GridOverlay.md), [PRESET-MANAGER](../UTILS/PRESET-MANAGER.md)

---

## 🔄 Simple Explanation

DirectRenderer is the **canvas system** where users create and manipulate content. It renders elements as pure HTML/CSS (not React components) and manages all interactions:

1. **Renders elements** - Converts element data to HTML with ONE theme styling
2. **Handles selection** - Single/multi-select with visual feedback
3. **Manages interactions** - Drag, resize, edit, group, duplicate
4. **Processes events** - Listens for property changes, imports, actions
5. **Maintains state** - Elements, selection, visibility, locking
6. **Integrates child components** - SelectionHandles, GridOverlay, ElementPopup, SelectionActionButton

```
Element data → Generate HTML → Render to canvas → User interactions → Update elements → Re-render
```

---

## 📋 Technical Specification

### Input Props

```typescript
{
  theme?: 'one' | 'ui',          // Which theme (always 'one' for canvas)
  structure?: any,                // Initial structure (usually empty)
  gridVisible?: boolean,          // Show grid overlay
  snapEnabled?: boolean,          // Snap to grid
  selectedElement?: string,       // External selection
  selectedElementData?: any,      // Selected element data
  appState?: any,                // Global app state
  className?: string             // CSS class for canvas
}
```

### Core State Management

```typescript
// Element management
const [elements, setElements] = useState<any[]>([]);
const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);

// Visibility and locking
const [hiddenElements, setHiddenElements] = useState<Set<string>>(new Set());
const [lockedElements, setLockedElements] = useState<Set<string>>(new Set());

// Canvas state
const [htmlContent, setHtmlContent] = useState<string>('');
const [isLoading, setIsLoading] = useState(true);
```

### HTML Generation Process

DirectRenderer uses `generateDirectHTML()` to create pure HTML/CSS:

1. **Element processing** - Each element becomes a div with:
   - ID attribute for targeting
   - Class names (one + applied presets)
   - Inline styles from element.style 
   - Data attributes for selection state
   - onClick handler for selection

2. **Content handling**:
   - Text elements: `<span>` with content
   - Media elements: `<img>` tag with src
   - Groups: Nested divs with children

3. **Preset application** - Merges preset variables into styles *?*

### Event System

DirectRenderer listens for numerous events:

| Event | Purpose |
|-------|---------|
| `element-selected` | Single element selection |
| `elements-selected` | Multi-selection |
| `element-property-changed` | Update any property |
| `canvas-elements-updated` | Broadcast element changes |
| `import-content` | Add elements from library |
| `add-one-element` | Create new element |
| `group-elements` | Group selected elements |
| `duplicate-element` | Duplicate selected |
| `delete-element` | Remove element |
| `element-moved` | Update position |
| `element-resized` | Update dimensions |
| `jtor-action` | Handle UI actions |
| `preset-applied/removed` | Preset changes |

---

## 🔗 Integration

### Child Components

1. **SelectionHandles** - Visual handles for resize/rotate
   - Shows when element selected
   - 8 corner/edge handles
   - Drag overlay for moving
   
2. **GridOverlay** - Visual grid for alignment
   - 20px grid
   - SVG rendering
   - Toggle visibility

3. **ElementPopup** - Context menu for actions
   - Duplicate, group, delete
   - Preset toggles
   - Save to library

4. **SelectionActionButton** - Floating action button
   - Shows near selection
   - Opens ElementPopup
   - Shows selection count

### Element Structure

```javascript
{
  id: "element-123",
  type: "one",
  name: "My Element", 
  content: {
    text: "Hello",
    src: "https://..."
  },
  style: {
    position: "absolute",
    left: "100px",
    top: "100px",
    width: "200px",
    height: "150px",
    zIndex: 1001
  },
  presetType: "media",
  appliedPresets: ["media"],
  parentGroup: "group-456"  // If grouped
}
```

### Interaction Flow

1. **Selection**:
   - Click element → Set selectedElementId
   - Shift+click → Add to selectedElementIds
   - Click canvas → Deselect all
   - Escape key → Deselect all

2. **Editing**:
   - Double-click text → Inline editing
   - Property panel → Dispatches element-property-changed
   - Drag & drop → Updates position
   - Resize handles → Updates dimensions

3. **Library Integration**:
   - Drag from library → Drop on canvas
   - Calculates position from drop coordinates
   - Creates element with media preset
   - Auto-selects new element

---

## 📊 Quick Reference

### Key Architectural Points

1. **Pure HTML Generation** - No React components in canvas output
2. **Event-Driven Updates** - All changes through events
3. **State Separation** - Selection state separate from element data
4. **Preset System Integration** - Dynamic style application
5. **Multi-Selection Support** - Handles arrays of selected IDs
6. **Group Management** - Parent-child relationships
7. **Lock/Hide System** - Per-element visibility control

### Performance Optimizations

- Selection changes don't regenerate HTML
- Data attributes update independently
- Debounced property updates
- Efficient event listeners
- Minimal re-renders

---

## 🚧 Suggested Sub-domains

### Core Sub-domains:

1. **HTML-GENERATION**
   - Element to HTML conversion
   - Style processing
   - Preset variable merging
   - Content handling (text/media)

2. **SELECTION-SYSTEM**
   - Single/multi-selection logic
   - Selection state management
   - Visual feedback
   - Keyboard shortcuts

3. **INTERACTION-HANDLING**
   - Mouse events (click, drag, resize)
   - Keyboard events
   - Touch support (future)
   - Context menus

4. **STATE-MANAGEMENT**
   - Element array management
   - Selection tracking
   - Hidden/locked sets
   - Canvas properties

5. **EVENT-PROCESSING**
   - Event listener setup
   - Event dispatch
   - Property updates
   - Action handling

6. **ELEMENT-OPERATIONS**
   - Add/delete elements
   - Duplicate elements
   - Group/ungroup
   - Reorder (z-index)

7. **CONTENT-EDITING**
   - Inline text editing
   - Image upload/selection
   - Media handling
   - Content layers

8. **PRESET-INTEGRATION**
   - Apply/remove presets
   - Merge preset variables
   - Dynamic styling
   - Type-based presets

9. **IMPORT-EXPORT**
   - Library item import
   - Drag & drop handling
   - Position calculation
   - Element creation

10. **CHILD-COMPONENTS**
    - SelectionHandles integration
    - GridOverlay management
    - Popup coordination
    - Action button positioning