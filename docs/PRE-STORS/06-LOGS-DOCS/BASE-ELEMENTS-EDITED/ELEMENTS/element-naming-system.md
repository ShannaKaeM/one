---
type: L1-ATOM
category: ELEMENTS
status: COMPLETE
source: 01.01-VISUAL-BUILDER-ROADMAP.md#L64
related: [element-types, element-creation-pattern]
---

# Element Naming System

## Definition
An automatic naming convention that assigns human-readable names to elements based on their type and creation order, ensuring unique identification without user input.

## Key Principles
- Type-based naming
- Sequential numbering
- Human-readable format
- Automatic assignment

## Naming Pattern

### Format
```
"[Type] [Number]"
```

### Examples
- "Wrapper 1"
- "Text 2" 
- "Image 3"
- "Group 4"

## Implementation

### Type Counters
```javascript
const typeCounters = {
  wrapper: 0,
  text: 0,
  image: 0,
  group: 0
};

// On element creation
typeCounters[type]++;
const name = `${capitalize(type)} ${typeCounters[type]}`;
```

### Capitalization
```javascript
function capitalize(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
```

## Counter Rules

### Independent Counters
- Each type has its own counter
- Counters never reset during session
- Start at 1, not 0

### Sequence Examples
```
Wrapper 1
Text 1
Wrapper 2
Text 2
Image 1
Group 1
```

## Special Cases

### Groups
- Follow same pattern: "Group 1", "Group 2"
- Children keep their original names
- Ungrouping doesn't rename children

### Renamed Elements
- User can override automatic names
- Counter continues regardless
- Renamed elements don't affect sequence

### Duplicated Elements
- Get new sequential number
- Not "Copy of" pattern
- Maintain clean naming

## Benefits
- No naming conflicts
- Clear element identification
- Easy visual scanning
- Professional appearance
- No user burden

## Layer Tree Display
Names appear in:
- Layer Tree sidebar
- Property panels
- Export comments
- Debug logs

## Future Considerations
- Persistent counters across sessions
- Type-specific prefixes
- Custom naming patterns
- Bulk rename operations

## Related Atoms
- `element-types` - Available element types
- `element-creation-pattern` - How elements are created