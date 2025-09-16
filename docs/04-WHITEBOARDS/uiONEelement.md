# UI ONE Element - Base Component Tracking

## 📍 Supporting Systems Audit Status

### ✅ App.tsx 
- **Reference**: `/docs/02-ROADMAPS/01.01-APPtsx.md`
- **Status**: Ready - empty components map waiting for ONE registration

### 🔄 ONEconnect (pending audit)
- **Reference**: `/docs/02-ROADMAPS/01.04-ONEconnect.md`
- **Status**: To be audited for ONE support

### 🔄 Theme Processor (pending audit)
- **Reference**: `/docs/02-ROADMAPS/01.05-THEMEprocessor.md`
- **Status**: To be audited for preset handling

### 🔄 ONEstore (pending audit)
- **Reference**: `/docs/02-ROADMAPS/01.03-ONEstore.md`
- **Status**: To be audited for data sources

---

## 📂 Existing Base Element Implementations

### OOPS - GenericWrapper
- **Location**: `/OOPS-STORS/src/components/one-connect/GenericWrapper.tsx`
- **Lines**: 26
- **Purpose**: Basic wrapper for ONEconnect
- **Key**: Just passes through props and children

### OOPS2 - Icon Component ⭐
- **Reference**: Log 022 (lines 29-47)
- **Location**: `/OOPS-STORS2/src/components/Icon.tsx`
- **Features**:
  - Base element (button or div based on onClick)
  - 100% composable with presets
  - Static or clickable
  - Accepts any theme props

### Current ONE Implementation
- **Location**: `/src/COMPONENTS/ONE.tsx`
- **Lines**: 116
- **Status**: Already more advanced than both OOPS versions
- **Features**:
  - Universal component
  - Data iteration support (Loop built-in!)
  - Icon/text/children rendering

---

## 🎯 Key Finding

**Our ONE component already combines both base element AND loop functionality!**
- OOPS2 separated into Icon + Toolbar
- We have it unified in ONE component
- Just needs icon generators to complete the pattern

---

## 🔍 Critical Questions to Investigate

### 1. **Multiple Themes Loading**
- Should App.tsx load both 'ui' AND 'one' themes?
- Currently only loading 'ui' theme

### 2. **Component Registration Strategy**
- ONEconnect has auto-registration for missing components (creates divs)
- For virtual components, do we want auto-registration?
- Should we register ONE component explicitly?
- **Current approach**: Empty components map, ONEconnect creates divs

### 3. **Theme Scoping - Where Should .ui Wrapper Live?**
- **Current**: App.tsx wraps ONEconnect in `<div className="ui">`
- **Alternative**: ONEconnect could add the wrapper itself
- **Why it matters for virtual components**: 
  - If ONEconnect controls the wrapper, it could dynamically scope
  - Could potentially render both .ui and .one scopes in same app
  - More flexibility for virtual component hydration
- **Decision**: PENDING - Keep in App.tsx for now, test implications

### 4. **Two Architectural Approaches**

#### Traditional Approach (Current Setup):
- Import React components into UI theme
- Wrap in pre-scoped wrapper
- Target root and elements with presets
- Remove styling from components (make them dynamic)

#### ONE Element Approach (Exploring):
- Single universal React component
- Pre-scoped to 100+ base variables
- Completely dry, ready for hydration
- ONEconnect + ONE element = virtual components
- Presets and states as single source, used multiple times

---

## 📋 Systems Needed for Prototype

1. **Verify theme scoping mechanism**
   - How does theme processor scope?
   - Do we need the .ui wrapper div?
   - How to add type="ui" to components?

2. **Test component registration**
   - Manual vs auto registration
   - Impact on virtual components

3. **Build hydration system**
   - ONEconnect ↔ ONE element communication
   - Preset application to virtual instances

---

## 📋 Next Audits Needed

1. **ONEconnect** - Check data resolution support
2. **Theme Processor** - Check preset path handling  
3. **Icon Generators** - Port from OOPS2 (Log 022, lines 74-84)

---

*Single source of truth - no duplication, just references*