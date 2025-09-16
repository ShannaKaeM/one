# Library Operations

## 🎯 Quick Summary
> **Purpose**: CRUD operations for managing components, projects, and media in the cloud library  
> **Type**: Library Management System  
> **Location**: Implemented in `/src/workers/asset-worker.js`  
> **Related**: [ASSET-WORKER](./ASSET-WORKER.md), [R2-STORAGE](./R2-STORAGE.md), [INDEXING](./INDEXING.md)

---

## 🔄 Simple Explanation

Library Operations handle **saving and managing reusable content** in the cloud:

1. **Save components** - Store for reuse across projects
2. **Organize collections** - Categories and virtual libraries  
3. **CRUD operations** - Create, read, update, delete
4. **Media library** - Images with metadata
5. **Global sharing** - Access from any device

```
Save component → Add metadata → Store in library → Available everywhere
```

---

## 📋 Technical Specification

### Item Types

| Type | Description | Storage |
|------|-------------|---------|
| **element** | Single elements | JSON structure |
| **component** | Reusable groups | JSON structure |
| **document** | Full layouts | JSON structure |
| **project** | Complete projects | JSON + assets |
| **media** | Images/files | Reference + metadata |

### Library Item Structure
```json
{
  "id": "lib-unique-id",
  "name": "Card Component",
  "type": "component",
  "collections": ["cards", "marketing"],
  "libraries": ["General", "Premium"],
  "elements": {...},
  "metadata": {
    "createdAt": "2024-01-01",
    "updatedAt": "2024-01-01",
    "author": "user"
  }
}
```

### Operations
- **Save** - Store new/update existing
- **List** - Filter by type/category
- **Get** - Retrieve specific item
- **Delete** - Remove item and cleanup
- **Clear** - Bulk delete (with caution)

---

## 🔗 Integration

### Save Flow
```
Component selected → Add metadata → POST /library/save → Store in R2 → Update index
```

### Retrieval Flow  
```
Library UI → GET /library/list → Filter results → Display items → Drag to canvas
```

### Organization
- **Collections**: Technical categories
- **Libraries**: Virtual groupings
- **Metadata**: Custom properties
- **Search**: Via index system

---

## 📊 Quick Reference

### Key Features
- Unlimited storage
- Global availability
- Version tracking
- Bulk operations
- Rich metadata

### Use Cases
- Design systems
- Template libraries
- Asset management
- Project sharing
- Team resources

### Best Practices
- Name clearly
- Tag appropriately
- Organize collections
- Regular cleanup
- Version important items