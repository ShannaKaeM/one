# Architecture Domain Outline

## Core Components

01.01-APP
01.02-THEME-PROCESSOR
01.03-JSONtoREACT
01.03.01-DIRECT-RENDERER
01.03.01.01-GRID-OVERLAY
01.03.01.02-SELECTION-HANDLES
01.03.02-LAYER-TREE
01.03.03-LIBRARY
01.05-UTILS


01.01 APP
- Event System
- State Management
- Component Registration
- Props Passing
- Enhanced State
- Theme Loading

01.02 THEME-PROCESSOR
- Runtime CSS Generation
- Variable System
- Import System
- Element Configuration
- Mode Management

01.03 JSONtoREACT (JtT)
- Auto Grid Areas
- Auto ID Generation
- Preset System
- Direct Variables
- @ References
- Data Components

01.04 DIRECT-RENDERER
- Canvas State
- Selection System
- Drag & Drop
- Element Management
- Transform System
- Event Handling

01.05 UTILS
- Auto ID Helper
- Preset Manager
- Storage Manager
- R2 Manager

## UI Components

### LAYER-TREE
- Element Hierarchy
- Selection Management
- Drag Reordering
- Visibility Controls
- Lock System

### LIBRARY
- Asset Management
- R2 Integration
- Collection System
- Import/Export

### EDITORS
- Property Controls
- Variable Editing
- Autocomplete System
- Category Organization

### UI-GENERATOR
- Preset Application
- Dynamic Generation
- Style Inheritance



## Utilities (Level 2 under UTILS Example Reference)

### AUTO-ID-HELPER
- ID Generation
- Grid Area Assignment
- Structure Processing

### PRESET-MANAGER
- Preset Application
- Variable Merging
- Type Management

### STORAGE-MANAGER
- Local Storage
- Project Persistence

### R2-MANAGER
- Cloud Storage
- Media Management

## Configuration

### UI-THEME
- Theme Structure
- Variable Definitions
- Preset Organization
- Structure Definition

### ONE-THEME
- Content Theme
- Element Types
- Style System

---

## Level 2 Domains (Sub-domains needing separate docs)

### Under APP

#### EVENT-SYSTEM
- How events work
- Event patterns
- Event debugging
- Event catalog

#### STATE-MANAGEMENT
- State patterns
- State updates
- State flow
- Centralized state

#### COMPONENT-REGISTRATION
- How components register
- Data component mapping
- Props passing patterns

#### ENHANCED-STATE
- State combination
- Handler functions
- State enhancement patterns

#### THEME-LOADING
- Theme initialization
- Mode management
- CSS injection