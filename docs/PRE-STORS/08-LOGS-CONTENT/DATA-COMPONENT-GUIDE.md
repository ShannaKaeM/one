# Data Component Guide

## Overview
Data components are React components that get hydrated into the JSONtoREACT (JTR) structure. They receive data and state from the app while maintaining clean separation from the theme system.

## How Data Components Work

### 1. Component Registration
Components register themselves with handlers in `registerComponents.ts`:

```javascript
componentRegistry.register('direct-renderer', {
  mapProps: (element, appState) => ({
    theme: element.props?.theme || 'one',
    elements: appState?.canvasElements || [],
    onElementsChange: appState?.onCanvasElementsChange,
    // ... other props
  }),
  supportedTargets: ['canvas', 'grid-overlay'],
  defaultProps: { theme: 'one' }
});
```

### 2. Theme Structure Integration

In `ui-theme.json`, components are referenced:
```json
"canvas": {
  "type": "ui",
  "data-label": "canvas",
  "data-component": "direct-renderer",  // ← Links to registered component
  "data-preset-targets": [":"],          // ← No preset on wrapper
  "props": { "theme": "one" }
}
```

### 3. The JTR Wrapper System

**Critical Concept**: JTR creates a wrapper div around each data component!

```
JTR Wrapper Div (gets grid area)
  └── Your Data Component (renders inside)
```

- The `:` in `data-preset-targets` refers to this wrapper div
- Using `":"` alone means "don't apply any preset to wrapper"
- This lets grid areas work properly without interference

### 4. Props Flow

```
App.tsx (state)
  ↓ appState prop
JSONtoREACT
  ↓ componentRegistry.processElement()
Component Registry (mapProps)
  ↓ mapped props
Your Data Component
```

### 5. Grid Area Assignment

**Automatic Process**:
1. App.tsx reads the active layout's children array
2. Assigns grid areas alphabetically (1st child → 'a', 2nd → 'b', etc.)
3. Stores in `appState.componentAssignments`
4. JTR applies grid area to wrapper div
5. Component renders inside with correct position

**You DON'T need to**:
- Apply gridArea in your component
- Match class names to presets
- Handle positioning

## Key Connections

### App State → Component Props
- All state flows through `appState`
- Component registry's `mapProps` transforms appState into component props
- Components are stateless receivers of data

### Theme Structure → Component Visibility
- Components only render if included in active layout's children array
- Layout switching can add/remove components entirely
- No component has hardcoded visibility

### Events → State Updates
- Components dispatch events (not direct state updates)
- App.tsx listens and updates state
- New state flows back down through props

## Creating a Data Component

### 1. Create Component File
```javascript
export function MyComponent({ 
  someData,
  onSomeAction,
  // Don't need: gridArea, id, className for wrapper
}) {
  return <div className="my-component">...</div>;
}
```

### 2. Register in registerComponents.ts
```javascript
componentRegistry.register('my-component', {
  mapProps: (element, appState) => ({
    someData: appState?.someData,
    onSomeAction: () => window.dispatchEvent(new CustomEvent('some-action'))
  }),
  supportedTargets: ['container', 'button'],
  defaultProps: { someData: 'default' }
});
```

### 3. Add to Theme Structure
```json
"mycomponent": {
  "type": "ui",
  "data-label": "mycomponent",
  "data-component": "my-component",
  "data-preset-targets": [":"]
}
```

### 4. Include in Layouts
```json
"my-layout": {
  "grid-template-areas": "'a b' 'a c'",
  "children": ["mycomponent", "library", "canvas"]
}
```

## Important Notes

1. **Wrapper Divs**: Every data component is wrapped by JTR
2. **Grid Areas**: Applied to wrapper, not component
3. **Preset Targets**: Use `":"` to avoid wrapper styling conflicts
4. **Props Mapping**: All props flow through registry's mapProps
5. **Event Pattern**: Dispatch events, don't call callbacks directly

## Common Mistakes

**Grid area not working?**
- Don't apply preset to wrapper (`:container-preset` breaks grid)
- Component doesn't need to handle gridArea prop
- Check if component is in layout's children array

**Props not updating?**
- Ensure mapProps includes the prop from appState
- Check event listeners in App.tsx
- Verify state updates trigger re-render

**Component not showing?**
- Must be in active layout's children array
- data-component must match registration name
- Component must be in dataComponentsMap in App.tsx