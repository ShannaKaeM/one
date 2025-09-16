# Stack Roadmap

## Current Stack (Implemented)

### Core Technologies
- **Framework**: React + TypeScript + Vite
- **State Management**: Zustand stores
- **Component System**: ONE-CONNECT (orchestration)
- **Storage**: R2 (Cloudflare) for JSON + media
- **Styling**: Theme-driven with presets

### What's Working Now
- ✅ JSON-based project system
- ✅ R2 storage for all files
- ✅ Component orchestration (ONE-CONNECT)
- ✅ Theme presets and styling
- ✅ Local storage fallback
- ✅ Offline-first architecture

---

## Phase 1: Finish ONE-CONNECT Refactor 🚧

**Current Status**: Phase 2 - Data Flow Updates

### Remaining Tasks
1. Update all components to ONE-CONNECT pattern
2. Remove inline styles, apply theme presets
3. Split large components (DirectRenderer, Library)
4. Delete old utils
5. Performance optimizations

---

## Phase 2: Add Authentication (When Ready)

### Clerk Integration Plan

**Why Clerk?**
- No database needed
- Beautiful pre-built UI
- Free up to 10,000 users
- Works perfect with JSON architecture

**Implementation Steps:**

```bash
# 1. Install Clerk
npm install @clerk/clerk-react

# 2. Create .env.local
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

```typescript
// 3. Update App.tsx
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

function App() {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  
  // No auth if no key (development mode)
  if (!clerkKey) {
    return <OneConnect />
  }
  
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <SignedIn>
        <UserButton />
        <OneConnect />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkProvider>
  )
}
```

```typescript
// 4. Update storage paths
// src/utils/r2Manager.ts
import { useUser } from '@clerk/clerk-react'

export async function saveProject(project: Project) {
  const { user } = useUser()
  const path = user 
    ? `users/${user.id}/projects/${project.id}.json`
    : `local/projects/${project.id}.json`
    
  await r2.upload(path, project)
}
```

### User Flow
1. User signs up via Clerk
2. Auto-create R2 folders: `/users/{userId}/`
3. Copy starter templates
4. Everything scoped by userId

---

## Phase 3: Cloudinary Integration (When Ready)

### Why Add Cloudinary?
- **Not for storage** - R2 handles that
- **For transformations** - Resize, effects, AI
- **On-demand only** - No uploads to Cloudinary

### Implementation Plan

```bash
# 1. Install when ready
npm install @cloudinary/url-gen @cloudinary/react

# 2. Add to .env.local
VITE_CLOUDINARY_CLOUD_NAME=your-cloud
VITE_CLOUDINARY_API_KEY=your-key
```

```typescript
// 3. Create simple transform utility
// src/utils/cloudinary.ts
export function getCloudinaryUrl(r2Url: string, transforms: {
  width?: number
  height?: number
  effect?: string
}) {
  // Proxy R2 images through Cloudinary for transforms
  return `https://res.cloudinary.com/your-cloud/image/fetch/${transforms}/${r2Url}`
}
```

### Cloudinary Features to Add

**Basic Transforms**
- Resize/crop for responsive images
- Format conversion (auto WebP)
- Quality optimization

**AI Features** (Premium)
- Background removal
- Object removal
- Generative fill
- Image upscaling

**Video Features**
- Trim/preview generation
- Format conversion
- Thumbnail extraction

---

## Phase 4: Lightroom-Style Editor (Future)

### Planned Features

**Basic Adjustments**
- Brightness/Contrast
- Saturation/Vibrance
- Highlights/Shadows
- Temperature/Tint

**Advanced Tools**
- Curves adjustment
- HSL controls
- Split toning
- Graduated filters

**Implementation Approach**

```typescript
// Component structure planned
src/components/image-editor/
├── ImageEditor.tsx         // Main container
├── AdjustmentPanel.tsx     // Sliders for basic edits
├── HistogramView.tsx       // Visual feedback
├── PresetLibrary.tsx       // Save/load presets
└── hooks/
    ├── useImageProcessing.ts
    └── useCloudinaryTransforms.ts
```

**How it works:**
1. Load image from R2
2. Apply adjustments locally (Canvas API)
3. Generate Cloudinary URL with transforms
4. Save edited version back to R2

**Example Transform Chain:**
```typescript
const editedUrl = cloudinary.transform(originalUrl, {
  brightness: 10,
  contrast: 20,
  saturation: -10,
  sharpen: 100,
  quality: 'auto'
})
```

---

## Architecture Benefits

### Why This Stack?
1. **No Database** - Everything JSON
2. **Progressive Enhancement** - Add features as needed
3. **Offline First** - Works without internet
4. **Cost Effective** - R2 is cheap, Clerk/Cloudinary have free tiers
5. **Developer Friendly** - Simple to understand and maintain

### Storage Strategy
```
R2 Bucket Structure:
/users/{userId}/
  /projects/      # JSON project files
  /media/         # Original uploads
  /generated/     # Cloudinary-processed versions
  /presets/       # User's custom presets
```

---

## Timeline

### Now
- Finish ONE-CONNECT refactor
- Ship working app

### When Ready for Users
- Add Clerk auth
- Update storage paths

### When Ready for Advanced Features
- Add Cloudinary transforms
- Build Lightroom editor

### Future Possibilities
- AI image generation
- Collaborative editing
- Version control for projects
- Export to various formats

---

## Quick Reference

### Environment Variables
```bash
# Current (R2 only)
VITE_R2_ACCOUNT_ID=xxx
VITE_R2_ACCESS_KEY_ID=xxx
VITE_R2_SECRET_ACCESS_KEY=xxx
VITE_R2_BUCKET_NAME=studio1

# Future (when ready)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
VITE_CLOUDINARY_CLOUD_NAME=xxx
VITE_CLOUDINARY_API_KEY=xxx
```

### Package Dependencies
```json
// Current
"dependencies": {
  "react": "^19.x",
  "zustand": "^5.x",
  // ... existing
}

// Future additions
"dependencies": {
  "@clerk/clerk-react": "^5.x",      // When adding auth
  "@cloudinary/url-gen": "^1.x",     // When adding transforms
  "@cloudinary/react": "^1.x"        // For React components
}
```

---

*Simple stack, powerful capabilities, add features as needed!*