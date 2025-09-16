# Index

## 🎯 Quick Summary
> **Purpose**: HTML entry point that loads the React application  
> **Type**: Static HTML File  
> **Location**: `/public/index.html`  
> **Related**: [MAIN](./MAIN.md), [PUBLIC](./PUBLIC.md), [CORE-CONFIG](./CORE-CONFIG.md)

---

## 🔄 Simple Explanation

index.html is the **first file** the browser loads:
1. **Provides the root element** - Where React mounts
2. **Loads the main script** - Starts the app
3. **Sets meta tags** - Page title, viewport
4. **Defines the structure** - Basic HTML skeleton
5. **No React code here** - Just plain HTML

```
Browser → index.html → Load main.tsx → React App Starts
```

---

## 📋 Technical Specification

### File Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Studio1</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Key Elements

| Element | Purpose |
|---------|---------|
| `<div id="root">` | React mount point |
| `<script type="module">` | ES modules support |
| `/src/main.tsx` | Entry script path |
| `viewport` meta | Mobile responsiveness |
| `charset` | UTF-8 encoding |

### Vite Integration

```html
<!-- Development -->
<script type="module" src="/src/main.tsx"></script>

<!-- Production (after build) -->
<script type="module" src="/assets/main-[hash].js"></script>
```

---

## 🔗 Integration

### Load Sequence
1. Browser requests `/`
2. Server returns `index.html`
3. Browser parses HTML
4. Loads `/src/main.tsx`
5. Vite processes TypeScript
6. React app initializes

### Mount Process
```javascript
// main.tsx finds this element
document.getElementById('root')
```

### Build Transformation
```
Development: Vite injects HMR scripts
Production: Vite replaces paths with built assets
```

---

## 📊 Quick Reference

### Root Element
- ID: `root`
- Purpose: React mount point
- Empty initially
- Filled by React

### Script Loading
- Type: ES Module
- Source: `/src/main.tsx`
- Processed by: Vite
- Async: No (blocks rendering)

### Common Modifications
- Add favicon
- Include fonts
- Set meta tags
- Add analytics
- Include polyfills

### Things to Avoid
- Don't add styles here (use CSS files)
- Don't add content in root div
- Don't use non-module scripts
- Don't hardcode API URLs