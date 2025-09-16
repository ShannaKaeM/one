# JSONtoREACT (JTR)

## 🎯 Quick Summary
> **Purpose**: Converts JSON structures into React elements with automatic ID and grid area assignment  
> **Type**: React Component / JSON-to-React Converter  
> **Location**: `/src/components/JSONtoREACT.tsx`  
> **Related**: [THEME-PROCESSOR](../../THEME-PROCESSOR.md), [DIRECT-RENDERER](./DIRECT-RENDERER.md), [AUTO-ID-HELPER](../../UTILS/AUTO-ID-HELPER.md)

---

## 🔄 Simple Explanation

JSONtoREACT (JTR) converts JSON configuration into React elements. It takes a JSON structure and transforms it into a tree of React div elements with proper classes, styles, and behaviors.

**Core capabilities:**
1. **Automatic ID generation** - Every element gets a unique ID without manual assignment
2. **Automatic grid area assignment** - Elements get a, b, c... grid areas by index
3. **Preset application** - Combines layouts, components, and looks into CSS classes
4. **Dynamic content** - @ reference system pulls content from theme configuration
5. **Data component integration** - Embeds complex React components via data-component
6. **Event handling** - Connects onClick and other events to the app

```
JSON structure → Auto-ID processing → Grid assignment → React elements → Rendered UI
```

---

## 📋 Technical Specification

### Input Props Explained

When you use JTR as a React component, you pass it these properties:

```typescript
<JSONtoREACT
  theme="ui"                    // Which theme to render with (ui or one)
  structure={jsonData}          // The JSON to convert (optional - uses theme structure if not provided)
  appState={appState}           // Application state passed to data components
  selectedElement={id}          // Currently selected element ID
  selectedElementData={data}    // Data about the selected element
  dataComponents={components}   // Registry of React components that can be embedded
/>
```

### JSON Element Structure

```javascript
{
  type: "ui",                    // Base class (currently defaults to "one" - needs update)
  layouts: "grid-2",             // Layout preset (string or array)
  components: "button",            // Component preset (string or array)
  looks: "hover primaty",         // Look presets (string or array)
  presets: "custom",             // General presets (string or array)
  
  content: "Text content",       // Direct text content
  // OR
  content: "@layout-icon:dashboard",  // Dynamic content from theme
  
  "direct-variables": {          // CSS variable overrides
    "padding": "2rem",
    "color": "#333",
    // Special grid properties:
    "cols": "1fr 2fr",          // grid-template-columns
    "rows": "auto 1fr",         // grid-template-rows
    "areas": '"a b" "c c"',     // grid-template-areas
    "gap": "1rem"               // gap
  },
  
  "grid-area": "custom",        // Manual grid area (otherwise auto-assigned)
  
  "data-component": "library",   // Embed React component
  "data-preset-targets": [       // Map presets to component internals
    ":wrapper-class",           // Apply to wrapper
    "internal-class:preset"     // Map internal class to preset
  ],
  
  onClick: "action-name",        // Dispatch jtor-action event
  
  children: [...]               // Child elements
}
```

### Processing Pipeline Detailed

1. **Load theme configuration** - Gets the theme's JSON configuration
2. **Process structure with Auto-IDs** - Every element gets unique IDs
3. **Resolve flat/nested structures** - Flat structures use ID references, nested have direct children
4. **Generate elements recursively** - Each element becomes a div with:
   - Auto-assigned grid area (a, b, c... based on index)
   - Combined class names from type + presets
   - CSS variables from direct-variables
   - Content (text, @ references, or children)
5. **Apply presets and styles** - Classes determine appearance via theme CSS *?*
6. **Bind data components** - Special handling for complex React components *?*

---

## 🔗 Integration

### Auto Grid Area Assignment

Every element automatically gets a grid area based on its index in the parent:
- Index 0 → grid-area: a
- Index 1 → grid-area: b
- Index 25 → grid-area: z
- Index 26 → grid-area: aa

Exceptions:
- Elements with manual `grid-area` property
- Absolute positioned components (selection-handles, etc.)
- Root elements that define their own grid

### Dynamic Content (@ References)

The @ reference system enables dynamic content from theme configuration:

```javascript
// In JSON:
content: "@layout-icon:dashboard"

// Resolves to:
content: "📊"  // Icon from theme's dashboard layout preset

// Other examples:
"@preset:layouts.dashboard.title"  // Nested preset value
"@var:primaryColor"               // Theme variable (may be legacy)
```

### Data Component Integration

JTR can embed complex React components using data-component:

```javascript
{
  "data-component": "library",
  "data-preset-targets": [
    ":media-grid",              // Apply media-grid class to wrapper
    "item-card:shadow hover"    // Apply shadow hover to internal item-card class
  ]
}
```

Currently handles special cases for:
- **library** - Media library with onAddToCanvas
- **layertree** - Layer management with selection/reorder
- **editors** - Property editing with onPropertyChange

### Event Handling

```javascript
{
  content: "Click me",
  onClick: "open-modal"
}

// Dispatches:
window.dispatchEvent(new CustomEvent('jtor-action', {
  detail: { action: 'open-modal', theme: 'ui' }
}))
```

---

## 📊 Quick Reference

### Sub-domains
- **[STRUCTURE-PROCESSING](./JTR/STRUCTURE-PROCESSING.md)** - Flat vs nested structure handling
- **[PRESET-SYSTEM](./JTR/PRESET-SYSTEM.md)** - Layout, component, look preset management
- **[ELEMENT-GENERATION](./JTR/ELEMENT-GENERATION.md)** - React element creation
- **[DATA-BINDING](./JTR/DATA-BINDING.md)** - Data component integration
- **[THEME-INTEGRATION](./JTR/THEME-INTEGRATION.md)** - Theme loading and usage
- **[REFERENCE-RESOLUTION](./JTR/REFERENCE-RESOLUTION.md)** - @ syntax for dynamic content

### Key Architectural Points

1. **Everything generates as divs** - Semantic meaning comes from classes *where did this idea come from it seems like opinion or philosopy again and isnt accurate* 
2. **Automatic assignments** - IDs and grid areas require no manual work
3. **String or array flexibility** - Presets accept both for developer convenience
4. **Theme-driven** - All styling comes from theme configuration *im pretty sure this is true but again not really architectural this is more of a workflor or philosopy that we havent complletly worked out yet*
5. **Event-driven updates** - Communication via custom events

---

## 🚧 Technical Considerations

### Current Implementation Notes

1. **Default type is "one"** - Line 115: `const type = element.type || 'one';`
   - Should this default to "ui" for UI theme contexts? *yes!*

2. **String/Array preset handling** - Intentionally flexible via toArray() helper
   - Supports both for developer convenience
   - Primarily using strings in practice

3. **Hard-coded component handling** - Special cases for library, layertree, editors *ok i want to review this in more detail it seems like it is an issue and not what i wanted or expect as setup, maybe a mistake*
   - Could benefit from a registry pattern
   - Currently necessary for complex prop passing

4. **@ Reference system** - Active and important for dynamic content *ok yes we can probably remove this from this specific use case it is convoluted and causing more trouble than good, if it is still active but the concept of dynamic content is somethign we need to expand on in coming sessions*
   - Used for layout icons and preset values
   - @var syntax may need review

### Architecture Questions

- **Plugin system for data components?** - Would allow external component registration
- **TypeScript interfaces** - Current 'any' types could be more specific
- **Event system expansion** - More standardized event patterns?