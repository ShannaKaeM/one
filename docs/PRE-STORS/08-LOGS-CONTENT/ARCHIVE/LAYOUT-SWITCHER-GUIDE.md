# Layout Switcher Component Guide

## 🎯 Overview

The LayoutSwitcher is a dynamic, theme-aware component that automatically discovers and switches between available layouts without any hardcoding. It's a foundational feature that enables users to change their workspace arrangement on the fly.

**Key Features:**
- ✅ Dynamic layout discovery from theme
- ✅ No hardcoded layout names or IDs
- ✅ Automatic icon generation based on grid structure
- ✅ Works with any theme (ui, one, or custom)
- ✅ Supports icons, labels, or both display modes
- ✅ Fully styleable through CSS presets

---

## 🏗️ Architecture Overview

### Component Flow
```
ui-theme.json                    LayoutSwitcher.tsx              App.tsx
     │                                  │                           │
     ├─ defines layouts ───────────────>│                           │
     │  (dashboard, etc)                │                           │
     │                                  ├─ discovers layouts         │
     │                                  ├─ generates icons          │
     │                                  ├─ renders buttons          │
     │                                  │                           │
     │                                  ├─ user clicks button       │
     │                                  ├─ dispatches 'set-layout' ─>│
     │                                  │                           │
     └<─────────────────────────────────────────────────────────────┤
         updates root layout                                        │
                                                                   └─ handles event
                                                                     - updates activeLayout
                                                                     - updates theme structure
                                                                     - triggers re-render
```

### File Structure
```
src/
├── components/
│   └── LayoutSwitcher.tsx      # The component itself
├── utils/
│   └── registerComponents.ts   # Component registration
└── App.tsx                     # Event handling & state management

public/data/themes/
└── ui-theme.json              # Layout definitions & structure
```

---

## 📋 Implementation Details

### 1. Component Definition (`LayoutSwitcher.tsx`)

```typescript
interface LayoutSwitcherProps {
  theme?: string;                    // Which theme to read layouts from
  activeLayout?: string;             // Currently active layout
  onLayoutChange?: (layout: string) => void;
  displayMode?: 'icons' | 'labels' | 'both';
  availableLayouts?: string[];       // Optional: restrict to specific layouts
  className?: string;
  presetClassMap?: Record<string, string>;
}
```

**Key Methods:**

1. **Layout Discovery**
   ```typescript
   // Reads from theme presets
   const themeConfig = runtimeThemeProcessor.getTheme(theme);
   const layouts = themeConfig.presets.layouts;
   ```

2. **Icon Generation**
   ```typescript
   // Analyzes grid structure to create visual icon
   const columns = config['grid-template-columns']?.split(' ').length;
   const rows = config['grid-template-rows']?.split(' ').length;
   const icon = generateLayoutIcon(columns, rows, config.children);
   ```

3. **Event Dispatching**
   ```typescript
   window.dispatchEvent(new CustomEvent('set-layout', {
     detail: { layout: layoutId }
   }));
   ```

### 2. Component Registration (`registerComponents.ts`)

```javascript
componentRegistry.register('layout-switcher', {
  mapProps: (element, appState) => ({
    theme: element.props?.theme || 'ui',
    activeLayout: appState?.activeLayout,
    onLayoutChange: (layout: string) => {
      window.dispatchEvent(new CustomEvent('set-layout', {
        detail: { layout }
      }));
    },
    displayMode: element.props?.displayMode || 'icons',
    availableLayouts: element.props?.availableLayouts
  }),
  supportedTargets: ['container', 'button'],
  defaultProps: {
    theme: 'ui',
    displayMode: 'icons'
  }
});
```

### 3. Theme Structure (`ui-theme.json`)

```json
{
  "structure": {
    "root": {
      "type": "ui",
      "data-label": "dashboard",
      "layouts": "dashboard"  // Active layout
    },
    "layout-switcher": {
      "type": "ui",
      "data-label": "layout-switcher",
      "data-component": "layout-switcher",
      "data-preset-targets": [
        ":layout-switcher-container"
      ],
      "props": {
        "displayMode": "icons"
      }
    }
  },
  "presets": {
    "layouts": {
      "dashboard": {
        "display": "grid",
        "grid-template-columns": "250px 1fr 1fr 350px",
        "grid-template-rows": "60px 1fr 500px",
        "grid-template-areas": "'a b e f' 'a c c f' 'a d d f'",
        "children": ["layertree", "layout-switcher", "canvas", "library", "canvas-controls", "editors"]
      },
      "dashboard-library-canvas": {
        "display": "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-template-rows": "60px 1fr",
        "grid-template-areas": "'a c' 'b d'",
        "children": ["layout-switcher", "library", "canvas-controls", "canvas"]
      }
      // ... more layouts
    }
  }
}
```

### 4. Event Handling (`App.tsx`)

```javascript
// Listen for layout changes
const handleSetLayout = (event: CustomEvent) => {
  const { layout } = event.detail;
  
  // Update app state
  setAppState(prev => ({ ...prev, activeLayout: layout }));
  
  // Update theme structure
  const currentTheme = runtimeThemeProcessor.getTheme('ui');
  if (currentTheme && currentTheme.structure && currentTheme.structure.root) {
    currentTheme.structure.root.layouts = layout;
    
    // Process new structure (reassign grid areas)
    processThemeStructure('ui');
    
    // Force re-render
    setThemeLoaded(false);
    setTimeout(() => setThemeLoaded(true), 20);
  }
};

window.addEventListener('set-layout', handleSetLayout);
```

---

## 🎨 Styling with Presets

The layout-switcher-container preset defines the container styling:

```json
"layout-switcher-container": {
  "display": "grid",
  "grid-template-columns": "auto 1fr",  // First col for switcher, second for future controls
  "gap": "1rem",
  "width": "100%",
  "height": "100%",
  "align-items": "center",
  "justify-content": "start",
  "padding": "0 1rem"
}
```

---

## 🔧 How It All Connects

### Example: Dashboard Layout

1. **User clicks "Dashboard Library Canvas" button**

2. **LayoutSwitcher dispatches event:**
   ```javascript
   window.dispatchEvent(new CustomEvent('set-layout', {
     detail: { layout: 'dashboard-library-canvas' }
   }));
   ```

3. **App.tsx handles the event:**
   - Updates `appState.activeLayout` to 'dashboard-library-canvas'
   - Updates theme root: `structure.root.layouts = 'dashboard-library-canvas'`
   - Calls `processThemeStructure()` to reassign grid areas

4. **processThemeStructure() reads new layout:**
   ```javascript
   const activeLayoutData = themeConfig.presets.layouts['dashboard-library-canvas'];
   // children: ["layout-switcher", "library", "canvas-controls", "canvas"]
   // Assigns grid areas: a, b, c, d
   ```

5. **JSONtoREACT re-renders with new structure:**
   - layout-switcher gets grid-area: a
   - library gets grid-area: b
   - canvas-controls gets grid-area: c
   - canvas gets grid-area: d

6. **CSS Grid places components:**
   ```css
   grid-template-areas: 'a c' 'b d';
   ```

---

## 🚀 Usage Examples

### Basic Usage (Icons Only)
```json
{
  "type": "ui",
  "data-component": "layout-switcher",
  "props": {
    "displayMode": "icons"
  }
}
```

### With Labels
```json
{
  "type": "ui",
  "data-component": "layout-switcher",
  "props": {
    "displayMode": "labels"
  }
}
```

### Restricted Layouts
```json
{
  "type": "ui",
  "data-component": "layout-switcher",
  "props": {
    "displayMode": "both",
    "availableLayouts": ["dashboard", "dashboard-canvas"]
  }
}
```

### Custom Theme
```json
{
  "type": "ui",
  "data-component": "layout-switcher",
  "props": {
    "theme": "custom-theme",
    "displayMode": "icons"
  }
}
```

---

## 🔄 Adding New Layouts

To add a new layout, simply add it to the theme's presets:

```json
"presets": {
  "layouts": {
    "my-custom-layout": {
      "display": "grid",
      "grid-template-columns": "1fr 2fr 1fr",
      "grid-template-rows": "auto 1fr",
      "grid-template-areas": "'a a a' 'b c d'",
      "children": ["layout-switcher", "custom-panel-1", "canvas", "custom-panel-2"]
    }
  }
}
```

The LayoutSwitcher will automatically:
1. Discover "my-custom-layout"
2. Generate an icon based on 3 columns × 2 rows
3. Create a button labeled "My Custom Layout"
4. Handle switching to it

---

## 🎯 Key Benefits

1. **No Hardcoding** - Works with any layout names
2. **Theme Agnostic** - Works with ui, one, or custom themes
3. **Future Proof** - Add/remove/rename layouts without code changes
4. **Visual Feedback** - Auto-generated icons represent grid structure
5. **Flexible Display** - Icons, labels, or both
6. **Extensible** - Easy to add new features

---

## 🐛 Troubleshooting

### Layouts Not Appearing
- Check that layouts have `children` array
- Verify layout preset has grid properties
- Check console for discovery logs

### Layout Not Switching
- Verify 'set-layout' event listener in App.tsx
- Check that processThemeStructure() is called
- Ensure theme root is being updated

### Icons Not Generating
- Check grid-template-columns/rows parsing
- Verify generateLayoutIcon logic
- Look for console warnings

---

## 🔮 Future Enhancements

1. **Smart Icon Generation**
   - Use AI to generate more meaningful icons
   - Cache generated icons for performance

2. **Layout Categories**
   - Group layouts by type (work, present, minimal)
   - Add dropdown or tabbed interface

3. **Custom Layout Creation**
   - UI for creating new layouts
   - Save custom layouts to theme

4. **Layout Persistence**
   - Remember last used layout
   - Per-project layout preferences

5. **Responsive Layouts**
   - Different layouts for different screen sizes
   - Automatic switching based on viewport

---

## 📝 Quick Reference

**Component**: `src/components/LayoutSwitcher.tsx`
**Registration**: `src/utils/registerComponents.ts`
**Event**: `'set-layout'`
**Handler**: `App.tsx handleSetLayout()`
**Theme Path**: `presets.layouts`
**Structure Key**: `data-component: "layout-switcher"`

**Required Theme Properties per Layout:**
- `display: "grid"`
- `grid-template-columns`
- `grid-template-rows`
- `children: []`

**Optional Properties:**
- `grid-template-areas`
- `width`, `height`
- Any other CSS properties