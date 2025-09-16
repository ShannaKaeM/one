---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-EDIT-MODE.md
related: [edit-mode-workflow, group-structure, save-and-flatten]
---

# Temporary Ungrouping

## Definition
The process of temporarily converting a Flat Element into individual editable elements during edit mode, while maintaining the ability to re-flatten back to the original structure.

## Key Principles
- Non-destructive editing
- Preserve relationships
- Maintain positions
- Reversible process

## Ungrouping Process

### Before (Flat Element)
```javascript
{
  id: "hero-123",
  type: "one",
  preset: "hero-center",
  content: {
    slots: {
      title: { value: "Welcome" },
      subtitle: { value: "Get started" },
      image: { value: "/hero.jpg" }
    }
  }
}
```

### During (Ungrouped)
```javascript
{
  editSession: {
    originalId: "hero-123",
    elements: [
      {
        id: "temp-001",
        type: "text",
        content: "Welcome",
        slotName: "title",
        editable: true
      },
      {
        id: "temp-002",
        type: "text",
        content: "Get started",
        slotName: "subtitle",
        editable: true
      },
      {
        id: "temp-003",
        type: "image",
        src: "/hero.jpg",
        slotName: "image",
        editable: true
      }
    ]
  }
}
```

### After (Re-flattened)
```javascript
{
  id: "hero-123",
  type: "one",
  preset: "hero-center",
  content: {
    slots: {
      title: { value: "New Welcome Text" },
      subtitle: { value: "Updated subtitle" },
      image: { value: "/new-hero.jpg" }
    }
  }
}
```

## Technical Implementation

### Ungrouping Steps
1. Store original structure
2. Create temporary elements
3. Map slots to elements
4. Enable editing UI
5. Track changes

### Element Creation
```javascript
function ungroup(flatElement) {
  const tempElements = [];
  
  Object.entries(flatElement.content.slots).forEach(([slotName, slot]) => {
    if (slot.visible !== false) {
      tempElements.push({
        id: generateTempId(),
        type: slot.type,
        content: slot.value,
        slotName: slotName,
        editable: true,
        style: slot.style
      });
    }
  });
  
  return tempElements;
}
```

### Position Preservation
- Maintain relative positions
- Keep z-index order
- Preserve spacing
- Honor layout rules

## State Management

### Edit Session
```javascript
const editSession = {
  active: true,
  originalElement: flatElement,
  temporaryElements: [...],
  changes: new Map(),
  startTime: Date.now()
};
```

### Change Tracking
```javascript
// Track each change
onChange(elementId, newValue) {
  editSession.changes.set(elementId, {
    slotName: element.slotName,
    oldValue: element.content,
    newValue: newValue
  });
}
```

## Visual Indicators

### During Ungrouping
- Dashed outline around edit area
- Individual element borders
- Edit handles visible
- Slot labels shown

### Interactive Elements
```css
.temp-element {
  outline: 1px dashed blue;
  cursor: text;
}

.temp-element:hover {
  outline: 2px solid blue;
}
```

## Benefits

### Non-Destructive
- Original preserved
- Can cancel anytime
- No data loss
- Safe editing

### Flexibility
- Edit individual parts
- Rearrange elements
- Toggle visibility
- Direct manipulation

### Simplicity
- Clear visual state
- Intuitive interaction
- Predictable behavior
- Easy mental model

## Constraints

### What Can Change
- Content values
- Element order
- Visibility states
- Individual styles

### What Cannot Change
- Slot definitions
- Element types
- Component structure
- Preset compatibility

## Related Atoms
- `edit-mode-workflow` - Overall editing flow
- `group-structure` - How groups work
- `save-and-flatten` - Saving changes