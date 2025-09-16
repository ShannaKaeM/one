# Documentation Standards Guide - Studio1 Domain System
**Created:** 2025-08-27  
**Purpose:** Define exact formats for base-domain docs, groups, and sections  
**Status:** Standards Definition

---

## 🎯 Overview

This guide defines the exact format and structure for Studio1's hierarchical documentation system, following a bottom-up approach from base-domains to complete system documentation.

---

## 📋 Document Hierarchy

```
Base-Domains → Group-Domains → Section-Domains → Complete System
     ↓                ↓                 ↓                  ↓
Base Agents    Group Agents    Section Agents      Omni Agent
(Protect ONE   (Coordinate     (Oversee Domain)   (System Guardian)
 concept)       related atoms)
```

---

## 🔵 Base-Domain Format (Protected by Base Domain Agents)

### Required Structure:
```markdown
---
type: BASE-DOMAIN
category: [ARCHITECTURE|CANVAS|CORE|DESIGN-SYSTEM|ELEMENTS|PRESETS|TRANSFORMER]
id: [unique-4-letter-code]
name: [Human Readable Name]
status: [DRAFT|ACTIVE|DEPRECATED]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
dependencies: [list-of-required-atoms]
references: 
  - implementation: [file.tsx#L123-L456]
  - related: [other-atom-ids]
---

# [Number] - [Title] [(CRITICAL|IMPORTANT|STANDARD)]

## Definition
[One paragraph explaining what this base-domain concept is]

## Core Principle
[The single rule or pattern this atom represents]

## Implementation
[How this is implemented in the codebase with specific examples]

### ✅ CORRECT Usage
```[language]
// Example of correct implementation
```

### ❌ INCORRECT Usage (Common Violations)
```[language]
// What agents/developers often do wrong
// WHY this is wrong
// Impact of this violation
```

## Relationships
- **Depends On:** [atom-ids this requires]
- **Enables:** [atom-ids this makes possible]
- **Conflicts With:** [atom-ids that contradict this]

## Guardian Rules
[Specific rules for protecting this concept]

## References
- Implementation: `[file:lines]`
- Tests: `[test-file:lines]`
- Examples: `[example-file:lines]`
```

### Example Base-Domain:
```markdown
---
type: BASE-DOMAIN
category: CORE
id: onep
name: ONE Element Philosophy
status: ACTIVE
created: 2025-01-15
updated: 2025-08-27
dependencies: []
references:
  - implementation: DirectRenderer.tsx#L226-L276
  - related: [bavc, elty]
---

# 01 - ONE Element Philosophy (CRITICAL)

## Definition
Every piece of content in the ONE design system is rendered as a single, self-contained HTML element that contains ALL capabilities - structure, wrapper, typography, image properties - in ONE infinitely flexible element.

## Core Principle
ONE element per piece of content. Always. No wrappers, no containers, no structural divs.

## Implementation
[etc...]
```

---

## 🟢 Group-Domain Format (Protected by Group Domain Agents)

### Required Structure:
```markdown
---
type: GROUP-DOMAIN
category: [Same as constituent atoms]
id: [unique-group-code]
name: [Group Name]
atoms: [list-of-atom-ids]
status: [DRAFT|ACTIVE|DEPRECATED]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
---

# [Group Name]

## Purpose
[Why these atoms work together as a group]

## Constituent Atoms
1. **[atom-id]** - [Brief role in group]
2. **[atom-id]** - [Brief role in group]
[etc...]

## Relationships & Flow
[Detailed explanation of how atoms interact]

### Interaction Diagram
```
[Visual representation of atom relationships]
```

### Data Flow
[How information/control flows between atoms]

## Combined Effect
[What this group enables that individual atoms cannot]

## Common Patterns
[Typical usage patterns when these atoms work together]

## Integration Points
[How this group connects to other groups]

## Guardian Coordination
[How base agents work together for this group]
```

---

## 🟡 Section-Domain Format (Protected by Section Domain Agents)

### Required Structure:
```markdown
---
type: SECTION-DOMAIN
domain: [ARCHITECTURE|CANVAS|CORE|DESIGN-SYSTEM|ELEMENTS|PRESETS|TRANSFORMER]
id: [section-code]
name: [Section Name]
groups: [list-of-group-ids]
atoms: [complete-list-of-atoms]
status: [DRAFT|ACTIVE|DEPRECATED]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
---

# [Domain Name] Section

## Domain Overview
[What this domain encompasses]

## Groups in This Section
[List and brief description of each group]

## Complete Atom Registry
[Table of all atoms in this section with status]

## Domain Principles
[Overarching rules for this domain]

## Cross-Domain Interactions
[How this section relates to other sections]

## Guardian Hierarchy
[Section agent coordinating group agents]
```

---

## 🔴 Complete System Format (Protected by Omni Agent)

### Required Structure:
```markdown
---
type: COMPLETE-SYSTEM
id: studio1-complete
name: Studio1 Complete System
sections: [list-all-sections]
status: [DRAFT|ACTIVE]
version: [X.Y.Z]
---

# Studio1 Complete System Documentation

## System Architecture
[High-level overview]

## Section Registry
[All sections and their relationships]

## Cross-Cutting Concerns
[Patterns that span sections]

## Guardian Network
[Complete agent hierarchy and coordination]
```

---

## 📏 Writing Guidelines

### For All Documents:
1. **One Concept** - Each atom covers exactly ONE concept
2. **Concrete Examples** - Always show real code/usage
3. **Violation Examples** - Show what NOT to do
4. **Clear Dependencies** - Explicit relationships
5. **Implementation Refs** - Point to actual code

### Language Rules:
- **Active Voice** - "The system validates..." not "Validation is performed..."
- **Present Tense** - Document current state
- **Direct** - No fluff, get to the point
- **Specific** - Use exact line numbers, file paths

### Code Examples:
- **Working Code** - Examples should actually run
- **Minimal** - Smallest example that demonstrates concept
- **Annotated** - Comments explain key points
- **Both Ways** - Show correct AND incorrect

---

## 🚫 What NOT to Include

### In Base-Domains:
- Multiple concepts
- Implementation details of other atoms
- Historical information
- Future plans

### In Group-Domains:
- Duplicate atom definitions
- Implementation code (reference atoms instead)
- Unrelated atoms

### In Any Document:
- Temporal language ("now", "new", "updated")
- Marketing language
- Unnecessary adjectives
- Personal opinions

---

## 🔄 Update Process

1. **Edit Atom** → Update `updated` date
2. **Check Dependencies** → Verify still accurate
3. **Update Groups** → Ensure relationships still valid
4. **Notify Guardians** → Agent retraining needed

---

## 🎯 Quality Checklist

Before marking any document as ACTIVE:

### Base-Domain Checklist:
- [ ] Single concept only
- [ ] Has correct/incorrect examples
- [ ] Dependencies listed
- [ ] Implementation referenced
- [ ] Guardian rules defined

### Group-Domain Checklist:
- [ ] All atoms listed
- [ ] Relationships clear
- [ ] Flow documented
- [ ] Integration points defined

### Domain Section Checklist:
- [ ] All groups included
- [ ]Complete atom registry
- [ ] Domain principles clear
- [ ] Cross-domain interactions mapped

---

This standards guide ensures consistent, high-quality documentation that mirrors the guardian protection philosophy of the ONE element system.