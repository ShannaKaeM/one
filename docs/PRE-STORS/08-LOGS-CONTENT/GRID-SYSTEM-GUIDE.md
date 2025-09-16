# Grid System & Auto ID Guide

## 🎯 Overview

The Grid System automatically assigns CSS Grid positions to components based on their order in layouts. This guide explains how components get positioned without any manual grid area assignments.

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

### 2. Automatic Assignment Process

```javascript
// In App.tsx - processThemeStructure()
activeLayoutData.children.forEach((childKey: string, index: number) => {
  assignments[childKey] = {
    id: childKey,
    gridArea: autoIdHelper.getGridArea(index) // Returns 'a', 'b', 'c', etc.
  };
});
```

**Result**: 
- layertree → 'a'
- layout-switcher → 'b' 
- canvas → 'c'
- library → 'd'
- canvas-controls → 'e'
- editors → 'f'

### 3. Grid Areas Applied to Wrappers

**Critical**: Grid areas are applied to JTR wrapper divs, NOT the components!

```html
<!-- What actually renders -->
<div class="root dashboard">
  <div style="grid-area: a">  <!-- JTR wrapper for layertree -->
    <LayerTree />
  </div>
  <div style="grid-area: b">  <!-- JTR wrapper for layout-switcher -->
    <LayoutSwitcher />
  </div>
  <!-- etc... -->
</div>
```

---

## 🔄 Dynamic Layout Switching

### Initial Layout Detection
```javascript
// App.tsx reads from theme root
const rootLayout = uiTheme?.structure?.root?.layouts; // "dashboard"
setAppState(prev => ({ ...prev, activeLayout: rootLayout }));
```

### Layout Change Flow
1. User clicks layout in LayoutSwitcher
2. Event dispatched: `'set-layout'`
3. App.tsx updates `activeLayout`
4. `processThemeStructure()` runs with new layout
5. New grid assignments created
6. JSONtoREACT re-renders with new layout

### Component Filtering
- Only components in the layout's `children` array are rendered
- Switching layouts can completely change which components exist
- Components not in children array are removed from DOM

---

## ⚠️ Common Issues & Solutions

### Components Not in Correct Position
**Problem**: Grid areas not applying correctly
**Solution**: Remove preset targets on wrapper
```json
// ❌ Bad - preset overrides grid area
"data-preset-targets": [":container-preset"]

// ✅ Good - clean wrapper
"data-preset-targets": [":"]
```

### Layout Not Switching
**Problem**: Components stay in same position
**Solution**: Check that JSONtoREACT overrides root layout
```javascript
// JSONtoREACT.tsx
if (!parentElement && appState?.activeLayout) {
  layouts = [appState.activeLayout]; // Override with active layout
}
```

### Empty Layout After Switch
**Problem**: No components visible
**Solution**: Verify all children exist in structure
```json
"children": ["layout-switcher", "library", "canvas-controls", "canvas"]
// All 4 must exist in structure object
```

---

## 📝 Best Practices

### 1. Clean Wrapper Rule
Always use `[":"]` for data components in layouts:
```json
{
  "data-component": "library",
  "data-preset-targets": [":"]  // No wrapper styling
}
```

### 2. Match Grid Areas to Children
Ensure grid-template-areas has slots for all children:
```json
"grid-template-areas": "'a b' 'c d'",  // 4 slots
"children": ["one", "two", "three", "four"]  // 4 components
```

### 3. Order Matters
Children array order determines grid position:
```json
"children": ["header", "sidebar", "main", "footer"]
// Results in: header→a, sidebar→b, main→c, footer→d
```

---

## 🔧 How to Debug

### Check Assignments
```javascript
console.log('📊 Grid areas:', appState.componentAssignments);
// Shows: { layertree: {gridArea: 'a'}, canvas: {gridArea: 'c'}, ... }
```

### Inspect DOM
Look for wrapper divs with grid areas:
```html
<div class="canvas" style="grid-area: c;">
```

### Verify Active Layout
```javascript
console.log('📐 Active layout:', appState.activeLayout);
console.log('📦 Layout children:', activeLayoutData?.children);
```

---

## 🎯 Key Takeaways

1. **No Manual Assignment**: Grid areas are automatic based on order
2. **Wrappers Get Areas**: JTR wrappers receive grid positioning
3. **Dynamic Layouts**: Switching layouts changes everything
4. **Clean Wrappers**: Use `[":"]` to avoid conflicts
5. **Order = Position**: First child gets 'a', second gets 'b', etc.