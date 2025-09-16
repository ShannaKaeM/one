# Studio1 - Visual Builder Application

## What is Studio1?

**Studio1** is a visual design builder application that allows users to create web designs using the ONE system. 

### Two Theme System:
1. **UI Theme (ui-theme.json)** - Powers Studio1's interface (dogfooding)
   - The dashboard, layer tree, canvas, controls
   - Exports to React components
   - We use this to build Studio1 itself

2. **ONE Theme (one-theme.json)** - User's design output
   - What users create in the visual builder
   - Exports to HTML or other formats
   - The actual product users are building

Both themes use the same ONE system architecture but serve different purposes.

---

## Core Architecture (AS-BUILT)

### Naming Conventions
- **ONE BOX**: Everything is one box (the universal element)
- **ONE Variables**: The 100+ CSS variables (atoms)
- **Presets**: Style variations (color-looks, mathematical-hierarchy, component styles)
- **Data Labels**: Semantic identification without classes (data-label="layer-tree")

### File Structure
```
/src
  /components
    JSONtoREACT.tsx     - Dynamic component generator (JtoR)
  /utils
    autoIdHelper.ts     - Auto-generates unique IDs and grid areas
  /public/data/themes
    ui-theme.json       - Studio1 interface theme
    one-theme.json      - User design theme
```

### Current Implementation
- JSONtoREACT generator converts JSON to React components
- CSS variables system (100+ base variables - locked, never add more)
- Auto-ID generation helper created
- Grid system implemented in JtoR (needs testing with ui-theme.json)
- Utilities system implemented in JtoR (needs testing with ui-theme.json)
- Everything is display: grid by default
- No themes - direct values only (no primary/secondary, no sm/md/lg)

### ACTUAL Current Presets (AS-BUILT)
Only 3 types of presets exist:
1. **box** - Basic container (display: grid, width: 100%, height: 100vh, position: relative, overflow: hidden)
2. **grid layouts** - Grid configuration attempts (needs fixing)
3. **color presets** - Look variations (referenced but not fully defined)

### ONE BOX Philosophy
- ONE BOX = Everything (no separate concepts needed)
- ONE Variables + ONE BOX = Complete system
- Structural layouts use grid areas (a, b, c, d, e)
- UI Elements are generic/reusable (button, title, field, slider, etc.)
- No semantic components (no header, footer, sidebar - use grid areas)
- Flatten/unflatten for visual editing vs semantic export

---

## Grid System (AS-BUILT in JSONtoREACT)

### Grid Support Implemented
- Grid configuration via element.grid object
- Supports areas, cols, rows, gap via inline CSS variables
- Auto-assigns grid areas using autoIdHelper.getGridArea()
- Applied as inline styles (--grid-template-areas, etc.)

### Current Grid Usage
```json
{
  "type": "box",
  "grid": {
    "areas": "'a a a' 'b c d' 'e e e'",
    "cols": "200px 1fr 300px",
    "rows": "60px 1fr 40px",
    "gap": "0"
  }
}
```

### Auto Grid Area Assignment (AS-BUILT)
- Implemented in autoIdHelper
- Assigns a, b, c... automatically if not specified
- Currently works for manual use, visual builder integration pending

---

## Inline Utilities System (AS-BUILT in JSONtoREACT)

### Utilities Implementation
```json
{
  "type": "box",
  "utilities": {
    "overflow": "auto",
    "position": "absolute",
    "padding": "20px",
    "text-align": "center"
  }
}
```

### How It Works (AS-BUILT)
- Maps utility names to CSS variables (see mapUtilityToCSS in JtoR)
- Applied as inline styles
- Supports direct mappings: overflow, position, display, padding, margin, gap, etc.
- Text size shortcuts: xs, sm, md, lg, xl, 2xl, 3xl
- Mathematical calculations work (calc(), vw, etc.)

---

## Group System (IN PROGRESS)

### Auto-Split Pattern
When user adds both text + media to single BOX:
1. System auto-splits into two child BOX elements
2. Wraps in parent BOX with class="one group"
3. Children get class="one text" and class="one media"

### Group Classes
- `one group` - Standard group (renders flat, children accessible)
- `one zip-group` - Flattened for export (user toggle)

### Group Behavior
- Groups appear as single units in UI
- Click to "enter" group for child editing
- Parent properties cascade to children
- Export option to zip/flatten structure

### JSON Structure
```json
{
  "type": "box",
  "class": "one group",
  "data-label": "content-group",
  "children": [
    {
      "type": "box",
      "class": "one text",
      "content": "Text content"
    },
    {
      "type": "box",
      "class": "one media",
      "src": "image.jpg"
    }
  ]
}
```

---

## Flat Structure for Visual Editing (PLANNED)

### Core Concept
- Flatten nested boxes for visual editing
- Use absolute positioning during editing
- Convert positions to grid areas
- Unflatten for semantic HTML export

### Visual Builder Workflow
1. **Design Mode (Flat)**
   - All elements at root level
   - Absolute positioned by x, y
   - Visual drag/drop/resize
   - No nesting complexity

2. **Convert to Grid**
   - Analyze positions
   - Generate grid template
   - Assign grid areas
   - Maintain visual layout

3. **Export Mode (Nested)**
   - Proper semantic nesting
   - SEO-ready HTML
   - Maintains design intent

### Example Transformation
```javascript
// Visual (Flat)
[
  { id: "box1", x: 0, y: 0, width: 100%, height: 60 },
  { id: "box2", x: 0, y: 60, width: 200, height: calc(100% - 100) },
  { id: "box3", x: 200, y: 60, width: calc(100% - 500), height: calc(100% - 100) }
]

// Converted to Grid
{
  "--grid-areas": "'a a a' 'b c d' 'e e e'",
  "--grid-cols": "200px 1fr 300px",
  "--grid-rows": "60px 1fr 40px"
}
```

---

## Dashboard Layout (PLANNED)

### Grid Structure Using Inline Styles
```json
{
  "dashboard": {
    "type": "box",
    "data-label": "dashboard",
    "presets": ["box"],
    "style": {
      "--grid-areas": "'a a a' 'b c d' 'e e e'",
      "--grid-cols": "200px 1fr 300px",
      "--grid-rows": "60px 1fr 40px"
    },
    "children": [
      {
        "type": "box",
        "data-label": "header",
        "style": { "--grid-area": "a" }
      },
      {
        "type": "box",
        "data-label": "layer-tree",
        "style": { "--grid-area": "b", "--overflow": "auto" }
      },
      {
        "type": "box",
        "data-label": "canvas",
        "style": { "--grid-area": "c" }
      },
      {
        "type": "box",
        "data-label": "general-controls",
        "style": { "--grid-area": "d", "--overflow": "auto" }
      },
      {
        "type": "box",
        "data-label": "footer",
        "style": { "--grid-area": "e" }
      }
    ]
  }
}
```

### Grid Areas
- **a**: Header (full width)
- **b**: Left sidebar (layer tree)
- **c**: Main content (canvas)
- **d**: Right sidebar (controls)
- **e**: Footer (full width)

---

## Implementation Steps

### Phase 1: Group System (CURRENT)
- [ ] Update "one-element" to "one-box" throughout codebase:
  - [ ] JSONtoREACT.tsx - className references (3 instances)
  - [ ] DirectRenderer.tsx - event names 'add-one-element' (3 instances)
  - [ ] App.tsx - event dispatching 'add-one-element' (5 instances)
  - [ ] General.tsx - button text "Add ONE Element" → "Add ONE Box"
  - [ ] UIGenerator.tsx - any remaining references
- [ ] Create groupHelper.ts utility
- [ ] Update App.tsx element references from 'wrapper' to 'box'
- [ ] Consolidate three add element handlers into single smart handler
- [ ] Add group state properties to App.tsx (editingGroupId, groupEditMode, exportMode, zipGroups)
- [ ] Update JSONtoREACT to handle group elements
- [ ] Implement auto-split logic for mixed content
- [ ] Add group/ungroup UI controls
- [ ] Create cascade logic for parent→child properties

### Phase 2: Dashboard Layout
- [ ] Create gridHelper.ts utility
- [ ] Add grid support to JSONtoREACT
- [ ] Implement dashboard preset in ui-theme.json
- [ ] Create grid-area assignment system
- [ ] Test responsive grid behavior

### Phase 3: Export System
- [ ] Add zip-group toggle for export
- [ ] Implement flatten/unflatten logic
- [ ] Create export format options (nested vs flat)
- [ ] Handle media references in exports

---

## Technical Details

### Presets TO BE CREATED

#### shadcn Component Presets (PLANNED)
Need to adapt from shadcn patterns:
- **button**: Interactive element
- **title**: Large text (h1-like)
- **subtitle**: Medium text (h2-like)
- **label**: Small text
- **text**: Body text
- **field**: Input field
- **select**: Dropdown
- **radio**: Radio button
- **check**: Checkbox
- **slider**: Range slider
- **toggle**: Toggle switch

#### Layout Approach (PLANNED)
- Use inline styles for grid layouts
- Grid areas (a, b, c) assigned manually or auto-generated
- No preset classes for layouts - all inline CSS variables

#### Canvas-Specific Presets (PLANNED)
- **canvas**: Container with overflow hidden
- **canvas-element**: Absolute positioned
- **grid-overlay**: Visual grid background
- **selection-box**: Border for selected elements
- **handle**: Resize handles (+ 8 position modifiers: nw, n, ne, e, se, s, sw, w)

#### State Presets (PLANNED)
- **hover**: Opacity changes
- **active**: Visual feedback
- **selected**: Highlight state
- **disabled**: Reduced opacity, no pointer events

### JSONtoREACT Updates Needed
1. Detect mixed content (text + media)
2. Auto-create group wrapper
3. Handle group class variations
4. Support grid properties
5. Process children recursively
6. Apply inline utilities
7. Auto-generate grid areas

### New Utils Required
- **groupHelper.ts** - Handles auto-split, flatten/unflatten, group operations
- **gridHelper.ts** - Manages grid areas, templates, responsive layouts (Phase 2)

### CSS Variable System
- All styling through CSS variables
- 100 base variables (locked, never add more)
- Presets modify variable values
- Groups inherit parent variables
- No background-image for content (use layers)
- No themes - direct values only

### UI Builder Integration
- Single +BOX button
- Content type toggle (text/media/both)
- Group edit mode toggle
- Property panels for each layer

---

## Notes
- Background images deprecated for content (use separate media layers)
- Groups render flat by default (editing unveils structure)
- Parent editing affects all children (hydration pattern)
- Export flexibility (user chooses structure)

## Cleanup Completed
- ✅ Removed guardianDocConverter.ts
- ✅ Removed fileConverter.ts (unused)
- ✅ Removed auto-id-helper.js (duplicate)
- ✅ Cleaned dead code from App.tsx (updateLayoutPreset, handleLayoutSwitch, Look/Design handlers)
- ✅ Updated global.css - commented deprecated styles for component transition
- ✅ Updated ui-config.ts - configured for BOX/ONE system (removed Chakra references)
- ✅ Updated vite.config.ts - removed Chakra dependencies from optimizeDeps
