# 03 - Data Attribute

**Status**: Important - Event system foundation  
**Domain**: Level 1 - Element Variable (Atomic)  
**References**: UI Generator lines 46-71, Session 009

## Definition

A **data attribute** (specifically `data-label`) is our system's way to mark elements for special handling, event binding, or identification without affecting styling or structure.

## Purpose

Data attributes serve as:
1. **Event Triggers**: Mark interactive elements
2. **Component Markers**: Identify special components
3. **Tool Hooks**: Visual builder integration points
4. **Semantic Labels**: Human-readable identifiers

## The data-label Pattern

### JSON Definition
```json
{
  "type": "text",
  "preset": "button",
  "content": "Click Me",
  "data-label": "action-button"
}
```

### HTML Output
```html
<button class="ui button" data-label="action-button">Click Me</button>
```

### React Handler
```javascript
if (element['data-label'] === 'action-button') {
  return createElement('button', {
    onClick: () => {
      window.dispatchEvent(new CustomEvent('action-triggered'))
    }
  }, content);
}
```

## Current data-label Mappings

### Interactive Elements
| data-label | Action | Event Dispatched |
|------------|--------|------------------|
| add-one-button | Add element to canvas | add-one-element |
| toggle-grid-button | Toggle grid visibility | toggle-grid |
| toggle-snap-button | Toggle snap to grid | toggle-snap |

### Component Markers
| data-label | Purpose | Handler |
|------------|---------|---------|
| canvas-content | DirectRenderer embed point | Embeds DirectRenderer |
| button-pair | Visual grouping | CSS styling only |

## Event Communication Pattern

### 1. Mark in JSON
```json
{
  "data-label": "my-action-button"
}
```

### 2. Handle in UIGenerator
```javascript
if (element['data-label'] === 'my-action-button') {
  // Create interactive element
  return createElement('button', {
    onClick: () => {
      window.dispatchEvent(new CustomEvent('my-action'))
    }
  });
}
```

### 3. Listen in Components
```javascript
useEffect(() => {
  function handleMyAction() {
    // React to the event
  }
  
  window.addEventListener('my-action', handleMyAction);
  return () => {
    window.removeEventListener('my-action', handleMyAction);
  };
}, []);
```

## Data Attributes vs Classes

| Aspect | data-label | CSS Class |
|--------|------------|-----------|
| Purpose | Behavior/Identity | Styling |
| Styling Impact | None | Direct |
| JavaScript Access | querySelector('[data-label="..."]') | querySelector('.class') |
| Semantic Meaning | Yes | No |

## Best Practices

### 1. Descriptive Names
```json
// ✅ GOOD
"data-label": "toggle-grid-button"
"data-label": "main-navigation"

// ❌ BAD
"data-label": "btn1"
"data-label": "thing"
```

### 2. Single Purpose
Each data-label should have one clear purpose:
```json
// ✅ GOOD - Clear purpose
"data-label": "save-button"

// ❌ BAD - Multiple purposes
"data-label": "save-and-close-button"
```

### 3. Consistent Naming
Use kebab-case for all data-labels:
```json
// ✅ GOOD
"data-label": "add-one-button"

// ❌ BAD
"data-label": "addOneButton"
"data-label": "add_one_button"
```

## Future data Attributes

The system can be extended with more data attributes:

```json
{
  "data-label": "color-picker",
  "data-element-id": "element-123",
  "data-state": "active",
  "data-validation": "required"
}
```

## Common Patterns

### Toggle Pattern
```json
{
  "data-label": "toggle-[feature]-button",
  "content": "[Feature]"
}
```

### Action Pattern
```json
{
  "data-label": "[action]-[target]-button",
  "content": "[Action Label]"
}
```

### Marker Pattern
```json
{
  "data-label": "[component]-container"
}
```

## Integration with Visual Builder

Data attributes enable clean tool integration:

```javascript
// Visual builder can find all interactive elements
const interactiveElements = document.querySelectorAll('[data-label]');

// Can identify specific tools
const gridButton = document.querySelector('[data-label="toggle-grid-button"]');
```

## Important Rules

1. **No Styling**: Never use data attributes for CSS
2. **No Logic in JSON**: Behavior stays in React/JavaScript
3. **Meaningful Names**: Always human-readable
4. **Document Mappings**: Keep a registry of all data-labels

## Guardian Note

Data attributes are the bridge between static JSON structure and dynamic behavior. They mark intention without implementing it, keeping the separation of concerns clean.

---

**Note**: data-label is for identification and event binding only. The actual behavior is always implemented in JavaScript/React, never in the JSON.