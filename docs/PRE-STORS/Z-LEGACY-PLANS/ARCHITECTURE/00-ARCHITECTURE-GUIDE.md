# Architecture Domain Outline

## Complete System Architecture Tree

```
Studio1/
├── 01.10-CORE-CONFIG (Root Level)
│   ├── package.json
│   ├── vite.config.ts
│   ├── server.js
│   ├── tsconfig.json
│   ├── postcss.config.js
│   └── .env.local
│
├── public/
│   ├── index.html (01.09-INDEX)
│   └── data/
│       └── themes/
│           ├── ui-theme.json
│           └── one-theme.json
│
├── src/
│   ├── main.tsx (01.08-MAIN)
│   ├── App.tsx (01.01-APP)
│   │
│   ├── styles/
│   │   └── global.css (01.07-GLOBAL-CSS)
│   │
│   ├── theme/
│   │   └── runtimeThemeProcessor.ts (01.02-THEME-PROCESSOR)
│   │       ├── CSS-GENERATION
│   │       │   ├── VARIABLE-OUTPUT
│   │       │   ├── PROPERTY-MAPPING  
│   │       │   └── CLASS-SCOPING
│   │       ├── THEME-LOADING
│   │       │   ├── JSON-FETCHING
│   │       │   ├── IMPORT-RESOLUTION
│   │       │   └── THEME-MERGING
│   │       ├── VARIABLE-SYSTEM
│   │       │   ├── CATEGORIZATION
│   │       │   ├── NAMING-CONVERSION
│   │       │   └── CSS-PROPERTIES
│   │       ├── PRESET-PROCESSING
│   │       │   ├── CATEGORY-NAVIGATION
│   │       │   ├── STATE-STYLES
│   │       │   ├── PSEUDO-ELEMENTS
│   │       │   └── NESTED-PRESETS
│   │       ├── CSS-INJECTION
│   │       │   ├── STYLE-CREATION
│   │       │   ├── DOM-MANIPULATION
│   │       │   └── HOT-RELOADING
│   │       ├── THEME-STORAGE
│   │       │   ├── MEMORY-STORAGE
│   │       │   ├── THEME-RETRIEVAL
│   │       │   └── MULTI-THEME
│   │       └── TREE-SHAKING (not implemented)
│   │           ├── VARIABLE-USAGE
│   │           ├── DEAD-CODE-REMOVAL
│   │           └── PRODUCTION-MODE
│   │
│   ├── components/
│   │   ├── JSONtoREACT.tsx (01.03-JTR)
│   │   │   ├── STRUCTURE-PROCESSING
│   │   │   │   ├── FLAT-RESOLUTION
│   │   │   │   ├── NESTED-HANDLING
│   │   │   │   ├── AUTO-ID-INTEGRATION
│   │   │   │   └── CHILDREN-RESOLUTION
│   │   │   ├── PRESET-SYSTEM
│   │   │   │   ├── LAYOUT-PRESETS
│   │   │   │   ├── COMPONENT-PRESETS
│   │   │   │   ├── LOOK-PRESETS
│   │   │   │   └── PRESET-INHERITANCE
│   │   │   ├── ELEMENT-GENERATION
│   │   │   │   ├── PROPS-BUILDING
│   │   │   │   ├── CLASS-COMPOSITION
│   │   │   │   ├── STYLE-GENERATION
│   │   │   │   └── GRID-ASSIGNMENT
│   │   │   ├── DATA-BINDING
│   │   │   │   ├── DATA-COMPONENTS
│   │   │   │   ├── APP-STATE
│   │   │   │   ├── EVENT-DISPATCH
│   │   │   │   └── PROPERTY-UPDATES
│   │   │   ├── THEME-INTEGRATION
│   │   │   │   ├── THEME-LOADING
│   │   │   │   ├── CONFIG-MANAGEMENT
│   │   │   │   └── THEME-RENDERING
│   │   │   ├── REFERENCE-RESOLUTION
│   │   │   │   ├── AT-SYNTAX
│   │   │   │   ├── VARIABLE-REFS
│   │   │   │   ├── PRESET-REFS
│   │   │   │   └── ICON-LOOKUPS
│   │   │   ├── DirectRenderer.tsx (01.04-DIRECT-RENDERER)
│   │   │   │   ├── HTML-GENERATION
│   │   │   │   │   ├── ELEMENT-CONVERSION
│   │   │   │   │   ├── STYLE-PROCESSING
│   │   │   │   │   ├── PRESET-MERGING
│   │   │   │   │   └── CONTENT-HANDLING
│   │   │   │   ├── SELECTION-SYSTEM
│   │   │   │   │   ├── SINGLE-SELECTION
│   │   │   │   │   ├── MULTI-SELECTION
│   │   │   │   │   ├── VISUAL-FEEDBACK
│   │   │   │   │   └── KEYBOARD-SHORTCUTS
│   │   │   │   ├── INTERACTION-HANDLING
│   │   │   │   │   ├── MOUSE-EVENTS
│   │   │   │   │   ├── KEYBOARD-EVENTS
│   │   │   │   │   ├── TOUCH-SUPPORT
│   │   │   │   │   └── CONTEXT-MENUS
│   │   │   │   ├── STATE-MANAGEMENT
│   │   │   │   │   ├── ELEMENT-ARRAY
│   │   │   │   │   ├── SELECTION-TRACKING
│   │   │   │   │   ├── HIDDEN-LOCKED-SETS
│   │   │   │   │   └── CANVAS-PROPERTIES
│   │   │   │   ├── EVENT-PROCESSING
│   │   │   │   │   ├── EVENT-LISTENERS
│   │   │   │   │   ├── EVENT-DISPATCH
│   │   │   │   │   ├── PROPERTY-UPDATES
│   │   │   │   │   └── ACTION-HANDLING
│   │   │   │   ├── ELEMENT-OPERATIONS
│   │   │   │   │   ├── ADD-DELETE
│   │   │   │   │   ├── DUPLICATE-ELEMENTS
│   │   │   │   │   ├── GROUP-UNGROUP
│   │   │   │   │   └── Z-INDEX-REORDER
│   │   │   │   ├── CONTENT-EDITING
│   │   │   │   │   ├── INLINE-TEXT
│   │   │   │   │   ├── IMAGE-UPLOAD
│   │   │   │   │   ├── MEDIA-HANDLING
│   │   │   │   │   └── CONTENT-LAYERS
│   │   │   │   ├── PRESET-INTEGRATION
│   │   │   │   │   ├── APPLY-REMOVE
│   │   │   │   │   ├── VARIABLE-MERGING
│   │   │   │   │   ├── DYNAMIC-STYLING
│   │   │   │   │   └── TYPE-BASED-PRESETS
│   │   │   │   ├── IMPORT-EXPORT
│   │   │   │   │   ├── LIBRARY-IMPORT
│   │   │   │   │   ├── DRAG-DROP
│   │   │   │   │   ├── POSITION-CALC
│   │   │   │   │   └── ELEMENT-CREATION
│   │   │   │   ├── CHILD-COMPONENTS
│   │   │   │   │   ├── SelectionHandles.tsx
│   │   │   │   │   ├── GridOverlay.tsx
│   │   │   │   │   ├── ElementPopup.tsx
│   │   │   │   │   └── SelectionActionButton.tsx
│   │   │   ├── LayerTree.tsx (01.12-LAYERTREE)
│   │   │   │   ├── TREE-BUILDER
│   │   │   │   │   ├── HIERARCHY-CONSTRUCTION
│   │   │   │   │   ├── PARENT-CHILD-RELATIONSHIPS
│   │   │   │   │   ├── Z-INDEX-SORTING
│   │   │   │   │   └── RECURSIVE-TRAVERSAL
│   │   │   │   ├── SELECTION-SYSTEM
│   │   │   │   │   ├── SINGLE-SELECT
│   │   │   │   │   ├── MULTI-SELECT
│   │   │   │   │   ├── SHIFT-CLICK
│   │   │   │   │   └── LOCK-CHECKING
│   │   │   │   ├── DRAG-DROP-SYSTEM
│   │   │   │   │   ├── DRAG-STATE
│   │   │   │   │   ├── DROP-ZONES
│   │   │   │   │   ├── REORDER-LOGIC
│   │   │   │   │   └── VISUAL-FEEDBACK
│   │   │   │   ├── VISIBILITY-CONTROL
│   │   │   │   │   ├── SHOW-HIDE-TOGGLE
│   │   │   │   │   ├── STATE-PERSISTENCE
│   │   │   │   │   ├── VISUAL-INDICATORS
│   │   │   │   │   └── BATCH-OPERATIONS
│   │   │   │   ├── LOCK-SYSTEM
│   │   │   │   │   ├── LOCK-UNLOCK-TOGGLE
│   │   │   │   │   ├── INTERACTION-PREVENTION
│   │   │   │   │   ├── VISUAL-STATES
│   │   │   │   │   └── LOCK-INHERITANCE
│   │   │   │   ├── INLINE-EDITING
│   │   │   │   │   ├── DOUBLE-CLICK
│   │   │   │   │   ├── INPUT-MANAGEMENT
│   │   │   │   │   ├── SAVE-CANCEL
│   │   │   │   │   └── KEYBOARD-SHORTCUTS
│   │   │   │   ├── EVENT-COORDINATION
│   │   │   │   │   ├── EVENT-LISTENERS
│   │   │   │   │   ├── EVENT-DISPATCH
│   │   │   │   │   ├── APP-BRIDGING
│   │   │   │   │   └── DIRECTRENDERER-SYNC
│   │   │   │   ├── VISUAL-RENDERING
│   │   │   │   │   ├── ICON-COMPONENTS
│   │   │   │   │   ├── STYLE-GENERATION
│   │   │   │   │   ├── STATE-STYLING
│   │   │   │   │   └── HOVER-EFFECTS
│   │   │   │   ├── GROUP-MANAGEMENT
│   │   │   │   │   ├── EXPAND-COLLAPSE
│   │   │   │   │   ├── CHILDREN-RENDERING
│   │   │   │   │   ├── NESTING-DISPLAY
│   │   │   │   │   └── GROUP-OPERATIONS
│   │   │   │   └── PERFORMANCE
│   │   │   │       ├── VIRTUAL-SCROLLING
│   │   │   │       ├── MEMOIZATION
│   │   │   │       ├── UPDATE-BATCHING
│   │   │   │       └── LARGE-TREE-HANDLING
│   │   │   ├── Library.tsx (01.11-LIBRARY)
│   │   │   │   ├── UPLOAD-SYSTEM
│   │   │   │   │   ├── FILE-SELECTION
│   │   │   │   │   ├── R2-UPLOAD
│   │   │   │   │   ├── PROGRESS-TRACKING
│   │   │   │   │   └── ERROR-HANDLING
│   │   │   │   ├── ORGANIZATION-SYSTEM
│   │   │   │   │   ├── LIBRARY-MANAGEMENT
│   │   │   │   │   ├── COLLECTION-MANAGEMENT
│   │   │   │   │   ├── FILTERING-LOGIC
│   │   │   │   │   └── MIGRATION-HANDLING
│   │   │   │   ├── GRID-DISPLAY
│   │   │   │   │   ├── THUMBNAIL-RENDERING
│   │   │   │   │   ├── LAZY-LOADING
│   │   │   │   │   ├── SELECTION-VISUALS
│   │   │   │   │   └── RESPONSIVE-LAYOUT
│   │   │   │   ├── SELECTION-MANAGEMENT
│   │   │   │   │   ├── MULTI-SELECTION
│   │   │   │   │   ├── RANGE-SELECTION
│   │   │   │   │   ├── SELECTION-PERSISTENCE
│   │   │   │   │   └── BULK-OPERATIONS
│   │   │   │   ├── CANVAS-INTEGRATION
│   │   │   │   │   ├── IMPORT-EVENTS
│   │   │   │   │   ├── ELEMENT-CREATION
│   │   │   │   │   ├── DRAG-DROP-SETUP
│   │   │   │   │   └── POSITION-CALCULATION
│   │   │   │   ├── MODAL-SYSTEM
│   │   │   │   │   ├── MODAL-COMPONENTS
│   │   │   │   │   ├── FORM-HANDLING
│   │   │   │   │   ├── VALIDATION
│   │   │   │   │   └── STATE-MANAGEMENT
│   │   │   │   ├── R2-COMMUNICATION
│   │   │   │   │   ├── API-CALLS
│   │   │   │   │   ├── RESPONSE-HANDLING
│   │   │   │   │   ├── URL-CONSTRUCTION
│   │   │   │   │   └── ERROR-RECOVERY
│   │   │   │   ├── METADATA-HANDLING
│   │   │   │   │   ├── ITEM-PROPERTIES
│   │   │   │   │   ├── ORGANIZATION-DATA
│   │   │   │   │   ├── TIMESTAMPS
│   │   │   │   │   └── SEARCH-INDEXING
│   │   │   │   ├── UI-STATES
│   │   │   │   │   ├── VISIBILITY-TOGGLES
│   │   │   │   │   ├── LOADING-STATES
│   │   │   │   │   ├── ERROR-STATES
│   │   │   │   │   └── EMPTY-STATES
│   │   │   │   └── PERFORMANCE
│   │   │   │       ├── IMAGE-OPTIMIZATION
│   │   │   │       ├── LAZY-LOADING
│   │   │   │       ├── VIRTUALIZATION
│   │   │   │       └── CACHING-STRATEGIES
│   │   │   ├── Editors.tsx (01.13-EDITORS)
│   │   │   │   ├── THEME-LOADING
│   │   │   │   │   ├── ONE-THEME-FETCH
│   │   │   │   │   ├── VARIABLE-EXTRACTION
│   │   │   │   │   ├── CATEGORY-GROUPING
│   │   │   │   │   └── DEFAULT-HANDLING
│   │   │   │   ├── CATEGORIZATION-SYSTEM
│   │   │   │   │   ├── CATEGORY-MAPPING
│   │   │   │   │   ├── ICON-ASSIGNMENT
│   │   │   │   │   ├── SECTION-GENERATION
│   │   │   │   │   └── SORT-ORDERING
│   │   │   │   ├── ACCORDION-UI
│   │   │   │   │   ├── SECTION-EXPANSION
│   │   │   │   │   ├── SINGLE-OPEN-LOGIC
│   │   │   │   │   ├── VISUAL-TRANSITIONS
│   │   │   │   │   └── HEADER-INTERACTIONS
│   │   │   │   ├── INPUT-CONTROLS
│   │   │   │   │   ├── TEXT-INPUT
│   │   │   │   │   ├── LOCAL-STATE
│   │   │   │   │   ├── VALUE-FORMATTING
│   │   │   │   │   └── PLACEHOLDER-GEN
│   │   │   │   ├── AUTOCOMPLETE-ENGINE
│   │   │   │   │   ├── SUGGESTION-DATABASE
│   │   │   │   │   ├── FILTER-ALGORITHM
│   │   │   │   │   ├── KEYBOARD-NAV
│   │   │   │   │   └── MOUSE-INTERACTIONS
│   │   │   │   ├── VALUE-MANAGEMENT
│   │   │   │   │   ├── VALUE-RETRIEVAL
│   │   │   │   │   ├── CHANGE-DETECTION
│   │   │   │   │   ├── COMMIT-LOGIC
│   │   │   │   │   └── EXTERNAL-SYNC
│   │   │   │   ├── EVENT-DISPATCH
│   │   │   │   │   ├── PROPERTY-EVENTS
│   │   │   │   │   ├── UI-ACTION-WRAP
│   │   │   │   │   ├── DETAIL-FORMATTING
│   │   │   │   │   └── ERROR-HANDLING
│   │   │   │   ├── PRESET-INTEGRATION
│   │   │   │   │   ├── CLASS-MAPPING
│   │   │   │   │   ├── PRESET-OVERRIDES
│   │   │   │   │   ├── STYLE-INHERITANCE
│   │   │   │   │   └── DYNAMIC-STYLING
│   │   │   │   ├── VISUAL-RENDERING
│   │   │   │   │   ├── STYLE-INJECTION
│   │   │   │   │   ├── COMPONENT-STYLING
│   │   │   │   │   ├── STATE-CLASSES
│   │   │   │   │   └── RESPONSIVE-LAYOUT
│   │   │   │   └── PERFORMANCE
│   │   │   │       ├── INPUT-DEBOUNCING
│   │   │   │       ├── SUGGESTION-CACHING
│   │   │   │       ├── RENDER-OPTIMIZATION
│   │   │   │       └── LARGE-PROPERTY-SETS
│   │   │   └── UIGenerator.tsx
│   │   └── [Other components rendered by JTR]
│   │
│   ├── utils/ (01.05-UTILS)
│   │   ├── autoIdHelper.ts
│   │   ├── presetManager.ts
│   │   ├── storageManager.ts
│   │   └── r2Manager.ts
│   │
│   └── workers/ (01.06-WORKERS)
│       └── asset-worker.js
│           ├── ASSET-WORKER
│           │   ├── UPLOAD-HANDLER
│           │   ├── ASSET-SERVING
│           │   ├── LIBRARY-OPERATIONS
│           │   └── CORS-HANDLING
│           ├── R2-STORAGE
│           │   ├── ASSETS-BUCKET
│           │   ├── LIBRARY-BUCKET
│           │   ├── CONTENT-ADDRESSING
│           │   └── CACHING-STRATEGY
│           ├── ROUTING
│           │   ├── ENDPOINT-ROUTING
│           │   ├── METHOD-HANDLERS
│           │   └── ERROR-HANDLING
│           ├── IMAGE-PROCESSING
│           │   ├── VARIANT-GENERATION
│           │   ├── RESIZE-OPTIONS
│           │   └── CF-RESIZING
│           └── INDEXING
│               ├── INDEX-UPDATES
│               ├── METADATA-STORAGE
│               └── QUERY-FILTERING
│
└── docs/
    └── 00-MASTER-GUIDES/
        └── 00-01-ARCHITECTURE/
```

## Domain Documentation Rules

Based on CORE-CONFIG and PUBLIC examples:

- **Primary purpose** - 
- **Single source of truth** - No duplicate information
- **One concept per domain** - What it is, what it does
- **List sub-domains only** - Don't explain them (they have their own docs)
- **Show connections** - Reference related domains
- **Keep it simple** - Explain for someone who knows nothing
- **Direct and factual** - No opinions or philosophy



## Documentation Status

### ✅ Completed Domains:

**Core Components (01-CORE):**
- ✅ APP (01.01)
- ✅ THEME-PROCESSOR (01.02)
- ✅ JSONtoREACT (01.03)
- ✅ DIRECT-RENDERER (01.04)
- ✅ LIBRARY (01.11)
- ✅ LAYERTREE (01.12)
- ✅ EDITORS (01.13)
- ✅ UTILS (01.05)
- ✅ WORKERS (01.06)
- ✅ GLOBAL-CSS (01.07)
- ✅ MAIN (01.08)
- ✅ INDEX (01.09)
- ✅ CORE-CONFIG (01.10)
  - ✅ PACKAGE-JSON
  - ✅ VITE-CONFIG
  - ✅ SERVER
  - ✅ TSCONFIG
  - ✅ ENV-LOCAL
  - ✅ POSTCSS-CONFIG

**Public (02-PUBLIC):**
- ✅ PUBLIC
- ✅ INDEX
- ✅ DATA
- ✅ JSON-THEMES
- ✅ UI-THEME
- ✅ ONE-THEME

**Source (03-SRC):**
- ✅ MAIN
- ✅ GLOBAL-CSS
- ✅ THEME-PROCESSOR
- ✅ JSONtoREACT
- ✅ WORKERS
  - ✅ ASSET-WORKER
  - ✅ R2-STORAGE
  - ✅ ROUTING
  - ✅ IMAGE-PROCESSING
  - ✅ INDEXING
  - ✅ LIBRARY-OPERATIONS
- ✅ UTILS
  - ✅ AUTO-ID-HELPER
  - ✅ PRESET-MANAGER
  - ✅ STORAGE-MANAGER
  - ✅ R2-MANAGER

### ❌ Pending Domains:

**DirectRenderer Sub-domains:**
- ❌ HTML-GENERATION
- ❌ SELECTION-SYSTEM
- ❌ INTERACTION-HANDLING
- ❌ STATE-MANAGEMENT
- ❌ EVENT-PROCESSING
- ❌ ELEMENT-OPERATIONS
- ❌ CONTENT-EDITING
- ❌ PRESET-INTEGRATION
- ❌ IMPORT-EXPORT
- ❌ CHILD-COMPONENTS

**Library Sub-domains:**
- ❌ UPLOAD-SYSTEM
- ❌ ORGANIZATION-SYSTEM
- ❌ GRID-DISPLAY
- ❌ SELECTION-MANAGEMENT
- ❌ CANVAS-INTEGRATION
- ❌ MODAL-SYSTEM
- ❌ R2-COMMUNICATION
- ❌ METADATA-HANDLING
- ❌ UI-STATES
- ❌ PERFORMANCE

**LayerTree Sub-domains:**
- ❌ TREE-BUILDER
- ❌ SELECTION-SYSTEM
- ❌ DRAG-DROP-SYSTEM
- ❌ VISIBILITY-CONTROL
- ❌ LOCK-SYSTEM
- ❌ INLINE-EDITING
- ❌ EVENT-COORDINATION
- ❌ VISUAL-RENDERING
- ❌ GROUP-MANAGEMENT
- ❌ PERFORMANCE

**Editors Sub-domains:**
- ❌ THEME-LOADING
- ❌ CATEGORIZATION-SYSTEM
- ❌ ACCORDION-UI
- ❌ INPUT-CONTROLS
- ❌ AUTOCOMPLETE-ENGINE
- ❌ VALUE-MANAGEMENT
- ❌ EVENT-DISPATCH
- ❌ PRESET-INTEGRATION
- ❌ VISUAL-RENDERING
- ❌ PERFORMANCE

**Components:**
- ❌ UIGenerator
- ❌ SelectionHandles
- ❌ GridOverlay
- ❌ ElementPopup
- ❌ SelectionActionButton

**JTR Sub-domains:**
- ❌ STRUCTURE-PROCESSING
- ❌ PRESET-SYSTEM
- ❌ ELEMENT-GENERATION
- ❌ DATA-BINDING
- ❌ THEME-INTEGRATION
- ❌ REFERENCE-RESOLUTION

**Theme Processor Sub-domains:**
- ❌ CSS-GENERATION
- ❌ THEME-LOADING
- ❌ VARIABLE-SYSTEM
- ❌ PRESET-PROCESSING
- ❌ CSS-INJECTION
- ❌ THEME-STORAGE
- ❌ TREE-SHAKING (not implemented)