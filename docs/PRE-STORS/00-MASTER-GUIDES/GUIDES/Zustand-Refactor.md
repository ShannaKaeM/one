# Zustand Store Refactor Plan

## Executive Summary

This document outlines the consolidation plan for refactoring our current 7-store architecture into a single unified ONEstore with namespaces. The refactor will eliminate duplication, clarify responsibilities, and create a more maintainable state management system.

---

## Overview of the Refactor

### Current State: 7 Stores (Complex & Duplicated)
```
uiStore + oneStore + libraryStore + presetStore + elementStore + projectStore + appStore
```

### Target State: 1 Store with Namespaces (Simple & Unified)
```
ONEstore { designer, workspace, assets }
```

### Key Principle
**Single Source of Truth** - One store to rule them all, organized by namespaces:
- **WHO** (designer) does **WHAT** (with assets) **WHERE** (in workspace)

---

## Phase 1: Planning & Analysis (Current Phase)

### 1.1 Identified Duplications to Resolve

| Duplication | Current Locations | Target Location | Priority |
|------------|------------------|-----------------|----------|
| **Selection State** | uiStore.selectedElement, oneStore.selectedElementId/Ids, libraryStore.selectedItems | designer.selected | HIGH |
| **Layout Management** | uiStore.layout, presetStore.currentLayout | workspace.canvas.layout | HIGH |
| **Element Operations** | oneStore (add/update/delete), elementStore (create/duplicate) | assets + assetActions | HIGH |
| **ID Generation** | appStore.generateElementId, elementStore internal | assets.idGenerator | MEDIUM |
| **Placement Mode** | uiStore.isPlacingElement/placingPreset | designer.isPlacing/placingAsset | MEDIUM |
| **Grid State** | uiStore.gridVisible/snapEnabled | workspace.canvas.gridVisible/snapEnabled | LOW |

### 1.2 Store Consolidation Mapping

```typescript
// NEW: ONEstore - Single Unified Store
const ONEstore = create((set, get) => ({
  // Namespace 1: Designer (WHO)
  designer: {
    selected: [],              // All selections
    activeTool: 'select',
    isPlacing: false,
    placingAsset: null,
    preferences: {}
  },
  
  // Namespace 2: Workspace (WHERE)
  workspace: {
    canvas: {
      layout: 'dashboard',
      gridVisible: true,
      snapEnabled: false,
      zoom: 100,
      dimensions: {}
    },
    panels: {
      layerTree: { visible: true, collapsed: false },
      library: { visible: true, searchQuery: '', filterBy: [] },
      editors: { visible: true, expandedSections: [] }
    },
    modals: {}
  },
  
  // Namespace 3: Assets (WHAT)
  assets: {
    project: [],      // Current canvas elements
    library: [],      // Reusable components
    themes: {},       // UI and ONE themes
    presets: {},      // Style presets
    uploads: []       // Media files
  },
  
  // All actions in one place, organized by namespace
  actions: {
    designer: { /* user-initiated actions */ },
    workspace: { /* UI state changes */ },
    assets: { /* content operations */ }
  }
}))
```

---

## Phase 2: Implementation Plan

### 2.1 Step-by-Step Migration

#### Step 1: Create New Store Structure (Week 1)
```typescript
// stores/ONEstore.ts - New unified store
export const ONEstore = create(...)

// stores/index.ts - Export both during migration
export { ONEstore } from './ONEstore'
export { uiStore } from './uiStore'
export { oneStore } from './oneStore'
// etc...
```

#### Step 2: Migrate Designer Actor (Week 1)
1. Move all selection logic to `designer.selected`
2. Consolidate placement mode to `designer.isPlacing`
3. Migrate user preferences
4. Update all components using selection

**Components to Update:**
- LayerTree (selection display)
- DirectRenderer (selection highlights)
- Library (placement mode)
- All tools referencing selection

#### Step 3: Migrate Workspace Actor (Week 2)
1. Consolidate layout management
2. Move all UI panel states
3. Migrate canvas settings (grid, snap, zoom)
4. Update layout switching logic

**Components to Update:**
- LayoutSwitcher
- CanvasControls
- All panels (visibility/collapse states)

#### Step 4: Migrate Assets Actor (Week 2)
1. Combine oneStore.elements → assets.project
2. Move libraryStore.items → assets.library
3. Consolidate preset management
4. Unify element operations

**Components to Update:**
- DirectRenderer (element source)
- Library (item source)
- Editors (element updates)

#### Step 5: Remove Old Stores (Week 3)
1. Delete old store files
2. Remove all old imports
3. Update tests
4. Final cleanup

### 2.2 Migration Helpers

Create temporary helper functions during migration:

```typescript
// stores/migrationHelpers.ts
export const getMigratedSelection = () => {
  // During migration, check both old and new stores
  const newSelection = ONEstore.getState().designer.selected
  const oldSelection = oneStore.getState().selectedElementIds
  return newSelection.length ? newSelection : oldSelection
}

export const setMigratedSelection = (ids: string[]) => {
  // Update both during migration
  ONEstore.getState().actions.designer.setSelection(ids)
  oneStore.getState().setSelectedElements(ids)
}
```

---

## Phase 3: Component Updates

### 3.1 High-Priority Components

These components have the most store dependencies and need careful migration:

| Component | Current Dependencies | Migration Complexity | Notes |
|-----------|---------------------|---------------------|--------|
| **App.tsx** | uiStore, oneStore, appStore, projectStore | HIGH | Central orchestrator |
| **DirectRenderer** | oneStore, uiStore | HIGH | Core canvas component |
| **LayerTree** | oneStore, elementStore | MEDIUM | Selection & visibility |
| **Library** | libraryStore, uiStore | MEDIUM | Placement mode |
| **Editors** | oneStore, uiStore, presetStore | HIGH | Multiple store deps |

### 3.2 Update Patterns

#### Before (Multiple Stores):
```typescript
// Component using multiple stores
const selectedId = oneStore(state => state.selectedElementId)
const isPlacing = uiStore(state => state.isPlacingElement)
const layout = presetStore(state => state.currentLayout)
```

#### After (Single ONEstore):
```typescript
// Component using unified ONEstore
const { selected, isPlacing } = ONEstore(state => state.designer)
const { layout } = ONEstore(state => state.workspace.canvas)

// Or grab everything at once
const { designer, workspace, assets } = ONEstore()
```

---

## Phase 4: Testing Strategy

### 4.1 Test Coverage Requirements

1. **Unit Tests**: Each actor's actions
2. **Integration Tests**: Cross-actor workflows
3. **Migration Tests**: Old → New state compatibility
4. **Performance Tests**: Ensure no regression

### 4.2 Critical Test Scenarios

```typescript
describe('Store Migration', () => {
  it('maintains selection state during migration', () => {
    // Test that selection works with both stores
  })
  
  it('preserves canvas elements', () => {
    // Ensure no data loss
  })
  
  it('handles concurrent updates', () => {
    // Test race conditions during migration
  })
})
```

---

## Phase 5: Rollback Plan

### 5.1 Feature Flags

Use feature flags to control migration:

```typescript
const USE_ONESTORE = process.env.REACT_APP_USE_ONESTORE === 'true'

export const getSelection = () => {
  if (USE_ONESTORE) {
    return ONEstore.getState().designer.selected
  }
  return oneStore.getState().selectedElementIds
}
```

### 5.2 Gradual Rollout

1. **Dev Environment**: Full migration
2. **Staging**: 50% users on new store
3. **Production**: Gradual increase
4. **Full Migration**: After 2 weeks stable

---

## Benefits After Refactor

### 1. **Single Source of Truth**
- ONE store to rule them all - ONEstore
- No more hunting across 7 different files
- Everything in one place, organized by namespaces

### 2. **Performance Improvements**
- Single store = single subscription
- Better batching of updates
- Reduced re-renders
- Simpler React DevTools debugging

### 3. **Developer Experience**
- Import one store: `import { ONEstore } from './stores'`
- Clear namespace organization
- Intellisense shows all available state/actions
- No more store dependency confusion

### 4. **Maintainability**
- Add new features to appropriate namespace
- All related state and actions together
- Easier refactoring and testing
- Clear migration path for future changes

---

## Timeline

| Week | Phase | Deliverables |
|------|-------|--------------|
| 1 | Planning & Setup | ONEstore structure, migration helpers |
| 2 | Designer & Workspace | Migrate selection, UI state to namespaces |
| 3 | Assets & Cleanup | Migrate content, remove all 7 old stores |
| 4 | Testing & Polish | Full test coverage, update all docs |

---

## Success Metrics

1. **Code Reduction**: Expect 40-50% less store code (7 files → 1 file)
2. **Import Reduction**: From 7 imports to 1 import per component
3. **Developer Velocity**: Faster feature development with single store
4. **Performance**: 20-30% fewer re-renders with optimized subscriptions

---

## Next Steps

1. Review this plan - confirm ONEstore naming and structure
2. Set up USE_ONESTORE feature flag
3. Create ONEstore.ts with all namespaces
4. Begin migration starting with designer namespace

The key to success is maintaining both stores during migration, then cutting over completely once stable!