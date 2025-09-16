# UI-UX Domain

This folder contains the three foundational domain systems that all Studio1 components compose from:

## Domains

1. **[UI-DESIGN](./UI-DESIGN.md)** - Visual and behavioral design patterns
   - How things look and respond
   - Colors, typography, spacing, interactions
   - Shared across all components

2. **[USER-WORKFLOWS](./USER-WORKFLOWS.md)** - User experience journeys
   - How users accomplish tasks
   - Step-by-step experiences
   - Implemented using UI-DESIGN patterns

3. **[TECHNICAL-ARCHITECTURE](./TECHNICAL-ARCHITECTURE.md)** - Core implementations
   - How things work under the hood
   - State, events, rendering, performance
   - Powers both UI-DESIGN and USER-WORKFLOWS

## Relationship

Components (Library, LayerTree, Editors, DirectRenderer) compose these domains:
- They use **UI-DESIGN** for their appearance
- They implement **USER-WORKFLOWS** for their experiences  
- They leverage **TECHNICAL-ARCHITECTURE** for their functionality

This creates a single source of truth where patterns are defined once and reused everywhere.