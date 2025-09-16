# Fresh Start Roadmap: Building Studio1 Right

**Goal**: Build Studio1 from scratch with proper architecture, incorporating all innovations from OOPS

---

## 📁 Important Resources

### Pre-STORS Project (Original)
- **Path**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/studio1/docs`
- **Key docs**: Original implementation, base elements, architecture patterns

### Post-STORS Project (With Zustand)
- **Path**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/OOPS-STORS/docs`
- **Key docs**: Store refactors, ONE-CONNECT implementation, component migrations

### Current Project (Fresh Start)
- **Path**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/ONE/docs`
- **Key docs**: This roadmap, innovations guide, clean implementation

---

## 🚨 IMPORTANT RULES FOR AGENTS

1. **Keep docs simple** - No fluff, no metrics, no walls of text
2. **Get permission before changing code** - ALWAYS ask first  
3. **Follow the user's lead** - Give quick high-level answers first, wait for them to ask for more details
4. **ASK for names** - ALWAYS ask what to name files, folders, stores, etc. User likes ALL CAPS for folders
5. **DELETE don't comment** - When removing code, DELETE it completely. Don't leave commented code

---

## 🎯 Vision

Build a clean, modular Studio1 with:
- Single unified store (1store)
- ONE-CONNECT orchestration
- Universal Bento Grid (a-z)
- Zero-event architecture
- Modular components
- Theme-driven everything

---

## 📋 Phase 1: Project Setup

### 1.1 Create Fresh Project
- [ ] **ASK USER**: What to name the new project folder?
- [ ] Create new Vite + React + TypeScript project
- [ ] **ASK USER**: Folder structure preferences (ALL CAPS?)
- [ ] Set up initial directory structure

### 1.2 Dependencies
- [ ] Zustand for state management
- [ ] TypeScript configured properly
- [ ] **ASK USER**: Any other core dependencies?

### 1.3 Core Folders
- [ ] `/src/COMPONENTS/` - Modular components
- [ ] `/src/STORES/` - 1store location
- [ ] `/src/SYSTEMS/` - ONE-CONNECT, theme processor
- [ ] `/src/UTILS/` - Shared utilities
- [ ] **ASK USER**: Confirm folder names and structure

---

## 🔍 Component Analysis & Store Planning

### Review Process (Do This First!)
Before creating ONEstore, for each component:
1. **Check both projects**: What worked? What didn't?
2. **Identify state needs**: What data does it actually need?
3. **Question everything**: Is this the right approach?
4. **Plan connections**: How will it connect to other components?

### Component Review Checklist
- [ ] **Icon**: Simple display, preset-driven
- [ ] **IconBar**: Container for icons, layout patterns
- [ ] **Sidebar**: Grid area container
- [ ] **Header**: Composable title/actions
- [ ] **Accordion**: Expand/collapse state
- [ ] **InputBar**: Form input patterns
- [ ] **Canvas**: Selection, elements, tools
- [ ] **Library**: Items, filters, drag source
- [ ] **LayerTree**: Hierarchy, selection sync
- [ ] **LayoutSwitcher**: View modes

### Store Planning Questions
- What state is truly shared vs local?
- What naming makes sense (not "activeLayout" PTSD)?
- What can be derived vs stored?
- What belongs in each actor (Designer/Workspace/Projects)?

---

## 🏗️ Phase 2: Core Systems

### 2.1 Create ONEstore
- [ ] **ASK USER**: Confirm name "ONEstore.ts"?
- [ ] Implement 3 actors structure:
  ```typescript
  {
    designer: { /* user actions */ },
    workspace: { /* UI state */ },
    projects: { /* data */ }
  }
  ```
- [ ] Add TypeScript types
- [ ] Add devtools support

### 2.2 ONE-CONNECT System
- [ ] **ASK USER**: Keep name "ONE-CONNECT" or prefer different?
- [ ] Port core orchestration logic from OOPS
- [ ] Update to work with 1store
- [ ] Create clean types/interfaces

### 2.3 Theme System
- [ ] Runtime theme processor
- [ ] Pure JSON → CSS generation
- [ ] Support for both UI and ONE themes
- [ ] Bento grid areas (a-z)

### 2.4 Component Registry
- [ ] Simple registration system
- [ ] Support for data-component mapping
- [ ] Preset target system

---

## 🧩 Phase 3: Modular Components

### Component Building Order (Simple → Complex)

#### 3.1 Foundation Components
1. **Icon**
   - [ ] **ASK USER**: Component file naming convention?
   - [ ] Pure display component
   - [ ] Preset-driven styling
   - [ ] Test ONE-CONNECT integration

2. **IconBar** 
   - [ ] Generic toolbar container
   - [ ] Accepts icon children
   - [ ] Grid-based layout
   - [ ] Reusable for any toolbar

3. **Sidebar**
   - [ ] Generic container
   - [ ] Grid area support
   - [ ] Theme-driven styling

#### 3.2 Interactive Components
4. **Header**
   - [ ] Title + icon + actions
   - [ ] Composable structure
   - [ ] Used in panels

5. **Accordion**
   - [ ] Expandable sections
   - [ ] Store state for expanded
   - [ ] Smooth animations

6. **InputBar**
   - [ ] Label + input pattern
   - [ ] Store integration for values
   - [ ] Preset-driven styling

#### 3.3 Complex Components
7. **Canvas** (DirectRenderer)
   - [ ] **ASK USER**: Split into modules or single file?
   - [ ] Element rendering
   - [ ] Selection system
   - [ ] Grid/snap support
   - [ ] Store integration

8. **Library**
   - [ ] Grid display
   - [ ] R2 integration
   - [ ] Drag to canvas
   - [ ] Category filtering

9. **LayerTree**
   - [ ] Hierarchical display
   - [ ] Drag reordering
   - [ ] Selection sync
   - [ ] Visibility/lock controls

10. **LayoutSwitcher**
    - [ ] Dynamic layouts
    - [ ] Icon or text mode
    - [ ] Store integration

---

## 🔧 Phase 4: Utilities & Integration

### 4.1 Essential Utilities
- [ ] R2 Manager (storage)
- [ ] Storage Manager (local)
- [ ] Preset Manager
- [ ] Element Renderer

### 4.2 Theme Files
- [ ] Port ui-theme.json
- [ ] Port one-theme.json
- [ ] Clean up structure
- [ ] Apply Bento grid

### 4.3 Worker Integration
- [ ] R2 worker for storage
- [ ] Asset handling
- [ ] Library operations

---

## 🚀 Phase 5: Features & Polish

### 5.1 Core Features
- [ ] Element creation
- [ ] Selection system
- [ ] Copy/paste
- [ ] Undo/redo
- [ ] Save/load projects

### 5.2 Advanced Features
- [ ] Group/ungroup
- [ ] Multi-selection
- [ ] Keyboard shortcuts
- [ ] Export system

### 5.3 Polish
- [ ] Performance optimization
- [ ] Error boundaries
- [ ] Loading states
- [ ] Accessibility

---

## 📊 Success Criteria

1. **Clean Architecture**
   - Single store with clear organization
   - No event listeners
   - Components under 400 lines
   - Clear separation of concerns

2. **All Innovations Applied**
   - Bento grid everywhere
   - ONE-CONNECT orchestration
   - Flat element architecture
   - Zero-event patterns

3. **Modular & Maintainable**
   - Each component in own folder
   - Clear interfaces
   - Reusable patterns
   - Well-typed with TypeScript

---

## 🗓️ Estimated Timeline

- **Phase 1**: 1 day (Setup)
- **Phase 2**: 3-4 days (Core systems)
- **Phase 3**: 2 weeks (Components)
- **Phase 4**: 3-4 days (Integration)
- **Phase 5**: 1 week (Features & polish)

**Total**: ~4 weeks for complete fresh build

---

## 🎉 End Result

A clean, modern Studio1 with:
- Proper architecture from the ground up
- All components built the right way
- Ready for future features
- Maintainable codebase
- No technical debt

---

## 📝 Notes

- Always ask for naming decisions
- Get approval before creating files
- Keep components focused and small
- Apply patterns consistently
- Document as we build