# Library

## Overview
**Purpose**: Asset management system with R2 storage, filtering, bulk operations, and drag-to-canvas
**Location**: `/src/components/LIBRARY/`
**Size**: ~1,500 lines total across 7 files (Library: 1,169 lines)
**Type**: Organism

---

## Component Dependencies

### Sub-components Used
- **LibraryHeader**: Title and action buttons
- **LibraryUpload**: Upload modal with library selection
- **LibraryGrid**: Main grid display with drag/drop
- **LibraryManager**: Library CRUD operations modal
- **BulkEditModal**: Bulk operations on selected items
- **ItemEditModal**: Individual item editing

### Used By Components
- **App**: Placed in library grid area via theme structure
- **DirectRenderer**: Saves elements to library via store

---

## State Management

### Local State (Component Internal)
- `showUploadModal`: Upload modal visibility (temp UI)
- `pendingFiles`: Files being uploaded (temp)
- `uploadLibraries`: Selected libraries for upload (temp form)
- `showLibraryManager`: Manager modal visibility (temp UI)
- `editingLibrary`: Library being renamed (temp form)
- `newLibraryName`: New name input value (temp form)
- `editingItem`: Item being edited (temp UI)
- `showBulkEdit`: Bulk edit modal visibility (temp UI)
- `bulkLibraries`: Libraries for bulk assignment (temp form)
- `lastSelectedIndex`: For shift-click selection (temp UI)

### ONEstore Integration
**Actor**: Projects
- `canvasElements`: For creating elements from library items

**Actions**:
- `addElement(element)`: Adds library item to canvas

### libraryStore Integration
**Main Data**:
- `items`: All library items
- `availableLibraries`: All library names
- `selectedLibraries`: Active filter selections
- `selectedItems`: Set of selected item IDs
- `isLoading`: Loading state
- `error`: Error messages

**Actions**:
- `setItems`: Load all items
- `addItem`: Add new item
- `updateItem`: Edit item properties
- `deleteItems`: Delete selected items
- `addLibrary`: Create new library
- `renameLibrary`: Rename library
- `deleteLibrary`: Remove library
- `toggleLibraryFilter`: Filter by library
- `toggleItemSelection`: Select/deselect items

---

## System Integration

### ONEconnect
- **Registration Name**: Dynamic
- **Data Source**: `libraryStore.items`
- **Data Subscriptions**: `libraryStore.selectedLibraries, selectedItems`
- **Wrapper Type**: None needed (direct store access)

### Theme Processor
- **UI Theme**: Component placement, grid layout
- **ONE Theme**: none

### Presets
- `library`: Container styles
- `library-header`: Header styles
- `library-grid`: Grid layout styles
- `library-item`: Item card styles

### Icons
- **Used**: Plus, Upload, Settings, Edit, Trash, Close
- **Source**: `utils/icons.tsx`

### TypeScript
```typescript
interface LibraryItem {
  id: string;
  name: string;
  url: string;
  libraries: string[];
  type: 'image' | 'video' | 'text' | 'markdown' | 'json' | 'component' | 'element';
  smartTags?: string[];
  createdAt: number;
  updatedAt?: number;
  data?: {
    element?: CanvasElement;
    content?: any;
  };
}
```

### Utils
- **r2Manager**: Handles R2 storage operations
- **storageManager**: Local storage persistence

---

## Data Flow

### Inputs
- **From Store**: Library items, filters, selections
- **From User**: File uploads, drag operations, selections
- **From Props**: presetClassMap for styling

### Outputs  
- **To Store**: Item updates, library changes, selections
- **To Canvas**: Elements via ONEstore.addElement (on drag/double-click)
- **Events**: none

---

## Implementation Notes
- R2 storage for all assets
- Drag to canvas creates element copy
- Double-click also adds to canvas
- Shift-click for range selection
- Ctrl/Cmd-click for multi-select
- Smart type detection from file/content
- Bulk operations on multiple items
- TypeScript fully implemented
- Zustand migration complete
- Event system removed

---

## Questions
1. [ ] Should we add search/filter by name?
2. [ ] Add tags beyond smart detection?
3. [ ] Versioning system for elements?
4. [ ] Preview generation for non-images?