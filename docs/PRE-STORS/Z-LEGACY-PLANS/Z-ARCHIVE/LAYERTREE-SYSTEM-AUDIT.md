# LayerTree System Audit

**Date:** 2025-09-11  
**Component:** LayerTree.tsx  
**Current Size:** 668 lines

---

## Component Overview

LayerTree displays a hierarchical view of canvas elements with:
- Nested group structure
- Visibility/lock controls
- Drag & drop reordering
- Inline name editing
- Selection management

---

## Current Structure

### Stats
- **Lines:** 668
- **useState hooks:** 6
- **Inline styles:** ~265 lines (40% of component!)
- **Props:** 8 (mostly event handlers)
- **TypeScript:** Partial (uses `any[]` for elements)

### State Management
```typescript
const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
const [hiddenElements, setHiddenElements] = useState<Set<string>>(new Set());
const [lockedElements, setLockedElements] = useState<Set<string>>(new Set());
const [draggedElement, setDraggedElement] = useState<string | null>(null);
const [dragOverElement, setDragOverElement] = useState<string | null>(null);
const [editingElement, setEditingElement] = useState<string | null>(null);
const [editingName, setEditingName] = useState<string>('');
```

### Features
1. **Hierarchical Display**
   - Builds tree from flat element array
   - Shows parent-child relationships
   - Collapsible groups

2. **Element Controls**
   - Visibility toggle (eye icon)
   - Lock toggle (lock icon)
   - Inline name editing

3. **Drag & Drop**
   - Reorder elements
   - Visual feedback during drag
   - Updates z-index

4. **Selection**
   - Multi-select support
   - Visual selection state
   - Click to select

---

## Refactoring Opportunities

### 1. **Extract Inline Styles** (High Priority)
- 265 lines of CSS in template string
- Move to separate CSS file or styled components
- Use existing theme system

### 2. **Extract Icon Components** (Medium Priority)
- 9 inline SVG icons
- Create separate Icons file
- Reusable across other components

### 3. **TypeScript Improvements** (High Priority)
- Replace `any[]` with proper Element interface
- Type all event handlers properly
- Add return types to functions

### 4. **Component Extraction** (Medium Priority)
Could extract:
- LayerTreeItem (single item rendering)
- LayerTreeControls (visibility/lock buttons)
- LayerTreeIcons (all SVG icons)

### 5. **State Optimization** (Low Priority)
- hiddenElements/lockedElements duplicate DirectRenderer state
- Should sync with global state store
- Reduce redundant state

### 6. **Performance** (Low Priority)
- Memoize tree building (currently rebuilds on every render)
- Optimize drag & drop updates
- Virtual scrolling for large lists

---

## Dependencies

### Imports
- React (useState, useEffect)
- No other dependencies!

### Integration Points
- Receives elements from parent
- Dispatches selection events
- Controls visibility/lock state
- Handles reordering

---

## Potential Issues

1. **State Duplication**
   - Hidden/locked state managed here AND in DirectRenderer
   - Could lead to sync issues

2. **Performance**
   - Rebuilds entire tree on every render
   - No memoization of expensive operations

3. **TypeScript**
   - Uses `any` for elements
   - Missing proper interfaces

4. **Accessibility**
   - No keyboard navigation
   - Missing ARIA labels
   - No screen reader support

---

## Refactor Plan

### Phase 1: Extract Components
1. Extract all SVG icons to `LayerTreeIcons.tsx`
2. Extract inline styles to separate file
3. Create `LayerTreeItem.tsx` for item rendering
4. Create `LayerTreeControls.tsx` for buttons

### Phase 2: TypeScript
1. Import Element interface from types
2. Type all props properly
3. Remove all `any` types
4. Add return types

### Phase 3: Performance
1. Memoize tree building with useMemo
2. Optimize re-renders with React.memo
3. Add virtual scrolling for large lists

### Phase 4: State Management
1. Sync with global visibility/lock state
2. Remove duplicate state
3. Connect to Zustand stores

---

## Expected Results

- **Size Reduction:** 668 → ~300 lines (55% reduction)
- **New Files:** 3-4 extracted components
- **Performance:** Better with memoization
- **Maintainability:** Much improved with proper types

---

*Ready for refactoring!*