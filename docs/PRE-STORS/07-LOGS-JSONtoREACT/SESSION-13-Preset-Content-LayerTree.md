# Session 13: Preset Content Feature & LayerTree Integration

## Work Completed

### 1. Dynamic Layout System Enhancement
- Implemented dynamic layout switching with `set-layout:*` pattern
- Removed hardcoded layout cases in DirectRenderer
- Any layout can now be added via ui-theme.json alone
- Updated layout names: `db-full`, `db-library-canvas`, `db-canvas`

### 2. Preset Content Feature
**Major Enhancement**: Presets can now provide default content!

#### Implementation
```javascript
// In JSONtoREACT.tsx (~line 338)
// Check if any applied preset has content
if (!element.content && presets.length > 0) {
  for (const presetName of allPresets) {
    const preset = config?.presets?.[category]?.[presetName];
    if (preset?.content !== undefined) {
      children = preset.content;
      break;
    }
  }
}
```

#### @ Reference Syntax
```javascript
// Resolve references like @layout-icon:dashboard
function resolveReference(reference: string, config: any): any {
  // Handles:
  // @layout-icon:name - pulls icon from layout preset
  // @preset:path.to.value - access any preset value
  // @var:variableName - get theme variable value
}
```

### 3. LayerTree Integration
- Added LayerTree as data-component (like Library)
- Registered in App.tsx dataComponents map
- Props passed through JTR:
  - elements (canvas elements)
  - selectedIds
  - Event handlers (onSelect, onReorder, etc.)

### 4. Documentation Updates
- Created DASHBOARD-GUIDE.md
- Updated JTR-GUIDE.md with preset content feature
- Updated LIBRARY-GUIDE.md with preset content possibilities
- Moved all guides to GUIDES folder

## Current State

### Working Features
- ✅ Dynamic layout switching
- ✅ Preset content with @ references
- ✅ LayerTree displaying in dashboard
- ✅ Layout buttons pull icons from presets

### Discovered Issues
- LayerTree current styling doesn't match Chakra version
- Needs complete style update before implementing preset system

---

## Agent Handoff

### CRITICAL NEXT TASK: Update LayerTree Styles

The current LayerTree component has different styling than the Chakra version. Before implementing the preset mapping system, ALL hardcoded styles need to be updated.

#### Style Reference
Compare these two files:
- **Current**: `/src/components/LayerTree.tsx`
- **Chakra Version**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/BACKUP/studio1-sept-1/src/components/LayerTree.tsx`

#### Key Differences to Update
1. **Layout Structure**
   - Current uses `grid-template-areas`
   - Chakra uses flexbox layouts
   - Update display, flex properties

2. **Spacing & Sizing**
   - Different padding/margin values
   - Different min-heights and font sizes
   - Icon sizes don't match

3. **Colors** (from Chakra version lines 77-87):
   ```javascript
   const bgColor = 'hsl(0, 0%, 10%)';
   const headerBg = 'hsl(0, 0%, 12%)';
   const borderColor = 'hsl(0, 0%, 20%)';
   const textColor = 'hsl(0, 0%, 90%)';
   const mutedTextColor = 'hsl(0, 0%, 70%)';
   const iconColor = 'hsl(342, 36%, 53%)';
   const hoverBg = 'hsla(0, 0%, 100%, 0.05)';
   const selectedBg = 'hsla(342, 36%, 53%, 0.2)';
   const selectedHoverBg = 'hsla(342, 36%, 53%, 0.25)';
   const dragBorderColor = 'hsl(342, 36%, 53%)';
   ```

4. **Component Structure**
   - Chakra uses HStack/VStack concepts
   - Need to update flex directions and alignments

### Implementation Steps

#### Step 1: Update LayerTree Styles
1. Open current LayerTree.tsx
2. Update the `layerTreeStyles` CSS string
3. Match ALL styles from Chakra version (not just colors)
4. Test that it looks identical to Chakra version

#### Step 2: Implement Preset Mapping System
After styles are updated, implement the preset-map feature:

1. **Update JSONtoREACT.tsx** to handle `preset-map`:
```javascript
// Add to component props
...(element['preset-map'] ? {
  presetMap: element['preset-map']
} : {})
```

2. **Update LayerTree.tsx** to accept presetMap prop:
```typescript
interface LayerTreeProps {
  // ... existing props
  presetMap?: Record<string, string>;
}
```

3. **Apply preset classes** alongside base classes:
```jsx
<div className={`header ${props.presetMap?.header || ''}`}>
<div className={`title-icon ${props.presetMap?.['title-icon'] || ''}`}>
```

#### Step 3: Test Preset Overrides
Test in ui-theme.json:
```json
"layertree": {
  "preset-map": {
    "header": "primary",
    "title-icon": "primary",
    "button-selected": "primary"
  }
}
```

### File Locations
- `/src/components/LayerTree.tsx` - Current component to update
- `/src/components/JSONtoREACT.tsx` - Add preset-map support
- `/public/data/themes/ui-theme.json` - Test preset mappings
- `/docs/07-LOGS-FULL-REFACTOR/LAYERTREE-JTR-ROADMAP.md` - Implementation guide

### Important Notes
1. The Chakra version uses Chakra's Box/HStack/VStack components which translate to specific flex layouts
2. Pay attention to the icon components (SquareIcon, TextIcon, etc.) - they use SVG
3. The expand/collapse arrows use different icons (ChevronRight/ChevronDown)
4. Make sure to update ALL ~30 classes listed in the roadmap

Good luck! The goal is to make LayerTree look exactly like the Chakra version, then add the preset override capability on top.