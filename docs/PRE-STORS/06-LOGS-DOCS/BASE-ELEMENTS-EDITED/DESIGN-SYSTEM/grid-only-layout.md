---
type: L1-ATOM
category: DESIGN-SYSTEM
status: COMPLETE
source: 01-ROADMAP.md#L25-46
related: [grid-position-system, proportional-sizing, no-flexbox-rule]
---

# Grid Only Layout

## Definition
A design constraint that mandates CSS Grid as the sole layout system, forbidding flexbox and enabling the universal grid area system.

## Key Principles
- No flexbox allowed

## Required Practices

### 1. Grid Structure Only
Grid layouts define structure with no fixed dimensions

### 2. Fill Container Sizing
Use `100%` height/width to fill outer containers when needed

### 3. Proportional Values
Use `auto`, `1fr`, `minmax()`, or percentages (`30% 70%`) for flexible layouts

### 4. Named Grid Areas
Always use CSS Grid areas (`a`, `b`, `c`, `d`) for explicit positioning

### 5. Auto Grid for Repetition
Use auto-flow grid only for repeatable items (navigation, button groups)

## Forbidden Practices

### Never Use:
1. **Fixed Grid Dimensions** - No `px`, `rem`, `em` values in grid-template-columns/rows
2. **Flexbox** - Block and grid layouts only
3. **Inline Styles** - All styling through presets
4. **React-Style Properties** - No camelCase in theme JSON

## Examples

### Correct Grid Usage
```css
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "a a a"
    "b c d"
    "e e e";
}
```

### Incorrect (Never Do This)
```css
.layout {
  display: flex; /* ❌ No flexbox */
  grid-template-columns: 200px 400px; /* ❌ No fixed dimensions */
}
```

## Philosophy
- **Structure = Grid** (defines layout relationships)
- **Styling = Presets** (defines visual appearance)  
- **Dimensions = Base Elements** (width/height for content sizing)
- **Universal = Mix & Match** (any element + any preset combination)

## Related Atoms
- `grid-position-system` - Grid area positioning details
- `proportional-sizing` - Rules for flexible dimensions
- `no-flexbox-rule` - Why flexbox is forbidden