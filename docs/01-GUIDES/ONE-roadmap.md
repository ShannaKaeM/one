# ONEnew - Let's Build This Thing

**Goal**: Fresh Studio1 with all OOPS innovations, built clean from the start

---

## 📁 Reference Projects

- **Original**: `~/Local Drive Mac/mi agency/miApps/studio1/docs`
- **OOPS-STORS2**: `~/Local Drive Mac/mi agency/miApps/BACKUP/STUDIO-ONE/S1-REF-SITES/OOPS-STORS2/docs`
- **Current ONE**: `~/Local Drive Mac/mi agency/miApps/ONE/docs`

---

## 🚨 AGENT RULES - MUST FOLLOW

1. **ASK FIRST** - Always get permission before creating/changing code
2. **NEVER COMMIT** - Do NOT commit unless explicitly asked
3. **SIMPLE DOCS** - No fluff, metrics, or walls of text
4. **USER LEADS** - Follow their direction, don't assume
5. **ASK NAMES** - Always ask what to name things (likes ALL CAPS folders)
6. **DELETE, DON'T COMMENT** - Remove code completely
7. **NO HARDCODING** - Everything must be dynamic
8. **GRID ONLY** - CSS Grid with a-z areas, NEVER flexbox
9. **ARCHITECTURE HIERARCHY** - Try in this order:
   - ONEconnect first (theme-driven features)
   - ONEstore second (shared state/logic)
   - Utils third (pure functions only)
   - App.tsx last resort (initialization only)

---

## Where We Are Now

✅ **Documentation Phase Complete**
- All major components documented
- Innovations captured (Loop, Auto Grid, ONEconnect)
- Utils audited
- Ready to build

---

## What We're Building

**ONE** = Clean, modular visual builder with:
- ONEstore (single source of truth)
- ONEconnect (magic component wiring)
- Pure CSS Grid (a-z auto areas)
- Loop pattern (universal UI components)

---

## Build Order (Simple → Complex)

### Step 1: Foundation
- [X] Create ONEstore
- [X] Basic App.tsx setup
- [X] Verify store connection

### Step 2: Core Systems ✅ COMPLETE!
- [X] **ONEconnect** (208 lines)
  - [X] Create `/src/systems/one-connect/` folder
  - [X] Build minimal version with:
    - Basic theme reading ✅
    - Store connection ✅
    - Single component rendering ✅
    - Built-in getGridArea() function ✅
    - Built-in generateComponentId() ✅
  - [X] Reference OOPS-STORS original
  - [X] Keep under 200 lines total (208 - close!)
- [X] **Theme processor** (169 lines)
  - [X] Port minimal version from OOPS
  - [X] JSON to CSS conversion
  - [X] Grid layout support
  - [X] Created ui-theme.json and one-theme.json
- [X] **Remove test code**:
  - [X] `/src/App.tsx` - Clean placeholder ready for components
  - [X] `/src/App.css` - Minimal styles only
  - [X] Keep `/src/index.css` - Global resets preserved

### Step 3: Basic Components (Foundation)
- [ ] **Sidebar** - Simple navigation component
- [ ] **Header** - Top bar with title
- [ ] **DirectRenderer** - Canvas for elements
- [ ] **Test Integration** - Connect all with ONEconnect

### Step 4: Advanced Features (Later)
- [ ] Loop & LoopItem - Universal component pattern
- [ ] Icon system
- [ ] Layout switcher
- [ ] Properties panel
- [ ] Layer tree
- [ ] More components as needed

### Step 5: Missing Systems (Add if Needed)
- [ ] Error Boundaries (important for production)
- [ ] Custom hooks folder (for shared logic)
- [ ] Router (only if multi-page needed)
- [ ] API service layer (if R2Manager not enough)

---

## Key Patterns to Use

1. **ONEstore** - 3 actors (Designer, Workspace, Projects)
2. **Auto Grid** - Everything uses CSS Grid with a-z areas
3. **Loop Pattern** - One component for all lists/toolbars
4. **Direct Store Access** - No props, no events

---

## Next Action

**Create Basic Components** - Build foundation UI components

### Current Status:
✅ **Core Systems Complete**:
- ONEstore (3 actors pattern)
- ONEconnect (orchestration)
- Theme Processor (JSON → CSS)
- Test code removed

### Next Steps:
1. Create `/src/components/` folder structure
2. Build Sidebar component (simple nav)
3. Build Header component (title bar)
4. Test with ONEconnect integration
5. Add DirectRenderer when ready

---

*Simple plan. Clear path. Let's go.*