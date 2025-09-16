# Element ID System Guide

## Overview

The Element ID System in Studio ONE provides unique identification for all elements across the application, from library items to canvas elements. This guide explains how IDs are generated, managed, and tracked throughout the element lifecycle.

## Core Concepts

### 1. ID Format
All IDs follow a consistent pattern:
```
{type}-{timestamp}-{randomString}
```

Example: `element-1704893245678-a3b2c1d4e`

- **type**: Describes the element type (element, layer, group, lib, project, imported)
- **timestamp**: Milliseconds since epoch (ensures chronological ordering)
- **randomString**: 9-character random string (prevents collisions)

### 2. Centralized Generation
All IDs are generated through the `autoIdHelper` singleton:
```javascript
import { autoIdHelper } from './utils/autoIdHelper';

const newId = autoIdHelper.generateId('element');
// Returns: "element-1704893245678-a3b2c1d4e"
```

## ID Lifecycle Flow

### 1. Library Upload
When content is uploaded to the library:
```
File Upload → R2 Storage → Library ID: lib-{timestamp}-{random}
```

### 2. Canvas Creation
When elements are created on canvas:
```
User Action → generateElementId() → Canvas ID: element-{timestamp}-{random}
```

### 3. Library to Canvas
When library items are dropped onto canvas:
```
Library Item (lib-xxx) → Drop Event → New Canvas Element (element-yyy)
```
**Note**: Each drop creates a NEW canvas ID, allowing the same library item to be used multiple times.

### 4. Project Import
When importing saved projects:
```
Original IDs → ID Regeneration → New Unique IDs (preserving relationships)
```

## ID Types and Their Uses

### Library IDs
- **Format**: `lib-{timestamp}-{random}`
- **Generated**: When uploading to R2 storage
- **Persistent**: Yes, stored in R2
- **Example**: `lib-1704893245678-abc123def`

### Canvas Element IDs  
- **Format**: `element-{timestamp}-{random}`
- **Generated**: When creating elements on canvas
- **Persistent**: Only when project is saved
- **Example**: `element-1704893245678-xyz789ghi`

### Special Types
- **Groups**: `group-{timestamp}-{random}`
- **Layers**: `layer-{timestamp}-{random}`
- **Projects**: `project-{timestamp}-{random}`
- **Imported**: `imported-{timestamp}-{random}`

## ID Generation Points

### 1. JSONtoREACT (Theme Processing)
- Processes theme structures
- Converts placeholder IDs (box1, ui1) to real IDs
- Uses `autoIdHelper.processStructure()`

### 2. DirectRenderer (Canvas Operations)
- New element creation
- Element duplication
- Group creation
- Layer addition
- All use `generateElementId()` passed from App.tsx

### 3. Project Import
- Regenerates all element IDs to prevent conflicts
- Maintains parent-child relationships
- Updates group member references

### 4. Library Operations
- Library upload: Creates library ID
- Canvas drop: Creates new element ID
- Each use gets unique canvas ID

## Tracking Relationships

### Library Source Tracking (Future Enhancement)
```javascript
{
  id: 'element-123-abc',        // Canvas element ID
  libraryId: 'lib-456-def',     // Source library item
  libraryUrl: 'https://...',    // Original asset URL
  name: 'My Component',
  // ... other properties
}
```

This enables:
- Updating library items from canvas
- Syncing changes across instances
- Tracking element usage
- Version history

## Future Use Cases

### 1. Update Library Item
```javascript
// Save canvas changes back to library
async function updateLibraryItem(canvasElement) {
  if (canvasElement.libraryId) {
    await r2Manager.updateLibraryItem(
      canvasElement.libraryId,
      canvasElement
    );
  }
}
```

### 2. Create New Version
```javascript
// Save as new library item, linked to original
async function saveAsNewVersion(canvasElement) {
  const newLibraryId = autoIdHelper.generateId('lib');
  await r2Manager.saveToLibrary({
    ...canvasElement,
    id: newLibraryId,
    parentId: canvasElement.libraryId, // Link to original
    version: 2
  });
}
```

### 3. Sync All Instances
```javascript
// Update all canvas elements from same library source
function syncFromLibrary(libraryId, updates) {
  const instances = elements.filter(el => el.libraryId === libraryId);
  instances.forEach(instance => {
    updateElement(instance.id, updates);
  });
}
```

### 4. Usage Analytics
```javascript
// Find all uses of a library item
function getLibraryItemUsage(libraryId) {
  return elements.filter(el => el.libraryId === libraryId);
}
```

## Best Practices

### 1. Always Use Centralized Generation
```javascript
// ✅ Good
const id = generateElementId('element');
const id = autoIdHelper.generateId('group');

// ❌ Bad  
const id = `element-${Date.now()}`;
const id = Math.random().toString();
```

### 2. Preserve Relationships
When cloning or importing, maintain parent-child relationships:
```javascript
const idMap = new Map();
// First pass: generate new IDs
elements.forEach(el => {
  idMap.set(el.id, generateElementId(el.type));
});
// Second pass: update references
elements.forEach(el => {
  if (el.children) {
    el.children = el.children.map(childId => idMap.get(childId));
  }
});
```

### 3. Track Library Sources
When creating from library:
```javascript
const canvasElement = {
  id: generateElementId('element'),
  libraryId: libraryItem.id,  // Track source
  libraryUrl: libraryItem.url,
  // ... rest of element
};
```

## Implementation Status

### ✅ Completed
- Centralized ID generation via autoIdHelper
- Unique ID format with timestamp + random
- ID regeneration on project import
- Consistent ID generation across all components

### 🔄 In Progress
- Lifting element state to App.tsx
- Passing generateElementId to all components

### 📅 Planned
- Library source tracking (libraryId field)
- Update library from canvas
- Sync instances feature
- Version history tracking

## Troubleshooting

### Duplicate IDs
If you encounter duplicate IDs:
1. Check if using centralized generation everywhere
2. Verify project import regenerates IDs
3. Ensure not manually creating IDs

### ID Format Issues
If IDs don't match expected format:
1. Check for legacy ID generation (Date.now only)
2. Verify using autoIdHelper.generateId()
3. Update any hardcoded ID patterns

### Missing IDs
If elements lack IDs:
1. Ensure JSONtoREACT processes structure
2. Check autoIdHelper.processStructure() is called
3. Verify ID assignment in element creation

## Code Examples

### Creating New Element
```javascript
// In App.tsx
const generateElementId = (type = 'element') => {
  return autoIdHelper.generateId(type);
};

// In DirectRenderer
const newElement = {
  id: generateElementId('element'),
  type: 'one',
  name: 'New Element',
  // ... properties
};
```

### Dropping from Library
```javascript
// When library item dropped on canvas
const canvasElement = {
  id: generateElementId('element'),
  libraryId: libraryItem.id,     // Track source
  type: libraryItem.type,
  content: libraryItem.content,
  // ... properties
};
```

### Importing Project
```javascript
// In storageManager.ts
project.elements.forEach(element => {
  const oldId = element.id;
  const newId = autoIdHelper.generateId(element.type);
  idMap.set(oldId, newId);
  element.id = newId;
});
```

## Summary

The Element ID System provides:
- **Unique identification** for all elements
- **Consistent format** across the application  
- **Relationship tracking** between library and canvas
- **Conflict prevention** through centralized generation
- **Future flexibility** for sync and versioning features

By maintaining separate IDs for library items and canvas instances, we enable powerful features while preventing ID conflicts and maintaining clean separation of concerns.