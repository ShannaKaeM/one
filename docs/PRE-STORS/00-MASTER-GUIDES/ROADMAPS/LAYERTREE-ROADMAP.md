# LayerTree Component Evolution V2

## Overview
LayerTree has already undergone initial refactoring (Phase 1-4 complete). Now it needs state management migration to Zustand and removal of the event system to complete its transformation.

---

## Current State Analysis

### File Structure
```
LAYERTREE/
├── LayerTree.tsx (496 lines - main component)
├── LayerTreeItem.tsx (156 lines - item renderer)
└── LayerTreeHeader.tsx (8 lines - simple header)
Total: 660 lines
```

### Completed Improvements (Phase 1-4)
- ✅ Icons extracted to reusable utils
- ✅ Header component extracted
- ✅ TypeScript types defined (mostly)
- ✅ LayerTreeItem extracted
- ✅ 45% size reduction achieved

### Issues Found in New Audit
- **7 local states** that duplicate Zustand store
- **2 `any` types** still present
- **6+ custom events** for communication
- **Prop drilling** for callbacks
- **Style injection** via useEffect

---

## Phase Progress

### ✅ Previous Phases (1-4) Complete
See original roadmap for details

### ✅ Phase 5: Complete TypeScript Fix
**Status:** COMPLETE (2025-09-13)

**Fixed 2 `any` types in layertree.types.ts:**
```typescript
// Before:
content?: any;
style: any;

// After:
import { ElementStyle, ElementContent } from './directRenderer.types';
content?: string | ElementContent;
style: ElementStyle;
```

### ✅ Phase 6: State Migration to Zustand
**Status:** COMPLETE (2025-09-13)

**States Migrated:**
| Local State | Already in Store? | Action Taken |
|-------------|------------------|---------------|
| expandedGroups | No | ✅ Added to uiStore as `layerTreeExpandedGroups` |
| hiddenElements | Yes ✓ | ✅ Now using oneStore |
| lockedElements | Yes ✓ | ✅ Now using oneStore |
| draggedElement | No | ✅ Kept local (temp UI state) |
| dragOverElement | No | ✅ Kept local (temp UI state) |
| editingElement | No | ✅ Kept local (temp UI state) |
| editingName | No | ✅ Kept local (temp UI state) |

**Changes Made to LayerTree.tsx:**
```typescript
// Added imports:
import { useOneStore } from '../../stores/oneStore';
import { useUIStore } from '../../stores/uiStore';

// Replaced local state with store hooks:
const { hiddenElements, lockedElements, toggleElementVisibility, toggleElementLock } = useOneStore();
const { layerTreeExpandedGroups: expandedGroups, toggleLayerTreeGroup } = useUIStore();

// Removed 3 useState declarations for shared state
```

**Changes Made to uiStore.ts:**
```typescript
// Added state:
layerTreeExpandedGroups: Set<string>;

// Added actions:
setLayerTreeExpandedGroups: (groups: Set<string>) => void;
toggleLayerTreeGroup: (groupId: string) => void;
```

### ✅ Phase 7: Event System Replacement
**Status:** COMPLETE (2025-09-13)

**Events Replaced:**
- ✅ Selection now uses `setSelectedElement()` and `setSelectedElements()` directly
- ✅ Visibility uses `toggleElementVisibility()` directly
- ✅ Lock uses `toggleElementLock()` directly
- ✅ Reordering uses new `reorderElements()` action
- ✅ Renaming uses `updateElement()` directly

**Changes Made to LayerTree.tsx:**
```typescript
// Updated imports to get more store actions:
const { 
  hiddenElements, 
  lockedElements, 
  selectedElementIds,
  setSelectedElement,
  setSelectedElements,
  toggleElementVisibility, 
  toggleElementLock,
  reorderElements,
  updateElement
} = useOneStore();

// Replaced event dispatches with direct store calls:
// Before:
onSelect?.(elementId, event.shiftKey || event.metaKey)
// After:
setSelectedElement(elementId) or setSelectedElements(newSelection)

// handleVisibilityToggle now calls:
toggleElementVisibility(elementId);

// handleLockToggle now calls:
toggleElementLock(elementId);

// handleDrop now calls:
reorderElements(draggedElement, targetId);

// handleRenameSubmit now calls:
updateElement(editingElement, { name: editingName.trim() });
```

**Changes Made to oneStore.ts:**
```typescript
// Added new action:
reorderElements: (elementId: string, targetId: string) => void;

// Implementation swaps z-index values between elements
```

**Changes Made to App.tsx:**
```typescript
// Removed 5 LayerTree handler functions:
- handleLayerTreeSelect
- handleVisibilityToggle  
- handleLockToggle
- handleReorder
- handleRename

// Removed handlers from enhancedAppState:
- onLayerTreeSelect
- onVisibilityToggle
- onLockToggle
- onReorder
- onRename
```

### ✅ Phase 8: ONE-CONNECT Integration
**Status:** COMPLETE (2025-09-13)

**Changes Made:**
1. **Updated component registration:**
   - Removed old appState prop mapping
   - Component now receives data through ONE-CONNECT data props
   - Removed callback props - component uses stores directly

2. **Updated LayerTree component:**
   - Removed all props except className and presetClassMap
   - Component gets elements directly from oneStore
   - All callbacks replaced with direct store actions
   - No more event dispatching - pure store updates

3. **Added missing store method:**
   - Added `getElementStyle(id, property)` to oneStore
   - Required by editors data-actions in theme

### 🔴 Phase 9: Performance & Cleanup
**Status:** FUTURE (styling refactor)
- Extract drag & drop to custom hook
- Extract rename logic to custom hook
- Memoize buildTree function
- Add React.memo to LayerTreeItem
- Move styles to CSS modules

---

## Architecture Evolution

### Current:
```
App.tsx (props & events)
    ↓
LayerTree (local state + props)
    ↓
LayerTreeItem (props only)
```

### Target:
```
Zustand Stores
    ↓
LayerTree (direct store access)
    ↓
LayerTreeItem (optimized props)
```

---

## Code Changes Needed

### 1. TypeScript Improvements
```typescript
// Add to types/layertree.types.ts:
import { ElementStyle, ElementContent } from '../directRenderer.types';

interface Element {
  // ... existing
  content?: ElementContent;
  style: ElementStyle;
}
```

### 2. State Migration
```typescript
// Instead of:
const [hiddenElements, setHiddenElements] = useState(new Set());

// Use:
const { hiddenElements, toggleElementVisibility } = useOneStore();
```

### 3. Add to Stores
```typescript
// uiStore additions:
layerTreeExpandedGroups: Set<string>;
setLayerTreeExpandedGroups: (groups: Set<string>) => void;
editingElementId: string | null;
setEditingElementId: (id: string | null) => void;

// oneStore additions:
reorderElements: (elementId: string, newIndex: number) => void;
```

### 4. Event Replacement
```typescript
// Before:
onSelect?.(element.id, event.shiftKey || event.metaKey);

// After:
if (event.shiftKey || event.metaKey) {
  // Multi-select
  const newSelection = selectedElementIds.includes(element.id)
    ? selectedElementIds.filter(id => id !== element.id)
    : [...selectedElementIds, element.id];
  setSelectedElements(newSelection);
} else {
  setSelectedElement(element.id);
}
```

---

## Migration Steps for Next Agent

### Step 1: Fix TypeScript (Quick Win)
1. Import proper types from directRenderer.types.ts
2. Replace the 2 `any` types
3. Ensure all functions have return types

### Step 2: Add Missing Store Properties
1. Add expandedGroups to uiStore
2. Add editingElementId to uiStore
3. Add reorderElements to oneStore

### Step 3: Update LayerTree.tsx
1. Remove local state declarations
2. Add store hooks at top
3. Update all state references
4. Remove prop callbacks

### Step 4: Update Event Handlers
1. Replace onSelect with direct store calls
2. Replace visibility/lock handlers
3. Update drag & drop to use store action
4. Update rename to use store action

### Step 5: Update Parent (App.tsx)
1. Remove LayerTree event listeners
2. Remove props that are now in stores
3. Simplify LayerTree usage

### Step 6: Optimize
1. Add React.memo to LayerTreeItem
2. Memoize buildTree with useMemo
3. Extract complex logic to hooks

---

## Dependencies

Components affected by LayerTree changes:
- **App.tsx** - Currently provides props and listens to events
- **DirectRenderer** - Shares selection state
- **oneStore** - Needs reorderElements action
- **uiStore** - Needs layer tree specific state

---

## Success Metrics

- [x] Zero `any` types ✅
- [x] Zero local state for shared data ✅
- [x] Zero custom events ✅
- [x] Direct store integration ✅
- [x] ONE-CONNECT compatible ✅
- [ ] Reduced re-renders (Phase 9)
- [x] Cleaner parent component ✅

---

## File Size Targets

| File | Current | Target |
|------|---------|--------|
| LayerTree.tsx | 496 lines | 350 lines |
| LayerTreeItem.tsx | 156 lines | 150 lines |
| Custom hooks | 0 | ~100 lines |
| Total | 660 lines | ~600 lines |

---

*LayerTree V2: From event-driven to store-powered!*