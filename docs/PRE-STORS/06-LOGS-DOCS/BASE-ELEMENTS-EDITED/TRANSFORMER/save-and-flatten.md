---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-EDIT-MODE.md
related: [edit-mode-workflow, temporary-ungrouping, group-to-flat-conversion]
---

# Save and Flatten

## Definition
The process of converting temporarily ungrouped editable elements back into a cohesive Flat Element, preserving edited content while restoring preset transformability.

## Key Principles
- Preserve all edits
- Restore structure
- Maintain preset capability
- Clean state transition

## Flattening Process

### Before Save (Ungrouped)
```javascript
{
  editSession: {
    active: true,
    originalId: "hero-123",
    elements: [
      { id: "temp-001", content: "New Title", slotName: "title" },
      { id: "temp-002", content: "New Subtitle", slotName: "subtitle" },
      { id: "temp-003", src: "/new-image.jpg", slotName: "image" }
    ]
  }
}
```

### After Flatten (Flat Element)
```javascript
{
  id: "hero-123",
  type: "one",
  preset: "hero-center",
  content: {
    slots: {
      title: { value: "New Title" },
      subtitle: { value: "New Subtitle" },
      image: { value: "/new-image.jpg" }
    }
  }
}
```

## Save Operations

### Collect Changes
```javascript
function collectChanges(editSession) {
  const changes = {};
  
  editSession.elements.forEach(element => {
    changes[element.slotName] = {
      value: element.content || element.src,
      visible: element.visible,
      style: element.style
    };
  });
  
  return changes;
}
```

### Apply to Original
```javascript
function applyChanges(originalElement, changes) {
  const updated = { ...originalElement };
  
  Object.entries(changes).forEach(([slotName, updates]) => {
    updated.content.slots[slotName] = {
      ...updated.content.slots[slotName],
      ...updates
    };
  });
  
  return updated;
}
```

### Cleanup Temporary
```javascript
function cleanup(editSession) {
  // Remove temporary elements
  editSession.elements.forEach(el => {
    removeFromCanvas(el.id);
  });
  
  // Clear edit state
  editSession.active = false;
  editSession.elements = [];
  
  // Restore original element
  restoreElement(editSession.originalId);
}
```

## Validation Before Save

### Content Validation
```javascript
function validateBeforeSave(changes) {
  const errors = [];
  
  // Check required fields
  Object.entries(slots).forEach(([name, slot]) => {
    if (slot.required && !changes[name]?.value) {
      errors.push(`${name} is required`);
    }
  });
  
  return errors;
}
```

### Structure Integrity
- Verify all slots accounted for
- Check data types match
- Validate constraints
- Ensure preset compatibility

## State Transitions

### Edit → Save Flow
```
1. Validate changes
2. Show save confirmation
3. Apply changes to original
4. Remove temporary elements
5. Restore Flat Element
6. Clear edit session
```

### Cancel Flow
```
1. Show cancel confirmation
2. Discard all changes
3. Remove temporary elements
4. Restore original state
5. Clear edit session
```

## Preset Preservation

### Before Edit
```javascript
{
  preset: "hero-left",
  content: { /* original */ }
}
```

### After Save
```javascript
{
  preset: "hero-left", // Same preset
  content: { /* updated */ }
}
```

### Still Transformable
```javascript
// Can still change presets
element.preset = "hero-center";
element.preset = "hero-minimal";
// New content works with all presets
```

## Save Options

### Auto-save
```javascript
// Save after each change
onChange: debounce(() => {
  saveAndFlatten();
}, 1000)
```

### Manual Save
```javascript
// Explicit user action
<button onClick={saveAndFlatten}>
  Save Changes
</button>
```

### Save and Continue
```javascript
// Save but stay in edit mode
function saveWithoutExit() {
  applyChanges();
  updateOriginal();
  // Don't cleanup edit session
}
```

## Error Handling

### Save Failures
```javascript
try {
  await saveAndFlatten();
} catch (error) {
  // Restore edit state
  // Show error message
  // Allow retry
}
```

### Conflict Resolution
- Detect concurrent edits
- Show conflict dialog
- Merge or overwrite options
- Version tracking

## Performance Optimization

### Batch Operations
```javascript
// Collect all changes
const allChanges = collectChanges();

// Single update
updateElement(id, allChanges);

// Single render
rerenderCanvas();
```

### Minimal Updates
- Only update changed slots
- Preserve unchanged data
- Efficient DOM updates
- Cache preset styles

## Visual Feedback

### Save Animation
```css
@keyframes save-flash {
  0% { background: rgba(0,255,0,0.2); }
  100% { background: transparent; }
}

.saving {
  animation: save-flash 0.5s;
}
```

### Status Indicators
- "Saving..." overlay
- Success checkmark
- Error states
- Progress indication

## Related Atoms
- `edit-mode-workflow` - Overall edit flow
- `temporary-ungrouping` - Ungrouping process
- `group-to-flat-conversion` - Similar flattening