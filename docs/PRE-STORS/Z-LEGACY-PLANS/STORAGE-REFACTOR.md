# Unified Refactor Roadmap

## Two Parallel Tracks

### Track 1: ONE-CONNECT Refactor (Other Agent)
**Goal**: Component refactoring and state management
**Branch**: `feature/one-connect-refactor`

### Track 2: Supabase + Cloudinary (This Agent)  
**Goal**: Auth, storage, and media management
**Branch**: `feature/supabase-integration`

---

## Current Status

### ✅ Completed (Not Committed)

**ONE-CONNECT Files**: See `FINAL-ONE-CONNECT-REFACTOR.md`

**Our Files Created**:
```
src/utils/supabase.ts                          ✅
src/utils/supabaseStorage.ts                   ✅
src/utils/cloudinaryManager.ts                 ✅
src/components/visual-editor/DesignerControls.tsx ✅
src/components/visual-editor/LightroomEditor.tsx  ✅
src/hooks/useAuth.ts                           ✅
.env.local (updated)                           ✅
```

**NPM Installed**:
- @supabase/supabase-js
- @cloudinary/url-gen  
- @cloudinary/react

---

## Implementation Phases

### Phase 1: Foundation Setup ✅
**ONE-CONNECT Team**:
- Build ONE-CONNECT core
- Test with simple component

**Supabase Team**:
- [x] Create Supabase files
- [x] Create Cloudinary manager
- [ ] Create accounts when ready

### Phase 2: Core Components
**ONE-CONNECT Team**:
- Split DirectRenderer
- Connect to stores

**Supabase Team**:
- Add auth components
- Test integration

### Phase 3: Library Component (HANDOFF POINT)
**Step 1**: ONE-CONNECT refactors Library structure
**Step 2**: Handoff to Supabase team
**Step 3**: Supabase migrates to cloud storage

### Phase 4: Integration
**Both Teams**:
- App.tsx coordination
- Test full system

### Phase 5: Final Polish
- Enable auth
- Ship complete app

---

## File Ownership

### They Own
```
src/components/one-connect/*
src/components/direct-renderer/*
src/components/layertree/*
```

### We Own
```
src/utils/supabase.ts
src/utils/supabaseStorage.ts
src/utils/cloudinaryManager.ts
src/components/auth/*
src/components/visual-editor/*
src/hooks/useAuth.ts
```

### Shared (Coordinate)
```
src/App.tsx                 (use sections)
src/components/Library.tsx  (Week 3 handoff)
src/stores/*                (coordinate changes)
```

---

## Next Steps

### Immediate (When Ready)
1. [ ] Create Supabase account
2. [ ] Create Cloudinary account  
3. [ ] Add keys to .env.local
4. [ ] Test basic integration

### Current Priority
- [ ] Commit our changes
- [ ] Coordinate with ONE-CONNECT team
- [ ] Test parallel development

---

## Features Added

### Authentication
- Login/signup/logout
- Project persistence
- User isolation

### Media Management  
- Cloudinary uploads
- AI transformations
- Video editing
- Designer controls (not prompts)
- Lightroom-style editor

### Integration
- Progressive enhancement
- LocalStorage fallback
- Feature flags

---

*One roadmap, two tracks, unified goal*
