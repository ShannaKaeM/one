# Visual Builder Guide - Content Architecture

## Table of Contents
1. [Core Concept - Everything is ONE](#core-concept---everything-is-one)
2. [Content Type System](#content-type-system)
3. [Auto-Split Pattern](#auto-split-pattern)
4. [Visual Builder Workflow](#visual-builder-workflow)
5. [Position-Based Design](#position-based-design)
6. [Why This Architecture](#why-this-architecture)
7. [Save-as-Preset System](#save-as-preset-system)
8. [Current Element Implementation Analysis](#current-element-implementation-analysis)
9. [Refactoring Strategy](#refactoring-strategy)
10. [Implementation Status](#implementation-status)

## Core Concept - Everything is ONE

In Studio1, **every element is type "one"** - a single, unified element type. No divs, spans, sections, or articles. Just "one".

### What Makes Elements Different?
- **Content Type** - What kind of content it holds (text, media, or none)
- **Presets** - Classes that define appearance and behavior
- **Position** - Where it sits determines its role

## Content Type System

Every element has a `contentType` property that defines what it can contain:

### The Three Types

1. **`contentType: "text"`**
   - Can only contain text content
   - No children allowed
   - Example: Headlines, paragraphs, labels

2. **`contentType: "media"`** 
   - Can only contain images or videos
   - Has `src` property instead of `content`
   - Example: Hero images, thumbnails, backgrounds

3. **`contentType: "none"`**
   - Container only (default)
   - Can have children
   - Example: Layouts, groups, sections

### Why Not Background Images?
Traditional web design uses CSS background images, but this creates problems:
- Can't stack multiple images with individual controls
- Hard to manage in visual builders
- Not real content (bad for SEO/accessibility)
- Complex CSS references for image storage

Our solution: **Everything is real content**

## Auto-Split Pattern

The magic happens when users try to add both text AND an image to the same element.

### The Problem
HTML elements can't directly contain both text and an image without structure.

### The Solution
When user adds both content types to one element, the system automatically:
1. Converts the element to a container (`contentType: "none"`)
2. Creates two child elements
3. Moves content to appropriate children

### Example Flow

**Step 1: User creates text element**
```json
{
  "type": "one",
  "contentType": "text",
  "content": "Hello World"
}
```

**Step 2: User drops image onto same element**
System automatically transforms to:
```json
{
  "type": "one",
  "contentType": "none",
  "presets": ["box", "group"],
  "children": [
    {
      "type": "one",
      "contentType": "text",
      "content": "Hello World",
      "presets": ["text"]
    },
    {
      "type": "one", 
      "contentType": "media",
      "src": "image.jpg",
      "presets": ["media"]
    }
  ]
}
```

### Visual Result
What started as a simple text element is now a group containing both text and image, which can be:
- Reordered (image above/below text)
- Styled independently
- Given different opacities
- Positioned with grid areas

## Visual Builder Workflow

### 1. Design Mode (Flat Bento View)
- See all top-level elements as cards
- Each card shows its content/children
- Drag cards to reorder
- Visual hierarchy is clear

### 2. Edit Mode (Group Expansion)
- Click to "enter" a group
- Edit children in context
- Breadcrumb navigation
- Maintains spatial awareness

### 3. Export Mode (Clean Output)
- Proper nested HTML structure
- No builder artifacts
- SEO-friendly markup
- Production-ready code

## Position-Based Design

### No Names, Just Position
Elements don't have semantic names or roles. Their position determines behavior:
- First child in toolbar = left aligned
- Second child = center
- Third child = right

### Benefits
- **Drag anywhere**: Element adapts to new context
- **No configuration**: Just works based on position
- **Infinitely flexible**: Any element can go anywhere
- **Context-aware**: Same element behaves differently based on parent

### Example
```json
{
  "type": "one",
  "layouts": "toolbar-cols",
  "children": [
    {"type": "one", "content": "Logo"},      // Becomes left-aligned
    {"type": "one", "content": "Nav"},       // Becomes centered
    {"type": "one", "content": "User Menu"}  // Becomes right-aligned
  ]
}
```

Move the logo to position 3, and it automatically becomes right-aligned. No configuration needed.

## Why This Architecture

### 1. Visual Flexibility
- Layer multiple images with individual opacity
- Stack content in any order
- Create complex compositions easily
- True WYSIWYG editing

### 2. Clean Separation
- Structure (JSON) separate from styling (presets)
- Content separate from presentation
- Easy to reason about

### 3. Storage Simplification
- All images are content, not CSS references
- Simple R2/S3 integration
- No complex asset pipeline

### 4. Export Quality
- Semantic HTML output
- Proper content structure
- SEO and accessibility friendly
- No div soup

### 5. Intuitive Editing
- What you see is the actual structure
- No hidden layers or background tricks
- Direct manipulation
- Predictable behavior

## Save-as-Preset System

### Concept
Users can extract any element's styling into a reusable preset:
1. Modify element with direct-variables
2. Apply existing presets
3. Save the combination as a new preset

### What Gets Saved
```json
{
  "preset-name": "my-custom-card",
  "includes": {
    "existing-presets": ["box", "neutral-light"],
    "direct-variables": {
      "padding": "2rem",
      "border-radius": "12px",
      "box-shadow": "0 4px 6px rgba(0,0,0,0.1)"
    }
  }
}
```

### Where Presets Get Saved
- **Local**: Initially in ui-theme.json under user presets
- **R2 Storage**: Via Library component (already has R2 integration)
- **Shareable**: Export/import preset packs

### Integration with Library
The Library component already handles R2 storage. We need to:
1. Add preset type to library items
2. Enable preset drag & drop (not just media)
3. Save presets with metadata (creator, date, usage)

## Current Element Implementation Analysis

### What Exists Now
The codebase has already converged to "one" element type! But with legacy patterns:

1. **Element Creation Confusion**
   - Canvas buttons dispatch events with `elementType: 'wrapper'|'text'|'media'`
   - DirectRenderer creates `type: 'one'` with different `presetType`
   - Library creates `type: 'one'` with media preset

2. **Content Structure**
   ```javascript
   content: {
     text: string,    // For text elements
     src: string,     // For media elements
     layers: Array    // Deprecated
   }
   ```

3. **Preset vs ContentType**
   Currently using `presetType` to determine behavior, but should transition to `contentType`

## Refactoring Strategy

### Option 1: Immediate Refactor (Recommended)
**Do this BEFORE migrating more components to JTR**

1. **Add contentType property**
   ```javascript
   {
     type: 'one',
     contentType: 'text' | 'media' | 'none',
     content: string | { src: string },  // Simplified
     appliedPresets: ['text'] // Visual styling
   }
   ```

2. **Update element creation**
   - Canvas buttons set contentType instead of presetType
   - Library sets contentType: 'media'
   - Remove legacy elementType dispatching

3. **Implement auto-split**
   - When dropping media on text element
   - When adding text to media element
   - Create container with two children

### Option 2: Deferred Refactor
Complete JTR migration first, then refactor. But this means:
- ❌ More technical debt
- ❌ Harder refactor later
- ❌ Confusing mixed patterns

### Migration Steps

1. **Update DirectRenderer element creation** (1 hour)
   - Replace presetType with contentType
   - Simplify content structure
   
2. **Update canvas button handlers** (30 min)
   - Change event details to use contentType
   - Remove elementType concept

3. **Update Library drag handling** (30 min)
   - Set contentType: 'media'
   - Maintain existing R2 integration

4. **Add auto-split logic** (2 hours)
   - Detect mixed content scenarios
   - Transform element structure
   - Update positions/layout

5. **Update preset system** (1 hour)
   - Separate visual presets from content type
   - Enable save-as-preset functionality

## Implementation Status

Current state:
- ✅ Single element type ("one") - Implemented (but with legacy patterns)
- ✅ Position-based design - Implemented  
- ⏳ Content type property - Ready to implement
- ⏳ Auto-split functionality - Ready after contentType
- ⏳ Save-as-preset - Ready to implement
- 🔧 Element creation - Needs cleanup