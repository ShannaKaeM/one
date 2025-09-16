# Data Component Guide

## Overview
The data-component system allows React components to be injected into the JTR (JSONtoREACT) rendering system while maintaining full preset control over their styling.

## Architecture
```
ui-theme.json → JTR → Wrapper Div → React Component
                 ↓         ↓              ↓
            Grid Area   Presets    Internal Classes
```

## 1. How It Works

### Component Registration
Location: `/src/App.tsx` (line ~57)

React components are registered in the dataComponents object:
```javascript
const dataComponents = {
  'direct-renderer': DirectRenderer,
  'library': Library,
  'layertree': LayerTree
};
```

### JSON Definition
Location: `/public/data/themes/ui-theme.json`

```json
"layertree": {
  "type": "one",
  "data-label": "layertree",
  "layouts": "layertree-container",
  "data-component": "layertree",
  "data-preset-targets": [
    ":",
    "header:header",
    "title-group:title-group"
  ]
}
```

### What Gets Created
```html
<div class="one layertree-container">  <!-- JTR wrapper -->
  <div class="layertree">  <!-- React component root -->
    <div class="header header">  <!-- Internal element + preset -->
      <!-- Component content -->
    </div>
  </div>
</div>
```

## 2. Key Properties

### data-component
- **Purpose**: Identifies which React component to inject
- **Value**: String matching a key in dataComponents
- **Example**: `"data-component": "layertree"`

### data-preset-targets
- **Purpose**: Maps presets to component elements
- **Format**: Array of target strings
- **Syntax**: 
  - `":"` - Empty target for component root
  - `":preset-name"` - Applies preset to component root
  - `"class:preset-names"` - Maps internal class to presets

### Examples
```json
"data-preset-targets": [
  ":layertree-root",           // Component root gets "layertree-root"
  "header:header primary",      // .header gets "header primary"
  "button:button-style"         // .button gets "button-style"
]
```

## 3. JTR Processing

### Parsing Phase
Location: `/src/components/JSONtoREACT.tsx` (lines 226-248)

1. JTR encounters element with `data-component`
2. Parses `data-preset-targets` array
3. Separates wrapper targets (`:` prefix) from class mappings
4. Creates wrapper div with grid positioning

### Component Creation
Location: `/src/components/JSONtoREACT.tsx` (lines 250-310)

1. Looks up component in dataComponents
2. Passes props including `presetClassMap`
3. Creates React element inside wrapper

## 4. Component Implementation

### Required Props
```typescript
interface ComponentProps {
  className?: string;              // Wrapper preset classes
  presetClassMap?: Record<string, string>;  // Internal mappings
  // ... other component-specific props
}
```

### Class Helper
```typescript
const getClassName = (baseClass: string) => {
  const presetClass = presetClassMap[baseClass];
  return presetClass ? `${baseClass} ${presetClass}` : baseClass;
};
```

### Usage
```jsx
<div className={getClassName('header')}>
  <div className={getClassName('title-group')}>
    <span className={getClassName('title-text')}>Title</span>
  </div>
</div>
```

## 5. Styling Rules

### Component CSS
- Use CSS Grid exclusively (NO flexbox)
- Base styles in component
- Classes match preset names

### Example Structure
```css
.layertree {
  display: grid;
  grid-template-rows: auto 1fr;
}

.header {
  display: grid;
  grid-template-columns: 1fr auto;
}

.main {
  display: grid;
  grid-template-rows: auto;
}
```

## 6. Preset System

### Layout Presets
Control wrapper positioning:
```json
"layertree-container": {
  "display": "grid",
  "width": "100%",
  "height": "100%"
}
```

### Component Presets
Override internal styles:
```json
"header": {
  "background-color": "hsl(0, 0%, 50%)",
  "padding": "1rem"
}
```

## 7. Grid Area Assignment

### Automatic Assignment
- Components get grid areas based on index
- Area 'a' for first child, 'b' for second, etc.
- Controlled by parent's grid-template-areas

### Skip Conditions
- Absolute positioned components
- Root elements with direct-variables
- Listed in skipGridArea array

## 8. Complete Example

### ui-theme.json
```json
"layertree": {
  "type": "one",
  "data-label": "layertree",
  "layouts": "layertree-container",
  "data-component": "layertree",
  "data-preset-targets": [
    ":",
    "header:header dark",
    "button:button-hover"
  ]
}
```

### Component
```jsx
export function LayerTree({ className, presetClassMap = {} }) {
  const getClassName = (base) => {
    const preset = presetClassMap[base];
    return preset ? `${base} ${preset}` : base;
  };
  
  return (
    <div className={`layertree ${className || ''}`}>
      <div className={getClassName('header')}>
        <!-- Receives "header dark" classes -->
      </div>
    </div>
  );
}
```

### Result
```html
<div class="one layertree-container">
  <div class="layertree">
    <div class="header header dark">
      <!-- Combined styling -->
    </div>
  </div>
</div>
```

## 9. Troubleshooting

### Component Not Rendering
1. Check dataComponents registration in App.tsx
2. Verify component name matches exactly
3. Check console for component not found errors

### Styles Not Applied
1. Verify preset exists in ui-theme.json
2. Check class mapping syntax
3. Ensure getClassName helper is used
4. Confirm preset category is correct

### Grid Issues
1. Verify parent has grid-template-areas
2. Check component gets correct grid area
3. Ensure width/height are set

## 10. File Reference

### Core Files
- `/src/App.tsx` - Component registration
- `/src/components/JSONtoREACT.tsx` - Processing logic
- `/public/data/themes/ui-theme.json` - Configuration

### Key Functions
- `generateElement()` - Creates wrapper and component
- `getClassName()` - Merges preset classes
- `presetClassMap` - Passes mappings to component