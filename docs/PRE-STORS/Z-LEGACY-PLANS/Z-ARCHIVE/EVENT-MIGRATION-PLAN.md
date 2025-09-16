# DirectRenderer Event Migration Plan

## Events to Replace with Store Actions

### 1. Selection Events → Already using store
- ✅ `element-selected` - Now using `setSelectedElement()`
- ✅ `elements-selected` - Now using `setSelectedElements()`

### 2. Canvas Update Events → Use store directly
- `canvas-elements-updated` - Should use store subscription instead
- `element-updated` - Should use `updateElement()` in store
- `element-property-changed` - Should use `updateElementStyle()` in store

### 3. Element Operation Events → Need store actions
- `duplicate-elements` - Add `duplicateElements()` to oneStore
- `delete-elements` - Use existing `deleteElement()` (needs batch version)
- `group-elements` - Add `groupElements()` to oneStore
- `ungroup-elements` - Add `ungroupElements()` to oneStore

### 4. Library Events → Keep as events (cross-component)
- `library-item-saved` - Keep for now (crosses component boundary)

## Store Actions to Add

### oneStore additions needed:
```typescript
// Batch operations
deleteElements: (ids: string[]) => void;
duplicateElements: (ids: string[]) => void;

// Group operations
groupElements: (ids: string[], groupName?: string) => void;
ungroupElements: (groupId: string) => void;

// Get element by ID
getElementById: (id: string) => Element | undefined;
```

## Event Listeners to Update

Currently in App.tsx and other components:
- `canvas-elements-updated` listeners
- `element-selected` listeners
- `element-property-changed` listeners
- Operation event listeners (duplicate, delete, group, ungroup)

These should use store subscriptions instead of events.

## Migration Strategy

1. Add missing actions to oneStore
2. Replace event dispatches with store actions
3. Update listeners in other components to use store subscriptions
4. Remove event listener code from DirectRenderer