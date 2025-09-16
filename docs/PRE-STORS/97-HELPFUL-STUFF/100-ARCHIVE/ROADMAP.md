# ONE Project Roadmap & As-Built Documentation

## Core Architecture (AS-BUILT)

### Naming Conventions
- **BOX**: Element type (container/component)
- **ONE**: Base CSS class for all elements
- **Presets**: Additional style variations (panel, toolbar, canvas, etc.)

### File Structure
```
/src
  /components
    JSONtoREACT.jsx     - Dynamic component generator
    ColorWheel.jsx      - Color picker component
  /data
    ui-theme.json       - Theme configuration & presets
```

### Current Implementation
- JSONtoREACT generator converts JSON to React components
- CSS variables system for theming
- Basic preset system (panels, toolbars, canvas)
- Color wheel with theme integration

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

## Dashboard Layout (PLANNED)

### Grid Structure
```json
{
  "dashboard": {
    "type": "box",
    "class": "one",
    "data-label": "dashboard",
    "grid-areas": "'a a a' 'b c d' 'e e e'",
    "grid-cols": "200px 1fr 300px",
    "grid-rows": "60px 1fr 40px",
    "presets": ["one-grid"],
    "children": [
      {
        "type": "box",
        "class": "one",
        "data-label": "header",
        "grid-area": "a",
        "presets": ["toolbar"]
      },
      {
        "type": "box",
        "class": "one",
        "data-label": "left-sidebar",
        "grid-area": "b",
        "presets": ["panel"]
      },
      {
        "type": "box",
        "class": "one",
        "data-label": "main",
        "grid-area": "c",
        "presets": ["canvas"]
      },
      {
        "type": "box",
        "class": "one",
        "data-label": "right-sidebar",
        "grid-area": "d",
        "presets": ["panel"]
      },
      {
        "type": "box",
        "class": "one",
        "data-label": "footer",
        "grid-area": "e",
        "presets": ["toolbar"]
      }
    ]
  }
}
```

### Grid Areas
- **a**: Header (full width)
- **b**: Left sidebar
- **c**: Main content
- **d**: Right sidebar
- **e**: Footer (full width)

---

## Implementation Steps

### Phase 1: Group System (CURRENT)
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

### JSONtoREACT Updates Needed
1. Detect mixed content (text + media)
2. Auto-create group wrapper
3. Handle group class variations
4. Support grid properties
5. Process children recursively

### New Utils Required
- **groupHelper.ts** - Handles auto-split, flatten/unflatten, group operations
- **gridHelper.ts** - Manages grid areas, templates, responsive layouts (Phase 2)

### CSS Variable System
- All styling through CSS variables
- Presets modify variable values
- Groups inherit parent variables
- No background-image for content (use layers)

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
