---
type: L1-ATOM
category: PRESETS
status: COMPLETE
source: Implementation patterns
related: [preset-concept, helper-classes, class-order-cascade]
---

# Preset Mixing

## Definition
The ability to combine multiple presets and helper classes on a single element, with predictable cascade rules and intelligent conflict resolution.

## Key Principles
- Multiple presets allowed
- Order matters for cascade
- Helpers enhance presets
- Predictable outcomes

## Mixing Patterns

### Basic Mixing
```html
<!-- Single preset -->
<div class="button primary">

<!-- Mixed presets -->
<div class="button primary large">

<!-- Preset + helpers -->
<div class="button primary rounded shadow">
```

### Category Mixing
```javascript
// Different categories combine
class="layout-grid theme-dark spacing-loose typography-heading"

// Same category overwrites
class="button primary" // primary wins
class="primary button" // button wins (last one)
```

## Cascade Rules

### Order of Application
```css
/* 1. Base element styles */
.element { /* defaults */ }

/* 2. First preset */
.button { /* button styles */ }

/* 3. Additional presets */
.primary { /* primary styles */ }

/* 4. Helper classes */
.rounded { /* helper overrides */ }

/* 5. Inline styles (if any) */
style="/* highest priority */"
```

### Specificity Management
```css
/* All presets have equal specificity */
.preset-one { /* weight: 0,1,0 */ }
.preset-two { /* weight: 0,1,0 */ }

/* Order determines winner */
.theme-dark.theme-light { /* light wins */ }
```

## Conflict Resolution

### Property Conflicts
```javascript
// When presets define same property
.card {
  padding: 20px;
  background: white;
}

.dark {
  background: black; /* Overwrites card's background */
  color: white;      /* Adds new property */
}

// Result: padding: 20px, background: black, color: white
```

### Intelligent Merging
```javascript
function mergePresets(presets) {
  const merged = {};
  
  // Apply in order
  presets.forEach(preset => {
    Object.assign(merged, preset.styles);
  });
  
  return merged;
}
```

## Preset Categories

### Complementary Presets
```javascript
// These work well together
class="button primary large rounded"

// Each handles different aspects:
// button - structure
// primary - colors
// large - sizing
// rounded - borders
```

### Exclusive Presets
```javascript
// These conflict (last wins)
class="primary secondary" // secondary wins
class="small large"       // large wins
class="left center"       // center wins
```

## Helper Enhancement

### Additive Helpers
```css
/* Helpers add without conflicting */
.shadow {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.rounded {
  border-radius: 4px;
}

.animate {
  transition: all 0.3s ease;
}
```

### Modifier Helpers
```css
/* Helpers that modify presets */
.no-padding {
  padding: 0 !important;
}

.full-width {
  width: 100% !important;
}

.transparent {
  opacity: 0.5;
}
```

## Advanced Mixing

### Conditional Mixing
```javascript
// Dynamic preset combination
const classes = [
  'card',
  isActive && 'active',
  isPrimary ? 'primary' : 'secondary',
  size && `size-${size}`,
  ...customClasses
].filter(Boolean).join(' ');
```

### Preset Composition
```javascript
// Create new presets from combinations
const presetCompositions = {
  'primary-button': ['button', 'primary', 'rounded'],
  'ghost-button': ['button', 'ghost', 'no-border'],
  'hero-card': ['card', 'large', 'gradient', 'shadow']
};

// Apply composition
element.className = presetCompositions['primary-button'].join(' ');
```

## State-Based Mixing

### State Presets
```javascript
// Base + state presets
class="button primary hover:bright active:pressed"

// Conditional state mixing
class={`
  button
  ${isHovered ? 'hover' : ''}
  ${isActive ? 'active' : ''}
  ${isDisabled ? 'disabled' : ''}
`}
```

### Dynamic States
```javascript
// State-driven preset changes
const statePresets = {
  idle: 'button primary',
  hover: 'button primary bright',
  active: 'button primary pressed',
  disabled: 'button disabled'
};

element.className = statePresets[currentState];
```

## Performance Optimization

### Class Caching
```javascript
// Cache computed classes
const classCache = new Map();

function getClasses(presets, helpers) {
  const key = [...presets, ...helpers].join(':');
  
  if (!classCache.has(key)) {
    classCache.set(key, computeClasses(presets, helpers));
  }
  
  return classCache.get(key);
}
```

### Minimal Recalculation
```javascript
// Only update changed classes
function updateClasses(element, newClasses) {
  const current = new Set(element.classList);
  const next = new Set(newClasses);
  
  // Remove old
  current.forEach(cls => {
    if (!next.has(cls)) element.classList.remove(cls);
  });
  
  // Add new
  next.forEach(cls => {
    if (!current.has(cls)) element.classList.add(cls);
  });
}
```

## Best Practices

### Logical Grouping
```javascript
// Group by purpose
class="
  card                    // Structure
  theme-dark             // Theme
  spacing-comfortable    // Spacing
  animate-fade-in       // Animation
"
```

### Naming Conventions
```javascript
// Clear preset purposes
.button-primary    // Component-variant
.size-large       // Property-value
.state-active     // State-value
.helper-shadow    // Type-effect
```

### Documentation
```javascript
// Document valid combinations
/**
 * Button presets:
 * - Base: button
 * - Variants: primary, secondary, ghost
 * - Sizes: small, medium, large
 * - States: hover, active, disabled
 * - Helpers: rounded, shadow, full-width
 * 
 * Example: class="button primary large rounded shadow"
 */
```

## Component-Level Mixing (NEW)

### Flat Component Pattern
With React components, presets are mixed at the component part level:

```json
{
  "data-component": "PropertyPanel",
  "data-component-presets": {
    "container": "panel elevated rounded",
    "header": "primary bold uppercase",
    "content": "neutral-light padding-large",
    "footer": "secondary small"
  }
}
```

### Component Distribution
Each component part receives its own preset mix:

```typescript
// Inside React component
<div className={`propertyPanel ${presets.container || ''}`}>
  <header className={`propertyPanel-header ${presets.header || ''}`}>
    {/* Multiple presets: primary + bold + uppercase */}
  </header>
  <main className={`propertyPanel-content ${presets.content || ''}`}>
    {/* Multiple presets: neutral-light + padding-large */}
  </main>
</div>
```

### Benefits of Component Mixing
- **Granular Control**: Different presets for each component part
- **Consistent Mixing**: Same cascade rules apply
- **Flexible Combinations**: Mix presets independently per part
- **Easy Theming**: Change entire component appearance via preset combinations

### Component Mixing Patterns
```json
// State-based component mixing
"data-component-presets": {
  "container": "base-container elevated",
  "item": "list-item interactive",
  "itemSelected": "list-item selected highlighted",
  "itemHover": "list-item hover bright"
}

// Theme-based component mixing
"data-component-presets": {
  "container": "dark elevated rounded",
  "header": "dark primary gradient",
  "content": "dark secondary scrollable"
}
```

## Common Patterns

### Component Building
```javascript
// Build complex from simple
class="
  card              // Base structure
  elevated          // Shadow/depth
  interactive       // Hover effects
  padding-large     // Spacing
  rounded           // Border style
"
```

### Responsive Mixing
```javascript
// Breakpoint-based mixing
class="
  card
  mobile:stack
  tablet:grid-2
  desktop:grid-3
"
```

## Related Atoms
- `preset-concept` - Core preset system
- `helper-classes` - Helper enhancement
- `class-order-cascade` - Cascade rules