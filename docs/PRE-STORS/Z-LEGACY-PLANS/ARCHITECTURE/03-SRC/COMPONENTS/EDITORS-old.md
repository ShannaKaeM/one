# Editors

## 🎯 Quick Summary
> **Purpose**: Property editing panel with categorized theme variables and autocomplete  
> **Type**: React Component  
> **Location**: `/src/components/Editors.tsx`  
> **Related**: [THEME-PROCESSOR](../THEME-PROCESSOR.md), [DIRECT-RENDERER](./DIRECT-RENDERER.md), [ONE-THEME](../../PUBLIC/ONE-THEME.md), [JSONtoREACT](./JSONtoREACT.md)

---

## 🔄 Simple Explanation

The Editors component is the **property panel** that allows users to edit CSS properties of selected elements:

1. **Loads theme variables** - Fetches variables from one-theme.json
2. **Categorizes properties** - Groups by colors, spacing, typography, etc.
3. **Provides controls** - Text inputs with autocomplete suggestions
4. **Manages state** - Local value editing with commit on blur/enter
5. **Dispatches changes** - Sends property updates to DirectRenderer
6. **Shows suggestions** - Context-aware autocomplete for CSS values

```
Theme variables → Categorized sections → Property controls → User edits → Events to DirectRenderer
```

---

## 📋 Technical Specification

### Component Props

```typescript
{
  selectedElement?: any;                          // Currently selected element
  onPropertyChange?: (property, value) => void;  // Property change callback
  className?: string;                             // CSS class
  presetClassMap?: Record<string, string>;       // Preset overrides
}
```

### Theme Variable Structure

```typescript
interface ThemeVariable {
  key: string;              // Property name (e.g., "backgroundColor")
  defaultValue: string;     // Default value
  type: string;            // Value type (color, string, etc.)
  category: string;        // Category for grouping
  description: string;     // User-friendly label
  cssProperty: string;     // CSS variable name (e.g., "--background-color")
}
```

### Categories

```javascript
const categoryIcons = {
  layout: '📐',
  sizing: '📏',
  spacing: '↔️',
  colors: '🎨',
  typography: '✏️',
  visual: '✨',
  borders: '🔲',
  positioning: '📍',
  grid: '▦',
  flex: '⬅➡',
  behavior: '⚙️',
  animation: '🎬',
  misc: '📦'
};
```

---

## 🔗 Integration Points

### JSONtoREACT Integration

Props passed to Editors:
```javascript
...(element['data-component'] === 'editors' ? {
  selectedElement: selectedElementData,
  onPropertyChange: (property, value) => {
    window.dispatchEvent(new CustomEvent('ui-action', {
      detail: {
        type: 'updateProperty',
        property,
        target: value
      }
    }));
  },
  presetClassMap: presetTargetMappings
} : {})
```

### Event Flow

1. **User edits property** → Editors component
2. **onPropertyChange** → Dispatches `ui-action` event
3. **App.tsx handler** → Processes updateProperty action
4. **Dispatches** → `element-property-changed` event
5. **DirectRenderer** → Updates element style

### Theme Integration

```javascript
// Load ONE theme variables
const oneTheme = runtimeThemeProcessor.getTheme('one');
const variables = oneTheme?.variables || {};

// Group by category
const categorized = Object.entries(variables).reduce((acc, [key, config]) => {
  const category = config.category || 'misc';
  if (!acc[category]) acc[category] = [];
  acc[category].push({ key, ...config });
  return acc;
}, {});
```

---

## 🎨 UI Features

### Visual Components

1. **Header**
   - "Properties" title
   - "Reset All" button

2. **Sections**
   - Accordion-style (one open at a time)
   - Category icon and title
   - Expand/collapse arrow
   - Hover highlight

3. **Controls**
   - Label (description or key)
   - Text input field
   - Autocomplete dropdown

### Autocomplete System

```javascript
const suggestions = {
  display: ['block', 'grid', 'none', 'inline', 'inline-block'],
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  color: ['hsl(0, 0%, 100%)', 'hsl(342, 36%, 53%)', 'transparent'],
  width: ['100%', '50%', 'auto', 'fit-content', '200px'],
  padding: ['0', '0.5rem', '1rem', '1.5rem', '2rem'],
  fontSize: ['0.75rem', '0.875rem', '1rem', '1.25rem'],
  // ... many more property-specific suggestions
};
```

### Interaction Flow

1. **Focus input** → Show relevant suggestions
2. **Type value** → Filter suggestions
3. **Arrow keys** → Navigate suggestions
4. **Tab/Enter** → Apply selected suggestion
5. **Blur/Enter** → Commit value change
6. **Escape** → Cancel autocomplete

---

## 📊 State Management

### Component State

- `expandedSections`: Currently open accordion section
- `categorizedVariables`: Theme variables grouped by category

### Control State (per input)

- `localValue`: Current input value
- `showAutocomplete`: Dropdown visibility
- `selectedIndex`: Highlighted suggestion

### Value Flow

1. **Initial** → Get from `selectedElement.style[property]`
2. **Edit** → Update local state immediately
3. **Commit** → On blur/enter, dispatch if changed
4. **External** → Update local when selection changes

---

## 🚧 Suggested Sub-domains

### Core Sub-domains:

1. **THEME-LOADING**
   - ONE theme fetching
   - Variable extraction
   - Category grouping
   - Default handling

2. **CATEGORIZATION-SYSTEM**
   - Category mapping
   - Icon assignment
   - Section generation
   - Sort ordering

3. **ACCORDION-UI**
   - Section expansion
   - Single-open logic
   - Visual transitions
   - Header interactions

4. **INPUT-CONTROLS**
   - Text input rendering
   - Local state management
   - Value formatting
   - Placeholder generation

5. **AUTOCOMPLETE-ENGINE**
   - Suggestion database
   - Filter algorithm
   - Keyboard navigation
   - Mouse interactions

6. **VALUE-MANAGEMENT**
   - Current value retrieval
   - Change detection
   - Commit logic
   - External sync

7. **EVENT-DISPATCH**
   - Property change events
   - UI action wrapping
   - Event detail formatting
   - Error handling

8. **PRESET-INTEGRATION**
   - Class mapping
   - Preset overrides
   - Style inheritance
   - Dynamic styling

9. **VISUAL-RENDERING**
   - Style injection
   - Component styling
   - State-based classes
   - Responsive layout

10. **PERFORMANCE**
    - Input debouncing
    - Suggestion caching
    - Render optimization
    - Large property sets