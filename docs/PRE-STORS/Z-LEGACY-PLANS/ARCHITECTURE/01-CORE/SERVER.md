# Server

## 🎯 Quick Summary
> **Purpose**: Backend API server for file operations and R2 storage  
> **Type**: Node.js Express Server  
> **Location**: `/server.js`  
> **Related**: [CORE-CONFIG](../01.10-CORE-CONFIG.md), [VITE-CONFIG](./VITE-CONFIG.md), [ENV-LOCAL](./ENV-LOCAL.md)

---

## 🔄 Simple Explanation

server.js provides the **backend API**:
1. **File operations** - Read/write local files
2. **R2 storage** - Cloudflare object storage
3. **API endpoints** - REST routes
4. **CORS handling** - Cross-origin requests
5. **Environment secrets** - API keys access

```
Frontend → /api/files → server.js → File system/R2
```

---

## 📋 Technical Specification

### API Endpoints

| Endpoint | Purpose |
|----------|---------|
| **/api/files** | List directory contents |
| **/api/files/read** | Read file content |
| **/api/files/write** | Save file content |
| **/api/r2** | R2 storage operations |
| **/health** | Server status check |

### Server Features
- Express.js framework
- CORS enabled
- JSON body parsing
- Error handling
- Port 3001 (default)

---

## 🔗 Integration

### Request Flow
```
React app → fetch('/api/...') → Vite proxy → server.js
```

### Environment Usage
```
server.js → process.env → .env.local secrets
```

---

## 📊 Quick Reference

### Starting Server
- `npm run server` - Production
- Runs alongside Vite dev
- Auto-restarts on changes

### Security
- CORS configured
- Request validation
- Error sanitization
- No direct file access

### Dependencies
- Express
- Cloudflare R2 SDK
- CORS middleware
- Body parser