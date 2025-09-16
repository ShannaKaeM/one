# Asset Worker

## 🎯 Quick Summary
> **Purpose**: Cloudflare Worker that manages all R2 storage operations and asset serving  
> **Type**: Edge API Worker  
> **Location**: `/src/workers/asset-worker.js`  
> **Related**: [WORKERS](../WORKERS.md), [R2-MANAGER](../UTILS/R2-MANAGER.md), [LIBRARY](../../01-CORE/LIBRARY.md)

---

## 🔄 Simple Explanation

Asset Worker is a **Cloudflare Worker** that runs on edge servers worldwide to handle all cloud storage operations:

1. **Uploads files** - Content-addressed with SHA-256 hashing
2. **Serves assets** - Fast CDN delivery with caching
3. **Manages library** - Save/load components and projects
4. **Processes images** - Automatic resizing and variants
5. **Handles CORS** - Cross-origin security

```
Upload file → Asset Worker → SHA-256 hash → Store in R2 → Return CDN URL
```

This is NOT a browser worker - it's a serverless API running on Cloudflare's network.

---

## 📋 Technical Specification

### Core Responsibilities

| Function | Purpose |
|----------|---------|
| **Content Addressing** | SHA-256 deduplication |
| **Asset Upload** | Store files in R2 |
| **Library CRUD** | Create, read, update, delete |
| **Image Variants** | Auto-generate sizes |
| **Edge Caching** | Global CDN delivery |

### API Endpoints
```
POST   /upload           - Upload new asset
POST   /library/save     - Save library item
GET    /library/list     - List library items
GET    /library/{id}     - Get specific item
DELETE /library/{id}     - Delete item
GET    /asset/{hash}     - Serve asset
```

### Storage Buckets
- **ASSETS_BUCKET** - Raw files (images, etc.)
- **LIBRARY_BUCKET** - Component/project metadata

---

## 🔗 Integration

### Upload Flow
```
R2 Manager → FormData → Asset Worker → Hash file → Check duplicate → Store → Return URL
```

### Serving Flow
```
Browser → Request asset → Cloudflare edge → Cache hit? → Serve from R2 → Response
```

### Library Flow
```
Save component → Asset Worker → Store metadata → Update index → Available globally
```

### Environment Setup
- Deployed via Wrangler CLI
- Configured with R2 buckets
- Environment variables for auth

---

## 📊 Quick Reference

### Key Features
- Zero duplicate storage
- Global edge network
- Automatic image optimization
- Immutable caching
- Search indexing

### Performance
- Edge locations worldwide
- Browser caching (1 year)
- Content-addressed URLs
- Progressive image loading

### Sub-domains
- **R2-STORAGE** - Cloudflare R2 bucket management and content addressing
- **ROUTING** - Request routing and endpoint handling
- **IMAGE-PROCESSING** - Cloudflare Image Resizing integration
- **INDEXING** - Library search and filtering system
- **LIBRARY-OPERATIONS** - CRUD operations for components and projects