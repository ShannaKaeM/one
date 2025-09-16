# ONEconnect

## Overview
**Purpose**: Unified component orchestration system that connects UI components to data stores automatically
**Location**: `/src/components/one-connect/`
**Size**: ~600 lines total across 7 files
**Type**: System (not a component)

---

## Component Dependencies

### Sub-components Used
- **GenericWrapper**: Creates generic containers when no component exists

### Used By Components
- **App**: Uses ONEconnect as main orchestrator
- **ALL components**: Receive data through ONEconnect

---

## State Management

### Local State (Component Internal)
- none (stateless orchestrator)

### ONEstore Integration
**Actor**: All
- Connects to all stores dynamically based on theme config

**Actions**:
- Calls any store method based on data-actions config

### All Store Integration
- **ONEstore**: Element data and actions
- **UIstore**: UI state and toggles
- **libraryStore**: Library items and filters
- **presetStore**: Layout switching
- **projectStore**: Project management
- **elementStore**: Element creation

---

## System Integration

### ONEconnect (Self)
- **Registration Name**: N/A (system component)
- **Data Source**: Configured per component in theme
- **Data Subscriptions**: Configured per component
- **Wrapper Type**: Creates GenericWrapper when needed

### Theme Processor
- **UI Theme**: Reads entire structure for orchestration
- **ONE Theme**: Passes through to components

### Presets
- Applies presets based on data-preset-targets configuration

### Icons
- **Used**: none directly
- **Source**: N/A

### TypeScript
```typescript
interface ComponentConfig {
  type?: string;
  'data-component'?: string;
  'data-source'?: string;
  'data-subscriptions'?: string[];
  'data-actions'?: Record<string, string>;
  'data-preset-targets'?: string[];
  props?: Record<string, any>;
  children?: string[];
}
```

### Utils
- **layoutBuilder**: Constructs grid layouts
- **dataHydrator**: Loads and transforms data
- **componentLoader**: Dynamic component loading
- **storeConnector**: Zustand subscriptions

---

## Data Flow

### Inputs
- **From Theme**: Component structure and configuration
- **From Stores**: All data based on configuration
- **From Registry**: Component definitions

### Outputs  
- **To Components**: Hydrated props with data
- **To DOM**: Rendered component tree
- **Events**: none (all store-based)

---

## Implementation Notes
- **Generic Wrapper Magic**: Creates containers without components
- **Auto-registration**: Components register on theme name
- **Store subscriptions**: Auto re-render on changes
- **Preset mapping**: Applies styles to wrapper and internals
- **Recursive**: Handles nested component structures
- **Type-safe**: Full TypeScript support
- **Zero events**: Everything through stores

### Key Features:
1. **data-component**: What to render (or generic wrapper)
2. **data-source**: Primary data from stores
3. **data-subscriptions**: Store properties to watch
4. **data-actions**: Map UI events to store methods
5. **data-preset-targets**: Apply presets (`:` for wrapper)
6. **children**: Nested component IDs

### Generic Wrapper Example:
```json
{
  "editors": {
    "data-component": "editors-wrapper",  // No component exists!
    "children": ["header", "accordion"],
    "data-preset-targets": [":sidebar"]   // Styled via preset
  }
}
```
Creates a styled div without writing EditorsWrapper.tsx!

---

## Questions
1. [ ] Dynamic wrapper naming implementation status?
2. [ ] Should wrapper generation be configurable?
3. [ ] Performance impact of many subscriptions?
4. [ ] Add component lazy loading?