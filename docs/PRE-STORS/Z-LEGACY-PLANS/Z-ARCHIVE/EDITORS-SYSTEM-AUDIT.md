# Editors System Audit

**Date:** 2025-09-11  
**Component:** Editors.tsx  
**Current Size:** 520 lines

---

## Component Overview

Editors is a properties panel that displays categorized CSS variables from the ONE theme with:
- Accordion-style sections (one open at a time)
- Text input controls with local state
- Autocomplete suggestions for common CSS values
- Theme variable loading and categorization
- Real-time property updates

---

## Current Structure

### Stats
- **Lines:** 520
- **useState hooks:** 2
- **Inline styles:** 159 lines (31% of component)
- **Props:** 4 (selectedElement, onPropertyChange, className, presetClassMap)
- **TypeScript:** Partial (uses `any` for selectedElement)

### State Management
```typescript
const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
const [categorizedVariables, setCategorizedVariables] = useState<Record<string, any[]>>({});
```

### Features
1. **Theme Variable Loading**
   - Loads ONE theme variables
   - Groups by category
   - Dynamic sections

2. **Property Editing**
   - SimpleControl component (inline)
   - Local state management
   - Blur/Enter to commit

3. **Autocomplete System**
   - 245 lines of suggestions!
   - Keyboard navigation
   - Context-aware filtering

4. **UI Organization**
   - Category icons (emojis)
   - Accordion sections
   - Only one open at a time

---

## Refactoring Opportunities

### 1. **Extract Inline Styles** (High Priority)
- 159 lines of CSS in template string
- Move to separate CSS or styled components
- Use theme system

### 2. **Extract Autocomplete Data** (High Priority)
- 56 lines of autocomplete suggestions
- Move to separate data file
- Make extensible

### 3. **Extract SimpleControl Component** (High Priority)
- 75+ lines inline component
- Has its own state and logic
- Should be separate file

### 4. **TypeScript Improvements** (High Priority)
- Replace `any` with proper types
- Type selectedElement properly
- Add return types

### 5. **Extract Constants** (Medium Priority)
- categoryIcons mapping
- Move to separate constants file

### 6. **Remove Console Logs** (Medium Priority)
- 5 console.log statements
- Should use proper logging or remove

---

## Dependencies

### Imports
- React (useState, useEffect, useRef)
- runtimeThemeProcessor (theme loading)

### Integration Points
- Receives selectedElement from parent
- Calls onPropertyChange callback
- Loads theme variables dynamically

---

## Potential Issues

1. **Performance**
   - Recreates sections on every render
   - No memoization
   - Large autocomplete arrays

2. **TypeScript**
   - Uses `any` for critical props
   - Missing interfaces

3. **Hardcoded Values**
   - All autocomplete suggestions hardcoded
   - Category icons hardcoded
   - No extensibility

4. **State Management**
   - SimpleControl manages own state
   - Could lead to sync issues

---

## Refactor Plan

### Phase 1: Extract Data & Constants
1. Create `editorConstants.ts` for icons and categories
2. Create `autocompleteData.ts` for suggestions
3. Move all hardcoded data out

### Phase 2: Extract Components
1. Extract SimpleControl to separate file
2. Create EditorsHeader component
3. Create EditorsSection component

### Phase 3: TypeScript
1. Define proper interfaces
2. Type selectedElement correctly
3. Remove all `any` types

### Phase 4: Optimization
1. Memoize section generation
2. Add React.memo where appropriate
3. Optimize autocomplete filtering

---

## Expected Results

- **Size Reduction:** 520 → ~250 lines (52% reduction)
- **New Files:** 5-6 extracted files
- **Performance:** Better with memoization
- **Maintainability:** Much improved

---

## Magic Numbers Found

- `200px` - autocomplete max-height
- `200` - blur timeout (ms)
- Various pixel values in suggestions

---

*Ready for refactoring!*