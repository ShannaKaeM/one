# Universal Grid Layers Architecture Guide

**The Complete Framework System Integration**

## Core Vision

A unified visual/code editing system where everything is flat, grid-based, and universally portable. Users can seamlessly switch between visual building and code editing while maintaining perfect synchronization.

## Fundamental Concepts

### 1. The Flat Architecture

Everything exists at the root level with grid areas for positioning:

```
Traditional (Nested):          Our System (Flat):
└── Container                  ├── Element A (grid-area: a)
    ├── Header                 ├── Element B (grid-area: b)
    │   └── Title              ├── Element C (grid-area: c)
    └── Body                   ├── Element D (grid-area: d)
        └── Content            └── Element E (grid-area: e)
```

**Benefits:**
- Direct manipulation of any element
- No z-index conflicts
- Simplified state management
- Better performance
- Universal grid area assignments

### 2. Universal Grid Areas

Grid areas (a, b, c, d...) serve as the universal positioning system:

```css
/* Every element gets a grid area */
.element-1 { grid-area: a; }
.element-2 { grid-area: b; }
.element-3 { grid-area: c; }
```

**Key Properties:**
- Auto-assigned based on layer order
- Manually editable in code
- Sync between visual and code
- Drive both UI and ONE themes

### 3. Theme Architecture

```
Base ONE Theme (Studio1)
         ↓
User's ONE Theme (Local Copy)
         ↓
    ┌────────────────┐
    │                │
Visual Builder    Code Editor
    │                │
    └────────────────┘
         ↓
   Exported HTML/CSS
```

**Theme Independence:**
- Users get full copy of base theme
- No dependencies on Studio1
- Optional updates from base
- Complete ownership of their work

### 4. Layer Tree Connection

The LayerTree is the bridge between visual and code:

```javascript
LayerTree (UI Theme) ←→ Canvas Elements (ONE Theme)
    ↓                        ↓
UI Buttons              Actual Elements
    ↓                        ↓
Grid Areas              Grid Areas
    ↓                        ↓
        Synchronized
```

**Synchronization:**
- Drag in LayerTree → Updates canvas
- Drag on canvas → Updates LayerTree
- Edit grid area in code → Updates both
- All three stay in perfect sync

### 5. The Flattening System

Complex components can be "zipped" into flat presets:

```javascript
// Complex nested component
{
  type: "card",
  children: [
    { type: "header", children: [...] },
    { type: "body", children: [...] }
  ]
}

// Flattened preset
{
  preset: "card-flat-001",
  elements: [
    { id: 1, gridArea: "a", content: "..." },
    { id: 2, gridArea: "b", content: "..." },
    { id: 3, gridArea: "c", content: "..." }
  ]
}
```

**Edit Workflow:**
1. Select flattened preset
2. System temporarily unflattens
3. Edit in visual builder
4. Save re-flattens automatically

### 6. Bi-Directional Editing

```
Visual Builder Mode:
┌─────────────┐
│   Canvas    │ ← Drag & Drop
│  (Visual)   │ ← Resize Handles
│             │ ← Grid Snapping
└─────────────┘
       ↕️
┌─────────────┐
│    Code     │ ← Edit CSS
│   Editor    │ ← Edit Grid Areas
│   (Text)    │ ← Add Properties
└─────────────┘
```

**Real-time Sync:**
- Visual changes → Update code view
- Code changes → Update visual view
- No "apply" button needed
- Instant feedback

### 7. Export System

The flat architecture enables clean exports:

```javascript
// Studio1 Flat Format
{
  gridArea: "a",
  position: "absolute",
  width: "100%"
}

// Exported SEO-Friendly
<section class="hero">
  <div class="container">
    <h1>Title</h1>
  </div>
</section>
```

**Export Features:**
- Convert flat to semantic HTML
- Maintain responsive behavior
- Include only used styles
- Production-ready code

## Implementation Flow

### Phase 1: Element Creation
1. User drags element to canvas
2. System assigns next available grid area
3. Element appears in LayerTree
4. Position saved to user's theme

### Phase 2: Visual Manipulation
1. Drag in canvas or LayerTree
2. Grid area updates automatically
3. Other elements reflow as needed
4. Changes persist to theme

### Phase 3: Code Editing
1. Toggle to code view
2. See generated CSS with grid areas
3. Edit grid-area property
4. Visual instantly updates

### Phase 4: Preset Creation
1. Select multiple elements
2. Save as flat preset
3. Preset includes all grid areas
4. Reusable across projects

### Phase 5: Export
1. Choose export format
2. System converts flat to nested
3. Generates semantic HTML
4. Includes optimized CSS

## Technical Architecture

### State Management
```javascript
// Single source of truth
userTheme = {
  elements: [
    { id: "e1", gridArea: "a", type: "wrapper", ... },
    { id: "e2", gridArea: "b", type: "text", ... },
    { id: "e3", gridArea: "c", type: "image", ... }
  ]
}
```

### Event Flow
```
User Action → Event → State Update → UI Updates → Theme Save
                ↓
         All Views Sync
```

### Grid Area Assignment
```javascript
// Automatic assignment
nextGridArea = String.fromCharCode(97 + elements.length); // a, b, c...

// Manual override
element.gridArea = userInput; // User types "z"
reorderElements(); // Shift others as needed
```

## Benefits of This Architecture

1. **True WYSIWYG**: What you build is what you get
2. **No Lock-in**: Export clean code anytime
3. **Performance**: Flat = fast
4. **Flexibility**: Visual or code, user's choice
5. **Portability**: Grid areas work everywhere
6. **Simplicity**: No complex nesting to manage

## Future Enhancements

1. **Multi-artboard**: Multiple canvases with shared elements
2. **Responsive Grid Areas**: Different areas per breakpoint
3. **Animation**: Transition between grid arrangements
4. **Collaboration**: Real-time multi-user editing
5. **AI Assistant**: Suggest optimal grid layouts

## Summary

This architecture represents a fundamental shift in how web builders work:
- **Everything is flat** (performance + simplicity)
- **Everything has a grid area** (universal positioning)
- **Everything syncs** (visual ↔ code ↔ layers)
- **Everything is portable** (no vendor lock-in)

The result is a system where designers can build visually, developers can code directly, and both can work on the same project without conflicts or confusion.

## Implementation Checklist

### 1. Fix Canvas Grid Overlay & Handles ⚠️ **[PRIORITY 1]**

**Issue**: Grid overlay and selection handles stopped working after moving styles from global CSS to React components.

**Current State**:
- Styles were incorrectly in global.css (removed by agent)
- Now in React components but not rendering properly
- Need CSS classes instead of inline styles

**Tasks**:
- [ ] Debug why GridOverlay component isn't rendering
- [ ] Debug why SelectionHandles aren't showing
- [ ] Create proper CSS classes for grid/handles styling
- [ ] Ensure styles are scoped to DirectRenderer
- [ ] Test grid visibility toggle
- [ ] Test selection handle drag/resize
- [ ] Verify snap-to-grid functionality

**Files to Check**:
- `/src/components/GridOverlay.tsx`
- `/src/components/SelectionHandles.tsx`
- `/src/components/DirectRenderer.tsx`

### 2. Create Code Editor View 📝 **[PRIORITY 2]**

**Goal**: Toggle between visual canvas and code editor in the same space.

**Features**:
- [ ] Add code/visual toggle button to GeneralControls
- [ ] Create CodeEditor component
- [ ] Display current element's JSON (initially)
- [ ] Syntax highlighting for JSON
- [ ] Real-time sync with visual changes
- [ ] Edit grid areas in code → update visual
- [ ] Show generated CSS preview
- [ ] Consider YAML format option (future)
- [ ] Consider HTML preview (future)

**Implementation**:
```javascript
// Toggle states
- Visual Mode (current canvas)
- Code Mode (JSON editor)
- Split Mode (both side-by-side) [future]
```

### 3. User Theme State Management 💾 **[PRIORITY 3]**

**Goal**: Users own their theme data with cloud storage option.

**Architecture**:
```
App Start → Copy Base Theme → User's Theme
    ↓              ↓               ↓
Load Saved    or Fresh Copy    Save to Storage
```

**Tasks**:
- [ ] Implement theme copying on first load
- [ ] Create local storage adapter
- [ ] Integrate with Library's R2 storage system
- [ ] Add theme versioning
- [ ] Create save/load UI in settings
- [ ] Handle merge conflicts (base updates)
- [ ] Auto-save functionality
- [ ] Export theme as JSON file
- [ ] Import theme from file

**Storage Options**:
1. LocalStorage (default)
2. R2 Storage (via Library component)
3. File system (download/upload)
4. GitHub integration (future)

### 4. Grid Area System Integration 🔄 **[After 1-3]**

**Connect all the pieces**:
- [ ] Ensure grid area changes sync everywhere
- [ ] Test visual → code → LayerTree flow
- [ ] Implement reordering animations
- [ ] Add grid area labels overlay
- [ ] Create grid area picker UI
- [ ] Handle grid area conflicts

### 5. Testing & Documentation 🧪

- [ ] Create example projects
- [ ] Write user documentation
- [ ] Add inline code comments
- [ ] Create video tutorials
- [ ] Set up automated tests

## Development Order

1. **Fix Grid/Handles First** - Can't build without visual feedback
2. **Add Code Editor** - Enables bi-directional editing
3. **Implement Save System** - Users need persistence
4. **Complete Integration** - Tie everything together

## Notes

- Keep UI theme (editor) separate from ONE theme (user content)
- All features should work offline first
- Performance is critical - keep everything flat
- User owns their data - no vendor lock-in