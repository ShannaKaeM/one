# Theme Processor Guide (For Dummies!)

## What is the Runtime Theme Processor?

The Runtime Theme Processor is like a CSS factory. You feed it JSON configuration, and it builds all the CSS your app needs. Think of it as a translator that turns your theme settings into actual styles the browser can understand.

## The Big Picture

```
Theme JSON → Theme Processor → CSS Stylesheet → Styled Website
```

## How It Works

### 1. Load Theme JSON
The processor fetches your theme file (like `ui-theme.json`) which contains:
- CSS Variables (colors, sizes, etc.)
- Base element styles
- Presets (reusable style combinations)
- Structure (what elements to create)

### 2. Generate CSS
It converts all that JSON into real CSS:
```json
"primary": {
  "--background-color": "hsl(342, 36%, 53%)"
}
```
Becomes:
```css
.primary {
  --background-color: hsl(342, 36%, 53%);
  background-color: var(--background-color);
}
```

### 3. Inject Into Page
The generated CSS gets added to your webpage automatically!

## Key Concepts

### CSS Variables (The Building Blocks)
Your theme has 100+ CSS variables for everything:
- Colors: `--background-color`, `--color`, `--border-color`
- Sizing: `--width`, `--height`, `--padding`
- Layout: `--display`, `--grid-template-areas`
- Typography: `--font-size`, `--font-weight`

### The `.ui` Class (Theme Scope)
Everything UI-related lives inside `.ui`:
```css
.ui {
  /* All your theme variables live here */
  --color: white;
  --background-color: black;
  /* ... 100+ more variables ... */
}
```

### OneElement (Base Styles)
Defines the minimal base element styles:
```json
"oneElement": {
  "one": {
    "position": "relative",
    "display": "block"
  }
}
```
Creates:
```css
.one {
  position: relative;
  display: block;
}
```
Note: The base `.one` class is intentionally minimal - all other styling comes from presets! Box-sizing is handled globally in CSS.

### Presets (Style Packages)
Presets are organized into three main categories:

#### Layouts (Structure/Grid/Sizing/Positioning)
```json
"presets": {
  "layouts": {
    "box": {
      "--display": "grid",
      "--width": "100%",
      "--height": "100vh"
    },
    "dashboard-5": {
      "--grid-template-areas": "'a b e' 'a c e' 'a d e'",
      "--grid-template-columns": "250px 1fr 300px",
      "--grid-template-rows": "60px 1fr 60px"
    },
    "positions": {
      "a": { "--grid-area": "a" },
      "b": { "--grid-area": "b" },
      "c": { "--grid-area": "c" },
      "d": { "--grid-area": "d" },
      "e": { "--grid-area": "e" }
    }
  }
}
```

#### Components (Atomic UI Elements)
```json
"presets": {
  "components": {
    "button": {
      "--cursor": "pointer",
      "--user-select": "none"
    },
    "field": {
      "--cursor": "text",
      "--outline": "1px solid var(--border-color)"
    }
  }
}
```

#### Looks (Visual/Colors/Theming)
```json
"presets": {
  "looks": {
    "primary": {
      "--background-color": "hsl(342, 36%, 53%)",
      "--color": "white"
    },
    "secondary": {
      "--background-color": "hsl(0, 0%, 50%)",
      "--color": "white"
    }
  }
}
```


## What Gets Generated

### 1. Theme Variables
```css
.ui {
  --color: white;
  --background-color: black;
  /* ... all variables with defaults ... */
  
  /* Then applies them */
  color: var(--color);
  background-color: var(--background-color);
}
```

### 2. Base Element Styles
```css
.one {
  position: relative;
  display: block;
}
```

### 3. Preset Classes
```css
/* Layout preset */
.box {
  --display: grid;
  display: var(--display);
}

/* Look preset */
.primary {
  --background-color: hsl(342, 36%, 53%);
  background-color: var(--background-color);
}
```

## How Presets Work

### Categories and Auto-Discovery
The theme processor automatically discovers presets in subcategories:
- **layouts**: Structure, grids, sizing, positioning
  - `presets.layouts.box` → `.box`
  - `presets.layouts.dashboard-5` → `.dashboard-5`
  - `presets.layouts.positions.a` → `.a` (grid areas)
- **components**: Atomic UI elements
  - `presets.components.button` → `.button`
  - `presets.components.fields.checkbox` → `.checkbox`
- **looks**: Visual styling, theming
  - `presets.looks.primary` → `.primary`
  - `presets.looks.colors.secondary` → `.secondary`

### The Magic Double-Set
When you define a variable in a preset:
```json
"--background-color": "red"
```

The processor creates BOTH:
```css
--background-color: red;        /* The variable */
background-color: var(--background-color);  /* Apply it */
```

This means you can override just the variable later!

## Development vs Production Mode

### Development Mode (Default)
- Outputs ALL 100+ variables (even if not used)
- Easier to experiment in DevTools
- Bigger CSS file

### Production Mode
- Only outputs variables that are actually used
- Smaller, optimized CSS
- Tree-shaking for performance

## How UI Theme vs ONE Theme Differ

### UI Theme (Studio Interface)
- Scoped to `.ui` class
- Powers the Studio1 interface
- Applied to all elements via CSS variables

### ONE Theme (User Designs)
- No `.ui` scope (cleaner output)
- For user-created designs
- Exports to clean HTML without framework dependencies

## Common Patterns

### Adding a New Preset
```json
"presets": {
  "layouts": {
    "centered": {
      "--display": "flex",
      "--justify-content": "center",
      "--align-items": "center"
    }
  },
  "components": {
    "toggle": {
      "--cursor": "pointer",
      "--transition": "all 0.2s ease"
    }
  },
  "looks": {
    "success": {
      "--background-color": "green",
      "--color": "white"
    }
  }
}
```

### Using Multiple Themes
```javascript
// Load UI theme for interface
runtimeThemeProcessor.applyTheme('ui');

// Load ONE theme for user content
runtimeThemeProcessor.applyTheme('one');
```

## Tips & Tricks

1. **Variables Are Inherited**: Child elements inherit parent variables
2. **Presets Stack**: Use multiple presets for combined effects
3. **Check Console**: The processor logs what it's generating
4. **Use DevTools**: All variables are visible in browser DevTools
5. **Hot Reload**: Changes to theme JSON update instantly

## Debugging

### Check What's Loaded
```javascript
const theme = runtimeThemeProcessor.getTheme('ui');
console.log(theme);
```

### See Generated CSS
Look for `<style id="ui-theme-styles">` in your page's `<head>`

### Console Messages
- `🎨 Loading ui theme` - Theme fetch started
- `📝 Generated CSS length: 15000` - CSS generated
- `💉 Injected CSS` - CSS added to page

## Important Implementation Details

### Import System
The theme processor supports importing other JSON files:
```json
{
  "imports": ["./base-variables.json", "./color-presets.json"],
  "presets": {
    // Your custom presets here
  }
}
```

### Variable Scoping
- All CSS variables are scoped to their container (`.ui` for UI theme)
- Variables cascade down through child elements
- Inline styles from JSONtoREACT use the same variables

### How It Works with JSONtoREACT
1. Theme processor generates CSS classes and variables
2. JSONtoREACT applies these classes to elements
3. Inline-styles in JSONtoREACT reference the same CSS variables
4. Everything stays in sync!

The Runtime Theme Processor is your style engine - feed it JSON, get beautiful CSS!