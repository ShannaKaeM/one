---
type: L1-ATOM
category: DESIGN-SYSTEM
status: COMPLETE
source: 01-ROADMAP.md#L30
related: [grid-only-layout, base-variable-constraint]
---

# Proportional Sizing

## Definition
A sizing constraint that requires all layout dimensions to be proportional and flexible, never fixed, ensuring responsive design without media queries.

## Key Principles
- No fixed pixel values in layouts
- Use relative units exclusively
- Let content define size
- Proportions over pixels

## Allowed Units

### Grid Proportions
- `1fr`, `2fr` - Fractional units for flexible space
- `auto` - Content-based sizing
- `minmax(min, max)` - Flexible with constraints
- `30% 70%` - Percentage-based splits

### Element Sizing
- `100%` - Fill parent container
- `auto` - Natural content size
- Percentages - Relative to parent
- CSS variables - For consistency

## Forbidden Units

### Never Use in Layouts:
- `px` - Fixed pixels
- `rem` - Fixed root ems
- `em` - Fixed ems
- `vh/vw` - Can be used sparingly for specific cases

## Examples

### Correct Proportional Layout
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}

.sidebar {
  width: 100%;
  min-width: 0; /* Prevent overflow */
}
```

### Incorrect Fixed Layout
```css
/* ❌ Never do this */
.container {
  grid-template-columns: 250px 500px 250px;
  height: 600px;
}
```

## Philosophy
- Layouts adapt to any screen size
- Content determines dimensions
- Proportions create harmony
- Flexibility over rigidity

## Use Cases
1. **Dashboard Layouts** - Sidebars that adapt
2. **Content Grids** - Responsive without queries
3. **Component Sizing** - Scale with container
4. **Nested Layouts** - Maintain proportions

## Related Atoms
- `grid-only-layout` - Overall layout system
- `base-variable-constraint` - Variable sizing rules