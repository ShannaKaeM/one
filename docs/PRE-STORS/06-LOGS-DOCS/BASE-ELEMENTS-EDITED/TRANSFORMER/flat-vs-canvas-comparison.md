---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01.md
related: [flat-element-concept, flat-canvas-concept, group-to-flat-conversion]
---

# Flat vs Canvas Comparison

## Definition
A comprehensive comparison of two visual design paradigms: Flat Canvas (multiple elements arranged) versus Flat Elements (single transformable units), and how they complement each other.

## Key Distinction

### Flat Canvas
- **Multiple separate elements** on a canvas
- Each element is independent
- Visual arrangement freedom
- Grid-based positioning

### Flat Elements
- **One element with layers**
- Internal content structure
- Transform via presets
- Single cohesive unit

## Strengths Comparison

### FLAT CANVAS Strengths
✅ **Freedom** - Place anything anywhere
✅ **Mixing** - Combine simple elements with complex ones
✅ **Grid Control** - Use CSS Grid areas for precise layouts
✅ **Grouping** - Can group elements into compositions

### FLAT ELEMENTS Strengths
✅ **Transformation** - Button → Hero with one preset change
✅ **Cohesion** - Everything moves/scales together
✅ **Simplicity** - One element to manage
✅ **Reusability** - Save as patterns/components

## The Hybrid Approach

### Best of Both Worlds
1. **Create Flat Elements** for reusable components (cards, heroes, etc.)
2. **Use Flat Canvas** to arrange multiple elements
3. **Mix and Match** - Some elements are simple, some are complex Flat Elements

### Example Composition
```
CANVAS:
┌─────────────────────────────────────┐
│ [A: Header - Flat Element]          │
│   (Can switch between nav styles)   │
├─────────────────────────────────────┤
│ [B: Hero - Flat Element]            │
│   (Can transform layouts)           │
├──────────────┬──────────────────────┤
│ [C: Card]    │ [D: Card]            │
│ (Flat Elem)  │ (Flat Elem)         │
├──────────────┴──────────────────────┤
│ [E: Simple Text Block]              │
└─────────────────────────────────────┘
```

## Practical Benefits

### For Flat Elements in Canvas
- Drop a "card" element that can transform between layouts
- Create a "hero" that can switch from left-aligned to centered
- Build a "nav" that can go from horizontal to hamburger

### For Grouping
- Group simple elements into a composition
- Save the group as a new Flat Element
- Now it can receive presets too!

## The Workflow

### Creation Cycle
1. **Build** components as Flat Elements
2. **Arrange** them on Flat Canvas
3. **Group** canvas arrangements
4. **Convert** groups to new Flat Elements

### This enables:
- Start simple, grow complex
- Reuse at any level
- Transform at any scale
- Maximum flexibility

## Use Case Examples

### Landing Page
```javascript
canvas: [
  { type: 'one', preset: 'header-sticky' },    // Flat Element
  { type: 'one', preset: 'hero-centered' },    // Flat Element
  { type: 'wrapper', content: 'Simple CTA' },  // Simple element
  { type: 'one', preset: 'footer-columns' }    // Flat Element
]
```

### Component Library
- Build Flat Elements for each component
- Arrange on canvas for demos
- Group related components
- Export as patterns

## Decision Guide

### Use Flat Canvas When:
- Building page layouts
- Need positioning freedom
- Mixing element types
- Creating compositions

### Use Flat Elements When:
- Need transformation ability
- Want preset switching
- Building reusable components
- Ensuring consistency

## Related Atoms
- `flat-element-concept` - Deep dive on Flat Elements
- `flat-canvas-concept` - Deep dive on Flat Canvas
- `group-to-flat-conversion` - Converting between paradigms