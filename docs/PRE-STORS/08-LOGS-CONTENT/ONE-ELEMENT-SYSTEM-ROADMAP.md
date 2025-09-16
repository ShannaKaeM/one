# ONE Element System Roadmap

## 🎯 Current Implementation Status (January 9, 2025)

### ✅ What We Accomplished Today
1. **Simplified to ONE element type**
   - Removed separate wrapper/text/media presets from theme
   - Canvas Controls now has single "ONE" button
   - Elements start with `content: 'none'` (empty state)

2. **Content-based transformation**
   - Elements transform based on dropped content
   - `contentType` property determines behavior (not presets)
   - Drop text → becomes text element
   - Drop image → becomes media element

3. **Theme cleanup**
   - Removed complex preset structures
   - Theme now just has CSS variables + empty preset categories
   - Fixed JSON syntax error in ui-theme.json

4. **Element Popup updated**
   - Shows "Add Text Content" / "Add Image Content" for empty elements
   - Shows appropriate options based on contentType

### 🐛 Current Issues

1. **Canvas duplication bug**
   - Clicking "ONE" button seems to create duplicate canvas area
   - Need to check if DirectRenderer is being instantiated multiple times

2. **Element creation not working**
   - ONE button click events are set up
   - Debug logs added but elements not appearing
   - DirectRenderer stuck in loading state initially (now fixed)

3. **Library integration incomplete**
   - "Add Image Content" from popup not yet connected
   - Library modal needs to be wired to element hydration

### 📋 Next Steps

1. **Fix ONE element creation**
   - Debug why elements aren't being added to canvas
   - Check if `setElements` is working with lifted state architecture
   - Verify event flow: CanvasControls → DirectRenderer → App

2. **Fix canvas duplication**
   - Investigate why clicking ONE creates another canvas area
   - Check component mounting/unmounting

3. **Complete content hydration**
   - Wire up library selection for adding content
   - Implement drop-on-element hydration
   - Test content type switching

4. **Element rendering**
   - Ensure empty ONE elements are visible (theme styling)
   - Fix content rendering based on contentType
   - Remove any remaining preset dependencies

### 🏗️ Architecture Summary

```
Current Flow:
1. Click "ONE" → Creates element with content: 'none'
2. Drop/select content → Element transforms:
   - Sets contentType: 'text' or 'media'
   - Updates content: { text: "..." } or { src: "..." }
   - Removes placeholder styling

State Management:
- Elements stored in App.tsx (canvasElements)
- DirectRenderer receives elements + onElementsChange props
- ID generation centralized through autoIdHelper
```

### 🔧 Code Locations

- **ONE button**: `/src/components/CanvasControls.tsx` (line 146)
- **Element creation**: `/src/components/DirectRenderer.tsx` (lines 540-570)
- **Content hydration**: `/src/components/DirectRenderer.tsx` (lines 2009-2051)
- **Element rendering**: `/src/components/DirectRenderer.tsx` (lines 2857-2901)
- **Theme**: `/public/data/themes/one-theme.json`

### 💡 Key Decisions Made

1. **No more presets** - Content type drives everything
2. **Single element type** - ONE element adapts to content
3. **Explicit empty state** - `content: 'none'` for unfilled elements
4. **Theme controls styling** - All visual aspects in theme variables

### 🎯 Success Criteria

- [ ] ONE button creates visible empty elements
- [ ] Elements accept content via drag/drop or library selection
- [ ] Content type automatically determines element behavior
- [ ] No hardcoded styles or presets in code
- [ ] Clean, simple architecture focused on content