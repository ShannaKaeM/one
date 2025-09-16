# 04 - Class Order

**Status**: Important - Determines style cascade  
**Domain**: Level 1 - Element Variable (Atomic)  
**References**: UI Generator lines 22-27, 69-86

## Definition

**Class Order** is the specific sequence in which CSS classes are applied to elements. This order determines style precedence and ensures predictable rendering.

## The Order

Classes are applied in this exact sequence:

1. **Theme Name** - Scope identifier (`ui` or `one`)
2. **Element Type** - Structural class (`wrapper`, `text`, `image`)
3. **Presets** - Style combinations (can be multiple)
4. **Position** - Grid placement (`a`, `b`, `c`, `d`)
5. **Helpers** - Utility modifiers (last, highest priority)

## Example Application

### JSON Input
```json
{
  "type": "wrapper",
  "preset": ["dashboard", "dark"],
  "position": "a",
  "helpers": ["rounded", "shadow"]
}
```

### Generated Classes
```html
<div class="ui wrapper dashboard dark a rounded shadow">
```

### Cascade Order
1. `.ui` - Base theme variables
2. `.wrapper` - Element type styles
3. `.dashboard` - Layout preset
4. `.dark` - Color scheme preset
5. `.a` - Grid position
6. `.rounded` - Border modifier
7. `.shadow` - Shadow effect

## Why Order Matters

### CSS Specificity
Later classes override earlier ones:

```css
.ui { --padding: 0; }
.wrapper { --padding: 8px; }
.dashboard { --padding: 16px; }
.a { /* doesn't set padding */ }
.rounded { /* doesn't set padding */ }
/* Final padding: 16px from .dashboard */
```

### Progressive Enhancement
Each class layer adds to or modifies the previous:

```css
/* Base */
.ui { 
  --background-color: hsl(0, 0%, 100%);
  background-color: var(--background-color);
}

/* Element type adds structure */
.wrapper { 
  --display: block;
  display: var(--display);
}

/* Preset changes appearance */
.dark { 
  --background-color: hsl(0, 0%, 10%);
}

/* Helper fine-tunes */
.rounded { 
  --border-radius: 8px;
  border-radius: var(--border-radius);
}
```

## Implementation in UIGenerator

```javascript
function buildClasses(element, theme) {
  const classes = [];
  
  // 1. Theme name (always first)
  classes.push(theme);
  
  // 2. Element type
  if (element.type) {
    classes.push(element.type);
  }
  
  // 3. Presets
  if (element.preset) {
    if (Array.isArray(element.preset)) {
      classes.push(...element.preset);
    } else {
      classes.push(element.preset);
    }
  }
  
  // 4. Position
  if (element.position) {
    classes.push(element.position);
  }
  
  // 5. Helpers
  if (element.helpers) {
    classes.push(...element.helpers);
  }
  
  return classes.join(' ');
}
```

## Multiple Presets

When multiple presets are applied:

```json
{
  "preset": ["button", "primary", "large"]
}
```

They apply in array order:
1. `.button` - Base button styles
2. `.primary` - Color scheme
3. `.large` - Size modifier

## Position Specifics

Position classes (`a`, `b`, `c`, `d`) are special:
- Only one position per element
- Applied after all presets
- Used for grid placement

```css
.a { --grid-area: a; grid-area: var(--grid-area); }
```

## Common Patterns

### Base + Modifier
```html
<div class="ui button primary">
<!-- .button provides base, .primary modifies -->
```

### Layout + Theme + Position
```html
<div class="ui wrapper dashboard dark a">
<!-- Complete element with all layers -->
```

### Progressive Styling
```html
<div class="ui text heading large centered bold">
<!-- Each class adds a layer of styling -->
```

## Order Rules

1. **Theme Always First**: Establishes scope
2. **Type Before Style**: Structure before appearance
3. **General to Specific**: Broad styles then refinements
4. **Helpers Last**: Final overrides

## Debugging Class Order

In DevTools, classes apply left-to-right:

```html
<div class="ui wrapper dashboard dark a rounded">
```

If unexpected styling:
1. Check class order
2. Verify preset definitions
3. Look for conflicting properties
4. Ensure helpers are last

## Common Mistakes

### Mistake 1: Wrong Order
```html
<!-- ❌ WRONG -->
<div class="dashboard ui wrapper a dark">

<!-- ✅ CORRECT -->
<div class="ui wrapper dashboard dark a">
```

### Mistake 2: Missing Theme Class
```html
<!-- ❌ WRONG -->
<div class="wrapper dashboard">

<!-- ✅ CORRECT -->
<div class="ui wrapper dashboard">
```

### Mistake 3: Position Before Presets
```html
<!-- ❌ WRONG -->
<div class="ui wrapper a dashboard">

<!-- ✅ CORRECT -->
<div class="ui wrapper dashboard a">
```

## Guardian Note

Class order is not arbitrary - it's a carefully designed cascade system. Maintaining this order ensures predictable, debuggable styling.

---

**Note**: The class order creates a styling cascade from general (theme) to specific (helpers). This predictability is crucial for the visual builder and theme system.