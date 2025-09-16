# Editor Controls Roadmap

Component-Level Preset System: Solved the preset targeting architecture:

ui-theme.json → UIGenerator → Component Props → Render-time styling

- Component-level presets passed as props
- Components handle their own styling at render time
- UIGenerator: Passes presets as props instead of DOM manipulation

## Example-GeneralControls:
- Grid and snap toggle functionality
- CSS-only hover effects working
- Active state presets apply  
- 3-column layout with proper grid areas (a, b, c)
- Buttons displaying in horizontal rows via nav-group preset
- ui-theme.json: Updated with GeneralControls config and hover states

This establishes the pattern for all future component styling!"




## Editor Sidebar Refactor to HOTKEY Floating System
This document tracks which UI theme variables are currently refactored.

## Currently Implemented Variables (By Category)

### 📏 Sizing (Hotkey S)

- ✅ `width` - Element width
- ✅ `height` - Element height
- ✅ `minWidth` - Minimum width
- ✅ `maxWidth` - Maximum width
- ✅ `minHeight` - Minimum height
- ✅ `maxHeight` - Maximum height
- ❌ `aspectRatio` - Aspect ratio constraint
- ❌ `boxSizing` - Border-box vs content-box



## Not Yet Implemented Variables (By Category)

### 🎨 Colors (4 implemented)
- ✅ `color` - Text Color control
- ✅ `backgroundColor` - Background Color control
- ✅ `borderColor` - Border Color control
- ✅ `outlineColor` - Outline Color control

### 📝 Typography (5 implemented)
- ✅ `fontSize` - Font Size slider
- ✅ `lineHeight` - Line Height slider
- ✅ `letterSpacing` - Letter Spacing slider
- ✅ `wordSpacing` - Word Spacing slider
- ✅ `zIndex` - Z-Index control (technically behavior, but in text tab)
- ✅ `fontFamily` - Font family selector
- ✅ `fontWeight` - Font weight (100-900)
- ✅ `fontStyle` - Normal, italic, oblique
- ✅ `textAlign` - Text alignment
- ✅ `textDecoration` - Underline, overline, line-through
- ✅ `textTransform` - Uppercase, lowercase, capitalize

### 📐 Spacing (3 implemented)
- ✅ `margin` - Margin slider
- ✅ `padding` - Padding slider
- ✅ `gap` - Gap slider



### 🔲 Borders (4 implemented)
- ✅ `borderWidth` - Border Width slider
- ✅ `borderRadius` - Border Radius (All Corners) slider
- ✅ `outlineWidth` - Outline Width slider
- ✅ `outlineOffset` - Outline Offset slider

### 🎭 Visual (3 implemented)
- ✅ `boxShadow` - Box Shadow slider
- ✅ `opacity` - Opacity slider
- ✅ `filter` - Filter effects (blur, brightness, contrast, saturate, hue rotate)

### 🔄 Transform (1 implemented with sub-properties)
- ✅ `transform` - Transform controls
  - Scale
  - Rotate
  - Skew X
  - Skew Y
  - Translate X
  - Translate Y

---



### 🎨 Colors (4 not implemented)
- ❌ `fill` - SVG fill color
- ❌ `stroke` - SVG stroke color
- ❌ `accentColor` - Form accent color
- ❌ `caretColor` - Text cursor color




### 📐 Spacing (12 not implemented)
- ❌ `marginTop` - Individual margin control
- ❌ `marginRight` - Individual margin control
- ❌ `marginBottom` - Individual margin control
- ❌ `marginLeft` - Individual margin control
- ❌ `paddingTop` - Individual padding control
- ❌ `paddingRight` - Individual padding control
- ❌ `paddingBottom` - Individual padding control
- ❌ `paddingLeft` - Individual padding control
- ❌ `rowGap` - Grid/Flex row gap
- ❌ `columnGap` - Grid/Flex column gap
- ❌ `inset` - Shorthand position offset
- ❌ `insetBlock` - Logical block inset

### 🔲 Borders (11 not implemented)
- ❌ `borderStyle` - Solid, dashed, dotted, etc.
- ❌ `borderTopWidth` - Individual border width
- ❌ `borderRightWidth` - Individual border width
- ❌ `borderBottomWidth` - Individual border width
- ❌ `borderLeftWidth` - Individual border width
- ❌ `borderTopStyle` - Individual border style
- ❌ `borderRightStyle` - Individual border style
- ❌ `borderBottomStyle` - Individual border style
- ❌ `borderLeftStyle` - Individual border style
- ❌ `outlineStyle` - Outline style
- ❌ `strokeWidth` - SVG stroke width

### 🎭 Visual (12 not implemented)
- ❌ `backgroundImage` - Background image URL
- ❌ `backgroundSize` - Cover, contain, etc.
- ❌ `backgroundPosition` - Position of background
- ❌ `backgroundRepeat` - Repeat pattern
- ❌ `textShadow` - Text shadow effects
- ❌ `maskImage` - CSS mask image
- ❌ `maskMode` - Mask blend mode
- ❌ `maskRepeat` - Mask repeat pattern
- ❌ `maskPosition` - Mask position
- ❌ `maskSize` - Mask size
- ❌ `backdropFilter` - Backdrop effects
- ❌ `transformOrigin` - Transform origin point




### 📍 Positioning (5 not implemented)
- ❌ `top` - Position from top
- ❌ `right` - Position from right
- ❌ `bottom` - Position from bottom
- ❌ `left` - Position from left
- ❌ `position` - Static, relative, absolute, fixed

### 🎯 Layout (3 not implemented)
- ❌ `alignItems` - Flex/Grid item alignment
- ❌ `justifyContent` - Content justification
- ❌ `alignContent` - Multi-line alignment

### 💪 Flex (7 not implemented)
- ❌ `flexDirection` - Row, column
- ❌ `flexWrap` - Wrap behavior
- ❌ `flexGrow` - Grow factor
- ❌ `flexShrink` - Shrink factor
- ❌ `flexBasis` - Initial size
- ❌ `order` - Flex item order
- ❌ `alignSelf` - Individual alignment

### 🔳 Grid (10 not implemented)
- ❌ `gridTemplateColumns` - Column template
- ❌ `gridTemplateRows` - Row template
- ❌ `gridTemplateAreas` - Grid areas
- ❌ `gridAutoColumns` - Auto column size
- ❌ `gridAutoRows` - Auto row size
- ❌ `gridAutoFlow` - Auto placement
- ❌ `gridColumnStart` - Column start position
- ❌ `gridColumnEnd` - Column end position
- ❌ `gridRowStart` - Row start position
- ❌ `gridRowEnd` - Row end position

### 🎬 Animation (8 not implemented)
- ❌ `transition` - Transition properties
- ❌ `transitionDuration` - Transition duration
- ❌ `transitionTimingFunction` - Easing function
- ❌ `transitionDelay` - Transition delay
- ❌ `animationName` - Animation keyframes
- ❌ `animationDuration` - Animation duration
- ❌ `animationTimingFunction` - Animation easing
- ❌ `animationIterationCount` - Repeat count

### 🎮 Behavior (9 not implemented)
- ❌ `display` - Display type
- ❌ `overflow` - Overflow behavior
- ❌ `overflowX` - Horizontal overflow
- ❌ `overflowY` - Vertical overflow
- ❌ `visibility` - Visible/hidden
- ❌ `pointerEvents` - Mouse interaction
- ❌ `userSelect` - Text selectionok
- ❌ `cursor` - Cursor style
- ❌ `objectFit` - Image/video fit

---



---

*Last Updated: 2025-08-27*