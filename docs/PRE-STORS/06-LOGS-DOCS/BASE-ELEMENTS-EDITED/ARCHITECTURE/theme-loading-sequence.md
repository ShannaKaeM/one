---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: 01.02-THEME-PROCESSOR.md
related: [dual-theme-architecture, runtime-theme-processor]
---

# Theme Loading Sequence

## Definition
The ordered process by which themes are loaded, processed, and injected into the DOM, ensuring proper initialization and conflict-free operation.

## Key Principles
- Themes load independently
- CSS generation happens once at load
- Styles inject into specific containers
- No duplicate style elements

## Loading Process

### 1. Theme Loading
```typescript
// Load and apply a theme
await runtimeThemeProcessor.applyTheme('ui');
await runtimeThemeProcessor.applyTheme('one');
```

### 2. Processing Pipeline
1. Load theme JSON configuration
2. Generate CSS variables
3. Process presets with parent scoping
4. Generate helper classes
5. Inject styles into document

### 3. CSS Generation
```typescript
const css = runtimeThemeProcessor.generateCSS(themeConfig, 'ui');
runtimeThemeProcessor.injectCSS(css, 'ui-theme-styles');
```

## Theme File Locations
- **UI Theme**: `/public/data/themes/ui-theme.json`
- **ONE Theme**: `/public/data/themes/one-theme.json`

## Style Injection

### DOM Structure
```html
<style id="ui-theme-styles">
  /* UI theme CSS */
</style>
<style id="one-theme-styles">
  /* ONE theme CSS */
</style>
```

### Injection Rules
- Each theme gets its own style element
- IDs prevent duplication
- Styles are replaced, not appended
- Order matters for cascade

## Loading Order

### Recommended Sequence
1. **UI Theme First** - Dashboard structure
2. **ONE Theme Second** - Canvas content
3. **Custom Themes** - Additional as needed

### Why Order Matters
- CSS cascade rules apply
- Later themes can override
- Variables scope properly
- Clean separation maintained

## API Methods

### Getting Loaded Themes
```typescript
const uiTheme = runtimeThemeProcessor.getTheme('ui');
const oneTheme = runtimeThemeProcessor.getTheme('one');
```

### Checking Load Status
```typescript
if (runtimeThemeProcessor.hasTheme('ui')) {
  // Theme is loaded
}
```

## Performance Notes
- CSS generated once per load
- Style elements reused
- Minimal runtime overhead
- Efficient parent selectors

## Error Handling
- Missing theme files logged
- Malformed JSON caught
- Fallback to defaults
- No silent failures

## Component Preset Processing (NEW)

### Flat Component Integration
The theme loading sequence now includes processing of component presets for React integration:

```typescript
// Enhanced CSS generation includes component presets
const css = runtimeThemeProcessor.generateCSS(themeConfig, 'ui', {
  includeComponentPresets: true
});
```

### Component Preset Categories
During theme processing, presets are now categorized:
- **Standard Presets**: Applied to JSON elements  
- **Component Presets**: Distributed to React component parts
- **Mixed Usage**: Presets can serve both purposes

### Processing Flow
1. Load theme JSON with all presets
2. Generate CSS for standard element presets
3. Generate CSS for component-specific presets (e.g., `layerTree-item`)
4. Process `data-component-presets` handling in UIGenerator
5. Inject complete CSS including component support

### Component-Aware CSS Generation
```css
/* Standard preset */
.ui .neutral-dark {
  --background-color: hsl(210, 10%, 15%);
}

/* Component preset */
.ui .layerTree-item {
  --padding: 8px;
  --border-radius: 4px;
}

/* Component part preset (same CSS, different usage) */
.ui .list-item {
  --padding: 6px 12px;
  --cursor: pointer;
}
```

## Related Atoms
- `dual-theme-architecture` - Why separate themes
- `flat-component-pattern` - Component preset architecture
- `component-preset-distribution` - How presets flow to components