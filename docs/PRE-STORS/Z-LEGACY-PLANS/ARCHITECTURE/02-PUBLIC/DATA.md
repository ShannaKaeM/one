# Data

## 🎯 Quick Summary
> **Purpose**: Runtime-loadable JSON configurations for themes and settings  
> **Type**: Static JSON Storage  
> **Location**: `/public/data/`  
> **Related**: [THEME-PROCESSOR](./THEME-PROCESSOR.md), [PUBLIC](./PUBLIC.md), [UI-THEME](./UI-THEME.md), [ONE-THEME](./ONE-THEME.md)

---

## 🔄 Simple Explanation

The Data folder stores **configuration files** that:
1. **Are loaded at runtime** - Not compiled into code
2. **Define themes** - UI and ONE configurations
3. **Can be modified** - Without rebuilding
4. **Are fetched via HTTP** - Using standard fetch()
5. **Support hot swapping** - Change themes on the fly

```
App Starts → Fetch /data/themes/ui-theme.json → Apply Theme → UI Renders
```

---

## 📋 Technical Specification

### Directory Structure

```
public/data/
└── themes/
    ├── ui-theme.json      # Application UI theme
    └── one-theme.json     # Content creation theme
```

### Access Pattern

```javascript
// How themes are loaded
const response = await fetch('/data/themes/ui-theme.json')
const theme = await response.json()
```

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Runtime Loading** | Fetched when needed |
| **JSON Format** | Human-readable configs |
| **URL Accessible** | Direct browser access |
| **No Compilation** | Changes don't require build |
| **Cacheable** | Browser can cache |

### Theme File Structure
```json
{
  "version": "1.0.0",
  "name": "UI Theme",
  "class": "ui",
  "variables": {},
  "presets": {},
  "structure": {}
}
```

---

## 🔗 Integration

### Loading Flow
```
Theme Processor → fetch('/data/themes/ui-theme.json') → Parse JSON → Generate CSS
```

### Development Benefits
- Edit JSON → Save → Refresh → See changes
- No build step required
- Easy theme switching
- External theme support

### Production Deployment
```
Build → data/ copied to dist/data/ → Same URLs work
```

---

## 📊 Quick Reference

### URL Patterns
- `/data/themes/ui-theme.json`
- `/data/themes/one-theme.json`
- `/data/[future-configs]`

### File Types
- `.json` - Configuration files
- Future: `.yaml`, `.toml`

### Security Notes
- Public access - no secrets
- Read-only in production
- Validate after loading
- CORS enabled by default

### Sub-domains
- **THEMES** - Theme file structure
- **RUNTIME-CONFIG** - Dynamic configuration
- **DATA-LOADING** - Fetch patterns
- **THEME-SWITCHING** - Hot swapping