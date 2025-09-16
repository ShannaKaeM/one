# Library System Roadmap

## Current State (January 9, 2025)

### ✅ Completed
- Collections removed from worker and UI
- Libraries are now the primary categorization system
- Custom library persistence fixed
- Delete functionality working
- All items show in library regardless of type
- Theme JSON preset structure updated:
  - `base-element-presets` (wrapper, text, media)
  - `looks`, `components`, `layouts` categories ready

### 🔧 Working Features
- Upload media to library
- Create and manage custom libraries
- Save elements from canvas (with structure but preview needs work)
- Double-click or drag to add items to canvas
- Multi-select with checkboxes

### 🐛 Known Issues
- Saved styled elements show as basic titles in library
- Element styling not fully preserved when restored from library
- Library preview doesn't generate proper thumbnails for styled elements

## Next Steps

### 1. Single Element Save/Restore
Test and refine how we save individual styled elements:
- Experiment with preset assignment
- Test structure preservation
- Ensure all styles are captured and restored

### 2. Group Implementation
Fix and test group functionality:
- Create groups from multiple selected elements
- Maintain proper hierarchy
- Test save/restore of grouped elements

### 3. Flattened Groups
After groups work:
- Test flattening grouped elements
- Experiment with unflatten functionality
- Determine best approach for maintaining structure

## Technical Notes

### Save Structure
Currently saving elements as:
```json
{
  "type": "element",
  "data": {
    "element": {
      // Full element data with styles
      "id": undefined
    }
  }
}
```

### Preset Categories
- `base-element-presets`: Internal presets for base functionality
- `looks`: Visual styling presets (user-facing)
- `components`: Reusable component presets (user-facing)
- `layouts`: Layout presets (user-facing)