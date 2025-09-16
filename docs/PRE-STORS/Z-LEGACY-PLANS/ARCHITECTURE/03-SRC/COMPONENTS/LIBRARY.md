# Library

## 🎯 Quick Summary
> **Purpose**: Asset management system with R2 storage integration  
> **Type**: React Component  
> **Location**: `/src/components/Library.tsx`  
> **Related**: [R2-MANAGER](../UTILS/R2-MANAGER.md), [DIRECT-RENDERER](./DIRECT-RENDERER.md), [ASSET-WORKER](../WORKERS/ASSET-WORKER.md), [JSONtoREACT](./JSONtoREACT.md)

---

## 🔄 Simple Explanation

The Library is the **central asset management system** that handles image uploads, organization, and delivery to the canvas:

1. **Uploads images** - Sends files to R2 storage via workers
2. **Organizes assets** - Virtual libraries and collections for categorization
3. **Displays thumbnails** - Grid view with selection and filtering
4. **Integrates with canvas** - Drag & drop or click to add to DirectRenderer
5. **Manages metadata** - Names, collections, libraries, URLs
6. **Bulk operations** - Edit, delete, and organize multiple items

```
User uploads → R2 storage → Library displays → Drag to canvas → DirectRenderer renders
```

---

## 📋 Technical Specification

### Component Props

```typescript
{
  onAddToCanvas?: (item: LibraryItem) => void,  // Callback when adding to canvas
  collapsed?: boolean,                           // Header-only view
  className?: string,                            // Additional CSS class
  presetClassMap?: Record<string, string>       // Preset class overrides
}
```

### Data Structure

```typescript
interface LibraryItem {
  id: string;               // Unique identifier
  name: string;             // File name
  url: string;              // R2 asset URL
  collections: string[];    // Tag-based collections
  libraries: string[];      // Virtual library folders
  createdAt: number;        // Timestamp
}
```

### Core Features

#### 1. **R2 Storage Integration**
- Uploads via `r2Manager.uploadAsset()`
- Content-addressed storage (SHA-256)
- Automatic deduplication
- URL construction from worker endpoints

#### 2. **Organization System**
- **Libraries**: Virtual folders (All Items, Custom...)
- **Collections**: Tag-based categorization
- **Filtering**: Multi-select libraries/collections
- **Search**: By name (future enhancement)

#### 3. **UI Features**
- Grid thumbnail display
- Multi-selection with checkboxes
- Shift+click range selection
- Bulk editing capabilities
- Inline item editing
- Management modals

#### 4. **Canvas Integration**
Via JSONtoREACT:
```javascript
onAddToCanvas: (item) => {
  const mediaElement = {
    id: `element-${Date.now()}`,
    type: 'one',
    content: { src: item.url },
    presetType: 'media',
    appliedPresets: ['media']
  };
  
  window.dispatchEvent(new CustomEvent('import-content', {
    detail: { type: 'elements', data: [mediaElement] }
  }));
}
```

DirectRenderer listens for `import-content` events and adds elements to canvas.

---

## 🔗 Integration Points

### R2 Manager Integration

```javascript
// Upload flow
const uploadResult = await r2Manager.uploadAsset(file);
const mediaItem = {
  name: file.name,
  type: 'media',
  url: uploadResult.url,
  libraries: selectedLibraries,
  collections: selectedCollections
};
await r2Manager.saveToLibrary(mediaItem);
```

### Worker Communication

1. **Upload**: `POST /upload` → Returns hash & URL
2. **Save**: `POST /library/save` → Stores metadata
3. **List**: `GET /library/list` → Retrieves all items
4. **Delete**: `DELETE /library/{id}` → Removes item

### Event System

| Event | Purpose |
|-------|---------|
| `import-content` | Sends element data to DirectRenderer |
| `save-element-to-library` | Saves canvas element back to library |

### Drag & Drop

```javascript
// Library item setup
<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData('libraryItem', JSON.stringify(item));
  }}
>

// DirectRenderer would handle onDrop to receive items
```

---

## 📊 State Management

### Component State

- `libraryItems`: All loaded items
- `selectedLibraries`: Active library filters
- `selectedCollections`: Active collection filters
- `selectedItems`: Multi-selection set
- `availableLibraries`: All discovered libraries
- Modal states for uploads, editing, management

### Data Flow

1. **Load**: Fetch items from R2 on mount
2. **Filter**: Apply library/collection filters
3. **Display**: Render filtered grid
4. **Select**: Track selections for bulk ops
5. **Import**: Send to canvas via events

---

## 🎨 UI Components

### Modals

1. **Upload Modal** - Select libraries/collections for new uploads
2. **Item Edit Modal** - Edit single item's organization
3. **Bulk Edit Modal** - Edit multiple items
4. **Library Manager** - Create/rename/delete libraries
5. **Collection Manager** - Manage collections

### Visual States

- Three-state toggle: Full → Collapsed → Hidden
- Selection highlighting
- Hover effects
- Loading states
- Error placeholders

---

## 🚧 Suggested Sub-domains

### Core Sub-domains:

1. **UPLOAD-SYSTEM**
   - File selection and validation
   - R2 upload process
   - Progress tracking
   - Error handling

2. **ORGANIZATION-SYSTEM**
   - Library management
   - Collection management
   - Filtering logic
   - Migration handling

3. **GRID-DISPLAY**
   - Thumbnail rendering
   - Lazy loading
   - Selection visuals
   - Responsive layout

4. **SELECTION-MANAGEMENT**
   - Multi-selection logic
   - Range selection
   - Selection persistence
   - Bulk operations

5. **CANVAS-INTEGRATION**
   - Import event dispatch
   - Element creation
   - Drag & drop setup
   - Position calculation

6. **MODAL-SYSTEM**
   - Modal components
   - Form handling
   - Validation
   - State management

7. **R2-COMMUNICATION**
   - API calls
   - Response handling
   - URL construction
   - Error recovery

8. **METADATA-HANDLING**
   - Item properties
   - Organization data
   - Timestamps
   - Search indexing

9. **UI-STATES**
   - Visibility toggles
   - Loading states
   - Error states
   - Empty states

10. **PERFORMANCE**
    - Image optimization
    - Lazy loading
    - Virtualization (future)
    - Caching strategies

---

## 📋 Sub-domains To Document

Based on the analysis above, here are the Library sub-domains that need documentation:

```
├── Library.tsx (01.11-LIBRARY) ✅
    ├── UPLOAD-SYSTEM
    │   ├── FILE-SELECTION
    │   ├── R2-UPLOAD
    │   ├── PROGRESS-TRACKING
    │   └── ERROR-HANDLING
    ├── ORGANIZATION-SYSTEM
    │   ├── LIBRARY-MANAGEMENT
    │   ├── COLLECTION-MANAGEMENT
    │   ├── FILTERING-LOGIC
    │   └── MIGRATION-HANDLING
    ├── GRID-DISPLAY
    │   ├── THUMBNAIL-RENDERING
    │   ├── LAZY-LOADING
    │   ├── SELECTION-VISUALS
    │   └── RESPONSIVE-LAYOUT
    ├── SELECTION-MANAGEMENT
    │   ├── MULTI-SELECTION
    │   ├── RANGE-SELECTION
    │   ├── SELECTION-PERSISTENCE
    │   └── BULK-OPERATIONS
    ├── CANVAS-INTEGRATION
    │   ├── IMPORT-EVENTS
    │   ├── ELEMENT-CREATION
    │   ├── DRAG-DROP-SETUP
    │   └── POSITION-CALCULATION
    ├── MODAL-SYSTEM
    │   ├── MODAL-COMPONENTS
    │   ├── FORM-HANDLING
    │   ├── VALIDATION
    │   └── STATE-MANAGEMENT
    ├── R2-COMMUNICATION
    │   ├── API-CALLS
    │   ├── RESPONSE-HANDLING
    │   ├── URL-CONSTRUCTION
    │   └── ERROR-RECOVERY
    ├── METADATA-HANDLING
    │   ├── ITEM-PROPERTIES
    │   ├── ORGANIZATION-DATA
    │   ├── TIMESTAMPS
    │   └── SEARCH-INDEXING
    ├── UI-STATES
    │   ├── VISIBILITY-TOGGLES
    │   ├── LOADING-STATES
    │   ├── ERROR-STATES
    │   └── EMPTY-STATES
    └── PERFORMANCE
        ├── IMAGE-OPTIMIZATION
        ├── LAZY-LOADING
        ├── VIRTUALIZATION
        └── CACHING-STRATEGIES
```