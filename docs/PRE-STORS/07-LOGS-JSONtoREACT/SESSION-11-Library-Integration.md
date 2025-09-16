# Session 11: Library Integration & Element Visibility Fix

## Issues Addressed

### 1. Missing Upload Buttons in ElementPopup
**Problem**: The Wrapper/Text/Media preset toggle buttons weren't showing in the popup when clicking the action button.

**Root Cause**: The `selectedElement` prop passed to SelectionActionButton was `selectedElementObj` (just id and rect) instead of the full element data.

**Fix**: Changed to pass the full element object
```javascript
// Before
selectedElement={selectedElementObj}

// After  
selectedElement={elements.find(el => el.id === selectedElementId)}
```

### 2. Elements Not Visible on Canvas
**Problem**: Elements were being created but not visible. Selection handles showed 8x larger than elements. Console showed correct HTML generation but elements didn't appear.

**Root Cause**: 
- Elements were using `background-image` CSS which doesn't work with R2
- Canvas container had `overflow: hidden` clipping the elements

**Fix**: 
1. Removed background-image logic for media elements
2. Removed `overflow: hidden` from canvas container
3. Updated media presets to remove background properties
4. Ensured media elements use `<img>` tags only

### 3. Library Double-Click to Add
**Problem**: Clicking library items only selected them, didn't add to canvas.

**Fix**: Added double-click handler to Library component
```javascript
onDoubleClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  if (onAddToCanvas) {
    onAddToCanvas(item);
  }
}}
```

### 4. Library onAddToCanvas Integration
**Problem**: Library component wasn't receiving the onAddToCanvas handler through JTR.

**Fix**: Added special handling in JSONtoREACT for Library component
```javascript
...(element['data-component'] === 'library' ? {
  onAddToCanvas: (item: any) => {
    const mediaElement = {
      id: `element-${Date.now()}`,
      type: 'one',
      name: item.name,
      content: { text: '', src: item.url },
      style: { position: 'absolute', left: '100px', top: '100px' },
      presetType: 'media',
      appliedPresets: ['media']
    };
    
    window.dispatchEvent(new CustomEvent('import-content', {
      detail: { type: 'elements', data: [mediaElement] }
    }));
  }
} : {})
```

## Key Changes Made

### DirectRenderer.tsx
- Fixed selectedElement prop for SelectionActionButton
- Removed background-image CSS generation for media elements
- Removed overflow: hidden from canvas container
- Added debugging logs for element HTML generation

### Library.tsx
- Added double-click handler to library items
- Added title attribute for user guidance

### JSONtoREACT.tsx  
- Added special case handling for Library component
- Injected onAddToCanvas prop with element creation logic

### one-theme.json
- Removed background-size, background-position, background-repeat from media presets
- Kept only essential properties for img-based display

## Technical Decisions

1. **Image Display Method**: Confirmed using `<img>` tags instead of CSS background-image for R2 compatibility
2. **Canvas Container**: Removed overflow constraints to prevent element clipping
3. **Library Integration**: Used event system (import-content) for loose coupling between Library and DirectRenderer

## Current State

- ✅ Elements are now visible on canvas
- ✅ Upload buttons appear in popup when media preset is applied
- ✅ Library items can be double-clicked to add to canvas
- ✅ Drag and drop from library still works
- ✅ All three element types (wrapper, text, media) render correctly

## Documentation Created

Created comprehensive LIBRARY-GUIDE.md covering:
- Architecture flow from R2 to Canvas
- Component integration details
- Event system documentation
- Troubleshooting guide
- File references with line numbers

---

## Agent Handoff

### Next Task: Layer Tree Implementation

The Layer Tree component needs to be integrated into the JTR system. Currently it exists as a React component but needs to be properly connected.

### Current Setup
- LayerTree component exists at `/src/components/LayerTree.tsx`
- It's referenced in ui-theme.json but not fully integrated
- App.tsx has LayerTree handlers but they're not connected to DirectRenderer

### Required Work
1. **Review LayerTree Component**
   - Understand current implementation
   - Identify what props it needs
   - Check what events it dispatches

2. **JTR Integration**
   - Add LayerTree to dataComponents map in App.tsx
   - Pass required props through JTR
   - Handle LayerTree events in DirectRenderer

3. **Two-way Sync**
   - LayerTree should reflect canvas elements
   - Selection in LayerTree should select on canvas
   - Reordering in LayerTree should reorder on canvas
   - Visibility/lock toggles should affect canvas

4. **State Management**
   - Elements array is source of truth in DirectRenderer
   - LayerTree needs to receive this via props
   - Changes in LayerTree should dispatch events to DirectRenderer

### Key Files
- `/src/components/LayerTree.tsx` - Component to integrate
- `/src/components/DirectRenderer.tsx` - Where elements live
- `/src/App.tsx` - Has some LayerTree handlers already
- `/public/data/themes/ui-theme.json` - LayerTree placement

### Notes
- The previous implementation had visibility and lock functionality
- Hidden elements are tracked in DirectRenderer's `hiddenElements` Set
- Locked elements are tracked in DirectRenderer's `lockedElements` Set
- Element reordering affects z-index in the elements array