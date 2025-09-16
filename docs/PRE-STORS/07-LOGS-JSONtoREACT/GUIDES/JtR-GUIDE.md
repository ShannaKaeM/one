# Studio1 Architectural Guide - The Complete System

## Table of Contents
1. [The Big Picture](#the-big-picture-for-dummies-version)
2. [System Flow](#system-flow)
3. [Core Components](#core-components)
4. [JSON Structure & Properties](#json-structure--properties)
5. [Auto Grid Area Assignment](#auto-grid-area-assignment)
6. [Data-Component System](#data-component-system)
7. [Component Status](#component-status)
8. [File Locations](#file-locations)
9. [The Bottom Line](#the-bottom-line)

## The Big Picture (For Dummies Version)

Think of Studio1 as a **visual builder** where everything is made from **one type of building block** (literally called "one"). These blocks get their appearance and behavior from **presets** (like CSS classes on steroids). The entire system is powered by a **single JSON file** that defines everything - no custom React components needed (mostly).

## System Flow

```
ui-theme.json → Theme Processor → CSS in <style> tag
      ↓
JSONtoREACT reads structure
      ↓
Creates React elements with classes
      ↓
CSS styles apply automatically
```

## Core Components

### 1. UI Theme (ui-theme.json)
The single source of truth that defines:
- **Variables**: 100+ CSS custom properties
- **Presets**: Reusable style combinations (layouts, components, looks)
- **Structure**: The actual UI blueprint

### 2. Theme Processor
Converts theme JSON into CSS:
- Loads theme file
- Generates CSS for all variables
- Creates classes for all presets
- Injects `<style>` tag into page
- Uses double-set pattern:
  ```css
  .primary {
    --background-color: red;        /* Set variable */
    background-color: var(--background-color); /* Apply it */
  }
  ```

### 3. JSONtoREACT (JTR)
The engine that converts JSON to React:
- Everything becomes a `<div>` with classes
- No custom React components (mostly)
- Reads structure from theme
- Applies classes based on presets

## JSON Structure & Properties

### Basic Element
```json
{
  "type": "one",
  "content": "Hello World"
}
```

### Styling Properties
- **layouts**: Layout presets (`"box"`, `"toolbar-cols"`)
- **components**: Component presets (`"button"`, `"icon-button"`)
- **looks**: Visual presets (`"primary"`, `"neutral-light"`)
- **presets**: General presets (any category)

All accept both formats:
- String: `"box primary"`
- Array: `["box", "primary"]`

### Direct Variables
```json
"direct-variables": {
  // Special grid properties (become direct CSS):
  "cols": "1fr 2fr",      // → grid-template-columns: 1fr 2fr;
  "rows": "auto 1fr",     // → grid-template-rows: auto 1fr;
  "areas": "'a b'",       // → grid-template-areas: 'a b';
  "gap": "1rem",          // → gap: 1rem;
  
  // Everything else (becomes CSS variables):
  "padding": "2rem",      // → --padding: 2rem;
  "color": "white"        // → --color: white;
}
```

## Auto Grid Area Assignment

JTR automatically assigns grid areas to ALL child elements:

### How It Works
1. First child gets `grid-area: a`
2. Second child gets `grid-area: b`
3. Third child gets `grid-area: c`
4. Continues through z, then aa, ab, ac...
5. Applied as inline style on every element

### Example
```json
{
  "type": "one",
  "layouts": "toolbar-cols",
  "children": [
    {"type": "one", "content": "Left"},   // Automatically gets grid-area: a
    {"type": "one", "content": "Center"}, // Automatically gets grid-area: b
    {"type": "one", "content": "Right"}   // Automatically gets grid-area: c
  ]
}
```

### Override
Use explicit `"grid-area": "e"` to override automatic assignment

## Data-Component System

For complex interactions that need real React components:

### Basic Usage
```json
{
  "type": "one",
  "data-component": "direct-renderer"
}
```
Creates: `<div className="one"><DirectRenderer /></div>`

### With Preset Targeting
```json
{
  "type": "one",
  "data-component": "direct-renderer",
  "data-preset-targets": "canvas-container"
}
```
Wrapper gets additional class: `<div className="one canvas-container">`

## Component Status

### ✅ Fully in JTR
- Canvas Controls
- Button Groups
- Layout Switchers (with @ references)
- All UI Chrome

### 🔧 React Components (By Design)
- **DirectRenderer**: Canvas with drag/drop/resize
- **SelectionHandles**: Dynamic resize handles
- **GridOverlay**: Canvas grid visualization
- **ElementPopup**: Context menus
- **Library**: Media browser (uses JTR wrapper)

### 📋 To Migrate
- LayerTree
- EditorControls

## File Locations

- `/src/components/JSONtoREACT.tsx` - The JTR engine
- `/src/theme/runtimeThemeProcessor.ts` - CSS generator  
- `/public/data/themes/ui-theme.json` - Single source of truth
- `/src/components/DirectRenderer.tsx` - Canvas component

## Preset Content

Presets can now provide default content, just like they provide children:

### How It Works
```json
"text-preset": {
  "--font-size": "1.5rem",
  "content": "Default text here..."
}

"icon-button": {
  "--width": "32px",
  "content": "+"
}
```

### Priority Order
1. Element's own content
2. Preset content (first match wins)
3. Empty

### @ Reference Syntax

Pull content from anywhere in the theme:

#### Layout Icons
```json
"content": "@layout-icon:dashboard"  // Gets icon from layout preset
```

#### Nested Preset Values
```json
"content": "@preset:layouts.dashboard.label"  // Any preset path
```

#### Theme Variables
```json
"content": "@var:primaryColor"  // Gets variable defaultValue
```

### Example
```json
"my-button": {
  "type": "one",
  "components": "icon-button",
  "content": "@layout-icon:dashboard",  // Pulls ⊞ from dashboard preset
  "onClick": "set-layout:dashboard"
}
```

## Dynamic Actions

JTR supports dynamic action patterns that reduce code maintenance:

### Pattern: Colon-Separated Actions
```json
{
  "onClick": "set-layout:dashboard"
}
```

DirectRenderer can parse these dynamically:
```javascript
if (action.startsWith('set-layout:')) {
  const layoutName = action.substring('set-layout:'.length);
  // Handle any layout without hardcoding
}
```

### Benefits
- Add new layouts without code changes
- Define everything in ui-theme.json
- Extensible to other action types

### Potential Extensions
- `toggle-preset:primary` - Toggle any preset
- `add-element:wrapper` - Add any element type
- `set-property:color:#ff0000` - Set any property

## The Bottom Line

1. **ui-theme.json** defines everything
2. **Theme Processor** turns it into CSS
3. **JTR** reads structure and creates divs with classes
4. **Auto grid areas** position everything
5. **DirectRenderer** handles complex canvas interactions
6. **Dynamic actions** enable configuration-driven features
7. Everything else is just JSON + CSS classes