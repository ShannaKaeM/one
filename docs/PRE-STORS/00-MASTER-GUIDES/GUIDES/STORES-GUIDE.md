# Stores Guide - State Management System

## Overview

Our application is moving to a simplified 3-actor model for state management. Think of it as three clear roles: the person doing the work (designer), where they work (workspace), and what they work with (assets).

---

## NEW: Simplified 3-Actor Architecture (Proposed)

```
┌─────────────────────────────────────────────────────┐
│                  Single Store                       │
│                                                     │
│  👤 designer     🏢 workspace      📦 assets      │
│  (The Person)    (Where You Work)  (What You Make) │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### The Key Insight
- **Designer** = WHO is doing things (actions & selections)
- **Workspace** = WHERE you work (UI state & tools)
- **Assets** = WHAT you work with (content & resources)

---

## The 3 Actors Explained

### 👤 **designer** - The Person Using the App

**Purpose**: Tracks what the designer is doing, selecting, and their preferences.

**What's Inside**:
```typescript
{
  // Current activity
  selected: ['elem-123', 'elem-456'],    // What they've selected
  activeTool: 'select',                  // Tool they're using
  isPlacing: false,                      // Are they placing something?
  placingAsset: null,                    // What they're about to place
  
  // Preferences
  preferences: {
    autoSave: true,
    theme: 'dark',
    showTips: true
  }
}
```

**Key Actions** (User-initiated):
- `select(elementId)` - Designer selects something
- `startPlacing(asset)` - Designer picks from library
- `useTool(toolName)` - Designer switches tools
- `exportSelection()` - Designer exports their work
- `save()` - Designer saves project

**When to Use**: Any action initiated by the user clicking, dragging, or choosing something.

---

### 🏢 **workspace** - Where You Work

**Purpose**: The current state of all UI panels, tools, and canvas settings.

**What's Inside**:
```typescript
{
  // Canvas state
  canvas: {
    layout: 'dashboard',          // Current layout
    gridVisible: true,           // Is grid showing?
    snapEnabled: false,          // Is snap active?
    zoom: 100,                   // Zoom level
    dimensions: { width: 1920, height: 1080 }
  },
  
  // All panels/tools state
  panels: {
    layerTree: { 
      visible: true, 
      collapsed: false 
    },
    library: { 
      visible: true,
      searchQuery: '',           // Current search
      filterBy: ['All Items']    // Active filters
    },
    editors: { 
      visible: true,
      expandedSections: ['colors', 'spacing']
    }
  },
  
  // Modal states
  modals: {
    save: false,
    export: false,
    settings: false
  }
}
```

**Key Actions** (Workspace configuration):
- `setLayout(layout)` - Change workspace layout
- `togglePanel(panelName)` - Show/hide panels
- `resizePanel(panel, size)` - Adjust panel sizes
- `setCanvasZoom(zoom)` - Zoom in/out

**When to Use**: Managing the UI state, panel visibility, canvas settings.

---

### 📦 **assets** - What You Work With

**Purpose**: All content - both what you're creating and what's available to use.

**What's Inside**:
```typescript
{
  // Current project content (on canvas)
  project: [
    {
      id: 'elem-1',
      type: 'text',
      content: { text: 'Welcome!' },
      style: { fontSize: '48px' }
    }
  ],
  
  // Reusable library items
  library: [
    {
      id: 'lib-1',
      name: 'Primary Button',
      type: 'component',
      categories: ['Buttons', 'UI Kit']
    }
  ],
  
  // Available resources
  themes: {
    ui: { /* theme config */ },
    one: { /* theme config */ }
  },
  
  presets: {
    buttons: { primary: {...}, secondary: {...} },
    layouts: { dashboard: {...}, minimal: {...} }
  },
  
  // Uploaded media
  uploads: [
    { id: 'img-1', url: '/uploads/logo.png' }
  ]
}
```

**Key Actions** (Content operations):
- `addElement(element)` - Add to project
- `updateElement(id, changes)` - Modify content
- `deleteElement(id)` - Remove from project
- `addToLibrary(element)` - Save as reusable
- `importAsset(file)` - Add new resource

**When to Use**: Any operation that creates, modifies, or manages content.

---

## How Actions Flow

### Example: Designer Clicks Grid Toggle
```typescript
// 1. Designer initiates action
designerActions.toggleGrid()

// 2. Updates workspace state
workspace.canvas.gridVisible = !workspace.canvas.gridVisible

// 3. Canvas re-renders with new state
```

### Example: Designer Drags from Library
```typescript
// 1. Designer selects library item
designerActions.selectLibraryItem('lib-123')

// 2. Gets asset from assets
const asset = assets.library.find(item => item.id === 'lib-123')

// 3. Designer starts placing
designerActions.startPlacing(asset)

// 4. Designer clicks canvas
designerActions.placeOnCanvas(x, y)

// 5. Asset added to project
assets.project.push({ ...asset, position: { x, y } })

// 6. Workspace updates to show new element
```

---

## Mapping Current to New Architecture

| Current Store | Current Data | → | New Location |
|--------------|--------------|---|--------------|
| **uiStore** | | | |
| | selectedElement | → | designer.selected |
| | isPlacingElement | → | designer.isPlacing |
| | gridVisible | → | workspace.canvas.gridVisible |
| | expandedSections | → | workspace.panels.editors.expandedSections |
| | layout | → | workspace.canvas.layout |
| **oneStore** | | | |
| | elements | → | assets.project |
| | selectedElementId | → | designer.selected |
| | hiddenElements | → | assets.project[].hidden |
| **libraryStore** | | | |
| | items | → | assets.library |
| | selectedItems | → | designer.selectedLibraryItems |
| | searchQuery | → | workspace.panels.library.searchQuery |
| **presetStore** | | | |
| | availablePresets | → | assets.presets |
| | activePresets | → | assets.project[].appliedPresets |
| | currentLayout | → | workspace.canvas.layout |
| **elementStore** | | | |
| | createElement() | → | assetActions.createElement() |
| | duplicateElement() | → | designerActions.duplicate() |
| **projectStore** | | | |
| | currentProject | → | assets.project (metadata) |
| | saveProject() | → | designerActions.save() |

---

## CURRENT ARCHITECTURE (To Be Refactored)

## Store Architecture

```
┌─────────────────────────────────────────────────────┐
│                    UI Theme                         │
│  ┌──────────┐  ┌──────────┐  ┌─────────────┐     │
│  │ uiStore  │  │presetStore│  │libraryStore │     │
│  └──────────┘  └──────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   ONE Theme                         │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐    │
│  │ oneStore │  │ elementStore │  │ appStore │    │
│  └──────────┘  └──────────────┘  └──────────┘    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    Shared                           │
│              ┌─────────────┐                       │
│              │projectStore │                       │
│              └─────────────┘                       │
└─────────────────────────────────────────────────────┘
```

---

## 1. 🎨 **uiStore** - UI Interface Control

### Purpose
Controls the application's user interface state - what's visible, what's expanded, which tools are active.

### What's Inside
```typescript
{
  // Layout & Theme
  layout: 'dashboard',              // Current layout
  activeTheme: 'ui',               // Active theme
  
  // Canvas Tools
  gridVisible: true,               // Show grid overlay
  snapEnabled: false,              // Snap to grid
  
  // UI Panels
  expandedSections: {              // Which accordions are open
    'colors': true,
    'spacing': false
  },
  
  // Component Management
  componentAssignments: {          // Grid area assignments
    'layertree': { id: 'layertree', gridArea: 'a' },
    'canvas': { id: 'canvas', gridArea: 'c' }
  },
  
  // Modals
  showLibraryModal: false,
  showSaveModal: false,
  
  // Element Placement
  isPlacingElement: false,         // Placement mode active
  placingPreset: 'button-primary'  // What's being placed
}
```

### Key Actions
- `setLayout(layout)` - Switch layouts
- `toggleGrid()` - Show/hide grid
- `toggleSnap()` - Toggle snap to grid
- `toggleSection(sectionId)` - Open/close accordion sections
- `setIsPlacingElement(placing, preset)` - Enter placement mode

### When to Use
- Controlling UI visibility
- Managing workspace settings
- Handling user preferences
- Layout switching

---

## 2. 🎯 **oneStore** - Canvas Element Storage

### Purpose
The main storage for all design elements on the canvas. This is your "document" - all the actual content users create.

### What's Inside
```typescript
{
  // All canvas elements
  elements: [
    {
      id: 'element-123',
      type: 'one',
      content: { text: 'Hello' },
      style: { left: '100px', top: '50px' },
      presets: ['rounded', 'shadow']
    }
  ],
  
  // Selection
  selectedElementId: 'element-123',      // Single selection
  selectedElementIds: ['element-123'],   // Multi-selection
  
  // Visibility & Locking
  hiddenElements: Set(['element-456']),  // Hidden element IDs
  lockedElements: Set(['element-789']),  // Locked element IDs
  
  // Grouping
  selectedGroupId: null,
  multiSelectionCount: 0
}
```

### Key Actions
- `addElement(element)` - Add to canvas
- `updateElement(id, updates)` - Modify element
- `deleteElement(id)` - Remove element
- `setSelectedElement(id)` - Select element
- `updateElementStyle(id, property, value)` - Change styles
- `groupElements(ids)` - Create group
- `toggleElementVisibility(id)` - Hide/show

### When to Use
- Managing canvas content
- Element selection
- Modifying elements
- Grouping operations

---

## 3. 📚 **libraryStore** - Component Library

### Purpose
Manages reusable components, templates, and assets that users can drag onto the canvas.

### What's Inside
```typescript
{
  // Library items
  items: [
    {
      id: 'lib-123',
      name: 'Primary Button',
      type: 'element',
      libraries: ['Buttons', 'UI Kit'],
      content: { /* element data */ }
    }
  ],
  
  // Organization
  availableLibraries: ['All Items', 'Buttons', 'Headers', 'UI Kit'],
  selectedLibraries: ['All Items'],     // Active filters
  
  // Selection
  selectedItems: Set(['lib-123']),      // Selected library items
  
  // State
  isLoading: false,
  error: null
}
```

### Key Actions
- `addItem(item)` - Add to library
- `updateItem(id, updates)` - Edit library item
- `deleteItems(ids)` - Remove items
- `addLibrary(name)` - Create new category
- `toggleLibraryFilter(library)` - Filter items
- `getFilteredItems()` - Get items by filter

### When to Use
- Managing reusable components
- Organizing design assets
- Filtering/searching items
- Bulk operations

---

## 4. 🎨 **presetStore** - Style Presets

### Purpose
Manages reusable styles (like "rounded corners", "drop shadow") and layout configurations.

### What's Inside
```typescript
{
  // Element presets
  activePresets: {
    'element-123': ['rounded', 'shadow', 'primary']
  },
  
  // Global presets (apply to all of type)
  globalPresets: {
    'button': ['interactive', 'rounded']
  },
  
  // Available from theme
  availablePresets: {
    looks: { rounded: {...}, shadow: {...} },
    layouts: { dashboard: {...}, split: {...} }
  },
  
  // Layout state
  availableLayouts: ['dashboard', 'split', 'minimal'],
  currentLayout: 'dashboard'
}
```

### Key Actions
- `applyPreset(elementId, preset)` - Apply style
- `togglePreset(elementId, preset)` - Toggle on/off
- `applyGlobalPreset(type, preset)` - Apply to all
- `switchLayout(layout)` - Change layout
- `getAvailableLayouts()` - List layouts

### When to Use
- Applying consistent styles
- Managing layouts
- Theme customization
- Style inheritance

---

## 5. 🏭 **elementStore** - Element Factory

### Purpose
Factory for creating and manipulating elements. Contains all the "tools" for working with elements.

### What's Inside
```typescript
{
  // Internal counters
  idCounter: 42,
  highestZIndex: 1050,
  
  // Grid management
  gridAreaMap: {
    'element-123': 'a',
    'element-456': 'b'
  }
}
```

### Key Actions
- `createElement(type)` - Create new element
- `duplicateElement(element)` - Clone element
- `groupElements(elements)` - Create group
- `ungroupElements(group)` - Break group
- `bringToFront(id)` - Z-index management
- `calculateZIndex()` - Get next z-index
- `setElementPosition(id, x, y)` - Position element

### When to Use
- Creating new elements
- Complex element operations
- Group management
- Z-index handling

---

## 6. 💾 **projectStore** - Save/Load System

### Purpose
Handles saving, loading, and managing design projects. Your "file manager".

### What's Inside
```typescript
{
  // Current project
  currentProject: {
    id: 'proj-123',
    name: 'My Design',
    elements: [...],
    settings: {...},
    lastModified: Date
  },
  
  // Project list
  projects: [...],
  
  // Save state
  isDirty: true,              // Has unsaved changes
  lastSaved: Date,
  isSaving: false,
  
  // Auto-save
  autoSaveEnabled: true,
  autoSaveInterval: 30000     // 30 seconds
}
```

### Key Actions
- `saveProject()` - Save current work
- `loadProject(id)` - Load project
- `createProject(name)` - New project
- `exportProject()` - Export to file
- `setAutoSave(enabled)` - Toggle auto-save

### When to Use
- Saving work
- Loading projects
- Import/export
- Auto-save features

---

## 7. 🚀 **appStore** - Application Core

### Purpose
Core application state and initialization.

### What's Inside
```typescript
{
  // Initialization
  themeLoaded: true,          // Theme ready
  
  // Utilities
  generateElementId: () => string
}
```

### Key Actions
- `setThemeLoaded(loaded)` - Mark theme ready
- `generateElementId()` - Create unique IDs

### When to Use
- App initialization
- ID generation
- Core app state

---

## Identified Overlaps & Issues

### 1. **Element Operations** (Duplicated)
- `oneStore`: addElement, updateElement, groupElements
- `elementStore`: createElement, duplicateElement, groupElements

### 2. **ID Generation** (Duplicated)
- `appStore`: generateElementId()
- `elementStore`: ID generation logic

### 3. **Layout Management** (Duplicated)
- `uiStore`: layout, setLayout()
- `presetStore`: currentLayout, switchLayout()

### 4. **Selection State** (Split)
- `oneStore`: selectedElementId, selectedElementIds
- `libraryStore`: selectedItems
- Both should be in designer actor

---

## Benefits of 3-Actor Model

1. **Clear Mental Model**: WHO (designer) does WHAT (assets) WHERE (workspace)
2. **No Duplication**: Each piece of state has one clear home
3. **Easier Testing**: Three focused areas to test
4. **Better Performance**: Can optimize updates per actor
5. **Simpler Code**: Actions flow naturally between actors

The refactor will consolidate 7 stores into 3 clear actors, eliminating duplication and confusion!