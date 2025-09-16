# State Management Unification Roadmap

## Overview
Transform scattered state management across all components into a unified Zustand-based architecture. Each component has its own detailed roadmap in the COMPONENTS folder.

---

## Architecture Vision

### Current State
- State scattered across multiple components
- Mix of useState, props, and events
- Synchronization code everywhere
- Hard to track data flow

### Target State
```
Zustand Stores (Single source of truth)
     ↓
UISource/UIConnect (Data providers)
     ↓
Components (Pure, stateless UI)
```

---

## Store Structure

### 📊 uiStore
**Purpose:** UI state and layout management
- Layout configuration (activeLayout, availableLayouts)
- Theme selection (activeTheme)
- Grid/snap settings (gridVisible, snapEnabled)
- Editor states (accordions open/closed)
- Modal visibility (library, save, popup)
- Canvas placement mode
- Element editing state
- Component assignments (grid areas)
- Expanded groups in LayerTree

### 🎨 oneStore (Enhanced)
**Purpose:** Canvas elements and selection
- Canvas elements array
- Selection state (single & multi)
- Element operations (CRUD)
- Groups management (group, ungroup, flatten)
- Visibility/lock states per element
- Batch operations (delete, duplicate)
- Hidden/locked element tracking
- Element reordering

**New Group Operations:**
- `groupElements()` - Creates group with relative positioning
- `ungroupElements()` - Removes group, restores absolute positions
- `flattenGroup()` - Converts group to single flattened component

### 🔧 appStore
**Purpose:** App-wide settings and utilities
- Theme loaded state
- ID generation (`generateElementId`)
- User preferences
- Workspace settings

### 📚 libraryStore
**Purpose:** Library management
- Library items
- Active libraries list
- Search/filter functionality
- Selected library
- Loading states
- Item management (add, remove, update)

### 🎨 presetStore (NEW)
**Purpose:** Preset and styling management
- Active presets per element
- Global presets per element type
- Available presets from theme
- Preset inheritance system
- Layout switching integration
- Batch preset operations

**Key Features:**
- Apply/remove/toggle presets
- Element-specific or global presets
- Preset resolution (combines element + global)
- Future: Layout presets integration

### 📁 projectStore (NEW)
**Purpose:** Project management and persistence
- Current project state
- Project lifecycle (create, save, load, delete)
- Auto-save functionality
- Import/export capabilities
- Project metadata
- Dirty state tracking
- Recent projects list

**Key Features:**
- Auto-save with configurable interval
- JSON export/import
- Project versioning
- Unsaved changes detection

### 🏭 elementStore (NEW)
**Purpose:** Unified element operations
- Element creation factory
- ID generation system
- Grid area assignment (a, b, c...)
- Z-index management
- Element manipulation (move, duplicate)
- Batch element creation

**Replaces These Utils:**
- `autoIdHelper.ts` (ID generation)
- `elementFactory.ts` (element creation)
- `elementActions.ts` (element operations)
- `idGenerator.ts` (wrapper)

---

## Component Migration Status

### ✅ Completed
- **Editors** → Fully migrated to UISource pattern
- **UIConnect** → Direct store integration
- **DirectRenderer** → Full Zustand migration complete
  - All 22 `any` types eliminated
  - 20+ states moved to stores
  - 7 events replaced with store actions
  - See `/COMPONENTS/DIRECT-RENDERER/DIRECTRENDERER-ROADMAP.md`
- **LayerTree** → Full Zustand migration complete
  - All 2 `any` types eliminated
  - 3 duplicate states removed (using stores)
  - expandedGroups added to uiStore
  - 6 events replaced with store actions
  - 5 App.tsx handlers removed
  - See `/COMPONENTS/LAYERTREE/LAYERTREE-ROADMAP-V2.md`
- **Library** → Full Zustand migration complete
  - 1 `any` type eliminated
  - Created libraryStore with all actions
  - 5 states moved to store (items, libraries, selection, loading)
  - 2 event listeners removed
  - DirectRenderer integration complete
  - See `/COMPONENTS/LIBRARY/LIBRARY-ROADMAP-V2.md`
- **CanvasControls** → Already well-structured
  - Minimal refactor only (TypeScript types)
  - See `/COMPONENTS/TOOLBOX/TOOLBOX-ROADMAP.md`
- **LayoutSwitcher** → Already well-structured  
  - Minimal refactor only (TypeScript types)
  - See `/COMPONENTS/TOOLBOX/TOOLBOX-ROADMAP.md`
- **DirectRenderer Children** → Event migration complete
  - ElementPopup (already used callbacks)
  - SelectionActionButton (migrated to stores)
  - SelectionHandles (migrated to stores)
  - See `/COMPONENTS/DIRECT-RENDERER/DIRECTRENDERER-ROADMAP.md`
- **App.tsx** → Full Zustand migration complete
  - All phases completed (Sessions 12-13)
  - Reduced from 548 to 435 lines
  - componentAssignments moved to uiStore
  - activeLayout moved to uiStore
  - Selection states using oneStore
  - All event listeners removed
  - See `/COMPONENTS/APP/APP-ROADMAP.md`

### 🟢 Project Complete!
- **All components successfully migrated to Zustand!**
- Event-based communication replaced with direct store actions
- Type safety improved across all components
- No remaining components to migrate

---

## Migration Principles

### 1. Component Independence
- Components should work standalone
- No prop drilling
- Direct store access via hooks

### 2. Event System Replacement
- Replace custom events with store actions
- Direct updates for better performance
- Type-safe operations

### 3. UISource Pattern
- Wrap components with UISource
- Automatic data hydration
- Store synchronization

---

## Benefits of Zustand Migration

### For Development
- Single source of truth
- Easier debugging with DevTools
- Type safety with TypeScript
- Less boilerplate code

### For Visual Builder Features
- Real-time handle/input sync
- Multi-property updates
- Constraint systems
- Undo/redo capability
- Complex CAD operations
- Animation timelines

---

## Migration Order

### Phase 1: Component Preparation
1. Extract component styles
2. Make components independent
3. Remove prop dependencies
4. Add TypeScript types

### Phase 2: State Migration
1. Move simple states first
2. Update components to use stores
3. Remove synchronization code
4. Test thoroughly

### Phase 3: Event Replacement
1. Replace event listeners with store subscriptions
2. Update dispatchers to use store actions
3. Remove event handling code
4. Verify all connections

---

## Component Roadmaps

Each component has detailed migration plans:

- `/COMPONENTS/APP/APP-ROADMAP.md` - App.tsx state cleanup
- `/COMPONENTS/EDITORS/EDITORS-ROADMAP-V2.md` - ✅ Complete
- `/COMPONENTS/LIBRARY/LIBRARY-ROADMAP.md` - Library refactor
- `/COMPONENTS/LAYERTREE/LAYERTREE-ROADMAP.md` - LayerTree updates
- `/COMPONENTS/DIRECT-RENDERER/*` - DirectRenderer plans
- `/COMPONENTS/TOOLBOX/TOOLBOX-ROADMAP.md` - Toolbox migration

---

## Success Criteria

### Global Goals
- [x] All components use Zustand stores
- [x] No prop drilling (minimal props)
- [x] No event synchronization for state
- [x] Improved TypeScript coverage
- [x] Components work independently

### Performance Goals
- [x] Reduced re-renders (store subscriptions)
- [x] Faster state updates (direct actions)
- [x] Better memory usage (single source of truth)
- [x] Smoother interactions (no event delays)

---

## Migration Status Update 🚀

### ✅ Components Migration Complete!
All components have been successfully migrated to Zustand:
- DirectRenderer and all child components
- LayerTree with full store integration
- Library with dedicated libraryStore
- CanvasControls and LayoutSwitcher
- App.tsx cleanup completed

### 🆕 Utils to Stores Migration (In Progress)
We're now migrating utilities to Zustand stores for consistency:

**Completed:**
- ✅ Created presetStore (preset management)
- ✅ Created projectStore (save/load functionality)
- ✅ Created elementStore (element operations)
- ✅ Enhanced oneStore with group/ungroup/flatten

**Remaining Utils:**
- `elementRenderer.ts` - Keep as pure function
- `r2Manager.ts` - Keep as API client
- `componentRegistry.ts` - Keep for setup
- `icons.tsx` - Keep as components
- Remove: `libraryCleanup.ts`, `idGenerator.ts`, `presetManager.ts`

### Future Optimizations
- Connect new stores to components
- Remove deprecated utils
- Further reduce App.tsx size (current: 435 lines)
- Add undo/redo system using stores
- Implement constraint system

---

## Quick Store Reference

| Store | Primary Purpose | Key Actions |
|-------|----------------|-------------|
| **uiStore** | UI layout & settings | setLayout, toggleGrid, toggleSnap |
| **oneStore** | Canvas elements | CRUD, group/ungroup/flatten, select |
| **appStore** | App settings | generateElementId, setThemeLoaded |
| **libraryStore** | Library items | addItem, removeItem, filterItems |
| **presetStore** | Style presets | applyPreset, togglePreset |
| **projectStore** | Save/load | saveProject, loadProject, autoSave |
| **elementStore** | Element factory | createElement, duplicateElement |

---

## ONE-CONNECT Integration Progress (2025-09-13)

### ✅ Week 1 Complete
- **ONE-CONNECT Core Built**
  - All 7 files created and working
  - TypeScript interfaces defined
  - Store subscription system working
  - Component loading tested

- **Editors Component Test**
  - Created ONE-CONNECT versions of components
  - Direct Zustand integration successful
  - No more event system needed
  - CSS grid issues fixed

- **Session 2 Progress (Log 019)**
  - Fixed all theme JSON syntax errors
  - Cleaned up 6 duplicate component files
  - Switched from UIConnect to ONE-CONNECT
  - Integrated PresetStore successfully
  - Updated all component data sources in theme

### 🚧 Current Status
- **Working**: ONE-CONNECT loading, theme fixed, stores connected
- **Issues**: Components expect old appState pattern, need refactoring
- **Next**: DirectRenderer refactor (Week 2)

### 📋 Next Priority
1. Split DirectRenderer into modules (1,241 → 400 lines)
2. Implement ONE-CONNECT data pattern
3. Fix component data flow issues
4. Continue with Library refactor (Week 3)

See Logs 018-019 for detailed technical notes.

---

*Unified state management = Better developer experience + Advanced features!*