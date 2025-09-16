# Workers

## 🎯 Quick Summary
> **Purpose**: Background processing systems that handle heavy tasks without blocking the UI  
> **Type**: Worker Architecture  
> **Location**: `/src/workers/`  
> **Related**: [R2-MANAGER](./UTILS/R2-MANAGER.md), [SERVER](../01-CORE/SERVER.md), [ASSET-WORKER](./WORKERS/ASSET-WORKER.md)

---

## 🔄 Simple Explanation

Workers are **separate JavaScript environments** that run independently from your main application:

1. **Web Workers** - Run in the browser, handle heavy computations
2. **Service Workers** - Cache management, offline functionality  
3. **Cloudflare Workers** - Run on edge servers, handle API operations
4. **Shared Workers** - Shared between multiple browser tabs
5. **No UI blocking** - Keep the app responsive

```
Main App → Sends task to Worker → Worker processes → Returns result → App stays responsive
```

**Studio1 uses Cloudflare Workers** for cloud storage operations, not browser Web Workers.

---

## 📋 Technical Specification

### Worker Types in Web Development

| Type | Runs Where | Purpose |
|------|------------|---------|
| **Web Worker** | Browser thread | Heavy calculations |
| **Service Worker** | Browser background | Caching, offline |
| **Cloudflare Worker** | Edge servers | API, storage |
| **Shared Worker** | Browser shared | Multi-tab communication |

### Studio1's Worker Architecture

```
Studio1 App → HTTP Request → Cloudflare Worker → R2 Storage → Response
```

Currently implements:
- **asset-worker.js** - Cloudflare Worker for R2 operations

Future possibilities:
- Web Workers for image compression
- Service Workers for offline mode
- Background sync workers

---

## 🔗 Integration

### Current Implementation
```
React App → Fetch API → Worker URL → Cloudflare Edge → R2 Buckets
```

### Communication Pattern
- **Request**: HTTP POST/GET to worker endpoint
- **Processing**: Worker handles on Cloudflare edge
- **Response**: JSON data back to app
- **No direct messaging**: Unlike browser workers

### Environment Configuration
```javascript
VITE_WORKER_URL → Points to Cloudflare Worker
```

---

## 📊 Quick Reference

### Why Cloudflare Workers?
- Global edge network
- Integrated with R2 storage
- No server management
- Auto-scaling
- Low latency

### Worker Capabilities
- File uploads
- Asset serving
- Library management
- Image transformation
- CORS handling

### Sub-domains
- **[ASSET-WORKER](./WORKERS/ASSET-WORKER.md)** - Cloudflare Worker handling R2 storage and asset management