# R2 Manager

## 🎯 Quick Summary
> **Purpose**: Client-side interface for Cloudflare R2 cloud storage operations  
> **Type**: Cloud Storage Utility  
> **Location**: `/src/utils/r2Manager.ts`  
> **Related**: [STORAGE-MANAGER](./STORAGE-MANAGER.md), [SERVER](../../01-CORE/SERVER.md), [LIBRARY](../../01-CORE/LIBRARY.md)

---

## 🔄 Simple Explanation

R2 Manager handles **cloud storage operations**:

1. **Content-addressed storage** - SHA-256 based deduplication
2. **Asset uploads** - Images, files to cloud
3. **Library operations** - Save/load components
4. **Image variants** - Auto-generated sizes
5. **Worker-based API** - Cloudflare Workers backend

```
Upload file → R2 Manager → Worker API → Cloudflare R2 → URL returned
```

---

## 📋 Technical Specification

### Core Features

| Feature | Function |
|---------|----------|
| **uploadAsset()** | Upload files with deduplication |
| **saveToLibrary()** | Store components/projects |
| **loadFromLibrary()** | Retrieve saved items |
| **listLibrary()** | Browse available items |
| **deleteAsset()** | Remove from cloud |

### Storage Types
- **Media** - Images, videos
- **Components** - Reusable elements  
- **Documents** - Full layouts
- **Projects** - Complete saves
- **Websites** - Exported sites

### Content Addressing
```
File → SHA-256 hash → Check if exists → Skip upload if duplicate
```

---

## 🔗 Integration

### Upload Flow
```
User selects file → R2 Manager → Worker URL → R2 Storage → CDN URL
```

### Library Flow  
```
Save component → R2 Manager → Categorize → Store in R2 → Available globally
```

### Connected Systems
- **Worker API** - Backend processing
- **CDN** - Asset delivery
- **Library UI** - Browse/manage
- **Storage Manager** - Local backup

### Environment Config
```javascript
VITE_WORKER_URL → Worker endpoint
Configurable per environment
```

---

## 📊 Quick Reference

### Benefits
- Unlimited storage
- Global CDN
- Deduplication
- Image optimization
- Version control

### URL Structure
```
https://[worker-url]/[hash]
https://[worker-url]/[hash]?variant=thumb
```

### Collections & Libraries
- Collections: Categories
- Libraries: Virtual groups
- Tags: Searchable metadata
- Shared globally

### Performance
- Edge caching
- Image variants
- Lazy loading
- Progressive enhancement