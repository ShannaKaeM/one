# Loop - Universal Component Pattern

## 🚀 The Vision

**ONE component to rule them all**: Instead of building LayoutSwitcher, CanvasControls, ToolPalette, FilterSelector, etc. as separate components, we have:

- **Loop** = Universal container that iterates ANY data
- **LoopItem** = Universal template for each item
- **Theme Config** = Defines what data to show and how
- **Icon Generators** = Auto-create icons based on data

## 🎯 The Pattern

```json
{
  "layout-switcher": {
    "data-component": "loop",
    "data-source": "presetStore.availablePresets.layouts",
    "data-subscriptions": ["uiStore.layout"],
    "data-actions": {
      "onItemClick": "uiStore.setLayout"
    },
    "props": {
      "iconGenerator": "layoutIcon",
      "activeKey": "layout",
      "itemComponent": "loop-item"
    }
  }
}
```

**Result**: A layout switcher in 10 lines of JSON instead of 156 lines of React!

## 💡 Key Innovations

### 1. Complete Data Abstraction
- Same Loop component for ANY data type
- No purpose-specific components needed
- Data source determines behavior

### 2. Dynamic Icon Generation
```typescript
// Auto-generate icons based on data structure
layoutIcon(layout) → "▦" // 2 column layout
toolIcon(tool) → "✏️" // Drawing tool
layerIcon(layer) → "T" // Text layer
```

### 3. Universal Active State
- Works with any store/state
- Multiple active states possible
- Subscription-based updates

### 4. Theme-Driven Everything
- Components defined in JSON
- Presets control appearance
- Actions from string paths

## 🔨 Implementation Plan

### Phase 1: Core Components
```typescript
// Loop.tsx - The universal container
interface LoopProps {
  data?: any; // From data-source
  subscriptions?: Record<string, any>; // From data-subscriptions
  iconGenerator?: string; // Function name to generate icons
  activeKey?: string; // Which subscription key is active state
  itemComponent?: string; // Component to render items
  onItemClick?: (item: any) => void; // From data-actions
}

// LoopItem.tsx - The universal item template
interface LoopItemProps {
  icon: string | ReactNode;
  label?: string;
  active?: boolean;
  onClick?: () => void;
  [key: string]: any; // Accept any props from theme
}
```

### Phase 2: Icon Generators
```typescript
// iconGenerators.ts
export const iconGenerators = {
  layoutIcon: (layout: any) => {
    // Generate grid-based icons
    const cols = layout.columns || 1;
    if (cols === 1) return '▭';
    if (cols === 2) return '▦';
    if (cols === 3) return '⬚';
    return '▦';
  },
  
  toolIcon: (tool: string) => {
    const icons = {
      select: '↖',
      move: '✥',
      text: 'T',
      image: '□',
      one: '1'
    };
    return icons[tool] || '?';
  }
};
```

### Phase 3: Test Layouts
```json
// Test with different grid layouts
{
  "test-layouts": {
    "single": { "columns": 1, "rows": 1 },
    "two-column": { "columns": 2, "rows": 1 },
    "dashboard": { "columns": 3, "rows": 3 },
    "sidebar": { "columns": "250px 1fr", "rows": 1 }
  }
}
```

## 📊 Code Reduction

**Current (OOPS)**:
- LayoutSwitcher: 156 lines
- CanvasControls: 194 lines  
- ToolPalette: ~150 lines
- FilterSelector: ~120 lines
- **Total**: ~620 lines

**With Loop Pattern**:
- Loop: ~80 lines
- LoopItem: ~30 lines
- iconGenerators: ~50 lines
- **Total**: ~160 lines (74% reduction!)

## 🧪 Test Strategy

1. **Create simple grid test**:
   - 4 layout options (single, two-col, three-col, dashboard)
   - Click to switch layouts
   - Active state highlighting
   - Icon generation from grid structure

2. **Verify with ONEconnect**:
   - Theme defines the loop
   - Store connections work
   - Actions fire correctly
   - Grid areas assigned

3. **Expand to other uses**:
   - Tool selection
   - Canvas controls
   - Any list of options

## 🎨 Theme Configuration Examples

### Layout Switcher
```json
{
  "layout-switcher": {
    "data-component": "loop",
    "data-source": "presetStore.layouts",
    "grid-area": "b",
    "className": "horizontal-loop"
  }
}
```

### Tool Palette
```json
{
  "tools": {
    "data-component": "loop",
    "data-source": "designerStore.availableTools",
    "data-subscriptions": ["designerStore.currentTool"],
    "props": {
      "activeKey": "currentTool",
      "orientation": "vertical"
    }
  }
}
```

### Canvas Controls
```json
{
  "canvas-controls": {
    "data-component": "loop",
    "data-source": "workspaceStore.canvasOptions",
    "props": {
      "showLabels": true,
      "compact": true
    }
  }
}
```

## 🚀 Why This Changes Everything

1. **Developer Experience**: Define UI in JSON, not React components
2. **Flexibility**: Any data source becomes a UI component
3. **Consistency**: All lists/options work the same way
4. **Maintenance**: Change behavior by editing theme, not code
5. **Scalability**: Add new UI without new components

## 📝 Next Steps

1. Build minimal Loop component
2. Build minimal LoopItem component  
3. Create iconGenerators utility
4. Test with layout switcher
5. Document the pattern
6. Apply to all list-based UI

---

**This is the future of UI components - data-driven, theme-configured, universally reusable!**