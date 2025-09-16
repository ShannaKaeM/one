# Layout Switcher System Documentation

## Overview

The Layout Switcher is a dynamic, theme-driven system that allows users to switch between different grid-based layouts without hardcoding component positions. It works by auto-assigning grid areas (a, b, c, d, etc.) to components based on their order in the layout's children array.

---

## How It Works

### 1. **Layout Definition in Theme**

Layouts are defined as presets in the theme file:

```json
{
  "presets": {
    "layouts": {
      "dashboard": {
        "grid-template-columns": "250px 1fr 1fr 350px",
        "grid-template-rows": "60px 1fr 60px",
        "grid-template-areas": "\"a b e f\" \"a c c f\" \"a d d f\"",
        "children": ["layertree", "layout-switcher", "canvas", "library", "canvas-controls", "editors"]
      },
      "dashboard-library-canvas": {
        "grid-template-columns": "1fr 1fr",
        "grid-template-rows": "60px 1fr",
        "grid-template-areas": "\"a c\" \"b d\"",
        "children": ["layout-switcher", "library", "canvas-controls", "canvas"]
      }
    }
  }
}
```

### 2. **Auto Grid Area Assignment**

Components get grid areas assigned automatically based on their position:
- 1st child → grid-area: a
- 2nd child → grid-area: b
- 3rd child → grid-area: c
- And so on...

### 3. **Dynamic Switching**

When a layout is selected:
1. PresetStore updates the current layout
2. UIStore syncs the layout state
3. ProcessThemeStructure recalculates grid assignments
4. Components re-render in their new positions

---

## Library Component Example

The Library component demonstrates perfect layout integration:

### Component Structure
```typescript
export function Library({ 
  className = '',
  presetClassMap = {}
}: LibraryProps) {
  // Gets data directly from store
  const { items, selectedLibraries } = useLibraryStore();
  
  // No layout-specific props needed!
  return (
    <div className={`ui library ${className}`}>
      {/* Library content */}
    </div>
  );
}
```

### In Different Layouts

**Dashboard Layout (Full)**
- Position: Grid area 'd' (bottom right)
- Size: 350px wide column
- Shows: Full library with all features

**Dashboard-Library-Canvas Layout**
- Position: Grid area 'b' (left bottom)
- Size: 50% of screen width
- Shows: Same component, different position

**Dashboard-Canvas Layout**
- Not included in children array
- Component doesn't render
- Clean and automatic!

---

## Using with ONE Theme

The layout system is theme-agnostic and will work perfectly with the ONE theme for building visual layouts:

### 1. **ONE Theme Layout Definition**

```json
{
  "presets": {
    "layouts": {
      "one-default": {
        "grid-template-columns": "repeat(12, 1fr)",
        "grid-template-rows": "auto 1fr auto",
        "grid-template-areas": "\"a a a a a a a a a a a a\" \"b b b b b b b b b b b b\" \"c c c c c c c c c c c c\"",
        "children": ["header", "content", "footer"]
      },
      "one-sidebar": {
        "grid-template-columns": "300px 1fr",
        "grid-template-rows": "1fr",
        "grid-template-areas": "\"a b\"",
        "children": ["sidebar", "main"]
      },
      "one-split": {
        "grid-template-columns": "1fr 1fr",
        "grid-template-rows": "1fr",
        "grid-template-areas": "\"a b\"",
        "children": ["left-panel", "right-panel"]
      }
    }
  }
}
```

### 2. **Visual Builder Integration**

For the ONE theme's visual builder:

```typescript
// User drags components into the layout
const userLayout = {
  "custom-layout": {
    "grid-template-columns": "2fr 1fr",
    "grid-template-rows": "100px 1fr 50px",
    "grid-template-areas": "\"a b\" \"c b\" \"d d\"",
    "children": [] // Dynamically populated as user drags components
  }
};

// As user drops components, they get auto-assigned areas
dropComponent("hero") // → gets area 'a'
dropComponent("sidebar") // → gets area 'b'
dropComponent("content") // → gets area 'c'
dropComponent("footer") // → gets area 'd'
```

### 3. **Responsive Layouts**

The ONE theme can define responsive layout variations:

```json
{
  "presets": {
    "layouts": {
      "responsive-grid": {
        "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
        "grid-auto-rows": "minmax(200px, auto)",
        "gap": "1rem",
        "children": ["card-1", "card-2", "card-3", "card-4"]
      }
    }
  }
}
```

---

## Benefits for Visual Builders

### 1. **No Hardcoded Positions**
- Components don't have grid-area properties
- Can be reused in any layout
- Drag & drop friendly

### 2. **Live Preview**
- Switch layouts to preview different arrangements
- Instant visual feedback
- No code changes needed

### 3. **User-Created Layouts**
```typescript
// Save user's custom layout
const saveCustomLayout = (name: string, gridConfig: any, componentOrder: string[]) => {
  const customLayout = {
    ...gridConfig,
    children: componentOrder
  };
  
  // Save to theme or user preferences
  saveToTheme(`layouts.${name}`, customLayout);
};
```

### 4. **Layout Templates**
Create pre-built templates users can start from:
- Blog layout (header, sidebar, content, footer)
- Dashboard (multiple widget areas)
- Landing page (hero, features, testimonials, cta)
- Portfolio (grid of projects)

---

## Implementation Best Practices

### 1. **Component Design**
```typescript
// ✅ Good: Layout-agnostic component
function MyComponent({ className, presetClassMap }) {
  return <div className={`ui my-component ${className}`}>...</div>
}

// ❌ Bad: Layout-specific component
function MyComponent({ gridArea, isInSidebar }) {
  return <div style={{ gridArea }}>...</div>
}
```

### 2. **Layout Naming**
- Use descriptive names: `dashboard`, `editor`, `preview`
- Include viewport hints: `mobile-stack`, `tablet-split`
- Indicate purpose: `blog-layout`, `shop-layout`

### 3. **Grid Design**
- Use named areas for clarity
- Keep it simple (avoid complex nested grids)
- Test with different content amounts
- Consider mobile/responsive needs

---

## Advanced Features

### 1. **Conditional Layouts**
```typescript
// Show different layouts based on user state
const getAvailableLayouts = (user) => {
  const basic = ['simple', 'split'];
  const pro = ['dashboard', 'advanced-grid'];
  
  return user.isPro ? [...basic, ...pro] : basic;
};
```

### 2. **Layout Persistence**
```typescript
// Remember user's preferred layout
const saveLayoutPreference = (layoutId: string) => {
  localStorage.setItem('preferredLayout', layoutId);
  // Or save to user profile
};
```

### 3. **Layout Animation**
```css
/* Smooth transitions between layouts */
.ui {
  transition: grid-template-columns 0.3s ease,
              grid-template-rows 0.3s ease;
}

.ui > * {
  transition: all 0.3s ease;
}
```

### 4. **Breakpoint Switching**
```typescript
// Auto-switch layouts on resize
const useResponsiveLayout = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width < 768 ? 'mobile-stack' : 'desktop-grid';
};
```

---

## Future Enhancements

### 1. **Visual Layout Editor**
- Drag to create grid areas
- Resize grid tracks visually
- Preview with real content

### 2. **Layout Inheritance**
```json
{
  "layouts": {
    "base": {
      "padding": "1rem",
      "gap": "1rem"
    },
    "dashboard": {
      "extends": "base",
      "grid-template-columns": "250px 1fr"
    }
  }
}
```

### 3. **Smart Layouts**
- AI-suggested layouts based on content
- Auto-optimize for performance
- Accessibility-first layouts

---

## Summary

The Layout Switcher system provides:
- ✅ Theme-driven layouts
- ✅ Auto grid area assignment
- ✅ Dynamic component ordering
- ✅ Perfect for visual builders
- ✅ Works with both UI and ONE themes
- ✅ No hardcoded positions
- ✅ Drag & drop ready

This approach makes building flexible, user-friendly interfaces simple and maintainable!