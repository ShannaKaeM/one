# 🏗️ Studio1 System Architecture

## Overview
This document provides a comprehensive technical overview of the Studio1 system architecture, covering all major components, their interactions, and technical implementation details.

---

## 📋 Table of Contents

1. [Element System](#element-system)
2. [State Management](#state-management) 
3. [Theme System](#theme-system)
4. [Library System](#library-system)
5. [Event Architecture](#event-architecture)
6. [Component Structure](#component-structure)
7. [Data Flow](#data-flow)
8. [File Organization](#file-organization)

---

## Element System

### Core Concepts
- **Everything is type: 'one'** - Unified element system
- **Elements as layers** - No internal layers, elements ARE the layers
- **Structure-driven** - Theme defines structures, React handles logic

### Element Structure
```typescript
interface Element {
  id: string;              // Unique identifier (element-timestamp-random)
  type: 'one';            // Always 'one' for consistency
  name?: string;          // User-friendly name
  structureName?: string; // Theme structure reference
  content?: {
    text?: string;
    src?: string;
  };
  style: {
    position: string;
    left: string;
    top: string;
    width?: string;
    height?: string;
    zIndex: number;
  };
  isGroup?: boolean;
  children?: string[];     // IDs of child elements
  parentGroup?: string;    // ID of parent group
  appliedPresets?: string[]; // Applied theme presets
}
```

### Helper Modules

#### elementFactory.ts
- `createElement()` - Centralized element creation
- `calculateElementZIndex()` - Z-index calculation
- `createElementFromContent()` - Create from library items

#### elementActions.ts  
- `groupElements()` - Group multiple elements
- `ungroupElements()` - Ungroup elements
- `duplicateElement()` - Duplicate with offset
- `deleteElements()` - Delete with child handling
- `moveElement()` - Update position
- `updateElementZIndex()` - Z-order management

#### elementRenderer.ts
- `generateDirectHTML()` - Main rendering function
- `generateElementFromStructure()` - Theme structure rendering
- `findPresetInTheme()` - Preset lookup
- Pure functions for HTML/CSS generation

---

## State Management

### Zustand Stores

#### oneStore.ts
```typescript
{
  elements: Element[];
  selectedElementId: string | null;
  selectedElementIds: string[];
  // Actions for CRUD operations
}
```

#### uiStore.ts
```typescript
{
  layout: string;
  activeTheme: 'ui' | 'one';
  gridVisible: boolean;
  snapEnabled: boolean;
  // UI-specific actions
}
```

### State Synchronization
- DirectRenderer maintains local state (for now)
- Syncs TO store on updates
- Other components READ from store
- Future: Complete migration to stores

---

## Theme System

### Theme Structure
- **UI Theme** - Interface components
- **ONE Theme** - Canvas elements
- **Runtime Processing** - Dynamic theme application

### Key Features
- Preset system with inheritance
- Structure definitions
- Content defaults
- Style variables

---

## Library System

### Components Structure
- **Library.tsx** - Main component (1,383 lines)
- **Extracted Components:**
  - LibraryHeader - Title and action buttons
  - LibraryUpload - Upload modal with library selection
  - LibraryGrid - Main grid display
  - LibraryManager - Library CRUD operations
  - BulkEditModal - Bulk edit functionality
  - ItemEditModal - Individual item editing

### TypeScript Integration
- Central types in `/src/types/library.types.ts`
- Full TypeScript coverage - no `any` types
- Type guards for runtime validation

### Data Model
```typescript
interface LibraryItem {
  id: string;
  name: string;
  url: string;
  libraries: string[];  // No more collections!
  type: 'image' | 'video' | 'text' | 'markdown' | 'json' | 'component' | 'element' | 'media' | 'content';
  createdAt: number;
  // ... other fields
}
```

### Storage Architecture
- **R2 Cloud Storage** via Cloudflare Worker
- **Worker Endpoints:**
  - POST /upload - Content-addressed upload
  - POST /library/save - Save library item
  - GET /library/list - List items with filters
  - DELETE /library/{id} - Delete item
- **Libraries Only** - Collections system completely removed
- All items go to "All Items" bucket, tagged with libraries

---

## Event Architecture

### Event Categories (25 total events)

#### Element Creation
- `add-one-element` - Add new element
- Click-to-place mode handling

#### Element Modification  
- `element-moved`, `element-resized`
- `element-property-changed`, `element-renamed`
- `element-visibility-changed`, `element-lock-changed`
- `elements-reordered`

#### Grouping
- `group-elements`, `ungroup-elements`

#### Selection & Editing
- `element-selected`, `start-text-edit`
- `duplicate-element`, `delete-element`

#### Library & Import
- `save-to-library`, `save-element-to-library`
- `import-content`
- `select-image-for-element`, `upload-image-for-element`

#### UI Actions
- `jtor-action` - Unified action system
- `general-controls-action` - Grid, snap, layout
- `toggle-preset` - Preset application

### Event Flow
1. Components dispatch events
2. useElementHandlers hook listens
3. State updates trigger re-renders
4. Canvas reflects changes

---

## Component Structure

### DirectRenderer (~1200 lines)
- **Responsibilities:**
  - Canvas rendering coordination
  - State management
  - Element selection/interaction
  - Grid/snap controls
  
- **Extracted to:**
  - useElementHandlers hook
  - Modal components
  - elementRenderer utility

### Supporting Components
- **GridOverlay** - Grid display and snapping
- **SelectionHandles** - Resize/rotate controls
- **SelectionActionButton** - Context actions
- **ElementPopup** - Quick actions menu

---

## Data Flow

### Element Creation Flow
1. User clicks "Add Element" → dispatches `add-one-element`
2. DirectRenderer enters placing mode
3. User clicks canvas → creates element via `elementFactory`
4. Element added to state → synced to store
5. Canvas re-renders with new element

### Save to Library Flow
1. User selects element → opens SaveModal
2. Chooses libraries/creates new
3. Data saved to R2 storage
4. Library refreshed with new item

---

## File Organization

```
src/
├── components/
│   ├── DIRECT-RENDERER/     # Renamed from modals
│   │   ├── DirectRenderer.tsx (~1200 lines)
│   │   ├── LibraryModal.tsx
│   │   ├── SaveModal.tsx
│   │   ├── GridOverlay.tsx
│   │   ├── SelectionHandles.tsx
│   │   ├── SelectionActionButton.tsx
│   │   └── ElementPopup.tsx
│   ├── LIBRARY/
│   │   ├── Library.tsx (1383 lines)
│   │   ├── LibraryHeader.tsx
│   │   ├── LibraryUpload.tsx
│   │   ├── LibraryGrid.tsx
│   │   ├── LibraryManager.tsx
│   │   ├── BulkEditModal.tsx
│   │   └── ItemEditModal.tsx
│   ├── LayerTree.tsx (668 lines)
│   └── [other components]
├── hooks/
│   └── useElementHandlers.ts
├── stores/
│   ├── oneStore.ts          # Element state
│   └── uiStore.ts           # UI state
├── types/
│   └── library.types.ts     # Library TypeScript interfaces
├── utils/
│   ├── elementFactory.ts
│   ├── elementActions.ts
│   ├── elementRenderer.ts
│   ├── idGenerator.ts
│   └── r2Manager.ts         # R2 storage interface
├── workers/
│   └── asset-worker.js      # Cloudflare Worker
└── theme/
    └── runtimeThemeProcessor.ts
```

---

## Technical Decisions

### Why Everything is Type 'one'
- Consistency across system
- Simpler type checking
- Flexibility through structureName

### Why Keep Local State (for now)
- Avoids breaking existing functionality
- Allows gradual migration
- Maintains performance during transition

### Why Extract Helpers/Hooks
- Reduces component complexity
- Improves testability
- Enables reuse across components
- Better separation of concerns

### Why Remove Collections
- Simplified to single tagging system (libraries)
- Reduced complexity and user confusion
- Everything goes to "All Items" bucket
- Libraries act as virtual folders/tags

---

## Deployment & Infrastructure

### Cloudflare Worker Setup
- **Worker Name:** studio-one-assets
- **URL:** https://studio-one-assets.studio-one.workers.dev
- **Config:** wrangler.toml
- **Deployment:** `npx wrangler deploy`
- **R2 Buckets:**
  - studio-one-assets (content-addressed files)
  - studio-one-library (metadata and indexes)

### Environment Variables
- `VITE_WORKER_URL` - Points to Cloudflare Worker endpoint
- Configured in .env files

---

## Current Component Status

### Refactored
- **DirectRenderer** - From 3000+ → 1200 lines (60% reduction)
- **Library** - From 1877 → 1383 lines (26% reduction)
  - Extracted 6 subcomponents
  - Full TypeScript coverage
  - Collections system removed

### To Be Refactored
- **LayerTree** - 668 lines (audit complete)
- Other major components TBD

### Known Issues
- Save-to-library integration broken (needs group/flatten)
- Element creation issues (wrapper, text, image positioning)
- State duplication between components and stores

---

*This document is updated as refactoring progresses*