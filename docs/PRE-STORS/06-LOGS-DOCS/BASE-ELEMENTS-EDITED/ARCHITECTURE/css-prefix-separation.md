---
type: L1-ATOM
category: ARCHITECTURE
status: DEPRECATED
source: Session 008 refactored this approach
related: [dual-theme-architecture, parent-scope-pattern]
replacement: parent-scope-pattern
---

# CSS Prefix Separation

## ⚠️ DEPRECATED - Replaced by Parent Scoping

**This atom is deprecated as of Session 008.** The prefix separation approach has been replaced by parent scoping for cleaner CSS architecture.

## What Changed

### ❌ Old Approach (This Atom)
```css
/* UI Theme - Prefixed classes */
.ui-dashboard { /* dashboard layout */ }
.ui-sidebar { /* sidebar layout */ }
.ui-button { /* interface buttons */ }

/* ONE Theme - Clean classes */
.hero { /* content hero styles */ }
.grid { /* content grid styles */ }
.wrapper { /* content wrapper styles */ }
```

### ✅ New Approach (Session 008)
```css
/* Parent scoping instead of prefixes */
.ui .dashboard { /* dashboard layout */ }
.ui .sidebar { /* sidebar layout */ }
.ui .button { /* interface buttons */ }

.one .hero { /* content hero styles */ }
.one .grid { /* content grid styles */ }
.one .wrapper { /* content wrapper styles */ }
```

## Why the Change

From Session 008 findings:
- **Cleaner code**: No more "ugly prefixes"
- **Better separation**: Parent scoping provides clear boundaries
- **No conflicts**: `.ui` and `.one` scopes prevent style collisions
- **Consistent structure**: Both themes use identical patterns

## Current Architecture

Both themes now follow this unified structure:
```json
{
  "class": "ui",          // or "one"
  "variables": { ... },   // CSS variables scoped to parent
  "presets": {           // Style combinations
    "category": {
      "name": { "--property": "value" }
    }
  },
  "helpers": {           // Utility classes
    "positioning": {
      "a": { "--grid-area": "a" }
    }
  }
}
```

Generated CSS output:
```css
/* UI Theme */
.ui .dashboard { ... }
.ui .button { ... }
.ui .a { grid-area: a; }

/* ONE Theme */
.one .wrapper { ... }
.one .hero { ... }
.one .a { grid-area: a; }
```

## Migration Path

If you're still using the old prefix system:

1. **Remove prefixes** from class names in theme JSON
2. **Use parent scoping** in CSS generation
3. **Update components** to use theme wrapper divs
4. **Test** that scoping prevents conflicts

## Current Implementation

See `runtimeThemeProcessor.ts` for the parent scoping implementation:
```typescript
// Unified handling with parent scoping
if (themeConfig.presets) {
  css.push(`.${baseClass} .${presetName} {`);
}
```

## Related Atoms
- `parent-scope-pattern` - Current scoping approach
- `dual-theme-architecture` - Overall theme separation
- `theme-loading-sequence` - How themes are processed