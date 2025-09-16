---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: Implementation patterns
related: [data-flow-architecture, event-pattern]
---

# Component Communication

## Definition
The event-driven communication system that enables loose coupling between UI components, canvas elements, and system modules through CustomEvents and state management.

## Key Principles
- Event-driven architecture
- Loose coupling
- Unidirectional flow
- Clear contracts

## Communication Patterns

### 1. UI to Canvas
```javascript
// UI Component dispatches
window.dispatchEvent(new CustomEvent('ui-action', {
  detail: {
    action: 'add-wrapper',
    data: { preset: 'card' }
  }
}));

// App.tsx routes
window.addEventListener('ui-action', (e) => {
  switch(e.detail.action) {
    case 'add-wrapper':
      window.dispatchEvent(new CustomEvent('add-element', {
        detail: { type: 'wrapper' }
      }));
      break;
  }
});

// DirectRenderer handles
window.addEventListener('add-element', handleAddElement);
```

### 2. Canvas to UI
```javascript
// Canvas dispatches selection
window.dispatchEvent(new CustomEvent('element-selected', {
  detail: {
    id: elementId,
    data: elementData
  }
}));

// Property panel receives
window.addEventListener('element-selected', (e) => {
  setSelectedElement(e.detail.id);
  updatePropertyPanel(e.detail.data);
});
```

### 3. State Synchronization
```javascript
// Central state in App.tsx
const [appState, setAppState] = useState({
  gridVisible: false,
  selectedElement: null,
  elements: []
});

// Components receive props
<UIGenerator 
  appState={appState}
  onStateChange={setAppState}
/>

<DirectRenderer
  elements={appState.elements}
  selectedId={appState.selectedElement}
/>
```

## Event Catalog

### UI Events
```javascript
// Actions from UI
'ui-action' - Generic UI action
'toggle-grid' - Grid visibility toggle
'toggle-snap' - Snap to grid toggle
'group-elements' - Group selection
'ungroup-elements' - Ungroup selection
```

### Canvas Events
```javascript
// Canvas interactions
'element-selected' - Single selection
'elements-selected' - Multi-selection
'element-moved' - Position change
'element-resized' - Size change
'element-created' - New element
'element-deleted' - Remove element
```

### System Events
```javascript
// System-wide events
'theme-loaded' - Theme ready
'canvas-ready' - Canvas initialized
'content-updated' - Content change
'state-changed' - Global state update
```

## Event Contracts

### Standard Event Shape
```typescript
interface CustomEventDetail {
  action?: string;
  id?: string;
  data?: any;
  source?: string;
  timestamp?: number;
}

// Usage
new CustomEvent('event-name', {
  detail: {
    action: 'update',
    id: 'element-123',
    data: { x: 100, y: 200 },
    source: 'canvas',
    timestamp: Date.now()
  }
});
```

### Response Pattern
```javascript
// Request event
window.dispatchEvent(new CustomEvent('request-data', {
  detail: { 
    requestId: 'req-123',
    type: 'elements' 
  }
}));

// Response event
window.addEventListener('request-data', async (e) => {
  const data = await loadData(e.detail.type);
  
  window.dispatchEvent(new CustomEvent('data-response', {
    detail: {
      requestId: e.detail.requestId,
      data: data
    }
  }));
});
```

## Component Boundaries

### UIGenerator
```javascript
// Inputs
- Theme configuration
- App state
- User interactions

// Outputs
- UI action events
- State change requests
- Theme update events

// Never directly accesses
- Canvas elements
- DirectRenderer state
```

### DirectRenderer
```javascript
// Inputs
- Element data
- Selection state
- Canvas events

// Outputs
- Element events
- Selection events
- Canvas state updates

// Never directly accesses
- UI components
- Theme processor
```

### App.tsx (Orchestrator)
```javascript
// Manages
- Global state
- Event routing
- Component lifecycle

// Coordinates
- UI ↔ Canvas communication
- State distribution
- Event flow
```

## Communication Flows

### Selection Flow
```
1. User clicks element
2. DirectRenderer → 'element-selected'
3. App.tsx updates state
4. UIGenerator receives new props
5. Property panel updates
```

### Creation Flow
```
1. User clicks '+ Wrapper'
2. UIGenerator → 'ui-action'
3. App.tsx → 'add-element'
4. DirectRenderer creates element
5. DirectRenderer → 'element-created'
6. App.tsx updates element list
```

### Update Flow
```
1. Property change in panel
2. UIGenerator → 'property-changed'
3. App.tsx updates element
4. DirectRenderer re-renders
5. Canvas reflects change
```

## Best Practices

### Event Design
```javascript
// ✅ Good - Specific and clear
window.dispatchEvent(new CustomEvent('element-position-changed', {
  detail: { id, x, y }
}));

// ❌ Bad - Too generic
window.dispatchEvent(new CustomEvent('update', {
  detail: { stuff }
}));
```

### Error Handling
```javascript
// Wrap event handlers
window.addEventListener('event-name', (e) => {
  try {
    handleEvent(e);
  } catch (error) {
    console.error('Event handler error:', error);
    // Dispatch error event
    window.dispatchEvent(new CustomEvent('error', {
      detail: { error, source: 'event-name' }
    }));
  }
});
```

### Event Cleanup
```javascript
// Component lifecycle
useEffect(() => {
  const handler = (e) => handleEvent(e);
  
  window.addEventListener('event-name', handler);
  
  return () => {
    window.removeEventListener('event-name', handler);
  };
}, []);
```

## Performance Considerations

### Debouncing
```javascript
// Debounce rapid events
const debouncedHandler = debounce((e) => {
  handleExpensiveUpdate(e);
}, 100);

window.addEventListener('mouse-move', debouncedHandler);
```

### Event Batching
```javascript
// Batch multiple updates
const updates = [];

function queueUpdate(update) {
  updates.push(update);
  
  if (updates.length === 1) {
    requestAnimationFrame(() => {
      processUpdates(updates);
      updates.length = 0;
    });
  }
}
```

## Testing

### Event Mocking
```javascript
// Test event flow
it('handles element selection', () => {
  const mockHandler = jest.fn();
  window.addEventListener('element-selected', mockHandler);
  
  // Dispatch test event
  window.dispatchEvent(new CustomEvent('element-selected', {
    detail: { id: 'test-123' }
  }));
  
  expect(mockHandler).toHaveBeenCalledWith(
    expect.objectContaining({
      detail: { id: 'test-123' }
    })
  );
});
```

## Related Atoms
- `data-flow-architecture` - Overall data flow
- `event-pattern` - Event system details