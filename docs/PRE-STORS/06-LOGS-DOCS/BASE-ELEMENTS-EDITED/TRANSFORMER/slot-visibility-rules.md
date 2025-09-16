---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: Implementation patterns
related: [content-slots-system, placeholder-syntax, computed-properties]
---

# Slot Visibility Rules

## Definition
The rule system that determines when content slots are shown or hidden based on conditions, states, user preferences, and preset requirements.

## Key Principles
- Conditional display
- State-based visibility
- User control
- Preset awareness

## Basic Visibility Control

### Boolean Toggle
```javascript
{
  slots: {
    subtitle: {
      type: "text",
      visible: true  // Simple on/off
    },
    description: {
      type: "text", 
      visible: false // Hidden by default
    }
  }
}
```

### Dynamic Visibility
```javascript
{
  slots: {
    badge: {
      visible: "{{ showBadge }}"  // Controlled by props
    },
    price: {
      visible: "{{ price > 0 }}"  // Conditional logic
    }
  }
}
```

## Conditional Rules

### Simple Conditions
```javascript
// Based on prop existence
visible: "{{ title }}"  // Show if title exists

// Based on boolean
visible: "{{ isActive }}"  // Show if active

// Based on comparison
visible: "{{ count > 0 }}"  // Show if has items
```

### Complex Conditions
```javascript
// Multiple conditions
visible: "{{ hasImage && !isMinimal }}"

// OR conditions
visible: "{{ isPremium || isAdmin }}"

// Negation
visible: "{{ !isLoading && hasContent }}"
```

### Computed Visibility
```javascript
// Based on other slots
visible: "{{ slots.title.visible && slots.subtitle.visible }}"

// Based on calculations
visible: "{{ items.length > minItems }}"

// Based on state
visible: "{{ currentView === 'detailed' }}"
```

## Preset-Based Rules

### Preset Defines Visibility
```javascript
// Preset controls which slots show
const presets = {
  minimal: {
    slots: {
      title: { visible: true },
      subtitle: { visible: false },
      description: { visible: false },
      image: { visible: false }
    }
  },
  full: {
    slots: {
      title: { visible: true },
      subtitle: { visible: true },
      description: { visible: true },
      image: { visible: true }
    }
  }
};
```

### Preset Inheritance
```javascript
// Base visibility
const baseSlots = {
  title: { visible: true },
  subtitle: { visible: true }
};

// Preset overrides
const minimalPreset = {
  slots: {
    ...baseSlots,
    subtitle: { visible: false }  // Override
  }
};
```

## State-Based Visibility

### Component States
```javascript
slots: {
  loadingIndicator: {
    visible: "{{ state === 'loading' }}"
  },
  errorMessage: {
    visible: "{{ state === 'error' }}"
  },
  content: {
    visible: "{{ state === 'ready' }}"
  }
}
```

### Interactive States
```javascript
slots: {
  hoverContent: {
    visible: "{{ isHovered }}"
  },
  expandedContent: {
    visible: "{{ isExpanded }}"
  },
  activeIndicator: {
    visible: "{{ isActive }}"
  }
}
```

## User-Controlled Visibility

### Toggle Interface
```javascript
function SlotVisibilityControl({ slot, onChange }) {
  return (
    <label className="slot-toggle">
      <input
        type="checkbox"
        checked={slot.visible}
        onChange={(e) => onChange(slot.id, e.target.checked)}
      />
      <span>{slot.name}</span>
    </label>
  );
}
```

### Visibility Preferences
```javascript
// User preferences
const userPreferences = {
  showDescriptions: true,
  showImages: false,
  compactMode: true
};

// Apply to slots
slots.description.visible = userPreferences.showDescriptions;
slots.image.visible = userPreferences.showImages;
```

## Cascading Rules

### Parent-Child Dependencies
```javascript
slots: {
  parentSection: {
    visible: true,
    slots: {
      childContent: {
        // Only visible if parent is visible
        visible: "{{ parent.visible && hasChildContent }}"
      }
    }
  }
}
```

### Group Visibility
```javascript
// Control multiple slots together
const slotGroups = {
  details: ["description", "specifications", "reviews"],
  media: ["image", "video", "gallery"]
};

function toggleGroup(groupName, visible) {
  slotGroups[groupName].forEach(slotId => {
    slots[slotId].visible = visible;
  });
}
```

## Responsive Visibility

### Viewport-Based
```javascript
slots: {
  mobileMenu: {
    visible: "{{ viewport.width < 768 }}"
  },
  desktopNav: {
    visible: "{{ viewport.width >= 768 }}"
  },
  sidebarToggle: {
    visible: "{{ viewport.width < 1024 }}"
  }
}
```

### Context-Based
```javascript
slots: {
  breadcrumb: {
    visible: "{{ context.depth > 1 }}"
  },
  backButton: {
    visible: "{{ context.canGoBack }}"
  },
  adminTools: {
    visible: "{{ context.user.isAdmin }}"
  }
}
```

## Animation & Transitions

### Visibility Transitions
```css
.slot {
  transition: opacity 0.3s, transform 0.3s;
}

.slot[data-visible="false"] {
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
}

.slot[data-visible="true"] {
  opacity: 1;
  transform: scale(1);
}
```

### Staggered Reveals
```javascript
slots.forEach((slot, index) => {
  if (slot.shouldShow) {
    setTimeout(() => {
      slot.visible = true;
    }, index * 100);
  }
});
```

## Validation Rules

### Required Slots
```javascript
// Ensure required slots stay visible
if (slot.required && !slot.visible) {
  console.warn(`Required slot '${slot.id}' cannot be hidden`);
  slot.visible = true;
}
```

### Dependency Validation
```javascript
// Check dependencies
function validateVisibility(slots) {
  Object.entries(slots).forEach(([id, slot]) => {
    if (slot.dependsOn) {
      const dependency = slots[slot.dependsOn];
      if (!dependency.visible && slot.visible) {
        slot.visible = false; // Hide if dependency is hidden
      }
    }
  });
}
```

## Performance Optimization

### Lazy Rendering
```javascript
// Only render visible slots
function renderSlots(slots) {
  return Object.entries(slots)
    .filter(([_, slot]) => slot.visible)
    .map(([id, slot]) => (
      <SlotContent key={id} {...slot} />
    ));
}
```

### Visibility Caching
```javascript
const visibilityCache = new Map();

function getVisibility(slot, context) {
  const key = `${slot.id}:${JSON.stringify(context)}`;
  
  if (!visibilityCache.has(key)) {
    const visible = evaluateVisibility(slot, context);
    visibilityCache.set(key, visible);
  }
  
  return visibilityCache.get(key);
}
```

## Best Practices

### Clear Rules
```javascript
// Good: Clear condition
visible: "{{ hasSubscription }}"

// Bad: Complex nested logic
visible: "{{ (a && b) || (c && !d) || e }}"
```

### Documentation
```javascript
slots: {
  premiumContent: {
    visible: "{{ isPremium }}",
    // Document why it's conditional
    _comment: "Only shown to premium subscribers"
  }
}
```

### Graceful Defaults
```javascript
// Always provide fallback
visible: "{{ showOptional || false }}"

// Handle undefined
visible: "{{ !!contentAvailable }}"
```

## Related Atoms
- `content-slots-system` - Slot structure
- `placeholder-syntax` - Condition syntax
- `computed-properties` - Dynamic calculations