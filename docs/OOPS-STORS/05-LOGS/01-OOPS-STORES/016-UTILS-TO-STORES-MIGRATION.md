# Log 016: Utils to Stores Migration & ONE-CONNECT Planning

## Session Overview
**Date:** 2025-09-13
**Focus:** Migrating utilities to Zustand stores and planning ONE-CONNECT refactor
**Agent:** Claude

---

## Work Completed

### 1. Fixed Missing Import in App.tsx
- Added missing `autoIdHelper` import that was causing potential runtime errors
- App.tsx now properly imports the helper for grid area assignment

### 2. Created New Zustand Stores

#### presetStore.ts ✅
- Manages preset application per element
- Global presets for element types
- Preset inheritance system
- Batch operations
- Layout switching preparation
- Helper hook: `useElementPresets`

#### projectStore.ts ✅
- Project lifecycle management (create, save, load, delete)
- Auto-save functionality with configurable intervals
- Import/export capabilities
- Dirty state tracking
- Recent projects list
- Local storage persistence

#### elementStore.ts ✅
- Consolidated element operations
- ID generation (replacing autoIdHelper)
- Grid area assignment
- Element creation factory
- Z-index management
- Group operations preparation

### 3. Enhanced oneStore
- Added `flattenGroup()` function
- Improved group/ungroup with proper relative positioning
- Ready for library save workflow

### 4. Documentation Updates

#### STATE-ROADMAP.md
- Added all 7 stores with detailed descriptions
- Marked new stores as (NEW)
- Added quick reference table
- Updated migration status

#### UTILS-REFACTOR-PLAN.md
- Updated with completion status
- Listed utils to be removed (6 files)
- Listed utils to keep (6 files)
- Added success metrics

#### UTILS-ROADMAP.md (For Dummies Guide)
- Comprehensive guide to all utils
- Simple explanations with analogies
- Connection diagrams
- Issues identified (duplicate ID generation)

### 5. Discovered Issues
- Duplicate ID generation in multiple places
- Large component files need splitting (DirectRenderer: 1,241 lines, Library: 1,169 lines)
- New stores created but not connected to components yet
- 1 TypeScript `any` in Library

### 6. Created Refactor Plans

#### FINAL-ONE-CONNECT-REFACTOR.md (The Latest Plan) ✅
- Comprehensive plan to merge UIConnect + UISource into ONE-CONNECT
- One-pass-per-component approach
- Complete transformation strategy
- Week-by-week implementation plan
- Utils deletion list

**Note:** Removed older plans (PRESET-TARGET-ROADMAP.md and ONE-CONNECT-MERGER-PLAN.md) to avoid confusion.

---

## Current State Summary

### Stores Status
- **Created:** presetStore, projectStore, elementStore (+ enhanced oneStore)
- **Not Connected:** All new stores need to be connected to components
- **Working:** uiStore, oneStore, appStore, libraryStore

### Utils Status
- **To Remove (6):** libraryCleanup, idGenerator, presetManager, storageManager, elementFactory, elementActions
- **To Keep (6):** elementRenderer, icons, r2Manager, componentRegistry, registerComponents, autoIdHelper (partial)

### Components Needing Work
1. **DirectRenderer** - Split into modules, connect elementStore
2. **Library** - Fix TypeScript, split files, connect projectStore
3. **LayerTree** - Performance optimizations only
4. **LayoutSwitcher** - Connect presetStore
5. **App.tsx** - Final cleanup after all migrations

---

## Key Decisions Made

1. **Flatten Function Definition**
   - Keeps group container as wrapper
   - Makes all children absolute positioned
   - Removes parent-child relationships
   - Perfect for library save workflow

2. **ONE-CONNECT Architecture**
   - Merges UIConnect (layout) + UISource (data) concepts
   - Single configuration in theme JSON
   - Automatic store subscriptions
   - One-pass refactor per component

3. **Migration Strategy**
   - Build ONE-CONNECT first
   - Refactor one component completely at a time
   - No multiple passes or waves
   - Delete old utils only after everything works

---

## Agent Handoff

### For Next Agent

**IMPORTANT:** Please review the communication guide first:
`/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/studio1/docs/00-MASTER-GUIDES/LOGS/000-COMMUNICATION-GUIDE.md`

### Current Status
We've created all the new Zustand stores but haven't connected them to components yet. The architecture is ready but not implemented.

### Next Steps (Priority Order)
1. **Build ONE-CONNECT foundation** - Start with the core system as outlined in FINAL-ONE-CONNECT-REFACTOR.md
2. **Refactor DirectRenderer** - Split into modules and connect to elementStore
3. **Continue with other components** - Follow the week-by-week plan

### Key Files to Review
1. `/docs/00-MASTER-GUIDES/REFACTORS/FINAL-ONE-CONNECT-REFACTOR.md` - The master plan
2. `/src/stores/` - All the new stores (presetStore, projectStore, elementStore)
3. `/docs/00-MASTER-GUIDES/REFACTORS/STATE-ROADMAP.md` - Current state of all stores

### Important Notes
- DO NOT delete any utils until components are migrated
- Test each component thoroughly after migration
- The flatten function is specifically for library save workflow
- All architectural decisions are documented in this log

### What NOT to Do
- Don't create more refactor plans - use FINAL-ONE-CONNECT-REFACTOR.md
- Don't migrate components partially - do complete transformation
- Don't delete UIConnect/UISource until ONE-CONNECT is working

### Technical Context
- Using Zustand for all state management
- Moving from event-based to direct store communication
- Theme JSON will define entire UI structure
- ONE-CONNECT will handle both layout AND data

Good luck with the implementation! The architecture is solid and ready to build.

---

*End of Log 016*