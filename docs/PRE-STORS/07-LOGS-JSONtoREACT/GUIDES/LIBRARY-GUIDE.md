# Library System Guide

## Overview
The Library is a media management system that stores images in R2 cloud storage and integrates with the canvas through drag-and-drop or double-click actions.

## Architecture Flow
```
R2 Storage → Library Component → JTR Wrapper → Canvas (DirectRenderer)
```

## 1. Storage Layer (R2)

### What It Is
- Cloud storage service (Cloudflare R2)
- Stores actual image files
- Returns URLs like: `https://studio-one-assets.studio-one.workers.dev/asset/[hash]`

### Key Files
- `/src/utils/r2Manager.ts` - Handles all R2 operations

### Key Operations
```javascript
// Upload image
r2Manager.uploadAsset(file) → returns { url, hash }

// List library items  
r2Manager.listLibrary() → returns { items: [...] }

// Save metadata
r2Manager.saveToLibrary(item) → saves item data to R2
```

## 2. Library Component

### Location
`/src/components/Library.tsx`

### What It Does
1. Displays images from R2 in a grid
2. Manages collections and virtual libraries
3. Handles drag-and-drop to canvas
4. Handles double-click to add to canvas

### Key Props
```typescript
interface LibraryProps {
  onAddToCanvas?: (item: LibraryItem) => void;
  collapsed?: boolean;
}
```

### Item Structure
```typescript
interface LibraryItem {
  id: string;
  name: string;
  url: string;  // R2 URL
  collections: string[];  // Categories
  libraries: string[];    // Virtual folders
  createdAt: number;
}
```

## 3. JTR Integration

### How Library Gets Into UI
1. **Theme Definition** (`/public/data/themes/ui-theme.json`):
```json
"library": {
  "type": "one",
  "data-label": "library",
  "layouts": "library-panel full-height",
  "looks": "neutral-dark",
  "data-component": "library",
  "data-preset-targets": "library-container"
}
```

2. **Component Registration** (`/src/App.tsx`):
```javascript
const dataComponentsMap = {
  'direct-renderer': DirectRenderer,
  'library': Library
};
```

3. **Props Injection** (`/src/components/JSONtoREACT.tsx`):
```javascript
// Special handling for Library component
...(element['data-component'] === 'library' ? {
  onAddToCanvas: (item: any) => {
    // Create ONE element with media preset
    const mediaElement = {
      id: `element-${Date.now()}`,
      type: 'one',
      name: item.name,
      content: { text: '', src: item.url },
      style: { position: 'absolute', left: '100px', top: '100px' },
      presetType: 'media',
      appliedPresets: ['media']
    };
    
    // Send to DirectRenderer
    window.dispatchEvent(new CustomEvent('import-content', {
      detail: { type: 'elements', data: [mediaElement] }
    }));
  }
} : {})
```

## 4. Canvas Integration (DirectRenderer)

### Drag & Drop Handler
Location: `/src/components/DirectRenderer.tsx` (line ~1483)

```javascript
onDrop={(e) => {
  const libraryItemData = e.dataTransfer.getData('libraryItem');
  if (libraryItemData) {
    const item = JSON.parse(libraryItemData);
    // Creates element at drop position
  }
}}
```

### Import Content Handler  
Location: `/src/components/DirectRenderer.tsx` (line ~1282)

```javascript
window.addEventListener('import-content', (event) => {
  const importData = event.detail;
  // Adds elements to canvas
  setElements(prev => [...prev, ...newElements]);
});
```

## 5. Element Creation Flow

### From Library to Canvas
1. **User Action**: Double-click or drag image from Library
2. **Library Component**: Calls `onAddToCanvas(item)`
3. **JTR Handler**: Creates media element structure
4. **Event Dispatch**: `import-content` event with element data
5. **DirectRenderer**: Catches event, adds to elements array
6. **HTML Generation**: Creates `<img>` tag inside element

### Created Element Structure
```javascript
{
  id: "element-[timestamp]",
  type: "one",
  name: "image-name.jpg",
  content: {
    text: "",
    src: "https://studio-one-assets.../asset/[hash]"
  },
  style: {
    position: "absolute",
    left: "100px",
    top: "100px",
    zIndex: 1000
  },
  presetType: "media",
  appliedPresets: ["media"]
}
```

## 6. Media Preset Application

### Theme Definition
Location: `/public/data/themes/one-theme.json`

```json
"media": {
  "--display": "block",
  "--width": "300px",
  "--height": "200px",
  "--overflow": "hidden",
  "--position": "relative",
  "--border-radius": "8px",
  "--background-color": "transparent",
  "--cursor": "pointer"
}
```

### HTML Output
```html
<div id="element-123" class="one media" style="...">
  <img src="[R2-URL]" style="width: 100%; height: 100%; object-fit: cover;" />
</div>
```

## 7. Upload Flow

### From Desktop
1. **Trigger**: ElementPopup → "Upload from Desktop"
2. **Handler**: `upload-image-for-element` event
3. **File Input**: Created programmatically
4. **Upload**: `r2Manager.uploadAsset(file)`
5. **Update Element**: Sets `content.src` to uploaded URL
6. **Save to Library**: Automatically saved for reuse

### From Library Modal
1. **Trigger**: ElementPopup → "Select from Library"  
2. **Modal**: Shows library items in grid
3. **Selection**: Click image
4. **Update**: Sets element's `content.src`

## 8. Event System

### Key Events
```javascript
// From Library to Canvas
'import-content' → Adds elements to canvas

// Upload triggers
'upload-image-for-element' → Desktop upload
'select-image-for-element' → Library modal

// Element updates
'element-property-changed' → Updates element properties
```

## 9. Troubleshooting

### Image Not Showing
1. Check console for URL logs
2. Verify R2 URL is absolute (starts with https://)
3. Check element has `media` preset applied
4. Ensure `<img>` tag is generated in HTML

### Library Not Loading
1. Check R2 worker URL in r2Manager
2. Verify CORS settings on R2 bucket
3. Check network tab for failed requests

### Drag/Drop Not Working
1. Verify `draggable` attribute on library items
2. Check drop zone has preventDefault()
3. Confirm dataTransfer format matches

## 10. Preset Content Integration

### Future Possibilities with Preset Content
The new preset content feature in JTR enables:

#### Default Placeholder Content
```json
"media": {
  "--width": "300px",
  "content": {
    "src": "@var:placeholderImage",
    "text": "Drop image here"
  }
}
```

#### Collection-Based Presets
```json
"hero-image": {
  "--aspect-ratio": "16/9",
  "content": {
    "src": "@preset:library-collections.heroes.defaultImage"
  }
}
```

#### Smart References
- Pull default images from theme
- Reference placeholder content
- Connect to collection defaults

## 11. File Reference

### Core Files
- `/src/components/Library.tsx` - Library UI component
- `/src/utils/r2Manager.ts` - R2 storage interface
- `/src/components/DirectRenderer.tsx` - Canvas & drop handling
- `/src/components/JSONtoREACT.tsx` - Library props injection & @ references
- `/public/data/themes/ui-theme.json` - Library placement in UI
- `/public/data/themes/one-theme.json` - Media element presets

### Data Flow
1. R2 Storage → URL
2. Library Component → Display grid
3. User Interaction → Event dispatch
4. DirectRenderer → Element creation
5. Preset content → Default values
6. HTML Generation → `<img>` display