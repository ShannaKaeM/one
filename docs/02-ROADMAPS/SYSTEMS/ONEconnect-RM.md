# ONEconnect-RM (Component Orchestration Roadmap)

## Implementation Status

### ✅ Decision Made
- Build from scratch (OOPS version broken)
- Start minimal, add features as needed
- Test everything before adding
- No duplicate systems

### 🚫 Current State
**Status**: Not started  
**OOPS-STORS2 Issues**: Missing critical files (broken)
**OOPS-STORS Original**: ✅ Complete working version found!
- All files present (8 total, ~700 lines)
- `storeConnector.ts` ✅ Clean Zustand integration
- `layoutBuilder.ts` ✅ Grid area assignment  
- `OneConnect.tsx` ✅ Full implementation
- Well architected, production ready

### 🔄 Next Tasks (Minimal V1)
**Phase 1: Bare Minimum**
- [ ] Create simple OneConnect component
- [ ] Basic store connection (just ONEstore)
- [ ] Render single component from theme
- [ ] Direct store access (no events)

**Phase 2: Add When Needed**
- [ ] Generic wrapper creation
- [ ] Store subscriptions 
- [ ] Action binding
- [ ] Child component loading

---

## Features to Evaluate from OOPS

### Core Features (Test Before Adding)

1. **Component Loading**
   - Dynamic component creation ✓ Good concept
   - Component caching ✓ Good
   - Recursive children ? Test first
   - Generic wrapper ✓ Useful

2. **Data Connection**  
   - Store path resolution (e.g., "workspace.gridVisible") ✓ Need this
   - Multiple data sources ? Maybe overkill
   - Data transformation ? Test if needed
   - Auto subscriptions ✓ Good

3. **Action Binding**
   - String → function (e.g., "toggleGrid") ✓ Need this
   - Direct store calls ✓ Yes
   - No event listeners ✓ Yes
   - Parameter passing ? Test first

4. **Theme Integration**
   - Read structure from JSON ✓ Essential
   - data-preset-targets ✓ Good
   - Grid area assignment ✓ Essential
   - Props from theme ✓ Yes

### Duplicate Systems to Avoid
- ❌ Multiple ID generators
- ❌ Different registration methods  
- ❌ Multiple hydration patterns
- ❌ Several layout builders

---

## What ONEconnect Actually Does

### Built-in Features (Self-contained)
1. **Layout Building** - Creates CSS grid from theme
2. **Component Loading** - Dynamic instantiation & caching
3. **Store Subscriptions** - Auto subscribe/cleanup
4. **Data Hydration** - Props from store paths
5. **Action Resolution** - String paths → functions
6. **Wrapper System** - Auto grid areas (a-z)
7. **Recursive Loading** - Nested components

### External Dependencies (Minimal!)
- **Stores**: Passed as hooks (not instances)
- **Components**: Passed as map (no registry needed)
- **Theme**: JSON configuration
- **autoIdHelper**: Just for getGridArea()

### What to Build (Simple Version)

```typescript
// Minimal needs:
interface OneConnectProps {
  theme: ThemeConfig;      // JSON structure
  stores: {                // Store hooks
    oneStore: typeof useONEstore
  };
  components: {            // Component map
    [key: string]: React.Component
  };
}
```

### Core to Keep
- **data-component**: Component to render
- **data-source**: Store path ("workspace.gridVisible")
- **data-actions**: Click handlers ("toggleGrid")
- **Grid areas**: Auto assignment with getGridArea()

### Skip Initially
- Auth checking
- Cloud sync
- Complex subscriptions  
- Caching

---

## File Structure (Proposed)

```
/src/systems/one-connect/
├── OneConnect.tsx      # Main component
├── types.ts           # TypeScript interfaces
└── storeConnector.ts  # NEW - Zustand connection
```

Start with just these 3 files!

---

## Key Improvements for ONE

1. **Simplicity First**
   - Start with 100 lines not 9,600
   - Add complexity only when needed
   - Clear error messages

2. **Fix OOPS Issues**
   - No hardcoded values
   - No console.logs
   - Complete implementation

3. **Better Architecture**
   - Clear separation of concerns
   - Efficient subscriptions
   - Type safety throughout

---

## Questions Answered

1. **Build from scratch?** → YES ✅
2. **How simple?** → As simple as possible
3. **Need all OOPS features?** → NO, test first
4. **Start minimal?** → YES ✅

---

## For Next Agent

**Good News**: Original OOPS-STORS has complete working ONEconnect!
- Location: `/OOPS-STORS/src/components/one-connect/`
- All 8 files present and functional
- Use as reference, but still build minimal version

**Priority**: Build minimal OneConnect that:
1. Reads theme JSON
2. Renders one component 
3. Connects to ONEstore
4. No fancy features yet

**Don't**:
- Copy everything from OOPS
- Add all features at once
- Make it complex

**Do**:
- Reference the working OOPS version
- Start simple (maybe adapt storeConnector.ts first)
- Test each addition
- Keep initial version under 200 lines total

**Note**: The layout switcher innovations came after this version, so this is the clean foundation before things got complicated.