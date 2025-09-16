# Indexing

## 🎯 Quick Summary
> **Purpose**: Search and filtering system for library items using lightweight JSON index  
> **Type**: Metadata Index System  
> **Location**: Managed by `/src/workers/asset-worker.js`  
> **Related**: [ASSET-WORKER](./ASSET-WORKER.md), [LIBRARY-OPERATIONS](./LIBRARY-OPERATIONS.md), [R2-STORAGE](./R2-STORAGE.md)

---

## 🔄 Simple Explanation

Indexing maintains a **searchable catalog** of all library items:

1. **Lightweight index** - Just metadata, not full content
2. **Fast filtering** - By type, category, search terms
3. **Auto-updates** - Index updates on every change
4. **Global search** - Across all collections
5. **Query support** - Multiple filter combinations

```
Save item → Update index.json → Enable instant search → Fast library browsing
```

---

## 📋 Technical Specification

### Index Structure

```json
{
  "id": "lib-123",
  "name": "Hero Section",
  "type": "component",
  "collections": ["headers", "marketing"],
  "libraries": ["General", "Premium"],
  "url": "/asset/abc123",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Query Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| **category** | Filter by collection | `?category=headers` |
| **type** | Filter by item type | `?type=component` |
| **search** | Text search | `?search=hero` |
| **library** | Virtual library | `?library=Premium` |

### Index Operations
- Add/update on save
- Remove on delete
- Full rebuild option
- Incremental updates

---

## 🔗 Integration

### Update Flow
```
Library save → Extract metadata → Update index.json → Item searchable
```

### Search Flow
```
List request → Load index → Apply filters → Return results → Fast response
```

### Storage Pattern
```
/index.json          - Main search index
/items/{id}.json     - Full item data
```

---

## 📊 Quick Reference

### Index Benefits
- Instant search
- No database needed
- Edge-cached
- Simple JSON
- Fast updates

### Search Features
- Text matching
- Multi-category
- Type filtering
- Combined queries
- Case-insensitive

### Performance
- Index cached at edge
- Minimal data transfer
- Quick filter operations
- Scalable approach