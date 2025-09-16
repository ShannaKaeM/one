---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L136-148
related: [group-operations, parent-child-relationships, group-to-flat-conversion]
---

# Group Structure

## Definition
A special element type that contains other elements as children, enabling hierarchical organization and collective manipulation on the canvas.

## Key Principles
- Groups are elements with children
- Bounding box calculated from children
- Relative positioning within groups
- Single unit movement

## Data Structure

```javascript
// Group structure
const group = {
  id: `group-${timestamp}`,
  type: 'group',
  isGroup: true,
  children: ['element-1', 'element-2'],
  style: {
    position: 'absolute',
    left: `${minX}px`,
    top: `${minY}px`,
    width: `${boundingWidth}px`,
    height: `${boundingHeight}px`,
    border: '1px dashed rgba(0,0,0,0.2)'
  }
}

// Child elements have parentGroup property
element.parentGroup = 'group-123'
```

## Group Properties

### Required Fields
- `id` - Unique identifier
- `type: 'group'` - Element type
- `isGroup: true` - Group flag
- `children[]` - Array of child element IDs

### Calculated Properties
- `left/top` - Minimum x/y from children
- `width/height` - Bounding box dimensions
- Visual border for identification

### Child References
- Each child has `parentGroup` property
- Points to parent group ID
- Enables hierarchy navigation

## Grouping Behavior

### Creation Rules
- Group button appears when 2+ elements selected
- Bounding box calculated from child positions
- Children maintain relative positions
- Automatic naming: "Group 1", "Group 2", etc.

### Interaction Rules
- Clicking grouped elements selects parent group
- Groups move as single units with all children
- Children positions update relatively
- Selection traverses to group level

## Position Management

### Absolute to Relative
```javascript
// When grouping, convert to relative
const relativeLeft = childLeft - groupLeft;
const relativeTop = childTop - groupTop;
```

### Relative to Absolute
```javascript
// When ungrouping, restore absolute
const absoluteLeft = groupLeft + relativeLeft;
const absoluteTop = groupTop + relativeTop;
```

## Examples

### Simple Group
```javascript
{
  id: 'group-001',
  type: 'group',
  isGroup: true,
  children: ['wrapper-1', 'text-1'],
  style: {
    position: 'absolute',
    left: '100px',
    top: '100px',
    width: '300px',
    height: '200px'
  }
}
```

### Nested Groups
```javascript
{
  id: 'group-parent',
  children: ['element-1', 'group-child', 'element-2'],
  // group-child is itself a group
}
```

## Visual Representation
- Dashed border around group bounds
- Semi-transparent background (optional)
- Group icon in Layer Tree (▣)
- Expand/collapse in hierarchy

## Related Atoms
- `group-operations` - Grouping/ungrouping actions
- `parent-child-relationships` - Hierarchy management
- `group-to-flat-conversion` - Advanced transformation