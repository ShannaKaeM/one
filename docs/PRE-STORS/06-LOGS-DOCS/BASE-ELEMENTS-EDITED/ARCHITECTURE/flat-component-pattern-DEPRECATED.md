---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: UI Theme React integration breakthrough
related: [ui-generator, theme-processor, preset-concept, data-attributes]
---

# Flat Component Pattern

## Definition
A revolutionary architecture pattern that allows complex React components to be represented as single JSON elements while maintaining granular preset control over component parts through data-component-presets.

## Key Principles
- Single element represents entire component
- Granular preset control via JSON
- Clean separation of structure and styling
- React functionality preserved

## How It Works

### 1. JSON Structure
```json
{
  "type": "wrapper",
  "preset": "componentBase",
  "data-component": "ComponentName",
  "data-component-presets": {
    "container": "preset-name",
    "header": "another-preset",
    "item": "item-preset",
    "hover": "hover-preset"
  }
}
```

### 2. UIGenerator Processing
The UIGenerator:
1. Detects `data-component` attribute
2. Injects the React component
3. Passes `data-component-presets` as props
4. Component distributes presets internally

### 3. React Component Integration
```typescript
interface ComponentPresets {
  container?: string;
  header?: string;
  item?: string;
  hover?: string;
  [key: string]: string | undefined;
}

function Component({ presets }: { presets: ComponentPresets }) {
  return (
    <div className={`component-container ${presets.container || ''}`}>
      <header className={`component-header ${presets.header || ''}`}>
        {/* Header content */}
      </header>
      <div className={`component-item ${presets.item || ''}`}>
        {/* Item content */}
      </div>
    </div>
  );
}
```

## Benefits

### For Designers
- Control every part of complex components
- Use familiar preset system
- No code changes needed for styling
- Mix and match presets freely

### For Developers
- Clean component architecture
- Predictable styling system
- Easy preset integration
- Maintain React best practices

### For the System
- Single source of truth (JSON)
- Consistent theming approach
- Scalable pattern
- Performance optimized

## Implementation Pattern

### Step 1: Create React Component
```typescript
const LayerTree: React.FC<{ presets?: Record<string, string> }> = ({ presets = {} }) => {
  return (
    <div className={`layerTree ${presets.container || ''}`}>
      <div className={`layerTree-header ${presets.header || ''}`}>
        Layer Tree
      </div>
      <div className={`layerTree-content`}>
        {items.map(item => (
          <div 
            key={item.id}
            className={`layerTree-item ${presets.item || ''}`}
            onMouseEnter={(e) => e.currentTarget.classList.add(presets.hover || '')}
            onMouseLeave={(e) => e.currentTarget.classList.remove(presets.hover || '')}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Step 2: Define Component Presets
```json
"components": {
  "layerTree": {
    "--display": "flex",
    "--flex-direction": "column",
    "--width": "100%"
  },
  "layerTree-header": {
    "--padding": "12px",
    "--font-weight": "600"
  },
  "layerTree-item": {
    "--padding": "8px 12px",
    "--cursor": "pointer"
  }
}
```

### Step 3: Configure in Structure
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

## Advanced Usage

### Multiple Preset Application
```json
"data-component-presets": {
  "container": "neutral-dark elevated rounded",
  "header": "primary bold uppercase"
}
```

### Dynamic Preset Assignment
```typescript
const dynamicPresets = {
  item: isSelected ? presets.selected : presets.item,
  hover: isDisabled ? '' : presets.hover
};
```

### Nested Components
```json
{
  "data-component": "PropertyPanel",
  "data-component-presets": {
    "container": "panel-base",
    "sections": {
      "general": "section-light",
      "advanced": "section-dark"
    }
  }
}
```

## Best Practices

### Naming Conventions
- Component base: `componentName`
- Component parts: `componentName-part`
- States: `componentName-state`

### Preset Organization
```json
"components": {
  // Base component preset
  "propertyPanel": { },
  
  // Part presets
  "propertyPanel-header": { },
  "propertyPanel-section": { },
  "propertyPanel-footer": { }
}
```

### Performance Considerations
- Presets are compiled once
- CSS variables enable runtime changes
- No re-renders for style changes
- Efficient class application

## Common Patterns

### List Components
```json
{
  "data-component": "ItemList",
  "data-component-presets": {
    "container": "list-container",
    "item": "list-item",
    "itemHover": "list-item-hover",
    "itemSelected": "list-item-selected"
  }
}
```

### Form Components
```json
{
  "data-component": "FormField",
  "data-component-presets": {
    "wrapper": "field-wrapper",
    "label": "field-label",
    "input": "field-input",
    "error": "field-error"
  }
}
```

### Navigation Components
```json
{
  "data-component": "Navigation",
  "data-component-presets": {
    "nav": "nav-container",
    "link": "nav-link",
    "linkActive": "nav-link-active",
    "linkHover": "nav-link-hover"
  }
}
```

## Related Atoms
- `ui-generator` - Processes data-component
- `theme-processor` - Generates preset CSS
- `preset-concept` - Core preset system
- `data-attributes` - Attribute handling