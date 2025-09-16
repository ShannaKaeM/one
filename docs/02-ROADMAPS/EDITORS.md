# Editors

## Overview
**Purpose**: Property editing UI for selected canvas elements using ONE theme variables
**Location**: `/src/components/EDITORS/`
**Size**: ~296 lines total
**Type**: Organism

---

## Component Dependencies

### Sub-components Used
- **Sidebar**: Container wrapper (generic grid area)
- **Header**: Section title display
- **Accordion**: Collapsible category containers
- **InputBar**: Label + input fields for each property

### Used By Components
- **App**: Placed in editors grid area via theme structure

---

## State Management

### Local State (Component Internal)
- `expandedSections`: Which accordions are open (UI only)
- `localInputValue`: Temporary input value for focus fix

### ONEstore Integration
**Actor**: Designer
- `selectedElement`: Currently selected element ID (single)

**Actor**: Projects  
- `canvasElements[id].style`: Element styles being edited

**Actions**:
- `updateElementStyle(elementId, property, value)`: Updates element CSS

---

## System Integration

### ONEconnect
- **Registration Name**: Dynamic (not hardcoded!)
- **Data Source**: `ONEstore.designer.selectedElement`
- **Data Subscriptions**: `ONEstore.projects.canvasElements`
- **Wrapper Type**: GenericWrapper (merge logic needed)

### Theme Processor
- **UI Theme**: Component structure, children, preset targets
- **ONE Theme**: 100+ CSS variables with categories

### Presets
- `sidebar`: Container grid styles
- `header`: Title styling
- `accordion`: Collapsible section styles
- `input-bar`: Input field styles

### Icons
- **Used**: Category icons (📐, 📏, ↔️, 🎨, ✏️, ✨, 🔲, 📍, ▦, ⬅➡, ⚙️, 🎬, 📦)
- **Source**: `utils/icons.tsx`

### TypeScript
```typescript
interface EditorVariable {
  key: string;
  defaultValue: any;
  type: string;
  category: string;
  description: string;
  cssProperty: string;
}
```

### Utils
- **runtimeThemeProcessor**: Loads ONE theme variables
- **icons.tsx**: Category icon mappings

---

## Data Flow

### Inputs
- **From Store**: Selected element ID, element styles
- **From Props**: presetClassMap for styling
- **From Theme**: CSS variable definitions, categories

### Outputs  
- **To Store**: Style property updates via updateElementStyle
- **Events**: none

---

## Implementation Notes
- Wrapper generates extra div - need to merge wrapper logic
- Local input state prevents re-renders during typing
- Categories dynamically generated from ONE theme
- No autocomplete (will add advanced version later)

---

## Questions
1. [ ] How to implement dynamic wrapper naming in ONEconnect?
2. [ ] Should wrapper logic be merged into component?
3. [ ] Best approach for specialized input types later?