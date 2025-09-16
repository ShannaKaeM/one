# Theme Processor

## 🎯 Quick Summary
> **Purpose**: Runtime JSON-to-CSS converter that transforms theme configurations into live styles  
> **Type**: Core Processing System  
> **Location**: `/src/theme/runtimeThemeProcessor.ts`  
> **Related**: [JSON-THEMES](../02-PUBLIC/JSON-THEMES.md), [APP](../01-CORE/APP.md), [JTR](../01-CORE/JTR.md)

---

## 🔄 Simple Explanation

Theme Processor is the **CSS generation engine** that converts JSON theme files into actual CSS at runtime:

1. **Fetches theme JSON** - Loads from /public/data/themes/
2. **Processes imports** - Merges multiple JSON files
3. **Generates CSS** - Converts JSON to CSS rules
4. **Injects styles** - Creates <style> elements
5. **Manages themes** - Stores configurations in memory

```
JSON theme file → Theme Processor → CSS generation → Style injection → Themed app
```

---

## 📋 Technical Specification

### Core Operations

| Method | Function |
|--------|----------|
| **loadThemeWithImports()** | Fetch and merge JSON files |
| **generateCSS()** | Convert JSON to CSS string |
| **injectCSS()** | Insert styles into DOM |
| **applyTheme()** | Complete theme application |
| **setTheme()** | Store theme in memory |

### CSS Generation Flow
1. **Theme class** - Root selector (.ui or .one)
2. **CSS variables** - Custom properties with values
3. **Property mapping** - Apply variables to CSS properties
4. **Element styles** - Base element styling
5. **Presets** - Component and layout classes
6. **Helpers** - Utility classes

### JSON Structure Processing
```json
{
  "class": "ui",                    // Root CSS class
  "variables": {},                  // CSS custom properties
  "presets": {                      // Component styles
    "layouts": {},
    "components": {},
    "looks": {}
  },
  "imports": ["./base.json"]        // Merge other files
}
```

---

## 🔗 Integration

### Loading Sequence
```
App.tsx starts → applyTheme('ui') → Fetch JSON → Process → Inject CSS
```

### Theme Application
- **UI Theme**: Applied with `.ui` class scoping
- **ONE Theme**: Applied with `.one` class for content
- **Hot reload**: Replace <style> on theme change
- **Multi-theme**: Both themes can coexist

### Variable System
```javascript
// JSON variable
"primaryColor": {
  "defaultValue": "#3b82f6",
  "cssProperty": "--primary-color",
  "category": "colors"
}

// Generated CSS
.ui {
  --primary-color: #3b82f6;
  color: var(--primary-color);
}
```

---

## 📊 Quick Reference

### Sub-domains
- **CSS-GENERATION** - Core CSS creation from JSON structure
- **THEME-LOADING** - JSON fetching and import resolution
- **VARIABLE-SYSTEM** - CSS custom property management
- **PRESET-PROCESSING** - Component and layout style generation
- **CSS-INJECTION** - Runtime style element management
- **THEME-STORAGE** - In-memory theme configuration storage
- **TREE-SHAKING** - Unused variable removal (not implemented)

### Key Features
- Runtime generation
- Import support
- Hot reloading
- Proper scoping
- Category organization

### Processing Rules
- Always scope to theme class
- Convert camelCase to kebab-case
- Handle special properties (_states, _pseudo)
- Merge imports before own properties
- Replace existing styles on reload