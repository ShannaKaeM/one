# 02 - Preset Concept (CRITICAL)

**Status**: 🚨 CRITICAL - Fundamental misunderstanding by agents  
**Domain**: Level 1 - Theme Variable (Atomic)  
**References**: Theme Processor lines 49-66, ui-theme.json presets section

## Definition

A **preset** is a collection of CSS properties that work together as a reusable style combination. Presets are NOT components - they are pure styling instructions.

## The Truth About Presets

### ✅ What Presets ARE
- Collections of CSS properties
- Reusable style combinations
- Theme-scoped classes
- Mix-and-match styling units

### ❌ What Presets ARE NOT
- React components
- HTML structures
- Functional elements
- Behavioral definitions

## Structure in JSON

```json
"presets": {
  "categoryName": {
    "presetName": {
      "--css-property": "value",
      "--another-property": "value"
    }
  }
}
```

## Real Example

### JSON Definition
```json
"presets": {
  "buttons": {
    "primary": {
      "--padding": "12px 24px",
      "--border-radius": "6px",
      "--background-color": "hsl(207, 90%, 54%)",
      "--color": "hsl(0, 0%, 100%)",
      "--border": "none",
      "--cursor": "pointer"
    }
  }
}
```

### Generated CSS
```css
.ui .primary {
  --padding: 12px 24px;
  --border-radius: 6px;
  --background-color: hsl(207, 90%, 54%);
  --color: hsl(0, 0%, 100%);
  --border: none;
  --cursor: pointer;
  
  /* Apply the variables */
  padding: var(--padding);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  color: var(--color);
  border: var(--border);
  cursor: var(--cursor);
}
```

## Categories Are Just Organization

Categories in presets serve only TWO purposes:

1. **Organization** - Group related styles together
2. **UI Generation** - Can be used as section titles in visual builders

Categories require NO registration, NO special handling, NO configuration:

```json
"presets": {
  "my-random-category": {  // Works immediately
    "my-preset": { }
  },
  "typography": {          // Also works
    "heading": { }
  },
  "pizza-styles": {        // Perfectly valid
    "pepperoni": { }
  }
}
```

## Mix and Match Philosophy

Any element can use ANY preset combination:

```html
<!-- All valid combinations -->
<div class="ui wrapper dashboard dark">
<div class="ui text heading primary centered">
<div class="ui button large success rounded shadow">
```

## Common Agent Mistakes

### Mistake 1: Treating Presets as Components
```javascript
// ❌ WRONG - Preset is not a component
const Button = presets.buttons.primary;
```

### Mistake 2: Hardcoding Preset Logic
```javascript
// ❌ WRONG - Presets are just classes
if (preset === 'button') {
  return <button>...
}
```

### Mistake 3: Creating Preset Dependencies
```json
// ❌ WRONG - Presets don't inherit
"secondary": {
  "extends": "primary",  // NO! Each preset is independent
}
```

## The Preset Rules

1. **Independent**: Each preset is complete, no inheritance
2. **Combinable**: Multiple presets can be applied together
3. **Pure Styling**: Only CSS properties, no behavior
4. **Category Agnostic**: Any category name works

## How Presets Combine

When multiple presets are applied, they layer:

```html
<div class="ui wrapper dashboard dark rounded">
```

Results in classes applied in order:
1. `.ui` - Theme scope
2. `.wrapper` - Element type
3. `.dashboard` - Layout preset
4. `.dark` - Color scheme preset  
5. `.rounded` - Border preset

Later presets override earlier ones if they define the same properties.

## Preset vs Element Type

- **Element Type**: Determines HTML tag (`wrapper` → `<div>`)
- **Preset**: Determines styling (any CSS properties)

They work together but are completely separate concerns.

## Critical Understanding

Presets are **style dictionaries**, not components. They contain CSS properties that get applied as classes. Nothing more, nothing less.

## Guardian Protection

This atomic concept is foundational. Agents must understand: presets are collections of CSS properties, not components or structures.

---

**Note**: If an agent tries to create React components from presets or add behavioral logic to presets, they've misunderstood this core concept.