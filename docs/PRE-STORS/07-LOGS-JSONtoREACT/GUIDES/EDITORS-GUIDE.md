# Editors System Guide

## Overview
The Editors component provides property editing for selected elements using theme-based dynamic categories. It loads CSS variables from the ONE theme and displays them in categorized accordions.

## Architecture Flow
```
ONE Theme Variables → Editors Component → JTR Wrapper → DirectRenderer → Element Update
```

## 1. Theme Variables Source

### What It Is
- CSS variables defined in `/public/data/themes/one-theme.json`
- Each variable has category, type, description, cssProperty
- 100+ variables across 12 categories

### Variable Structure
```json
"backgroundColor": {
  "defaultValue": "none",
  "type": "color",
  "category": "colors",
  "description": "Background color",
  "cssProperty": "--background-color"
}
```

### Categories
- colors (8 vars)
- visual (15 vars)
- borders (13 vars)
- behavior (10 vars)
- typography (15 vars)
- sizing (7 vars)
- spacing (2 vars)
- positioning (4 vars)
- layout (9 vars)
- grid (9 vars)
- flex (6 vars)
- animation (2 vars)

## 2. Editors Component

### Location
`/src/components/Editors.tsx`

### What It Does
1. Loads ONE theme variables via runtimeThemeProcessor
2. Groups variables by category
3. Creates accordion sections dynamically
4. Handles input with local state (fixes focus issue)
5. Dispatches property changes to DirectRenderer

### Key Props
```typescript
interface EditorsProps {
  selectedElement?: any;
  onPropertyChange?: (property: string, value: any) => void;
  className?: string;
  presetClassMap?: Record<string, string>;
}
```

### Input Focus Fix
```typescript
// Local state prevents re-render on each character
const [localValue, setLocalValue] = useState(getCurrentValue(variable.key));

// Commits on blur or Enter
const commitChange = () => {
  if (localValue !== getCurrentValue(variable.key)) {
    handleChange(variable.key, localValue);
  }
};
```

## 3. JTR Integration

### Theme Definition (`/public/data/themes/ui-theme.json`)
```json
"editors": {
  "type": "one",
  "data-label": "editors",
  "layouts": "editors-container",
  "looks": "neutral-dark",
  "data-component": "editors",
  "data-preset-targets": [
    ":",
    "editors-header:editors-header primary"
  ]
}
```

### Component Registration (`/src/App.tsx`)
```javascript
const dataComponentsMap = {
  'direct-renderer': DirectRenderer,
  'library': Library,
  'layertree': LayerTree,
  'editors': Editors
};
```

### Props Injection (`/src/components/JSONtoREACT.tsx`)
```javascript
...(element['data-component'] === 'editors' ? {
  selectedElement: selectedElementData,
  onPropertyChange: (property: string, value: any) => {
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

## 4. Update Flow

### From Input to Element
1. **User Types**: Input field with local state
2. **Blur/Enter**: Triggers `commitChange()`
3. **onPropertyChange**: Called with property & value
4. **Event Dispatch**: `ui-action` event
5. **App.tsx Handler**: Catches event, dispatches `element-property-changed`
6. **DirectRenderer**: Updates element style object
7. **Re-render**: Element reflects new style

### Event Chain
```javascript
// 1. Editors Component
onPropertyChange('backgroundColor', 'red')

// 2. ui-action event
{ type: 'updateProperty', property: 'backgroundColor', target: 'red' }

// 3. App.tsx converts to
'element-property-changed' → { property: 'backgroundColor', value: 'red' }

// 4. DirectRenderer updates
element.style.backgroundColor = 'red'
```

## 5. Styling Architecture

### Hardcoded Base Styles
```javascript
const editorsStyles = `
  .editors {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: hsl(0, 0%, 15%);
    // ... more styles
  }
`;
```

### Preset Overrides
```javascript
// Combines hardcoded + preset classes
className={`editors-header ${getClassName('editors-header')}`}

// getClassName returns preset mapping or original
presetClassMap['editors-header'] || 'editors-header'
```

### UI Theme Presets
Location: `/public/data/themes/ui-theme.json`
```json
"editors-components": {
  "editors": { /* grid styles */ },
  "editors-header": { /* header styles */ },
  "editors-input": { /* input styles */ }
  // ... 15+ component presets
}
```

## 6. Dynamic Category System

### Loading Variables
```javascript
// Load ONE theme
let oneTheme = runtimeThemeProcessor.getTheme('one');
if (!oneTheme) {
  await runtimeThemeProcessor.applyTheme('one');
  oneTheme = runtimeThemeProcessor.getTheme('one');
}

// Categorize variables
const categorized = Object.entries(variables).reduce((acc, [key, config]) => {
  const category = config.category || 'misc';
  if (!acc[category]) acc[category] = [];
  acc[category].push({ key, ...config });
  return acc;
}, {});
```

### Accordion Generation
```javascript
const sections = Object.entries(categorizedVariables).map(([category, variables]) => ({
  id: category,
  title: category.charAt(0).toUpperCase() + category.slice(1),
  icon: categoryIcons[category] || '📦',
  variables
}));
```

### Category Icons
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

## 7. DirectRenderer Integration

### Property Handling
Location: `/src/components/DirectRenderer.tsx` (handlePropertyChange)

```javascript
// Non-style properties list
const nonStyleProperties = ['preset', 'presetType', 'name', 'type', 'id', 'content', 'children', 'appliedPresets'];

if (nonStyleProperties.includes(property)) {
  updatedElement[property] = value;
} else {
  // All other properties are CSS
  updatedElement.style = {
    ...updatedElement.style,
    [property]: value
  };
}
```

### Style Application
- Properties go directly to element.style object
- No CSS variable conversion (direct values)
- Supports any valid CSS property

## 8. Selected Element Flow

### Selection Source
1. **User Clicks**: Element in DirectRenderer
2. **Event**: `element-selected` dispatched
3. **App State**: Updates selectedElementData
4. **Props Flow**: Through JTR to Editors

### Element Data Structure
```javascript
{
  id: "element-123",
  type: "one",
  name: "my-element",
  style: {
    backgroundColor: "red",
    width: "200px",
    // ... other CSS properties
  },
  content: { text: "Hello" },
  appliedPresets: ["wrapper"]
}
```

## 9. Troubleshooting

### Variables Not Loading
1. Check ONE theme is loaded: `runtimeThemeProcessor.getTheme('one')`
2. Verify variables have category property
3. Check console for theme loading errors

### Input Focus Lost
1. Ensure using local state in SimpleControl
2. Check for component key changes
3. Verify no parent re-renders

### Changes Not Applying
1. Check event listeners in App.tsx
2. Verify DirectRenderer receives events
3. Check property is not in nonStyleProperties list
4. Ensure element is selected

### Accordion Not Expanding
1. Check expandedSections state
2. Verify toggleSection is called
3. Check section.id matches state key

## 10. File Reference

### Core Files
- `/src/components/Editors.tsx` - Main editors component
- `/public/data/themes/one-theme.json` - Variable definitions
- `/public/data/themes/ui-theme.json` - UI styling & placement
- `/src/components/JSONtoREACT.tsx` - Props injection
- `/src/components/DirectRenderer.tsx` - Property handling
- `/src/theme/runtimeThemeProcessor.ts` - Theme loading

### Legacy Reference
- `/src/legacy/EditorControls.tsx` - Original implementation

### Data Flow
1. ONE Theme → Variable definitions
2. Editors Component → Display UI
3. User Input → Local state
4. Commit → Event dispatch
5. DirectRenderer → Element update
6. Style object → Visual change