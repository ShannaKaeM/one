# Vite Config

## 🎯 Quick Summary
> **Purpose**: Configures the build tool and development server  
> **Type**: Build Configuration  
> **Location**: `/vite.config.ts`  
> **Related**: [CORE-CONFIG](../01.10-CORE-CONFIG.md), [PACKAGE-JSON](./PACKAGE-JSON.md), [SERVER](./SERVER.md)

---

## 🔄 Simple Explanation

vite.config.ts controls **how your app builds**:
1. **Development server** - Port, proxy, hot reload
2. **Build process** - Output directory, optimizations
3. **Plugin system** - React support, custom features
4. **Path resolution** - Import aliases
5. **Environment handling** - Dev vs production

```
Vite → Reads config → Transforms code → Serves/builds app
```

---

## 📋 Technical Specification

### Core Settings

| Setting | Purpose |
|---------|---------|
| **plugins** | React, PWA, other integrations |
| **server** | Dev server port and proxy |
| **build** | Output directory and options |
| **resolve** | Path aliases (@/ shortcuts) |
| **define** | Global constants |

### Server Configuration
- Port: 5173 (default)
- Proxy: `/api` → backend server
- CORS: Enabled
- HMR: Hot module replacement

---

## 🔗 Integration

### Development Flow
```
vite.config → Dev server → HMR → Browser updates
```

### Build Process
```
vite build → Read config → Bundle code → dist/ folder
```

---

## 📊 Quick Reference

### Key Features
- Lightning fast HMR
- ESM native support
- TypeScript built-in
- CSS preprocessing
- Asset optimization

### Common Customizations
- Change port number
- Add proxy rules
- Configure aliases
- Add plugins
- Set build targets