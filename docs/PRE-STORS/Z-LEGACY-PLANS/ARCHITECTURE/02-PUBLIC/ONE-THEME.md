# ONE Theme

## 🎯 Quick Summary
> **Purpose**: Defines the visual design system for user-created content elements  
> **Type**: JSON Theme Configuration  
> **Location**: `/public/data/themes/one-theme.json`  
> **Related**: [THEMES](./THEMES.md), [THEME-PROCESSOR](../01-CORE/THEME-PROCESSOR.md), [DIRECT-RENDERER](../01-CORE/DIRECT-RENDERER.md)

---

## 🔄 Simple Explanation

ONE Theme controls **how created content looks**:

1. **Content elements** - Text, images, containers
2. **Canvas items** - Everything users create
3. **Export styling** - How content appears when shared
4. **Component library** - Pre-styled elements
5. **Separate from UI** - Content vs interface

```
one-theme.json → Theme Processor → .one class styles → User content styled
```

---

## 📋 Technical Specification

### Scope and Application

| Element | Controlled By |
|---------|--------------|
| **Canvas content** | User-created elements |
| **Text elements** | Headings, paragraphs |
| **Containers** | Divs, sections, grids |
| **Media elements** | Images, videos |
| **Interactive items** | Links, buttons in content |

### Class Assignment
```html
<!-- ONE theme applies to content areas -->
<div className="one">
  <!-- User-created content here -->
</div>
```

### Variable Categories
- Content: `--one-text-*`, `--one-bg-*`
- Typography: `--one-h1-*`, `--one-p-*`
- Spacing: `--one-gap-*`, `--one-padding-*`
- Components: `--one-card-*`, `--one-section-*`

---

## 🔗 Integration

### Rendering Flow
1. **Direct Renderer** creates elements
2. **Apply** `.one` class to content
3. **Theme variables** style elements
4. **Canvas** displays styled content
5. **Export** maintains styling

### Separation Pattern
```
UI Theme → Studio1 Interface
ONE Theme → Created Content
Never mix → Clean separation
```

### Library Connection
```
Library components → Use ONE theme → Drag to canvas → Styled consistently
```

---

## 📊 Quick Reference

### Affects
- All user-created content
- Canvas elements
- Exported designs
- Component library items
- Does NOT affect Studio1 UI

### Key Properties
- `class: "one"` - Root selector
- `variables` - Content styling
- `presets` - Element templates
- `structure` - Layout systems

### Use Cases
- Website designs
- Marketing materials
- Document layouts
- Any created content

### Independence
- Changes don't affect UI
- Can be swapped freely
- External theme support
- Brand customization