# SESSION 06 - Guardian Dashboard Development

**Date:** 2025-08-20  
**Status:** 🔄 IN PROGRESS  
**Agent:** Claude  

## 🎯 SESSION GOAL
Continue developing Guardian dashboard with proper understanding of theme system architecture.

## 📚 THEME SYSTEM COMPREHENSIVE GUIDE

### Overview
Guardian uses a dual theme system inherited from Studio1:
- **UI Theme** → Powers the dashboard interface
- **ONE Theme** → Powers canvas content elements

### Architecture Components

#### 1. **UIGenerator** (`/src/components/UIGenerator.tsx`)
- **Purpose**: Converts `ui-theme.json` to React components
- **Scope**: UI theme ONLY
- **Input**: Theme JSON structure
- **Output**: React components with theme styling
- **Special Features**:
  - Handles wrapped React components (LayerTree, DirectRenderer)
  - Processes interactive elements with data-action
  - Creates theme-scoped wrapper divs for React components

#### 2. **DirectRenderer** (`/src/components/DirectRenderer.tsx`)
- **Purpose**: Renders ONE theme elements on canvas
- **Scope**: ONE theme ONLY
- **Input**: Canvas elements data
- **Output**: HTML with ONE theme classes
- **Key Responsibility**: Canvas content rendering

#### 3. **RuntimeThemeProcessor** (`/src/theme/runtimeThemeProcessor.ts`)
- **Purpose**: Converts theme JSON to CSS
- **Processes**: BOTH themes
- **Current Bug**: Looks for `elements` instead of `oneElement` (matching Studio1)
- **Output**: Injects `<style>` tags into DOM

### Theme Files

#### UI Theme (`/public/data/themes/ui-theme.json`)
- **Controls**: Dashboard, sidebars, buttons, layer tree wrapper
- **Structure**: Has `structure.root` defining entire dashboard layout
- **Presets**: button, sidebar, canvas-header, etc.
- **Actions**: Simple definitions (a: toggle, d: custom)

#### ONE Theme (`/public/data/themes/one-theme.json`)
- **Controls**: Canvas elements (wrapper, text, image)
- **Philosophy**: Every element is self-contained
- **Elements**: Listed under `oneElement` property
- **Presets**: For visual variations of elements

## 🚨 CRITICAL DOS AND DON'TS

### ✅ DO:
1. **Use Parent Scoping**: `.ui .button`, `.one .wrapper`
2. **Keep Themes Separate**: UI for interface, ONE for content
3. **Follow React Wrapping Pattern**: 
   ```javascript
   // UI theme wrapper with React component inside
   <div class="ui wrapper sidebar">
     <LayerTree /> <!-- React component -->
   </div>
   ```
4. **Use Generic Elements**: `wrapper`, not `canvas-wrapper`
5. **Let Themes Control Styling**: No hardcoded styles except for special React cases

### ❌ DON'T:
1. **No Prefixes**: Never `.ui-button` (use parent scoping instead)
2. **No Mixing**: Don't use ONE classes in UI or vice versa
3. **No Wrapper Divs in ONE Output**: ONE philosophy = single element
4. **No AI Features Yet**: Focus on manual setup
5. **No Random CSS Variables**: Use only defined base variables

## 🔧 CURRENT STATE

### Working Features
- Canvas with drag/drop/select
- Layer Tree with hierarchy
- Grid overlay and snap
- Multi-selection
- Group/Ungroup
- Element creation (Wrapper, Text, Image)
- Both themes loading and processing

### Known Issues
- Canvas header needs proper investigation
- Using Guardian for testing, Studio1 as stable reference

### Recent Changes to Guardian
1. Added debug logging to handleAction
2. Reverted runtimeThemeProcessor to match Studio1's bug
3. Re-added position:relative to canvas content

## 💡 KEY CONCEPTS FOR NEXT AGENT

### Theme Scoping Pattern
```css
/* UI Theme */
.ui .button { /* styles */ }
.ui .sidebar { /* styles */ }

/* ONE Theme */
.one .wrapper { /* styles */ }
.one .text { /* styles */ }
```

### Component Integration Pattern
```javascript
// Canvas content area - special handling
if (element['data-label'] === 'canvas-content') {
  return createElement('div', {
    className: classes.join(' '),
    style: { position: 'relative' } // Needed for absolute positioning
  }, createElement(DirectRenderer, { theme: 'one' }));
}

// LayerTree - wrapped component
if (element['data-component'] === 'LayerTree' && layerTree) {
  return createElement('div', {
    className: classes.join(' '),
    style: { position: 'relative', overflow: 'hidden' } // React needs these
  }, layerTree);
}
```

### Event Flow
1. UI Theme button clicked → `data-action` triggers
2. UIGenerator's handleAction → creates InteractiveButton
3. Button click → dispatches 'ui-action' event
4. GuardianApp listens → updates state or dispatches canvas event
5. DirectRenderer responds → updates canvas

### Canvas Header Architecture
- Should be pure UI theme (no React components)
- Currently using InteractiveButton components
- Buttons defined in theme structure but need proper rendering
- Group containers: button-group, button-pair

## 🎯 IMMEDIATE TASKS

1. Fix LayerTree preset application - presets not being passed from GuardianApp
2. Investigate why lasso select works in S1 but not Guardian
3. Continue developing both dashboards in sync

## 🔄 WORK IN PROGRESS - LayerTree Preset System

### The Goal
Apply color/style presets to LayerTree components without hardcoding colors in component presets.

### Current Architecture
1. **UI Theme Structure** defines:
   ```json
   "data-component-presets": {
     "container": "primary",
     "header": "primary", 
     "item": "neutral-dark",
     "button": "ghost"
   }
   ```

2. **LayerTree Component** expects these presets and applies them:
   ```jsx
   <div className={`layerTree ${presets.container || ''}`}>
     <div className={`layerTree-header ${presets.header || ''}`}>
   ```

3. **The Problem**: Presets aren't reaching LayerTree because:
   - GuardianApp creates LayerTree without passing componentPresets
   - UIGenerator wraps it but can't pass props to already-created component
   - Need to bridge this gap

### Solution Options for Next Agent
1. **Option A**: Pass presets from UIGenerator wrapper to LayerTree via context/props
2. **Option B**: Have LayerTree read from the DOM data attribute (current attempt)
3. **Option C**: Restructure how LayerTree is created/wrapped

### Key Insight
The user wants ANY preset property to work (colors, spacing, typography, etc.), not just colors. The CSS cascade will handle merging base component styles with preset overrides.

## 🚨 CRITICAL DISCOVERY - End of Session

### The Real Problem
UIGenerator is applying theme styles as INLINE STYLES on LayerTree elements, which override ALL CSS classes. This is why presets aren't working!

Evidence from browser inspection:
- LayerTree items have inline styles like `style="padding: 4px 8px; display: flex;"`
- These inline styles come from the component presets in ui-theme.json
- Inline styles have higher specificity than any CSS class

### The Solution Path
1. **Remove inline style application** from UIGenerator for wrapped React components
2. **Remove component presets** from ui-theme.json (they're being applied as inline styles)
3. **Apply presets directly** to the wrapper element in the structure
4. **Let React components** have their own base styles
5. **CSS classes override** the base styles naturally

### What Makes Sense
User's approach: "Leave base styling in React component and only define the wrappers in the presets and then apply the presets to the wrappers in the structure"

This would work because:
- React component has default styles
- Wrapper gets preset classes
- No inline styles interfering
- Natural CSS cascade works properly

## 🛠️ FIX APPLIED - Inline Styles Removed

### What Was Fixed
Removed all inline styles from UIGenerator wrapper elements:
1. LayerTree wrapper - removed `style: { position: 'relative', overflow: 'hidden' }`
2. Legacy sidebar wrapper - removed inline styles
3. Canvas content wrapper - removed `style: { position: 'relative' }`

### Why This Matters
- All styling now comes from CSS classes only
- Presets can properly override component styles via CSS cascade
- No more inline style interference with theme system

### Result
- Wrapper elements only have CSS classes
- Theme presets work as expected through natural CSS cascade
- React components maintain their own internal styles (like LayerTree's paddingLeft for indentation)

## 📝 NOTES FOR CONTINUITY

This session focuses on Guardian dashboard development with full understanding of the theme system. The dual theme architecture is foundational - UI theme for interface, ONE theme for content, with careful separation and parent scoping throughout. 

Remember: Guardian inherits everything from Studio1, including bugs (like the elements/oneElement issue) to maintain parity until we deliberately diverge.