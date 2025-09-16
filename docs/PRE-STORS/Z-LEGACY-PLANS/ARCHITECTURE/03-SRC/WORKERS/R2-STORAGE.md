# R2 Storage

## 🎯 Quick Summary
> **Purpose**: Cloudflare R2 object storage system with content-addressed deduplication  
> **Type**: Cloud Storage Architecture  
> **Location**: Managed by `/src/workers/asset-worker.js`  
> **Related**: [ASSET-WORKER](./ASSET-WORKER.md), [R2-MANAGER](../../UTILS/R2-MANAGER.md), [LIBRARY-OPERATIONS](./LIBRARY-OPERATIONS.md)

---

## 🔄 Simple Explanation

R2 Storage is **Cloudflare's object storage** that Studio1 uses for all cloud file storage:

1. **Content-addressed** - Files stored by their SHA-256 hash
2. **Automatic deduplication** - Same file never stored twice
3. **Two buckets** - ASSETS for files, LIBRARY for metadata
4. **Immutable storage** - Files never change once stored
5. **Global access** - Available from anywhere

```
File upload → Calculate SHA-256 → Check if exists → Store by hash → No duplicates
```

---

## 📋 Technical Specification

### Bucket Architecture

| Bucket | Stores | Key Format |
|--------|--------|------------|
| **ASSETS_BUCKET** | Raw files (images, etc.) | SHA-256 hash |
| **LIBRARY_BUCKET** | Component metadata | `items/{id}.json`, `index.json` |

### Content Addressing System
```
File → SHA-256 hash → abc123... → /asset/abc123
Same file uploaded again → Same hash → No new storage
```

### Storage Features
- No egress fees
- S3-compatible API
- Automatic versioning
- Global replication
- Direct CDN integration

---

## 🔗 Integration

### Upload Pattern
```javascript
// Hash-based storage
const hash = SHA256(file)
await env.ASSETS_BUCKET.put(hash, file, {
  httpMetadata: { contentType, cacheControl }
})
```

### Retrieval Pattern
```javascript
// Get by hash
const object = await env.ASSETS_BUCKET.get(hash)
return new Response(object.body, { headers })
```

### Metadata Storage
```javascript
// Library items in separate bucket
await env.LIBRARY_BUCKET.put(`items/${id}.json`, metadata)
```

---

## 📊 Quick Reference

### Benefits
- Zero duplicate files
- Reduced storage costs
- Consistent URLs
- Version-proof
- Cache-friendly

### URL Structure
- Assets: `/asset/{sha256-hash}`
- Variants: `/asset/{hash}?w=800`
- Library: `/library/{item-id}`

### Limits
- 10MB per upload (configurable)
- Unlimited total storage
- No bandwidth charges
- Global availability