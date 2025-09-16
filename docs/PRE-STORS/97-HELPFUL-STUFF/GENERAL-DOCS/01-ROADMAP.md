# Studio1 ONE System - Development Roadmap

**Version:** 5.1  
**Date:** 2025-08-15  
**Status:** Foundation Complete → Dynamic Element Creation ✅ → Ready for Visual Builder  

---

## 📋 **ROADMAP DOCUMENTATION APPROACH**

This roadmap serves as a **current state snapshot** of the Studio1 system architecture and capabilities. Completed sections describe the system as it exists today, written as final documentation. Future sections outline planned features as actionable roadmap items.

**Documentation Philosophy:**
- **Completed Features** → Written as current system documentation (not historical changes)
- **Future Features** → Written as roadmap goals and implementation plans  
- **Change History** → Tracked in `/docs/STUDIO1/SESSIOIN-LOGS/` for detailed implementation records

---

# 🎯 **CURRENT DESIGN SYSTEM RULES**

## **🚨 CRITICAL DEVELOPMENT RULE**
**NEVER update or add anything outside of the scope requested.** If additional changes are needed to complete the scope, STOP and get permission first. Explain exactly why the additional changes are required before proceeding.

## **Layout & Structure Rules**

### **✅ REQUIRED PRACTICES**
1. **Grid Structure Only** - Grid layouts define structure with no fixed dimensions
2. **Fill Container Sizing** - Use `100%` height/width to fill outer containers when needed
3. **Proportional Values** - Use `auto`, `1fr`, `minmax()`, or percentages (`30% 70%`) for flexible layouts
4. **Named Grid Areas** - Always use CSS Grid areas (`a`, `b`, `c`, `d`) for explicit positioning
5. **Auto Grid for Repetition** - Use auto-flow grid only for repeatable items (navigation, button groups)


### **❌ FORBIDDEN PRACTICES**
1. **No Fixed Grid Dimensions** - Never use `px`, `rem`, `em` values in grid-template-columns/rows
2. **No Flexbox** - Block and grid layouts only
3. **No Inline Styles**
4. **No React-Style Properties in JSON** - Never use camelCase React properties in theme JSON

### **🎨 PHILOSOPHY**
- **Structure = Grid** (defines layout relationships)
- **Styling = Presets** (defines visual appearance)  
- **Dimensions = Base Elements** (width/height for content sizing)
- **Universal = Mix & Match** (any element + any preset combination)

**Goal:** Zero drift, consistent results, visual builder compatibility

---

## 📁 Reference Codebases
**WordPress Plugin Codebase:** `/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/wp-4-plugins`  
**Session Logs:** `/docs/STUDIO1/SESSIOIN-LOGS/` - Detailed implementation history

---

## ✅ **COMPLETED FOUNDATIONS**

### **🎨 Separated Theme Architecture** *(Sessions #001-003)*
**Purpose:** Independent UI dashboard and ONE canvas with zero conflicts

#### **Independent Theme Loading:**
- **UI Theme** → `ui-theme.json` → Loads independently for dashboard
- **ONE Theme** → `one-theme.json` → Loads independently for canvas content
- **Separated Architecture** → Clean theme isolation, zero CSS conflicts

#### **Dual Rendering System:**
- **UI Theme** → **UIGenerator** → React Dashboard (`.ui` scoped variables)
- **ONE Theme** → **DirectRenderer** → Pure HTML/CSS Canvas (`.one` scoped variables)

#### **CSS Prefix Separation:**
```css
/* UI Theme - All Prefixed */
.ui { --color: #333; /* UI variables */ }
.ui-dashboard { /* dashboard layout */ }
.ui-sidebar { /* sidebar layout */ }
.ui-button { /* interface buttons */ }

/* ONE Theme - Clean Names */
.one { --color: hsl(0, 0%, 20%); /* ONE variables */ }
.hero { /* content hero styles */ }
.grid { /* content grid styles */ }
.wrapper { /* content wrapper styles */ }
```

#### **Theme Processor Logic:**
- **UI Theme** uses `ui-looks` and `ui-elements` → Generates prefixed classes
- **ONE Theme** uses `looks` and `elements` → Generates clean classes
- **Same processor** with different processing paths based on theme structure

### **🔧 Categorized Looks System** *(Session #001)*
**Purpose:** Universal styling system with mix-and-match capability

#### **Category Structure:**
```json
{
  "looks": {
    "layout": {
      "dashboard": { /* grid structure styles */ },
      "3-col": { /* 3-column layout */ },
      "button": { /* button layout */ }
    },
    "typography": {
      "title": { /* heading styles */ },
      "text": { /* body text styles */ },
      "link": { /* link styles */ }
    },
    "colors": {
      "neutral-dark": { /* dark theme colors */ },
      "primary": { /* brand colors */ }
    }
  }
}
```

#### **Universal Classes System:**
- **Base Elements:** `wrapper`, `text`, `image` with `data-label` attributes
- **Look Classes:** Generated as universal classes (no theme prefix)
- **Mix & Match:** `"preset": "dashboard neutral-dark"` → `.dashboard` + `.neutral-dark`
- **Infinite Combinations:** Any element + any look combination

### **⚙️ Runtime Theme Processor** *(Sessions #001-003)*
**Purpose:** Dynamic JSON → CSS generation with separated theme logic

#### **Core Processing Functions:**
```typescript
// Independent theme loading
async applyTheme(themeName: string = 'ui'): Promise<boolean>

// CSS generation with prefix logic
generateCSS(themeConfig: any, themeName: string): string

// Theme management
setTheme(themeName: string, themeConfig: any): void
getTheme(themeName: string): any

// Processing utilities  
categorizeVariables(variables: Record<string, any>): Record<string, Record<string, any>>
camelToKebab(str: string): string
varKeyToCssProperty(varKey: string): string
```

#### **Processing Logic:**
1. **Variables** → CSS custom properties (`--variable-name`) scoped to theme class
2. **UI Looks/Elements** → Process `ui-looks` and `ui-elements` with prefixed output
3. **ONE Looks/Elements** → Process `looks` and `elements` with clean output
4. **Position Helpers** → Universal grid area classes (`.a`, `.b`, `.c`)

#### **Variable System:**
- **100+ CSS Variables** per theme in 12 categories
- **Development Mode:** All variables available for DevTools
- **Production Mode:** Tree-shaking unused variables
- **Theme Scoping:** Variables scoped to `.ui` or `.one` classes

#### **CSS Generation Pattern:**
```css
/* UI Theme Output */
.ui {
  /* ========== COLORS ========== */
  --background-color: #ffffff;
  --text-color: #333333;
  /* Apply variables to properties */
  background-color: var(--background-color);
  color: var(--text-color);
}
.ui-dashboard { /* prefixed UI styles */ }

/* ONE Theme Output */  
.one {
  /* ========== COLORS ========== */
  --background-color: hsl(0, 0%, 100%);
  --text-color: hsl(0, 0%, 20%);
  /* Apply variables to properties */
  background-color: var(--background-color);
  color: var(--text-color);
}
.hero { /* clean ONE styles */ }
```

### **🎯 Dynamic Element Creation** *(Session #004)*
**Purpose:** Interactive ONE element creation and canvas management

#### **+ ONE Button System:**
- **Canvas Header Integration** - Button positioned in existing navigation header
- **Event-Driven Architecture** - CustomEvent system for element creation  
- **Click Handler** - Dispatches add-one-element events with element type

#### **Dynamic Element Management:**
- **State Management** - DirectRenderer maintains elements array
- **Real-time Updates** - Canvas regenerates HTML when elements added
- **Element Positioning** - Absolute positioning with z-index stacking
- **Theme Integration** - oneElement styles from one-theme.json applied

#### **Working Implementation:**
```typescript
// Button Click → Custom Event
window.dispatchEvent(new CustomEvent('add-one-element', { 
  detail: { elementType: 'wrapper' } 
}));

// DirectRenderer → Dynamic HTML Generation  
const newElement = {
  id: `element-${Date.now()}`,
  type: 'wrapper',
  style: { position: 'absolute', top: '50px', left: '50px' }
};
```

---

## 🏗️ **CURRENT ARCHITECTURE**

### **Technical Foundation**
```
Studio1 React App (TypeScript + Vite)
├── Dual Theme System
│   ├── ui-theme.json (dashboard: .ui scoping)
│   └── one-theme.json (user designs: .one scoping)
├── UIGenerator (JSON → React dashboard)
├── DirectRenderer (JSON → HTML/CSS output)
├── Runtime Theme Processor (theme loading & CSS generation)
└── Express API Server (theme & preset management)
```

### **Core Components Architecture**

#### **UIGenerator Component**
**File:** `src/components/UIGenerator.tsx`  
**Purpose:** Renders React dashboard from JSON theme structure
```tsx
export function UIGenerator({ theme = 'ui' }: { theme?: string }) {
  // Processes ui-theme.json structure
  // Generates React components with .ui CSS classes
  // Handles dashboard interface and controls
}
```

#### **DirectRenderer Component**  
**File:** `src/components/DirectRenderer.tsx`  
**Purpose:** Generates pure HTML/CSS for user output
```tsx
export function DirectRenderer({ theme = 'one', structure }: { 
  theme?: 'one' | 'ui', 
  structure?: any 
}) {
  // Processes one-theme.json or custom structure
  // Generates pure HTML with .one CSS classes
  // WordPress-compatible output (no React dependencies)
}
```

#### **Runtime Theme Processor**
**File:** `src/theme/runtimeThemeProcessor.ts`  
**Purpose:** Central theme management and CSS generation engine

**Key Methods:**
- `applyTheme()` - Loads and injects individual themes independently
- `generateCSS()` - Converts theme JSON to CSS with variable scoping  
- `setTheme()` / `getTheme()` - Theme storage and retrieval
- `categorizeVariables()` - Organizes 100+ variables by category

### **Data Flow Architecture**
```
[ui-theme.json] + [one-theme.json]
    ↓
RuntimeThemeProcessor (independent loading)
    ↓
CSS Generation (.ui + .one classes)
    ↓
[UIGenerator → React Dashboard] + [DirectRenderer → HTML/CSS Output]
```

### **File System Structure**
```
src/
├── components/
│   ├── UIGenerator.tsx          # React dashboard renderer
│   ├── DirectRenderer.tsx       # Pure HTML/CSS renderer  
│   └── DualThemeTest.tsx        # Testing component (inactive)
├── theme/
│   └── runtimeThemeProcessor.ts # Theme processing engine
└── App.tsx                      # Main app entry point

public/data/themes/
├── ui-theme.json               # Dashboard theme configuration
└── one-theme.json              # User output theme configuration
```

### **Theme Configuration Schema**
```typescript
interface ThemeConfig {
  version: string;
  name: string;
  class: string;                 // CSS class name (.ui or .one)
  variables: {
    [key: string]: {
      category: string;           // layout, colors, typography, etc.
      cssProperty: string;        // --variable-name
      defaultValue: string;       // CSS value
    }
  };
  looks: {
    [category: string]: {
      [lookName: string]: {
        [cssProperty: string]: string;
      }
    }
  };
  structure?: any;               // UI structure definition
  oneElement?: any;              // ONE element configuration
}
```

---

## 🎯 **NEXT PRIORITY: Visual Builder Implementation**

### **🔥 IMMEDIATE NEXT STEP (Session #005)**
**Goal:** Add visual builder capabilities for element manipulation

#### **Core Tasks:**
1. **Element Selection** - Click to select created wrapper elements in canvas
2. **Visual Handles** - Move and resize handles for selected elements  
3. **Drag & Drop** - Move elements around canvas with visual feedback
4. **Element Properties** - Basic property editing (position, size)

#### **Success Criteria:**
- ✅ Click wrapper elements to select them
- ✅ Selected elements show visual handles (move/resize)
- ✅ Drag elements to new positions with real-time updates
- ✅ Basic resize functionality working
- ✅ Foundation ready for property controls integration

#### **Previous Session Completed:**
- ✅ **+ ONE Button** - Working element creation
- ✅ **Dynamic Elements** - Wrapper elements appear in canvas  
- ✅ **Event System** - CustomEvent architecture established
- ✅ **Theme Integration** - ONE theme styling applied

---

## 🚀 **DEVELOPMENT PHASES**

### **Phase 2: Visual Builder (CURRENT)**

#### **2.1 THREE-PANEL INTERFACE**
- **Left Panel:** Element Editor (conditional visibility)
- **Center Canvas:** Visual Builder with 20px snap grid
- **Right Panel:** Preset Library with view modes

#### **2.2 UNIVERSAL ONE ELEMENT**
- Single React component that becomes anything
- Content type selection: Wrapper | Text | Image | Layout
- 100+ variables pre-wired from one-theme.json
- Visual manipulation handles (port from S4)

#### **2.3 CANVAS BUILDER (Port from S4)**
- 20px snap grid foundation
- Element positioning with move/resize
- Multi-select operations and grouping
- Visual hierarchy management

### **Phase 3: Export & Production**
- Clean HTML/CSS generation
- Multiple export formats (React, WordPress, Static)
- SEO and accessibility optimization

### **Phase 4: AI Integration**
- AI-assisted preset generation
- Content creation and style analysis
- Mathematical scaling systems

### **Phase 5: Platform Completion**
- Content management system
- Team collaboration features
- Advanced workflow tools

---

## 🎨 **KEY INNOVATIONS**

### **1. Universal ONE Element**
Single `<div class="one">` containing ALL possibilities:
- Pre-wired with 100+ variables (inactive until preset application)
- Content type selection transforms functionality
- No semantic naming during design phase

### **2. Mathematical Scaling**
Vector-like behavior for web design:
- Golden ratio typography scaling
- Container-aware contextual scaling
- No breakpoints - smooth mathematical scaling

### **3. Intelligent Grid Recognition** *(Port from S4)*
Spatial arrangement automatically becomes CSS Grid:
- Visual positioning drives code generation
- Pattern recognition for reusable components

### **4. Export-Time Semantic Mapping**
Design visually, export professionally:
- Visual design → Semantic HTML structure
- Automatic SEO optimization
- Multiple format outputs from single design

---

## 🎯 **SUCCESS METRICS**
- **< 30 seconds** to create a functional component
- **Zero technical knowledge** required for design
- **Professional output quality** automatically
- **Intuitive visual workflow** like Figma/Canva

---

## 🔧 **DEVELOPMENT ENVIRONMENT**

### **Commands**
```bash
npm run dev    # Development server (localhost:5175)
npm run build  # Production build
```

### **Key Files**
- **App.tsx** - Main application entry
- **theme/** - Theme processing system
- **components/** - UI components and renderers
- **public/data/themes/** - Theme configurations

---

**📊 For detailed implementation history, see:** `/docs/STUDIO1/SESSIOIN-LOGS/`