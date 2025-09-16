# App-RM (App.tsx Roadmap)

## Implementation Status

### ✅ Completed (Phase 1)
- [x] Create minimal App.tsx (45 lines)
- [x] Connect to ONEstore 
- [x] CSS Grid container (area 'a')
- [x] Test UI with store toggles
- [x] NO flexbox - pure grid
- [x] NO hardcoding
- [x] NO local state

### 🔄 Next Tasks (Phase 2: Theme)
- [ ] Add runtimeThemeProcessor
- [ ] Load UI theme JSON
- [ ] Apply grid from theme
- [ ] Remove test UI code

### 📋 Future Tasks
**Phase 3: ONEconnect**
- [ ] Import ONEconnect
- [ ] Component registration
- [ ] Pass theme & stores
- [ ] Auto-render components

**Phase 4: Production**
- [ ] Real grid areas (a-z from theme)
- [ ] Full dashboard layout
- [ ] Layout switching

### 🧹 Cleanup Tasks
- [ ] Replace `/src/App.tsx` test UI
- [ ] Replace `/src/App.css` with theme styles
- [ ] Keep `/src/index.css` (global resets only)

---

## Current State

**Location**: `/src/App.tsx`  
**Size**: 45 lines (minimal test version)  
**Purpose**: Root component - dashboard frame

**What it does now**:
- Shows project name from store
- Toggle buttons for grid/snap
- View switching buttons
- Verifies store connection

---

## Avoid Duplicates/Issues

### ❌ Don't Copy from OOPS
- 20+ event listeners
- Separate UIstore/appStore 
- appState object
- Complex initialization
- Console.logs everywhere
- processThemeStructure in App

### ✅ Keep It Simple
- Just ONEstore
- Theme-driven layout
- Direct store access
- Add only as needed

---

## Key Concepts

**App = Dashboard Frame**
- Root container for entire app
- Defines master grid layout  
- Theme JSON provides grid structure
- ONEconnect fills grid areas

**Data Flow**:
```
index.tsx → App.tsx → Theme → Grid → ONEconnect → Components
```

---

## Dependencies

### Current
- ONEstore ✅
- React ✅

### To Add
- runtimeThemeProcessor (Phase 2)
- ONEconnect (Phase 3)
- Component registry (Phase 3)

### Maybe Later
- Theme loading state
- Layout from theme
- Error boundaries

---

## Notes

- Test code is temporary
- Real layout comes from theme
- This IS the dashboard outer frame
- Start minimal, grow as needed