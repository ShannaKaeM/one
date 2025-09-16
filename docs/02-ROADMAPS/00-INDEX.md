# ONE Project Audit Checklist

**Purpose**: Central control document to prevent drift and maintain consistency across sessions

---

## Numbering System

- **00.xx** - Index and control documents
- **01.xx** - Systems and core setup
- **02.xx** - (Reserved for components - not numbered yet)
- **03.xx** - (Reserved for features - not numbered yet)
- **FEATURES/** - Feature guides folder (files not numbered yet)

All numbered files stay at the roadmap folder level - no subfolders.

---

## Pre-Session Audit Checklist

Before starting any session, verify:
- [ ] Review this INDEX for current state
- [ ] Check line counts match (± 10% is ok, more = investigate)
- [ ] Verify no unauthorized changes to core systems
- [ ] Confirm CSS architecture hasn't drifted

**Drift Detection**: If line counts have changed significantly, review the file to understand what was added/removed.

---

## Current Architecture State

### 00.00-DOCS ✅
**Purpose**: Documentation philosophy guide
- How to write modular docs
- Single source of truth principles
- What to include/exclude
- **Type**: Guide document

### 00-INDEX (this file) ✅
**Purpose**: Master audit checklist and control document
- Pre-session drift prevention
- Architecture state tracking
- Protection rules and protocols
- **Type**: Index/outline document

### 00.01-ONE ✅  
**Purpose**: Overall project roadmap and planning
- Vision and goals for ONE project
- Build order and priorities
- Key patterns and principles
- **Type**: Planning/roadmap document

### 01.00-INDEXcss ✅
**File**: `/src/index.css` (~26 lines)
- Base styles use viewport units (vh/vw)
- Theme overrides to percentages
- No hidden CSS

### 01.01-APPtsx ✅
**File**: `/src/App.tsx` (48 lines)
- Theme loading with ONEconnect
- Component and store registration

### 01.02-COREsystems ✅
**Purpose**: Infrastructure and config files
- React 19 + TypeScript (built-in)
- Vite build system
- Root-level config files
- **Type**: Documentation only

### 01.03-ONEstore ✅
**File**: `/src/stores/ONEstore.ts` (124 lines)
- 3 actors pattern (Designer, Workspace, Projects)
- Direct store access

### 01.04-ONEconnect ✅
**Files**: `/src/SYSTEMS/one-connect/` (206 lines)
- `ONEconnect.tsx` - Main orchestration
- `storeConnector.ts` - Store connections  
- `types.ts` - TypeScript interfaces
- `index.ts` - Barrel export

### 01.05-THEMEprocessor ✅
**Files**: `/src/SYSTEMS/theme-processor/` (169 lines)
- `ThemeProcessor.ts` - JSON to CSS
- `types.ts` - Theme types
- `index.ts` - Barrel export

### 01.06-GIT ✅
**Purpose**: Version control workflow guide
- Local and GitHub sync process
- Commit message format
- Common commands and troubleshooting
- **Type**: Documentation only

---

## CSS Architecture Rules

### Base Styling (index.css)
```css
html, body, #root { width: 100vw; height: 100vh; }
.loading { display: grid; place-items: center; height: 100vh; }
```

### Theme Override Pattern
1. Base uses viewport units (vh/vw)
2. Theme overrides to percentages (100%)
3. Components fill their grid areas
4. Presets can override back to vh/vw

### NO Hidden CSS
- No App.css
- No component-specific CSS files
- All styles from theme or inline

---

## Features Status

### Implemented
1. **Auto Grid System** - a-z area assignment
2. **Theme Processor** - JSON to CSS
3. **ONE Component** - Universal building block
4. **Store Pattern** - 3 actors architecture

### In Progress
1. **Virtual Components** - Define UI in theme JSON
2. **Preset System** - Apply as data vs CSS

### Planned
1. **Layout Switcher** - Using ONE components
2. **Icon System** - Theme-driven icons
3. **Component Registry** - ONE with different names

---

## Protection Rules

### NEVER Change Without Permission
1. `/src/SYSTEMS/` - Core orchestration
2. `/src/STORES/ONEstore.ts` - State structure
3. `/src/index.css` - Base styles
4. Folder structure (UPPERCASE for systems)

### Always Maintain
1. ONE component philosophy
2. Theme-driven architecture
3. Grid-only layouts (no flexbox)
4. Store-first data flow

---

## Session Start Protocol

1. **Read this INDEX first**
2. **Verify file locations match**
3. **Check for unauthorized changes**
4. **Update this INDEX if implementing new features**
5. **Document in individual roadmaps**

---

*Last Updated: 2025-01-16*
*Next Audit Required: Before any code changes*