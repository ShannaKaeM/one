# Session 02: Hotkey-Based Floating Editor Controls

## Date: 2025-08-27

## Overview
This session focused on revolutionizing the editor controls by removing the fixed sidebar and replacing it with a hotkey-driven floating panel system. This creates a clean workspace where controls only appear when needed, following the vision of "large white space with nothing on it until I want it."

## Starting Point
- Branch: `main-active`
- Previous work: Selection UI refinement completed (Session 01)
- Editor controls: Fixed right sidebar with all properties visible

## Vision & Goals
User's vision for the new editor system:
- **Clean workspace** - Nothing visible until needed
- **Hotkey activation** - Single letter hotkeys to open specific control panels
- **Floating panels** - Controls appear at mouse position and can be placed
- **Modular architecture** - Break up large EditorControls into focused modules
- **Future plans** - Customizable hotkeys, favorites panel, moveable panels

## Major Accomplishments ✅

### 1. Removed Editor Sidebar
**Changes**:
- Set `rightSidebarVisible: false` in App state
- Updated dashboard layout to remove right column ("e" grid area)
- Changed grid from `"b a e"` to `"b a"` pattern
- Gained significant canvas space

**Files Modified**:
- `App.tsx`: Disabled right sidebar
- `ui-theme.json`: Updated dashboard-full layout

### 2. Created Modular Control Architecture
**New folder structure**:
```
/components/editor/
  /controls/
    DimensionsControl.tsx
  FloatingPanel.tsx
  EditorHotkeyManager.tsx
```

**DimensionsControl.tsx**:
- First modular control component
- Handles width, height, min/max dimensions
- Uses clean preset names: `section`, `label`, `input`
- Accepts presets as props following GeneralControls pattern
- Fixed React hooks error by creating proper DimensionInput component

### 3. Implemented Floating Panel System
**FloatingPanel.tsx**:
- Portal-based floating container
- Follows mouse until placed (click to drop)
- Draggable by header after placement
- Visual states: Pink border when placing, gray when placed
- Escape key to close

**Key features**:
- `isPlaced` state tracks if panel is dropped
- Mouse tracking active only when `!isPlaced`
- Global click listener to place panel
- Prevents closing on panel clicks

### 4. Built Hotkey Manager
**EditorHotkeyManager.tsx**:
- Single-letter hotkey system (no cmd/ctrl needed)
- Only activates when element is selected
- Current hotkeys mapped:
  - **S** - Sizing/Dimensions
  - **T** - Typography (placeholder)
  - **C** - Colors (placeholder)
  - **B** - Borders (placeholder)
  - **P** - Positioning
  - **L** - Layout
  - **G** - Grid
  - **A** - Animations
  - **E** - Effects
  - **F** - Favorites
  - **M** - Media

### 5. Added UI Theme Presets
**New presets in ui-theme.json**:
```json
"forms": {
  "section": { /* Dark panel styling */ },
  "section-header": { /* Clickable header */ },
  "section-title": { /* Title text */ },
  "property-group": { /* 2-column grid */ },
  "label": { /* Uppercase labels */ },
  "input": { /* Dark theme inputs */ },
  "input-focus": { /* Pink border on focus */ }
}
```

## Technical Challenges & Solutions

### 1. React Hooks Error
**Problem**: Using `useState` inside render function
**Solution**: Created proper `DimensionInput` component

### 2. Panel Not Detaching from Mouse
**Problem**: Complex mouse tracking with multiple effects
**Solution**: Consolidated to single effect, used global click listener
**Status**: Works in DevTools, intermittent in normal mode

### 3. Component Detection
**Problem**: Panels opening without selected element
**Solution**: Added check for `selectedElement` before processing hotkeys

## Current Architecture

### Component Hierarchy
```
App.tsx
  └── UIGenerator (layout)
  └── EditorHotkeyManager
      └── FloatingPanel(s)
          └── DimensionsControl (or other controls)
```

### Data Flow
1. User selects element → `selectedElementData` in App state
2. User presses hotkey → EditorHotkeyManager captures
3. Panel opens at mouse → FloatingPanel tracks position
4. User clicks to place → Panel stops tracking
5. User edits values → `onPropertyChange` updates element

### Preset System
- Controls accept presets as props
- UIGenerator maps theme presets to components
- Clean naming convention (not "editor-button", just "button")
- Reusable across different control types

## Known Issues

### 1. Mouse Tracking Inconsistency
- Works correctly in Chrome DevTools open
- Intermittent behavior in normal mode
- Panel sometimes continues following mouse after click
- **ROOT CAUSE FOUND**: Console shows mouse tracking restarts after cleanup!
  ```
  Starting mouse tracking, isPlaced: false
  Adding placement click listener
  Placing panel on click
  Cleaning up mouse tracking
  Starting mouse tracking, isPlaced: false  <-- This shouldn't happen!
  ```
- The component is re-rendering and restarting tracking despite `isPlaced: true`

### 2. Flash on Open
- Panel briefly appears at center before jumping to mouse
- Need to initialize position before first render

---

## Agent Handoff 🚀

### Current Status
The hotkey system is functional but has a mouse detachment bug that appears intermittently. The architecture is solid and ready for expansion with more control modules.

### Immediate Tasks

#### 1. Fix Mouse Detachment Issue
**Current behavior**: 
- In DevTools: Panel places correctly on click
- Normal mode: Panel sometimes keeps following mouse

**Debugging approach**:
```javascript
// Current implementation uses:
- Global click listener with setTimeout
- isPlaced state to control tracking
- Multiple console.logs show state changes correctly
```

**Suggested fixes to try**:
1. **Check why component re-renders** after setting `isPlaced = true`
   - Add `console.log` in component body to track renders
   - Check if parent component is causing re-render
   - Consider using `useCallback` for event handlers
2. **Guard the effect better**:
   ```javascript
   useEffect(() => {
     // Add explicit check
     if (isOpen && isPlaced === false) {
       console.log('Starting tracking, isPlaced is:', isPlaced);
       // ... mouse tracking
     }
   }, [isOpen, isPlaced]);
   ```
3. **Use a ref to track state**:
   ```javascript
   const isPlacedRef = useRef(false);
   // Update ref when state changes
   ```
4. **Debug state value**: The console shows `isPlaced: false` when it should be true

#### 2. Create More Control Modules
Following the DimensionsControl pattern, create:

**TypographyControl.tsx**:
- Font family, size, weight
- Line height, letter spacing
- Text align, transform

**ColorControl.tsx**:
- Color, backgroundColor
- borderColor, outlineColor
- Integration with existing ColorPopup

**BorderControl.tsx**:
- Border width, style, color
- Border radius (individual corners)
- Outline properties

**PositioningControl.tsx**:
- Position type (static, relative, absolute, fixed)
- Top, right, bottom, left
- Z-index

#### 3. Enhance FloatingPanel
- Add resize handles to panels
- Remember last position per panel type
- Add minimize/maximize states
- Implement panel stacking/focus management

#### 4. User Customization
- Allow custom hotkey mapping
- Save hotkey preferences
- Create favorites system for common property sets
- Add visual hotkey hints (ghost buttons)

### Architecture Guidelines

#### Component Creation Pattern
```tsx
interface [Name]ControlProps {
  selectedElement?: any;
  onPropertyChange?: (property: string, value: any) => void;
  presets?: {
    root?: string;
    section?: string;
    label?: string;
    input?: string;
    // ... other preset mappings
  };
}
```

#### Preset Naming Convention
- Use generic names: `button`, `input`, `label`
- Avoid prefixes: NOT `editor-button`
- State modifiers: `hover`, `active`, `focus`
- Compositional: `section-header`, `property-group`

#### Integration Points
1. Add control to EditorHotkeyManager
2. Map hotkey in switch statement
3. Create FloatingPanel instance
4. Pass presets from App.tsx
5. Update ui-theme.json if new presets needed

### Testing Checklist
- [ ] Hotkey only works with element selected
- [ ] Panel appears at mouse position
- [ ] Click to place works consistently
- [ ] Escape closes panel
- [ ] Values update selected element
- [ ] Panel is draggable after placement
- [ ] Multiple panels can be open
- [ ] Clicking outside panels doesn't break anything

### Long-term Vision
1. **Command palette** for all controls (Cmd+K style)
2. **Contextual hotkeys** based on element type
3. **Gesture support** for touch devices
4. **AI suggestions** for property values
5. **Preset recording** - save property combinations
6. **Collaborative cursors** for team editing

### Resources
- Current implementation: `/src/components/editor/`
- Theme configuration: `/public/data/themes/ui-theme.json`
- Selection system: `/src/components/SelectionHandles.tsx` (Session 01)
- Main app state: `/src/App.tsx`

Good luck! The foundation is solid - just need to squash that mouse bug and expand the control modules. The user's vision of a clean, hotkey-driven interface is within reach! 🎯