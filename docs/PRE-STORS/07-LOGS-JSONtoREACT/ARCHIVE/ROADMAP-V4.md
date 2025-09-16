# Studio1 JSONtoREACT Documentation & Roadmap

## Project Overview

**Studio1** is a visual design builder application where users create web designs using the ONE system.
- **UI Theme (ui-theme.json)** - Powers Studio1's interface (dogfooding), exports to React
- **ONE Theme (one-theme.json)** - User's design output, exports to HTML/other formats


### Core Element System
All elements in Studio1 are type "one" - a single, unified element type with behaviors controlled through presets.

#### Base Architecture
- **`.ui`** - Theme wrapper providing CSS variable scope for Studio interface
- **`.one`** - Base variables with 100+ pre applied base variables. 


### Preset System
Three categories of composable presets: 
*added to the ui structure as data points for easy organization*

1. **Layouts** - Structure, grids, sizing
2. **Components** - Reusable UI elements - ie sliders, buttons etc. 
3. **Looks** - Visual styling and theming
4. **presets**: General presets (all categories)

### Direct Variables System
Direct CSS variable setting for element-specific customization:
*Unified approach combining grid configuration and variable overrides*

```json
"direct-variables": {
  "cols": "1fr",
  "rows": "40px 1fr 40px",
  "areas": "'a' 'b' 'c'",
  "gap": "1rem",
  "padding": "2rem",
  "color": "hsl(0, 0%, 100%)",
  "font-size": "1.125rem"
}
```

**How it works:**
- Grid properties (`cols`, `rows`, `areas`, `gap`) → Direct CSS for layout
- All other properties → CSS variables with `--` prefix

**Output:**
```html
style="grid-template-columns: 1fr; grid-template-rows: 40px 1fr 40px; grid-template-areas: 'a' 'b' 'c'; gap: 1rem; --padding: 2rem; --color: hsl(0, 0%, 100%); --font-size: 1.125rem;"
```



#### Direct Variable Configuration
- **direct-variables**: Combined grid configuration and CSS variable overrides
  ```json
  "direct-variables": {
    "areas": "'a b c'",
    "cols": "1fr 2fr 1fr", 
    "rows": "auto",
    "padding": "2rem",
    "overflow": "hidden",
    "font-size": "1.125rem"
  }
  ```

#### Interaction
- **onClick**: Action identifier for click events

### Data Structure: Formats (Both Work!)
We support both arrays and space-separated strings:
- **Arrays**: `["box", "primary"]` - Better for programmatic manipulation
- **Strings**: `"box primary"` - Cleaner for hand-written JSON
