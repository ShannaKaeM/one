# Toolbox Components Refactor Progress

## Overview
Tracking smaller utility components that provide UI controls and tools. These components were already well-structured and only needed minor TypeScript improvements.

**Note:** Library component roadmap is tracked separately in LIBRARY-ROADMAP-V2.md (updated with Phase 8: ONE-CONNECT Integration)

---

## Components Included

### ✅ CanvasControls
**Status:** COMPLETE with ONE-CONNECT Update (2025-09-13)
- **Size:** 199 → 194 lines
- **Changes:**
  - Extracted 2 SVG icons (GridIcon, SnapIcon)
  - Added TypeScript types
  - Removed console.log
  - **ONE-CONNECT Update:**
    - Removed all props (gridVisible, snapEnabled, callbacks)
    - Now uses useUIStore for grid/snap state
    - Uses useElementStore for createElement
    - No more event dispatching
    - Removed local state tracking
- **Structure:** Already clean, no major refactor needed

### ✅ LayoutSwitcher  
**Status:** COMPLETE with ONE-CONNECT Update (2025-09-13)
- **Size:** 178 → 156 lines
- **Changes:**
  - Added TypeScript types
  - Removed console.log
  - **ONE-CONNECT Update:**
    - Removed activeLayout and onLayoutChange props
    - Now uses useUIStore for layout state
    - Uses usePresetStore for switchLayout
    - No more event dispatching
- **Icons:** Uses emojis (▦, ▭, ▬, etc.)
- **Structure:** Already clean, dynamically discovers layouts

---

## File Structure

```
src/
├── components/
│   ├── CanvasControls.tsx (194 lines)
│   └── LayoutSwitcher.tsx (156 lines)
├── types/
│   └── controls.types.ts (new)
└── utils/
    └── icons.ts (added GridIcon, SnapIcon)
```

---

## Icon Strategy

### Current State
- **SVG Icons:** Extracted to `icons.ts`
  - LayerTree icons (10 icons)
  - Canvas control icons (2 icons)
- **Emoji Icons:** Still inline
  - Editors categories (13 emojis)
  - LayoutSwitcher (7 emojis)

### Future Icon Unification Plan
**Status:** PLANNED
1. Create comprehensive icon system
2. Merge all SVG and emoji types
3. Standardize icon sizing and styling
4. Support both SVG and emoji from single source
5. Enable icon switching/theming

---

## Key Decisions

### Why Minimal Refactor?
- Components already well-structured
- Clean separation of concerns
- Good TypeScript usage (just needed types extraction)
- No massive inline styles or data

### Why Keep Components Separate?
- CanvasControls - Canvas-specific tools
- LayoutSwitcher - Layout management
- Different concerns, different locations
- No benefit to combining

---

## Future Considerations

### Icon System Unification
- Combine all icons (SVG + emoji) into single system
- Create icon provider/registry
- Support dynamic icon switching
- Enable icon theming

### Potential Enhancements
- Add more canvas tools (zoom, pan, etc.)
- Enhanced layout preview in switcher
- Keyboard shortcuts
- Touch/gesture support

---

## Summary

These "toolbox" components represent well-designed utilities that needed minimal refactoring. The main improvements were:
1. TypeScript types extraction
2. Icon extraction (where applicable)
3. Console.log removal

They serve as good examples of how components should be structured from the start.

---

*Toolbox components ready for production!*