---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-JSON-HYDRATION.md
related: [json-template-structure, props-injection, computed-properties]
---

# Placeholder Syntax

## Definition
A template variable syntax using double curly braces that enables dynamic content injection, default values, and conditional logic within JSON templates.

## Key Principles
- Familiar mustache-style syntax
- Support for defaults
- Simple conditionals
- No complex logic

## Basic Syntax

### Simple Variable
```javascript
"{{ variableName }}"
```

### With Default Value
```javascript
"{{ variableName || 'Default Text' }}"
```

### Nested Properties
```javascript
"{{ user.name }}"
"{{ product.price.formatted }}"
```

## Default Values

### String Defaults
```javascript
"{{ title || 'Untitled' }}"
"{{ description || 'No description available' }}"
```

### Empty String Fallback
```javascript
"{{ optionalField || '' }}"
```

### Chained Fallbacks
```javascript
"{{ primaryText || secondaryText || 'Default' }}"
```

## Conditional Visibility

### Boolean Props
```javascript
visible: "{{ showElement }}"
visible: "{{ !hideElement }}"
```

### Truthy Checks
```javascript
visible: "{{ title }}"  // Shows if title exists
visible: "{{ items.length }}"  // Shows if has items
```

## Advanced Patterns

### Property Access
```javascript
// Object properties
"{{ user.profile.displayName }}"

// Array access (planned)
"{{ items[0].name }}"
```

### Type Coercion
```javascript
// Numbers
"{{ count || 0 }}"

// Booleans
visible: "{{ isActive || false }}"
```

## Special Cases

### HTML Content
```javascript
{
  type: "html",
  content: "{{ htmlContent }}"
}
```

### Image Sources
```javascript
{
  type: "image",
  src: "{{ imageUrl || '/placeholder.jpg' }}"
}
```

### Dynamic Attributes
```javascript
{
  href: "{{ link }}",
  target: "{{ newWindow ? '_blank' : '_self' }}"
}
```

## Escaping

### Literal Braces
```javascript
// To display {{ as text
"\\{\\{ This is not a placeholder \\}\\}"
```

### Reserved Characters
- `{{` and `}}` are reserved
- Use backslash to escape
- No nesting of placeholders

## Best Practices

### Naming Conventions
```javascript
// Good
"{{ userName }}"
"{{ isVisible }}"
"{{ hasItems }}"

// Avoid
"{{ user_name }}"  // Use camelCase
"{{ visible }}"     // Be descriptive
```

### Default Strategy
```javascript
// Always provide defaults for optional content
"{{ optionalTitle || 'Welcome' }}"

// Use empty string for truly optional
"{{ subtitle || '' }}"
```

### Validation
```javascript
// Required fields shouldn't have defaults
"{{ requiredField }}"  // Will error if missing

// Optional fields should have defaults
"{{ optionalField || 'Default' }}"
```

## Examples

### Hero Component
```javascript
{
  title: "{{ headline }}",
  subtitle: "{{ tagline || '' }}",
  backgroundImage: "{{ bgImage || '/default-hero.jpg' }}",
  ctaText: "{{ buttonText || 'Get Started' }}",
  ctaVisible: "{{ showCTA || true }}"
}
```

### Product Card
```javascript
{
  name: "{{ product.name }}",
  price: "{{ product.price || 'Contact for pricing' }}",
  image: "{{ product.image || '/no-image.png' }}",
  inStock: "{{ product.inventory > 0 }}"
}
```

## Related Atoms
- `json-template-structure` - Overall template system
- `props-injection` - How values are injected
- `computed-properties` - Dynamic calculations