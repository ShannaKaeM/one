# JSONtoREACT Guide (For Dummies!)

## What is JSONtoREACT?

JSONtoREACT (JtoR for short) is like a magic translator that turns simple JSON data into React components. Think of it like giving instructions to build LEGO blocks - you write what you want in JSON, and it builds the actual webpage for you!

## The Big Picture

```
JSON Structure → JSONtoREACT → React Elements → Your Webpage
```

## Basic Concepts

### 1. Everything is a "one"
Every element starts as a `<div class="one">`. It's like every LEGO piece starts as the same basic block.

### 2. Presets are like costumes (Three Types!)
You dress up your basic `one` element with three types of presets:

**Layout Presets** (structure/grid/sizing):
- `box` - Makes it a container with grid system
- `dashboard-5` - 5-area dashboard layout
- `centered` - Centers content
- `full-height` - 100vh height

**Component Presets** (atomic UI elements):
- `button` - Button behaviors and styles
- `field` - Input field styles
- `checkbox` - Checkbox component
- `slider` - Slider component

**Look Presets** (visual/colors/theming):
- `primary` - Pink/branded colors
- `secondary` - Gray colors
- `rounded` - Rounded corners
- `shadow` - Drop shadows

### 3. Structure is your blueprint
The JSON structure tells JSONtoREACT what to build:
```json
{
  "type": "one",
  "layouts": ["box"],
  "components": ["button"],
  "looks": ["primary"],
  "content": "Hello World"
}
```
This creates: `<div class="one box button primary">Hello World</div>`

## Current Features (What's Working Now)

### 1. **Theme Wrapping**
Everything gets wrapped in a theme div automatically:
```html
<div class="ui">
  <!-- Your content here -->
</div>
```

### 2. **Flat Structure Resolution**
You can reference other elements by their ID:
```json
{
  "root": {
    "type": "one",
    "children": ["sidebar", "main"]  // References other elements
  },
  "sidebar": {
    "type": "one",
    "content": "I'm the sidebar!"
  },
  "main": {
    "type": "one",
    "content": "I'm the main content!"
  }
}
```

### 3. **Grid Configuration**
Turn any element into a grid layout:
```json
{
  "grid": {
    "areas": "'header' 'content' 'footer'",
    "rows": "60px 1fr 40px"
  }
}
```

### 4. **Inline-Styles (Direct CSS Variable Overrides)**
Need to override specific CSS variables? Use inline-styles:
```json
{
  "inline-styles": {
    "padding": "2rem",
    "font-size": "1.125rem"
  }
}
```
This automatically adds the `--` prefix and produces: `style="--padding: 2rem; --font-size: 1.125rem;"`

### 5. **Everything is a DIV**
All elements are rendered as `<div>` elements with the "one" class. Different behaviors (like buttons, fields, images) will be handled through presets and content types in the future.

### 6. **Action System**
Any element can trigger actions:
```json
{
  "type": "one",
  "presets": ["button", "primary"],
  "onClick": "save-document",
  "content": "Save"
}
```
When clicked, it sends a message that other parts of your app can listen for.

### 7. **Debug Mode**
Turn on debug mode to see what's happening behind the scenes:
```jsx
<JSONtoREACT debug={true} />
```

## Features We Temporarily Removed (Coming Back Later!)

### 1. **Auto-ID Generation**
**What it did:** Automatically gave every element a unique ID like `box-001`, `button-002`
**Why removed:** Made debugging harder when IDs kept changing
**When it returns:** When we add the visual editor

### 2. **Auto-Grid Area Assignment**
**What it did:** Automatically assigned grid positions (a, b, c...) to child elements
**Why removed:** Made it confusing to track which element was where
**When it returns:** When we build the drag-and-drop system

## How to Use JSONtoREACT

### 1. Basic Usage
```jsx
<JSONtoREACT theme="ui" />
```
This loads the UI theme and renders whatever is in the theme's structure.

### 2. What Goes In, What Comes Out

**Input (JSON):**
```json
{
  "type": "one",
  "presets": ["box"],
  "looks": ["primary"],
  "content": "Click me!",
  "inline-styles": {
    "padding": "1rem"
  }
}
```

**Output (HTML):**
```html
<div class="ui">
  <div class="one box primary" style="--padding: 1rem;">
    Click me!
  </div>
</div>
```

## Common Patterns

### Making a Dashboard Layout
```json
{
  "type": "one",
  "presets": ["box", "dashboard-5"],
  "looks": ["neutral-dark"],
  "children": [
    { "type": "one", "grid-area": "a", "looks": ["primary"], "content": "Sidebar" },
    { "type": "one", "grid-area": "b", "looks": ["secondary"], "content": "Header" },
    { "type": "one", "grid-area": "c", "content": "Main" },
    { "type": "one", "grid-area": "d", "looks": ["secondary"], "content": "Footer" },
    { "type": "one", "grid-area": "e", "looks": ["primary"], "content": "Right Panel" }
  ]
}
```

### Making a Button
```json
{
  "type": "one",
  "presets": ["button"],
  "looks": ["primary"],
  "content": "Save Changes",
  "onClick": "save-action"
}
```

### Making an Editable Field (Coming Soon)
```json
{
  "type": "one",
  "presets": ["field"],
  "content": "Type here...",
  "contentType": "text"
}
```

## Tips & Tricks

1. **Start Simple**: Begin with just type and content, add presets later
2. **Use Debug Mode**: It shows you exactly what JSONtoREACT is doing
3. **Presets Stack**: Layout presets like `["box", "centered"]` and looks like `["primary", "rounded"]`
4. **Inline-Styles Win**: Inline-styles override everything else - use them for final tweaks

## What's Next?

When we bring back the auto-features, you'll be able to:
- Drag and drop elements (auto-IDs will track them)
- Auto-layout children in grids (auto-grid-areas)
- Visual editing with automatic structure updates

But for now, JSONtoREACT is your simple, reliable JSON→React translator!