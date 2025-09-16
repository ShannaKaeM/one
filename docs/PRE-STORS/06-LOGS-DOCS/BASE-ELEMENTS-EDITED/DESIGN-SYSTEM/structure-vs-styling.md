---
type: L1-ATOM
category: DESIGN-SYSTEM
status: COMPLETE
source: 01-ROADMAP.md#L41-45
related: [grid-only-layout, preset-concept, base-variable-constraint]
---

# Structure vs Styling

## Definition
A fundamental separation principle where grid defines spatial relationships (structure) while presets define visual appearance (styling), enabling infinite combinations.

## Key Principles
- Structure is pure layout
- Styling is pure appearance
- Never mix concerns
- Complete independence

## The Separation

### Structure = Grid
- Defines spatial relationships
- Controls positioning
- Manages alignment
- No visual properties

### Styling = Presets
- Defines colors, shadows, borders
- Controls typography
- Manages visual effects
- No layout properties

### Dimensions = Base Elements
- Width/height for content
- Element-level sizing
- Not grid dimensions
- Content-driven

## Philosophy

### Universal Combinations
Any element + any preset = valid combination
```html
<!-- All valid -->
<div class="wrapper minimal">
<div class="wrapper glass">
<div class="text minimal">
<div class="text glass">
```

### Clean Mental Model
1. **Choose structure** - How elements relate
2. **Choose elements** - What content types
3. **Choose presets** - How they look
4. **Mix freely** - No restrictions

## Examples

### Pure Structure (Grid)
```css
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "a b";
  /* No colors, borders, etc. */
}
```

### Pure Styling (Preset)
```css
.glass {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  /* No display, position, etc. */
}
```

### Combined Usage
```html
<div class="layout">
  <div class="wrapper glass" style="grid-area: a;">
    <!-- Structure from grid, styling from preset -->
  </div>
</div>
```

## Benefits

### Flexibility
- Change looks without touching layout
- Rearrange without restyling
- Test variations quickly
- Infinite possibilities

### Maintainability
- Update styles globally
- Fix layouts independently
- Clear separation of concerns
- Predictable behavior

### Reusability
- Presets work everywhere
- Grids work with any content
- Mix and match freely
- No coupling

## Anti-Patterns

### Never Do This
```css
/* ❌ Mixing concerns */
.card {
  display: grid; /* Structure */
  background: blue; /* Styling */
  grid-template-columns: 1fr; /* Structure */
  border: 1px solid; /* Styling */
}
```

### Always Do This
```css
/* ✅ Separated concerns */
.card-layout {
  display: grid;
  grid-template-columns: 1fr;
}

.card-style {
  background: blue;
  border: 1px solid;
}
```

## Related Atoms
- `grid-only-layout` - Structure implementation
- `preset-concept` - Styling system
- `base-variable-constraint` - Dimension rules