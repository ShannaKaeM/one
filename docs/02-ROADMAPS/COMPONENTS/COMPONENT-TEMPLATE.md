# [Component Name]

## Overview
**Purpose**: [What it does]
**Location**: `[File path in OOPS-STORS]`
**Size**: [Line count]
**Type**: [Atom/Molecule/Organism]

---

## Component Dependencies

### Sub-components Used
- **[Component]**: [How it's used]

### Used By Components
- **[Component]**: [Where/how this component is used]

---

## State Management

### Local State (Component Internal)
- `[stateName]`: [Purpose - only if truly local like UI toggles]

### ONEstore Integration
**Actor**: [Designer/Workspace/Projects]
- `[property]`: [Type and purpose]

**Actions**:
- `[actionName]`: [What it updates]

---

## System Integration

### ONEconnect
- **Registration Name**: `[component-name]` (should be dynamic!)
- **Data Source**: `ONEstore.[path]`
- **Data Subscriptions**: `[Other store paths it watches]`
- **Wrapper Type**: [GenericWrapper or none]

### Theme Processor
- **UI Theme**: [What it provides - layout/structure]
- **ONE Theme**: [What it provides - variables/data]

### Presets
- `[preset-name]`: [What it styles]

### Icons
- **Used**: [Icon names or "none"]
- **Source**: `utils/icons.tsx`

### TypeScript
```typescript
// Key interfaces
interface [Name] {
  // ...
}
```

### Utils
- **[Utility]**: [Purpose or "none"]

---

## Data Flow

### Inputs
- **From Store**: [What data comes in]
- **From Props**: [What props it accepts]
- **From Theme**: [Theme data used]

### Outputs  
- **To Store**: [What it updates]
- **Events**: [Should be "none"]

---

## Implementation Notes
- [Key implementation details]
- [Performance considerations]
- [Known issues to fix]

---

## Questions
1. [ ] [Unresolved questions]