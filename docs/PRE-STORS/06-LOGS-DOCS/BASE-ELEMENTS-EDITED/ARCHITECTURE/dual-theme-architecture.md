---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: 01-ROADMAP.md#L57-90
related: [parent-scope-pattern, theme-loading-sequence, runtime-theme-processor]
---

# Dual Theme Architecture

## Definition
A separated theme system that enables independent UI dashboard and ONE canvas operation with zero CSS conflicts through prefix isolation and dual rendering paths.

## Key Principles
- Complete theme independence between UI and content
- Zero CSS conflicts through prefix scoping
- Same processor, different processing paths
- Clean separation of concerns

## Implementation

### Independent Theme Loading
- **UI Theme** → `ui-theme.json` → Loads independently for dashboard
- **ONE Theme** → `one-theme.json` → Loads independently for canvas content
- **Separated Architecture** → Clean theme isolation, zero CSS conflicts

### Dual Rendering System
- **UI Theme** → **UIGenerator** → React Dashboard (`.ui` scoped variables)
- **ONE Theme** → **DirectRenderer** → Pure HTML/CSS Canvas (`.one` scoped variables)

### CSS Parent Scoping
```css
/* UI Theme - Parent Scoped */
.ui { --color: #333; /* UI variables */ }
.ui .dashboard { /* dashboard layout */ }
.ui .sidebar { /* sidebar layout */ }
.ui .button { /* interface buttons */ }

/* ONE Theme - Parent Scoped */
.one { --color: hsl(0, 0%, 20%); /* ONE variables */ }
.one .hero { /* content hero styles */ }
.one .grid { /* content grid styles */ }
.one .wrapper { /* content wrapper styles */ }
```

### Theme Processor Logic
- **UI Theme** uses parent scoping with `.ui` → Generates scoped classes
- **ONE Theme** uses parent scoping with `.one` → Generates scoped classes
- **Same processor** applies parent scoping pattern consistently

## Examples

### UI Theme Structure
```json
{
  "ui-looks": {
    "sidebar": { /* UI-specific styles */ }
  },
  "ui-elements": {
    "button": { /* UI button styles */ }
  }
}
```

### ONE Theme Structure
```json
{
  "looks": {
    "hero": { /* Content styles */ }
  },
  "elements": {
    "wrapper": { /* Content element styles */ }
  }
}
```

## Benefits
- No CSS naming conflicts ever
- Independent theme evolution
- Clear mental model
- Export-ready clean names for ONE theme

## Related Atoms
- `parent-scope-pattern` - Parent scoping strategy
- `theme-loading-sequence` - How themes load in order
- `runtime-theme-processor` - The processing engine