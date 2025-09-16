---
type: L1-ATOM
category: TRANSFORMER
status: COMPLETE
source: WHITEBOARDS/WB-01-EDIT-MODE.md
related: [temporary-ungrouping, inline-content-editing, save-and-flatten]
---

# Edit Mode Workflow

## Definition
A simple editing system that temporarily ungroups Flat Elements to allow content editing, then re-flattens them while preserving preset transformability.

## Key Principles
- Temporary ungrouping
- Direct content editing
- Preserve transformability
- Save and flatten

## Workflow Visualization

```
NORMAL MODE:
┌─────────────────────┐
│ 📦 Hero Component   │ ← Locked Flat Element
│  [Preset: hero-left]│
└─────────────────────┘

EDIT MODE (Toggle On):
┌─────────────────────┐
│ 📝 Title Text       │ ← Temporarily ungrouped
│ 📝 Subtitle Text    │ ← All editable
│ 🖼️ Background Image │ ← Can rearrange
└─────────────────────┘

SAVE & FLATTEN:
┌─────────────────────┐
│ 📦 Hero Component   │ ← Back to Flat Element
│  [Updated content]  │
└─────────────────────┘
```

## Technical Flow

### 1. Toggle Edit Mode
- Flat Element temporarily ungroups
- Content slots become editable
- Layout preserved
- Visual indicators active

### 2. Edit Content
- Change text inline
- Swap images
- Rearrange elements
- Toggle slot visibility

### 3. Save Changes
- Re-flatten to Flat Element
- Update content values
- Preserve structure
- Maintain preset capability

### 4. Preset Compatibility
- Updated content works with all presets
- Can still transform layouts
- No loss of functionality
- Clean separation maintained

## Edit Mode States

### Normal Mode
```javascript
{
  id: "hero-123",
  type: "one",
  preset: "hero-left",
  isEditing: false,
  content: { /* sealed */ }
}
```

### Edit Mode Active
```javascript
{
  id: "hero-123",
  type: "one",
  preset: "hero-left",
  isEditing: true,
  temporaryElements: [
    { type: "text", editable: true },
    { type: "image", editable: true }
  ]
}
```

### After Save
```javascript
{
  id: "hero-123",
  type: "one",
  preset: "hero-left",
  isEditing: false,
  content: { /* updated values */ }
}
```

## UI Indicators

### Visual Feedback
- Dashed border in edit mode
- Editable content highlighted
- Save/Cancel buttons appear
- Cursor changes on hover

### Edit Controls
```
[✏️ Edit] → [💾 Save] [❌ Cancel]
```

### Inline Editing
- Click text to edit
- Click image to replace
- Drag to reorder
- Toggle visibility

## Content Preservation

### What Changes
- Text content
- Image sources
- Element order
- Slot visibility

### What Stays Same
- Component structure
- Preset capability
- Slot definitions
- Style relationships

## Benefits

### Simplicity
- One edit mode for all
- Clear mental model
- Intuitive interaction
- No complex states

### Power
- Edit any Flat Element
- Maintain all features
- Visual editing
- Immediate feedback

### Flexibility
- Works with any preset
- Supports all content types
- Scalable approach
- Future-proof

## Integration Points

### With Canvas
- Click element to select
- Toggle edit mode
- Make changes
- Auto-save option

### With Properties Panel
- Show edit toggle
- Display slot controls
- Visibility toggles
- Content inputs

## Related Atoms
- `temporary-ungrouping` - How ungrouping works
- `inline-content-editing` - Direct editing details
- `save-and-flatten` - Save process