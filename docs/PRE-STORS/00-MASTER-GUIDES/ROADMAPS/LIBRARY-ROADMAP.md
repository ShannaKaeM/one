# Library Component Evolution V2

## Overview
Library has undergone significant refactoring (Phase 1-3 complete). Now it needs Zustand state migration to complete its transformation to a fully independent component.

---

## Current State Analysis

### File Structure
```
LIBRARY/
├── Library.tsx (1,169 lines - main component)
├── LibraryHeader.tsx (component)
├── LibraryUpload.tsx (component)
├── LibraryGrid.tsx (component)
├── LibraryManager.tsx (component)
├── BulkEditModal.tsx (component)
└── ItemEditModal.tsx (component)
Total: ~1,500 lines across 7 files
```

### Completed Improvements (Phase 1-3)
- ✅ 7 child components extracted
- ✅ Collections system removed
- ✅ TypeScript types defined (mostly)
- ✅ 26% size reduction achieved

### Issues Found in New Audit
- **13 local states** that should be in Zustand
- **1 `any` type** in library.types.ts
- **1 event listener** for cross-component communication
- **Props dependency** on App.tsx
- **Style injection** via useEffect

---

## Phase Progress

### ✅ Previous Phases (1-3) Complete
See original roadmap for details

### ✅ Phase 4: Complete TypeScript Fix
**Status:** COMPLETE (already fixed)

**Fixed `any` type in library.types.ts:**
```typescript
// Was:
element?: any;

// Now:
element?: CanvasElement; // Imported from directRenderer.types.ts
```

### ✅ Phase 5: Create Library Store
**Status:** COMPLETE (libraryStore.ts exists and is being used)

**Create `/src/stores/libraryStore.ts`:**
```typescript
interface LibraryStore {
  // Main data
  items: LibraryItem[];
  availableLibraries: string[];
  
  // Filter/selection state
  selectedLibraries: string[];
  selectedItems: Set<string>;
  
  // Loading state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setItems: (items: LibraryItem[]) => void;
  addItem: (item: LibraryItem) => void;
  updateItem: (id: string, updates: Partial<LibraryItem>) => void;
  deleteItems: (ids: string[]) => void;
  
  // Library management
  setAvailableLibraries: (libraries: string[]) => void;
  addLibrary: (name: string) => void;
  renameLibrary: (oldName: string, newName: string) => void;
  deleteLibrary: (name: string) => void;
  
  // Selection
  setSelectedLibraries: (libraries: string[]) => void;
  toggleLibraryFilter: (library: string) => void;
  setSelectedItems: (items: Set<string>) => void;
  toggleItemSelection: (id: string) => void;
  selectAll: () => void;
  selectNone: () => void;
  
  // Loading
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

### ✅ Phase 6: State Migration to Zustand
**Status:** COMPLETE (Library.tsx already uses useLibraryStore)

**States to Migrate:**
| Local State | Store Location | Notes |
|-------------|----------------|--------|
| libraryItems | libraryStore | Main data |
| availableLibraries | libraryStore | All library names |
| selectedLibraries | libraryStore | Active filters |
| selectedItems | libraryStore | Selection tracking |
| isLoading | libraryStore | Loading state |
| showUploadModal | Keep local | Temp UI state |
| pendingFiles | Keep local | Temp upload data |
| uploadLibraries | Keep local | Temp form state |
| showLibraryManager | Keep local | Temp UI state |
| editingLibrary | Keep local | Temp form state |
| newLibraryName | Keep local | Temp form state |
| editingItem | Keep local | Temp UI state |
| showBulkEdit | Keep local | Temp UI state |
| bulkLibraries | Keep local | Temp form state |
| lastSelectedIndex | Keep local | Temp UI state |

### ✅ Phase 7: Event System Replacement
**Status:** COMPLETE (2025-09-13)

**Events Replaced:**
- ✅ Removed `library-item-added` listener (was never used)
- ✅ Removed `library-item-saved` listener from Library.tsx
- ✅ DirectRenderer now calls `libraryStore.addItem()` directly
- ✅ DirectRenderer imports and uses `useLibraryStore`

**Changes Made:**
```typescript
// DirectRenderer.tsx
import { useLibraryStore } from '../../stores/libraryStore';

const { addItem: addLibraryItem, addLibrary } = useLibraryStore();

// In SaveModal onSave:
onSave={(savedItem, newLibraries) => {
  // Add item to library store
  addLibraryItem(savedItem);
  
  // Add any new libraries to the store
  newLibraries.forEach(lib => addLibrary(lib));
}}
```

### ✅ Phase 8: ONE-CONNECT Integration
**Status:** COMPLETE (2025-09-13)

**Changes Made:**
1. **Updated component registration:**
   - Removed onAddToCanvas prop mapping
   - Component now pure with only className and presetClassMap props
   - ONE-CONNECT handles data flow

2. **Updated Library component:**
   - Removed onAddToCanvas prop from function signature
   - Removed prop from LibraryGrid pass-through
   - Library already uses libraryStore directly

3. **Updated LibraryGrid component:**
   - Added direct oneStore integration
   - Double-click now creates element and adds directly to canvas
   - No more prop dependency for adding to canvas
   - Drag data still set for DirectRenderer compatibility

4. **Updated types:**
   - Removed onAddToCanvas from LibraryProps
   - Removed onAddToCanvas from LibraryGridProps

### 🔴 Phase 9: Component Splitting
**Status:** FUTURE (wait for styling phase)

Current Library.tsx is still 1,169 lines. Extract:
- Filter section → LibraryFilters.tsx
- Upload logic → Move to LibraryUpload.tsx
- Item management logic → Custom hooks
- Style definitions → CSS modules

---

## Architecture Evolution

### Current:
```
App.tsx (provides onAddToCanvas)
    ↓
Library (13 local states)
    ↓
Child Components (props)
```

### Target:
```
Zustand libraryStore
    ↓
Library (minimal local UI state)
    ↓
Child Components (store access)
```

---

## Code Changes Needed

### 1. Fix TypeScript
```typescript
// library.types.ts
import { CanvasElement } from '../directRenderer.types';

export interface LibraryItem {
  // ... existing
  data?: {
    element?: CanvasElement; // Was any
    // ... rest
  };
}
```

### 2. Create Library Store
```typescript
// New file: /src/stores/libraryStore.ts
import { create } from 'zustand';
import { LibraryItem } from '../types/library.types';

interface LibraryStore {
  // ... interface from Phase 5
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  // Initial state
  items: [],
  availableLibraries: ['All Items'],
  selectedLibraries: [],
  selectedItems: new Set(),
  isLoading: false,
  error: null,
  
  // Actions implementation...
}));
```

### 3. Update Library Component
```typescript
// Instead of:
const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);

// Use:
const { 
  items, 
  selectedLibraries, 
  setItems,
  toggleLibraryFilter 
} = useLibraryStore();
```

### 4. Remove Event Listener
```typescript
// Remove:
window.addEventListener('library-item-added', handleLibraryItemAdded);

// Components that save to library should instead:
import { useLibraryStore } from '../stores/libraryStore';
const { addItem } = useLibraryStore();
// Then call addItem() directly
```

---

## Migration Steps for Next Agent

### Step 1: Fix TypeScript (Quick Win)
1. Import CanvasElement type
2. Replace the `any` type
3. Verify no other `any` types

### Step 2: Create Library Store
1. Create libraryStore.ts with full interface
2. Implement all actions
3. Add subscriptions if needed

### Step 3: Update Library.tsx
1. Import useLibraryStore
2. Replace useState calls for shared state
3. Update all state references
4. Keep only temp UI states local

### Step 4: Update Child Components
1. Pass store hooks where needed
2. Remove unnecessary props
3. Update callbacks to use store actions

### Step 5: Integration Updates
1. Find components that dispatch 'library-item-added'
2. Update them to use libraryStore.addItem()
3. Remove event listener from Library

### Step 6: Test & Verify
1. Test filtering works
2. Test selection works
3. Test upload/save works
4. Test management features

---

## Dependencies

Components affected by Library changes:
- **DirectRenderer** - Saves elements to library
- **App.tsx** - Currently provides onAddToCanvas callback
- **r2Manager** - Handles R2 storage operations

---

## Success Metrics

- [x] Zero `any` types ✅ (Phase 4 complete)
- [x] Core state in Zustand store ✅ (Phase 5-6 complete)
- [x] No event listeners/dispatches ✅ (Phase 7 complete)
- [x] Direct store integration ✅ (Phase 6 complete)
- [x] ONE-CONNECT compatible ✅ (Phase 8 complete)
- [ ] Child components simplified (Phase 9 - wait for styling)
- [x] Independent from App.tsx ✅ (Phase 8 complete)

---

## File Size Targets

| File | Current | Target |
|------|---------|--------|
| Library.tsx | 1,169 lines | 500 lines |
| libraryStore.ts | 0 | ~200 lines |
| LibraryFilters.tsx | 0 | ~150 lines |
| Custom hooks | 0 | ~200 lines |
| Total | ~1,500 lines | ~1,500 lines |

---

## Notes

- Keep upload flow states local (temporary UI state)
- Keep modal states local (temporary UI state)
- r2Manager integration stays as-is
- onAddToCanvas will need different approach (maybe store action)

---

*Library V2: From prop-driven to store-powered!*