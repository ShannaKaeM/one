# Layout Switcher Guide

## Overview
The Layout Switcher allows dynamic switching between different UI layouts without page reload. Layouts control which components are visible and how they're arranged in the grid.

## How It Works

### 1. Initial Layout Detection
The initial layout is read from the theme file, NOT hardcoded:

```json
// ui-theme.json
"root": {
  "type": "ui",
  "data-label": "dashboard",
  "layouts": "dashboard"  // ← Initial layout defined here
}
```

App.tsx reads this on load:
```javascript
const rootLayout = uiTheme?.structure?.root?.layouts;
setAppState(prev => ({ ...prev, activeLayout: rootLayout }));
```

### 2. Layout Switching Flow

```
User clicks layout → LayoutSwitcher dispatches event → App.tsx updates state → JSONtoREACT renders new layout
```

Detailed flow:
1. **LayoutSwitcher component** discovers available layouts from theme
2. User clicks a layout button
3. LayoutSwitcher dispatches: `window.dispatchEvent(new CustomEvent('set-layout', { detail: { layout: 'layout-name' }}))`
4. **App.tsx** handles the event:
   - Updates `appState.activeLayout`
   - Calls `processThemeStructure('ui', newLayout)`
   - Reassigns grid areas based on new layout's children
5. **JSONtoREACT** overrides root layout with `appState.activeLayout`
6. Only renders components listed in the active layout's children array

### 3. Layout Definition

Each layout in `presets.layouts` defines:
```json
"dashboard-library-canvas": {
  "display": "grid",
  "grid-template-columns": "1fr 1fr",
  "grid-template-rows": "60px 1fr",
  "grid-template-areas": "'a c' 'b d'",
  "children": ["layout-switcher", "library", "canvas-controls", "canvas"]
}
```

**Critical**: The `children` array determines:
- Which components are rendered
- Their order (maps to grid areas: first child → 'a', second → 'b', etc.)

### 4. Grid Area Assignment

Automatic assignment by order:
- 1st child in array → grid-area: a
- 2nd child in array → grid-area: b
- 3rd child in array → grid-area: c
- etc. (continues through alphabet)

## Key Connections

### App.tsx ↔ JSONtoREACT
- App.tsx maintains `activeLayout` in state
- Passes it to JSONtoREACT via `appState` prop
- JSONtoREACT overrides root element's layout with `activeLayout`

### Theme Structure ↔ Component Visibility
- Only components in the layout's `children` array are rendered
- Components not listed are completely excluded from the DOM
- No hardcoded component lists - everything is dynamic

### Grid Areas ↔ Component Position
- Grid areas are assigned by position in children array
- JSONtoREACT applies these automatically
- No manual grid-area assignments needed

## Important Notes

1. **No Hardcoding**: Layout names are discovered dynamically from theme
2. **Component Filtering**: Switching layouts actually changes which components exist
3. **State Persistence**: Canvas elements persist across layout switches (lifted state)
4. **Initial Layout**: Change it by editing `root.layouts` in ui-theme.json

## Common Issues

**Layout not switching?**
- Check console for `📐 Setting layout to: [name]`
- Verify layout exists in `presets.layouts`
- Ensure children array has valid component references

**Components in wrong position?**
- Check grid-template-areas matches number of children
- Verify children array order
- Remove any preset targets like `:container` that might override grid areas

**Empty layout?**
- Verify all components in children array exist in structure
- Check for typos in component names
- Ensure data-component matches registration name