---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: 01-ROADMAP.md#L262-271
related: [dual-theme-architecture, runtime-theme-processor, component-communication]
---

# Data Flow Architecture

## Definition
The unidirectional flow of data from JSON theme files through processing to final rendered output, ensuring clean separation and predictable behavior.

## Key Principles
- One-way data flow
- Independent processing paths
- Clear transformation stages
- No circular dependencies

## Flow Diagram

```
[ui-theme.json] + [one-theme.json]
    ↓
RuntimeThemeProcessor (independent loading)
    ↓
CSS Generation (.ui + .one classes)
    ↓
[UIGenerator → React Dashboard] + [DirectRenderer → HTML/CSS Output]
```

## Stage Details

### 1. Source Data
- **Input**: Theme JSON files
- **Location**: `/public/data/themes/`
- **Format**: Structured JSON with variables, presets, helpers
- **Independence**: Each theme loads separately

### 2. Processing Layer
- **Component**: RuntimeThemeProcessor
- **Action**: Transform JSON to CSS
- **Scope**: Apply parent classes (.ui, .one)
- **Output**: Generated stylesheets

### 3. CSS Generation
- **Variables**: CSS custom properties
- **Classes**: Scoped style rules
- **Helpers**: Utility classes
- **Injection**: DOM style elements

### 4. Rendering Layer
- **UI Path**: UIGenerator → React components
- **ONE Path**: DirectRenderer → Pure HTML/CSS
- **Separation**: No cross-communication
- **Result**: Conflict-free output

## Data Transformation

### JSON to CSS
```json
// Input
{
  "presets": {
    "button": {
      "primary": {
        "--background": "blue"
      }
    }
  }
}

// Output
.one .button.primary {
  background: var(--background);
}
```

### CSS to Components
```javascript
// UIGenerator uses classes
<div className="ui button primary">

// DirectRenderer outputs HTML
<div class="one button primary">
```

## Benefits

### Clean Architecture
- Predictable transformations
- Easy debugging
- Clear responsibilities
- Modular components

### Performance
- Process once, use many
- No runtime recalculation
- Efficient rendering
- Minimal overhead

### Maintainability
- Change themes without code
- Update processors independently
- Test each stage separately
- Clear data lineage

## Extension Points

### Custom Processors
- Add new theme types
- Custom transformations
- Additional outputs
- Plugin architecture

### Multiple Outputs
- React components
- Vue components
- Web Components
- Static HTML

## Related Atoms
- `dual-theme-architecture` - Theme separation strategy
- `runtime-theme-processor` - Processing engine
- `component-communication` - How components interact