---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01.md
related: [flat-element-concept, flat-vs-canvas-comparison]
---

# Flat Canvas Concept

## Definition
A visual design system where multiple independent elements are arranged on a canvas using drag & drop, with CSS Grid areas providing spatial relationships.

## Key Principles
- Multiple separate elements
- Independent positioning
- Visual arrangement
- Grid area relationships

## Visual Representation
```
CANVAS VIEW:
┌────────────────────────────┐
│ 🔲 Element 1 (Card)        │
│ 🔲 Element 2 (Button)      │
│ 🔲 Element 3 (Text)        │
│ 🔲 Element 4 (Image)       │
└────────────────────────────┘
All separate, arrangeable pieces
```

## Core Characteristics

### Element Independence
- Each element exists separately
- Own properties and styles
- Individual selection/manipulation
- No inherent relationships

### Canvas Properties
- Absolute positioning space
- Drag & drop interaction
- Visual arrangement tool
- Grid-based alignment

### Positioning System
- CSS Grid areas (a, b, c, d...)
- Maintain spatial relationships
- Responsive positioning
- Visual layout control

## Implementation Example
```javascript
// Multiple elements on canvas
canvas: [
  { 
    type: 'wrapper',
    preset: 'card',
    content: 'Card content',
    position: 'a'
  },
  { 
    type: 'button',
    preset: 'primary',
    content: 'Click me',
    position: 'b'
  },
  { 
    type: 'text',
    content: 'Description',
    position: 'c'
  }
]
```

## Strengths

### Flexibility
- Free-form layouts
- Mix any elements
- Visual experimentation
- Quick arrangements

### Simplicity
- Each element is simple
- Clear mental model
- Easy to understand
- Direct manipulation

### Composition
- Build complex from simple
- Reusable components
- Modular approach
- Progressive complexity

## Use Cases

### Page Building
- Landing pages
- Marketing layouts
- Content sections
- Form designs

### Component Assembly
- Combining primitives
- Creating patterns
- Testing layouts
- Prototyping

## Comparison Points

### vs Flat Elements
- **Flat Canvas**: Many elements arranged
- **Flat Elements**: One element with layers
- **Combination**: Best of both worlds

### Export Characteristics
- Clean HTML structure
- Separate components
- Grid-based layout
- Standard markup

## Related Atoms
- `flat-element-concept` - Single element approach
- `flat-vs-canvas-comparison` - Detailed comparison