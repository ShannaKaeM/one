# Editors Component Roadmap

## ✅ COMPLETED IMPLEMENTATION:
1. **Component Created**: `Editors.tsx` implemented with theme-based categories
2. **Legacy Moved**: Old Editors.tsx moved to `/src/legacy/EditorControls.tsx`
3. **NO ColorPopup**: Successfully avoided - using simple text inputs
4. **Styling Complete**: Following LayerTree/Library patterns with hardcoded styles + preset overrides
5. **Theme Integration**: Loading variables from ONE theme, styled by UI theme
6. **Connected to App**: Props passed through JSONtoREACT special handling
7. **DirectRenderer Updated**: Now accepts any CSS property (not just whitelisted ones)

## 🚨 CRITICAL BUG TO FIX:
### Input Field Only Accepts One Character at a Time
- **Issue**: When typing in editor inputs, only one character can be entered at a time
- **Cause**: React re-rendering issue with controlled inputs
- **Solution**: This was previously solved in the project - check documentation
- **Priority**: HIGH - Makes the editors unusable

## CURRENT IMPLEMENTATION DETAILS:

## How It Currently Works:
1. **Theme Loading**: 
   ```typescript
   // Loads ONE theme variables on mount
   const oneTheme = runtimeThemeProcessor.getTheme('one');
   // If not loaded, calls: await runtimeThemeProcessor.applyTheme('one');
   ```

2. **Variable Categorization**:
   - Variables grouped by their `category` property (colors, typography, spacing, etc.)
   - Creates accordion sections dynamically based on categories found

3. **Connection Flow**:
   ```
   JSONtoREACT → passes selectedElementData & onPropertyChange → Editors
   Editors → dispatches 'ui-action' with type 'updateProperty' → App.tsx
   App.tsx → dispatches 'element-property-changed' → DirectRenderer
   DirectRenderer → updates element style object → Re-renders element
   ```

4. **Styling Architecture**:
   - Hardcoded styles in `editorsStyles` constant (like LayerTree)
   - Classes use both hardcoded names AND preset overrides
   - Example: `className="editors-header ${getClassName('editors-header')}"`

## Next Steps to Fix Input Issue:

## Phase 1: Theme Integration & Dynamic Categories

### 1.1 Load Theme Categories
Modify component to:
```typescript
// Load ONE theme to get variable categories
const oneTheme = runtimeThemeProcessor.getTheme('one');
const variableCategories = oneTheme?.variables || {};

// Group variables by category
const categorizedVariables = Object.entries(variableCategories).reduce((acc, [key, config]) => {
  const category = config.category || 'misc';
  if (!acc[category]) acc[category] = [];
  acc[category].push({ key, ...config });
  return acc;
}, {});
```

### 1.2 Dynamic Section Generation
Instead of hardcoded sections, generate from theme:
```typescript
// Generate sections from theme categories
const sections = Object.entries(categorizedVariables).map(([category, variables]) => ({
  id: category,
  title: category.charAt(0).toUpperCase() + category.slice(1),
  icon: getCategoryIcon(category),
  variables: variables
}));
```

### 1.3 Category Icons Map
```typescript
const categoryIcons = {
  layout: '📐',
  sizing: '📏',
  spacing: '↔️',
  colors: '🎨',
  typography: '✏️',
  effects: '✨',
  borders: '🔲',
  transform: '🔄',
  misc: '⚙️'
};
```

## Phase 2: Update Component Structure

### 2.1 Component Props
```typescript
interface EditorControlsProps {
  // ... existing props
  className?: string;
  presetClassMap?: Record<string, string>;
}
```

### 2.2 Main Component Structure
```jsx
<div className={`editorcontrols ${className || ''}`}>
  <div className={getClassName('editorcontrols-header')}>
    <h3 className={getClassName('editorcontrols-title')}>Properties</h3>
    <button className={getClassName('editorcontrols-reset')}>
      Reset All
    </button>
  </div>
  
  <div className={getClassName('editorcontrols-content')}>
    {sections.map(section => (
      <div key={section.id} className={getClassName('editorcontrols-section')}>
        <div 
          className={getClassName('editorcontrols-section-header')}
          onClick={() => toggleSection(section.id)}
        >
          <div className={getClassName('editorcontrols-section-title')}>
            <span className={getClassName('editorcontrols-section-icon')}>
              {section.icon}
            </span>
            <span className={getClassName('editorcontrols-section-label')}>
              {section.title}
            </span>
          </div>
          <span className={getClassName('editorcontrols-toggle-icon')}>
            {expandedSections[section.id] ? '▼' : '▶'}
          </span>
        </div>
        
        {expandedSections[section.id] && (
          <div className={getClassName('editorcontrols-section-content')}>
            {section.variables.map(variable => (
              <EditorControl 
                key={variable.key}
                variable={variable}
                value={getCurrentValue(variable.key)}
                onChange={(value) => handleChange(variable.key, value)}
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</div>
```

## Phase 3: CSS Grid Conversion

### 3.1 Required CSS Classes (NO FLEXBOX)
```css
.editorcontrols {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  background-color: hsl(0, 0%, 15%);
  color: hsl(0, 0%, 90%);
  overflow: hidden;
}

.editorcontrols-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid hsl(0, 0%, 25%);
}

.editorcontrols-content {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(min-content, max-content));
  overflow-y: auto;
  overflow-x: hidden;
}

.editorcontrols-section {
  display: grid;
  grid-template-rows: auto auto;
  border-bottom: 1px solid hsl(0, 0%, 20%);
}

.editorcontrols-section-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.editorcontrols-section-title {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
}

.editorcontrols-section-content {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(min-content, max-content));
  padding: 0 1rem 1rem 1rem;
  gap: 0.75rem;
}

.editor-control {
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 1fr;
  align-items: center;
  gap: 0.5rem;
}
```

## Phase 4: Create editors-components Preset Category

### 4.1 Add to ui-theme.json (Follow LayerTree/Library styling patterns)
```json
"editors-components": {
  "editors": {
    "display": "grid",
    "grid-template-rows": "auto 1fr",
    "width": "100%",
    "height": "100%",
    "background-color": "hsl(0, 0%, 15%)",
    "color": "hsl(0, 0%, 90%)"
  },
  "editorcontrols-header": {
    "display": "grid",
    "grid-template-columns": "1fr auto",
    "align-items": "center",
    "padding": "1rem",
    "border-bottom": "1px solid hsl(0, 0%, 25%)"
  },
  "editorcontrols-title": {
    "font-size": "1rem",
    "font-weight": "500"
  },
  "editorcontrols-reset": {
    "padding": "0.25rem 0.75rem",
    "background": "hsla(0, 0%, 20%, 1)",
    "border": "1px solid hsla(0, 0%, 30%, 1)",
    "border-radius": "4px",
    "color": "hsl(0, 0%, 80%)",
    "cursor": "pointer",
    "transition": "all 0.2s"
  },
  "editorcontrols-content": {
    "display": "grid",
    "overflow-y": "auto",
    "overflow-x": "hidden"
  },
  "editorcontrols-section": {
    "display": "grid",
    "border-bottom": "1px solid hsl(0, 0%, 20%)"
  },
  "editorcontrols-section-header": {
    "display": "grid",
    "grid-template-columns": "1fr auto",
    "padding": "0.75rem 1rem",
    "cursor": "pointer",
    "transition": "background-color 0.2s"
  },
  "editorcontrols-section-header:hover": {
    "background-color": "hsla(0, 0%, 100%, 0.05)"
  },
  "editorcontrols-section-title": {
    "display": "grid",
    "grid-template-columns": "auto 1fr",
    "align-items": "center",
    "gap": "0.5rem"
  }
  // ... continue for all classes
}
```

## Phase 5: Integration Steps

### 5.1 Register Component in App.tsx
```typescript
const dataComponents = {
  'direct-renderer': DirectRenderer,
  'library': Library,
  'layertree': LayerTree,
  'editorcontrols': EditorControls  // Add this
};
```

### 5.2 Add to structures in ui-theme.json
```json
"editors": {
  "type": "one",
  "data-label": "editors",
  "layouts": "full-height",
  "looks": "neutral-dark",
  "data-component": "editorcontrols",
  "data-preset-targets": [
    ":",
    "editorcontrols-header:editorcontrols-header",
    "editorcontrols-content:editorcontrols-content",
    "editorcontrols-section:editorcontrols-section"
  ]
}
```

### 5.3 Update Dashboard Layouts
Ensure editors is included in children arrays where needed:
```json
"db-full": {
  // ...
  "children": ["layertree", "canvas-controls", "canvas", "library", "editors"]
}
```

## Phase 6: Control Types

### 6.1 Simple Input Control (KEEP IT SIMPLE)
For now, use simple text inputs for ALL variable types:
```typescript
const SimpleControl = ({ label, value, onChange, type = 'text' }) => (
  <div className={getClassName('editors-control')}>
    <label className={getClassName('editors-label')}>{label}</label>
    <input 
      type="text" 
      className={getClassName('editors-input')}
      value={value || ''} 
      onChange={e => onChange(e.target.value)}
      placeholder={`Enter ${type} value`}
    />
  </div>
);
```

### 6.2 Control Type Mapping
```typescript
const getControlForType = (variable) => {
  switch(variable.type) {
    case 'color': return ColorControl;
    case 'number': return variable.control === 'slider' ? SliderControl : NumberInput;
    case 'select': return SelectControl;
    case 'text': return TextInput;
    default: return TextInput;
  }
};
```

## Phase 7: Testing Checklist

- [ ] Component loads theme categories dynamically
- [ ] Accordion sections match theme variable categories
- [ ] All styles converted to CSS Grid
- [ ] Preset overrides work correctly
- [ ] Component fills editors grid area
- [ ] Accordion expand/collapse works
- [ ] Controls update element properties
- [ ] No flexbox remaining in styles
- [ ] Color picker integration works

## Phase 8: Additional Features

### 8.1 Search/Filter
Add search functionality to filter variables:
```jsx
<input 
  type="text"
  className={getClassName('editorcontrols-search')}
  placeholder="Search properties..."
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
/>
```

### 8.2 Favorites/Pinned Properties
Allow users to pin frequently used properties to top

### 8.3 Reset Per Category
Add reset buttons for individual categories

## File Locations
- ✅ New Component: `/src/components/Editors.tsx` (COMPLETED)
- ✅ Legacy Component: `/src/legacy/EditorControls.tsx` (MOVED)
- ✅ Theme: `/public/data/themes/ui-theme.json` (UPDATED with editors-components)
- ✅ ONE Theme Variables: `/public/data/themes/one-theme.json`
- ✅ DirectRenderer: `/src/components/DirectRenderer.tsx` (UPDATED to accept all CSS properties)
- ✅ JSONtoREACT: `/src/components/JSONtoREACT.tsx` (UPDATED with Editors special handling)

## 🔧 FIX NEEDED: Input Field Issue

### Problem:
The input fields in SimpleControl only accept one character at a time. After typing one character, the input loses focus or the value doesn't update properly.

### Likely Cause:
This is a common React controlled input issue where:
1. The component re-renders after each onChange
2. The input value might be getting reset
3. Focus is being lost due to component re-creation

### Solution Pattern (from previous fix in project):
Look for previous solutions in:
- Legacy EditorControls.tsx (check PropertySliderWithInput component around line 608)
- The legacy version uses local state and useRef to handle this
- May need to implement similar pattern with:
  ```typescript
  const [localValue, setLocalValue] = useState(value);
  // Update local value on change
  // Only dispatch to parent on blur or enter key
  ```

### Quick Test:
To verify this is the issue, temporarily make the input uncontrolled:
```typescript
<input
  type="text"
  defaultValue={getCurrentValue(variable.key)}  // Instead of value
  onChange={(e) => handleChange(variable.key, e.target.value)}
/>
```

## Notes
- ✅ Theme-based category system implemented successfully
- ✅ No ColorPopup - using simple text inputs
- ✅ All theme variables from ONE theme now editable
- ⚠️ Input issue makes the component unusable - fix this first!
- Future: Could add specialized controls for colors, numbers with sliders, etc.