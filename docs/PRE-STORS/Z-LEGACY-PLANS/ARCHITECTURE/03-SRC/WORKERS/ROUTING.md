# Routing

## 🎯 Quick Summary
> **Purpose**: Request routing system that maps URLs to handler functions  
> **Type**: API Routing Architecture  
> **Location**: Implemented in `/src/workers/asset-worker.js`  
> **Related**: [ASSET-WORKER](./ASSET-WORKER.md), [LIBRARY-OPERATIONS](./LIBRARY-OPERATIONS.md), [R2-STORAGE](./R2-STORAGE.md)

---

## 🔄 Simple Explanation

Routing handles **how URLs map to functions** in the Asset Worker:

1. **URL parsing** - Extracts path and parameters
2. **Method routing** - GET, POST, DELETE handling
3. **Endpoint mapping** - /upload, /library, /asset paths
4. **CORS management** - Cross-origin headers
5. **Error responses** - Consistent error format

```
Request → Parse URL → Match endpoint → Call handler → Return response
```

---

## 📋 Technical Specification

### Route Map

| Path | Method | Handler | Purpose |
|------|--------|---------|---------|
| `/upload` | POST | handleUpload | Upload new assets |
| `/library/save` | POST | handleLibrarySave | Save library items |
| `/library/list` | GET | handleLibraryList | List with filters |
| `/library/{id}` | GET | handleLibraryGet | Get specific item |
| `/library/{id}` | DELETE | handleLibraryDelete | Delete item |
| `/asset/{hash}` | GET | handleAssetServe | Serve files |

### URL Pattern Matching
```javascript
switch (url.pathname) {
  case '/upload': return handleUpload()
  case '/library/save': return handleLibrarySave()
  default: 
    if (url.pathname.startsWith('/asset/')) return handleAssetServe()
}
```

### CORS Configuration
- Allow all origins (configurable)
- Support preflight requests
- Include required headers

---

## 🔗 Integration

### Request Flow
```
Cloudflare Edge → Worker fetch() → Parse request → Route to handler
```

### Response Format
```javascript
// Success
{ success: true, data: {...} }

// Error  
{ success: false, error: "message" }
```

### Parameter Extraction
- Path params: `/library/{id}`
- Query params: `?category=layout`
- Body parsing: JSON/FormData

---

## 📊 Quick Reference

### HTTP Methods
- **GET** - Retrieve resources
- **POST** - Create/upload
- **DELETE** - Remove items
- **OPTIONS** - CORS preflight

### Common Patterns
- RESTful endpoints
- Consistent paths
- Clear naming
- Version-ready

### Error Handling
- 404 - Not found
- 405 - Method not allowed
- 500 - Server errors
- CORS-enabled responses