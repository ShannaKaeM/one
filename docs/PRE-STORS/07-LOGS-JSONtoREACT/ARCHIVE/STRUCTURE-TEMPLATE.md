# JSONtoREACT Structure Template
**Date:** 2025-09-02  
**Status:** UPDATED

## Flat Structure Template

Each box follows this template:

```json
{
  "box-id": {
    "type": "box",
    "component": ["button", "card"],      // Component presets
    "style": ["dark", "rounded"],         // Style presets  
    "grid": {                              // Grid layout (optional)
      "areas": "'a b c'",
      "cols": "auto 1fr auto",
      "rows": "60px"
    },
    "utilities": {                         // Inline utilities
      "overflow": "auto",
      "text-size": "lg",
      "padding": "2rem"
    },
    "data-label": "header",               // For identification
    "children": ["box-002", "box-003"]    // Child references
  }
}
```

## Utilities System

Utilities are quick inline styles that can be overridden by presets:

### Text Utilities
```json
"utilities": {
  "text-size": "xs | sm | md | lg | xl | 2xl | 3xl",
  "text-weight": "100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900",
  "text-align": "left | center | right | justify"
}
```

### Layout Utilities
```json
"utilities": {
  "overflow": "visible | hidden | auto | scroll",
  "position": "relative | absolute | fixed | sticky",
  "display": "grid | block | none"
}
```

### Spacing Utilities
```json
"utilities": {
  "padding": "0 | 0.25rem | 0.5rem | 1rem | 2rem | 4rem",
  "margin": "0 | 0.25rem | 0.5rem | 1rem | 2rem | 4rem",
  "gap": "0 | 0.25rem | 0.5rem | 1rem | 2rem"
}
```

## Complete Dashboard Example (Flat)

```json
{
  "structure": {
    "dashboard": {
      "type": "box",
      "data-label": "dashboard",
      "grid": {
        "areas": "'a a a' 'b c d' 'e e e'",
        "cols": "200px 1fr 300px",
        "rows": "60px 1fr 40px"
      },
      "utilities": {
        "overflow": "hidden"
      },
      "children": ["box-001", "box-002", "box-003", "box-004", "box-005"]
    },
    
    "box-001": {
      "type": "box",
      "data-label": "header",
      "style": ["dark-bg"],
      "utilities": {
        "grid-area": "a",
        "padding": "1rem"
      },
      "children": ["box-006", "box-007", "box-008"]
    },
    
    "box-002": {
      "type": "box",
      "data-label": "layer-tree",
      "utilities": {
        "grid-area": "b",
        "overflow": "auto"
      }
    },
    
    "box-003": {
      "type": "box",
      "data-label": "canvas",
      "component": ["canvas"],
      "utilities": {
        "grid-area": "c"
      }
    },
    
    "box-004": {
      "type": "box",
      "data-label": "controls",
      "utilities": {
        "grid-area": "d",
        "overflow": "auto"
      }
    },
    
    "box-005": {
      "type": "box",
      "data-label": "footer",
      "style": ["dark-bg"],
      "utilities": {
        "grid-area": "e",
        "padding": "0.5rem"
      }
    },
    
    "box-006": {
      "type": "title",
      "content": "Studio1",
      "utilities": {
        "text-size": "xl"
      }
    },
    
    "box-007": {
      "type": "box",
      "grid": {
        "areas": "'a b c'",
        "cols": "repeat(3, auto)",
        "gap": "1rem"
      },
      "children": ["button-001", "button-002", "button-003"]
    },
    
    "button-001": {
      "type": "button",
      "content": "Save",
      "component": ["primary"]
    }
  }
}
```

## How Utilities Work

1. **Utilities are applied first** - Base inline styles
2. **Presets override utilities** - More specific
3. **Can save entire element as preset** - Including utilities

### Example Flow:
```
1. Start with utilities for quick sketching:
   "utilities": { "padding": "2rem", "overflow": "auto" }

2. Apply preset that overrides:
   "style": ["card"] // Card preset might set padding: 1rem

3. Save final result as new preset:
   "my-custom-card" = utilities + presets combined
```

## Benefits

1. **Quick sketching** - Use utilities without creating presets
2. **Progressive refinement** - Start with utilities, add presets
3. **Save as preset** - Turn any combination into reusable preset
4. **Mathematical text scaling** - Can add calc() in utilities
5. **Contextual sizing** - Utilities can reference container

## Utility Mappings to ONE Variables

```javascript
// Text size utilities map to --font-size
"text-size": {
  "xs": "0.75rem",
  "sm": "0.875rem",
  "md": "1rem",
  "lg": "1.125rem",
  "xl": "1.25rem",
  "2xl": "1.5rem",
  "3xl": "2rem"
}

// Overflow maps directly to --overflow
"overflow": "auto" → "--overflow": "auto"

// Padding maps to --padding
"padding": "2rem" → "--padding": "2rem"
```

## Future: Auto-Resize Text

```json
"utilities": {
  "text-size": "calc(1rem + 1vw)",
  "text-scale": "responsive",
  "container-query": "true"
}
```

This gives us the best of both worlds:
- Flat structure for easy editing
- Utilities for quick sketching
- Presets for reusable patterns
- Can combine and save as new presets
