# Main

## 🎯 Quick Summary
> **Purpose**: React application entry point that mounts the app to the DOM  
> **Type**: TypeScript Entry File  
> **Location**: `/src/main.tsx`  
> **Related**: [INDEX](../02-PUBLIC/INDEX.md), [APP](../01-CORE/APP.md), [VITE-CONFIG](../01-CORE/VITE-CONFIG.md)

---

## 🔄 Simple Explanation

main.tsx is the **starting point** of the React application:

1. **Imports React and ReactDOM** - Core libraries
2. **Imports App component** - The root component
3. **Imports global CSS** - Base styles
4. **Finds root element** - From index.html
5. **Mounts React app** - Renders to DOM

```
index.html → main.tsx → React.createRoot → App component → Entire application
```

---

## 📋 Technical Specification

### Core Function

```typescript
// Typical main.tsx structure
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### Key Responsibilities
| Task | Purpose |
|------|---------|
| **Import App** | Loads root component |
| **Import CSS** | Applies global styles |
| **Find root div** | Gets mount point |
| **Create React root** | New React 18 API |
| **Render app** | Starts React |

---

## 🔗 Integration

### Boot Sequence
1. Browser loads index.html
2. Script tag loads main.tsx
3. Vite processes TypeScript
4. main.tsx executes
5. React takes over DOM

### Connections
- **Upstream**: Loaded by index.html script tag
- **Downstream**: Renders App component
- **Styles**: Imports global.css
- **Development**: Vite HMR injected here

---

## 📊 Quick Reference

### Purpose
- Single entry point
- Minimal logic
- Just bootstrap code
- No business logic
- Clean and simple

### Common Additions
- Error boundaries
- Provider wrappers
- Initial setup code
- Performance monitoring
- Development tools