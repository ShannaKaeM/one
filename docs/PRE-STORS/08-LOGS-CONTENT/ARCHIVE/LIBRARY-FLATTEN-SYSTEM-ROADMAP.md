# Library & Flatten System Roadmap

## 🎯 Vision
Create a component library system that maintains flat visual editing while enabling proper hierarchical structure for exports and reusability.

## 📍 Current State (Jan 9, 2025)

### ✅ What's Working
- **Library Creation**: Custom libraries can be created and persist
- **Media Uploads**: Images auto-save to "All Items" library
- **Basic Save**: Single elements can be saved with inline styles
- **Library Filtering**: Can filter by custom libraries
- **Worker Deployed**: Collections removed, libraries are primary

### ❌ What's Not Working
- **Multi-select grouping**: Not functioning (needed for flatten feature)
- **Save Modal Libraries**: Fixed but needs testing - now shows all existing libraries
- **Structure**: Single elements are implicitly flat but not explicitly marked

## 🏗️ Architecture Pivot: Flatten/Unflatten System

### Core Concept
```
Visual Editing (Flat) ←→ Flattened Package ←→ Nested Export
```

### Flattened Element Structure
```javascript
{
  id: "element-xxx",
  type: "one",
  presetType: "flattened",
  isFlattened: true, // Explicit flat marker
  content: {
    // Preview/thumbnail data
    preview: "base64...",
    elementCount: 3
  },
  flattenedData: {
    elements: [
      // All child elements with positions
      { id: "e1", type: "one", presetType: "text", style: {...} },
      { id: "e2", type: "one", presetType: "image", style: {...} }
    ],
    structure: {
      // Relationships for unflattening
      root: "e1",
      groups: {},
      order: ["e1", "e2"]
    },
    exportMap: {
      // HTML export structure
      root: { tag: "section", className: "hero" },
      elements: {
        "e1": { tag: "h1" },
        "e2": { tag: "img" }
      }
    }
  }
}
```

## 🔧 Implementation Phases

### Phase 1: Fix Multi-Select & Grouping (Priority)
1. **Debug multi-select**
   - Check shift-click functionality in DirectRenderer
   - Verify selection state management
   - Fix visual feedback for multiple selections

2. **Implement grouping**
   - Create group from selection
   - Maintain flat positioning (no nesting)
   - Add group boundary indicators

### Phase 2: Basic Flatten/Unflatten
1. **Flatten Function**
   ```javascript
   flattenElements(elements, boundary) → flattenedElement
   ```
   - Capture all elements within boundary
   - Store relative positions
   - Generate preview thumbnail
   - Mark as `isFlattened: true`

2. **Unflatten Function**
   ```javascript
   unflattenElement(flattenedElement) → elements[]
   ```
   - Restore original elements
   - Maintain relative positions
   - Preserve all styling

3. **UI Controls**
   - "Flatten Group" button
   - "Edit" button on flattened elements
   - "Keep Flattened" toggle on drop

### Phase 3: Library Integration
1. **Save Flattened**
   - Save flattened elements as library items
   - Type: "component" (vs "element", "media")
   - Include preview and metadata

2. **Library Display**
   - Show flattened preview
   - Indicate element count
   - "Unflatten on Drop" option

### Phase 4: Export System
1. **Export Templates**
   - Define HTML structure in exportMap
   - SEO-friendly tag mapping
   - Preserve semantic relationships

2. **Export Function**
   ```javascript
   exportToHTML(flattenedElement) → nestedHTML
   ```

### Phase 5: Preset System
1. **Save as Preset**
   - Any flattened group → reusable preset
   - Apply to single elements to "hydrate"
   - Preset variations/parameters

## 📋 Critical Tasks

### Immediate (Before Time Runs Out)
1. [ ] Test save modal library display
2. [ ] Document multi-select bug details
3. [ ] Define explicit flat marker system

### Next Session
1. [ ] Fix multi-select functionality
2. [ ] Implement basic grouping
3. [ ] Create flatten/unflatten prototypes

## 🔑 Key Decisions Made

1. **Explicit Flat Marking**: Add `isFlattened: true` to differentiate
2. **Library Type**: Flattened = "component" type
3. **Auto-unflatten**: Optional on drop (user choice)
4. **Export Structure**: Stored in element, not computed

## 🐛 Known Issues

### Multi-Select Not Working
- Shift-click should select range
- Ctrl/Cmd-click should toggle selection
- Need to check DirectRenderer selection handlers
- Required for grouping → flattening

### Current Structure
- Single elements are implicitly flat
- Need explicit marking system
- Groups need boundary definition

## 💡 Implementation Notes

### Flatten Process
1. User selects multiple elements
2. Click "Group & Flatten"
3. System creates boundary box
4. Captures all elements within
5. Stores as single flattened element

### Unflatten Process
1. User clicks "Edit" on flattened
2. System restores all elements
3. Shows group boundary
4. Allows individual editing
5. "Save" re-flattens with changes

### Export Process
1. System reads exportMap
2. Creates nested DOM structure
3. Applies elements to proper tags
4. Returns SEO-friendly HTML

## 🎯 Success Criteria

1. **Flat Editing**: Maintain current visual workflow
2. **Proper Exports**: Generate semantic HTML
3. **Reusability**: Any group → preset
4. **Performance**: Fewer elements when flattened
5. **Flexibility**: Unflatten for editing anytime

---

## Next Agent Handoff

### Priority 1: Fix Multi-Select
Check `/src/components/DirectRenderer.tsx`:
- Lines ~1170-1190: Multi-selection logic
- Look for shift-click handling
- Verify `selectedElementIds` state

### Priority 2: Test Library Display
- Create custom library
- Save element
- Check if library appears in save modal

### Priority 3: Start Flatten System
- Create `flattenElements` utility
- Add `isFlattened` property
- Implement preview generation

The flatten/unflatten system is the key to bridging flat visual editing with proper component structure!