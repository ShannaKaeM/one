# UI Unification Roadmap

## Overview
Comprehensive plan to unify styling, components, types, and patterns across the entire Studio1 codebase, aligning with the UI-DESIGN vision for a cohesive design system.

---

## Current State Analysis

### What We Have
- **12 icons** in icons.tsx (extracted from LayerTree & CanvasControls)
- **2 Zustand stores** (uiStore, oneStore)
- **Mixed type definitions** scattered across components
- **Inline styles** throughout components
- **Event-driven communication** via custom events
- **Local state** in most components

### What Needs Unification
- **~20 more inline SVG icons** across components
- **Repeated style patterns** (buttons, containers, modals)
- **Duplicate type definitions** for elements, styles, events
- **Common hooks patterns** (event listeners, click outside)
- **Inconsistent state management** approaches

---

## Phase 1: Foundation (Weeks 1-2)

### 1.1 Complete Icons System
**Goal:** Extract all inline SVGs to centralized icons.tsx

**New Icons to Extract:**
- `ThreeDotsIcon` - menu dots (SelectionActionButton)
- `GroupIcon` - group elements (ElementPopup)
- `UngroupIcon` - ungroup elements (ElementPopup)
- `DuplicateIcon` - duplicate/copy (ElementPopup)
- `DeleteIcon` - trash/delete (ElementPopup)
- `SaveIcon` - save to library (ElementPopup)
- `TextIcon` - text element (ElementPopup)
- `ImageIcon` - image element (ElementPopup)
- Plus any in Library components

**Structure:**
```
src/utils/icons.tsx (all 30+ icons)
```

### 1.2 Unified Type System
**Goal:** Single source of truth for all types

**New Structure:**
```
src/types/
├── element.types.ts      # Element, TreeNode, CanvasElement
├── style.types.ts       # StylePreset, ThemeVariables
├── event.types.ts       # CustomEventMap, EventPayloads
├── ui.types.ts          # UIState, ModalState, SelectionState
├── component.types.ts   # Shared component prop types
└── index.ts             # Central exports
```

### 1.3 Core Hooks Library
**Goal:** Extract common patterns into reusable hooks

**Essential Hooks:**
```
src/hooks/
├── useEventListener.ts   # Clean event setup/teardown
├── useCustomEvent.ts     # Type-safe custom events
├── useClickOutside.ts    # Detect outside clicks
├── useKeyboard.ts        # Keyboard shortcuts
└── index.ts             
```

### 1.4 Style Constants
**Goal:** Implement design system values

**Structure:**
```
src/styles/constants/
├── colors.ts            # HSL color system
├── spacing.ts           # 4px base unit system
├── typography.ts        # Font sizes, weights
├── shadows.ts           # Elevation system
├── transitions.ts       # Animation timings
└── index.ts
```

---

## Phase 2: Integration (Weeks 3-4)

### 2.1 Style Presets System
**Goal:** Reusable style objects matching UI patterns

**Preset Categories:**
```
src/styles/presets/
├── buttons.ts
│   ├── defaultButton
│   ├── primaryButton
│   ├── ghostButton
│   └── iconButton
├── containers.ts
│   ├── panel
│   ├── card
│   └── section
├── forms.ts
│   ├── textInput
│   ├── select
│   └── checkbox
├── states.ts
│   ├── hover
│   ├── active
│   ├── disabled
│   └── focus
└── index.ts
```

### 2.2 Event System Unification
**Goal:** Type-safe, centralized event management

**Structure:**
```
src/events/
├── constants.ts         # Event name constants
├── types.ts            # Event payload interfaces
├── EventBus.ts         # Event dispatcher class
└── useEventBus.ts      # React hook for events
```

**Event Categories:**
- Element events: `ELEMENT_*`
- UI events: `UI_*`
- Canvas events: `CANVAS_*`
- Library events: `LIBRARY_*`

### 2.3 Additional Stores
**Goal:** Centralize related state

**New Stores:**
```
src/stores/
├── modalStore.ts
│   ├── activeModal
│   ├── modalData
│   └── modalActions
├── selectionStore.ts
│   ├── selectedIds
│   ├── selectionMode
│   └── selectionActions
└── editorStore.ts
    ├── activeProperty
    ├── editorValues
    └── editorActions
```

### 2.4 Common Components
**Goal:** Reusable UI building blocks

**Components:**
```
src/components/common/
├── BaseModal/
│   ├── BaseModal.tsx
│   └── types.ts
├── ControlGroup/
│   ├── ControlGroup.tsx
│   └── ControlButton.tsx
├── IconButton/
│   └── IconButton.tsx
├── ListItem/
│   └── ListItem.tsx
└── index.ts
```

---

## Phase 3: Migration (Weeks 5-6)

### 3.1 Component Updates
**Priority Order:**
1. **CanvasControls** - Apply button presets
2. **LayerTree** - Use common ListItem
3. **ElementPopup** - Extract icons, use BaseModal
4. **Editors** - Apply form presets
5. **Library** - Full unification

### 3.2 Style Migration
**Process:**
1. Replace inline styles with preset imports
2. Use style constants for values
3. Apply consistent hover/active states
4. Implement transitions from constants

### 3.3 Type Migration
**Process:**
1. Update imports to use centralized types
2. Remove local type definitions
3. Fix TypeScript errors with proper types
4. Add missing type coverage

---

## Phase 4: Polish (Week 7)

### 4.1 Documentation
- Component style guide
- Hook usage examples
- Event system guide
- Type definition guide

### 4.2 Testing
- Verify all icons render
- Test event propagation
- Validate type safety
- Check style consistency

### 4.3 Optimization
- Remove dead code
- Consolidate duplicates
- Performance audit
- Bundle size check

---

## Success Metrics

### Code Quality
- ✅ Zero inline SVGs
- ✅ No duplicate type definitions
- ✅ Consistent style application
- ✅ 100% TypeScript coverage

### Maintainability
- ✅ Single source for each concern
- ✅ Clear import paths
- ✅ Documented patterns
- ✅ Reduced file sizes

### Developer Experience
- ✅ Autocomplete for all icons
- ✅ Type-safe events
- ✅ Reusable style presets
- ✅ Common hooks library

---

## Implementation Guidelines

### File Naming
- Constants: `UPPER_SNAKE_CASE`
- Types: `PascalCase` with `.types.ts`
- Hooks: `camelCase` starting with `use`
- Components: `PascalCase`

### Import Order
1. External libraries
2. Types
3. Stores
4. Hooks
5. Components
6. Styles
7. Utils

### Style Approach
- Use style objects, not CSS files
- Compose presets for variants
- Keep responsive logic centralized
- Use CSS variables for themes

---

## Quick Wins (Do First!)

1. **Extract ThreeDotsIcon** - Used in multiple places
2. **Create useEventListener** - Immediately useful
3. **Define Element interface** - Fix type errors
4. **Create button presets** - Visual consistency

---

## Long-term Vision

This unification sets the foundation for:
- **Preset-based component system** (from UIConnect roadmap)
- **Theme switching** without component changes
- **Fully composable UI** elements
- **Mathematical modifiers** for hover/active states
- **Zero hardcoded styles** in components

---

*Start with Phase 1 foundations, iterate based on learnings, aim for complete unification by Phase 4.*