# ONE-GRID System
**Date:** 2025-09-02  
**Philosophy:** ONE grid to rule them all

## What is ONE-GRID?

A single, universal grid system that:
- Auto-generates grid areas (a, b, c, d...)
- Grows dynamically with content
- Works identically in visual builder, code, and runtime
- Handles everything from buttons to dashboards

## The ONE-GRID Class

```css
.one-grid {
  display: grid;
  grid-template-areas: var(--grid-areas, "a");
  grid-template-columns: var(--grid-cols, 1fr);
  grid-template-rows: var(--grid-rows, auto);
  gap: var(--grid-gap, 0);
}
```

That's it. Every layout uses this ONE class with different CSS variables.

## How ONE-GRID Works

### Level 1: Single Element
```html
<div class="one-grid">
  <div style="grid-area: a">Content</div>
</div>
```

### Level 2: Three Elements (Auto)
```html
<div class="one-grid" style="--grid-areas: 'a b c'; --grid-cols: repeat(3, 1fr)">
  <div style="grid-area: a">Left</div>
  <div style="grid-area: b">Center</div>
  <div style="grid-area: c">Right</div>
</div>
```

### Level 3: Complex Dashboard
```html
<div class="one-grid" style="--grid-areas: 'a a a' 'b c d' 'e e e'; --grid-cols: 200px 1fr 300px; --grid-rows: 60px 1fr 40px">
  <div style="grid-area: a">Header</div>
  <div style="grid-area: b">Sidebar</div>
  <div style="grid-area: c">Canvas</div>
  <div style="grid-area: d">Controls</div>
  <div style="grid-area: e">Footer</div>
</div>
```

## ONE-GRID Presets

Instead of different layout classes, just CSS variable presets:

```json
{
  "one-grid": {
    "--display": "grid",
    "--grid-template-areas": "var(--grid-areas, 'a')",
    "--grid-template-columns": "var(--grid-cols, '1fr')",
    "--grid-template-rows": "var(--grid-rows, 'auto')",
    "--gap": "var(--grid-gap, '0')"
  },
  
  "grid-auto": {
    "--grid-areas": "auto",
    "--grid-cols": "repeat(auto-fit, minmax(100px, 1fr))"
  },
  
  "grid-toolbar": {
    "--grid-areas": "'a b c'",
    "--grid-cols": "auto 1fr auto"
  },
  
  "grid-dashboard": {
    "--grid-areas": "'a a a' 'b c d' 'e e e'",
    "--grid-cols": "200px 1fr 300px",
    "--grid-rows": "60px 1fr 40px"
  },
  
  "grid-bento": {
    "--grid-areas": "'a a b' 'a a c' 'd e c'",
    "--grid-cols": "1fr 1fr 1fr",
    "--grid-rows": "1fr 1fr 1fr"
  }
}
```

## ONE-GRID Auto-Generation

```javascript
class ONEGrid {
  static generate(childCount) {
    // Auto-calculate best grid
    const cols = Math.ceil(Math.sqrt(childCount));
    const rows = Math.ceil(childCount / cols);
    
    // Generate area letters
    let areas = [];
    let letter = 97; // 'a'
    
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        if (letter - 97 < childCount) {
          row.push(String.fromCharCode(letter++));
        } else {
          row.push('.');
        }
      }
      areas.push(`'${row.join(' ')}'`);
    }
    
    return {
      '--grid-areas': areas.join(' '),
      '--grid-cols': `repeat(${cols}, 1fr)`,
      '--grid-rows': `repeat(${rows}, 1fr)`
    };
  }
  
  static span(area, cols, rows) {
    // Generate spanning areas
    // span('a', 2, 1) = 'a a'
    // span('b', 1, 2) = 'b' on two rows
    return area.repeat(cols);
  }
}
```

## ONE-GRID in Practice

### Everything is ONE-GRID

```html
<!-- Dashboard -->
<div class="box one-grid grid-dashboard">
  
  <!-- Header (also ONE-GRID) -->
  <div class="box one-grid grid-toolbar" style="grid-area: a">
    <div class="title" style="grid-area: a">Logo</div>
    <div class="box" style="grid-area: b"><!-- nav --></div>
    <div class="box one-grid" style="grid-area: c">
      <button style="grid-area: a">Save</button>
      <button style="grid-area: b">Load</button>
    </div>
  </div>
  
  <!-- Layer Tree (also ONE-GRID) -->
  <div class="box one-grid" style="grid-area: b">
    <div class="box one-grid grid-toolbar" style="grid-area: a">
      <div style="grid-area: a">▶</div>
      <div style="grid-area: b">Group 1</div>
      <div style="grid-area: c">👁</div>
    </div>
    <!-- more items -->
  </div>
  
  <!-- Canvas (also ONE-GRID) -->
  <div class="box one-grid" style="grid-area: c">
    <!-- Elements positioned by grid areas -->
  </div>
  
</div>
```

## The Power of ONE-GRID

### Visual Builder Integration
- Drop element = assign next grid area
- Drag element = change grid area
- Resize element = span multiple areas
- Delete element = remove area, regenerate

### Responsive Design
```css
/* Mobile */
@media (max-width: 768px) {
  .grid-dashboard {
    --grid-areas: 'a' 'c' 'b' 'd' 'e';
    --grid-cols: 1fr;
    --grid-rows: 60px 1fr auto auto 40px;
  }
}
```

### Animations
```css
.one-grid {
  transition: grid-template-areas 0.3s ease;
}
```

## ONE-GRID Rules

1. **Every container is ONE-GRID**
2. **Every child has a grid-area** (a, b, c...)
3. **Areas auto-generate** (up to 26, then aa, ab, ac...)
4. **Spanning uses repeated letters** (aa = 2 cols)
5. **Empty cells use '.'**
6. **No special layout classes** - just grid presets

## Benefits

- **ONE system for everything** - buttons to dashboards
- **Visual = Code** - what you see is grid-areas
- **Infinitely nestable** - ONE-GRID inside ONE-GRID
- **Automatically responsive** - just change variables
- **No layout components** - just boxes with ONE-GRID

## Migration Path

```css
/* Old */
.toolbar { display: flex; }
.dashboard { display: grid; }
.sidebar { width: 200px; }

/* New - Everything is ONE-GRID */
.one-grid { 
  display: grid;
  /* Variables handle the rest */
}
```

ONE-GRID: Because everything is just a grid with areas!
