# 🚀 LIBRARY SYSTEM ROADMAP - CURRENT STATE & NEXT STEPS

**Created:** 2025-08-23  
**Last Updated:** 2025-08-23 (Session 05)  
**Purpose:** Document what's implemented, how it works, and what's next  
**Status:** Active Development - Major Architecture Insight!



**Benefits:**
- ONE element can have background image + text + borders all as CSS properties
- Works like a button with image background
- Simpler to style with presets
- More intuitive for users
- Follows standard web patterns

This is a FUNDAMENTAL shift in how elements should work!

---

## 📦 CURRENTLY IMPLEMENTED COMPONENTS

### 1. **UnifiedLibrary** (`src/components/UnifiedLibrary.tsx`)
- **Purpose:** Main library UI at bottom of canvas
- **Features:**
  - 5 tabs: Elements, Components, Documents, Media, Websites
  - Resizable: minimized (60px) → small → medium → large → fullscreen
  - Search and filter by categories
  - Drag items to canvas
  - Import files button
- **Storage:** Currently uses localStorage
- **Events:** Listens for `library-updated`, dispatches `import-content`

### 2. **LibraryManager** (`src/components/LibraryManager.tsx`)
- **Purpose:** Import/export controls in left sidebar footer
- **Features:**
  - File converter integration (10+ formats)
  - Import to canvas OR library selection
  - Export current canvas
  - Save all/individual elements
  - Flat Categories system (10 predefined, no misc)
- **Storage:** Uses localStorage + r2Manager ready
- **Events:** Listens for `save-element-to-library`

### 3. **File Converter** (`src/utils/fileConverter.ts`)
- **Purpose:** Convert any file to ONE element format
- **Supported Formats:**
  - HTML → preserves styles and structure
  - CSS → converts to style presets
  - Markdown → structured content with metadata
  - CSV → data tables
  - SVG → vector graphics
  - XML → hierarchical data
  - JSON → validation and pass-through
  - TXT → line-by-line conversion
- **Output:** ONE element JSON format

### 4. **R2 Manager** (`src/utils/r2Manager.ts`)
- **Purpose:** Client-side interface for Cloudflare R2
- **Methods:**
  - `uploadAsset()` - Upload files with SHA-256 hashing
  - `saveToLibrary()` - Save components to cloud
  - `listLibrary()` - Search and filter
  - `getAssetUrl()` - Get CDN URLs
  - `smartUpload()` - Currently does hybrid (base64 for <10KB non-media)
  - `calculateHash()` - Client-side SHA-256
- **Worker URL:** https://studio-one-assets.studio-one.workers.dev

### 5. **Element Selection System**
- **SelectionActionButton** - 3-dot floating button on selected elements
- **ElementPopup** - Context menu with actions:
  - Save to Library
  - Group/Ungroup
  - Duplicate
  - Delete
  - Add Text/Image layers (for ONE elements)

---

## 🌐 R2 INFRASTRUCTURE

### Deployed Resources:
1. **Cloudflare Worker** (`src/workers/asset-worker.js`)
   - Deployed at: https://studio-one-assets.studio-one.workers.dev
   - Handles uploads, library operations, asset serving
   - Implements SHA-256 content addressing
   - Supports image transformations

2. **R2 Buckets:**
   - `studio-one-assets` - Binary files (images, videos, etc.)
   - `studio-one-library` - Library items and metadata

3. **Configuration:**
   - `wrangler.toml` - Cloudflare Workers config
   - `.env.local` - Contains VITE_WORKER_URL

---

## 🧪 TEST FILES (Can be deleted when ready)

### Test Import Files:
- `test-files/sample.html` - Tests HTML import
- `test-files/sample.md` - Tests Markdown import  
- `test-files/sample.csv` - Tests CSV import
**Status:** Keep until R2 integration is fully tested

### Sample Files:
- `guardian-docs-sample.json` - Guardian docs format example
**Status:** Can delete if Guardian docs format is documented elsewhere

---

## 🔄 COMPONENT INTERACTIONS

```
User Action Flow:
1. Select Element → SelectionActionButton appears
2. Click button → ElementPopup shows
3. Click "Save to Library" → Event: save-element-to-library
4. LibraryManager catches event → Shows save modal
5. User categorizes → Saves to localStorage (TODO: R2)
6. Dispatches library-updated → UnifiedLibrary refreshes

Import Flow:
1. UnifiedLibrary "Import" → File selection
2. File → fileConverter.convertFile()
3. Converted → Add to library or canvas
4. If media → r2Manager.smartUpload() (TODO: Connect)
```

---

## ✅ COMPLETED IN SESSION 04-05

### Session 04:
1. **Connected UnifiedLibrary to R2** ✅
   - Loads from R2 with localStorage fallback
   - Saves to R2 with localStorage backup
   - Handles errors gracefully

2. **Updated all saves to use R2** ✅
   - LibraryManager already using R2
   - UnifiedLibrary now saves to R2
   - Media uploads go directly to R2

3. **Changed smartUpload to use R2 for everything** ✅
   - Removed base64 hybrid approach
   - ALL files now go to R2
   - Consistent content-addressed storage

### Session 05:
1. **Fixed Media Display** ✅
   - Media now uses CSS backgroundImage instead of layers
   - Simplified element structure for media
   - Works with drag and drop

2. **UI Consolidation Complete** ✅
   - Removed LibraryManager from left sidebar
   - All controls now in UnifiedLibrary
   - Removed old upload button from canvas

3. **Discovered ONE Element Architecture** ✅
   - Identified that layers system is overly complex
   - Documented better approach using CSS properties
   - Created clear path forward for simplification

## 🎯 IMMEDIATE NEXT STEPS

### 1. **REVIEW ONE ELEMENT STRUCTURE** 
We need to review how the current wrapper element is being used and where the styling for the text and image is coming from: Are they coming from the inidividual text and image elements in one?  can we shift those to the true ONE element and rename it to ONE instead of wrapper toggle on off text or image options etc. if selected using our theme processor. 



---

## 📝 NOTES
- R2 infrastructure is deployed and working
- File converter is complete and tested
- UI components are connected via events
- Just need to connect the storage layer from localStorage to R2
- All media should go to R2 for consistency (no base64)