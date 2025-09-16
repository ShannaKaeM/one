# Dashboard System Guide

## Overview
The Dashboard is the main Studio1 interface that orchestrates JTR, Canvas, and Library systems. It provides layout management, dynamic children, and user controls.

## Architecture
```
ui-theme.json → Layout Presets → Dynamic Children → Component Placement
     ↓
App.tsx → Layout Switching → Theme Update → Re-render
```

## 1. Layout System

### Available Layouts
Location: `/public/data/themes/ui-theme.json` (line ~631)

**Full Dashboard** (3-column workspace):
```json
"db-full": {
  "grid-template-columns": "250px 1fr 350px",
  "grid-template-rows": "60px 1fr 60px",
  "grid-template-areas": "'a b e' 'a c e' 'a d e'",
  "children": ["layertree", "canvas-controls", "canvas", "library", "editors"],
  "icon": "⊞",
  "label": "Full Dashboard"
}
```

**Library & Canvas** (2-column split):
```json
"db-library-canvas": {
  "grid-template-columns": "1fr 2fr",
  "grid-template-rows": "60px 1fr",
  "grid-template-areas": "'a b b' 'a c c' 'a c c'",
  "children": ["library", "canvas-controls", "canvas"],
  "icon": "◫",
  "label": "Library & Canvas"
}
```

**Canvas Only** (full screen canvas):
```json
"db-canvas": {
  "grid-template-columns": "1fr",
  "grid-template-rows": "60px 1fr",
  "grid-template-areas": "'a' 'b'",
  "children": ["canvas-controls", "canvas"],
  "icon": "□",
  "label": "Canvas Only"
}
```

### Grid Area Mapping
- `a` → First child (layertree/library)
- `b` → Second child (canvas-controls)
- `c` → Third child (canvas)
- `d` → Fourth child (unused in split)
- `e` → Fifth child (editors/unused in split)

## 2. Dynamic Children System

### How It Works
Location: `/src/components/JSONtoREACT.tsx` (line ~300)

1. Element has no children defined
2. JTR checks applied layout presets
3. Layout preset provides children array
4. Children get auto-assigned grid areas

### Implementation
```javascript
if (!childrenToProcess && layouts.length > 0) {
  for (const layoutName of layouts) {
    const layoutPreset = config?.presets?.layouts?.[layoutName];
    if (layoutPreset?.children) {
      childrenToProcess = layoutPreset.children;
      break;
    }
  }
}
```

### Benefits
- Change layout = change entire UI structure
- No manual children management
- Perfect for workspace presets

## 3. Layout Switching

### User Controls
Location: `/public/data/themes/ui-theme.json` (line ~841)

```json
"layout-switcher-group": {
  "type": "one",
  "layouts": "layout-switcher-group",
  "children": ["db-full", "db-library-canvas", "db-canvas"]
}
```

### Button Definitions with @ References
```json
"db-full": {
  "type": "one",
  "components": "icon-button",
  "content": "@layout-icon:db-full",  // Pulls ⊞ from layout preset
  "onClick": "set-layout:db-full"
}
```

The buttons automatically get their icons from the layout presets using @ reference syntax!

### Button Actions (Dynamic System)
- Full Dashboard: `onClick: "set-layout:db-full"`
- Library & Canvas: `onClick: "set-layout:db-library-canvas"`
- Canvas Only: `onClick: "set-layout:db-canvas"`

Pattern: `set-layout:[layout-name]` - ANY layout name works!

### Event Flow
1. Button click → `onClick` handler
2. JTR dispatches → `jtor-action` event
3. DirectRenderer parses `set-layout:*` → extracts layout name
4. Dispatches `set-layout` event with layout name
5. App.tsx updates → theme structure root.layouts
6. Force re-render → new layout applied

### Handler Implementation
Location: `/src/App.tsx` (line ~277)

```javascript
const handleSetLayout = (event: CustomEvent) => {
  const { layout } = event.detail;
  const currentTheme = runtimeThemeProcessor.getTheme('ui');
  if (currentTheme?.structure?.root) {
    currentTheme.structure.root.layouts = layout;
    setThemeLoaded(false);
    setTimeout(() => setThemeLoaded(true), 10);
  }
};
```

## 4. Canvas Controls Toolbar

### Structure
Location: `/public/data/themes/ui-theme.json` (line ~786)

```json
"canvas-controls": {
  "layouts": "toolbar-cols",
  "children": [
    "elements-button-group",    // +, T, M buttons
    "layout-switcher-group",     // Dashboard/Split toggle
    "grid-snap-button-group"     // Grid/Snap controls
  ]
}
```

### Button Groups
Each group uses `toolbar-cols` layout for horizontal arrangement.

### Actions
- `add-one-element` → Creates wrapper element
- `add-text-element` → Creates text element
- `add-media-element` → Creates media element
- `toggle-grid` → Shows/hides grid overlay
- `toggle-snap` → Enables/disables grid snapping
- `set-layout-dashboard` → Switches to dashboard layout
- `set-layout-split` → Switches to split layout

## 5. Component Placement

### Dashboard Components
1. **LayerTree** (left panel) - Element hierarchy
2. **Canvas Controls** (top bar) - User actions
3. **Canvas** (center) - DirectRenderer workspace
4. **Library** (left panel in split) - Media browser
5. **Editors** (right panel) - Property panels

### Root Configuration
Location: `/public/data/themes/ui-theme.json` (line ~793)

```json
"root": {
  "type": "one",
  "data-label": "dashboard",
  "layouts": "db-full"  // Change to "db-library-canvas" or "db-canvas" for alternate layouts
}
```

## 6. State Management

### App State
Location: `/src/App.tsx` (line ~15)

```javascript
const [appState, setAppState] = useState({
  gridVisible: false,
  snapEnabled: false,
  libraryVisible: true,
  libraryCollapsed: false,
  // ... more UI state
});
```

### State Flow
1. User action → Event dispatch
2. App.tsx handler → State update
3. Props passed to components
4. Components react to changes

## 7. Event Routing

### DirectRenderer Action Handler
Location: `/src/components/DirectRenderer.tsx` (line ~715)

```javascript
case 'set-layout-dashboard':
  window.dispatchEvent(new CustomEvent('set-layout', {
    detail: { layout: 'dashboard' }
  }));
  break;
```

### App.tsx Listeners
- `ui-action` → General UI state changes
- `set-layout` → Layout switching
- `element-selected` → Selection updates
- `canvas-elements-updated` → Canvas changes

## 8. Theme Processor Integration

### CSS Generation
The theme processor creates classes for each layout preset:

```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr 350px;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas: 'a b e' 'a c e' 'a d e';
}
```

### Variable Application
Uses double-set pattern for all CSS properties.

## 9. Troubleshooting

### Layout Not Switching
1. Check console for layout change events
2. Verify theme structure has root element
3. Check layout preset exists in theme
4. Ensure setThemeLoaded triggers re-render

### Components Missing
1. Verify children array in layout preset
2. Check structure definitions exist
3. Confirm grid areas match children count
4. Look for auto-ID generation logs

### Buttons Not Working
1. Check onClick handlers in theme
2. Verify DirectRenderer action cases
3. Confirm event listeners in App.tsx
4. Check for event.stopPropagation()

## 10. File Reference

### Core Files
- `/src/App.tsx` - Layout switching, state management
- `/public/data/themes/ui-theme.json` - Layout definitions, structure
- `/src/components/JSONtoREACT.tsx` - Dynamic children resolution
- `/src/components/DirectRenderer.tsx` - Button action routing

### Key Functions
- `handleSetLayout()` - Updates theme layout
- `resolveStructure()` - Resolves children references
- `generateElement()` - Creates components from children

## 11. Layout Creation

### Adding New Layout (No Code Required!)
1. Define in `presets.layouts` with grid setup and children array
2. Create button with `onClick: "set-layout:your-layout-name"`
3. Add button to layout-switcher-group children
4. Done! No DirectRenderer changes needed

### Example
```json
"my-workspace": {
  "display": "grid",
  "grid-template-columns": "300px 1fr",
  "grid-template-areas": "'a b'",
  "children": ["editors", "canvas"]
}

"my-workspace-button": {
  "type": "one",
  "components": "icon-button",
  "content": "⚡",
  "onClick": "set-layout:my-workspace"
}
```