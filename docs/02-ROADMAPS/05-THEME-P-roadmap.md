# THEMEprocessor-RM (Runtime Theme Processor Roadmap)

## Implementation Status

### ✅ Decision Made
- Port from OOPS with simplifications
- Start with core JSON → CSS functionality
- Add features incrementally
- Keep CSS Grid focus

### ✅ Current State
**Status**: Implemented - Minimal V1 Complete!
**Lines**: 169 total (vs 565 in OOPS)
**Location**: `/src/systems/theme-processor/`

**What's Working**:
- ✅ JSON theme loading from `/data/themes/`
- ✅ CSS variable generation with categories
- ✅ Scoped CSS (.ui, .one classes)
- ✅ Grid property support
- ✅ DOM injection
- ✅ Theme caching
- ✅ camelCase → kebab-case conversion

**Theme Files Created**:
- ✅ `ui-theme.json` - UI layout and styling
- ✅ `one-theme.json` - Content styling

### ✅ Phase 1: Core Functionality (COMPLETE)
- [X] Create `/src/systems/theme-processor/` folder
- [X] Port minimal version (169 lines ✓)
- [X] Basic JSON to CSS conversion
- [X] Variable system (CSS custom properties)
- [X] Simple injection to DOM
- [X] Grid-specific support

**Phase 2: Add When Needed**
- [ ] Import system for modular themes
- [ ] Category organization
- [ ] State-based styles
- [ ] Pseudo-element support
- [ ] Hot reload capabilities

---

## Features to Evaluate from OOPS

### Core Features (Keep for V1)

1. **JSON → CSS Conversion** ✓ Essential
   - Read theme JSON files
   - Generate scoped CSS
   - Inject into DOM

2. **Variable System** ✓ Essential
   - Create CSS custom properties
   - Category-based organization
   - camelCase → kebab-case conversion

3. **Scoping System** ✓ Essential
   - `.ui` class for UI theme
   - `.one` class for content theme
   - Prevent style bleeding

4. **Grid Support** ✓ Essential
   - Grid template areas
   - Grid properties
   - Auto area assignment integration

### Advanced Features (Phase 2)

1. **Import System** ? Useful but not critical
   - Themes import other JSON files
   - Merge variables and presets
   - Modular theme organization

2. **State Styles** ? Add when needed
   - `[data-state="checked"]` patterns
   - Hover/focus/active states
   - Dynamic state changes

3. **Preset System** ? Test first
   - Category-based presets
   - Layout presets
   - Component presets

4. **Pseudo Elements** ? Add when needed
   - `::before`, `::after` support
   - Content generation
   - Decorative elements

### Features to Skip Initially
- ❌ Hot reload (dev luxury)
- ❌ Source maps
- ❌ CSS minification
- ❌ Complex validation

---

## What Theme Processor Actually Does

### Built-in Features (Self-contained)
1. **Theme Loading** - Fetch JSON files
2. **CSS Generation** - Convert JSON to CSS strings
3. **Variable Creation** - CSS custom properties
4. **Style Injection** - Add to DOM
5. **Scope Management** - Prevent style conflicts
6. **Cache Management** - Store loaded themes
7. **Grid Integration** - Support grid properties

### External Dependencies (None!)
- No utils needed
- No store connections
- Pure transformation system
- Self-contained functionality

### What to Build (Simple Version)

```typescript
// Minimal needs:
class ThemeProcessor {
  private themes: Map<string, any> = new Map();
  
  async loadTheme(themeName: string): Promise<void> {
    // Fetch JSON
    // Parse and store
  }
  
  generateCSS(theme: any, scope: string): string {
    // Convert JSON to CSS
    // Handle variables
    // Apply scoping
  }
  
  applyTheme(themeName: string): void {
    // Generate CSS
    // Inject to DOM
  }
}
```

### Core to Keep
- **JSON structure**: Read theme configuration
- **Variable generation**: `--color-primary: #000`
- **Scoped output**: `.ui { ... }` or `.one { ... }`
- **Grid properties**: Full grid support

### Skip Initially
- Import system
- Complex presets
- State variations
- Development tools

---

## File Structure (Proposed)

```
/src/systems/theme-processor/
├── ThemeProcessor.ts    # Main class
├── types.ts             # TypeScript interfaces
└── index.ts             # Exports
```

Start with just these 3 files!

---

## Key Improvements for ONE

1. **Simplicity First**
   - Start with 150-200 lines not 565
   - Core functionality only
   - Add complexity when needed

2. **Grid Focus**
   - Prioritize grid properties
   - Support grid-template-areas
   - Work with ONEconnect grid system

3. **Better Architecture**
   - Clear separation from other systems
   - Type safety throughout
   - No circular dependencies

---

## JSON Theme Structure

### Minimal Theme Example
```json
{
  "variables": {
    "colors": {
      "primary": "#007acc",
      "background": "#ffffff"
    },
    "spacing": {
      "small": "0.5rem",
      "medium": "1rem"
    },
    "grid": {
      "gap": "1rem",
      "columns": "250px 1fr"
    }
  },
  "structure": {
    "root": {
      "display": "grid",
      "grid-template-areas": "\"a b\" \"a c\"",
      "height": "100vh"
    }
  }
}
```

### Generated CSS Output
```css
.ui {
  /* Variables */
  --color-primary: #007acc;
  --color-background: #ffffff;
  --spacing-small: 0.5rem;
  --spacing-medium: 1rem;
  --grid-gap: 1rem;
  --grid-columns: 250px 1fr;
  
  /* Structure */
  display: grid;
  grid-template-areas: "a b" "a c";
  height: 100vh;
}
```

---

## Questions Answered

1. **Keep import system?** → Not in V1, add later
2. **Full preset support?** → Start minimal, test first
3. **Development tools?** → Skip for now
4. **Validation?** → Basic only, no complex schemas

---

## For Next Agent

**Good News**: OOPS theme processor works perfectly!
- Location: `/OOPS-STORS/src/theme/runtimeThemeProcessor.ts`
- Complete implementation with all features
- Use as reference, but build minimal version

**Priority**: Build minimal ThemeProcessor that:
1. Loads JSON theme files
2. Generates CSS with variables
3. Applies proper scoping
4. Supports grid properties
5. Injects to DOM

**Don't**:
- Copy all 565 lines
- Add import system yet
- Include all preset logic
- Make it complex

**Do**:
- Start with core functionality
- Focus on grid support
- Keep under 200 lines
- Test with real themes

**Note**: This enables the visual theme system that makes ONE special - JSON themes that become live CSS!