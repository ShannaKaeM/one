# 🎯 Refactor Goals & Development Notes

## Core Vision: Elements as Layers

### The Concept
- **Every element IS a layer** - no internal layers needed
- **Group elements** = Proper nested HTML structure  
- **Flatten group** = Visual layers (like Photoshop flatten)
- **Power:** Layer ANYTHING - images, text, shapes, effects

### Workflow Vision
1. **Create** individual elements (image, text, overlay)
2. **Arrange** them visually (drag, resize, z-order)
3. **Group** for organization (maintains structure)
4. **Flatten** for visual effect (becomes single unit)
5. **Unflatten** to edit individual pieces again

### Group vs Flatten
- **Groups:** Nested HTML, maintains element independence
- **Flatten:** Visual merge, acts as single layer
- **Both:** Can be saved to library and reused

### Library Save Strategy  
- **Flatten (zip)** elements before saving
- **Unzip** when adding back to canvas
- Preserves editability while optimizing storage

---

## Notes During Refactor

### Phase 1 - Removing Legacy Code ✅
- **Layer System:** Removed old internal layer handlers
- **Hydration:** Removed element hydration logic
- **COMPLETED:** 
  - Removed 2 event handlers (handleAddLayer, handleAddText, handleAddImage)  
  - Removed hydration logic (was trying to fill empty elements on drop)
  - Removed dropTarget checking
- **Lines removed:** ~140 lines total
- **KEPT:** Inline text editor (blue outline) - has issues, see TODO
- **Benefit:** Drag & drop now always creates new elements (simpler)

### Phase 2 - Hardcoded Values ✅
- **Created:** `calculateElementZIndex()` function
- **Replaced:** 4 duplicate z-index calculations  
- **Stays in DR:** Z-index math, position calculations
- **Rule:** Complex functions in React, visual styles in theme

### Phase 3 - Element Structure ✅
- **Fixed:** type: 'group' → type: 'one'
- **Deferred:** contentType cleanup (too complex)

### TODO Later: ContentType Cleanup
- **Current:** Uses contentType to determine rendering
- **Problem:** Duplicates what structureName should do
- **Found:** 10+ references throughout rendering logic
- **Risk:** High - affects core rendering

### TODO: Text Editor Replacement
- **Current:** Inline contenteditable with blue outline
- **Issues:** 
  - References old layer system (but has fallback)
  - Bug: Can't click handles after editing
  - Hardcoded styles (blue outline, 2px solid #2196F3)
- **Plan:** Build fresh text editor in Phase 5 (Helper Modules)
- **Design:** TBD - fresh approach without legacy code

### Phase 4 - State Management ✅
- **Added:** Zustand for state management
- **Created:** Two stores:
  - `oneStore.ts` - Element data and selection
  - `uiStore.ts` - UI state (grid, snap, layout, theme)
- **Implementation:** Minimal sync approach
  - DirectRenderer keeps local state (no breaking changes)
  - Elements sync TO store on every update
  - Other components can READ from store
  
### Implementation Details
- **What changed:**
  - Added `import { useOneStore } from '../stores/oneStore'`
  - Added `const { setElements: syncToStore } = useOneStore()`
  - Added `syncToStore(newElements)` in updateElements function
- **What stayed same:**
  - All existing state management
  - All event dispatching
  - All props and interfaces
- **Result:** Zero breaking changes, store ready for other components

### Migration Strategy
1. **Current:** DirectRenderer syncs TO store only
2. **Next:** New components READ from store
3. **Later:** Gradually move DirectRenderer to use store
4. **Future:** Remove local state when all components migrated

### TODO: Complete State Migration Later
- **Elements:** Move from local state to store completely
- **Selection:** Move selectedElementId/Ids to store
- **UI State:** Move appState to uiStore
- **Benefits:** 
  - Single source of truth
  - Better performance (less prop drilling)
  - Easier testing

### Phase 5 - Helper Modules ✅
- **Created:** Two helper modules to extract logic from DirectRenderer
  - `elementFactory.ts` - Element creation and z-index calculation
  - `elementActions.ts` - Group, ungroup, duplicate, delete operations
- **Replaced in DirectRenderer:**
  - Removed local `calculateElementZIndex()` function
  - Updated element creation to use `createElement()` helper
  - Updated grouping to use `groupElements()` helper
  - Updated ungrouping to use `ungroupElements()` helper
  - Updated deletion to use `deleteElements()` helper (handles group children)
- **Benefits:**
  - Reduced DirectRenderer complexity
  - Reusable element operations
  - Consistent element creation
  - Better separation of concerns

### TODO: Complete Helper Migration
- Extract duplicate element logic when found
- Extract element movement logic
- Extract z-index ordering operations
- Consider extracting drag-and-drop handlers

### ID Generator Issues & Cleanup Plan 🔧
**Current Problems:**
1. **Missing Import:** elementFactory/Actions importing non-existent `idGenerator.ts`
2. **Duplicate ID Logic:** 
   - DirectRenderer: `${type}-${Date.now()}`
   - storageManager: `project-${Date.now()}-${Math.random()...}`
   - autoIdHelper: `${type}-${timestamp}-${randomStr}` (the good one)
3. **Inconsistent Usage:** Some places use autoIdHelper, others use inline generation

**Why autoIdHelper is Important:**
- **Grid Assignment:** a, b, c... z, aa, ab... (critical for layout switcher!)
- **ID Mapping:** Tracks replacements for complex operations
- **Consistent Format:** All IDs follow same pattern
- **Collision Prevention:** Timestamp + random = very unique

**Cleanup Plan:**
1. ✅ Quick Fix: Created idGenerator.ts wrapper (just did this!)
2. **Next:** Remove duplicate ID generation in storageManager
3. **Next:** Ensure ALL components use central ID generation
4. **Future:** Add ID validation/debugging tools
5. **Consider:** ID recycling for deleted elements?

### Next Major Goals
1. **State & Helper Organization:** Comprehensive review of new stores + helpers
2. **Group/Flatten System:** Expand using new helper structure
3. **Library Save:** Implement "save as flattened group" feature
4. **Clean Architecture:** Organize all utils/helpers/stores properly

### Phase 6 - Split DirectRenderer ✅ (Step 6.1 Complete)
- **Step 6.1: Extract Event Handlers** ✅
  - Created `useElementHandlers.ts` hook
  - Moved 25 event listeners from DirectRenderer
  - Organized handlers by category:
    - Element creation (add-one-element, click-to-place)
    - Grouping (group, ungroup)
    - Modifications (move, resize, delete, duplicate)
    - Properties (rename, visibility, lock, reorder)
    - Text/Media (select, upload)
    - Presets (apply, remove)
    - Import/Export (save to library, import content)
    - UI Actions (JTR actions, grid, snap, popup)
    - Keyboard shortcuts (Delete, Cmd+D, Cmd+G)
  - DirectRenderer reduced by ~1000 lines!
  
**Benefits of Event Hook:**
- Single place for all event logic
- Easier to test event handlers
- Reusable in other components
- Clear event categories

### Phase 6.2 - Extract Modals ✅
- **Created modal components:**
  - `LibraryModal.tsx` - Image selection from library
  - `SaveModal.tsx` - Save items to library with library selection
- **Benefits:**
  - Removed ~300 lines from DirectRenderer
  - Reusable modal components
  - Cleaner separation of concerns
  - DirectRenderer now ~1700 lines (down from 3000+!)

### Phase 6.3 - Extract Rendering Logic ✅
- **Created `elementRenderer.ts` utility with:**
  - `generateDirectHTML()` - Main rendering function
  - `generateElementFromStructure()` - Theme structure rendering
  - `generateElementHTML()` - Base HTML generation
  - `findPresetInTheme()` - Preset lookup helper
  - `kebabCase()` - CSS property converter
- **Benefits:**
  - Removed ~400 lines from DirectRenderer
  - Reusable rendering logic
  - Pure functions for testing
  - DirectRenderer now ~1200 lines (down from 3000+!)

**Phase 6 Complete! 🎉**
- Total reduction: 1800+ lines removed from DirectRenderer
- Created: 1 hook, 2 modal components, 1 rendering utility
- DirectRenderer is now 60% smaller and much cleaner!

### Future Implementation Ideas
- Flatten = CSS layers or canvas rendering?
- Group nesting limits?
- Performance with many flattened groups?

---

*This file will grow as we refactor and discuss goals*