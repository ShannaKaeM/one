# Library Component Refactor Roadmap

## Overview
Refactor the existing Library component to match the Chakra styling and integrate with the data-preset-targets system, following the same pattern we used for LayerTree.

## Source Reference
- **Chakra Version**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/BACKUP/studio1-sept-1/src/components/Library.tsx`
- **Current Version**: `/src/components/Library.tsx`

## Phase 1: Update Library Base Styles (CRITICAL - DO THIS FIRST!)

### 1.1 Copy Styles from Chakra Version
Open the backup Chakra version and identify all styling patterns:
- Box → div with grid
- VStack → `display: grid; grid-template-rows: auto;`
- HStack → `display: grid; grid-template-columns: auto 1fr;`
- Flex → Convert ALL to CSS Grid
- spacing={2} → `gap: 0.5rem`

### 1.2 Component Structure
The Library component should have these main sections:
```
.library (root)
  .header
    .search-wrapper
      .search-icon
      .search-input
  .main
    .media-grid (for grid view)
      .media-item
        .media-preview
        .media-info
          .media-name
          .media-size
    .media-list (for list view)
      .list-item
        .list-icon
        .list-info
        .list-actions
```

### 1.3 Required CSS Classes
Create internal styles for these classes (NO FLEXBOX):
```css
.library {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  background-color: /* match Chakra */;
  color: /* match Chakra */;
}

.header {
  display: grid;
  padding: /* match Chakra */;
  border-bottom: /* match Chakra */;
}

.search-wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
}

.main {
  overflow-y: auto;
  overflow-x: hidden;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.media-item {
  display: grid;
  grid-template-rows: 1fr auto;
  cursor: pointer;
  /* hover states, transitions etc. */
}
```

## Phase 2: Implement Preset Class Mapping

### 2.1 Update Component Props
```typescript
interface LibraryProps {
  // ... existing props
  className?: string;
  presetClassMap?: Record<string, string>;
}
```

### 2.2 Add getClassName Helper
```typescript
const getClassName = (baseClass: string) => {
  const presetClass = presetClassMap[baseClass];
  return presetClass ? `${baseClass} ${presetClass}` : baseClass;
};
```

### 2.3 Apply to All Elements
Replace all className strings:
```jsx
// Before
<div className="header">

// After  
<div className={getClassName('header')}>
```

## Phase 3: Create library-components Preset Category

### 3.1 Add to ui-theme.json
Create new subcategory in presets:
```json
"library-components": {
  "library": {
    "width": "100%",
    "height": "100%",
    "background-color": "hsl(0, 0%, 15%)",
    "color": "hsl(0, 0%, 90%)",
    "display": "grid",
    "grid-template-rows": "auto 1fr"
  },
  "header": {
    "display": "grid",
    "padding": "0.75rem",
    "border-bottom": "1px solid hsl(0, 0%, 25%)"
  },
  "search-wrapper": {
    "display": "grid",
    "grid-template-columns": "auto 1fr",
    "align-items": "center",
    "gap": "0.5rem"
  },
  "search-icon": {
    "width": "1rem",
    "height": "1rem",
    "color": "hsl(0, 0%, 60%)"
  },
  "search-input": {
    "width": "100%",
    "background-color": "hsl(0, 0%, 20%)",
    "border": "1px solid hsl(0, 0%, 30%)",
    "border-radius": "4px",
    "padding": "0.5rem",
    "color": "white"
  },
  "media-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(auto-fill, minmax(120px, 1fr))",
    "gap": "1rem",
    "padding": "1rem"
  },
  "media-item": {
    "display": "grid",
    "grid-template-rows": "120px auto",
    "background-color": "hsl(0, 0%, 20%)",
    "border-radius": "4px",
    "overflow": "hidden",
    "cursor": "pointer",
    "transition": "all 0.2s"
  },
  "media-item-hover": {
    "background-color": "hsl(0, 0%, 25%)",
    "transform": "scale(1.02)"
  }
  // ... continue for all classes
}
```

## Phase 4: Update Library Configuration

### 4.1 Modify structure in ui-theme.json
```json
"library": {
  "type": "one",
  "data-label": "library",
  "layouts": "library-container",
  "data-component": "library",
  "data-preset-targets": [
    ":",
    "header:header",
    "search-wrapper:search-wrapper",
    "search-input:search-input",
    "media-grid:media-grid"
  ]
}
```

## Phase 5: Icon System Implementation

### 5.1 Identify Required Icons
From Chakra version, list all icons needed:
- Search icon (🔍)
- Grid view icon (⊞)
- List view icon (☰)
- Image type icon (🖼️)
- Video type icon (▶️)
- Audio type icon (🔊)
- Document type icon (📄)

### 5.2 Create Icon Components
Add as inline SVG components OR use text symbols:
```jsx
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

// OR use symbols
const getIcon = (type: string) => {
  switch(type) {
    case 'search': return '🔍';
    case 'grid': return '⊞';
    case 'list': return '☰';
    case 'image': return '🖼️';
    default: return '📄';
  }
};
```

## Phase 6: Feature Implementation

### 6.1 Search Functionality
- Implement search state
- Filter media items based on search
- Debounce search input

### 6.2 View Toggle
- Grid view vs List view
- Store preference in component state
- Different class names for each view

### 6.3 Media Type Detection
- Check file extensions
- Apply appropriate icons
- Different styling per type

### 6.4 Drag and Drop
- Make items draggable
- Set proper dataTransfer
- Visual feedback on drag

## Phase 7: Testing Checklist

- [ ] Component fills its grid area properly
- [ ] All styles converted to CSS Grid
- [ ] Preset overrides work correctly
- [ ] Search functionality works
- [ ] View toggle works
- [ ] Icons display correctly
- [ ] Hover states work
- [ ] Drag and drop to canvas works
- [ ] No flexbox remaining in styles
- [ ] Component is responsive

## Phase 8: Cleanup

1. Remove any unused imports
2. Remove any Chakra UI references
3. Ensure all class names use getClassName
4. Verify no inline styles except dynamic ones
5. Test with different preset overrides

## File Locations
- Component: `/src/components/Library.tsx`
- Theme: `/public/data/themes/ui-theme.json`
- Reference: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/BACKUP/studio1-sept-1/src/components/Library.tsx`

## Notes for Next Agent
- The Library component is already inserted into the dashboard
- It already has basic functionality but needs styling update
- Focus on matching the Chakra version's look exactly
- Use CSS Grid exclusively - NO flexbox allowed
- The preset system is already implemented in JTR
- Test by changing presets in ui-theme.json