---
type: L1-ATOM
category: PRESETS
status: COMPLETE
source: Theme system implementation
related: [preset-categories, preset-mixing, theme-processor, flat-component-pattern]
---

# Preset Concept

## Definition
A preset is a collection of CSS properties that work together as a reusable style combination. Presets can be applied to standard elements OR distributed to React component parts through the flat component pattern.

## Key Principles
- CSS property collections
- Reusable across elements
- Theme-scoped classes
- Component-part distribution (NEW)

## Basic Preset Structure

### Standard Element Preset
```json
"presets": {
  "buttons": {
    "primary": {
      "--padding": "12px 24px",
      "--border-radius": "6px",
      "--background-color": "hsl(207, 90%, 54%)",
      "--color": "hsl(0, 0%, 100%)",
      "--cursor": "pointer"
    }
  }
}
```

### Component-Aware Preset (NEW)
```json
"components": {
  "layerTree": {
    "--display": "flex",
    "--flex-direction": "column",
    "--gap": "4px"
  },
  "layerTree-item": {
    "--padding": "8px",
    "--border-radius": "4px"
  }
}
```

## Preset Application Methods

### Method 1: Direct Element Application
```html
<div class="wrapper card"></div>
<!-- Applies card preset to wrapper -->
```

### Method 2: Flat Component Distribution (NEW)
```json
{
  "type": "wrapper",
  "preset": "layerTree",
  "data-component": "LayerTree",
  "data-component-presets": {
    "container": "neutral-dark",
    "header": "primary",
    "item": "neutral-dark",
    "hover": "neutral-pop"
  }
}
```

The UIGenerator reads `data-component-presets` and passes them to the React component, which distributes them to internal parts:

```typescript
// Inside React component
<div className={`layerTree-container ${presets.container || ''}`}>
  <div className={`layerTree-header ${presets.header || ''}`}>
    {/* Header content */}
  </div>
</div>
```

## Preset Categories

### Color Presets
Used for backgrounds, borders, text colors:
```json
"neutral-dark": {
  "--background-color": "hsl(210, 10%, 15%)",
  "--color": "hsl(210, 10%, 90%)"
}
```

### Component Presets
Define structure and layout for components:
```json
"layerTree": {
  "--display": "flex",
  "--flex-direction": "column",
  "--width": "100%"
}
```

### State Presets
Handle interactive states:
```json
"neutral-pop": {
  "--background-color": "hsl(48, 89%, 50%)",
  "--color": "hsl(48, 89%, 10%)"
}
```

## Preset Mixing

### Traditional Mixing
Multiple presets on one element:
```html
<div class="wrapper card elevated dark"></div>
```

### Component Part Mixing (NEW)
Different presets for each component part:
```json
"data-component-presets": {
  "container": "neutral-dark elevated",
  "header": "primary bold",
  "item": "neutral-dark interactive"
}
```

## Best Practices

### Naming Conventions
- Use descriptive names: `primary`, `neutral-dark`, `elevated`
- Prefix component parts: `layerTree-item`, `layerTree-header`
- Keep consistent patterns across categories

### Preset Scope
- Global presets: Usable anywhere
- Component presets: Specific to component structure
- State presets: Interactive behaviors

### Component Integration (NEW)
When creating component presets:
1. Define base component structure preset
2. Create part-specific presets with component prefix
3. Enable preset distribution through `data-component-presets`
4. Let React component handle internal application

## Examples

### Button Preset
```json
"primary": {
  "--padding": "12px 24px",
  "--background-color": "var(--color-primary)",
  "--color": "white",
  "--border": "none",
  "--border-radius": "6px",
  "--cursor": "pointer"
}
```

### Complex Component Preset Set (NEW)
```json
// Base component
"propertyPanel": {
  "--display": "flex",
  "--flex-direction": "column",
  "--width": "300px"
},

// Component parts
"propertyPanel-header": {
  "--padding": "16px",
  "--border-bottom": "1px solid var(--border-color)"
},

"propertyPanel-content": {
  "--padding": "16px",
  "--overflow-y": "auto"
}
```

Usage:
```json
{
  "data-component": "PropertyPanel",
  "data-component-presets": {
    "container": "neutral-light",
    "header": "primary",
    "content": "neutral-light"
  }
}
```

## Related Atoms
- `preset-categories` - Organization of presets
- `preset-mixing` - Combining presets
- `theme-processor` - How presets become CSS
- `flat-component-pattern` - Component preset distribution