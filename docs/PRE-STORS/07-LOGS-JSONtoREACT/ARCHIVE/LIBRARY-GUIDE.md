# Library Component Migration Guide

## Table of Contents
1. [Current Library Overview](#current-library-overview)
2. [Core Features & Functionality](#core-features--functionality)
3. [Technical Architecture](#technical-architecture)
4. [JTR Migration Strategy](#jtr-migration-strategy)
5. [State Management Plan](#state-management-plan)
6. [UI Structure Mapping](#ui-structure-mapping)
7. [Implementation Phases](#implementation-phases)
8. [Risk Assessment](#risk-assessment)

## Current Library Overview

The Library is a **complex media management system** that handles:
- Image uploads to R2 storage
- Organization via Libraries (folders) and Collections (tags)
- Drag-and-drop to canvas
- Bulk operations
- Search and filtering

**Current Location**: `/src/components/legacy/Library.tsx` (1700+ lines)

## Core Features & Functionality

### 1. Media Management
- **Upload**: Multiple files, drag-drop zone, progress tracking
- **Storage**: Cloudflare R2 integration via `r2Manager`
- **Organization**: Libraries (containers) + Collections (tags)
- **Operations**: Edit, delete, bulk edit, bulk delete

### 2. UI Interactions
- **Drag to Canvas**: Items draggable to DirectRenderer
- **Selection**: Click, shift-click for range, select all
- **Filtering**: By library and/or collections
- **Search**: Filter items by name (planned)

### 3. Integration Points
```javascript
// How it connects to canvas
onAddToCanvas: (item) => {
  // Creates ONE element with media
  // Dispatches to DirectRenderer
}

// How it stores data
r2Manager.uploadAsset(file)
r2Manager.saveToLibrary(item)
r2Manager.listLibrary()
r2Manager.deleteLibraryItem(id)
```

## Technical Architecture

### Current State Management
```javascript
// 15+ useState hooks managing:
- libraryItems: LibraryItem[]
- selectedItems: Set<string>
- selectedCollections: string[]
- selectedLibraries: string[]
- showUploadModal: boolean
- showBulkEdit: boolean
- editingItem: string
// ... and more
```

### Component Structure
```
Library
├── Header (always visible)
├── Content (collapsible)
│   ├── LibraryTabs
│   ├── CollectionTabs
│   ├── BulkActions
│   └── ItemGrid
└── Modals (5 different types)
```

### CSS Architecture
- 360+ lines of inline styles
- Responsive grid system
- Hover states and animations
- Modal styling

## JTR Migration Strategy

### Option 1: Hybrid Approach (Recommended)
Keep Library as React component but refactor to work with JTR:

**Pros**:
- Preserves complex state management
- Maintains R2 integration
- Faster to implement
- Less risk of breaking functionality

**Cons**:
- Not pure JTR
- Two different patterns in codebase

### Option 2: Full JTR Migration
Convert entire Library to JSON-driven structure:

**Pros**:
- Consistent architecture
- Pure JSON configuration
- Easier long-term maintenance

**Cons**:
- Complex state management in JTR
- Need new patterns for:
  - File uploads
  - Async operations
  - Modal management
  - Bulk selections

## State Management Plan

### For Hybrid Approach
1. Keep React state in Library component
2. Expose key states via callbacks to JTR
3. Use data-component system for integration

### For Full JTR
Need to implement:

1. **Global State Provider**
   ```json
   {
     "type": "one",
     "data-component": "state-provider",
     "data-state-key": "library",
     "children": [...]
   }
   ```

2. **State Actions via Events**
   ```json
   {
     "type": "one",
     "onClick": "library:toggle-item-selection",
     "data-item-id": "item-123"
   }
   ```

3. **Conditional Rendering**
   ```json
   {
     "type": "one",
     "data-if": "library.showUploadModal",
     "children": [...]
   }
   ```

## UI Structure Mapping

### Current React → JTR Structure

```json
{
  "library-container": {
    "type": "one",
    "layouts": "library-panel",
    "data-component": "library-provider",
    "children": [
      {
        "type": "one",
        "layouts": "library-header",
        "children": [
          {
            "type": "one",
            "content": "Library",
            "components": "library-title"
          },
          {
            "type": "one",
            "layouts": "library-controls",
            "children": ["upload-btn", "delete-btn", "manage-btn"]
          }
        ]
      },
      {
        "type": "one",
        "layouts": "library-content",
        "data-if": "!library.collapsed",
        "children": [
          {
            "type": "one",
            "components": "filter-tabs",
            "data-source": "library.libraries"
          },
          {
            "type": "one",
            "layouts": "item-grid",
            "data-component": "library-grid",
            "data-items": "library.filteredItems"
          }
        ]
      }
    ]
  }
}
```

### Modal System in JTR
```json
{
  "type": "one",
  "components": "modal",
  "data-if": "library.showUploadModal",
  "children": [
    {
      "type": "one",
      "data-component": "upload-zone",
      "data-on-upload": "library:upload-files"
    }
  ]
}
```

## Implementation Phases

### Phase 1: Hybrid Integration (1-2 days)
1. **Wrap existing Library in JTR**
   - Use data-component system
   - Maintain all current functionality
   - Update integration points

2. **Create JTR presets**
   - library-panel
   - library-header
   - library-grid
   - library-item

3. **Test integration**
   - Drag to canvas
   - Upload functionality
   - All operations work

### Phase 2: Progressive Enhancement (3-5 days)
1. **Extract UI components to JTR**
   - Header → JTR structure
   - Filter tabs → JTR with callbacks
   - Keep core logic in React

2. **Convert styles to presets**
   - Create library-specific presets
   - Remove inline styles gradually
   - Test responsive behavior

### Phase 3: Full Migration (1-2 weeks)
1. **Implement state management**
   - Global state provider
   - Event-driven updates
   - Conditional rendering

2. **Convert all modals**
   - Upload modal
   - Edit modals
   - Manager modals

3. **Handle async operations**
   - Loading states
   - Error handling
   - Progress tracking

## Risk Assessment

### High Risk Areas
1. **File Upload**: Complex with progress tracking
2. **Bulk Selection**: Shift-click logic is intricate
3. **R2 Integration**: Async operations need careful handling
4. **Modal State**: Multiple modals with different states

### Mitigation Strategy
1. Start with hybrid approach
2. Test each phase thoroughly
3. Keep backup of working component
4. Implement feature flags for rollback

### Recommended Approach

**Go with Hybrid (Option 1) initially**:
- Preserves all working functionality
- Allows gradual migration
- Reduces risk of breaking features
- Can always migrate more later

The Library is too complex and valuable to risk breaking during a full rewrite. A hybrid approach maintains stability while allowing progressive enhancement.