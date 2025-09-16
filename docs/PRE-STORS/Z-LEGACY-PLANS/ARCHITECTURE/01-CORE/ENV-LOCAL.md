# ENV Local

## 🎯 Quick Summary
> **Purpose**: Secret keys and environment-specific configuration  
> **Type**: Environment Variables  
> **Location**: `/.env.local`  
> **Related**: [CORE-CONFIG](../01.10-CORE-CONFIG.md), [SERVER](./SERVER.md), [VITE-CONFIG](./VITE-CONFIG.md)

---

## 🔄 Simple Explanation

.env.local stores **secret configuration**:
1. **API keys** - Service credentials
2. **Environment flags** - Dev/prod settings
3. **Feature toggles** - Enable/disable features
4. **External URLs** - API endpoints
5. **Never committed** - Git ignored

```
App/Server → Read .env.local → Use secrets → Access services
```

---

## 📋 Technical Specification

### Variable Types

| Type | Purpose | Example |
|------|---------|---------|
| **VITE_*** | Frontend variables | VITE_API_URL |
| **R2_*** | Cloudflare storage | R2_ACCESS_KEY |
| **API_*** | Service keys | API_SECRET_KEY |
| **NODE_ENV** | Environment mode | development |

### Access Patterns
- Frontend: `import.meta.env.VITE_*`
- Backend: `process.env.*`
- Build time: Replaced by Vite

---

## 🔗 Integration

### Frontend Usage
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

### Backend Usage
```javascript
const r2Key = process.env.R2_ACCESS_KEY
```

---

## 📊 Quick Reference

### Security Rules
- Never commit .env.local
- Use .env.example template
- Prefix frontend vars with VITE_
- Keep secrets minimal
- Rotate keys regularly

### Common Variables
- R2 credentials
- API endpoints
- Feature flags
- Debug settings

### File Management
- Created locally
- Not in git
- Copy from .env.example
- Document all vars