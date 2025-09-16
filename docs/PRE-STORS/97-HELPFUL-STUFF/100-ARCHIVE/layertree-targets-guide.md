# LayerTree Target Guide

## Overview
The LayerTree component uses descriptive class names that clearly indicate what each element is. All styling is handled through the UI theme system - the React component has NO styling, only functional behavior.

## Target Structure

### Main Container
- `:` (empty target) - Targets the wrapper created by UIGenerator (this is the root/panel container)
  
### Header Section  
- `layertree-header` - The header bar at the top of the panel
- `layertree-title` - The title container (holds icon + text)
- `layertree-title-icon` - The icon next to "Layers" text
- `layertree-title-text` - The "Layers" text itself

### Content Area
- `button-group` - The scrollable container that holds all layer buttons (like layertree-list)
- `layertree-empty` - The message shown when no layers exist

### Layer Items (Buttons)
- `button` - Each individual layer item/button (like layer-row)
- `button-selected` - Added when layer is selected
- `button-locked` - Added when layer is locked
- `button-hidden` - Added when layer is hidden
- `button-dragover` - Added during drag/drop operations
- `button-hover` - Added when mouse hovers over layer

### Layer Content
- `layer-info` - Left side container (arrow + icon + name)
- `layer-controls` - Right side container (visibility + lock buttons)
- `expand-arrow` - The ▶/▼ arrow for groups
- `type-icon` - The icon showing element type (□, T, etc)
- `layer-name` - The editable layer name text
- `rename-input` - The input field shown when renaming

### Control Buttons
- `visibility-button` - The eye icon button
- `visibility-button-off` - Added when layer is hidden
- `lock-button` - The lock icon button  
- `lock-button-on` - Added when layer is locked

## Usage Example

In the theme file, you can target these elements like:

```json
"data-preset-targets": [
  ":layertree-container neutral-dark",
  "layertree-header:grid header",
  "layer-row:button grid 1fr-auto-row",
  "layer-row-hover:hover",
  "layer-row-selected:selected",
  "visibility-button:button icon",
  // etc...
]
```

## Key Points
1. All classes are descriptive of WHAT the element is, not HOW it looks
2. State modifiers are clear (selected, locked, hidden, etc)
3. No inline styles in the React component
4. All layout/styling comes from the theme presets