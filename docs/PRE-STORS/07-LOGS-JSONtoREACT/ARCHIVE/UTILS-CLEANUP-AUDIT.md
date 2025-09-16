# Utils Cleanup Audit & Recommendations

Based on our ROADMAP.md and current architecture (BOX elements with ONE class), here's the audit of existing utils:

## ✅ KEEP AS-IS
These align perfectly with our roadmap:

### 1. `autoIdHelper.ts` ✅
- **Status**: KEEP & ENHANCE
- **Why**: Core to our JSONtoREACT system
- **Enhancements Needed**:
  - Add support for group element detection
  - Add auto-split logic for mixed content (text + media)
  - Update to handle `class="one group"` and `class="one zip-group"`

### 2. `presetManager.ts` ✅
- **Status**: KEEP
- **Why**: Aligns with our preset system for styling BOX elements
- **Note**: Already handles CSS variable toggling which is perfect for our architecture

### 3. `storageManager.ts` ✅
- **Status**: KEEP
- **Why**: Essential for project persistence
- **Note**: Good integration with R2 for images

### 4. `r2Manager.ts` ✅
- **Status**: KEEP
- **Why**: Handles all media uploads (essential for our media layers)
- **Note**: Perfect for our no-background-image approach (separate media layers)

---

## ⚠️ NEEDS REFACTORING

### 1. `fileConverter.ts` ⚠️
- **Status**: REFACTOR
- **Issues**:
  - Using old "one" element type instead of BOX
  - Not aligned with our BOX/ONE naming convention
  - Complex layer system doesn't match our simple group approach
- **Recommendation**: 
  ```typescript
  // Current (wrong):
  type: 'one',
  content: { layers: [...] }
  
  // Should be:
  type: 'box',
  class: 'one',
  children: [...]
  ```
- **Action**: Update to generate BOX elements with proper class structure

### 2. `guardianDocConverter.ts` ⚠️
- **Status**: REFACTOR or ARCHIVE
- **Issues**:
  - Uses `type: 'wrapper'` instead of `type: 'box'`
  - Complex metadata structure not in roadmap
  - Guardian concept not mentioned in current plans
- **Recommendation**: 
  - If Guardian docs are needed, refactor to use BOX elements
  - Otherwise, archive this file

---

## 🗄️ CONSIDER ARCHIVING

### `guardianDocConverter.ts`
- Not mentioned in ROADMAP
- Uses outdated element structure
- **Decision**: Archive unless Guardian docs are critical to current phase

---

## 📝 NEW UTILS NEEDED

Based on our ROADMAP Phase 1 (Group System), we need:

### 1. `groupHelper.ts` (NEW)
```typescript
// Handles group operations
class GroupHelper {
  // Detect mixed content (text + media)
  detectMixedContent(element: any): boolean
  
  // Auto-split into group
  autoSplitElement(element: any): any
  
  // Flatten/unflatten groups
  flattenGroup(group: any): any
  unflattenGroup(element: any): any
  
  // Check if element is a group
  isGroup(element: any): boolean
  
  // Apply zip-group for export
  zipGroup(group: any): any
}
```

### 2. `gridHelper.ts` (NEW - for Phase 2)
```typescript
// Handle dashboard grid operations
class GridHelper {
  // Assign grid areas
  assignGridAreas(children: any[]): void
  
  // Generate grid template
  generateGridTemplate(layout: string): string
}
```

---

## 🔧 IMMEDIATE ACTIONS

1. **Update `autoIdHelper.ts`**:
   - Add group detection
   - Support auto-split pattern
   - Handle new class names

2. **Refactor `fileConverter.ts`**:
   - Change to BOX element structure
   - Remove layer system
   - Use children array instead

3. **Archive old files**:
   - Move `guardianDocConverter.ts` to archive (if not needed)
   - Move docs folder's `auto-id-helper.js` to archive

4. **Create `groupHelper.ts`**:
   - Implement auto-split logic
   - Handle group/ungroup operations
   - Support export modes

---

## SUMMARY

**Keep**: 4 utils (autoIdHelper, presetManager, storageManager, r2Manager)
**Refactor**: 1-2 utils (fileConverter, possibly guardianDocConverter)
**Archive**: 1-2 files (guardianDocConverter if unused, auto-id-helper.js from docs)
**Create**: 1-2 new utils (groupHelper now, gridHelper for Phase 2)

This keeps our utils lean, focused, and aligned with our ROADMAP goals.
