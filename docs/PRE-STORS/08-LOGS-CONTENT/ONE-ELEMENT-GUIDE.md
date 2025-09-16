# ONE Element Guide - Complete Documentation

## What Happens When You Click the ONE Button

### 1. Button Click in CanvasControls
- Location: `/src/components/CanvasControls.tsx` (line 146)
- Three buttons available: ONE, T (Text), IMG (Image)
- Each dispatches `add-one-element` event with `elementType`:
  - ONE button → `elementType: 'one'`
  - T button → `elementType: 'text'`
  - IMG button → `elementType: 'image'`

### 2. DirectRenderer Enters Click-to-Place Mode
- Location: `/src/components/DirectRenderer.tsx` (lines 527-555)
- Listens for `add-one-element` event
- Sets `isPlacingElement = true`
- Stores `placingPreset` from event detail
- Changes cursor to crosshair
- Waits for user to click on canvas

### 3. User Clicks on Canvas
- Location: `/src/components/DirectRenderer.tsx` (lines 556-641)
- Click position is captured relative to canvas
- Creates element based on preset type:

#### ONE Element (Empty)
```javascript
{
  id: elementId,
  type: 'one',
  name: `ONE ${elementCount}`,
  content: 'none',
  contentType: undefined,
  style: {
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 1000 + elements.length + 1
  }
}
```

#### Text Element
```javascript
{
  id: elementId,
  type: 'one',
  name: `Text ${elementCount}`,
  content: { text: '' },  // Empty, uses theme default
  contentType: 'text',
  style: {
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 1000 + elements.length + 1
  }
}
```

#### Image Element
```javascript
{
  id: elementId,
  type: 'one',
  name: `Image ${elementCount}`,
  content: { src: '' },  // Empty, uses theme placeholder
  contentType: 'media',
  style: {
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 1000 + elements.length + 1
  }
}
```

### 4. Dynamic Rendering with Theme Content
- Location: `/src/components/DirectRenderer.tsx` (lines 2804-2995)

#### Step 1: Class Assignment (lines 2818-2848)
Based on element state and content type:
- **Empty elements** (`content: 'none'`) → `['one', 'wrapper', 'ghost']`
- **Media elements** → `['one', 'image']`
- **Text elements** → `['one', 'text', 'ghost']` or `['one', 'text-md', 'ghost']` (if markdown detected)

#### Step 2: Theme Preset Lookup (lines 2946-2952)
```javascript
const presetName = classList.find(cls => 
  ['wrapper', 'image', 'text', 'text-md'].includes(cls)
);

if (presetName && themeConfig.presets?.['base-elements']?.[presetName]) {
  const preset = themeConfig.presets['base-elements'][presetName];
  const contentDef = preset._content;
```

#### Step 3: Dynamic Content Generation (lines 2953-2986)
The system reads `_content` definitions from theme presets:

**Example Theme Preset with _content:**
```json
"text": {
  "width": "300px",
  "min-height": "100px",
  "padding": "1rem",
  "background-color": "hsl(0, 0%, 95%)",
  "border-radius": "8px",
  "_content": {
    "type": "div",
    "class": "text-content",
    "default": "Studio ONE is a revolutionary design system...",
    "editable": true
  }
}
```

**Content Generation Logic:**
1. Uses `contentDef.type` to determine HTML element (img, div, etc.)
2. Applies `contentDef.class` if specified
3. Content priority:
   - If element has content → use it
   - If element is empty → use `contentDef.default`
   - For markdown → parse with `marked.parse()`
4. Adds `contenteditable="true"` if `contentDef.editable` is true

#### Step 4: Final HTML Generation (lines 2991-2995)
```html
<div id="${element.id}" 
     class="one wrapper ghost" 
     style="position: absolute; top: 100px; left: 200px; z-index: 1001; width: 200px; height: 200px; ..." 
     data-element-id="${element.id}" 
     data-selected="false" 
     data-multi-selected="false" 
     data-locked="false">
  <!-- Dynamic content from theme -->
  <div class="text-content" contenteditable="true">
    Studio ONE is a revolutionary design system...
  </div>
</div>
```

## What This Means

The ONE element system is now **completely theme-driven**:
1. **Classes** determine which preset to use
2. **Presets** define both styling AND content structure
3. **_content** objects specify:
   - HTML element type
   - CSS classes
   - Default content
   - Editability
   - Markdown support

No more hardcoded HTML or inline styles in DirectRenderer!

## How Styles Are Applied

### Base Styles from oneElement Config
Location: `/public/data/themes/one-theme.json` (lines 628-634)
```json
"oneElement": {
  "one": {
    "display": "grid",
    "content": "none",
    "position": "absolute"
  }
}
```

### Dynamic Class Assignment
The DirectRenderer assigns classes based on content (lines 2818-2848):
- **Empty**: `['one', 'wrapper', 'ghost']`
- **Image**: `['one', 'image']`
- **Text**: `['one', 'text', 'ghost']`
- **Markdown**: `['one', 'text-md', 'ghost']`

### Preset Styles via CSS Classes
The `runtimeThemeProcessor` generates CSS from theme presets:

**Theme Preset Structure:**
```json
"presets": {
  "base-elements": {
    "wrapper": { /* styles */ },
    "image": { /* styles */ },
    "text": { /* styles */ },
    "text-md": { /* styles */ }
  },
  "looks": {
    "colors": {
      "ghost": { /* color styles */ }
    }
  }
}
```

**Generated CSS:**
```css
.one .wrapper { /* wrapper styles */ }
.one .image { /* image styles */ }
.one .text { /* text styles */ }
.one .text-md { /* text-md styles */ }
.one .ghost { /* ghost color styles */ }
```

### Style Merging Order
1. **oneElement config** provides base styles
2. **element.style** adds positioning (top, left, zIndex)
3. **CSS classes** apply preset styles

### Additional Styles from directRendererStyles
**Lines 13-83:** Element interaction and markdown styling
- Selection states using data attributes
- Cursor changes for locked/selected states
- `.markdown-content` styling for formatted text

## Content Type Transformation
When content is dropped on an empty ONE element:
1. **Text Drop** → Sets `contentType: 'text'`, changes classes
2. **Image Drop** → Sets `contentType: 'media'`, changes classes
3. Theme presets automatically apply new styles

## Summary: The Dynamic System

1. **Element Creation**: Minimal data structure with position and content type
2. **Class Assignment**: Based on content type and state
3. **Theme Lookup**: Find matching presets by class names
4. **Content Generation**: Use `_content` definitions from theme
5. **Style Application**: CSS classes apply preset styles

Everything is driven by the theme JSON - no hardcoded styles in JavaScript!