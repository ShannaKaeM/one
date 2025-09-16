# Fresh Store Refactor

**Goal**: One clean store with 3 actors instead of 7 messy stores

---

## 🚨 IMPORTANT RULES FOR AGENTS

1. **Keep docs simple** - No fluff, no metrics, no walls of text
2. **Get permission before changing code** - ALWAYS ask first  
3. **Follow the user's lead** - Give quick high-level answers first, wait for them to ask for more details
4. **ASK for names** - ALWAYS ask what to name files, folders, stores, etc. User likes ALL CAPS for folders
5. **DELETE don't comment** - When removing code, DELETE it completely. Don't leave commented code

---

## 🔖 Important Bookmarks

### Current State (Multiple layouts issue)
- **Branch**: [`pre-store-refactor-state`](https://github.com/ShannaKaeM/studio1/tree/pre-store-refactor-state)
- **Commit**: `928c68a` - "refactor: Begin component-to-theme migration with LayoutSwitcher"
- **Local Reference**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/S1-REF-SITES/OOPS-STORS/`

### Reference State (Before store refactor began)  
- **Commit**: [`f4cfa52`](https://github.com/ShannaKaeM/studio1/commit/f4cfa52) - "docs: Add store architecture guides and refactor plan"
- This is right before we started the big store changes
- **Local Reference**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/S1-REF-SITES/before-store-refactor/`

---

## The 3 Actors

### 1. Designer (What the user does)
- Current tool
- Selected elements
- Copy/paste clipboard
- Undo/redo history
- User preferences

### 2. Workspace (UI dashboard & tools)
- Active layout (dashboard, canvas-only, etc)
- Panel states (collapsed/expanded)
- Grid on/off
- Snap settings
- Zoom level
- Component assignments (what goes where)

### 3. Projects (Everything we save/load)
- Canvas elements
- Library items (images, components)
- Presets (colors, layouts, styles)
- Project metadata
- Export settings

---

## The Plan

### Step 1: Create the New Store
```javascript
// One store to rule them all
const use1store = create({
  designer: { ... },
  workspace: { ... },
  projects: { ... }
})
```

### Step 2: Move Components Over (One at a time)
1. Start with something simple (like Icon)
2. Update it to use new store
3. Test it works
4. Move to next component
5. Delete old store code as we go

### Step 3: Make Everything Preset-Driven
- No hardcoded paths
- No special cases for "dashboard-layouts"
- Just: "get me presets.whatever.i.want"

---

## Order of Attack

### Phase 0: Clean House ✅ COMPLETED
1. Deleted all old store files
2. Removed store imports from components
3. App is broken - that's ok!

### Phase 0.5: Final Cleanup ✅ COMPLETED  
1. Removed ALL store code from components
2. Clean slate achieved

### Phase 0.75: Layout System Removal ✅ COMPLETED
1. Deleted processThemeStructure.ts
2. Deleted layoutBuilder.ts
3. Simplified OneConnect.tsx
4. Removed all component registrations
5. Cleared dataComponentsMap

⚠️ **TODO**: Check components for any remaining commented store code and DELETE it

### Phase 1: Foundation
1. Create new 1store.ts file (note: using "1" to be completely distinct from old oneStore)
2. Set up the 3 sections
3. Add basic actions

### Phase 2: Test with One Component
1. Pick Toolbar (it's already generic)
2. Make it use new store
3. Verify it works

### Phase 3: Migration Wave 1 (Simple Components)
- Icon
- Sidebar  
- Header
- Any other simple ones

### Phase 4: Migration Wave 2 (Complex Components)
- DirectRenderer
- LayerTree
- Library
- Editors

### Phase 5: Cleanup
- Delete all old stores
- Remove old imports
- Celebrate 🎉

---

## What We Keep

- ONE-CONNECT system (it's good)
- Theme structure (just make it work with ANY path)
- Component files (just update their store usage)

## What We Toss

- All 7 current stores
- Hardcoded path checks
- Legacy event handlers
- Store-specific utils

---

## Current Status

**Where we are**: Ready to start Phase 1 - Create the new 1store

**What's been done**:
- All old stores deleted
- Layout system removed  
- Component registry cleared
- Clean slate achieved

**Backups available at**:
- Branch: `pre-store-refactor-state`
- Local: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/S1-REF-SITES/OOPS-STORS/`

---

*Remember: This is about making the code match your vision - data-driven, preset-powered, no hardcoded assumptions*