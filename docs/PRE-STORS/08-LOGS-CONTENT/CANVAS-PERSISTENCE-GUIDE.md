# Canvas Persistence & Layout Guide

## Overview

This guide documents the canvas state persistence implementation and layout system fixes completed on Jan 7, 2025.

## State Lifting Implementation

### What We Changed

1. **Lifted elements state from DirectRenderer to App.tsx**
   - Elements are now stored in `canvasElements` state in App.tsx
   - DirectRenderer receives `elements` and `onElementsChange` as props
   - Content persists across layout switches

2. **Centralized ID Generation**
   - All element IDs generated through `autoIdHelper`
   - Format: `{type}-{timestamp}-{randomString}`
   - Prevents ID conflicts across all creation methods

### Data Flow

```
App.tsx (canvasElements state)
    ↓ props
DirectRenderer (elements, onElementsChange)
    ↓ updates
updateElements() → onElementsChange → App.tsx
    ↓ dispatch
canvas-elements-updated event → other listeners
```

## Layout System

### Available Layouts

1. **dashboard** - Full interface with all panels
2. **dashboard-library-canvas** - Library and canvas side by side  
3. **dashboard-canvas** - Canvas with controls
4. **dashboard-library** - Library only view
5. **canvas-only** - Full viewport canvas

### Layout Structure

Each layout defines:
- Grid template columns/rows
- Grid template areas
- Children components array

Components are automatically assigned grid areas in order.

## Fixed Issues

### 1. Canvas Boundary Constraints
- **Problem**: Elements not respecting canvas boundaries
- **Solution**: Changed overflow from hidden to auto/visible
- **Result**: Elements remain visible, scrollbars appear when needed

### 2. Missing Canvas-Only Layout  
- **Problem**: Layout not defined in theme
- **Solution**: Added canvas-only layout definition
- **Result**: Canvas displays full viewport

### 3. Image Upload
- **Problem**: Property change event using wrong field name
- **Solution**: Changed `elementId` to `id` in event detail
- **Result**: Images upload correctly

### 4. Grid Template Syntax
- **Problem**: Missing quote in dashboard-canvas grid-template-areas
- **Solution**: Fixed syntax error
- **Result**: Layout displays correctly

## Known Issues & Solutions

### Elements Disappearing
If elements disappear when moving:
1. Check console for errors
2. Verify element has proper ID
3. Check if element is within viewport
4. Ensure overflow is set to visible/auto

### Layout Not Displaying
If a layout doesn't show properly:
1. Check grid-template-areas syntax
2. Verify all children exist in structure
3. Check for overflow: hidden clipping content
4. Ensure components are registered

### Canvas Controls Position
Canvas controls should appear based on grid area assignment.
If mispositioned:
1. Check grid-template-areas definition
2. Verify component order in children array
3. Check CSS position properties

## Testing Checklist

- [x] Elements persist across layout switches
- [x] Canvas boundaries allow scrolling
- [x] All layouts display correctly
- [x] Image upload works
- [ ] Text elements move properly
- [ ] Media presets apply correctly
- [ ] Save to Library functions

## Next Steps

1. Fix text element movement issues
2. Complete Save to Library modal
3. Test all preset applications
4. Add library source tracking

## Code References

- State management: src/App.tsx:50, src/App.tsx:515
- ID generation: src/utils/autoIdHelper.ts:15
- Layout definitions: public/data/themes/ui-theme.json:640-689
- Canvas updates: src/components/DirectRenderer.tsx:124-134