# DirectRenderer State Migration Plan

## Current Local States Analysis

### 🔴 States to Move to oneStore (Canvas/Element related)
1. **elements** - The main canvas elements array
2. **selectedElementId** - Currently selected element
3. **selectedElementIds** - Multiple selected elements
4. **hiddenElements** - Set of hidden element IDs
5. **lockedElements** - Set of locked element IDs
6. **selectedElementObj** - DOM element reference (may not need in store)

### 🟡 States to Move to uiStore (UI/View related)
1. **showLibraryModal** - Library modal visibility
2. **showSaveModal** - Save modal visibility
3. **showPopup** - Element popup visibility
4. **isPlacingElement** - Canvas placement mode
5. **placingPreset** - Which preset is being placed
6. **editingElementId** - Which element is being edited inline

### 🟢 States that Stay Local (Component-specific)
1. **htmlContent** - Generated HTML (render output)
2. **isLoading** - Loading state for render
3. **rectUpdateTrigger** - Internal render trigger
4. **popupPosition** - Popup coordinates
5. **editText** - Temporary edit text
6. **modalTargetElement** - Temporary modal data
7. **saveModalData** - Temporary save data
8. **availableLibraries** - Loaded library list
9. **libraryItems** - Loaded library items

## Migration Order

### Step 1: Update oneStore
Add missing states and actions to oneStore:
- hiddenElements Set
- lockedElements Set
- toggleElementVisibility action
- toggleElementLock action
- setElements action (already exists)
- setSelectedElement action (already exists)
- setSelectedElements action (already exists)

### Step 2: Update uiStore
Add modal and placement states:
- showLibraryModal
- showSaveModal
- showElementPopup
- isPlacingElement
- placingPreset
- editingElementId
- Actions to toggle these states

### Step 3: Update DirectRenderer
1. Remove useState declarations
2. Use store hooks to get values
3. Use store actions instead of setState
4. Keep local states that are component-specific

### Step 4: Update Child Components
Ensure child components also use stores instead of props for these values

## Code Changes Preview

### oneStore additions:
```typescript
interface ElementStore {
  // ... existing
  hiddenElements: Set<string>;
  lockedElements: Set<string>;
  
  toggleElementVisibility: (id: string) => void;
  toggleElementLock: (id: string) => void;
  hideElements: (ids: string[]) => void;
  showElements: (ids: string[]) => void;
  lockElements: (ids: string[]) => void;
  unlockElements: (ids: string[]) => void;
}
```

### uiStore additions:
```typescript
interface UIStore {
  // ... existing
  showLibraryModal: boolean;
  showSaveModal: boolean;
  showElementPopup: boolean;
  isPlacingElement: boolean;
  placingPreset: string;
  editingElementId: string | null;
  
  setShowLibraryModal: (show: boolean) => void;
  setShowSaveModal: (show: boolean) => void;
  setShowElementPopup: (show: boolean) => void;
  setIsPlacingElement: (placing: boolean) => void;
  setPlacingPreset: (preset: string) => void;
  setEditingElementId: (id: string | null) => void;
}
```

### DirectRenderer usage:
```typescript
// Instead of:
const [elements, setLocalElements] = useState<CanvasElement[]>(externalElements);

// Use:
const { elements, setElements } = useOneStore();
const { showLibraryModal, setShowLibraryModal } = useUIStore();
```