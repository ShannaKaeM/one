# LayerTree JTR Integration Roadmap

## Approach: Hybrid - Keep Base Styles + JTR Override Capability

### Core Philosophy
- **KEEP all existing LayerTree styles** - They already match Chakra perfectly
- **Add preset override capability** - Only style what needs to change
- **Use preset mapping system** - Control internal elements from ui-theme.json
- **Leverage existing presets** - primary, secondary, neutral-dark, etc.

## Complete Class List from Current LayerTree

### Structure Classes
- `.component-container` - Outer wrapper
- `.header` - Top header section  
- `.main` - Scrollable content area
- `.empty-state` - "No elements to display" message

### Header Classes
- `.title-group` - Header content wrapper
- `.title-icon` - LayerTree icon (◧)
- `.title-text` - "LAYERS" text

### Layer Item Classes
- `.button` - Each layer item (base)
- `.button:hover` - Hover state
- `.button-selected` - Selected state
- `.button-selected:hover` - Selected + hover state
- `.button-locked` - Locked item state
- `.button-hidden` - Hidden item state (lower opacity)
- `.button-dragover` - Drag target indicator

### Layer Item Content Classes
- `.layer-info` - Left side content wrapper
- `.layer-info-group` - Group variant with expand arrow
- `.expand-arrow` - ▶/▼ for groups
- `.expand-arrow:hover` - Hover state for arrow
- `.type-icon` - Element type icon (□, T, ◉, ▣)
- `.layer-name` - Element name text
- `.rename-input` - Inline rename input field

### Control Button Classes
- `.layer-controls` - Right side buttons container
- `.visibility-button` - Eye icon button
- `.visibility-button:hover` - Hover state
- `.visibility-button-off` - Hidden/off state
- `.lock-button` - Lock icon button
- `.lock-button:hover` - Hover state
- `.lock-button-on` - Locked/on state

### Nested Structure Classes
- `.children-container` - Wrapper for nested items
- `.children-container::before` - Indent guide line
- `.children-container .button` - Indented child items

### Scrollbar Classes
- `.main::-webkit-scrollbar` - Custom scrollbar
- `.main::-webkit-scrollbar-track` - Scrollbar track
- `.main::-webkit-scrollbar-thumb` - Scrollbar thumb

## Implementation Plan

### Phase 0: Update LayerTree Base Styles (CRITICAL - DO THIS FIRST!)
Compare and update all styles in current LayerTree.tsx to match Chakra version:
- **Source**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/BACKUP/studio1-sept-1/src/components/LayerTree.tsx`
- **Target**: `/src/components/LayerTree.tsx`

Key conversions:
- Box → div
- HStack → `display: flex; flex-direction: row; align-items: center;`
- VStack → `display: flex; flex-direction: column;`
- spacing={2} → `gap: 0.5rem`
- All padding, font-size, colors must match

### Phase 1: Implement Preset Mapping System
Extend JTR to support element-specific preset mapping:

```json
{
  "layertree": {
    "type": "one",
    "data-label": "layertree",
    "layouts": "full-height",
    "looks": "neutral-dark",
    "data-component": "layertree",
    "data-preset-targets": ":layertree-container",  // Wrapper
    "preset-map": {                                 // Internal elements
      "header": "layertree-header secondary",
      "title-icon": "primary",
      "button": "ghost",
      "visibility-button": "icon-button"
    }
  }
}
```

### Phase 2: Update JTR to Handle preset-map
Modify JSONtoREACT to pass preset mappings to components:
```javascript
// In JTR component props handling
...(element['preset-map'] ? {
  presetMap: element['preset-map']
} : {})
```

### Phase 3: Update LayerTree to Use Preset Classes
Add preset classes alongside existing classes:
```jsx
// Before
<div className="header">

// After - keeps base styles, adds preset overrides
<div className={`header ${presetMap?.header || ''}`}>

// Examples
<div className={`title-icon ${presetMap?.['title-icon'] || ''}`}>
<button className={`visibility-button ${presetMap?.['visibility-button'] || ''}`}>
```

### Phase 4: Create Minimal Override Presets (Optional)
Add to ui-theme.json:
```json
"presets": {
  "layertree": {
    "layertree-container": {
      // Empty - just for targeting
    },
    "layertree-header": {
      // Empty - just for targeting
    },
    "layertree-pink": {
      "--color": "hsl(342, 76%, 68%)",
      "--border-color": "hsl(342, 36%, 53%)"
    }
  }
}
```

## Benefits of Hybrid Approach

1. **Zero Breaking Changes**
   - LayerTree works exactly as it does now
   - All existing styles remain intact

2. **Surgical Overrides**
   - Change only what you need
   - Use existing presets (primary, secondary, etc.)
   - Or create minimal custom presets

3. **Theme Control**
   - Control any element from ui-theme.json
   - Switch themes without touching component

4. **Examples**
   ```json
   // Pink header
   "preset-map": {
     "header": "primary",
     "title-icon": "primary"
   }
   
   // Ghost buttons
   "preset-map": {
     "button": "ghost",
     "button-selected": "primary"
   }
   
   // Icon button style for controls
   "preset-map": {
     "visibility-button": "icon-button",
     "lock-button": "icon-button"
   }
   ```

## Icon System
Add icon content to presets or use @ references:
```json
// Option 1: Icon presets with content
"layertree-icon-wrapper": {
  "content": "□"  // Square icon
},
"layertree-icon-text": {
  "content": "T"  // Text icon
},
"layertree-icon-media": {
  "content": "◉"  // Image icon
},
"layertree-icon-group": {
  "content": "▣"  // Group icon
},
"layertree-icon-expand": {
  "content": "▼"  // Expanded
},
"layertree-icon-collapse": {
  "content": "▶"  // Collapsed
},
"layertree-icon-visible": {
  "content": "👁"  // or "◉"
},
"layertree-icon-hidden": {
  "content": "⊝"  // or "◌"
},
"layertree-icon-lock": {
  "content": "🔒"  // or "⊠"
},
"layertree-icon-unlock": {
  "content": "🔓"  // or "⊡"
}

// Option 2: Use in component
const icon = getPresetContent(`layertree-icon-${element.type}`);
```

## Migration Steps

1. **Add preset-map support to JTR** (Phase 1-2)
2. **Update LayerTree className logic** (Phase 3)
3. **Test with existing presets** (primary, secondary, etc.)
4. **Create custom presets only as needed** (Phase 4)

## Notes

- Base styles handle 99% of the look
- Presets only override what changes between themes
- Can mix existing presets with custom ones
- Gradual adoption - add preset classes only where needed

This approach gives maximum flexibility with minimum effort!


## Example Usage in ui-theme.json

```json
"layertree": {
  "type": "one",
  "data-label": "layertree",
  "layouts": "full-height",
  "looks": "neutral-dark",
  "data-component": "layertree",
  "data-preset-targets": ":layertree-container",
  "preset-map": {
    "header": "layertree-header secondary",
    "title-icon": "primary",
    "button": "ghost",
    "button-selected": "primary",
    "visibility-button": "icon-button",
    "lock-button": "icon-button"
  }
}
```