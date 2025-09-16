# DirectRenderer & JTR Architecture Guide

## Overview
DirectRenderer (DR) is a unique orchestrator component that manages the canvas state and interactions. Unlike other UI components that are fully converted to JTR, DirectRenderer maintains its React component logic while using JTR for its visual structure.

## Current Architecture

### Component Hierarchy
```
App.tsx (React Component)
  └── DirectRenderer (React Component - Orchestrator)
        ├── State Management (elements, selection, etc.)
        ├── Event Handlers (drag, drop, click, etc.)
        └── JTR Structure (Visual Layer)
              ├── canvas-content (user elements)
              ├── grid-overlay
              ├── selection-handles
              ├── selection-action-button
              └── element-popup
```

### Data Flow
1. **DirectRenderer** manages all state (selectedElement, gridVisible, etc.)
2. **JTR Structure Functions** create JSON from state
3. **JSONtoREACT** converts JSON to React elements
4. **Theme Presets** provide all styling

### File Locations
- **Component**: `src/components/DirectRenderer.tsx`
- **JTR Structures**: `src/components/jtr/`
  - `GridOverlayJTR.ts`
  - `SelectionHandlesJTR.ts`
  - `SelectionActionButtonJTR.ts`
  - `ElementPopupJTR.ts`
  - `DirectRendererContainerJTR.ts`
- **Theme**: `public/data/themes/ui-theme.json`
- **Converter**: `src/components/JSONtoREACT.tsx`

## Key Principles

### 1. Separation of Concerns
- **DirectRenderer**: Logic, state, event handling
- **JTR Structures**: JSON definitions for UI
- **UI Theme**: All visual styling
- **No inline styles or global CSS**

### 2. Event System
- JTR components dispatch CustomEvents via `onClick`
- DirectRenderer listens for `jtor-action` events
- Actions include: `add-one-element`, `toggle-grid`, `toggle-snap`

### 3. Dynamic vs Static
- **Static** (in theme): positions, z-index, colors, sizing
- **Dynamic** (from DR): visibility, selection state, coordinates

## Current Implementation

### DirectRenderer Structure
```javascript
// DirectRenderer creates JTR structure
const canvasStructure = {
  type: "one",
  components: "direct-renderer-container",
  children: [
    { type: "raw-html", content: htmlContent },
    gridVisible && getGridOverlayStructure(true),
    selectedElementObj && getSelectionHandlesStructure(...),
    // ... other overlays
  ].filter(Boolean)
};

// Renders via JTR
return (
  <div ref={canvasRef} onDrop={...}>
    <JtoR structure={{ root: canvasStructure }} />
  </div>
);
```

### Theme Presets (ui-theme.json)
```json
"presets": {
  "components": {
    "direct-renderer-container": {
      "position": "relative",
      "width": "100%",
      "height": "100%"
    },
    "grid-overlay": {
      "position": "absolute",
      "inset": "0",
      "z-index": "1100"
    }
  }
}
```

## Target Architecture (Data-Component Pattern)

### Goal
Move DirectRenderer's visual wrapper into ui-theme.json as a data-component, eliminating hardcoded wrapper divs.

### Proposed Structure
```json
"data-components": {
  "direct-renderer": {
    "root": {
      "type": "one",
      "components": ["direct-renderer-container"],
      "looks": ["full-size"],
      "children": [
        {
          "slot": "canvas-content",
          "components": ["canvas-area"]
        },
        {
          "slot": "overlays",
          "components": ["overlay-container"]
        }
      ]
    },
    "presets": {
      "direct-renderer-container": {
        "position": "relative",
        "width": "100%",
        "height": "100%"
      }
    }
  }
}
```

### Benefits
1. All structure defined in theme
2. DirectRenderer only provides dynamic content
3. No wrapper divs in component code
4. Complete style isolation

## Troubleshooting Guide

### Common Issues

1. **Overlays Not Visible**
   - Check z-index values in presets
   - Ensure overlays are inside canvas container
   - Verify CSS properties aren't using `--` prefix

2. **Positioning Issues**
   - Overlays must be inside position:relative container
   - Coordinates should be relative to canvas, not viewport
   - Check for conflicting position styles

3. **Event Handling**
   - Verify CustomEvent names match
   - Check event listener setup in DirectRenderer
   - Ensure JTR onClick maps to correct action

4. **Styling Not Applied**
   - Confirm presets are using direct CSS (not variables)
   - Check component class names match preset names
   - Verify theme is loaded before rendering

### Debug Checklist
- [ ] Console shows "JtoR loaded ui theme"
- [ ] Grid overlay structure logged when toggled
- [ ] Selection handles structure logged when element selected
- [ ] No CSS variables (`--property`) in component presets
- [ ] All overlays rendered inside canvas container
- [ ] No inline styles on structural elements
- [ ] No global CSS classes used

## Migration Path

1. **Current State**: DirectRenderer with hardcoded wrapper + JTR overlays
2. **Next Step**: Define data-component structure in ui-theme.json
3. **Final State**: DirectRenderer returns only functional content, theme provides all structure

## Key Decisions

### Why DirectRenderer Stays as React Component
- Complex state management (elements, selection, drag/drop)
- DOM measurements and calculations
- External integrations (storage, R2)
- Event handling and side effects

### Why Overlays Use JTR
- Pure visual components
- Driven by DirectRenderer state
- Benefit from theme-based styling
- No complex logic

### Why No Global CSS
- Breaks theme isolation
- Hard to override
- Not portable
- Conflicts with dogfooding principle