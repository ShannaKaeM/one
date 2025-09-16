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
2. **Components** - Reudable UI elements - ie sliders, buttons etc. 
3. **Looks** - Visual styling and theming

### Inline Style System
Inline Styleing: 
*added to the ui structure as a data point for easy organization (primaryly for gird and lyouts)*


  "inline": {
    "cols": "1fr",
    "rows": "40px 1fr 40px"
    "areas": "'a' 'b' 'c'",
    "padding": "1rem",
    "overflow": "auto"
  },


### CSS Class Output
- UI Theme: `class="ui one box full-height button primary rounded"` (scoped to .ui)
- ONE Theme: `class="one box full-height button primary rounded"` (no .ui scope)

### Property Definitions

#### Core Properties
- **type**: Always "one" - defines the element type
- **data-label**: User reference label (not for HTML, just for identification in editor)
- **content**: Text content to display
- **children**: Array of child element IDs (for flat structure) or nested elements *what does this mean aray for childern en nested element, do we still neeed to define children or is it optional in nexted?*

#### Styling Properties (Three Categories + General)
**Note**: All preset properties accept both arrays AND space-separated strings:
- Array format: `["box", "full-height"]`  
- String format: `"box full-height"`

- **layouts**: Layout presets (from layouts category)
  - Examples: `"box"`, `"box bento-5"`, `["box", "full-height"]`
  - Controls: structure, grid systems, sizing
- **components**: Component presets (from components category)
  - Examples: `"button"`, `["field", "checkbox"]`, `"slider"`
  - Controls: atomic UI element behaviors and styles
- **looks**: Visual presets (from looks category)
  - Examples: `"primary"`, `"secondary bold-text-block"`, `["primary"]`
  - Controls: colors, borders, shadows, visual effects, theming
- **presets**: General presets (all categories)
  - Examples: `"custom-class"`, `["box", "primary", "special"]`
  - Flexible preset application
- **grid-area**: Positions element in parent's grid always use universal grid areas ( "a", "b", "c") never use semantic names liek header etc. 

#### Inline Configuration
- **grid**: Direct grid configuration (overrides preset grids)
  ```json
  "grid": {
    "areas": "'a b c'",
    "cols": "1fr 2fr 1fr", 
    "rows": "auto"
  }
  ```
  Produces inline styles: `style="--grid-template-areas: 'a b c'; --grid-template-columns: 1fr 2fr 1fr';"`

- **inline-styles**: Direct CSS variable overrides *these are still being tested for their value ion ur system we wont know the full value until we get the dashbard ui interface running*
  ```json
  "inline-styles": {
    "padding": "2rem",
    "overflow": "hidden",
    "font-size": "1.125rem"
  }
  ```
  - Automatically adds `--` prefix to match your CSS variables
  - Use exact CSS variable names (no mapping)
  - Produces: `style="--padding: 2rem; --overflow: hidden; --font-size: 1.125rem;"`

#### Interaction
- **onClick**: Action identifier for click events

### Preset Formats (Both Work!)
We support both arrays and space-separated strings:
- **Arrays**: `["box", "primary"]` - Better for programmatic manipulation
- **Strings**: `"box primary"` - Cleaner for hand-written JSON

Both produce identical results. The system converts strings to arrays internally using `split(' ')`.

### Style Priority Order
1. Base `.one` styles (minimal: position, display, box-sizing)
2. Layout presets (e.g., `box` adds grid system)
3. Component presets (e.g., `button` adds button styles)
4. Inline grid configuration (if provided)
5. Look presets (e.g., `primary` adds colors)
6. Inline-styles (final overrides - always win)



### Important Principles
- NO themes (no traditional sm md ld primary-surface primary-content etc.)
- Everything is ONE element with presets
- Direct CSS values only - from the base variabls 
- Grid areas for all positioning
- Flat structure for visual editing
- Inline-styles for final CSS variable overrides *testing*

## Theme Processor System (AS-BUILT)

### How It Works
1. **Loads JSON theme** → Generates CSS → Injects into page
2. **Variable Scoping**: All variables scoped to `.ui` class for UI theme
3. **Preset Discovery**: Automatically finds presets in subcategories
4. **Double-Set Pattern**: Sets both CSS variable AND applies it
   ```css
   .primary {
     --background-color: red;
     background-color: var(--background-color);
   }
   ```

### Import System
Themes can import other JSON files:
```json
{
  "imports": ["./base-variables.json"],
  "presets": { /* custom presets */ }
}
```

### Debug Mode
- Currently available via `<JSONtoREACT debug={true} />`
- Shows structure processing and ID mappings in console
- Useful for development, should be off in production

## Runtime Theme Processor (COMPLETE SYSTEM)

### Core Functionality
The Runtime Theme Processor converts JSON theme configurations into CSS at runtime:
1. **Input**: JSON theme file with variables, presets, and structure
2. **Processing**: Generates CSS classes and variables
3. **Output**: Injects `<style>` tag into page head

### Theme Structure
```json
{
  "version": "1.0.0",
  "name": "Theme Name",
  "class": "ui",  // For UI theme only
  "imports": ["./base-variables.json"],  // Optional imports
  "variables": {
    // 100+ CSS variables with defaultValue, type, category
  },
  "oneElement": {
    "one": {
      "position": "relative",
      "display": "block"
    }
  },
  "presets": {
    "layouts": { /* box, dashboard-5, positions */ },
    "components": { /* button, field, checkbox */ },
    "looks": { /* primary, secondary, neutral */ }
  },
  "structure": {
    // Flat structure with ID references
  }
}
```

### Variable System (NOT STYLES, NO ADDING OR EDITING THESE)
- **100+ CSS Variables**: Colors, sizing, layout, typography, etc.
- **Default Values**: Every variable has a default 
- **Categories**: Organized by purpose (colors, sizing, spacing, etc.)
- **Scoping**: Variables cascade through child elements

### Preset System Features
1. **Auto-Discovery**: Finds presets in any level of nesting
2. **Double-Set Pattern**: 
   ```css
   .primary {
     --background-color: red;        /* Sets variable */
     background-color: var(--background-color);  /* Applies it */
   }
   ```
3. **Subcategory Support**: `presets.layouts.positions.a` → `.a`

### UI Theme vs ONE Theme

#### UI Theme (Studio Interface)
- **Scope**: `.ui` class wraps everything
- **Purpose**: Powers Studio1 editor interface
- **Structure**: Dashboard components, toolbars, panels
- **Output**: `<div class="ui"><div class="one box">...</div></div>`

#### ONE Theme (User Designs)
- **Scope**: No `.ui` wrapper - clean output
- **Purpose**: User-created designs for export
- **Structure**: Whatever the user builds
- **Output**: `<div class="one box">...</div>`
- **Export Ready**: Clean HTML without framework dependencies

### Integration with JSONtoREACT
1. Theme processor generates all CSS classes and variables
2. JSONtoREACT reads structure and applies classes
3. Inline-styles in elements reference same CSS variables
4. Everything stays synchronized

### Development vs Production
- **Development Mode**: All variables output for DevTools access
- **Production Mode**: Tree-shaking - only used variables output
- **Console Messages**: 
  - `🎨 Loading ui theme`
  - `📝 Generated CSS length: XXXX`
  - `💉 Injected CSS`

## Content Type Architecture (CRITICAL - Next Implementation)

### The Problem We're Solving
HTML elements can't contain both text and an image directly - they need structure. Traditional approaches use background images or complex nesting. Our solution keeps everything as content while maintaining visual editing simplicity.

### Single Element, Multiple Content Types
Every element is type "one" with a contentType property:
- `contentType: "text"` - Text content only
- `contentType: "media"` - Image/video content only  
- `contentType: "none"` - Container only (default)

### Auto-Split Pattern
When user adds BOTH text + media to a single element:
1. System automatically creates two child elements
2. Original becomes a group container
3. Children get appropriate contentType

#### Before Auto-Split:
```json
{
  "type": "one",
  "contentType": "text",
  "content": "Hello World"
}
```

#### After User Adds Image:
```json
{
  "type": "one",
  "contentType": "none",
  "presets": ["box", "group"],
  "children": ["text-001", "media-001"]
}
```

With flat structure:
```json
{
  "text-001": {
    "type": "one",
    "contentType": "text",
    "content": "Hello World",
    "presets": ["text"]
  },
  "media-001": {
    "type": "one", 
    "contentType": "media",
    "src": "image.jpg",
    "presets": ["media"]
  }
}
```

### Why This Matters
1. **No Background Images** - Everything is real content, stackable, reorderable
2. **Visual Flexibility** - Layer multiple images, adjust opacity per layer
3. **Clean HTML Export** - Proper semantic structure, not divs with backgrounds
4. **R2 Storage Simplified** - All images are content, not CSS references
5. **Intuitive Editing** - What you see is the actual structure

## Visual Builder Architecture (CORE CONCEPT)

### Position-Based Design Philosophy
Everything is position-based, not name-based. This enables a fluid visual builder where:
- Elements adapt to their context automatically
- No naming conventions to remember
- Drag anywhere, it just works
- Groups move together naturally

### Visual Builder Workflow
1. **Design Mode (Flat Bento)**
   - All top-level elements visible as cards/regions
   - Each region contains its grouped children
   - Drag regions to reorder (a→b→c)
   - Children stay with their parent

2. **Edit Mode (Group Expansion)**
   - Click to "open" a group
   - Edit children within their context
   - Toolbar pattern provides consistent structure
   - Zip concept for layer-based editing (future)

3. **Export Mode (Clean Nested)**
   - Maintains nested structure
   - Position-based classes only
   - No naming artifacts
   - SEO-ready semantic HTML

## Development Roadmap

### Phase 1: Universal Position-Based Layout System

#### The Revelation: Parent Hydration + Position = Infinite Flexibility
Because EVERY element has 100+ variables listening for parent overrides, and because we use position-based patterns (not names), we get:
- **Move anywhere**: Elements adapt to new parent's `--parent-*` variables
- **No configuration**: Children don't need to know about parents
- **Infinite nesting**: Each level can override its children
- **True composability**: Any preset works anywhere

#### Core Concept: Everything is Position, Not Names
A unified approach where all layouts follow the same position-based pattern. No naming required - just position determines behavior.

#### Key Principles:
1. **Position-based, not name-based**: First child = start, second = center, third = end
2. **Context-aware**: Elements adapt based on their container's context
3. **Infinitely nestable**: Toolbars within toolbars, grids within grids
4. **Move anywhere**: Elements automatically adapt to new contexts
5. **No functional data-labels**: Labels are only for user organization

#### Implementation Layers:

##### Layer 1: Basic Toolbar Pattern ✅ (IMPLEMENTED)
- Universal start-center-end grid pattern
- Works for headers, sidebars, cards, forms - everything
- Position-based child alignment (1=start, 2=center, 3=end)
- Handles any item count via: grid-area override, inline grid config, or nested toolbars

**Why it works**: The toolbar is just a 3-zone grid. Doesn't care if you have 0, 1, 2, or many items.

**Handling less than 3 items**:
1. **Force position**: Single button? Add `"grid-area": "b"` to center it
2. **Custom grid**: Override with `"grid": { "cols": "1fr auto 1fr" }`
3. **Nested toolbars**: Group items - 2 buttons on left = toolbar in 'a'

```json
"toolbar-cols": {
  "--grid-template-columns": "auto 1fr auto",
  "--grid-template-areas": "'a b c'"
}
```

##### Layer 2: Context-Aware Adaptation (IN PROGRESS)
- Elements adapt based on parent context
- Horizontal in headers, vertical in sidebars
- CSS variables enable context switching
- Structure ready, needs theme processor support

##### Layer 3: Area-Based Hydration ✅ (IMPLEMENTED)
- Parents hydrate children differently per grid area
- Move header→sidebar = automatic adaptation
- CSS targets: `[style*="grid-area: a"]`
- Structure: `_area-hydration: { "a": {...}, "b": {...} }`
- Propagates to all descendants for deep hydration

##### Layer 4: Visual Builder Integration (FUTURE)
- Flat bento approach for visual editing
- Groups move together with their children
- Zip concept for layer-based editing
- Maintain nested structure for clean export

### Phase 1.5: Grid Area Assignment Flexibility
- [ ] Implement toggle/configuration for grid area assignment modes
- [ ] Option 1: Universal assignment (current) - all elements get areas
- [ ] Option 2: Parent-controlled - only when parent enables it
- [ ] Option 3: Element-level opt-out with `_no-auto-grid-area` property
- [ ] Consider global configuration in theme.json
- [ ] Documentation for when to use each mode
- [ ] Potential preset property: `_grid-area-mode: "universal" | "parent" | "none"`

### Phase 2: Content Type System
- [ ] Implement contentType property (text/media/none)
- [ ] Create auto-split functionality for mixed content
- [ ] Build group/ungroup functionality
- [ ] Add flatten/unflatten for editing

### Phase 3: Component Library (IN PROGRESS)
- [x] Create shadcn-inspired component presets
  - [x] Button with exact shadcn styling
  - [x] Switch with CSS pseudo-element thumb
  - [ ] Input/Field component
  - [ ] Checkbox component
  - [ ] Select dropdown
  - [ ] Slider component
- [ ] Build component documentation
- [ ] Create component preview system

#### Components in Testing:
**Button**: Full shadcn styling applied directly (may separate into variants later)
**Switch**: Using CSS `::before` for thumb (testing vs separate component approach)

### Phase 3: Visual Editor
- [ ] Complete LayerTree component
- [ ] Integrate DirectRenderer with JSONtoREACT
- [ ] Build property panels for each content type
- [ ] Implement drag-and-drop functionality

### Phase 4: Export System
- [ ] ONE theme generation from UI designs
- [ ] Clean HTML export without framework
- [ ] Component library export
- [ ] Design system documentation export

## Technical Implementation Notes

### File Structure
- `/src/components/JSONtoREACT.tsx` - Core React generator
- `/src/utils/autoIdHelper.ts` - Auto-ID generation (currently generates one-XXX)
- `/src/theme/runtimeThemeProcessor.ts` - JSON to CSS conversion
- `/public/data/themes/ui-theme.json` - Studio interface theme
- `/public/data/themes/one-theme.json` - User design theme (future)

## Features in Testing/Transition

### Grid Area Assignment System (IN TRANSITION)
Currently using universal assignment for simplicity.

#### Current Implementation (Active):
- **Universal**: All elements with type 'one' automatically receive grid areas based on index
- Simple and predictable: first child gets 'a', second gets 'b', etc.
- No configuration required - works everywhere automatically
- Code: `if (element.type && element.type === 'one' && index >= 0)`

#### Alternative Implementation (Removed):
- **Parent-controlled**: Grid presets with `"_auto-grid-areas": true` enable assignment
- More explicit control for complex layouts
- See "Deprecated/Removed Features" section at end of document for full implementation details

#### Testing Notes:
- Universal approach chosen for current phase due to simplicity
- May implement toggle between both systems in future

### Structure Approach (IN TRANSITION)
Testing nested structure without keys vs flat structure with IDs.

#### Current Implementation (Active):
- **Nested without keys**: Children as anonymous objects in arrays
- No CSS naming conflicts
- Example:
  ```json
  "children": [
    { "type": "one", "components": "button" },
    { "type": "one", "components": "switch" }
  ]
  ```

#### Previous Implementation (Available):
- **Flat with IDs**: All elements at root, referenced by keys
- To revert: Use string references in children arrays
- Example:
  ```json
  "children": ["child1", "child2"],
  "child1": { "type": "one" },
  "child2": { "type": "one" }
  ```

#### Testing Notes:
- Nested eliminates naming conflicts completely
- Flat structure better for visual editor drag/drop
- May need hybrid approach for production

## Implemented Features

### Auto-ID System (IMPLEMENTED)
Every element automatically receives a unique sequential ID.

#### How It Works
- All elements get IDs in the format: `one-1`, `one-2`, `one-3`... 
- Simple sequential numbering without padding
- Applied to every element regardless of type or parent
- IDs persist through the element lifecycle

### Child Hydration System (IMPLEMENTED)
CSS-based system for parents to automatically style their children based on position or other criteria.

#### Core Features
- **Position-based hydration**: Parents define styles for nth-child positions
- **Smart box container**: Box preset listens for parent CSS custom properties
- **Override capability**: Children can override with their own presets
- **Pure CSS solution**: No JavaScript required

### Position-Based Layout System (IMPLEMENTED - Layer 1)
Part of the Universal Position-Based Layout System (see Phase 1 in roadmap).

#### Current Implementation:
- **Toolbar preset**: Universal start-center-end pattern
- **Position-based alignment**: No names needed, just child position
- **CSS variable driven**: Ready for context-aware adaptation

```json
"toolbar": {
  "--display": "grid",
  "--grid-template-columns": "var(--toolbar-columns, auto 1fr auto)",
  "--grid-template-rows": "var(--toolbar-rows, 1fr)",
  "--grid-template-areas": "var(--toolbar-areas, 'a b c')",
  "_child-alignment": {
    "1": "start",
    "2": "center",
    "3": "end"
  }
}
```

#### Key Innovation:
Children aren't named "start/center/end" - they're just child 1, 2, 3. Their position determines their behavior. When moved to a different parent or context, they automatically adapt.

#### Foundation for Future:
- Structure supports area-based hydration (not yet in processor)
- CSS variables enable context switching
- Infinitely nestable design
- Move elements anywhere, they adapt automatically

### Grid Area Assignment System (IMPLEMENTED)
Universal automatic assignment of grid areas to all elements.

**Note**: We've reverted to universal assignment for simplicity during development. Parent-controlled assignment remains available as commented code. See "Features in Testing/Transition" section for details.

#### How It Works
- All elements with type 'one' automatically receive grid areas based on their index
- First child gets 'a', second gets 'b', third gets 'c', etc.
- Sequential grid areas: a, b, c...z, then aa, ab, ac...az, ba, bb... (infinite)
- Assigned as inline styles: `style="grid-area: a"`
- Manual override via `"grid-area": "e"` always takes precedence
- No configuration needed - works everywhere automatically

#### Architecture Benefits
- Simple and predictable behavior
- No need to configure parent grids
- Single source of truth for grid positioning
- Inline grid-area styles instead of CSS variable indirection
- Infinite scalability without defining infinite presets
- Every element is grid-ready by default


## Deprecated/Removed Features Reference

*The following features have been removed from the codebase but are documented here for reference and potential future restoration.*

### Area-Based Hydration System

**Status**: Removed after Session 05 implementation  
**Removed From**: runtimeThemeProcessor.ts  
**Reason**: Overcomplicated the system, decided to rely on universal parent-child hydration instead

#### What It Did:
- Allowed parents to apply different styles to children based on grid area
- Used CSS selectors targeting `[style*="grid-area: X"]` 
- Enabled context-aware styling where elements adapt based on their grid position

#### Complete Implementation Code:

**In runtimeThemeProcessor.ts (after line 219, within processPresets):**
```javascript
// Handle area-based hydration
if (value['_area-hydration'] && typeof value['_area-hydration'] === 'object') {
  Object.entries(value['_area-hydration']).forEach(([area, hydrationStyles]: [string, any]) => {
    // Target children in specific grid areas
    css.push(`.${key} > [style*="grid-area: ${area}"] {`);
    Object.entries(hydrationStyles).forEach(([property, propValue]) => {
      if (property.startsWith('--')) {
        css.push(`  ${property}: ${propValue};`);
      }
    });
    css.push('}');
    
    // Also propagate to nested children for toolbar context switching
    css.push(`.${key} > [style*="grid-area: ${area}"] * {`);
    Object.entries(hydrationStyles).forEach(([property, propValue]) => {
      if (property.startsWith('--')) {
        css.push(`  ${property}: ${propValue};`);
      }
    });
    css.push('}');
  });
}
```

**In ui-theme.json structure:**
```json
"_area-hydration": {
  "a": {
    "--parent-background-color": "hsl(342, 36%, 53%)",
    "--parent-color": "hsl(0, 0%, 90%)",
    "--parent-padding": "1rem",
    "--parent-grid-template-columns": "1fr",
    "--parent-grid-template-rows": "auto 1fr auto"
  },
  "b": {
    "--parent-background-color": "hsl(0, 0%, 98%)",
    "--parent-color": "hsl(0, 0%, 10%)"
  }
}
```

### Child Alignment System

**Status**: Removed after Session 05 implementation  
**Removed From**: runtimeThemeProcessor.ts  
**Reason**: Position-based alignment can be achieved through simpler means

#### What It Did:
- Allowed presets to define alignment for specific child positions
- Used nth-child selectors to target children by index
- Set both element alignment and parent variables for cascading

#### Complete Implementation Code:

**In runtimeThemeProcessor.ts (after line 207, within processPresets):**
```javascript
// Handle special child alignment rules
if (value['_child-alignment'] && typeof value['_child-alignment'] === 'object') {
  Object.entries(value['_child-alignment']).forEach(([childIndex, alignment]) => {
    css.push(`.${key} > :nth-child(${childIndex}) {`);
    css.push(`  justify-self: ${alignment};`);
    css.push(`  align-self: center;`);
    css.push(`  --parent-justify-items: ${alignment};`);
    css.push(`  --parent-align-items: center;`);
    css.push('}');
  });
}
```

**In ui-theme.json presets:**
```json
"toolbar": {
  "--display": "grid",
  "--grid-template-columns": "auto 1fr auto",
  "_child-alignment": {
    "1": "start",
    "2": "center",
    "3": "end"
  }
}
```

### Parent-Controlled Grid Area Assignment

**Status**: Removed in favor of universal assignment  
**Removed From**: JSONtoREACT.tsx  
**Reason**: Simplicity during development phase

#### How It Worked:
- Only grid containers with `"_auto-grid-areas": true` would assign grid areas to children
- More explicit control but required configuration
- Prevented unnecessary grid area assignment to non-grid children

#### Complete Implementation Code:

1. **Change the grid area assignment logic in JSONtoREACT.tsx** around line 152:
```javascript
// Change from:
} else if (element.type && element.type === 'one' && index >= 0) {

// To:
} else if (parentElement && shouldAutoAssignGridArea(parentElement, config)) {
```

2. **Add these functions before the closing brace of JSONtoREACT component**:

```typescript
/**
 * Check if a parent element has auto-grid-areas enabled
 */
function shouldAutoAssignGridArea(parentElement: any, config: any): boolean {
  if (!parentElement || !config) return false;
  
  // Helper to normalize string or array to array
  const toArray = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(' ').filter(Boolean);
    return [];
  };
  
  // Get all presets from parent
  const parentLayouts = toArray(parentElement.layouts);
  const parentPresets = toArray(parentElement.presets);
  const allParentPresets = [...parentLayouts, ...parentPresets];
  
  // Check if any of the parent's presets have _auto-grid-areas enabled
  for (const presetName of allParentPresets) {
    // Look for preset in all categories
    const preset = findPreset(config.presets, presetName);
    if (preset && preset['_auto-grid-areas'] === true) {
      return true;
    }
  }
  
  return false;
}

/**
 * Recursively find a preset by name in the preset structure
 */
function findPreset(presets: any, name: string): any {
  if (!presets) return null;
  
  for (const key in presets) {
    const value = presets[key];
    
    // Check if this is the preset we're looking for
    if (key === name && typeof value === 'object' && !Array.isArray(value)) {
      // Check if it has CSS properties (not just subcategories)
      const hasStyles = Object.keys(value).some(k => 
        k.startsWith('--') || k.startsWith('_') || ['display', 'position', 'width', 'height'].includes(k)
      );
      if (hasStyles) {
        return value;
      }
    }
    
    // Recurse into subcategories
    if (typeof value === 'object' && !Array.isArray(value)) {
      const found = findPreset(value, name);
      if (found) return found;
    }
  }
  
  return null;
}
```

3. **Add `_auto-grid-areas: true` to grid presets** in ui-theme.json:
```json
"grid-bento-5": {
  "--display": "grid",
  "--grid-template-columns": "200px 1fr 350px",
  "--grid-template-rows": "60px 1fr 60px",
  "--grid-template-areas": "'a b e' 'a c e' 'a d e'",
  "_auto-grid-areas": true
}
```

4. **Benefits of Parent-Controlled Approach**:
   - More explicit and intentional
   - Prevents unnecessary grid areas on non-grid children
   - Better for complex layouts where not all containers need grid areas
   - Can be mixed with universal approach using configuration flags

