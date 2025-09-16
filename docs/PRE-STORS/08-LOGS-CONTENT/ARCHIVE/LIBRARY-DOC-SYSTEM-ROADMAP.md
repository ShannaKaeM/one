# Library & Documentation System Roadmap + Session Log

## 🎯 Project Vision
Create a unified library system where everything (images, text, components, full projects) is a library item that can be organized, saved, and reused. Use this system to organize project documentation visually using the builder itself.

## 🏗️ Architecture Overview

### Core Principles
1. **Everything is a Library Item** - Single image, text doc, or full project
2. **One Element Philosophy** - Everything built from base element + presets
3. **Three Preset Types** - Elements, Components, Layouts, Looks
4. **Separate Concerns** - Wrapper, Text, Media are distinct
5. **Visual Organization** - Use the builder to organize docs

### Current Architecture
- **R2 Storage**: Content-addressed system (SHA-256) for deduplication
- **Library Items**: JSON structures stored in R2 with metadata
- **Elements**: Have `type: 'one'` (or 'ui'), styled with presets + inline styles
- **Assets**: Images/text uploaded directly to library, referenced by URL

## 📅 Session Log: January 9, 2025

### ✅ Completed This Session

#### 1. Element Popup Improvements
- Removed Text/Media preset options from wrapper elements
- Separated concerns: wrapper (structure), text (content), media (images)
- Each type now shows only relevant actions

#### 2. Theme Alignment
- Updated oneElement in one-theme.json with grid template properties
- Verified auto grid and auto ID systems work for both themes
- Both themes now use consistent base element structure

#### 3. Save to Library System
- Created comprehensive save modal UI
- Added library selection with "Create new library" option
- Removed collections from save flow (saved for later feature)
- All element types now save complete structure with styling

#### 4. Library Structure & Styling Preservation
- Fixed element save to preserve full JSON structure
- Wrapper/Text/Media elements save as type: 'element' with complete data
- Drop handler restores full element structure including custom styles
- Library displays correct icons based on element presets

#### 5. Asset Upload Routing
- Image uploads automatically save to library as 'media' assets
- Text uploads automatically save to library as 'content' assets
- Both default to "All Items" library
- Library auto-refreshes when new items are saved
- Clean separation: Assets = raw files, Components = styled elements

#### 6. Library vs Collections Fix
- Removed collections from UI completely
- Simplified filtering to use only libraries
- Changed from AND logic to simple library filtering
- Added debugging logs for troubleshooting

### 🐛 Known Issues

1. **Custom Libraries Not Showing**: When saving with custom library (e.g., "miFamily"), the library doesn't appear in filters. Likely issues:
   - R2 save might not be completing
   - Library refresh timing issue
   - Libraries array not properly saved

2. **Text Editing**: Double-click to edit text is not working

3. **Preset System**: Currently saving inline styles instead of creating reusable presets

## 🚀 Agent Handoff - Next Steps

### Priority 1: Fix Library Save Issue
```javascript
// The save code looks correct in DirectRenderer.tsx:
libraries: selectedLibraries.length > 0 ? selectedLibraries : ['All Items']
if (newLibrary && newLibrary.trim()) {
  libraries.push(newLibrary.trim());
}

// Need to verify:
1. Check r2Manager.saveToLibrary() is actually saving the libraries array
2. Verify the R2 worker is storing/returning libraries correctly
3. Check if Library component is properly discovering libraries from items
4. Add more logging to track where libraries are lost
```

### Priority 2: Fix Text Editing
- Double-click handler exists but not working
- Check if event is being captured correctly
- Verify contentEditable implementation

### Priority 3: Implement Preset Extraction
Instead of saving inline styles, create a system to:
1. Extract custom styles from elements
2. Create named presets dynamically
3. Save preset reference + overrides
4. Build preset management UI

### Priority 4: Create Page/Section System
Following the roadmap Phase 3:
1. Create page and section presets
2. Implement hierarchy rules (one page, sections in page, elements in sections)
3. Use visual layers for z-index management
4. No DOM nesting - all absolute positioning

### Priority 5: Documentation Import
1. Build batch markdown import
2. Parse headers into sections
3. Create visual doc organization templates
4. Test with actual project docs

## 📋 Technical Context for Next Agent

### File Structure
- `/src/components/DirectRenderer.tsx` - Main canvas, handles drops, saves
- `/src/components/Library.tsx` - Library UI, filtering, display
- `/src/utils/r2Manager.ts` - R2 storage interface
- `/src/workers/asset-worker.js` - Cloudflare Worker for R2
- `/public/data/themes/` - Theme definitions (one-theme.json, ui-theme.json)

### Key Functions
- `handleSaveToLibrary()` - Prepares element for library save
- `r2Manager.saveToLibrary()` - Saves to R2
- `loadLibraryItems()` - Loads items from R2
- Element drops handled in DirectRenderer onDrop

### Data Flow
1. User styles element → Save to Library
2. DirectRenderer prepares library item with full structure
3. Save modal lets user name and choose libraries
4. r2Manager saves to R2 with libraries array
5. Library component should discover new libraries from items

### Debug Starting Points
1. Check browser console for save logs
2. Verify network tab shows R2 save request
3. Check what data is actually sent to R2
4. Verify Library component refresh after save
5. Track where libraries array might be lost

## 🎯 Success Criteria
- Custom libraries appear in filter buttons
- Saved elements retain all styling when dropped
- Assets and components cleanly separated
- Text editing works with double-click
- Eventually: Dynamic preset creation

The foundation is solid - just need to debug the library save issue and continue building on top!