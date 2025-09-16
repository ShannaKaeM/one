# runtimeThemeProcessor

## Overview
**Purpose**: Converts JSON theme configurations to CSS at runtime with intelligent scoping and variable management
**Location**: `/src/theme/runtimeThemeProcessor.ts`
**Size**: 566 lines
**Type**: System Utility (Singleton)

---

## Component Dependencies

### Sub-components Used
- none (utility system)

### Used By Components
- **App**: Loads and applies themes
- **Editors**: Loads ONE theme variables
- **ONEconnect**: Gets theme configuration

---

## State Management

### Local State (Component Internal)
- `themes`: Cached theme configurations

### ONEstore Integration
- none (independent system)

---

## System Integration

### ONEconnect
- Provides theme configuration data

### Theme Processor (Self)
- **JSON Input**: Theme configuration files
- **CSS Output**: Generated style sheets

### Presets
- Processes all preset categories
- Handles state-based styles
- Manages pseudo-elements

### Icons
- **Used**: none
- **Source**: N/A

### TypeScript
```typescript
class RuntimeThemeProcessor {
  private themes: Record<string, any> = {};
  
  async loadThemeWithImports(themeUrl: string): Promise<any>
  generateCSS(themeConfig: any, themeName: string): string
  injectCSS(cssContent: string, styleId: string): void
  async applyTheme(themeName: string): Promise<boolean>
}
```

### Utils
- none (is a utility itself)

---

## Data Flow

### Inputs
- **Theme JSON**: Configuration files from `/data/themes/`
- **Theme Name**: Which theme to load (ui, one)

### Outputs  
- **CSS**: Generated style sheet injected into DOM
- **Theme Config**: Cached for component access
- **Events**: none

---

## Implementation Notes

### Key Features
- **Import System**: Themes can import other JSON files
- **Variable System**: Creates CSS custom properties
- **Smart Scoping**: `.ui` for UI theme, `.one` for content
- **Category Organization**: Groups variables by type
- **State Styles**: `[data-state="checked"]` patterns
- **Pseudo Elements**: `::before`, `::after` support
- **Hot Reload**: Updates without page refresh

### CSS Generation Flow
1. Load theme JSON (with imports)
2. Generate base class with variables
3. Apply variables to CSS properties
4. Generate element styles
5. Generate presets by category
6. Handle states and pseudo-elements
7. Inject into DOM

### Special Handling
- **Double Scoping Prevention**: `.ui` not `.ui .ui`
- **Preset Detection**: Identifies CSS vs subcategories
- **Variable Conversion**: camelCase → kebab-case
- **Layout Presets**: Use compound selectors `.ui.layout-name`
- **UI Presets**: Also compound to prevent bleeding
- **ONE Presets**: Descendant selectors for content

### Categories
- **Variables**: colors, spacing, sizing, typography, visual, borders, positioning, grid, flex, behavior, animation
- **Presets**: layouts, looks, positions, components
- **Elements**: uiElements (UI theme), oneElement (ONE theme)

---

## Questions
1. [ ] Add development/production modes?
2. [ ] CSS minification in production?
3. [ ] Source maps for debugging?
4. [ ] Theme validation before processing?