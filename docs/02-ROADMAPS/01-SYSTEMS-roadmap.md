# SYSTEMS-roadmap

## Current Stack ✅

### Build Tool
- **Vite** - Fast dev server & bundler
  - Hot Module Replacement (HMR)
  - Lightning fast cold starts
  - TypeScript out of the box

### Framework
- **React 19** - Latest version
- **TypeScript** - Type safety throughout

### State Management
- **Zustand 5** - Simple state management
  - DevTools support included
  - TypeScript types built-in
  - No providers needed

### Development
```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## What We Have vs OOPS

### Already Installed ✅
- React
- TypeScript  
- Zustand
- Vite
- ESLint

### From OOPS (Add as Needed)
- [ ] **Runtime Theme Processor** - JSON to CSS conversion
- [ ] **R2 Worker** - Cloudflare storage (for Library)
- [ ] **Component Registry** - Dynamic component mapping

### Dependencies We Don't Need Yet
- ❌ Chakra UI (using our own system)
- ❌ React Router (single page for now)
- ❌ Axios/Fetch libraries (native fetch is fine)

---

## System Components to Build

### Core Systems
1. **ONEstore** ✅ - Central state management
2. **ONEconnect** - Component orchestration
3. **Theme Processor** - Runtime CSS generation
4. **Auto Grid** - a-z grid area assignment

### Utilities Needed
- `getGridArea()` - Auto assign a, b, c...
- `elementRenderer` - Element to HTML
- `r2Manager` - Cloud storage client

---

## Project Structure

```
ONE/
├── src/
│   ├── stores/         # State management
│   │   └── ONEstore.ts ✅
│   ├── components/     # UI components (coming soon)
│   ├── systems/        # Core systems (coming soon)
│   └── utils/          # Helpers (coming soon)
├── public/
│   └── data/
│       └── themes/     # JSON themes (coming soon)
└── docs/               # Documentation ✅
```

---

## Quick Start

1. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: http://localhost:5173

---

## Next Additions

Based on our roadmap, add these as we build:

1. **Theme System**
   - Port runtimeThemeProcessor
   - Create theme JSON files
   - Apply to App.tsx

2. **ONEconnect**
   - Port from OOPS-STORS2
   - Update for ONEstore
   - Component registration

3. **Components**
   - Start with Loop/LoopItem
   - Then other components

---

## Notes

- Keep it minimal - add only what's needed
- No hardcoding - everything configurable
- CSS Grid only - no flexbox
- Follow the ONEnew-roadmap for order