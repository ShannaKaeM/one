# Loop & LoopItem Feature Documentation

## Overview
**Purpose**: Universal data-driven UI pattern for creating dynamic, reusable components
**Innovation**: "WordPress Loop" for UI components - any data source, any display format
**Status**: Partially implemented in OOPS-STORS2, ready for ONE implementation
**Key Files**: Toolbar.tsx, Icon.tsx, iconGenerators.ts

---

## The Vision

Creating a universal component system where:
- **Loop** (Toolbar) = Container that iterates over ANY data
- **LoopItem** (Icon) = Template for each item in the loop
- **data-source** = Query for what data to display
- **iconGenerator** = Dynamic content generation
- **activeKey** = Current selection tracking

---

## Core Concepts

### 1. Data-Driven UI
Instead of hardcoded components for specific purposes, we have generic components that adapt based on data:

```json
// Layout Switcher using Loop pattern
"layout-switcher": {
  "type": "ui",
  "data-component": "toolbar",
  "data-source": "presetStore.availablePresets.layouts.dashboard-layouts",
  "data-subscriptions": ["uiStore.layout"],
  "data-actions": {
    "onItemClick": "uiStore.setLayout"
  },
  "props": {
    "iconGenerator": "layoutIcon",
    "activeKey": "layout",
    "itemComponent": "icon"
  }
}
```

### 2. Universal Preset Paths
Access ANY nested preset category dynamically:
- `presetStore.availablePresets.layouts.dashboard-layouts`
- `presetStore.availablePresets.tools.drawing-tools`
- `presetStore.availablePresets.filters.image-filters`

### 3. Icon Generation System
Automatic icon creation based on data type:

```typescript
// From iconGenerators.ts
export function layoutIcon(layout: any): string {
  const cols = layout.columns || 1;
  const rows = layout.rows || 1;
  const children = layout.children || [];
  
  // Smart icon generation based on grid structure
  if (cols === 1 && rows === 2) return '▦';
  if (cols === 1) return '▭';
  if (rows === 1) return '▬';
  if (children.length === 1) return '□';
  if (children.length === 2) return '◫';
  if (cols >= 3 && rows >= 3) return '⊞';
  if (cols >= 3) return '⬚';
  return '▦';
}
```

---

## Implementation Details

### Loop Component (Toolbar)
**Purpose**: Container that renders items from any data source

**Key Features**:
- Processes arrays or objects automatically
- Handles active state through subscriptions
- Applies actions to items
- Completely generic and reusable

```typescript
// Processes any data source
if (data) {
  if (Array.isArray(data)) {
    itemsData = data;
  } else if (typeof data === 'object') {
    // For objects like layouts, tools, etc., use the keys
    itemsData = Object.keys(data);
  }
}

// Generic active state
const activeValue = activeKey ? subscriptionData[activeKey] : undefined;
const isActive = activeValue !== undefined && activeValue === key;
```

### LoopItem Component (Icon)
**Purpose**: Individual item template within the loop

**Key Features**:
- Base element (button or div based on onClick)
- 100% composable with presets
- Static or interactive
- Accepts any props from theme

```jsx
<Icon 
  icon="▦" 
  onClick={handleClick}
  className="ui icon"
  title="Dashboard"
/>
```

### Icon Generators
**Purpose**: Create appropriate icons based on data type

**Available Generators**:
1. `layoutIcon()` - Grid-based icons for layouts
2. `toolIcon()` - Tool-specific icons (select, move, resize)
3. `layerIcon()` - Element type icons (text, image, shape)
4. `numericIcon()` - Number sequence (1, 2, 3...)
5. `letterIcon()` - Letter sequence (A, B, C...)

---

## Use Cases

### 1. Layout Switcher
- **Data**: Available layouts from theme
- **Display**: Grid structure icons
- **Action**: Change active layout
- **Active**: Current layout highlighted

### 2. Tool Palette
- **Data**: Drawing/editing tools
- **Display**: Tool-specific icons
- **Action**: Select active tool
- **Active**: Current tool highlighted

### 3. Filter Selection
- **Data**: Available filters/effects
- **Display**: Filter preview icons
- **Action**: Apply filter
- **Active**: Current filter

### 4. Layer Controls
- **Data**: Element layers
- **Display**: Element type icons
- **Action**: Select/manipulate layer
- **Active**: Selected element

---

## Integration with Other Systems

### ONEconnect Integration
- Generic wrapper creation for "toolbar" components
- Automatic prop passing from theme
- Store subscription handling
- Action binding

### Grid Area Feature
- Loop containers can be placed in any grid area
- Items respect grid constraints
- Dynamic sizing based on container

### Theme System
- All styling via presets
- No hardcoded styles
- Responsive through theme variables
- UI/ONE theme separation maintained

---

## Key Innovations

### 1. Complete Data Abstraction
- Same component for ANY data type
- No purpose-specific components needed
- True reusability

### 2. Dynamic Icon Generation
- Icons created based on data structure
- No manual icon mapping required
- Extensible generator system

### 3. Subscription-Based Active States
- Decoupled from specific functionality
- Works with any store/state
- Multiple active states possible

### 4. Preset Path System
- Access deeply nested presets
- No hardcoded paths
- Theme-driven data sources

---

## Migration from Current Implementation

### Current State (OOPS-STORS)
- LayoutSwitcher: Hardcoded component (156 lines)
- CanvasControls: Separate component (194 lines)
- Icon logic embedded in components

### Future State (ONE)
- Single Loop component for all use cases
- LoopItem template system
- Centralized icon generators
- ~70% code reduction

---

## Implementation Roadmap

### Phase 1: Core Components
- [ ] Create Loop component (based on Toolbar)
- [ ] Create LoopItem component (based on Icon)
- [ ] Port iconGenerators utilities
- [ ] Test with layout switching

### Phase 2: Integration
- [ ] ONEconnect registration
- [ ] Theme preset configuration
- [ ] Store subscriptions setup
- [ ] Action bindings

### Phase 3: Expansion
- [ ] Apply to tool selection
- [ ] Apply to filter UI
- [ ] Apply to layer controls
- [ ] Document patterns

### Phase 4: Enhancement
- [ ] Animation between states
- [ ] Keyboard navigation
- [ ] Touch/gesture support
- [ ] Accessibility features

---

## Known Issues & Solutions

### From OOPS-STORS2 Implementation
1. **Multiple layouts rendering**: Need to ensure only active layout renders
2. **JSON syntax errors**: Validate theme files before use
3. **Icon sizing**: Use relative units (%, em) not fixed (px)

### Solutions Discovered
- Generic wrapper pattern reduces boilerplate
- Store hooks passed correctly by ONEconnect
- Preset targets syntax for styling control

---

## Questions & Decisions

1. **Naming**: Should we use Loop/LoopItem or Toolbar/Icon?
2. **Icon System**: Merge SVG and emoji icons into unified system?
3. **Animation**: How to handle transitions between items?
4. **Nesting**: Support for nested loops (sub-menus)?
5. **Performance**: Virtual scrolling for large datasets?

---

## Code Examples

### Basic Loop Implementation
```typescript
// Theme configuration
{
  "my-loop": {
    "data-component": "loop",
    "data-source": "myStore.items",
    "data-subscriptions": ["myStore.activeItem"],
    "data-actions": {
      "onItemClick": "myStore.setActiveItem"
    },
    "props": {
      "itemComponent": "loop-item",
      "activeKey": "activeItem"
    }
  }
}
```

### Custom Icon Generator
```typescript
export function customIcon(item: any, index: number): string {
  if (item.type === 'special') return '⭐';
  if (item.priority === 'high') return '🔴';
  return '○';
}
```

---

## Summary

The Loop/LoopItem pattern represents a paradigm shift from purpose-specific components to completely data-driven UI. By combining:
- Generic containers (Loop)
- Flexible templates (LoopItem)  
- Dynamic icon generation
- Universal preset paths
- Subscription-based state

We achieve a truly reusable component system that can adapt to any data source and display requirement, reducing code by ~70% while increasing flexibility.

---

*This is the foundation for the future of UI in the ONE project*