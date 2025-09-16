# DirectRenderer

## Overview
**Purpose**: Main canvas component for rendering, selecting, editing, and manipulating design elements
**Location**: `/src/components/DIRECT-RENDERER/`
**Size**: 3,203 lines total (DirectRenderer: 1,241, useElementHandlers: 859)
**Type**: Organism (needs splitting)

---

## Component Dependencies

### Sub-components Used
- **GridOverlay**: Visual grid for alignment
- **SelectionHandles**: Resize/rotate handles
- **SelectionActionButton**: Quick actions on selection
- **ElementPopup**: Context menu for elements
- **LibraryModal**: Save to library dialog
- **SaveModal**: Element save options
- **useElementHandlers**: Hook with all handlers (859 lines!)

### Used By Components
- **App**: Main canvas area
- **Library**: Target for drag/drop operations
- **LayerTree**: Selection synchronization

---

## State Management

### Local State (Component Internal)
- `htmlContent`: Rendered HTML output
- `isLoading`: Render state
- `rectUpdateTrigger`: Force rect recalculation
- `popupPosition`: Popup x,y coordinates
- `editText`: Temporary text during editing
- `saveModalData`: Temp data for save modal
- `modalTargetElement`: Element being saved
- `libraryItems`: Temp library data

### ONEstore Integration
**Actor**: Designer
- `selectedElementId`: Single selection
- `selectedElementIds`: Multi-selection
- `hiddenElements`: Visibility tracking
- `lockedElements`: Lock tracking

**Actor**: Projects
- `elements`: All canvas elements

**Actions**:
- `setElements`: Update all elements
- `addElement`: Add new element
- `updateElement`: Modify element
- `deleteElements`: Remove elements
- `duplicateElements`: Clone elements
- `groupElements`: Create group
- `ungroupElements`: Dissolve group
- `setSelectedElement`: Single select
- `setSelectedElements`: Multi-select
- `getElementById`: Get element by ID

### UIstore Integration
- `showLibraryModal`: Library modal visibility
- `showSaveModal`: Save modal visibility
- `showElementPopup`: Popup visibility
- `isPlacingElement`: Placement mode
- `placingPreset`: Preset being placed
- `editingElementId`: Element being edited

---

## System Integration

### ONEconnect
- **Registration Name**: Dynamic
- **Data Source**: `ONEstore.projects.elements`
- **Data Subscriptions**: `ONEstore.designer selections, UIstore modals`
- **Wrapper Type**: None (direct store access)

### Theme Processor
- **UI Theme**: Canvas area placement
- **ONE Theme**: Element default styles

### Presets
- `canvas`: Container styles
- `element`: Base element styles
- `selected`: Selection highlight
- `handles`: Resize handle styles

### Icons
- **Used**: None directly (child components use them)
- **Source**: N/A

### TypeScript
```typescript
interface CanvasElement {
  id: string;
  type: 'one';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: ElementStyle;
  content?: ElementContent;
  children?: string[];
  parentId?: string | null;
  appliedPresets?: string[];
}

interface ElementStyle {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  // ... 50+ CSS properties
}
```

### Utils
- **getNextZIndex**: Calculate z-index for new elements
- **elementFactory**: Create new elements (TODO)
- **elementActions**: Group/duplicate/delete (TODO)

---

## Data Flow

### Inputs
- **From Store**: Elements, selections, UI states
- **From User**: Mouse events, keyboard shortcuts
- **From Library**: Drag data for new elements

### Outputs  
- **To Store**: All element changes, selections
- **To Library**: Saved elements (via libraryStore)
- **Events**: element-selected, elements-selected (still needed by App.tsx)

---

## Implementation Notes
- **Massive file** - needs splitting into modules
- Handles ALL canvas interactions
- Complex drag/drop/resize/rotate logic
- Text editing inline
- Group/ungroup support
- Copy/paste functionality
- Keyboard shortcuts
- Touch support started
- Full TypeScript (0 any types!)
- Zustand migration complete
- Most events removed (2 remain for App.tsx)

---

## Questions
1. [ ] Split into smaller modules? (CanvasRenderer, SelectionManager, etc.)
2. [ ] Move handlers to separate files?
3. [ ] Extract element creation/manipulation utils?
4. [ ] Add undo/redo system?