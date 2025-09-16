# PostCSS Config

## 🎯 Quick Summary
> **Purpose**: CSS transformation pipeline configuration  
> **Type**: CSS Processing Configuration  
> **Location**: `/postcss.config.js`  
> **Related**: [CORE-CONFIG](../01.10-CORE-CONFIG.md), [GLOBAL-CSS](../../01.07-GLOBAL-CSS.md), [VITE-CONFIG](./VITE-CONFIG.md)

---

## 🔄 Simple Explanation

postcss.config.js controls **CSS processing**:
1. **Autoprefixer** - Adds browser prefixes
2. **CSS nesting** - Modern syntax support
3. **Optimizations** - Minification, purging
4. **Future CSS** - Use tomorrow's CSS today
5. **Plugin pipeline** - Transform chain

```
CSS files → PostCSS → Apply plugins → Optimized CSS
```

---

## 📋 Technical Specification

### Plugin Pipeline

| Plugin | Purpose |
|--------|---------|
| **autoprefixer** | Browser compatibility |
| **postcss-nesting** | CSS nesting syntax |
| **cssnano** | Production minification |
| **postcss-import** | @import handling |

### Processing Flow
1. Import CSS file
2. Apply transformations
3. Add vendor prefixes
4. Output processed CSS

---

## 🔗 Integration

### Build Integration
```
Vite → PostCSS → Process CSS → Bundle output
```

### Development Benefits
```
Write modern CSS → PostCSS transforms → Works everywhere
```

---

## 📊 Quick Reference

### Key Features
- Automatic prefixing
- CSS nesting support
- Import resolution
- Custom properties
- Media query packing

### Browser Support
- Configured via .browserslistrc
- Last 2 versions
- > 1% usage
- Not dead browsers

### Performance
- Development: Fast processing
- Production: Full optimization
- Tree shaking: Remove unused