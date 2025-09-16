# App.tsx

## Overview
**Purpose**: Root component that initializes the application and orchestrates ONEconnect
**Location**: `/src/App.tsx`
**Size**: 105 lines (reduced from 548!)
**Type**: Root Component

---

## Component Dependencies

### Sub-components Used
- **ONEconnect**: Main orchestrator for all components
- All components registered in dataComponentsMap

### Used By Components
- **index.tsx**: Root render

---

## State Management

### Local State (Component Internal)
- none (completely stateless!)

### ONEstore Integration
- Passes store reference to ONEconnect

### UIstore Integration
- `layout`: Current active layout
- `setLayout`: Update layout
- `setComponentAssignments`: Track component grid areas

### appStore Integration
- `themeLoaded`: Whether UI theme is loaded
- `setThemeLoaded`: Update load state

### presetStore Integration
- `setAvailablePresets`: Initialize available presets

---

## System Integration

### ONEconnect
- Provides theme structure
- Provides store references
- Provides component map

### Theme Processor
- **UI Theme**: Loads and applies UI theme
- **ONE Theme**: none directly

### Presets
- none directly (passes to ONEconnect)

### Icons
- **Used**: none
- **Source**: N/A

### TypeScript
```typescript
// Clean functional component with no complex types
```

### Utils
- **runtimeThemeProcessor**: Loads themes
- **registerAllComponents**: Component registration
- **processThemeStructure**: Theme processing

---

## Data Flow

### Inputs
- none (root component)

### Outputs  
- **To ONEconnect**: Theme, stores, components
- **Events**: none (zero event listeners!)

---

## Implementation Notes
- **Massive reduction**: 548 → 105 lines (81% reduction!)
- **Zero local state**: Everything in stores
- **Zero event listeners**: Direct store communication
- **Clean initialization**: Just loads theme and starts ONEconnect
- **No prop drilling**: ONEconnect handles everything
- **No appState object**: Removed completely
- **No event handlers**: All migrated to stores

### Initialization Flow:
1. Register all components
2. Load UI theme
3. Set initial layout from theme
4. Initialize preset store
5. Process theme structure
6. Render ONEconnect

### Key Achievement:
- Was: State management hub with 20+ event listeners
- Now: Clean initialization component
- All state management in Zustand stores
- All event handling through direct store calls

---

## Questions
1. [x] All event listeners removed? Yes!
2. [x] All state in stores? Yes!
3. [x] Under 100 lines? Close! (105)
4. [ ] Can we remove console.logs? (would save 3 lines)