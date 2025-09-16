# 04 - CSS Property

**Status**: Foundational  
**Domain**: Level 1 - Theme Variable (Atomic)  
**References**: Theme Processor lines 36-46, theme JSON structures

## Definition

A **CSS Property** in our system is always defined as a CSS custom property (variable) first, then applied to the actual CSS property. This two-step process enables our theming system.

## The Two-Step Pattern

### Step 1: Define Custom Property
```css
.ui {
  --background-color: hsl(0, 0%, 10%);
}
```

### Step 2: Apply to CSS Property
```css
.ui {
  background-color: var(--background-color);
}
```

## Why Custom Properties?

1. **Runtime Theming**: Change values without recompiling
2. **Scoped Overrides**: Different values in different contexts
3. **Inspector Friendly**: See actual values in DevTools
4. **Cascade Control**: Precise inheritance management

## Naming Convention

### Custom Property Format
- Always prefixed with `--`
- Kebab-case naming
- Descriptive but concise

```css
--background-color    /* ✅ Clear and standard */
--bg                  /* ❌ Too abbreviated */
--backgroundColor    /* ❌ Wrong case format */
```

## Property Categories

### Color Properties
```json
{
  "cssProperty": "--background-color",
  "cssProperty": "--color",
  "cssProperty": "--border-color"
}
```

### Layout Properties
```json
{
  "cssProperty": "--display",
  "cssProperty": "--grid-template-areas",
  "cssProperty": "--grid-area"
}
```

### Spacing Properties
```json
{
  "cssProperty": "--padding",
  "cssProperty": "--margin",
  "cssProperty": "--gap"
}
```

### Typography Properties
```json
{
  "cssProperty": "--font-size",
  "cssProperty": "--line-height",
  "cssProperty": "--font-weight"
}
```

## Application Pattern

Every CSS property follows the same pattern:

```css
.element {
  /* Define */
  --property-name: value;
  
  /* Apply */
  property-name: var(--property-name);
}
```

## Compound Properties

Some properties accept multiple values:

```css
.ui {
  --padding: 12px 24px;
  padding: var(--padding);
  
  --border: 1px solid hsl(0, 0%, 20%);
  border: var(--border);
}
```

## Grid Template Special Case

Grid templates need special handling:

```css
.ui {
  --grid-template-areas: '"a a a" "b c d"';
  grid-template-areas: var(--grid-template-areas);
}
```

Note the nested quotes for grid areas.

## Property Specificity

Custom properties follow CSS cascade rules:

```css
.ui {
  --color: hsl(0, 0%, 90%);  /* Base value */
}

.ui .dark {
  --color: hsl(0, 0%, 10%);  /* Override */
}
```

## Important Properties

### Must-Have Properties
- `--background-color`
- `--color`
- `--padding`
- `--margin`
- `--display`

### Layout Critical
- `--grid-area`
- `--grid-template-areas`
- `--grid-template-columns`
- `--grid-template-rows`

## Property Validation

Properties should:
1. Have meaningful names
2. Use consistent units
3. Include fallback values where appropriate
4. Follow naming conventions

## Common Mistakes

### Mistake 1: Direct Values
```css
/* ❌ WRONG */
.ui {
  background-color: #333;
}

/* ✅ CORRECT */
.ui {
  --background-color: hsl(0, 0%, 20%);
  background-color: var(--background-color);
}
```

### Mistake 2: Missing Application
```css
/* ❌ WRONG - Defined but not applied */
.ui {
  --padding: 12px;
}

/* ✅ CORRECT */
.ui {
  --padding: 12px;
  padding: var(--padding);
}
```

## Guardian Note

Every visual property must go through the custom property system. No direct CSS values. This enables our entire theming architecture.

---

**Note**: The two-step pattern (define then apply) is non-negotiable. It's the foundation of runtime theming.