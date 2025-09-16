# ONE BOX Preset System - Simplified
**Date:** 2025-09-02  
**Philosophy:** Everything is ONE BOX with grid areas

## Core Concept
- **ONE ELEMENT** (Molecules) = Made of ONE Variables (Atoms)
- **ONE BOX** = Universal structural container
- Everything is a box with `display: grid` and grid areas
- Flatten/unflatten for editing vs export
- `.ui .one-element` for UI theme
- `.one .one-element` for ONE theme

## The ONE BOX Base

```json
{
  "box": {
    "--display": "grid",
    "--grid-template-columns": "1fr",
    "--grid-template-areas": "'a'",
    "--position": "relative",
    "--box-sizing": "border-box"
  }
}
```

Every single component starts with this. Then we add grid variations.

---

## Component 1: LayerTree

### Structure
```
LayerTree (box)
├── TreeItem (box with 3-column grid)
│   ├── Expand (box area: start)
│   ├── Label (box area: center)
│   └── Actions (box area: end)
└── TreeItem (nested boxes for children)
```

### Presets Needed
```json
{
  "layer-tree": {
    "base": "box",
    "additions": {
      "--grid-template-rows": "repeat(auto-fill, min-content)",
      "--gap": "2px",
      "--padding": "0.5rem",
      "--overflow": "auto"
    }
  },
  
  "tree-item": {
    "base": "box",
    "additions": {
      "--grid-template-columns": "24px 1fr auto",
      "--grid-template-areas": "'start center end'",
      "--align-items": "center",
      "--padding": "4px",
      "--min-height": "28px"
    }
  },
  
  "tree-indent": {
    "--padding-left": "calc(var(--depth, 0) * 20px)"
  },
  
  "tree-expand": {
    "base": "box",
    "--grid-area": "start",
    "--width": "16px",
    "--height": "16px",
    "--cursor": "pointer"
  },
  
  "tree-label": {
    "base": "box",
    "--grid-area": "center",
    "--padding": "0 8px"
  },
  
  "tree-actions": {
    "base": "box",
    "--grid-area": "end",
    "--grid-template-columns": "repeat(auto-fit, 16px)",
    "--gap": "4px"
  }
}
```

---

## Component 2: DirectRenderer (Canvas)

### Structure
```
Canvas (box)
├── GridOverlay (box overlay)
├── Elements (boxes with absolute positioning)
├── SelectionHandles (8 boxes)
└── AddButton (box fixed position)
```

### Presets Needed
```json
{
  "canvas": {
    "base": "box",
    "additions": {
      "--position": "relative",
      "--overflow": "hidden",
      "--width": "100%",
      "--height": "100%"
    }
  },
  
  "canvas-element": {
    "base": "box",
    "additions": {
      "--position": "absolute",
      "--cursor": "move"
    }
  },
  
  "grid-overlay": {
    "base": "box",
    "additions": {
      "--position": "absolute",
      "--inset": "0",
      "--pointer-events": "none",
      "--background-image": "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,0,255,0.1) 20px)",
      "--background-size": "20px 20px"
    }
  },
  
  "selection-box": {
    "base": "box",
    "additions": {
      "--position": "absolute",
      "--border": "1px solid hsl(342, 36%, 53%)",
      "--pointer-events": "none"
    }
  },
  
  "handle": {
    "base": "box",
    "additions": {
      "--position": "absolute",
      "--width": "8px",
      "--height": "8px",
      "--background-color": "white",
      "--border": "1px solid hsl(342, 36%, 53%)",
      "--cursor": "pointer"
    }
  },
  
  "add-button": {
    "base": "box",
    "additions": {
      "--position": "fixed",
      "--top": "20px",
      "--left": "50%",
      "--transform": "translateX(-50%)",
      "--padding": "8px 16px",
      "--cursor": "pointer"
    }
  }
}
```

### Handle Position Modifiers
```json
{
  "nw": { "--top": "-4px", "--left": "-4px", "--cursor": "nw-resize" },
  "n": { "--top": "-4px", "--left": "50%", "--transform": "translateX(-50%)", "--cursor": "n-resize" },
  "ne": { "--top": "-4px", "--right": "-4px", "--cursor": "ne-resize" },
  "e": { "--top": "50%", "--right": "-4px", "--transform": "translateY(-50%)", "--cursor": "e-resize" },
  "se": { "--bottom": "-4px", "--right": "-4px", "--cursor": "se-resize" },
  "s": { "--bottom": "-4px", "--left": "50%", "--transform": "translateX(-50%)", "--cursor": "s-resize" },
  "sw": { "--bottom": "-4px", "--left": "-4px", "--cursor": "sw-resize" },
  "w": { "--top": "50%", "--left": "-4px", "--transform": "translateY(-50%)", "--cursor": "w-resize" }
}
```

---

## Component 3: GeneralControls

### Structure
```
GeneralControls (box)
├── ControlGroup (box)
│   ├── Label (box)
│   └── Control (box with input/select/etc)
└── ControlGroup (more boxes)
```

### Presets Needed
```json
{
  "controls": {
    "base": "box",
    "additions": {
      "--grid-template-rows": "repeat(auto-fill, min-content)",
      "--gap": "1rem",
      "--padding": "1rem"
    }
  },
  
  "control-group": {
    "base": "box",
    "additions": {
      "--grid-template-columns": "1fr",
      "--gap": "4px"
    }
  },
  
  "control-label": {
    "base": "box",
    "additions": {
      "--font-size": "0.875rem",
      "--opacity": "0.7"
    }
  },
  
  "control-field": {
    "base": "box",
    "additions": {
      "--padding": "8px",
      "--border": "1px solid",
      "--border-radius": "4px",
      "--min-height": "32px"
    }
  },
  
  "control-row": {
    "base": "box",
    "additions": {
      "--grid-template-columns": "1fr 1fr",
      "--gap": "8px"
    }
  }
}
```

---

## Shared Interactive States

```json
{
  "hover": {
    "--opacity": "0.8"
  },
  
  "active": {
    "--opacity": "0.6"
  },
  
  "selected": {
    "--background-color": "rgba(255, 0, 255, 0.1)"
  },
  
  "disabled": {
    "--opacity": "0.5",
    "--pointer-events": "none"
  }
}
```

---

## The Magic: Everything is ONE BOX

### Example Compositions

```html
<!-- LayerTree -->
<div class="ui one-element box layer-tree dark-style">
  <div class="ui one-element box tree-item" data-depth="0">
    <div class="ui one-element box tree-expand">▶</div>
    <div class="ui one-element box tree-label">Group 1</div>
    <div class="ui one-element box tree-actions">
      <div class="ui one-element box">👁</div>
      <div class="ui one-element box">🔒</div>
    </div>
  </div>
  <div class="ui one-element box tree-item tree-indent" data-depth="1">
    <div class="ui one-element box tree-expand"></div>
    <div class="ui one-element box tree-label">Element 1</div>
    <div class="ui one-element box tree-actions">...</div>
  </div>
</div>

<!-- Canvas with Element -->
<div class="ui one-element box canvas">
  <div class="ui one-element box grid-overlay"></div>
  <div class="ui one-element box canvas-element" style="--left: 100px; --top: 100px;">
    Content
  </div>
  <div class="ui one-element box selection-box">
    <div class="ui one-element box handle nw"></div>
    <div class="ui one-element box handle n"></div>
    <!-- ... other handles ... -->
  </div>
  <div class="ui one-element box add-button">+ ONE</div>
</div>

<!-- GeneralControls -->
<div class="ui one-element box controls">
  <div class="ui one-element box control-group">
    <div class="ui one-element box control-label">Position</div>
    <div class="ui one-element box control-row">
      <div class="ui one-element box control-field" contenteditable>100</div>
      <div class="ui one-element box control-field" contenteditable>200</div>
    </div>
  </div>
</div>
```

---

## Benefits of ONE BOX

1. **Everything is the same** - Just boxes with different grid configurations
2. **Flatten/Unflatten** - Since everything is a box, we can flatten the hierarchy for visual editing
3. **Grid areas everywhere** - Move anything by changing its grid area
4. **No special components** - A button is a box, a modal is a box, everything is a box
5. **Data attributes** - Use `data-label`, `data-action`, `data-depth` for behavior

---

## Total Preset Count: ~20

- **Base**: 1 (box)
- **LayerTree**: 6 presets
- **Canvas**: 6 presets + 8 handle positions
- **GeneralControls**: 5 presets
- **States**: 4 presets

That's it! Everything else is just combining these boxes with different grid configurations.
