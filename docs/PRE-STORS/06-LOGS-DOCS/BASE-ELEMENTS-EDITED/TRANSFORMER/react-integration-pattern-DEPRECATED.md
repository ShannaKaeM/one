---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: Flat component pattern implementation
related: [flat-component-pattern, component-preset-distribution, ui-generator, props-injection]
---

# React Integration Pattern

## Definition
The standardized approach for integrating React components into Studio1's JSON-driven architecture, enabling seamless transformation between declarative JSON and functional React components.

## Key Principles
- JSON remains single source of truth
- React components are rendering targets
- Props flow through preset system
- Components stay decoupled from JSON structure

## Integration Architecture

### 1. JSON Element Declaration
```json
{
  "type": "wrapper",
  "preset": "componentBase",
  "data-component": "PropertyPanel",
  "data-component-presets": {
    "container": "panel-base elevated",
    "header": "primary",
    "content": "neutral-light"
  },
  "data-props": {
    "title": "Layer Properties",
    "collapsible": true
  }
}
```

### 2. UIGenerator Detection & Rendering
```typescript
// UIGenerator processes JSON elements
const processElement = (element: JsonElement) => {
  if (element["data-component"]) {
    return renderReactComponent(element);
  }
  return renderStandardElement(element);
};

const renderReactComponent = (element: JsonElement) => {
  const ComponentClass = getComponent(element["data-component"]);
  const presets = element["data-component-presets"] || {};
  const props = element["data-props"] || {};
  
  return (
    <ComponentClass 
      presets={presets}
      {...props}
    />
  );
};
```

### 3. React Component Implementation
```typescript
interface PropertyPanelProps {
  title?: string;
  collapsible?: boolean;
  presets?: {
    container?: string;
    header?: string;
    content?: string;
  };
  children?: React.ReactNode;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  title = "Properties",
  collapsible = false,
  presets = {},
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className={`propertyPanel ${presets.container || ''}`}>
      <div className={`propertyPanel-header ${presets.header || ''}`}>
        <h3>{title}</h3>
        {collapsible && (
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        )}
      </div>
      {!collapsed && (
        <div className={`propertyPanel-content ${presets.content || ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};
```

## Component Registration

### Registration System
```typescript
// Component registry
const COMPONENT_REGISTRY = new Map<string, React.ComponentType<any>>();

// Registration function
export const registerComponent = (name: string, component: React.ComponentType<any>) => {
  COMPONENT_REGISTRY.set(name, component);
};

// Usage in component files
registerComponent('PropertyPanel', PropertyPanel);
registerComponent('LayerTree', LayerTree);
registerComponent('ColorPicker', ColorPicker);

// Retrieval function
export const getComponent = (name: string): React.ComponentType<any> | null => {
  return COMPONENT_REGISTRY.get(name) || null;
};
```

### Auto-Registration
```typescript
// Auto-register components from directory
const componentModules = import.meta.glob('./components/*.tsx');

Object.entries(componentModules).forEach(async ([path, module]) => {
  const mod = await module();
  const componentName = path.split('/').pop()?.replace('.tsx', '');
  
  if (componentName && mod.default) {
    registerComponent(componentName, mod.default);
  }
});
```

## Props vs Presets

### Clear Separation
```typescript
interface ComponentProps {
  // Functional props - control behavior
  title?: string;
  isOpen?: boolean;
  onSelect?: (item: any) => void;
  data?: any[];
  
  // Styling props - always separate
  presets?: PresetInterface;
}
```

### Props for Behavior
```json
"data-props": {
  "title": "My Panel",
  "collapsible": true,
  "defaultOpen": false,
  "onItemClick": "handleItemClick"
}
```

### Presets for Styling
```json
"data-component-presets": {
  "container": "panel-elevated rounded",
  "header": "primary bold",
  "item": "list-item interactive"
}
```

## Event Handling

### Event Props Pattern
```typescript
interface ComponentProps {
  onSelect?: (item: any) => void;
  onChange?: (value: any) => void;
  onFocus?: () => void;
}

// Usage in JSON
"data-props": {
  "onSelect": "handleLayerSelect",
  "onChange": "updateProperty"
}
```

### Event Handler Resolution
```typescript
// UIGenerator resolves event handlers
const resolveEventHandler = (handlerName: string) => {
  // Get handler from global context or parent scope
  return globalHandlers[handlerName] || (() => {});
};

const props = {
  ...element["data-props"],
  onSelect: resolveEventHandler(element["data-props"].onSelect)
};
```

## State Management

### Local Component State
```typescript
const LayerTree: React.FC<Props> = ({ layers, presets, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  
  // Local state for UI concerns only
  // Data comes from props
};
```

### Global State Integration
```typescript
// Connect to external state when needed
const LayerTree: React.FC<Props> = ({ presets }) => {
  // Get data from external source
  const { layers, selectedLayer } = useLayerStore();
  const { selectLayer } = useLayerActions();
  
  return (
    <div className={`layerTree ${presets.container || ''}`}>
      {layers.map(layer => (
        <LayerItem
          key={layer.id}
          layer={layer}
          selected={layer.id === selectedLayer?.id}
          onClick={() => selectLayer(layer.id)}
          presets={presets}
        />
      ))}
    </div>
  );
};
```

## Advanced Patterns

### Conditional Rendering
```typescript
const ConditionalComponent: React.FC<Props> = ({ showHeader, presets }) => {
  return (
    <div className={`component ${presets.container || ''}`}>
      {showHeader && (
        <header className={`component-header ${presets.header || ''}`}>
          Header Content
        </header>
      )}
      <main className={`component-content ${presets.content || ''}`}>
        Main Content
      </main>
    </div>
  );
};
```

### Dynamic Children
```typescript
const DynamicContainer: React.FC<Props> = ({ items, presets }) => {
  return (
    <div className={`container ${presets.container || ''}`}>
      {items.map(item => (
        <div key={item.id} className={`item ${presets.item || ''}`}>
          {item.type === 'text' && <span>{item.content}</span>}
          {item.type === 'image' && <img src={item.src} />}
          {item.type === 'component' && (
            <DynamicComponent 
              component={item.component}
              props={item.props}
            />
          )}
        </div>
      ))}
    </div>
  );
};
```

### Nested Component Rendering
```typescript
const NestedRenderer: React.FC<Props> = ({ structure, presets }) => {
  const renderElement = (element: any) => {
    if (element["data-component"]) {
      const Component = getComponent(element["data-component"]);
      return Component ? (
        <Component 
          presets={element["data-component-presets"]}
          {...element["data-props"]}
        />
      ) : null;
    }
    
    return (
      <div className={element.preset}>
        {element.children?.map(renderElement)}
      </div>
    );
  };
  
  return renderElement(structure);
};
```

## Performance Optimization

### Component Memoization
```typescript
const OptimizedComponent = React.memo<Props>(({ data, presets }) => {
  return (
    <div className={`component ${presets.container || ''}`}>
      {/* Component content */}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for presets
  return (
    prevProps.data === nextProps.data &&
    JSON.stringify(prevProps.presets) === JSON.stringify(nextProps.presets)
  );
});
```

### Preset Memoization
```typescript
const Component: React.FC<Props> = ({ presets, data }) => {
  const memoizedClasses = useMemo(() => ({
    container: `component ${presets.container || ''}`,
    header: `component-header ${presets.header || ''}`,
    content: `component-content ${presets.content || ''}`
  }), [presets]);
  
  return (
    <div className={memoizedClasses.container}>
      <header className={memoizedClasses.header}>Header</header>
      <main className={memoizedClasses.content}>Content</main>
    </div>
  );
};
```

### Lazy Loading
```typescript
// Lazy load components
const LazyPropertyPanel = React.lazy(() => import('./PropertyPanel'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <LazyPropertyPanel presets={presets} />
</Suspense>
```

## Error Boundaries

### Component Error Handling
```typescript
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="component-error">
          Component failed to render
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

## Testing Patterns

### Component Testing
```typescript
// Test component with presets
test('renders with presets', () => {
  const presets = {
    container: 'test-container',
    header: 'test-header'
  };
  
  render(<PropertyPanel presets={presets} title="Test" />);
  
  expect(screen.getByRole('heading')).toHaveClass('test-header');
});
```

### Integration Testing
```typescript
// Test full JSON to React flow
test('renders component from JSON', () => {
  const jsonElement = {
    "data-component": "PropertyPanel",
    "data-component-presets": {
      "container": "panel-base"
    },
    "data-props": {
      "title": "Test Panel"
    }
  };
  
  const rendered = renderFromJSON(jsonElement);
  expect(rendered).toContainElement(screen.getByText('Test Panel'));
});
```

## Best Practices

### Component Design
1. Keep components focused and small
2. Use TypeScript for prop interfaces
3. Separate functional and styling concerns
4. Handle missing presets gracefully

### Integration Design
1. Register components explicitly
2. Use consistent prop naming
3. Validate prop types
4. Handle errors gracefully

### Performance Design
1. Memoize expensive calculations
2. Use React.memo for pure components
3. Lazy load heavy components
4. Optimize preset application

## Related Atoms
- `flat-component-pattern` - Overall architecture
- `component-preset-distribution` - Preset flow
- `ui-generator` - JSON processing
- `props-injection` - Dynamic data flow