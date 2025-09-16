---
type: L1-ATOM
category: PRESETS
status: COMPLETE
source: Theme files and implementation
related: [preset-concept, preset-mixing, theme-loading-sequence]
---

# Preset Categories

## Definition
The organizational system that groups related presets into logical categories, enabling structured theme development, easier discovery, and consistent naming patterns.

## Key Principles
- Logical grouping
- Purpose-driven categories
- Consistent naming
- Extensible structure

## Standard Categories

### Component Presets
```json
{
  "button": {
    "primary": { /* Primary button styles */ },
    "secondary": { /* Secondary button styles */ },
    "ghost": { /* Ghost button styles */ },
    "danger": { /* Danger button styles */ },
    "success": { /* Success button styles */ }
  },
  "card": {
    "basic": { /* Basic card styles */ },
    "elevated": { /* Card with shadow */ },
    "bordered": { /* Card with border */ },
    "interactive": { /* Hoverable card */ }
  }
}
```

### Layout Presets
```json
{
  "layout": {
    "sidebar": { /* Sidebar layout */ },
    "centered": { /* Centered content */ },
    "split": { /* Split view */ },
    "dashboard": { /* Dashboard grid */ }
  },
  "grid": {
    "two-column": { /* 2 column grid */ },
    "three-column": { /* 3 column grid */ },
    "masonry": { /* Masonry layout */ }
  }
}
```

### Typography Presets
```json
{
  "typography": {
    "heading-1": { /* H1 styles */ },
    "heading-2": { /* H2 styles */ },
    "body": { /* Body text */ },
    "caption": { /* Small text */ },
    "quote": { /* Blockquote */ }
  }
}
```

### State Presets
```json
{
  "states": {
    "hover": { /* Hover state */ },
    "active": { /* Active state */ },
    "disabled": { /* Disabled state */ },
    "loading": { /* Loading state */ },
    "error": { /* Error state */ }
  }
}
```

## Category Organization

### Hierarchical Structure
```javascript
presets: {
  // Top-level categories
  components: {
    // Sub-categories
    buttons: {
      // Specific presets
      primary: { },
      secondary: { }
    },
    forms: {
      input: { },
      select: { }
    }
  },
  utilities: {
    spacing: {
      compact: { },
      comfortable: { },
      spacious: { }
    }
  }
}
```

### Flat Structure
```javascript
presets: {
  // All presets at same level with prefixes
  "button-primary": { },
  "button-secondary": { },
  "card-basic": { },
  "card-elevated": { },
  "layout-sidebar": { },
  "layout-centered": { }
}
```

## Category Types

### Visual Categories
```javascript
{
  // Appearance-focused
  "themes": {
    "light": { /* Light theme */ },
    "dark": { /* Dark theme */ },
    "high-contrast": { /* Accessibility */ }
  },
  "effects": {
    "glass": { /* Glassmorphism */ },
    "neumorphic": { /* Neumorphism */ },
    "flat": { /* Flat design */ }
  }
}
```

### Functional Categories
```javascript
{
  // Purpose-focused
  "navigation": {
    "navbar": { /* Navigation bar */ },
    "sidebar": { /* Side navigation */ },
    "breadcrumb": { /* Breadcrumb */ }
  },
  "feedback": {
    "alert": { /* Alert styles */ },
    "toast": { /* Toast notification */ },
    "modal": { /* Modal dialog */ }
  }
}
```

### Context Categories
```javascript
{
  // Use-case focused
  "marketing": {
    "hero": { /* Hero section */ },
    "cta": { /* Call to action */ },
    "testimonial": { /* Testimonial */ }
  },
  "ecommerce": {
    "product-card": { /* Product display */ },
    "price-tag": { /* Pricing */ },
    "cart-item": { /* Cart display */ }
  }
}
```

## Category Metadata

### Category Definition
```javascript
const categoryMetadata = {
  "button": {
    name: "Buttons",
    description: "Interactive button styles",
    icon: "🔘",
    order: 1,
    tags: ["interactive", "component"]
  },
  "layout": {
    name: "Layouts",
    description: "Page and section layouts",
    icon: "📐",
    order: 2,
    tags: ["structure", "container"]
  }
};
```

### Preset Metadata
```javascript
const presetMetadata = {
  "button.primary": {
    name: "Primary Button",
    description: "Main call-to-action button",
    preview: "/previews/button-primary.png",
    usage: "Use for primary actions",
    variants: ["large", "small", "icon-only"]
  }
};
```

## Dynamic Categories

### Plugin-Based
```javascript
// Register new category
function registerCategory(id, config) {
  categories[id] = {
    ...config,
    presets: {}
  };
}

// Add presets to category
function addPresetToCategory(categoryId, presetId, preset) {
  categories[categoryId].presets[presetId] = preset;
}
```

### Auto-Generated
```javascript
// Generate categories from content
function generateCategories(elements) {
  const categories = {};
  
  elements.forEach(element => {
    const category = element.type;
    if (!categories[category]) {
      categories[category] = {};
    }
    categories[category][element.variant] = element.styles;
  });
  
  return categories;
}
```

## Category Navigation

### UI Organization
```javascript
// Category selector component
function CategorySelector({ categories, onSelect }) {
  return (
    <div className="category-nav">
      {Object.entries(categories).map(([id, category]) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="category-button"
        >
          <span className="icon">{category.icon}</span>
          <span className="name">{category.name}</span>
          <span className="count">{category.count}</span>
        </button>
      ))}
    </div>
  );
}
```

### Search & Filter
```javascript
// Search across categories
function searchPresets(query) {
  const results = [];
  
  Object.entries(categories).forEach(([catId, category]) => {
    Object.entries(category.presets).forEach(([presetId, preset]) => {
      if (matchesQuery(preset, query)) {
        results.push({
          categoryId: catId,
          presetId: presetId,
          preset: preset
        });
      }
    });
  });
  
  return results;
}
```

## Category Rules

### Naming Conventions
```javascript
// Category IDs: lowercase, hyphenated
"button-styles"
"layout-patterns"
"color-schemes"

// Preset IDs within categories: descriptive
"primary"
"with-icon"
"large-centered"
```

### Organization Principles
1. **Single Purpose** - Each category has one clear purpose
2. **No Overlap** - Presets belong to one category
3. **Discoverable** - Clear names and descriptions
4. **Extensible** - Easy to add new presets

## Best Practices

### Category Design
```javascript
// Good category structure
{
  "spacing": {
    "none": { padding: 0 },
    "small": { padding: "0.5rem" },
    "medium": { padding: "1rem" },
    "large": { padding: "2rem" }
  }
}

// Poor category structure
{
  "misc": {
    "spacing-small": { },
    "button-primary": { },
    "layout-grid": { }
  }
}
```

### Documentation
```javascript
// Document each category
/**
 * Button Presets
 * 
 * Standard button styles for the design system.
 * 
 * Variants:
 * - primary: Main CTA buttons
 * - secondary: Secondary actions
 * - ghost: Minimal style
 * - danger: Destructive actions
 * 
 * Usage: Apply to button elements or button-like components
 */
```

## Related Atoms
- `preset-concept` - Core preset system
- `preset-mixing` - Combining presets
- `theme-loading-sequence` - How presets load