---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-JSON-HYDRATION.md
related: [placeholder-syntax, props-injection, content-slots-system]
---

# JSON Template Structure

## Definition
A template system that defines component structure with placeholders for dynamic content, enabling separation of design from data similar to modern frameworks.

## Key Principles
- Dry templates with placeholders
- Props-based hydration
- Default value support
- Conditional visibility

## Template Structure

### Component Definition
```javascript
{
  id: "transformer-hero",
  type: "one",
  slots: {
    title: { 
      type: "text", 
      default: "{{ title }}" 
    },
    description: { 
      type: "text", 
      default: "{{ description }}" 
    },
    image: { 
      type: "image", 
      default: "{{ image }}" 
    },
    cta: { 
      type: "text", 
      default: "{{ ctaText || 'Get Started' }}",
      visible: "{{ showCTA }}"
    }
  }
}
```

### Slot Properties
- `type` - Content type (text, image, etc.)
- `default` - Placeholder or fallback value
- `visible` - Conditional display
- `required` - Validation flag (optional)

## Placeholder Syntax

### Basic Placeholders
```javascript
"{{ variableName }}"
```

### With Defaults
```javascript
"{{ variableName || 'Default Value' }}"
```

### Conditional Logic
```javascript
visible: "{{ showElement }}"
```

## Hydration Pattern

### Similar to Astro Props
```javascript
// ASTRO COMPONENT:
---
const { title, description, image, showCTA = true } = Astro.props;
---

// OUR TRANSFORMER COMPONENT:
{
  type: "one",
  preset: "hero-section",
  props: {
    title: "Welcome",
    description: "Start your journey",
    image: "hero.jpg",
    showCTA: true
  }
}
```

## Template Benefits

### Separation of Concerns
- Design in template
- Data in props
- Logic in placeholders
- Style in presets

### Reusability
- One template, many uses
- Different data, same structure
- Consistent patterns
- Easy updates

### Flexibility
- Optional slots
- Default values
- Conditional rendering
- Dynamic content

## Example Templates

### Hero Template
```javascript
{
  id: "hero-template",
  slots: {
    headline: { 
      type: "text", 
      default: "{{ headline }}" 
    },
    subheadline: { 
      type: "text", 
      default: "{{ subheadline }}",
      visible: "{{ showSubheadline }}"
    },
    backgroundImage: { 
      type: "image", 
      default: "{{ bgImage || '/defaults/hero-bg.jpg' }}" 
    }
  }
}
```

### Card Template
```javascript
{
  id: "card-template",
  slots: {
    image: { 
      type: "image", 
      default: "{{ image }}" 
    },
    title: { 
      type: "text", 
      default: "{{ title }}" 
    },
    description: { 
      type: "text", 
      default: "{{ description }}",
      visible: "{{ !minimal }}"
    },
    button: { 
      type: "button", 
      default: "{{ buttonText || 'Learn More' }}",
      visible: "{{ showButton }}"
    }
  }
}
```

## Integration Points

### With Presets
Templates work with any preset:
```javascript
// Same template + different presets
component.preset = "card-horizontal"
component.preset = "card-vertical"
component.preset = "card-minimal"
```

### With Content Management
- CMS data injection
- API responses
- User inputs
- Dynamic sources

## Related Atoms
- `placeholder-syntax` - Detailed syntax rules
- `props-injection` - How props flow in
- `content-slots-system` - Slot management