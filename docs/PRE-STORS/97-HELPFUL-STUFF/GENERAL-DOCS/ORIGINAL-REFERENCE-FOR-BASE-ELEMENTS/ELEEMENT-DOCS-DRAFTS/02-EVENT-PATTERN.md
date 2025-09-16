# 02 - Event Pattern

**Status**: Core communication system  
**Domain**: Level 1 - Pattern Variable (Atomic)  
**References**: Direct Renderer lines 44-54, UI Generator lines 125-128

## Definition

The **Event Pattern** is our system's way of enabling loose coupling between components through custom DOM events. Components communicate without direct references.

## The Pattern

### 1. Dispatch Event
```javascript
window.dispatchEvent(new CustomEvent('event-name', {
  detail: { data: 'optional data' }
}));
```

### 2. Listen for Event
```javascript
window.addEventListener('event-name', (event) => {
  const data = event.detail;
  // Handle event
});
```

### 3. Clean Up
```javascript
// In React useEffect
return () => {
  window.removeEventListener('event-name', handler);
};
```

## Why Events?

### Loose Coupling
Components don't need to know about each other:

```javascript
// UIGenerator doesn't know DirectRenderer exists
onClick: () => {
  window.dispatchEvent(new CustomEvent('add-one-element'));
}

// DirectRenderer doesn't know UIGenerator exists  
window.addEventListener('add-one-element', handleAddElement);
```

### Plugin Architecture
Any component can listen for system events:

```javascript
// Multiple components can react to same event
window.addEventListener('theme-changed', updateVisualBuilder);
window.addEventListener('theme-changed', refreshCanvas);
window.addEventListener('theme-changed', logAnalytics);
```

### Clean Separation
UI and logic remain separate:

```json
// JSON just marks intention
{
  "data-label": "save-button"
}
```

```javascript
// JavaScript implements behavior
if (element['data-label'] === 'save-button') {
  window.dispatchEvent(new CustomEvent('save-requested'));
}
```

## Current System Events

### Canvas Events
| Event | Triggered By | Listened By | Purpose |
|-------|--------------|-------------|---------|
| add-one-element | +ONE button | DirectRenderer | Add element to canvas |
| element-selected | Click on element | SelectionHandles | Show selection |
| element-moved | Drag handle | DirectRenderer | Update position |
| element-resized | Resize handle | DirectRenderer | Update size |

### Visual Builder Events
| Event | Triggered By | Listened By | Purpose |
|-------|--------------|-------------|---------|
| toggle-grid | Grid button | GridOverlay | Show/hide grid |
| toggle-snap | Snap button | DirectRenderer | Enable/disable snapping |

## Implementation Examples

### Simple Event
```javascript
// Dispatch
window.dispatchEvent(new CustomEvent('toggle-grid'));

// Listen
useEffect(() => {
  function handleToggleGrid() {
    setGridVisible(prev => !prev);
  }
  
  window.addEventListener('toggle-grid', handleToggleGrid);
  return () => {
    window.removeEventListener('toggle-grid', handleToggleGrid);
  };
}, []);
```

### Event with Data
```javascript
// Dispatch with detail
window.dispatchEvent(new CustomEvent('element-moved', {
  detail: {
    id: 'element-123',
    x: 100,
    y: 200
  }
}));

// Listen and extract data
window.addEventListener('element-moved', (event) => {
  const { id, x, y } = event.detail;
  updateElementPosition(id, x, y);
});
```

### Bidirectional Communication
```javascript
// Component A requests data
window.dispatchEvent(new CustomEvent('request-theme-data'));

// Component B responds
window.addEventListener('request-theme-data', () => {
  window.dispatchEvent(new CustomEvent('theme-data-response', {
    detail: { theme: currentTheme }
  }));
});

// Component A receives response
window.addEventListener('theme-data-response', (event) => {
  const { theme } = event.detail;
});
```

## Event Naming Convention

### Format
```
[action]-[target]-[modifier]
```

### Examples
- `add-one-element` - Action: add, Target: one-element
- `toggle-grid-visibility` - Action: toggle, Target: grid, Modifier: visibility
- `request-theme-data` - Action: request, Target: theme-data
- `element-position-updated` - Target: element, Property: position, State: updated

## Best Practices

### 1. Descriptive Names
```javascript
// ✅ GOOD
'save-document-requested'
'user-settings-updated'

// ❌ BAD
'save'
'update'
```

### 2. Consistent Patterns
```javascript
// ✅ GOOD - Consistent pattern
'element-selected'
'element-deselected'
'element-moved'

// ❌ BAD - Inconsistent
'selectElement'
'element-deselected'
'move_element'
```

### 3. Clean Up Listeners
```javascript
// ✅ GOOD - Always clean up
useEffect(() => {
  const handler = () => {};
  window.addEventListener('event', handler);
  return () => {
    window.removeEventListener('event', handler);
  };
}, []);
```

### 4. Type Safety (TypeScript)
```typescript
// Define event types
interface ElementMovedEvent extends CustomEvent {
  detail: {
    id: string;
    x: number;
    y: number;
  };
}

// Type-safe listener
window.addEventListener('element-moved', (event: ElementMovedEvent) => {
  const { id, x, y } = event.detail;
});
```

## Event Flow Diagram

```
User Action → UIGenerator → Custom Event → Window
                                             ↓
                                     DirectRenderer
                                     GridOverlay
                                     SelectionHandles
                                     [Any Listener]
```

## Common Patterns

### Toggle Pattern
```javascript
// Binary state toggle
window.dispatchEvent(new CustomEvent('toggle-[feature]'));
```

### Request/Response Pattern
```javascript
// Request
window.dispatchEvent(new CustomEvent('request-[data]'));
// Response
window.dispatchEvent(new CustomEvent('[data]-response', { detail }));
```

### State Change Pattern
```javascript
// Notify of state change
window.dispatchEvent(new CustomEvent('[entity]-[property]-changed', {
  detail: { oldValue, newValue }
}));
```

## Anti-Patterns to Avoid

### Direct Component References
```javascript
// ❌ WRONG - Tight coupling
DirectRenderer.addElement();

// ✅ CORRECT - Event-based
window.dispatchEvent(new CustomEvent('add-element'));
```

### Synchronous Expectations
```javascript
// ❌ WRONG - Assumes immediate handling
dispatch('get-data');
const data = getData(); // Won't work

// ✅ CORRECT - Async pattern
dispatch('request-data');
addEventListener('data-response', (e) => {
  const data = e.detail;
});
```

## Guardian Note

The event pattern maintains clean separation between components. It enables a plugin-like architecture where components can be added or removed without breaking others. This pattern is essential for maintaining system modularity.

---

**Note**: Events are the nervous system of the application. They allow components to communicate without creating dependencies.