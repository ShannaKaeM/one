# ONEstore-RM (State Management Roadmap)

## Implementation Status

### ✅ Completed (Minimal Store)
- [x] Create ONEstore.ts with TypeScript
- [x] 3 Actors pattern (Designer, Workspace, Projects)
- [x] Zustand with devtools
- [x] Direct action methods
- [x] selectedElement (singular)
- [x] currentTool state
- [x] currentView (not activeLayout)
- [x] gridVisible & snapEnabled
- [x] elements array
- [x] projectName

### 🔄 Current State
**Location**: `/src/stores/ONEstore.ts`  
**What's in it**:
```typescript
designer: {
  selectedElement: string | null
  currentTool: 'select' | 'move' | 'text' | 'image' | 'one'
}
workspace: {
  currentView: string  // 'dashboard', 'canvas', etc
  gridVisible: boolean
  snapEnabled: boolean
}
projects: {
  elements: Element[]
  projectName: string
}
```

### 📋 Consider Adding Later
**Designer Actor**:
- [ ] clipboard (copy/paste)
- [ ] history (undo/redo)
- [ ] editMode (design/preview)

**Workspace Actor**:
- [ ] panelStates (open/closed)
- [ ] expandedSections (accordions)
- [ ] zoom level
- [ ] theme (if not separate)

**Projects Actor**:
- [ ] projectId
- [ ] lastSaved timestamp
- [ ] customPresets (or separate store?)
- [ ] exportSettings

---

## Separate Stores to Consider

### 🤔 Library Store
- Might need own store (1,500 lines in OOPS)
- Categories, filters, R2 integration
- Decision: Start in ONEstore, split if complex

### 🤔 Preset Store  
- Theme presets vs user presets
- Might be cleaner separate
- Decision: Wait until implementing

### 🤔 Theme Store
- UI theme state
- Could be in workspace actor
- Decision: Add to workspace first

---

## What Stays Local (Not in Store)

### ✅ Keep Local
- Drag states (temporary UI)
- Modal open/closed
- Form inputs (before save)
- Hover states
- Animation states

### ❌ Goes in Store
- Selected elements
- Tool states
- Panel visibility
- Any shared data

---

## Naming Decisions Made

### ✅ Good Names
- `currentView` (not activeLayout - PTSD)
- `elements` (not canvasElements)
- `selectedElement` (singular, not plural)

### 🤔 Still Deciding
- Should we namespace actions? (designer.select vs selectElement)
- Prefer short names? (elements vs projectElements)

---

## Integration Points

### Direct Access Pattern
```typescript
const { selectedElement, selectElement } = useONEstore();
// No props! No events! Direct calls!
```

### ONEconnect Integration
- Subscribe via: `data-subscriptions: ["designer.selectedElement"]`
- Actions via: `data-actions: { onClick: "selectElement" }`

---

## Notes

- Started minimal - add only as needed
- No duplicate state management
- Everything typed with TypeScript
- DevTools shows all state changes
- Zero events architecture working!