# 01 - Parent Scope

**Status**: Critical for theme isolation  
**Domain**: Level 1 - Pattern Variable (Atomic)  
**References**: Theme Processor lines 108-119

## Definition

**Parent Scope** is the CSS pattern where all theme classes are scoped under their parent theme class. This creates complete style isolation between themes.

## The Pattern

```css
/* UI Theme - All classes scoped under .ui */
.ui .button { }
.ui .dashboard { }
.ui .heading { }

/* ONE Theme - All classes scoped under .one */
.one .button { }
.one .hero { }
.one .heading { }
```

## Why Parent Scoping?

### 1. Theme Isolation
Both themes can use identical class names without conflict:

```css
/* No collision - different scopes */
.ui .button {
  --padding: 8px 16px;
}

.one .button {
  --padding: 12px 24px;
}
```

### 2. Predictable Cascade
Parent class establishes base context:

```css
.ui {
  /* All UI variables defined here */
  --color: hsl(0, 0%, 90%);
}

.ui .dark {
  /* Overrides within UI context */
  --color: hsl(0, 0%, 10%);
}
```

### 3. Clean Switching
Elements can switch themes by changing parent:

```html
<!-- UI theme context -->
<div class="ui">
  <button class="button">UI Button</button>
</div>

<!-- ONE theme context -->
<div class="one">
  <button class="button">ONE Button</button>
</div>
```

## Implementation in Theme Processor

```javascript
// Generate scoped CSS
function generateCSS(theme) {
  const className = theme.class; // 'ui' or 'one'
  
  // Presets are scoped
  Object.entries(theme.presets).forEach(([category, presets]) => {
    Object.entries(presets).forEach(([name, styles]) => {
      css += `.${className} .${name} { /* styles */ }`;
    });
  });
  
  // Helpers are scoped
  Object.entries(theme.helpers).forEach(([category, helpers]) => {
    Object.entries(helpers).forEach(([name, styles]) => {
      css += `.${className} .${name} { /* styles */ }`;
    });
  });
}
```

## Scope Hierarchy

### Level 1: Theme Root
```css
.ui {
  /* Base theme variables */
}
```

### Level 2: Scoped Classes
```css
.ui .button {
  /* Scoped to UI theme */
}
```

### Level 3: Combined Classes
```css
.ui .button.primary {
  /* More specific within scope */
}
```

## The Root Exception

The theme class itself is NOT scoped:

```css
/* ✅ CORRECT - Root not scoped */
.ui {
  --background-color: hsl(0, 0%, 10%);
}

/* ❌ WRONG - Don't scope the root */
.parent .ui {
  --background-color: hsl(0, 0%, 10%);
}
```

## Real-World Example

### JSON Theme
```json
{
  "class": "ui",
  "presets": {
    "buttons": {
      "primary": {
        "--background-color": "hsl(207, 90%, 54%)"
      }
    }
  }
}
```

### Generated CSS
```css
/* Root theme class */
.ui {
  /* Root variables */
}

/* Scoped preset */
.ui .primary {
  --background-color: hsl(207, 90%, 54%);
  background-color: var(--background-color);
}
```

### HTML Usage
```html
<div class="ui">
  <button class="primary">Scoped Button</button>
</div>
```

## Common Patterns

### Nested Scoping
```html
<div class="ui">
  <div class="dashboard">
    <div class="sidebar">
      <!-- Inherits from .ui scope -->
    </div>
  </div>
</div>
```

### Mixed Themes (Future)
```html
<div class="ui">
  <!-- UI interface -->
  <div class="canvas">
    <div class="one">
      <!-- ONE content in UI interface -->
    </div>
  </div>
</div>
```

## Scope Rules

1. **Always Scope Classes**: Every preset/helper is scoped
2. **Never Scope Root**: Theme class stands alone
3. **Single Parent**: One theme scope at a time
4. **Inherit Variables**: Child elements inherit parent scope

## Benefits

### Clean Exports
```html
<!-- During editing - scoped -->
<div class="ui">
  <button class="button">Edit Mode</button>
</div>

<!-- After export - can remove scope if needed -->
<button class="button">Exported</button>
```

### Plugin Architecture
Different themes can coexist:
```html
<body>
  <div class="ui"><!-- UI System --></div>
  <div class="one"><!-- ONE Content --></div>
  <div class="custom"><!-- Other theme --></div>
</body>
```

## Common Mistakes

### Mistake 1: Forgetting Parent Scope
```css
/* ❌ WRONG - Not scoped */
.button {
  padding: 8px;
}

/* ✅ CORRECT - Scoped */
.ui .button {
  padding: 8px;
}
```

### Mistake 2: Double Scoping
```css
/* ❌ WRONG - Redundant */
.ui .ui .button {
  padding: 8px;
}

/* ✅ CORRECT */
.ui .button {
  padding: 8px;
}
```

### Mistake 3: Scoping Root
```css
/* ❌ WRONG */
body .ui {
  --color: white;
}

/* ✅ CORRECT */
.ui {
  --color: white;
}
```

## Guardian Note

Parent scoping is the foundation of theme isolation. It allows multiple independent design systems to coexist without conflict. This pattern is non-negotiable for maintaining system integrity.

---

**Note**: Every generated class except the theme root must be parent-scoped. This ensures complete theme isolation and predictable styling.