# Studio One Roadmap - Simple & Clear

## 🎯 Current Status
- ✅ Component Registry System - DONE
- ✅ Layout Switcher - DONE  
- ✅ CSS Grid Layout - WORKING
- ✅ Canvas Rendering - WORKING
- ✅ Editors Panel - WORKING
- ⚠️ LayerTree Styling - NEEDS FIXING
- ❌ Save to Library - NOT WORKING
- ❌ Text Editing - UNTESTED

---

## 📋 Next Steps (In Order)

### 1. Fix LayerTree Styling
- Make items single row (no wrapping)
- Icons on right, name on left
- Match sidebar colors

### 2. Test Data Component System
- Verify all components work with registry
- Test preset targeting
- Ensure props flow correctly
- Check ID-based connections (not data-label)

### 3. Create Data Component Guide
- Document how registry works
- Show component registration examples
- Explain preset targeting
- Include troubleshooting

### 4. Fix Save to Library
**For Text:**
- Debug r2Manager integration
- Test saving edited text
- Preserve content type

**For Images:**
- Verify image saving works
- Test with different formats
- Ensure metadata preserved

### 5. Complete Text Editing
- Test double-click to edit
- Verify markdown editing
- Plain text editing
- Content updates properly

### 6. Clean Up Docs Folder
**Keep:**
- LAYOUT-SWITCHER-GUIDE.md
- DATA-COMPONENT-GUIDE.md (to be created)
- STUDIO-ONE-ROADMAP.md (this file)

**Archive/Delete:**
- All session logs
- Old roadmaps
- Redundant guides

---

## 🚀 Future Phases

### Phase 1: Content Features (Current)
- ✅ Upload text to library
- ⚠️ Edit text on canvas
- ❌ Save edits back to library

### Phase 2: JSON Content (Next)
- Parse structured JSON
- Smart element creation
- Schema validation

### Phase 3: Document Editor (Later)
- In-library editing
- Multiple editor types
- Live preview

---

## 🔧 Technical Details

### Data Component System
```javascript
// Register component
componentRegistry.register('component-name', {
  mapProps: (element, appState) => ({
    // Map props from element and appState
  }),
  supportedTargets: ['container', 'button'],
  defaultProps: {}
});

// Use in theme
{
  "type": "ui",
  "data-component": "component-name",
  "props": { /* custom props */ }
}
```

### Save to Library Fix
```javascript
// Current issue: r2Manager not saving text
// Need to debug:
1. Check content type handling
2. Verify r2 upload for text/plain
3. Test metadata preservation
```

### Text Editing Implementation
```javascript
// Already implemented, needs testing:
- Double-click handler
- Edit mode overlay
- Textarea with markdown
- Save on blur/escape
```

---

## ✅ Definition of Done

**Data Component System:**
- All components use registry
- No hardcoded handlers in JTR
- Props flow correctly
- Guide documented

**Content Features:**
- Upload any text file
- Edit text on canvas
- Save changes to library
- Works for images too

**Documentation:**
- Clean, focused guides
- No duplicate information
- Easy for next agent