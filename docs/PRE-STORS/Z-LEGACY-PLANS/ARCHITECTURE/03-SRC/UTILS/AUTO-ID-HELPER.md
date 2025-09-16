# Auto ID Helper

## 🎯 Quick Summary
> **Purpose**: Generates unique IDs and auto-assigns grid areas for elements  
> **Type**: Utility Class  
> **Location**: `/src/utils/autoIdHelper.ts`  
> **Related**: [JTR](../../01-CORE/JTR.md), [DIRECT-RENDERER](../../01-CORE/DIRECT-RENDERER.md), [UTILS](../UTILS.md)

---

## 🔄 Simple Explanation

Auto ID Helper **automates element identification**:

1. **Generates unique IDs** - element-1, element-2, etc.
2. **Auto-assigns grid areas** - a, b, c... aa, ab, ac...
3. **Processes structures** - Handles nested and flat formats
4. **Tracks ID mappings** - Maintains consistency
5. **No manual ID management** - Fully automatic

```
New element → Auto ID Helper → Unique ID + Grid area → Element ready
```

---

## 📋 Technical Specification

### Core Features

| Feature | Function |
|---------|----------|
| **generateId()** | Creates unique element IDs |
| **getGridArea()** | Assigns a, b, c... automatically |
| **processStructure()** | Handles both nested/flat structures |
| **ID counter** | Tracks next available ID |
| **ID mapping** | Maintains ID consistency |

### Grid Area Pattern
```
0 → a
1 → b
...
25 → z
26 → aa
27 → ab
```

---

## 🔗 Integration

### Usage Flow
```
JTR creates element → Auto ID assigns ID → Grid area assigned → Rendered
```

### Connected Systems
- **JTR** - Uses for all element creation
- **Direct Renderer** - Relies on grid areas
- **UIGenerator** - Auto-assigns to UI elements
- **Structure processing** - Flat/nested handling

### Event Flow
```
User drags element → No ID needed → Auto ID generated → Element positioned
```

---

## 📊 Quick Reference

### Benefits
- No manual ID tracking
- Consistent naming
- Grid areas automatic
- Supports unlimited elements
- Clean element structure

### ID Format
- Type-based: `element-1`, `button-2`
- Sequential numbering
- Never duplicates
- Session-persistent

### Grid Assignment
- First 26: single letters
- After z: double letters
- Infinite sequence
- CSS Grid compatible