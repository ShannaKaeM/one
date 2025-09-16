# Studio1 System Overview - Current Implementation Status
**Date:** 2025-08-27
**Type:** Technical System Checkpoint

## Technology Stack
- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.2
- **TypeScript:** 5.9.2
- **Deployment:** Cloudflare Workers (Wrangler 4.32.0)
- **Server:** Express 5.1.0
- **Storage:** R2 Cloud Storage

## Core Architecture

### 1. Theme System
- **Dual Theme Architecture:**
  - `ui-theme.json`: Dashboard interface (sidebar, controls, layout)
  - `one-theme.json`: Canvas content elements
- **Runtime Theme Processor:** (`runtimeThemeProcessor.ts`)
  - Loads JSON themes dynamically
  - Generates CSS from JSON variables
  - Injects styles at runtime
  - No CSS variable conversion - direct style application

### 2. Component Structure

#### Primary Components:
- **App.tsx:** Central state management, event orchestration, layout control
- **UIGenerator.tsx:** JSON-to-React component generation for UI theme
- **DirectRenderer.tsx:** Canvas rendering, element management, drag/drop
- **LayerTree.tsx:** Hierarchical element display (left sidebar)
- **EditorControls.tsx:** Property editing interface (deprecated - using floating panels)
- **EditorHotkeyManager.tsx:** Hotkey-driven floating editor panels

#### Visual Builder Components:
- **SelectionHandles.tsx:** 8-direction resize, drag handles (pink accents)
- **GridOverlay.tsx:** 20px visual grid, 100px snap functionality
- **SelectionActionButton.tsx:** Context actions for selected elements

#### Floating Editor System:
- **FloatingPanelSimple.tsx:** Mouse-following panels
- **DimensionsControl.tsx:** Size/position control module
- **Hotkey Map:** S (sizing), T (typography), C (colors), etc.

### 3. Element System
- **Universal 'one' Element Type**
- **Preset System:** Toggleable styles (wrapper, text, media)
- **Layer-based Content:** Elements can contain multiple styled layers
- **Group System:** Parent-child relationships for complex components

### 4. State Management
- **Central App State:** Grid visibility, sidebars, selection, layout
- **Event-Driven Architecture:** CustomEvents for all interactions
- **Selection States:** Single, multi-selection, group selection
- **Dynamic Layout Switching:** JSON-defined dashboard layouts

### 5. Storage & Library
- **R2 Integration:** Content-addressed storage with SHA-256 hashes
- **Library System:** Elements, Components, Documents, Media tabs
- **Import/Export:** Drag from library to canvas
- **Preset Manager:** Apply/toggle/merge element presets

## CSS Architecture Concerns

### Global CSS Analysis
The `global.css` file contains:

1. **Base Reset** (Lines 4-8): Standard CSS reset - REQUIRED
2. **System Font Stack** (Lines 10-14): Default typography - REQUIRED
3. **Root Container** (Lines 16-20): Full viewport setup - REQUIRED
4. **Loading States** (Lines 23-35): Generic loading UI - MINIMAL/SAFE

5. **POTENTIAL CONFLICTS:**
   - `.canvas-container` (Lines 43-47): Uses CSS variables but has defaults
   - `.canvas-area` (Lines 49-58): Contains performance optimizations (contain, transform)
   - `.layer-image` (Lines 60-71): Absolute positioning for image layers
   - `.layer-text` (Lines 73-78): Grid-based text layer positioning

### DirectRenderer CSS Usage
- Uses `canvas-container` class on wrapper div
- Uses `canvas-area` class in generated HTML
- Does NOT use `layer-text` or `layer-image` classes in current implementation
- Generates inline styles for all elements

### Potential Issues
1. **CSS Specificity:** Global CSS classes may override JSON-generated styles
2. **Hardcoded Defaults:** Some properties have fallback values that might conflict
3. **Layer Classes:** Defined but unused - may be legacy code
4. **Performance Properties:** `contain: layout style` and `transform: translateZ(0)` force GPU layers

## Event System
- **UI Actions:** Toggle, show, navigate, custom, updateProperty
- **Element Events:** Selected, moved, resized, property-changed
- **Canvas Events:** Add-one-element, group-elements, canvas-elements-updated
- **Library Events:** Import-content, library-item-dropped

## Layout System
- **Universal Grid Areas:** a-z instead of semantic names
- **Dynamic Layouts:** 
  - dashboard-full (5 components)
  - canvas-focus (3 components)
  - library-canvas (2 components)
  - minimal (1 component)
- **Auto-hiding Components:** Based on grid area availability

## Current Inconsistencies

1. **CSS Class Usage:**
   - `canvas-container` used twice on same element (line 1197 & 1205)
   - `layer-text` and `layer-image` defined but not used

2. **Theme Processing:**
   - Some hardcoded styles in DirectRenderer
   - Mix of inline styles and class-based styling

3. **Selection System:**
   - Multiple selection mechanisms (handles, borders, outlines)
   - Pink color hardcoded in SelectionHandles

4. **Editor Integration:**
   - EditorControls component exists but deprecated
   - Floating panels not fully integrated with all properties

## File Structure
```
src/
├── components/
│   ├── editor/
│   │   ├── EditorHotkeyManager.tsx
│   │   ├── FloatingPanelSimple.tsx
│   │   └── controls/
│   │       └── DimensionsControl.tsx
│   ├── DirectRenderer.tsx (1700+ lines)
│   ├── UIGenerator.tsx
│   ├── LayerTree.tsx
│   └── [other components]
├── theme/
│   └── runtimeThemeProcessor.ts
├── utils/
│   ├── presetManager.ts
│   ├── r2Manager.ts
│   └── storageManager.ts
└── styles/
    └── global.css (78 lines)
```

## Recommendations

1. **Remove Unused CSS:** Delete `.layer-text` and `.layer-image` if not needed
2. **Consolidate Canvas Classes:** Use single `canvas-container` class
3. **Document CSS Strategy:** Clear separation between base styles and theme styles
4. **Standardize Colors:** Move pink selection color to theme JSON
5. **Complete Editor Migration:** Finish floating panel implementation for all properties