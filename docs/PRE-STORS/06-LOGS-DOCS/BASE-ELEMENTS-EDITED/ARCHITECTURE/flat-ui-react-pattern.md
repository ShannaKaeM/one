---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: UI Theme React integration - combined and updated from flat-component-pattern and react-integration-pattern
related: [ui-generator, theme-processor, preset-concept, data-attributes]
---

# Flat UI React Pattern

## Definition
A streamlined architecture pattern that allows React components to be styled through Studio1's preset system using a flat configuration approach, maintaining clean separation between component logic and theme styling.

## Key Principles
- React components retain their own base styles
- UI theme provides preset overrides via CSS cascade
- Single line configuration: `data-preset-targets`
- No modification of React component internals
- Runtime preset application after component renders

## How It Works

### 1. Simplest Form - Ultra Flat Syntax
```json
{
  "type": "wrapper",
  "data-component": "LayerTree",
  "data-preset-targets": "layerTree-header:primary layerTree-item:secondary layerTree-button:ghost"
}
```

### 2. Alternative - Flat Children Structure
```json
{
  "type": "wrapper",
  "data-component": "LayerTree",
  "children": [
    {"type": "layerTree-header", "preset": "primary"},
    {"type": "layerTree-item", "preset": "secondary"},
    {"type": "layerTree-button", "preset": "ghost"}
  ]
}
```

### 3. UIGenerator Processing
```typescript
// Parse data-preset-targets
if (element['data-preset-targets']) {
  const pairs = element['data-preset-targets'].split(' ');
  pairs.forEach(pair => {
    const [target, preset] = pair.split(':');
    if (target && preset) {
      targetPresets[target] = preset;
    }
  });
}

// Apply presets after React component renders
setTimeout(() => {
  Object.entries(targetPresets).forEach(([targetClass, preset]) => {
    const targetElements = el.querySelectorAll(`.${targetClass}`);
    targetElements.forEach(targetEl => {
      preset.split(' ').forEach(p => {
        if (p.trim()) targetEl.classList.add(p.trim());
      });
    });
  });
}, 50);
```

### 4. React Component Structure
```typescript
// Component has its own base styles
const layerTreeStyles = `
  .layerTree {
    background-color: #333;
    color: white;
  }
  .layerTree-header {
    background-color: purple;
    padding: 8px 16px;
  }
  .layerTree-item {
    background-color: #444;
    padding: 4px 8px;
  }
`;

// Component renders with class names that can be targeted
function LayerTree({ elements }) {
  return (
    <div className="layerTree">
      <div className="layerTree-header">Layers</div>
      {elements.map(el => (
        <div className="layerTree-item">{el.name}</div>
      ))}
    </div>
  );
}
```

## Benefits

### Clean Separation
- React components maintain their base styles
- Theme presets override via CSS cascade
- No props drilling or complex preset distribution
- Component logic remains untouched

### Designer Friendly
- Single line to restyle entire component
- Use any existing preset from the theme
- Mix multiple presets: `"layerTree-item:secondary elevated rounded"`
- No React knowledge required

### Developer Friendly
- Components work standalone with base styles
- No special preset handling code needed
- Standard CSS class application
- Easy to debug with DevTools

## Implementation Steps

### 1. Remove Legacy Detection
```javascript
// Remove any legacy component detection that bypasses the system
// Example: Remove "left sidebar" detection that was preventing preset application
```

### 2. Ensure Component Has Target Classes
```typescript
// React component must use consistent class names
<div className="layerTree">
  <div className="layerTree-header">...</div>
  <div className="layerTree-item">...</div>
  <button className="layerTree-button">...</button>
</div>
```

### 3. Configure in UI Theme Structure
```json
{
  "type": "wrapper",
  "preset": "sidebar neutral-dark a",
  "children": [
    {
      "type": "wrapper",
      "data-component": "LayerTree",
      "data-preset-targets": "layerTree-header:primary layerTree-item:secondary"
    }
  ]
}
```

## Common Patterns

### List Components
```json
"data-preset-targets": "list-header:primary list-item:neutral-dark list-item.selected:secondary"
```

### Form Components
```json
"data-preset-targets": "form-label:text form-input:input-base form-error:error"
```

### Navigation Components
```json
"data-preset-targets": "nav-link:ghost nav-link.active:primary"
```

## Important Notes

### Timing
- 50ms delay ensures React component is fully rendered
- Presets apply after React's render cycle completes
- No interference with React's virtual DOM

### Specificity
- Base component styles have normal specificity
- Preset classes add additional styles
- CSS cascade handles the override naturally

### Debugging
- Check console for "Preset targets found" message
- Verify element count: "Found X elements with class"
- Inspect elements to see applied classes

## Differences from Other Flat Patterns

This pattern is specifically for **React components in the UI theme**. Other flat patterns in Studio1:

- **Flat Canvas Elements** - ONE theme elements without nesting
- **Flat HTML Export** - Semantic HTML generation
- **Save and Flatten** - Converting nested structures to flat

The Flat UI React Pattern is unique because it bridges the JSON configuration world with React component styling, enabling theme customization without modifying component code.

## Related Atoms
- `ui-generator` - Processes data-component and applies presets
- `theme-processor` - Generates CSS from presets
- `preset-concept` - Core preset system
- `parent-scope-pattern` - How presets cascade