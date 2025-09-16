# Log 021: Layout Switcher & Icon Generator Exploration

**Date**: 2025-09-15
**Focus**: Component refactoring with theme presets, exploring ONE-CONNECT patterns, and icon generation
**Status**: In Progress - Multiple layouts rendering issue needs fixing

---

## Session Overview

This session focused on continuing the component-to-theme migration refactor, specifically working on the LayoutSwitcher component. We explored the power of ONE-CONNECT to create dynamic, data-driven components and discovered both successes and challenges.

---

## Key Context Reviewed

### Project Architecture
- **Studio1**: A visual builder application with two themes
  - **UI Theme**: For building the app interface itself  
  - **ONE Theme**: For users to build their own visual layouts
- **Store-First Architecture**: All state in Zustand stores
- **ONE-CONNECT System**: Theme-driven component orchestration
- **No Events**: Direct store communication, replaced event system

### Available Stores (Important for Next Agent)
1. **uiStore** - UI state (layout, gridVisible, expandedSections)
2. **oneStore** - Canvas elements and selection
3. **libraryStore** - Media library items
4. **presetStore** - Theme presets and layouts
5. **elementStore** - Element creation factory
6. **projectStore** - Save/load functionality
7. **appStore** - Core app state

### Current Refactor Status
- **Editors Component**: ✅ Complete with generic wrapper pattern
- **LayoutSwitcher**: 🔄 In progress - works but has rendering issues

---

## Work Completed

### 1. Understanding the Refactor Pattern

We reviewed the pattern established with the Editors component:
- Generic wrapper (doesn't exist as component) 
- Applies preset styling via `data-preset-targets`
- Real components as children
- All styling from theme, no inline styles

### 2. Fixed layoutBuilder.ts Issue

**Problem**: layoutBuilder was adding "-wrapper" suffix to all component classNames
```typescript
// Was: className: `${childKey}-wrapper`
// Fixed to: className: childKey
```
Location: `src/components/one-connect/layoutBuilder.ts:37`

### 3. Created IconGenerator Component

Created a powerful new component for auto-generating icon toolbars:

**File**: `src/components/IconGenerator.tsx`
**Purpose**: Dynamically generates icon buttons from data
**Features**:
- Takes array from data-source
- Maps to icons via iconMap
- Handles clicks via data-actions
- Shows active state

**Example Usage**:
```json
{
  "layout-switcher": {
    "data-component": "icon-generator",
    "data-source": "presetStore.availableLayouts",
    "data-actions": {
      "onItemClick": "uiStore.setLayout"
    }
  }
}
```

### 4. Store Connector Issues & Rollback

**Attempted Fix**: Modified storeConnector.ts to handle store hooks
**Problem**: Caused white screen - app wouldn't render
**Resolution**: Rolled back changes via `git checkout`
**Learning**: Stores are passed as hooks, not instances. The original implementation was correct.

### 5. Theme Reorganization

**Created**: `dashboard-layouts` subcategory in theme
**Structure**: 
```
presets.layouts.dashboard-layouts
  - dashboard
  - dashboard-canvas  
  - dashboard-library-canvas
```

**Updated Files**:
- `src/components/LayoutSwitcher.tsx` - Look for subcategory
- `src/stores/presetStore.ts` - Handle nested structure
- `src/App.tsx` - Find layouts in subcategory

---

## Current Issue - CRITICAL FOR NEXT AGENT

### Problem: Multiple Layouts Rendering Simultaneously

**Symptom**: All dashboard layouts are rendering at the same time, stacked on top of each other

**Evidence in Console**:
- DirectRenderer COMPONENT RENDERING appears 3 times
- Theme prop shows "one" for each
- All library items loading 6 times

**Visible in React DevTools**:
- dashboard layout div
- dashboard-library-canvas layout div  
- dashboard-canvas layout div
- All rendering with their full component trees

**Root Cause**: Unknown - needs investigation
**Where to Look**:
1. `App.tsx` - How `themeWithLayout` is built
2. `ONE-CONNECT` - How it processes layouts
3. Theme structure - Check for duplicate layout definitions

**Debug Code Added**:
```typescript
console.log('🔍 themeWithLayout keys:', Object.keys(themeWithLayout));
console.log('🔍 activeLayoutKey:', activeLayoutKey);
```

---

## Key Learnings

### 1. ONE-CONNECT Power
- Can create components from just theme configuration
- Generic wrappers reduce boilerplate
- Data-driven UI is possible

### 2. Store Architecture
- Stores are Zustand hooks, not plain objects
- Actions are directly on store, not in getState()
- ONE-CONNECT passes store hooks in the stores object

### 3. Theme Patterns
- Subcategories help organize presets
- `data-preset-targets` syntax:
  - `:preset` - Apply to wrapper
  - `element:preset` - Apply to internal elements
  - `button:icon-button` - Apply to all button elements

### 4. Component Patterns
- Generic wrappers via non-existent data-component names
- Real components for complex logic
- Preset styling instead of inline styles

---

## Files Modified

1. `src/components/one-connect/layoutBuilder.ts` - Removed "-wrapper" suffix
2. `src/components/IconGenerator.tsx` - Created new component
3. `src/utils/registerComponents.ts` - Added IconGenerator registration  
4. `src/App.tsx` - Added IconGenerator import, updated layout lookup
5. `src/components/LayoutSwitcher.tsx` - Updated to find subcategory layouts
6. `src/stores/presetStore.ts` - Handle nested layout structure
7. `public/data/themes/ui-theme.json` - Reorganized into dashboard-layouts

---

## Next Steps for Continuation

### IMMEDIATE PRIORITY: Fix Multiple Layout Rendering

1. **Debug why all layouts render**:
   - Check if theme structure includes layout definitions
   - Verify ONE-CONNECT only renders active layout
   - Look for duplicate layout processing

2. **Potential Solutions**:
   - Ensure only active layout is in themeWithLayout
   - Check if layouts are being added to structure
   - Verify processThemeStructure isn't adding extras

### After Fix:

3. **Complete LayoutSwitcher Refactor**:
   - Decide between IconGenerator or original approach
   - Apply preset styling properly
   - Remove inline styles

4. **Continue Component Migration**:
   - LayerTree (next in line)
   - Library
   - CanvasControls

---

## Communication Notes

- User has dyslexia and ADHD - keep explanations clear and visual
- User prefers step-by-step approaches
- The app is complex and innovative - take time to understand
- Follow the communication guide at `/docs/00-MASTER-GUIDES/GUIDES/000-COMMUNICATION-GUIDE.md`

---

## Agent Handoff

**Current State**: App works but renders all layouts simultaneously. User wants this fixed.

**Priority Tasks**:
1. Fix multiple layout rendering issue
2. Continue with component refactoring
3. Test layout switcher with proper preset styling

**Important Context**:
- We spent significant time understanding the architecture - please read the guides
- The generic wrapper pattern is powerful but needs careful implementation
- Stores are Zustand hooks, not plain objects
- ONE-CONNECT is new and we're still exploring its capabilities

**User's Preference**: Fix the rendering issue first, then continue exploration

---

*End of Log 021*