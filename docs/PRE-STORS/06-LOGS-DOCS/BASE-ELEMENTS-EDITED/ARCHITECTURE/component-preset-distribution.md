---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: Flat component pattern implementation
related: [flat-component-pattern, preset-concept, ui-generator, react-integration-pattern]
---

# Component Preset Distribution

## Definition
The mechanism by which presets defined in `data-component-presets` are distributed to internal parts of React components, enabling granular styling control without breaking component encapsulation.

## Key Principles
- Presets flow from JSON to component parts
- Components decide how to apply presets
- No preset logic in UIGenerator
- Maintains React best practices

## Distribution Flow

### 1. JSON Definition
```json
{
  "data-component": "LayerTree",
  "data-component-presets": {
    "container": "neutral-dark",
    "header": "primary bold",
    "item": "list-item",
    "hover": "neutral-pop"
  }
}
```

### 2. UIGenerator Processing
```typescript
// UIGenerator detects data-component-presets
const presets = element["data-component-presets"];

// Passes to React component as props
<LayerTree presets={presets} />
```

### 3. Component Distribution
```typescript
interface ComponentPresets {
  container?: string;
  header?: string;
  item?: string;
  hover?: string;
  [key: string]: string | undefined;
}

const LayerTree: React.FC<{ presets?: ComponentPresets }> = ({ 
  presets = {} 
}) => {
  return (
    <div className={`layerTree ${presets.container || ''}`}>
      <div className={`layerTree-header ${presets.header || ''}`}>
        Layer Tree
      </div>
      <div className="layerTree-content">
        {items.map(item => (
          <div 
            key={item.id}
            className={`layerTree-item ${presets.item || ''}`}
            onMouseEnter={(e) => {
              if (presets.hover) {
                e.currentTarget.classList.add(presets.hover);
              }
            }}
            onMouseLeave={(e) => {
              if (presets.hover) {
                e.currentTarget.classList.remove(presets.hover);
              }
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Distribution Patterns

### Static Distribution
Presets applied directly to className:
```typescript
<div className={`component-part ${presets.part || ''}`}>
```

### Dynamic Distribution
Presets applied conditionally:
```typescript
<div className={`
  component-part 
  ${isActive ? presets.active : presets.inactive}
  ${presets.base || ''}
`}>
```

### State-Based Distribution
Presets applied for interactions:
```typescript
const handleMouseEnter = (e) => {
  if (presets.hover) {
    e.currentTarget.classList.add(presets.hover);
  }
};
```

### Nested Distribution
Presets for complex hierarchies:
```typescript
// Multiple levels of preset application
<div className={`panel ${presets.container || ''}`}>
  <header className={`panel-header ${presets.header || ''}`}>
    <h2 className={`panel-title ${presets.title || ''}`}>
      {title}
    </h2>
  </header>
  <div className={`panel-content ${presets.content || ''}`}>
    {children}
  </div>
</div>
```

## Preset Key Conventions

### Structural Keys
- `container` - Main wrapper element
- `header` - Header section
- `content` - Main content area
- `footer` - Footer section

### List-Based Keys
- `item` - Individual list items
- `itemSelected` - Selected state
- `itemHover` - Hover state
- `itemDisabled` - Disabled state

### Interactive Keys
- `hover` - Hover effects
- `active` - Active/pressed state
- `focus` - Focus state
- `disabled` - Disabled state

### Custom Keys
Components can define any preset keys:
```typescript
interface PropertyPanelPresets {
  panel?: string;
  toolbar?: string;
  section?: string;
  field?: string;
  label?: string;
  input?: string;
  button?: string;
}
```

## Multiple Preset Application

### Space-Separated Presets
```json
"data-component-presets": {
  "container": "neutral-dark elevated rounded shadow"
}
```

Becomes:
```typescript
<div className={`component ${presets.container}`}>
// Result: "component neutral-dark elevated rounded shadow"
```

### Conditional Preset Mixing
```typescript
const getItemClassName = (item) => {
  const baseClasses = `item ${presets.item || ''}`;
  const stateClasses = item.selected ? presets.selected || '' : '';
  const hoverClasses = item.disabled ? '' : presets.hover || '';
  
  return `${baseClasses} ${stateClasses}`.trim();
};
```

## Error Handling

### Missing Presets
```typescript
// Always provide fallbacks
const presets = props.presets || {};
const containerClass = `component ${presets.container || 'default-container'}`;
```

### Invalid Preset Names
```typescript
// Sanitize preset names if needed
const sanitizePreset = (preset) => {
  return preset?.replace(/[^a-zA-Z0-9-_]/g, '') || '';
};

<div className={`component ${sanitizePreset(presets.container)}`}>
```

### Type Safety
```typescript
interface ValidatedPresets {
  container?: string;
  header?: string;
  // ... other valid keys
}

const validatePresets = (presets: any): ValidatedPresets => {
  const valid: ValidatedPresets = {};
  const allowedKeys = ['container', 'header', 'item', 'hover'];
  
  allowedKeys.forEach(key => {
    if (typeof presets[key] === 'string') {
      valid[key] = presets[key];
    }
  });
  
  return valid;
};
```

## Performance Considerations

### Memoization
```typescript
const memoizedClassName = useMemo(() => {
  return `component ${presets.container || ''}`;
}, [presets.container]);
```

### Event Handler Optimization
```typescript
const handleMouseEnter = useCallback((e) => {
  if (presets.hover) {
    e.currentTarget.classList.add(presets.hover);
  }
}, [presets.hover]);
```

### Preset Changes
```typescript
// Detect preset changes and update classes
useEffect(() => {
  if (elementRef.current && presets.container) {
    elementRef.current.className = `component ${presets.container}`;
  }
}, [presets.container]);
```

## Best Practices

### Component Design
1. Define clear preset keys for all styleable parts
2. Provide sensible defaults
3. Document preset interface
4. Handle missing presets gracefully

### Preset Naming
1. Use descriptive, consistent names
2. Group related parts with prefixes
3. Follow component-part pattern
4. Avoid generic names like "style" or "class"

### Distribution Logic
1. Keep preset application simple
2. Use TypeScript for preset interfaces
3. Validate preset inputs
4. Optimize for performance

## Integration Example

Complete component with preset distribution:

```typescript
interface AlertPresets {
  container?: string;
  icon?: string;
  title?: string;
  message?: string;
  actions?: string;
  button?: string;
}

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  title: string;
  message: string;
  presets?: AlertPresets;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  presets = {},
  onClose 
}) => {
  return (
    <div className={`alert alert-${type} ${presets.container || ''}`}>
      <div className={`alert-icon ${presets.icon || ''}`}>
        {getIcon(type)}
      </div>
      <div className="alert-content">
        <h4 className={`alert-title ${presets.title || ''}`}>
          {title}
        </h4>
        <p className={`alert-message ${presets.message || ''}`}>
          {message}
        </p>
      </div>
      {onClose && (
        <div className={`alert-actions ${presets.actions || ''}`}>
          <button 
            className={`alert-close ${presets.button || ''}`}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
```

Usage:
```json
{
  "data-component": "Alert",
  "data-component-presets": {
    "container": "elevated rounded shadow",
    "title": "primary bold",
    "message": "neutral-dark",
    "button": "primary small"
  }
}
```

## Related Atoms
- `flat-component-pattern` - Overall architecture
- `preset-concept` - How presets work
- `ui-generator` - Component rendering
- `react-integration-pattern` - React integration details