# Themes

## 🎯 Quick Summary
> **Purpose**: JSON-based design system configurations that control all visual styling  
> **Type**: Runtime Configuration System  
> **Location**: `/public/data/themes/`  
> **Related**: [DATA](../DATA.md), [THEME-PROCESSOR](../01-CORE/THEME-PROCESSOR.md), [UI-THEME](./UI-THEME.md), [ONE-THEME](./ONE-THEME.md)

---

## 🔄 Simple Explanation

Themes are **JSON configuration files** that define how everything looks:

1. **Loaded at runtime** - Fetched when app starts, not compiled in
2. **Two-theme system** - UI theme for app interface, ONE theme for content
3. **Generate CSS dynamically** - JSON is converted to CSS variables
4. **Hot-swappable** - Change themes without rebuilding
5. **External storage** - Can be loaded from anywhere

```
App starts → Fetch theme.json → Theme Processor → CSS variables → Styled app
```

---

## 📋 Technical Specification

### Architecture Pattern

```
JSON Theme Files → Runtime Theme Processor → Dynamic CSS → React Components
```

### Theme Structure
| Section | Purpose |
|---------|---------|
| **variables** | CSS custom properties |
| **presets** | Component style sets |
| **structure** | Layout configurations |
| **version** | Theme compatibility |
| **class** | Root CSS class name |

### Loading Mechanism
```javascript
// Themes are fetched, not imported
fetch('/data/themes/ui-theme.json')
  → Parse JSON
  → Process into CSS
  → Inject into document
```

---

## 🔗 Integration

### Theme Flow
1. **App initialization** - App.tsx requests themes
2. **HTTP fetch** - Load from /public/data/themes/
3. **Processing** - runtimeThemeProcessor.ts converts JSON
4. **CSS injection** - Creates stylesheet in document
5. **React rendering** - Components use CSS variables

### Component Usage
```
React component → className="ui" → CSS variables apply → Styled output
```

---

## 📊 Quick Reference

### Theme Files
- `ui-theme.json` - Application interface
- `one-theme.json` - Content creation

### Key Features
- No build-time compilation
- Browser-cacheable
- Version controlled
- Externally hostable
- Real-time updates

### Sub-domains
- **UI-THEME** - Application interface styling
- **ONE-THEME** - Content element styling
- **THEME-LOADING** - Fetch and cache patterns
- **THEME-STRUCTURE** - JSON schema details