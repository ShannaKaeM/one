# 03 - Helper Concept

**Status**: Important - Utility class system  
**Domain**: Level 1 - Theme Variable (Atomic)  
**References**: Theme Processor lines 68-77, ui-theme.json helpers section

## Definition

A **helper** is a utility class that provides a single, specific CSS modification. Helpers are atomic styling units for common adjustments like positioning, spacing, or visibility.

## Helper Structure

### JSON Definition
```json
"helpers": {
  "categoryName": {
    "helperName": {
      "--property": "value"
    }
  }
}
```

### Generated CSS
```css
.ui .helperName {
  --property: value;
  property: var(--property);
}
```

## Purpose

Helpers provide quick, single-purpose modifications:

1. **Positioning**: Grid areas (a, b, c, d)
2. **Spacing**: Margins, padding adjustments
3. **Display**: Show/hide elements
4. **Text**: Alignment, transformations
5. **Quick Fixes**: One-off adjustments

## Real Examples

### Positioning Helpers
```json
"helpers": {
  "positioning": {
    "a": { "--grid-area": "a" },
    "b": { "--grid-area": "b" },
    "c": { "--grid-area": "c" },
    "d": { "--grid-area": "d" }
  }
}
```

### Spacing Helpers
```json
"helpers": {
  "spacing": {
    "m-0": { "--margin": "0" },
    "p-1": { "--padding": "8px" },
    "gap-2": { "--gap": "16px" }
  }
}
```

### Display Helpers
```json
"helpers": {
  "display": {
    "hidden": { "--display": "none" },
    "block": { "--display": "block" },
    "grid": { "--display": "grid" }
  }
}
```

## Helper vs Preset

| Aspect | Helper | Preset |
|--------|--------|--------|
| Purpose | Single modification | Complete style set |
| Properties | Usually 1-2 | Multiple related |
| Use Case | Quick adjustment | Full styling |
| Example | `.hidden` | `.button` |

## Usage Pattern

Helpers combine with presets for fine-tuning:

```html
<!-- Preset provides base, helpers adjust -->
<div class="ui button primary m-0 rounded">

<!-- Multiple helpers for positioning -->
<div class="ui wrapper dashboard a hidden">
```

## The Helper Rules

1. **Single Purpose**: One job, done well
2. **Atomic**: Smallest useful unit
3. **Combinable**: Stack multiple helpers
4. **Override Friendly**: Applied last, override presets

## Grid Position Helpers

The most critical helpers are grid positions:

```css
.ui .a { --grid-area: a; grid-area: var(--grid-area); }
.ui .b { --grid-area: b; grid-area: var(--grid-area); }
.ui .c { --grid-area: c; grid-area: var(--grid-area); }
.ui .d { --grid-area: d; grid-area: var(--grid-area); }
```

These enable the entire grid-based layout system.

## Common Patterns

### Responsive Helpers
```json
"helpers": {
  "responsive": {
    "mobile-hidden": { 
      "--display": "none",
      "@media (min-width: 768px)": {
        "--display": "block"
      }
    }
  }
}
```

### State Helpers
```json
"helpers": {
  "states": {
    "disabled": { 
      "--opacity": "0.5",
      "--pointer-events": "none"
    }
  }
}
```

## Category Freedom

Like presets, helper categories are just organization:

```json
"helpers": {
  "my-helpers": {  // Any name works
    "my-helper": { "--property": "value" }
  }
}
```

## Best Practices

1. **Name Clearly**: Helper name should describe its effect
2. **Stay Atomic**: One helper, one job
3. **Document Usage**: Indicate when to use
4. **Avoid Conflicts**: Unique names across helpers

## Guardian Note

Helpers are the atomic units of modification. They should remain simple, single-purpose, and predictable. Complex styling belongs in presets, not helpers.

---

**Note**: Helpers are utilities, not components. They modify, they don't define structure.