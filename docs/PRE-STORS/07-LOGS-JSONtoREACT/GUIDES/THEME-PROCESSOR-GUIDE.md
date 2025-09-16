# Runtime Theme Processor - Complete System Guide

## Overview
The Runtime Theme Processor is a powerful JSON-to-CSS conversion system that transforms theme configurations into optimized CSS at runtime. It supports development and production modes, theme imports, and intelligent scoping.

## Table of Contents
1. [Core Features](#core-features)
2. [Theme JSON Structure](#theme-json-structure)
3. [CSS Generation Process](#css-generation-process)
4. [Variable System](#variable-system)
5. [Element Configuration](#element-configuration)
6. [Preset System](#preset-system)
7. [Import System](#import-system)
8. [Mode Management](#mode-management)
9. [API Reference](#api-reference)
10. [Best Practices](#best-practices)

---

## 🎯 Core Features

### Key Capabilities
- **Runtime CSS Generation**: Converts JSON to CSS on-the-fly
- **Development Mode**: All variables available for debugging
- **Production Mode**: Tree-shaking optimization ready
- **Hot Reload**: CSS updates without page refresh
- **Theme Imports**: Modular theme composition
- **Smart Scoping**: Intelligent class generation
- **Variable Categorization**: Organized CSS custom properties

### Architecture Overview
```
JSON Theme → Theme Processor → CSS Generation → Style Injection
     ↓              ↓                 ↓                ↓
  Config      Processing         Optimization    <style> tag
```

---

## 📋 Theme JSON Structure

### Complete Theme Schema
```json
{
  "version": "1.0.0",
  "name": "Theme Name",
  "description": "Theme description",
  "class": "ui",                    // Base class for theme
  "imports": ["./base-theme.json"], // Optional imports
  
  "variables": {
    "color": {
      "defaultValue": "none",
      "type": "color",
      "category": "colors",
      "description": "Text color",
      "cssProperty": "--color"
    }
  },
  
  "uiElements": {                   // For UI theme
    "ui": {
      "display": "grid",
      "width": "100%"
    }
  },
  
  "presets": {
    "layouts": {},
    "components": {},
    "looks": {}
  },
  
  "structure": {                    // UI structure definition
    "root": {
      "type": "ui",
      "layouts": "db-full"
    }
  }
}
```

---

## 🎨 CSS Generation Process

### 1. Theme Class Generation
```css
/* Base theme class with all variables */
.ui {
  /* Variables */
  --color: none;
  --background-color: none;
  
  /* Applied properties */
  color: var(--color);
  background-color: var(--background-color);
}
```

### 2. Element Styles
```css
/* UI Elements (scoped) */
.ui .button {
  padding: 0.5rem 1rem;
}

/* Special case: no double scoping */
.ui {  /* Not .ui .ui */
  display: grid;
}
```

### 3. Preset Classes
```css
/* Layout presets */
.ui .box {
  display: block;
  width: 100%;
}

/* Component presets */
.ui .button {
  cursor: pointer;
}

/* Look presets */
.ui .primary {
  --background-color: hsl(342, 36%, 53%);
  background-color: var(--background-color);
}
```

### 4. State-Based Styles
```css
/* Data-state attributes */
.ui .switch[data-state="checked"] {
  --background-color: hsl(342, 36%, 53%);
  background-color: var(--background-color);
}

/* Special switch thumb handling */
.ui .switch[data-state="checked"] + .switch-thumb {
  --transform: translateX(1rem);
  transform: var(--transform);
}
```

---

## 🔧 Variable System

### Variable Definition
```json
"variables": {
  "backgroundColor": {
    "defaultValue": "hsl(0, 0%, 15%)",
    "type": "color",
    "category": "colors",
    "description": "Background color",
    "cssProperty": "--background-color"
  }
}
```

### Categories
- **colors**: Color-related variables
- **spacing**: Padding, margin, gap
- **sizing**: Width, height, dimensions
- **typography**: Font properties
- **visual**: Effects, filters, transforms
- **borders**: Border properties
- **positioning**: Position, z-index
- **grid**: Grid-specific properties
- **flex**: Flexbox properties
- **behavior**: Transitions, animations
- **misc**: Uncategorized variables

### Variable Processing
1. **CSS Custom Property**: Creates `--variable-name`
2. **Direct Application**: Applies to CSS property
3. **Categorization**: Groups by category in output
4. **CamelCase Conversion**: Automatic kebab-case conversion

---

## 🏗️ Element Configuration

### UI Theme Elements (uiElements)
```json
"uiElements": {
  "ui": {
    "display": "grid",
    "width": "100%",
    "height": "100%"
  }
}
```

### ONE Theme Elements (oneElement)
```json
"oneElement": {
  "one": {
    "display": "block",
    "position": "relative"
  }
}
```

### Scoping Rules
- **UI Theme**: Elements scoped to `.ui` class
- **ONE Theme**: Elements are content (no scoping)
- **Smart Detection**: Prevents double scoping (`.ui .ui`)

---

## 🎭 Preset System

### Preset Structure
```json
"presets": {
  "layouts": {
    "box": {
      "display": "block",
      "width": "100%",
      "--padding": "1rem",
      "_states": {
        "active": {
          "--background-color": "red"
        }
      }
    }
  }
}
```

### Special Properties
- **CSS Variables**: Start with `--`
- **Direct CSS**: Regular property names
- **_states**: State-based styles
- **_pseudo**: Pseudo-element styles
- **_states-pseudo**: Combined state + pseudo

### Category Processing
```javascript
// Recursive preset processing
const processPresets = (obj, path = []) => {
  // Detects if object has CSS properties
  // Generates appropriate classes
  // Handles nested categories
};
```

---

## 📦 Import System

### Import Configuration
```json
{
  "imports": [
    "./base-variables.json",
    "./color-theme.json",
    "./component-presets.json"
  ]
}
```

### Merge Strategy
1. **Variables**: Deep merge, later imports override
2. **Looks**: Category-aware merging
3. **Structure**: Main theme structure preserved
4. **Elements**: First import wins

### Import Resolution
```javascript
// Handles relative and absolute paths
const baseUrl = themeUrl.startsWith('http') 
  ? themeUrl 
  : window.location.origin + themeUrl;
const importUrl = new URL(importPath, baseUrl).href;
```

---

## ⚙️ Mode Management

### Development Mode
```javascript
runtimeThemeProcessor.setMode('development');
```
- All variables included
- No optimization
- DevTools friendly
- Debug information

### Production Mode
```javascript
runtimeThemeProcessor.setMode('production');
```
- Tree-shaking ready
- Optimized output
- Minimal CSS
- No debug info

---

## 📚 API Reference

### Core Methods

#### setMode(mode)
```javascript
setMode(mode: 'development' | 'production'): void
```

#### loadThemeWithImports(themeUrl)
```javascript
async loadThemeWithImports(themeUrl: string): Promise<any>
```
Loads theme with all imports resolved.

#### generateCSS(themeConfig, themeName)
```javascript
generateCSS(themeConfig: any, themeName: string = 'ui'): string
```
Generates CSS string from theme configuration.

#### injectCSS(cssContent, styleId)
```javascript
injectCSS(cssContent: string, styleId: string = 'theme-styles'): void
```
Injects CSS into document head.

#### applyTheme(themeName)
```javascript
async applyTheme(themeName: string = 'ui'): Promise<boolean>
```
Complete theme loading and application.

### Helper Methods

#### setTheme(themeName, themeConfig)
```javascript
setTheme(themeName: string, themeConfig: any): void
```

#### getTheme(themeName)
```javascript
getTheme(themeName: string): any
```

### Private Methods
- `categorizeVariables()`: Groups variables by category
- `camelToKebab()`: Converts naming conventions
- `varKeyToCssProperty()`: Maps variable keys to CSS

---

## 💡 Best Practices

### 1. Theme Organization
```
themes/
├── ui-theme.json          # Main UI theme
├── one-theme.json         # Content theme
├── base/
│   ├── variables.json     # Shared variables
│   └── colors.json        # Color system
└── presets/
    ├── layouts.json       # Layout presets
    └── components.json    # Component presets
```

### 2. Variable Naming
```json
{
  "backgroundColor": {      // CamelCase in JSON
    "cssProperty": "--background-color"  // Kebab-case in CSS
  }
}
```

### 3. Preset Organization
- Use categories for organization
- Keep presets focused and single-purpose
- Use composition over complexity

### 4. Import Strategy
- Base variables first
- Theme-specific overrides last
- Avoid circular imports

### 5. Performance Tips
- Use production mode for deployment
- Minimize variable count
- Leverage CSS inheritance

---

## 🔍 Debugging

### Enable Debug Logging
```javascript
console.log(`🎨 Loading ${themeName} theme from: ${themeUrl}`);
console.log(`📝 Generated CSS length: ${css.length} characters`);
console.log(`💉 Injected CSS with ID: ${styleId}`);
```

### Check Generated CSS
```javascript
const styleElement = document.getElementById('ui-theme-styles');
console.log(styleElement.textContent);
```

### Verify Theme Loading
```javascript
const theme = runtimeThemeProcessor.getTheme('ui');
console.log('Theme loaded:', !!theme);
```

---

## 🚀 Advanced Features

### Dynamic Theme Switching
```javascript
// Switch themes at runtime
await runtimeThemeProcessor.applyTheme('dark');
```

### Variable Overrides
```javascript
// Override variables after loading
const theme = runtimeThemeProcessor.getTheme('ui');
theme.variables.primaryColor.defaultValue = 'blue';
const css = runtimeThemeProcessor.generateCSS(theme, 'ui');
runtimeThemeProcessor.injectCSS(css, 'ui-theme-styles');
```

### Custom Categories
```json
"variables": {
  "customVar": {
    "category": "my-custom-category",
    "defaultValue": "value"
  }
}
```

---

## 📊 Output Examples

### Generated CSS Structure
```css
/* === UI THEME - RUNTIME GENERATED === */

.ui {
  /* ========== COLORS ========== */
  --color: none;
  --background-color: hsl(0, 0%, 15%);
  
  /* ========== SPACING ========== */
  --padding: 0;
  --margin: 0;
  
  /* ========================================
     APPLY ALL VARIABLES TO CSS PROPERTIES
     ======================================== */
  color: var(--color);
  background-color: var(--background-color);
  padding: var(--padding);
  margin: var(--margin);
}

/* ========== UI ELEMENT BASE STYLES ========== */
.ui {
  display: grid;
  width: 100%;
}

/* ========== UI THEME PRESETS ========== */
/* === LAYOUTS === */
.ui .box {
  display: block;
  width: 100%;
}
```

---

## 🎯 Common Use Cases

### 1. Multi-Theme Application
```javascript
// Load multiple themes
await runtimeThemeProcessor.applyTheme('ui');
await runtimeThemeProcessor.applyTheme('one');
```

### 2. Theme Composition
```json
{
  "imports": [
    "./light-mode.json",
    "./brand-overrides.json"
  ]
}
```

### 3. Dynamic Styling
```javascript
// Update theme based on user preferences
if (userPrefersDark) {
  await runtimeThemeProcessor.applyTheme('ui-dark');
}
```

---

## 🛠️ Troubleshooting

### CSS Not Applied
1. Check theme loaded: `getTheme()` returns config
2. Verify style element exists in DOM
3. Check for CSS syntax errors
4. Ensure proper class on root element

### Variables Not Working
1. Verify variable definition has `cssProperty`
2. Check variable categorization
3. Ensure proper scope (`.ui` class present)

### Import Failures
1. Check import paths (relative vs absolute)
2. Verify JSON syntax in imported files
3. Check browser console for fetch errors

---

## Future Enhancements

- CSS Module support
- Theme validation
- Performance metrics
- CSS minification
- Source maps for debugging
- Theme inheritance chains
- Conditional theme loading