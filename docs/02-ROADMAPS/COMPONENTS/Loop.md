# Loop + LoopItem

## Overview
**Purpose**: Dynamic control system for iterating through options (layouts, tools, modes) - replacing CanvasControls and LayoutSwitcher
**Location**: `/src/components/` (transitioning)
**Size**: CanvasControls (194 lines) + LayoutSwitcher (156 lines) = ~350 lines combined
**Type**: Molecule (Loop container + LoopItem atoms)

---

## Component Dependencies

### Sub-components Used
- **LoopItem**: Individual option/control in the loop
- **Icons**: Grid, Snap, Layout icons (SVG + emoji)

### Used By Components
- **App**: Placed in control areas via theme

---

## State Management

### Local State (Component Internal)
- `currentIndex`: Active item in loop (for keyboard nav)
- `isExpanded`: Whether loop shows all items

### ONEstore Integration
**Actor**: Workspace
- `activeLayout`: Current layout selection
- `gridVisible`: Grid display toggle
- `snapEnabled`: Snap to grid toggle

**Actions**:
- `setLayout`: Change active layout
- `toggleGrid`: Show/hide grid
- `toggleSnap`: Enable/disable snapping

### elementStore Integration
- `createElement`: Add new elements to canvas

### presetStore Integration
- `switchLayout`: Apply layout presets

---

## System Integration

### ONEconnect
- **Registration Name**: Dynamic
- **Data Source**: `UIstore.activeLayout, gridVisible, snapEnabled`
- **Data Subscriptions**: Theme layout changes
- **Wrapper Type**: None needed

### Theme Processor
- **UI Theme**: Discovers available layouts dynamically
- **ONE Theme**: none

### Presets
- `loop`: Container styles
- `loop-item`: Individual item styles
- `loop-active`: Active state
- `loop-expanded`: Expanded view

### Icons
- **Used**: Grid, Snap, Layout icons, Element creation (+, T, M)
- **Source**: `utils/icons.tsx` + inline emojis

### TypeScript
```typescript
interface LoopProps {
  items: LoopItem[];
  type: 'layouts' | 'tools' | 'modes';
  displayMode?: 'icons' | 'text' | 'both';
  expandable?: boolean;
}

interface LoopItem {
  id: string;
  icon: string | ReactNode;
  label: string;
  action: () => void;
  active?: boolean;
  disabled?: boolean;
}
```

### Utils
- **generateLayoutIcon**: Creates icons from grid structure
- **runtimeThemeProcessor**: Gets available layouts

---

## Data Flow

### Inputs
- **From Store**: Active states (layout, grid, snap)
- **From Theme**: Available options dynamically
- **From Props**: Display mode, type

### Outputs  
- **To Store**: State changes via actions
- **Events**: none

---

## Implementation Notes

### Groundbreaking Innovation
- **Universal Loop Pattern**: Any set of options can be a loop
- **Dynamic Discovery**: Options come from theme, not hardcoded
- **Unified Control**: Layouts, tools, modes all use same component
- **Keyboard Navigation**: Arrow keys cycle through loop
- **Smart Grouping**: Related controls in same loop

### Current Components Being Merged:
1. **CanvasControls** → Loop type="tools"
   - Element creation buttons
   - Grid toggle
   - Snap toggle

2. **LayoutSwitcher** → Loop type="layouts"
   - Dynamic layout discovery
   - Icon generation from grid
   - Label creation from ID

### Loop Behavior:
- Click to activate/toggle
- Hover to preview (layouts)
- Keyboard arrows to navigate
- Space/Enter to select
- Expandable for more options

---

## Questions
1. [ ] How to handle nested loops (sub-options)?
2. [ ] Animation between loop states?
3. [ ] Touch/swipe support?
4. [ ] Circular vs linear navigation?
5. [ ] Visual indicator for loop position?