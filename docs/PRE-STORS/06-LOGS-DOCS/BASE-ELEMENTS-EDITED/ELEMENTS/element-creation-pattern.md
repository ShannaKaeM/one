---
type: L1-ATOM
category: ELEMENTS
status: COMPLETE
source: Current implementation patterns
related: [element-types, element-naming-system, canvas-architecture]
---

# Element Creation Pattern

## Definition
The standardized process and pattern for creating new elements on the canvas, including ID generation, default properties, positioning, and event flow.

## Key Principles
- Consistent creation flow
- Unique identification
- Smart positioning
- Type-specific defaults

## Creation Flow

### 1. User Initiates
```javascript
// Button click
<button onClick={() => createNewElement('wrapper')}>
  + Wrapper
</button>

// Keyboard shortcut
if (key === 'W') createNewElement('wrapper');
if (key === 'T') createNewElement('text');
if (key === 'I') createNewElement('image');
```

### 2. Event Dispatch
```javascript
// Dispatch creation event
window.dispatchEvent(new CustomEvent('add-element', {
  detail: { 
    type: elementType,
    position: getNextPosition(),
    defaults: getTypeDefaults(elementType)
  }
}));
```

### 3. Element Generation
```javascript
function createElement(type) {
  const timestamp = Date.now();
  const typeCounter = getTypeCounter(type);
  
  return {
    id: `element-${timestamp}`,
    type: type,
    name: `${capitalize(type)} ${typeCounter}`,
    style: {
      position: 'absolute',
      ...getDefaultStyle(type),
      ...getSmartPosition()
    },
    content: getDefaultContent(type),
    isVisible: true,
    isLocked: false,
    createdAt: timestamp
  };
}
```

## ID Generation

### Unique Identifiers
```javascript
// Timestamp-based
const id = `element-${Date.now()}`;

// UUID-based (alternative)
const id = `element-${uuidv4()}`;

// Type-prefixed
const id = `${type}-${Date.now()}`;
```

### Collision Prevention
```javascript
function generateUniqueId(type) {
  let id;
  do {
    id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  } while (elementExists(id));
  return id;
}
```

## Default Properties

### Type-Specific Defaults
```javascript
const elementDefaults = {
  wrapper: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  text: {
    width: 150,
    height: 'auto',
    padding: '10px',
    fontSize: '16px',
    color: '#333',
    backgroundColor: '#fff'
  },
  image: {
    width: 200,
    height: 150,
    objectFit: 'cover',
    backgroundColor: '#ddd'
  }
};
```

### Content Defaults
```javascript
const contentDefaults = {
  wrapper: '', // Empty container
  text: 'Text Element',
  image: '/placeholder.jpg'
};
```

## Smart Positioning

### Staggered Placement
```javascript
function getSmartPosition(elementCount) {
  const baseX = 100;
  const baseY = 100;
  const offset = 20;
  
  return {
    left: `${baseX + (elementCount * offset)}px`,
    top: `${baseY + (elementCount * offset)}px`
  };
}
```

### Grid-Aware Positioning
```javascript
function getGridPosition(mousePos, snapEnabled) {
  if (snapEnabled) {
    return {
      left: snapToGrid(mousePos.x),
      top: snapToGrid(mousePos.y)
    };
  }
  return {
    left: mousePos.x,
    top: mousePos.y
  };
}
```

### Viewport Awareness
```javascript
function getVisiblePosition() {
  const viewport = getViewportBounds();
  const elementSize = getDefaultSize();
  
  return {
    left: Math.max(20, Math.min(
      viewport.width - elementSize.width - 20,
      getNextPosition().x
    )),
    top: Math.max(20, Math.min(
      viewport.height - elementSize.height - 20,
      getNextPosition().y
    ))
  };
}
```

## Event Integration

### Creation Pipeline
```javascript
// 1. UI triggers event
dispatchEvent(new CustomEvent('ui-action', {
  detail: { action: 'add-wrapper' }
}));

// 2. App routes to element event
window.dispatchEvent(new CustomEvent('add-element', {
  detail: { type: 'wrapper' }
}));

// 3. DirectRenderer handles creation
handleAddElement(event.detail);

// 4. Element added to state
setElements([...elements, newElement]);

// 5. Canvas updates
renderElements();
```

## Advanced Patterns

### Batch Creation
```javascript
function createMultipleElements(types) {
  const newElements = types.map((type, index) => {
    const element = createElement(type);
    element.style.left = `${100 + (index * 220)}px`;
    return element;
  });
  
  addElements(newElements);
}
```

### Template-Based Creation
```javascript
function createFromTemplate(templateId) {
  const template = loadTemplate(templateId);
  const element = {
    ...createElement(template.type),
    ...template.overrides
  };
  return element;
}
```

### Context-Aware Creation
```javascript
function createInContext(type, context) {
  const element = createElement(type);
  
  // Adjust based on context
  if (context.parentGroup) {
    element.parentGroup = context.parentGroup;
    element.style = getRelativePosition(element.style, context);
  }
  
  if (context.preset) {
    element.preset = context.preset;
  }
  
  return element;
}
```

## Validation

### Pre-Creation Checks
```javascript
function canCreateElement(type) {
  // Check limits
  if (getElementCount() >= MAX_ELEMENTS) {
    return { valid: false, reason: 'Element limit reached' };
  }
  
  // Check permissions
  if (!hasPermission('create', type)) {
    return { valid: false, reason: 'No permission' };
  }
  
  return { valid: true };
}
```

### Post-Creation Validation
```javascript
function validateCreatedElement(element) {
  const errors = [];
  
  if (!element.id) errors.push('Missing ID');
  if (!element.type) errors.push('Missing type');
  if (!element.style.position) errors.push('Missing position');
  
  return errors.length ? errors : null;
}
```

## Best Practices

### Consistency
- Always use factory functions
- Apply type defaults
- Generate unique IDs
- Set required properties

### Performance
- Batch multiple creations
- Defer rendering updates
- Cache type defaults
- Minimize recalculations

### User Experience
- Smart positioning
- Visible feedback
- Undo support
- Clear naming

## Related Atoms
- `element-types` - Available types
- `element-naming-system` - Naming convention
- `canvas-architecture` - Canvas integration