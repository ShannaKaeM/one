# Utils to Zustand Migration Plan

## Overview
Moving utilities to Zustand stores for consistency, single source of truth, and better reactivity. This will support upcoming features for element creation, saving, grouping, flattening, and library exports.

---

## Migration Strategy

### 🎯 Core Principle
**Everything that manages state → Zustand store**
**Pure functions/helpers → Keep as utils**

---

## New Store Structure

### 1. 🎨 presetStore (NEW)
**Purpose:** Manage all preset-related functionality
- Active presets per element
- Layout switching (merge from current layout switcher)
- Preset toggling and inheritance
- Theme preset management

**Migrate from:**
- `presetManager.ts` (currently unused)
- Layout switching logic from `uiStore`

**Benefits:**
- Reactive preset changes
- Undo/redo support for styling
- Complex preset inheritance

### 2. 📦 projectStore (NEW)
**Purpose:** Project management and persistence
- Current project state
- Save/load functionality  
- Auto-save management
- Export/import
- Project metadata

**Migrate from:**
- `storageManager.ts`
- Some App.tsx project logic

**Benefits:**
- Reactive save status
- Better error handling
- Multi-project support ready

### 3. 🏭 elementStore (NEW)
**Purpose:** Unified element operations
- Element creation (factory)
- Element manipulation (actions)
- ID generation
- Grid area assignment
- Z-index management

**Migrate from:**
- `elementFactory.ts`
- `elementActions.ts`
- ID generation from `autoIdHelper.ts`
- Keep grid area logic

**Benefits:**
- Single source for all element operations
- Better transaction support
- Easier to add constraints/validation

### 4. 🎯 Enhance oneStore
**Add to existing oneStore:**
- Group/ungroup with proper state management
- Flatten operations
- Batch operations
- Element relationships

**Currently oneStore has:**
- Elements array
- Selection state
- Basic CRUD

**This consolidates element state and operations in one place**

---

## What Stays as Utils

### Keep as Pure Utilities:
1. **elementRenderer.ts** - Pure function: data → HTML
2. **icons.tsx** - Just React components
3. **r2Manager.ts** - API client
4. **componentRegistry.ts** - One-time setup utility
5. **registerComponents.ts** - Component registration
6. **autoIdHelper.ts** - ONLY keep `getGridArea()` function

### To Be Removed (After Migration):
1. **libraryCleanup.ts** - Temporary utility
2. **idGenerator.ts** - Functionality moved to elementStore
3. **presetManager.ts** - Replaced by presetStore
4. **storageManager.ts** - Replaced by projectStore
5. **elementFactory.ts** - Replaced by elementStore
6. **elementActions.ts** - Replaced by elementStore & oneStore

---

## Migration Plan

### Phase 1: Create New Stores
```typescript
// presetStore.ts
interface PresetStore {
  // Preset management
  activePresets: Record<string, string[]>
  elementPresets: Record<string, string[]>
  
  // Actions
  applyPreset: (elementId: string, preset: string) => void
  removePreset: (elementId: string, preset: string) => void
  togglePreset: (elementId: string, preset: string) => void
  
  // Layout switching (from current uiStore)
  switchLayout: (layout: string) => void
  getAvailableLayouts: () => string[]
}

// projectStore.ts  
interface ProjectStore {
  // State
  currentProject: Project | null
  isDirty: boolean
  lastSaved: Date | null
  autoSaveEnabled: boolean
  
  // Actions
  createProject: (name: string) => void
  saveProject: () => Promise<void>
  loadProject: (id: string) => Promise<void>
  exportProject: () => Promise<Blob>
  importProject: (file: File) => Promise<void>
  setAutoSave: (enabled: boolean) => void
}

// elementStore.ts
interface ElementStore {
  // ID & Grid Management
  generateElementId: (type?: string) => string
  getGridArea: (index: number) => string
  
  // Element Creation
  createElement: (type: string, props?: Partial<CanvasElement>) => CanvasElement
  createFromContent: (content: any, position: Position) => CanvasElement
  
  // Z-Index Management  
  calculateZIndex: (elements: CanvasElement[]) => number
  updateZIndex: (elementId: string, direction: 'front' | 'back') => void
}
```

### Phase 2: Update Components
1. Replace util imports with store hooks
2. Update all references to use store actions
3. Remove event listeners for these operations
4. Test each component thoroughly

### Phase 3: Consolidate & Clean
1. Remove deprecated utils
2. Consolidate duplicate functionality
3. Update imports across codebase
4. Clean up any remaining events

---

## Benefits of This Approach

### 🟢 Consistency
- All state in Zustand
- Same patterns everywhere
- Easier onboarding

### 🟢 Reactivity  
- Components auto-update
- No event synchronization
- Better performance

### 🟢 Features
- Undo/redo ready
- Constraints system ready
- Multi-select operations
- Batch updates
- Transaction support

### 🟢 Debugging
- DevTools support
- Time travel debugging  
- Clear action logs

### 🟢 Flexibility
- Easy to add new features
- Better testing
- Cleaner architecture

---

## Implementation Status

### ✅ Phase 1: Foundation (COMPLETE)
1. ✅ Created `presetStore` - Preset management ready
2. ✅ Created `projectStore` - Project save/load ready
3. ✅ Created `elementStore` - Element operations consolidated
4. ✅ Enhanced `oneStore` - Added group/ungroup/flatten

### 🟡 Phase 2: Migration (IN PROGRESS)
1. ⏳ Update DirectRenderer to use new stores
2. ⏳ Update Library to use new stores
3. ⏳ Update save/load functionality
4. ⏳ Connect presetStore to LayoutSwitcher

### 🔴 Phase 3: Cleanup (PENDING)
1. Remove deprecated utils:
   - `libraryCleanup.ts`
   - `idGenerator.ts`
   - `presetManager.ts`
   - `storageManager.ts`
   - `elementFactory.ts`
   - `elementActions.ts`
2. Update all imports
3. Test everything
4. Document changes

---

## Questions to Resolve

1. **Should we keep componentRegistry as util or move to store?**
   - Probably keep as util since it's one-time setup

2. **How to handle element rendering?**
   - Keep elementRenderer as pure function
   - Maybe split into smaller functions

3. **R2Manager in a store?**
   - Probably not - it's an API client
   - But could have r2Store for caching

---

## Success Metrics

- [✓] No duplicate ID generation code - All in elementStore
- [✓] All element operations in one place - elementStore + oneStore
- [✓] Project save/load is reactive - projectStore ready
- [✓] Preset system is working - presetStore ready
- [ ] No more scattered state - Migration in progress
- [ ] Cleaner component code - Need to update components
- [ ] Better TypeScript coverage - Ongoing

## Remaining Utils Summary

| Utility | Purpose | Status |
|---------|---------|--------|
| elementRenderer | HTML generation | Keep - Pure function |
| icons | Icon components | Keep - React components |
| r2Manager | Cloud storage API | Keep - API client |
| componentRegistry | Component system | Keep - Setup utility |
| registerComponents | Registration logic | Keep - Setup helper |
| autoIdHelper | Grid areas only | Partial - Keep getGridArea() |

---

*Goal: Single source of truth for everything stateful!*