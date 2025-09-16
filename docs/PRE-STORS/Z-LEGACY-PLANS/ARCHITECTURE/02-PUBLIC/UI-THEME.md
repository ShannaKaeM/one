# UI Theme

## 🎯 Quick Summary
> **Purpose**: Defines the visual design system for Studio1's application interface  
> **Type**: JSON Theme Configuration  
> **Location**: `/public/data/themes/ui-theme.json`  
> **Related**: [THEMES](./THEMES.md), [THEME-PROCESSOR](../01-CORE/THEME-PROCESSOR.md), [APP](../01-CORE/APP.md)

---

## 🔄 Simple Explanation

UI Theme controls **how the Studio1 interface looks**:

1. **Application chrome** - Toolbars, panels, menus
2. **Control elements** - Buttons, inputs, sliders
3. **Layout structure** - Grid systems, spacing
4. **Color system** - Background, text, borders
5. **Component presets** - Pre-defined style combinations

```
ui-theme.json → Theme Processor → .ui class styles → All UI components styled
```

---

## 📋 Technical Specification

### Scope and Application

| Element | Controlled By |
|---------|--------------|
| **App shell** | Root layout, panels |
| **Controls** | Buttons, inputs, selects |
| **Editors** | Property panels, tools |
| **Navigation** | Menus, tabs, trees |
| **Feedback** | Tooltips, modals, alerts |

### Class Assignment
```html
<!-- UI theme applies via root class -->
<div className="ui">
  <!-- All children inherit UI styling -->
</div>
```

### Variable Categories
- Layout: `--ui-spacing-*`, `--ui-grid-*`
- Colors: `--ui-color-*`, `--ui-bg-*`
- Typography: `--ui-font-*`, `--ui-text-*`
- Components: `--ui-button-*`, `--ui-input-*`

---

## 🔗 Integration

### Loading Sequence
1. **App.tsx** initiates theme load
2. **Fetch** `/data/themes/ui-theme.json`
3. **Theme Processor** generates CSS
4. **Style injection** into document head
5. **React components** use variables

### Component Connection
```
UIGenerator → reads ui-theme.json → renders with .ui class → styled interface
```

### Update Flow
```
Change JSON → Save → Refresh → New styles applied
```

---

## 📊 Quick Reference

### Affects
- All Studio1 interface elements
- Editor controls and panels
- Layout and spacing
- Interactive components
- Does NOT affect created content

### Key Properties
- `class: "ui"` - Root selector
- `variables` - CSS custom properties
- `presets` - Component combinations
- `structure` - Layout definitions

### Development
- Edit JSON directly
- No compilation needed
- Instant preview on refresh
- Version controlled