# Public

## 🎯 Quick Summary
> **Purpose**: Static assets and entry point that are served directly without processing  
> **Type**: Static Directory  
> **Location**: `/public/`  
> **Related**: [INDEX](./INDEX.md), [DATA](./DATA.md), [THEMES](./THEMES.md)

---

## 🔄 Simple Explanation

The Public folder contains files that:
1. **Are served as-is** - No processing or compilation
2. **Bypass the build system** - Direct file serving
3. **Are directly accessible** - Via URL paths
4. **Don't trigger hot reload** - Changes need manual refresh
5. **Copy to dist unchanged** - In production builds

```
Browser Request → Public Files → Direct Delivery (no processing)
```

---

## 📋 Technical Specification

### Directory Structure

```
public/
├── index.html          # See INDEX domain
├── data/              # See DATA domain
│   └── themes/        # See THEMES domain
│       ├── ui-theme.json
│       └── one-theme.json
└── [static assets]    # Future: images, fonts
```

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Direct URLs** | Path matches directory structure |
| **Performance** | No compile/transform time |
| **Build Output** | Same structure in dist/ |

---

## 🔗 Integration

### Access Pattern
```
Browser → URL path → Public folder → File served
```

### Build Process
```
Development: Vite serves from public/
Production: Files copied to dist/
```

### Usage Examples
```javascript
// Fetching data files
fetch('/data/any-file.json')

// Referencing assets
<img src="/logo.png" />
```

---

## 📊 Quick Reference

### Important Rules
- Don't import these in JS/TS files
- Use fetch() or direct URLs
- Keep sensitive data OUT
- Version large assets separately

### Sub-domains
- **[INDEX](./INDEX.md)** - HTML entry point
- **[DATA](./DATA.md)** - Runtime configurations
- **[THEMES](./THEMES.md)** - Design system configurations
- **STATIC-ASSETS** - Images and media (future)
- **PUBLIC-ACCESS** - URL patterns and serving