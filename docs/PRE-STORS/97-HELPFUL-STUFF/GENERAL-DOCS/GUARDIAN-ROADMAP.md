# Guardian Roadmap

## What is Guardian?
Guardian is a visual documentation system that protects the integrity of any document-based system. Currently focused on Studio1.

## Development Approach
- **One Roadmap Doc** - No extra index, readme type docs
- **Use Session Logs** - Session logs capture implementation details
- **Keep It Simple** - No long-term made up planning or success metrics
- **Short Term Planning** - Develop features organically as needed
- **Don't Make Stuff Up** - Follow the developer's lead
- **Extended Planning** - Keep as simple bullets at the end of sections

---

## SECTION 1: THE REACT APPLICATION

### Current Architecture
Guardian uses Studio1's proven architecture:
- **UIGenerator** - Converts ui-theme.json to React components
- **DirectRenderer** - Renders one-theme.json elements on canvas
- **RuntimeThemeProcessor** - Processes both themes to CSS
- **GuardianApp.tsx** - Main app orchestrator

### Dashboard Features
✅ **Working Now:**
- Canvas with drag, drop, select, move
- Layer Tree for element hierarchy  
- Grid overlay with snap-to-grid toggle
- Multi-selection (Shift+click, drag lasso)
- Group/Ungroup functionality
- Add Wrapper, Text, Image elements
- Dual theme system (UI + ONE)

🔄 **In Progress:**
- Syncing with Studio1 (currently matched 100%)
- Continue developing both dashboards together

📋 **Next Features:**
- Documentation viewer component
- Link elements to documentation
- Visual relationship mapping
- Doc Editing
- Doc library with filtering

---

## SECTION 2: THE DOMAIN SYSTEM

### What Guardian Protects
**S1-DOMAINS/** - The actual Studio1 domain documentation that Guardian agents review and protect. Single source of truth, DRY, composable docs.

### Agent Hierarchy

#### 1. Element Guardians (55 total)
One agent per single elemental domain. Each guards ONE specific doc-based element.

**Status**: ✅ All 55 files created with basic template

**Categories:**
- ARCHITECTURE (8): coco, copa, dafa, duta, flac, pace, pasc, thel
- CANVAS (11): cana, drag, evep, grid, grou, grof, inte, layh, layo, layt, muls  
- CORE (5): aied, bavc, onep, seav, trcc
- DESIGN-SYSTEM (8): cloc, cssp, grol, grps, hslv, nofl, pros, stvs
- ELEMENTS (4): data, elcp, elns, elty
- PRESETS (5): help, prca, prco, prmx, smpr
- TRANSFORMER (14): comp, coma, cosl, edmw, flca, flvc, ince, jsts, plsy, prin, reip, safl, slvr, teun

#### 2. Group Coordinators (To Define)
Combine Element Guardians + add relationship documentation.

**Examples to create:**
- **Framework Group**: onep + trcc + seav + framework relationships
- **Theme Group**: duta + thel + pasc + orchestration patterns
- **Canvas Group**: All canvas elements + interaction patterns

**Purpose**: Document how elements work together for specific purposes (Design Philosophy, Framework, User Workflow)

#### 3. Section Directors (Future)
Major division orchestrators managing Groups within their domain.

#### 4. System Orchestrator (Future)
Ultimate system-level orchestrator managing the entire network.

#### 5. Pat (Traffic Controller)
✅ Already exists - routes requests to appropriate guardians.

### Current Workflow
1. User proposes change
2. Pat routes to Element Guardian(s)
3. Guardians review their domains
4. Responses collected
5. Conflicts escalate to user

---

## Current Focus
1. Fix canvas header buttons in Guardian to match Studio1
2. Complete Element Guardian content (use domain docs as source)
3. Define first Group Coordinators with relationship docs