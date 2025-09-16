---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-JSON-HYDRATION.md
related: [json-template-structure, placeholder-syntax, content-management]
---

# Props Injection

## Definition
The process of injecting dynamic data into component templates through a props object, replacing placeholders with actual values while maintaining preset transformability.

## Key Principles
- Props flow into templates
- Placeholders get replaced
- Presets remain functional
- Type-safe hydration

## Hydration Process

### Basic Hydration
```javascript
// Hydrate with user data
const hydratedComponent = hydrate(componentTemplate, {
  title: "Summer Sale",
  description: "50% off everything",
  image: "/promos/summer.jpg",
  showCTA: true,
  ctaText: "Shop Now"
});

// Result: Fully populated component
```

### Template Before
```javascript
{
  slots: {
    title: { default: "{{ title }}" },
    description: { default: "{{ description }}" }
  }
}
```

### Component After
```javascript
{
  slots: {
    title: { value: "Summer Sale" },
    description: { value: "50% off everything" }
  }
}
```

## Props Structure

### Simple Props
```javascript
{
  title: "Welcome",
  subtitle: "Get started today",
  buttonText: "Click Here"
}
```

### Nested Props
```javascript
{
  user: {
    name: "John Doe",
    avatar: "/users/john.jpg"
  },
  settings: {
    theme: "dark",
    language: "en"
  }
}
```

### Array Props
```javascript
{
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ],
  tags: ["new", "featured", "sale"]
}
```

## Default Handling

### Props with Defaults
```javascript
props: {
  title: "Welcome",                    // Simple default
  subtitle: props.subtitle || "",      // Optional with fallback
  theme: props.theme ?? "light",       // Nullish coalescing
  items: props.items || []            // Array default
}
```

### Template Defaults
```javascript
// In template
"{{ title || 'Untitled' }}"

// With props: { title: "My Title" }
// Result: "My Title"

// With props: {}
// Result: "Untitled"
```

## Conditional Props

### Visibility Control
```javascript
slots: {
  badge: {
    visible: "{{ showBadge }}",
    value: "{{ badgeText }}",
    style: {
      backgroundColor: "{{ badgeColor || 'red' }}"
    }
  }
}
```

### Dynamic Styles
```javascript
props: {
  theme: "dark",
  accentColor: "#007bff"
}

// Injects into
style: {
  "--theme": "{{ theme }}",
  "--accent": "{{ accentColor }}"
}
```

## Hydration Features

### Preserve Presets
```javascript
// Same hydrated content + different layouts
hydratedComponent.preset = "hero-left"    // Text left
hydratedComponent.preset = "hero-center"  // Centered
hydratedComponent.preset = "hero-minimal" // Just text
```

### Type Validation
```javascript
// Validate prop types during hydration
hydrate(template, props, {
  validate: true,
  schema: {
    title: 'string',
    price: 'number',
    isActive: 'boolean'
  }
});
```

### Computed Values
```javascript
props: {
  price: 100,
  tax: 0.08
}

// In template
"{{ price + (price * tax) }}"  // Result: 108
```

## Integration Points

### With CMS
```javascript
// Fetch from CMS
const pageData = await cms.getPage('home');

// Hydrate components
const hero = hydrate(heroTemplate, pageData.hero);
const cards = pageData.cards.map(card => 
  hydrate(cardTemplate, card)
);
```

### With APIs
```javascript
// API response
const products = await api.getProducts();

// Hydrate product cards
const productCards = products.map(product => 
  hydrate(productCardTemplate, {
    name: product.name,
    price: product.price.formatted,
    image: product.images[0],
    inStock: product.inventory > 0
  })
);
```

## Best Practices

### Prop Naming
- Use camelCase
- Be descriptive
- Match template placeholders
- Avoid reserved words

### Data Preparation
- Transform data before injection
- Handle missing values
- Validate types
- Sanitize user input

### Performance
- Hydrate on demand
- Cache hydrated components
- Batch hydrations
- Minimize re-hydrations

## Related Atoms
- `json-template-structure` - Template definitions
- `placeholder-syntax` - Placeholder rules
- `content-management` - Content sources