# Grid System & Auto ID Guide

## 🎯 Overview

The Grid System automatically assigns CSS Grid positions to components, enabling flexible layouts without hardcoding positions. Combined with the Auto ID system, components get unique identifiers and grid placements dynamically.

---

## 🏗️ How Grid Assignment Works

### 1. Layout Definition (ui-theme.json)

```json
"dashboard": {
  "display": "grid",
  "grid-template-columns": "250px 1fr 1fr 350px",
  "grid-template-rows": "60px 1fr 500px",
  "grid-template-areas": "'a b e f' 'a c c f' 'a d d f'",
  "children": ["layertree", "layout-switcher", "canvas", "library", "canvas-controls", "editors"]
}
```

### 2. Auto Assignment in App.tsx

```javascript
// processThemeStructure() assigns grid areas based on child order
activeLayoutData.children.forEach((childKey: string, index: number) => {
  assignments[childKey] = {
    id: childKey,
    gridArea: autoIdHelper.getGridArea(index) // Returns 'a', 'b', 'c', etc.
  };
});

// Result:
// layertree → 'a'
// layout-switcher → 'b' 
// canvas → 'c'
// library → 'd'
// canvas-controls → 'e'
// editors → 'f'
```

### 3. Application in JSONtoREACT

```javascript
// Checks for grid area assignment
if (appState?.componentAssignments?.[elementKey]) {
  const assignment = appState.componentAssignments[elementKey];
  if (assignment?.gridArea) {
    props.style.gridArea = assignment.gridArea;
  }
}
```

### 4. CSS Grid Placement

The browser then places each component in its grid area:
```
┌─────┬─────────────┬─────┬─────┐
│  a  │      b      │  e  │  f  │  Row 1 (60px)
├─────┼─────────────┴─────┼─────┤
│  a  │         c         │  f  │  Row 2 (1fr)
├─────┼───────────────────┼─────┤
│  a  │         d         │  f  │  Row 3 (500px)
└─────┴───────────────────┴─────┘
```

---

## 📍 Grid Area Assignment Rules

### Components That Get Grid Areas:
- All components in layout's children array
- Components without explicit grid-area property
- Regular UI components

### Components That Skip Grid Areas:
- Root element (defines the grid)
- Absolute positioned overlays:
  - selection-handles
  - grid-overlay
  - drag-overlay
  - resize-handle
  - selection-action-button
  - element-popup
- Components with explicit grid-area property

---

## 🔤 Auto ID System

### Grid Area Generation
```javascript
// autoIdHelper.ts
const gridAreaMap = {
  0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f',
  6: 'g', 7: 'h', 8: 'i', 9: 'j', 10: 'k', 11: 'l'
  // ... continues through alphabet
};

getGridArea(index: number): string {
  return gridAreaMap[index] || `area-${index}`;
}
```

### ID Generation
```javascript
// For elements without IDs
generateId(): string {
  return `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

---

## 🎨 Layout Names - Fully Dynamic!

### Automatic Layout Detection (Updated Jan 7, 2025)

The system now automatically reads your layout name from the theme. You only need to define it in TWO places:

1. **Preset Definition**
```json
"presets": {
  "layouts": {
    "my-awesome-layout": { /* ... */ }  // ← Your layout name
  }
}
```

2. **Root Structure**
```json
"structure": {
  "root": {
    "layouts": "my-awesome-layout"  // ← Tell root which layout to use
  }
}
```

### How It Works:
```javascript
// App.tsx automatically reads from theme root on load
const rootLayout = uiTheme?.structure?.root?.layouts;
if (rootLayout) {
  setAppState(prev => ({ ...prev, activeLayout: rootLayout }));
}

// When processing layouts, it uses theme root if no activeLayout set
const layoutToUse = appState.activeLayout || themeConfig.structure?.root?.layouts || 'dashboard';
```

**That's it!** Change the layout name in your theme, and the app automatically uses it:
- No manual App.tsx updates
- No hardcoded values
- Just reload after changing theme

---

## 🔄 Data Flow

```
1. Theme defines layout with children array
                ↓
2. App.tsx processes structure on mount/layout change
                ↓
3. Assigns grid areas based on child order (a, b, c...)
                ↓
4. Passes assignments via appState
                ↓
5. JSONtoREACT applies grid-area to component style
                ↓
6. CSS Grid positions components
```

---

## 🚀 Adding New Layouts

### 1. Define in Theme
```json
"my-custom-layout": {
  "display": "grid",
  "grid-template-columns": "200px 1fr",
  "grid-template-rows": "1fr",
  "grid-template-areas": "'a b'",
  "children": ["sidebar", "content"]
}
```

### 2. Components Automatically Get:
- sidebar → grid-area: 'a'
- content → grid-area: 'b'

### 3. Switch to It
```javascript
window.dispatchEvent(new CustomEvent('set-layout', {
  detail: { layout: 'my-custom-layout' }
}));
```

---

## 🐛 Troubleshooting

### Components Stacking/Overlapping
1. Check CSS selector format:
   - `.ui.dashboard` (correct - no space)
   - NOT `.ui .dashboard` (incorrect - with space)

2. Verify grid-template-areas matches children count

3. Check console for assignments:
   ```javascript
   console.log('🎯 Component assignments:', assignments);
   ```

### Layout Not Loading
1. Check layout name in preset definition matches root structure
2. Verify the layout exists in presets.layouts
3. Check console for "Setting initial layout from theme root"
4. Ensure processThemeStructure() is called

### Component in Wrong Position
1. Check children array order in layout
2. Verify no explicit grid-area overriding
3. Look at grid-template-areas pattern

---

## 📝 Quick Reference

**Key Files:**
- `/src/App.tsx` - processThemeStructure() assigns grid areas
- `/src/utils/autoIdHelper.ts` - Grid area and ID generation
- `/src/components/JSONtoREACT.tsx` - Applies grid areas
- `/public/data/themes/ui-theme.json` - Layout definitions

**Key Concepts:**
- Grid areas assigned by child order (0→'a', 1→'b', etc.)
- Layout names are NOT hardcoded - use any name
- Components automatically positioned - no manual placement
- Absolute positioned elements skip grid assignment

**CSS Grid Properties Used:**
- `display: grid`
- `grid-template-columns`
- `grid-template-rows` 
- `grid-template-areas`
- `grid-area` (on children)