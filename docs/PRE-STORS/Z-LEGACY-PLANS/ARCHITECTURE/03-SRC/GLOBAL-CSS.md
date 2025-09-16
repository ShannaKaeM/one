# Global CSS

## 🎯 Quick Summary
> **Purpose**: Minimal base styles and CSS reset - intentionally kept bare  
> **Type**: Global Stylesheet  
> **Location**: `/src/styles/global.css`  
> **Related**: [MAIN](./MAIN.md), [JSON-THEMES](../02-PUBLIC/JSON-THEMES.md), [THEME-PROCESSOR](../01-CORE/THEME-PROCESSOR.md)

---

## 🔄 Simple Explanation

global.css provides **absolute minimum** base styles:

1. **CSS Reset** - Normalize browser defaults
2. **Box sizing** - Border-box everywhere
3. **Base font** - System font stack
4. **NO component styles** - Those come from themes
5. **NO design decisions** - Just technical resets

```
main.tsx → import global.css → Basic resets → Everything else from themes
```

**IMPORTANT**: We intentionally DON'T use this for styling - all visual design comes from JSON themes!

---

## 📋 Technical Specification

### What's Actually In It

| Style | Purpose |
|-------|---------|
| **CSS Reset** | Remove browser inconsistencies |
| **box-sizing** | Border-box on all elements |
| **margin/padding** | Zero on body/html |
| **font-family** | System font fallback |
| **Root setup** | Height 100%, basic setup |

### What's NOT In It
- ❌ Component styles
- ❌ Color definitions  
- ❌ Layout systems
- ❌ Utility classes
- ❌ Design tokens

### Typical Content
```css
* { box-sizing: border-box; }
body { margin: 0; padding: 0; }
html, body, #root { height: 100%; }
/* That's it! Everything else from themes */
```

---

## 🔗 Integration

### Style Hierarchy
1. **global.css** - Technical resets only
2. **JSON themes** - All visual design
3. **Runtime CSS** - Generated from themes
4. **Inline styles** - Dynamic properties

### Why So Minimal?
```
global.css (resets) → Theme Processor (design) → Full styling
```

All design decisions live in JSON themes, not CSS files!

---

## 📊 Quick Reference

### Rules
- Keep it minimal
- No visual design
- Technical fixes only
- Under 50 lines ideal
- No component styles

### What Goes Here
- Browser resets
- Box model fixes
- Root setup
- Font fallbacks
- Nothing else!

### What Goes in Themes
- Colors
- Spacing
- Typography
- Components
- Everything visual