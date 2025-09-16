# SESSION-07: Canvas CSS Refactor & Prop-Based UI Migration

**Date:** 2025-08-27  
**Focus:** Fix canvas CSS conflicts and migrate components to prop-based UI theme system  
**Priority:** High - Blocking proper canvas functionality  
**Agent:** [Next Agent]

---

## 🎯 SESSION GOALS

1. **Fix duplicate canvas-container classes** causing CSS conflicts
2. **Identify and document all hardcoded styles** in canvas-related components
3. **Create migration plan** for prop-based UI theme system
4. **Ensure clean separation** between base CSS and theme-driven styles

---

## 📋 CURRENT ISSUES IDENTIFIED

### 1. **Duplicate Canvas Container Classes**
**File:** `/src/components/DirectRenderer.tsx`
**Lines:** 1197 & 1205

```jsx
// Current problematic code:
<div className="canvas-container" style={{ ... }}>  // Line 1197
  <div 
    ref={canvasRef}
    className="direct-renderer canvas-container"  // Line 1205 - DUPLICATE!
    style={{ ... }}
  >
```

**Issue:** Same class applied to nested divs causing CSS cascade conflicts

### 2. **Unused CSS Classes in global.css**
**File:** `/src/styles/global.css`
**Lines:** 60-78

```css
/* These are defined but never used in implementation */
.layer-image { ... }
.layer-text { ... }
```

**Issue:** Legacy code that may cause confusion or unexpected styling

### 3. **Hardcoded Inline Styles**
Components with hardcoded styles that need prop-based migration:

- **GridOverlay.tsx** - zIndex: 1100, colors hardcoded
- **SelectionHandles.tsx** - Pink color (rgba(178, 92, 117, 0.7)) hardcoded
- **DirectRenderer.tsx** - Multiple inline styles throughout
- **LayerTree.tsx** - Various inline styles for tree structure

---

## 🔧 IMMEDIATE FIXES NEEDED

### Fix 1: Remove Duplicate Canvas Class
```jsx
// PROPOSED FIX:
<div className="canvas-wrapper" style={{ ... }}>  // Outer wrapper
  <div 
    ref={canvasRef}
    className="direct-renderer canvas-area"  // Use canvas-area instead
    style={{ ... }}
  >
```

### Fix 2: Clean Up global.css
Either:
- Remove unused `.layer-image` and `.layer-text` classes
- OR document why they exist if needed for future use

### Fix 3: Document CSS Strategy
Create clear separation between:
- **Base styles** (global.css) - Only resets and performance optimizations
- **Theme styles** (JSON-driven) - All visual styling

---

## 🚀 PROP-BASED MIGRATION PLAN

### Phase 1: Canvas Components (Priority)
1. **DirectRenderer**
   - Extract all inline styles to ui-theme.json
   - Use UIGenerator prop pattern
   - Remove hardcoded dimensions

2. **GridOverlay**
   - Move colors to theme variables
   - Make grid size configurable via props
   - Use theme-based z-index system

3. **SelectionHandles**
   - Move pink color to theme as `--selection-color`
   - Extract handle sizes to theme variables
   - Use prop-based visibility controls

### Phase 2: Supporting Components
- LayerTree (sidebar styles)
- SelectionActionButton
- FloatingPanelSimple
- EditorHotkeyManager

---

## 📊 TECHNICAL CONTEXT

### Current Prop-Based Pattern (UIGenerator)
```typescript
// How UIGenerator handles prop-based styling:
<Component 
  presets={element.preset}
  className={`ui ${presetClasses}`}
  style={processedStyles}
/>
```

### Target Pattern for Canvas Components
```typescript
// Canvas components should receive presets as props:
<GridOverlay 
  presets={gridPresets}
  visible={gridVisible}
/>
```

---

## ⚠️ CRITICAL NOTES FOR NEXT AGENT

1. **DO NOT** add more CSS to global.css
2. **DO NOT** create new CSS classes outside theme system
3. **TEST** canvas functionality after each change
4. **PRESERVE** the separation between ui-theme and one-theme
5. **CHECK** that DirectRenderer still outputs clean HTML

---

## 📝 TESTING CHECKLIST

After refactoring:
- [ ] Canvas renders without duplicate containers
- [ ] Grid overlay toggles properly
- [ ] Selection handles appear at correct position
- [ ] Drag and drop still works
- [ ] Multi-selection visual feedback works
- [ ] No CSS conflicts in DevTools console

---

## 🔗 RELATED DOCUMENTATION

- System Overview: `/docs/SYSTEM-AUDITS/03-CURRENT-SYSTEM-OVERVIEW-2025-08-27.md`
- CSS Conflicts Section: Lines discussing global.css issues
- Prop-Based Pattern: Review Session-08 in 04-LOGS-DASHBOARD

---

## 🎯 SUCCESS CRITERIA

1. Zero duplicate CSS classes in canvas hierarchy
2. All canvas components receive styling via props
3. Clean separation between base CSS and theme CSS
4. No hardcoded colors or dimensions in components
5. Canvas functionality unchanged or improved

---

**Next Agent Action:** Start with fixing the duplicate canvas-container issue as it's blocking proper functionality. Then proceed with prop-based migration starting with DirectRenderer.