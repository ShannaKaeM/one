---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L213-277
related: [slot-visibility-rules, json-template-structure, edit-mode-workflow]
---

# Content Slots System

## Definition
A flexible content management system where components define named slots for different content types, enabling toggleable visibility and dynamic content composition.

## Key Principles
- Named content areas
- Type-specific slots
- Toggle visibility
- Default values
- Style independence

## Slot Structure

### TypeScript Interface
```typescript
interface ContentSlot {
  type: 'text' | 'image' | 'icon'
  default: string
  visible: boolean
  required?: boolean
  style?: CSSProperties
  variants?: Record<string, string>
}

interface SlotConfig {
  [slotName: string]: ContentSlot
}
```

### Slot Properties
- `type` - Content type for validation
- `default` - Fallback content
- `visible` - Show/hide toggle
- `required` - Validation flag
- `style` - Slot-specific styling
- `variants` - Alternative content

## Content Types

### Text Slots
```javascript
{
  title: {
    type: 'text',
    default: 'Enter title',
    visible: true,
    required: true,
    style: { fontSize: '2rem' }
  },
  subtitle: {
    type: 'text',
    default: 'Optional subtitle',
    visible: false,
    style: { fontSize: '1.2rem' }
  }
}
```

### Image Slots
```javascript
{
  hero: {
    type: 'image',
    default: '/placeholder.jpg',
    visible: true,
    style: { objectFit: 'cover' }
  },
  icon: {
    type: 'image',
    default: '/icons/default.svg',
    visible: false,
    style: { width: '24px' }
  }
}
```

### Icon Slots
```javascript
{
  icon: {
    type: 'icon',
    default: 'star',
    visible: true,
    variants: {
      star: '⭐',
      heart: '❤️',
      check: '✓'
    }
  }
}
```

## Visibility Control

### Toggle Interface
```javascript
// In property panel
<SlotManager
  slots={element.content.slots}
  onToggle={(slotName, visible) => {
    updateSlotVisibility(element.id, slotName, visible)
  }}
/>
```

### Visibility Rules
```javascript
// Show/hide based on state
slots: {
  description: {
    visible: hasDescription,
  },
  cta: {
    visible: showCallToAction && !minimal
  }
}
```

### Preset Awareness
```javascript
// Different slots for different presets
if (preset === 'minimal') {
  slots.subtitle.visible = false;
  slots.description.visible = false;
} else if (preset === 'full') {
  // All slots visible
  Object.values(slots).forEach(slot => {
    slot.visible = true;
  });
}
```

## Implementation

### Component Definition
```javascript
const heroComponent = {
  id: 'hero-transformer',
  type: 'one',
  content: {
    slots: {
      pretitle: {
        type: 'text',
        default: 'WELCOME',
        visible: true,
        style: { 
          fontSize: '0.875rem',
          textTransform: 'uppercase' 
        }
      },
      title: {
        type: 'text',
        default: 'Amazing Product',
        visible: true,
        required: true
      },
      description: {
        type: 'text',
        default: 'Lorem ipsum...',
        visible: false
      },
      image: {
        type: 'image',
        default: '/hero-bg.jpg',
        visible: true
      }
    }
  }
}
```

### Slot Rendering
```javascript
function renderSlots(slots) {
  return Object.entries(slots).map(([name, slot]) => {
    if (!slot.visible) return null;
    
    switch(slot.type) {
      case 'text':
        return <Text key={name} {...slot} />
      case 'image':
        return <Image key={name} {...slot} />
      case 'icon':
        return <Icon key={name} {...slot} />
    }
  });
}
```

## Advanced Features

### Conditional Slots
```javascript
slots: {
  badge: {
    visible: "{{ hasBadge }}",
    value: "{{ badgeText }}",
    style: {
      display: "{{ hasBadge ? 'block' : 'none' }}"
    }
  }
}
```

### Slot Variants
```javascript
{
  button: {
    type: 'text',
    default: 'Get Started',
    variants: {
      primary: 'Get Started',
      secondary: 'Learn More',
      minimal: 'Go →'
    }
  }
}
```

### Dynamic Slots
```javascript
// Generate slots from data
function generateSlots(features) {
  const slots = {};
  features.forEach(feature => {
    slots[feature] = {
      type: 'text',
      default: `${feature} content`,
      visible: true
    };
  });
  return slots;
}
```

## Benefits

### Flexibility
- Toggle content areas
- Adapt to different needs
- No hardcoded layouts
- Dynamic composition

### Reusability
- Same component, different content
- Preset + slots = variations
- Clean data structure
- Easy to extend

### User Control
- Visual toggle UI
- See changes instantly
- No code editing
- Intuitive interface

## Integration Points

### With Presets
- Presets define layout
- Slots provide content
- Perfect separation
- Infinite combinations

### With Edit Mode
- Slots become editable
- Inline content changes
- Toggle visibility
- Save back to slots

## Related Atoms
- `slot-visibility-rules` - Visibility logic
- `json-template-structure` - Template system
- `edit-mode-workflow` - Editing interface