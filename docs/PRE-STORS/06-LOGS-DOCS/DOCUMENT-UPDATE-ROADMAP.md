# Document Update Roadmap - Studio1 Domain Documentation System
**Created:** 2025-08-27  
**Purpose:** Define documentation structure for base-domains and groups following guardian protection principles  
**Status:** Planning Document

---

## 🎯 Overview

This roadmap outlines the documentation updates needed to complete Studio1's domain-based documentation system. Each document should follow the Base-Domain structure with proper metadata headers. Guardian protection integration will be addressed as the final phase after all documentation is complete.

---

## 📋 Documentation Structure

### Metadata Template (Required for All Docs)
```yaml
---
type: BASE-DOMAIN
category: [ARCHITECTURE|CANVAS|CORE|DESIGN-SYSTEM|ELEMENTS|PRESETS|TRANSFORMER]
status: [COMPLETE|IN-PROGRESS|NEEDS-UPDATE|NEW]
source: [reference-file.md#line]
related: [related-atoms]
---
```

---

## 🔴 CRITICAL CORE DOCUMENTS (Priority 1)

These foundational concepts must be crystal clear as they govern the entire system:

### CORE Category (5 docs)
1. **one-element-philosophy.md** ✅ EXISTS
   - Status: Needs clarity on export principles
   - Critical: Agents frequently violate this principle

2. **base-variable-constraint.md** ✅ EXISTS  
   - Status: Needs violation examples
   - Critical: Most common agent error source

3. **self-applying-variables.md** ✅ EXISTS
   - Status: Needs review for clarity
   
4. **ai-era-design.md** ✅ EXISTS
   - Status: Needs base-domain structure

5. **element-layers-pattern.md** ❌ NEW NEEDED
   - Content: How layers work within single ONE elements
   - Note: Extract from transformer concept

---

## 🟡 ARCHITECTURE DOCUMENTS (Priority 2)

System-level patterns that connect components:

### ARCHITECTURE Category (8 docs)
1. **dual-theme-architecture.md** ✅ EXISTS
   - Needs: Clear separation rules between UI and ONE themes

2. **data-flow-architecture.md** ✅ EXISTS
   - Needs: Event system documentation

3. **component-communication.md** ✅ EXISTS
   - Needs: CustomEvent patterns

4. **parent-child-relationships.md** ✅ EXISTS
   - Needs: Group system integration

5. **theme-loading-sequence.md** ✅ EXISTS
   - Needs: Runtime processor details

6. **css-prefix-separation.md** ✅ EXISTS
   - Needs: ui- vs clean naming rules

7. **flat-ui-react-pattern.md** ✅ EXISTS
   - Needs: UIGenerator patterns

8. **parent-scope-pattern.md** ✅ EXISTS
   - Needs: CSS variable scoping

---

## 🟢 DESIGN-SYSTEM DOCUMENTS (Priority 3)

Visual and layout rules:

### DESIGN-SYSTEM Category (8 docs)
1. **grid-only-layout.md** ✅ EXISTS
   - Critical: No flex rule enforcement

2. **universal-grid-system.md** ✅ EXISTS
   - Needs: a-z grid area documentation

3. **hsl-value-system.md** ✅ EXISTS
   - Needs: Color calculation rules

4. **proportional-sizing.md** ✅ EXISTS
   - Needs: Mathematical scaling formulas

5. **class-order-cascade.md** ✅ EXISTS
   - Needs: Preset mixing rules

6. **css-property-pattern.md** ✅ EXISTS
   - Needs: Variable mapping

7. **structure-vs-styling.md** ✅ EXISTS
   - Needs: Clear separation

8. **no-flex-philosophy.md** ❌ NEW NEEDED
   - Content: Why grid-only approach

---

## 🔵 CANVAS SYSTEM DOCUMENTS (Priority 4)

Visual builder functionality:

### CANVAS Category (11 docs)
1. **canvas-architecture.md** ✅ EXISTS
   - Needs: DirectRenderer integration

2. **drag-drop-system.md** ✅ EXISTS
   - Needs: Library integration

3. **multi-selection-pattern.md** ✅ EXISTS
   - Needs: Shift+click, lasso details

4. **group-structure.md** ✅ EXISTS
   - Needs: Parent-child management

5. **layer-hierarchy.md** ✅ EXISTS
   - Needs: Z-index management

6. **grid-snap-system.md** ✅ EXISTS
   - Needs: 20px/100px snap rules

7. **event-pattern.md** ✅ EXISTS
   - Needs: Complete event list

8. **selection-handles.md** ❌ NEW NEEDED
   - Content: 8-direction resize, pink styling

9. **hotkey-system.md** ❌ NEW NEEDED
   - Content: S, T, C, etc. floating panels

10. **layer-tree-component.md** ✅ EXISTS
    - Needs: Sidebar functionality

11. **layer-operations.md** ✅ EXISTS
    - Needs: Layer management

---

## 🟣 ELEMENT DOCUMENTS (Priority 5)

Core ONE element system:

### ELEMENTS Category (4+ docs)
1. **element-types.md** ✅ EXISTS
   - Needs: Universal 'one' type only

2. **element-naming-system.md** ✅ EXISTS
   - Needs: Auto-naming rules

3. **element-creation-pattern.md** ✅ EXISTS
   - Needs: Canvas button integration

4. **data-attributes.md** ✅ EXISTS
   - Needs: data-label usage

---

## 🟠 PRESET DOCUMENTS (Priority 6)

Styling and transformation system:

### PRESETS Category (5+ docs)
1. **preset-concept.md** ✅ EXISTS
   - Needs: Toggleable presets

2. **preset-categories.md** ✅ EXISTS
   - Needs: 9 category system

3. **preset-mixing.md** ✅ EXISTS
   - Needs: Combination rules

4. **smart-presets.md** ✅ EXISTS
   - Needs: Context-aware presets

5. **helper-classes.md** ✅ EXISTS
   - Needs: Position helpers (a-z)

---

## 🟤 TRANSFORMER DOCUMENTS (Priority 7)

Advanced component transformation:

### TRANSFORMER Category (14 docs)
- Most exist but need updates for latest flat ONE element discoveries
- Focus on content slots, JSON hydration, edit mode workflows

---

## 📦 GROUP COORDINATORS (Priority 8)

After base elements are complete, create group documents that show relationships:

### Suggested Groups:
1. **Theme System Group**
   - Elements: dual-theme + theme-loading + css-prefix + parent-scope
   - Relationships: How themes load and separate

2. **Grid System Group**
   - Elements: grid-only + universal-grid + grid-snap + proportional
   - Relationships: Complete grid philosophy

3. **Visual Builder Group**
   - Elements: canvas + drag-drop + multi-selection + group + layer
   - Relationships: Canvas interaction flow

4. **Preset System Group**
   - Elements: concept + categories + mixing + smart
   - Relationships: Preset application flow

5. **Element System Group**
   - Elements: one-philosophy + types + naming + creation + layers
   - Relationships: Element lifecycle

6. **Transformer Component Group** 
   - Elements: content-slots + json-hydration + edit-mode + temporary-ungroup + preset-switching
   - Relationships: How one element transforms into different components
   - Note: This is the GROUP that contains the transformer concept

---

## 🛡️ GUARDIAN INTEGRATION (Priority 9 - Final Phase)

**Note:** Guardian integration comes LAST after all documentation is complete and stable.

### Guardian Implementation Steps:
1. **Assign Guardian Codes** - 4-letter codes for each base element
2. **Create Guardian Agents** - One agent per document to protect concepts
3. **Build Protection Rules** - Violation detection and correction
4. **Test Protection** - Ensure guardians prevent drift
5. **Document Guardian System** - How protection works

Guardian codes reserved for future use:
- CORE: onep, bavc, seav, aied, trcc
- ARCHITECTURE: duta, dafa, coco, pacr, thel, csps, flur, pasc
- DESIGN-SYSTEM: grol, ungs, hslv, pros, cloc, cssp, stvs, nofl
- CANVAS: cana, drag, muls, grou, layh, grid, evep, selh, hotk, layt, layo
- ELEMENTS: elty, elns, elcp, data
- PRESETS: prco, prca, prmx, smpr, help
- TRANSFORMER: (14 codes to be assigned)

---

## 🚀 Implementation Steps (Bottom-Up Approach)

### Phase 1: Base-Domains - Protected by Base Domain Agents
**Goal:** Review and update every base-domain document individually

#### Week 1: CORE Category (5 domains)
1. Review each base domain against Documentation Standards
2. Add proper metadata headers
3. Add violation examples
4. Update implementation references

#### Week 2: ARCHITECTURE Category (8 domains)
1. Apply Base-Domain format to each
2. Clarify relationships
3. Add concrete examples

#### Week 3: DESIGN-SYSTEM Category (8 domains)  
1. Document each rule clearly
2. Show mathematical formulas
3. Add visual examples

#### Week 4: CANVAS Category (11 domains)
1. Update with latest implementation
2. Add missing atoms (selection-handles, hotkey-system)
3. Reference actual component code

#### Week 5: ELEMENTS & PRESETS Categories (9 domains)
1. Finalize element system docs
2. Complete preset documentation
3. Ensure all patterns documented

#### Week 6: TRANSFORMER Category (14 somains)
1. Extract base-domain concepts from transformer idea
2. Document each piece separately
3. Show how they enable transformation

### Phase 2: Group-Domains - Protected by Group Domain Agents
**Goal:** Create group documents showing how atoms work together

#### Week 7-8: Create Groups
1. Theme System Group
2. Grid System Group
3. Visual Builder Group
4. Preset System Group
5. Element System Group
6. Transformer Component Group

### Phase 3: Section-Domains - Protected by Section Domain Agents
**Goal:** Organize groups into domain sections

#### Week 9: Create Section Documents
1. CORE Section
2. ARCHITECTURE Section
3. DESIGN-SYSTEM Section
4. CANVAS Section
5. ELEMENTS Section
6. PRESETS Section
7. TRANSFORMER Section

### Phase 4: Complete System - Protected by Omni Agent
**Goal:** Document the complete system

#### Week 10: System Documentation
1. Create complete system overview
2. Map all cross-domain interactions
3. Document emergent patterns

### Phase 5: Guardian Implementation (Final)
**Goal:** Implement protection after documentation is stable

#### Week 11+: Guardian Integration
1. Create base agents (one per base-domain)
2. Create group agents (coordinate base agents)
3. Create section agents (coordinate groups)
4. Create omni agent (system coordinator)
5. Test protection mechanisms

---

## 📏 Success Criteria

Each document must:
- ✅ Follow Base-Domain structure
- ✅ Have complete metadata header
- ✅ Focus on ONE concept only
- ✅ Include concrete examples
- ✅ Show common violations
- ✅ Reference implementation files

---

## 🔍 Key Insights from Analysis

1. **Documentation mirrors code** - Base element docs like ONE elements
2. **Clear examples essential** - Show what TO do and what NOT to do
3. **Relationships matter** - Group documents show how atoms connect
4. **Living documentation** - Updates as system evolves
5. **Guardian protection** - Added last to protect stable documentation

---

## 📝 Notes

- Original drafts exist in `ORIGINAL-REFERENCE-FOR-BASE-ELEMENTS/`
- Current working docs in `BASE-ELEMENTS-EDITED/`
- Guardian system will be integrated after documentation is stable
- Session logs contain implementation history

This roadmap provides a clear path to complete, well-organized documentation that mirrors the ONE element philosophy in its structure, with Guardian protection as the final protective layer.