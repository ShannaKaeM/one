# 03 - Interactive Pattern

**Status**: Core interaction system  
**Domain**: Level 1 - Pattern Variable (Atomic)  
**References**: UI Generator lines 233-272, Session 009

## Definition

The **Interactive Pattern** is how static JSON elements become interactive components through data-label marking and event handling, without mixing behavior into the theme.

## The Three-Layer Pattern

### Layer 1: JSON Marking
```json
{
  "type": "text",
  "preset": "button primary",
  "content": "Save",
  "data-label": "save-button"
}
```

### Layer 2: React Recognition
```javascript
if (element['data-label'] === 'save-button') {
  return createElement('button', {
    className: classes.join(' '),
    onClick: handleSave
  }, content);
}
```

### Layer 3: Event Handling
```javascript
function handleSave() {
  window.dispatchEvent(new CustomEvent('save-requested'));
}
```

## Complete Implementation

### 1. Define in Theme JSON
```json
{
  "structure": {
    "header": {
      "type": "wrapper",
      "preset": "header",
      "children": [
        {
          "type": "text",
          "preset": "button primary",
          "content": "Add Element",
          "data-label": "add-element-button"
        }
      ]
    }
  }
}
```

### 2. Handle in UIGenerator
```javascript
function createElement(element) {
  // Check for interactive elements
  if (element['data-label'] === 'add-element-button') {
    return React.createElement('button', {
      className: buildClasses(element),
      onClick: () => {
        window.dispatchEvent(new CustomEvent('add-element', {
          detail: { type: 'default' }
        }));
      }
    }, element.content || 'Add');
  }
  
  // Regular element creation continues...
}
```

### 3. Listen in Target Component
```javascript
function DirectRenderer() {
  useEffect(() => {
    function handleAddElement(event) {
      const { type } = event.detail;
      addNewElement(type);
    }
    
    window.addEventListener('add-element', handleAddElement);
    return () => {
      window.removeEventListener('add-element', handleAddElement);
    };
  }, []);
}
```

## Interactive Element Types

### Buttons
```json
{
  "type": "text",
  "as": "button",
  "preset": "button",
  "data-label": "action-button"
}
```

### Links
```json
{
  "type": "text",
  "as": "a",
  "preset": "link",
  "href": "#",
  "data-label": "navigation-link"
}
```

### Form Controls
```json
{
  "type": "input",
  "preset": "input",
  "data-label": "search-input"
}
```

### Toggle Controls
```json
{
  "type": "text",
  "preset": "toggle",
  "data-label": "theme-toggle"
}
```

## State Management Pattern

### Static State (Current)
```javascript
// State lives in React component
const [isActive, setIsActive] = useState(false);

// Visual state through conditional rendering
if (element['data-label'] === 'toggle-button') {
  return createElement('button', {
    className: `${classes.join(' ')} ${isActive ? 'active' : ''}`,
    onClick: () => setIsActive(!isActive)
  });
}
```

### Dynamic State (Future)
```javascript
// State communicated through events
window.dispatchEvent(new CustomEvent('state-changed', {
  detail: { 
    element: 'toggle-button',
    state: 'active'
  }
}));
```

## Common Interactive Patterns

### Action Button
```json
{
  "data-label": "save-button",
  "content": "Save"
}
```
```javascript
onClick: () => {
  window.dispatchEvent(new CustomEvent('save-requested'));
}
```

### Toggle Button
```json
{
  "data-label": "toggle-grid-button",
  "content": "Grid"
}
```
```javascript
onClick: () => {
  window.dispatchEvent(new CustomEvent('toggle-grid'));
}
```

### Selection Button
```json
{
  "data-label": "select-tool-button",
  "content": "Select",
  "data-tool": "select"
}
```
```javascript
onClick: () => {
  window.dispatchEvent(new CustomEvent('tool-selected', {
    detail: { tool: element['data-tool'] }
  }));
}
```

## Separation of Concerns

### ✅ CORRECT Separation
```json
// JSON: Structure and identity
{
  "preset": "button",
  "data-label": "save-button"
}
```
```javascript
// JavaScript: Behavior
if (element['data-label'] === 'save-button') {
  // Handle interaction
}
```

### ❌ WRONG Mixing
```json
// DON'T put behavior in JSON
{
  "onClick": "handleSave()",  // ❌ NO!
  "action": "save"            // ❌ NO!
}
```

## Benefits

### 1. Clean JSON
- No JavaScript in themes
- Portable structure
- Visual builder compatible

### 2. Flexible Behavior
- Behavior can change without JSON changes
- Multiple handlers for same element
- Easy to extend

### 3. Testable
- Mock events for testing
- Isolate interaction logic
- Clear boundaries

## Interactive Element Registry

Maintain a registry of all interactive elements:

```javascript
const INTERACTIVE_ELEMENTS = {
  'add-one-button': {
    event: 'add-one-element',
    type: 'button'
  },
  'toggle-grid-button': {
    event: 'toggle-grid',
    type: 'button'
  },
  'canvas-content': {
    component: DirectRenderer,
    type: 'embed'
  }
};
```

## Future Enhancements

### Dynamic Registration
```javascript
// Register interactive handlers dynamically
registerInteractiveElement('custom-button', {
  handler: (element) => { /* ... */ },
  events: ['click', 'hover']
});
```

### State Binding
```javascript
// Bind element to state
bindElementState('toggle-button', {
  stateKey: 'gridVisible',
  className: 'active'
});
```

## Guardian Note

The interactive pattern keeps behavior separate from structure. JSON defines what, JavaScript defines how. This separation is crucial for maintaining a visual builder and clean architecture.

---

**Note**: Interactive elements are marked in JSON but implemented in JavaScript. The data-label is the bridge, not the implementation.