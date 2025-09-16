# 01 - Grid Position (a,b,c,d)

**Status**: Foundation of layout system  
**Domain**: Level 1 - Position Variable (Atomic)  
**References**: Theme Processor lines 74-77, UI theme dashboard preset

## Definition

**Grid Position** uses single letters (a, b, c, d, etc.) as grid area identifiers for CSS Grid placement. This creates a simple, visual way to define layouts.

## The System

### Grid Template Definition
```css
.dashboard {
  --grid-template-areas: '"a a a" "b c d"';
  grid-template-areas: var(--grid-template-areas);
}
```

### Position Assignment
```css
.a { --grid-area: a; grid-area: var(--grid-area); }
.b { --grid-area: b; grid-area: var(--grid-area); }
.c { --grid-area: c; grid-area: var(--grid-area); }
.d { --grid-area: d; grid-area: var(--grid-area); }
```

### Visual Result
```
[  a  |  a  |  a  ]  ← Header spans full width
[  b  |  c  |  d  ]  ← Three columns below
```

## Why Letters?

### 1. Visual Clarity
```css
/* Instantly see the layout */
grid-template-areas: 
  '"a a a"
   "b c d"';
   
/* vs verbose names */
grid-template-areas:
  '"header header header"
   "sidebar content aside"';
```

### 2. Universal
- No language barriers
- No semantic assumptions
- Works for any layout

### 3. Compact
- Minimal typing
- Clear in JSON
- Easy to remember

## Implementation in JSON

### Theme Preset
```json
"presets": {
  "layout": {
    "dashboard": {
      "--grid-template-areas": "\"a a a\" \"b c d\"",
      "--grid-template-columns": "200px 1fr 200px",
      "--grid-template-rows": "60px 1fr"
    }
  }
}
```

### Element Positioning
```json
{
  "type": "wrapper",
  "preset": "header",
  "position": "a"  // Places in area 'a'
}
```

## Common Layouts

### Two Column
```css
--grid-template-areas: '"a b"';
/* [  a  |  b  ] */
```

### Header + Content
```css
--grid-template-areas: 
  '"a a"
   "b b"';
/* [  a  |  a  ] header
   [  b  |  b  ] content */
```

### Sidebar Layout
```css
--grid-template-areas:
  '"a a a"
   "b c c"';
/* [  a  |  a  |  a  ] header
   [  b  |  c  |  c  ] sidebar + content */
```

### Complex Dashboard
```css
--grid-template-areas:
  '"a a a a"
   "b c c d"
   "b e e d"';
/* [  a  |  a  |  a  |  a  ] header
   [  b  |  c  |  c  |  d  ] 
   [  b  |  e  |  e  |  d  ] sidebar + content + aside */
```

## Position Rules

### 1. Single Letter Names
```css
/* ✅ CORRECT */
.a { grid-area: a; }

/* ❌ WRONG */
.header { grid-area: header; }
```

### 2. One Position Per Element
```json
{
  "position": "a"  // ✅ Single position
}

// NOT
{
  "position": ["a", "b"]  // ❌ Multiple positions
}
```

### 3. Position After Presets
```html
<!-- Class order matters -->
<div class="ui wrapper dashboard a">
<!--                    preset  ^ position -->
```

## Grid Dimensions

Positions define placement, dimensions define sizing:

```json
{
  "--grid-template-areas": "\"a b\"",
  "--grid-template-columns": "200px 1fr",  // a=200px, b=remaining
  "--grid-template-rows": "auto"
}
```

## Advanced Positioning

### Spanning Multiple Areas
```css
--grid-template-areas:
  '"a a b"
   "c d d"';
/* 'a' spans 2 columns
   'd' spans 2 columns */
```

### Empty Cells
```css
--grid-template-areas:
  '"a . b"
   "c c c"';
/* '.' creates empty cell */
```

### Responsive Positions
```css
/* Mobile */
--grid-template-areas:
  '"a"
   "b"
   "c"';

/* Desktop */
@media (min-width: 768px) {
  --grid-template-areas: '"a b c"';
}
```

## Helper Integration

Position helpers are defined in theme:

```json
"helpers": {
  "positioning": {
    "a": { "--grid-area": "a" },
    "b": { "--grid-area": "b" },
    "c": { "--grid-area": "c" },
    "d": { "--grid-area": "d" },
    "e": { "--grid-area": "e" },
    "f": { "--grid-area": "f" }
  }
}
```

## Usage Example

### Complete Layout
```json
// Container with layout
{
  "type": "wrapper",
  "preset": "dashboard",  // Defines grid
  "children": [
    {
      "type": "wrapper",
      "preset": "header",
      "position": "a"    // Top area
    },
    {
      "type": "wrapper",
      "preset": "sidebar",
      "position": "b"    // Left area
    },
    {
      "type": "wrapper",
      "preset": "content",
      "position": "c"    // Center area
    }
  ]
}
```

## Benefits

### Visual Design
- See layout in code
- Map visually to result
- Easy to modify

### Flexibility
- Any layout possible
- No semantic restrictions
- Quick reorganization

### Debugging
- Clear in DevTools
- Obvious positioning
- Simple to fix

## Common Mistakes

### Mistake 1: Semantic Names
```css
/* ❌ WRONG */
--grid-template-areas: '"header" "content"';

/* ✅ CORRECT */
--grid-template-areas: '"a" "b"';
```

### Mistake 2: Missing Quotes
```css
/* ❌ WRONG */
--grid-template-areas: 'a a b';

/* ✅ CORRECT */
--grid-template-areas: '"a a b"';
```

### Mistake 3: Mismatched Areas
```css
/* ❌ WRONG - Uneven columns */
--grid-template-areas:
  '"a a b"
   "c d"';  // Only 2 columns!

/* ✅ CORRECT */
--grid-template-areas:
  '"a a b"
   "c c d"';
```

## Guardian Note

Grid positions using letters (a, b, c, d) are the foundation of our layout system. They provide maximum flexibility with minimum complexity. This pattern enables visual layout design without semantic constraints.

---

**Note**: Single-letter grid positions are not just a convention - they're a design philosophy that prioritizes visual clarity and universal understanding.