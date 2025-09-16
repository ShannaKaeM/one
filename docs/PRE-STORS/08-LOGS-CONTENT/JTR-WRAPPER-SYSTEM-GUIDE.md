# JTR Wrapper System Guide

## Overview
JSONtoREACT (JTR) creates wrapper divs around data components and other elements. Understanding this system is critical for proper styling and layout.

## The Wrapper Concept

### Basic Structure
```
<div class="wrapper-class">          <!-- JTR Wrapper -->
  <YourComponent />                  <!-- Data Component -->
</div>
```

### For Data Components
```
<div class="canvas">                 <!-- Wrapper gets grid area -->
  <DirectRenderer />                 <!-- Component renders inside -->
</div>
```

## Preset Targeting System

### The `:` Target
In `data-preset-targets`, the `:` refers to the wrapper div:

```json
"data-preset-targets": [
  ":wrapper-preset",      // Applies preset to wrapper
  "button:button-style"   // Applies to child with class 'button'
]
```

### Critical Discovery
Using `":"` alone means "no preset on wrapper":
```json
"data-preset-targets": [":"]  // ← This fixed our grid layout issues!
```

Why? Because container presets were overriding grid areas!

## Grid Area Assignment

### How It Works
1. App.tsx assigns grid areas based on layout children order
2. JTR applies grid area to the WRAPPER div
3. Component inside doesn't need to know about grid areas

### Example Flow
```json
// Layout definition
"children": ["layout-switcher", "canvas", "library"]
```

Results in:
```html
<div style="grid-area: a">  <!-- layout-switcher wrapper -->
<div style="grid-area: b">  <!-- canvas wrapper -->
<div style="grid-area: c">  <!-- library wrapper -->
```

## Common Patterns

### 1. Clean Wrapper (Recommended)
```json
{
  "data-component": "my-component",
  "data-preset-targets": [":"]  // No styling on wrapper
}
```

### 2. Styled Wrapper
```json
{
  "data-component": "my-component",
  "data-preset-targets": [
    ":container-style",         // Style the wrapper
    "content:content-style"     // Style child elements
  ]
}
```

### 3. Complex Targeting
```json
{
  "data-preset-targets": [
    ":",                       // Clean wrapper
    "header:section-header",   // Target child with class 'header'
    "button:primary-button"    // Target child with class 'button'
  ]
}
```

## Important Rules

1. **Grid Areas**: Always applied to wrapper, never component
2. **Clean Wrappers**: Use `[":"]` when grid positioning matters
3. **Component Classes**: Data components can use their own classes freely
4. **Preset Order**: First matching preset wins

## Debugging Tips

### See the Wrappers
In browser DevTools, look for:
```html
<div class="layertree" style="grid-area: a">
  <div class="layertree">  <!-- Your actual component -->
```

### Grid Area Issues
If components are misaligned:
1. Check for container presets (`:container-style`)
2. Switch to clean wrapper (`[":"]`)
3. Verify grid-template-areas matches children count

### Style Conflicts
Wrapper presets can override:
- Position properties
- Display properties  
- Size properties
- Grid properties

## Best Practices

1. **Start Clean**: Use `[":"]` unless you need wrapper styling
2. **Grid Layouts**: Always use clean wrappers for grid children
3. **Component Styling**: Style inside component, not wrapper
4. **Debug First**: Check wrapper div before debugging component

## Connection to Layout System

The wrapper system enables:
- Automatic grid positioning
- Component isolation
- Dynamic layout switching
- Clean component APIs

Without wrappers, components would need to:
- Know their grid position
- Handle their own mounting/unmounting
- Manage layout-specific styles

The wrapper is the bridge between theme system and React components!