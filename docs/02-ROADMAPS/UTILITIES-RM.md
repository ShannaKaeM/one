# Utilities System

## Overview
**Purpose**: Pure functions and helpers that don't manage state
**Location**: `/src/utils/` in OOPS-STORS
**Total Size**: 1,749 lines across 11 files
**Status**: Mixed - some to keep, some to delete, one new file
**Last Updated**: Based on 001-LOG session findings

### Context from Last Session
- Component documentation phase completed
- 8 major components/systems documented
- Ready for ONEstore implementation
- Utils cleanup is Phase 3 (pending)

---

## Current Utilities Audit

### ✅ Utilities to Keep (6 files, ~1,200 lines)

#### 1. **autoIdHelper.ts** (125 lines) - PARTIAL KEEP
- **Keep**: `getGridArea()` function only
- **Delete**: All ID generation logic
- **Purpose**: Assigns grid areas based on component requirements
- **Used by**: Theme processor, components needing grid placement

#### 2. **componentRegistry.ts** (137 lines)
- **Purpose**: One-time setup for component system
- **Functions**: 
  - `buildComponentList()` - Creates flat component registry
  - Component type mappings
- **Used by**: App initialization

#### 3. **elementRenderer.ts** (328 lines)
- **Purpose**: Pure function for data → HTML generation
- **Functions**:
  - `renderElement()` - Converts element data to HTML
  - Handles all element types (one, text, image, group)
- **Key feature**: No side effects, pure transformation

#### 4. **icons.tsx** (100 lines)
- **Purpose**: React icon components (SVG)
- **Icons**: 12 total (LayerTree + Canvas controls)
- **Future**: Needs unification with emoji icons

#### 5. **r2Manager.ts** (264 lines)
- **Purpose**: Cloudflare R2 storage API client
- **Functions**:
  - Upload/download project data
  - Image management
  - Batch operations
- **Used by**: Library component, project save/load

#### 6. **registerComponents.ts** (236 lines)
- **Purpose**: Component registration helper
- **Functions**: Maps components to registry
- **Used by**: App initialization, ONEconnect

### ❌ Utilities to Delete (4 files, 476 lines)

#### 1. **idGenerator.ts** (13 lines)
- **Reason**: Just a wrapper around autoIdHelper
- **Migration**: Already using autoIdHelper directly

#### 2. **libraryCleanup.ts** (58 lines)
- **Reason**: Temporary migration utility
- **Status**: Migration complete

#### 3. **presetManager.ts** (149 lines)
- **Reason**: Replaced by presetStore
- **Status**: Completely unused

#### 4. **storageManager.ts** (256 lines)
- **Reason**: Replaced by projectStore
- **Migration**: All functionality in stores

### 🆕 New Utilities (1 file, 83 lines)

#### 1. **processThemeStructure.ts** (83 lines)
- **Purpose**: Process theme structure & assign grid areas
- **Status**: Not in original audit
- **Question**: Should this be a utility or part of theme system?

### 🔍 Missing Utilities (1 file, 79 lines)

#### 1. **iconGenerators.ts** (79 lines) - Found in BACKUP
- **Purpose**: Auto-generate icons based on data (layouts, tools, layers)
- **Functions**:
  - `layoutIcon()` - Similar to logic in LayoutSwitcher
  - `toolIcon()` - Icons for select, move, resize, etc.
  - `layerIcon()` - Icons based on element type
  - `numericIcon()` - Number icons (1, 2, 3...)
  - `letterIcon()` - Letter icons (A, B, C...)
- **Note**: This functionality is currently embedded in LayoutSwitcher component

### 🗑️ Already Deleted (2 files)

#### 1. **elementFactory.ts**
- **Migrated to**: elementStore

#### 2. **elementActions.ts** 
- **Migrated to**: elementStore & oneStore

---

## Utility Categories

### 1. **Setup Utilities** (One-time use)
- componentRegistry.ts
- registerComponents.ts

### 2. **Pure Transformation Functions**
- elementRenderer.ts
- autoIdHelper.ts (getGridArea only)

### 3. **External Service Clients**
- r2Manager.ts

### 4. **UI Components**
- icons.tsx

### 5. **Theme Processing** (New)
- processThemeStructure.ts

---

## Key Patterns

### What Makes a Good Utility
1. **Pure functions** - No side effects
2. **Reusable** - Used by multiple components
3. **Stateless** - Doesn't manage state
4. **Single purpose** - Does one thing well

### What Should NOT Be a Utility
1. **State management** → Use stores
2. **Business logic** → Use stores/components
3. **Temporary helpers** → Delete after use
4. **Thin wrappers** → Use original directly

---

## Migration Status

From original UTILS-ROADMAP:
- ✅ Phase 1: New stores created
- 🟡 Phase 2: Components using new stores (in progress)
- 🔴 Phase 3: Utils cleanup (pending)

---

## Action Items

### Immediate
1. Delete 4 deprecated utils (476 lines)
2. Clean up autoIdHelper.ts (keep only getGridArea)
3. Review processThemeStructure.ts placement

### Future
1. Unify icon system (SVG + emoji)
2. Consider moving setup utils to systems folder
3. Document utility usage patterns

---

## Dependencies

### Utils Used By
- **All components**: icons.tsx
- **App.tsx**: componentRegistry, registerComponents
- **Library**: r2Manager
- **DirectRenderer**: elementRenderer
- **Theme system**: autoIdHelper (grid areas), processThemeStructure

### Utils Depend On
- **Types**: All utils import types
- **Constants**: Grid areas, element types
- **External**: Cloudflare R2 API

---

## Questions for Review
1. [ ] Should processThemeStructure.ts stay in utils?
2. [ ] Can we combine componentRegistry + registerComponents?
3. [ ] Should setup utilities move to a different folder?
4. [ ] Is elementRenderer the right place for HTML generation?
5. [ ] Should we restore iconGenerators.ts or keep icon logic in components?

---

*Utils folder needs cleanup but contains essential pure functions for the system*