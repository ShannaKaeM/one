# SESSION-08: Canvas CSS Refactor for Editor Project - Action List

**Date:** 2025-08-27  
**Focus:** Fix canvas CSS conflicts blocking editor hotkey floating panel functionality  
**Context:** Pausing editor refactor (SESSION-06) to fix underlying DirectRenderer issues  
**Status:** IN PROGRESS  

---

## 🎯 SESSION GOALS

Fix the DirectRenderer and canvas-related CSS issues that are blocking the editor hotkey floating panel project from SESSION-06.

---

## ✅ COMPLETED ACTIONS

- [x] Fixed missing extractPresets function in UIGenerator (was causing console error)
- [x] Restored canvas CSS to global.css as commented-out temporary measure
- [x] Verified DirectRenderer receives presets prop correctly
- [x] Confirmed build passes without errors

---

## 🔄 IN PROGRESS ACTIONS

- [ ] Fix DirectRenderer keyboard event interception
  - **Issue:** DirectRenderer capturing all keyboard events, blocking input fields in floating panels
  - **Impact:** Can only type single characters in floating panel inputs (S, T, C, B, etc.)
  - **From SESSION-06:** "Known issue: Input fields only accepting single characters"
  
---

## 📋 PENDING ACTIONS (From SESSION-07 Handoff)

### Immediate Fixes Needed
- [ ] Fix duplicate canvas-container classes (Lines 1197 & 1205 in DirectRenderer)
  - Current: Same class applied to nested divs causing CSS cascade conflicts
  - Proposed: Use canvas-wrapper for outer, canvas-area for inner

- [ ] Clean up unused CSS in global.css
  - .layer-image and .layer-text defined but never used
  - Either remove or document why they exist

- [ ] Document CSS strategy with clear separation between:
  - Base styles (global.css) - Only resets and performance optimizations
  - Theme styles (JSON-driven) - All visual styling

### Canvas Components Migration (Priority Order)
- [ ] DirectRenderer
  - Extract all inline styles to ui-theme.json
  - Use UIGenerator prop pattern
  - Remove hardcoded dimensions

- [ ] GridOverlay  
  - Move colors to theme variables
  - Make grid size configurable via props
  - Use theme-based z-index system (currently hardcoded zIndex: 1100)

- [ ] SelectionHandles
  - Move pink color (rgba(178, 92, 117, 0.7)) to theme as --selection-color
  - Extract handle sizes to theme variables
  - Use prop-based visibility controls

---

## 🔧 TECHNICAL NOTES

### Component-Level Preset Pattern
```typescript
// Pattern established:
ui-theme.json → UIGenerator → Component Props → Render-time styling

// Example from GeneralControls:
<Component 
  presets={{
    root: 'canvas-area',
    overlay: 'grid-overlay',
    handles: 'selection-handles'
  }}
/>
```

### Current Issues Found
1. DirectRenderer using event.preventDefault() on all keydown events
2. Multiple components still using style props instead of className presets
3. CSS classes mixed between global.css and inline styles

---

## 💡 INSIGHTS & DECISIONS

- 

---

## ⚠️ BLOCKERS & ISSUES

- 

---

## 🚀 NEXT STEPS

1. Start with DirectRenderer keyboard event fix (highest impact)
2. Then tackle CSS class duplication
3. Systematically migrate each canvas component
4. Test thoroughly after each migration

---

**Session Start Time:** 3:40 PM PST  
**Last Updated:** 3:40 PM PST