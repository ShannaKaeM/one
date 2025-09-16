# Studio1 Refactor Plan - JSONtoREACT
**Date:** 2025-09-02

## Foundation Rules
1. **NO THEMES** - No primary/secondary, no sm/md/lg, no theme settings
2. **100 base variables LOCKED** - Never add to them
3. **CSS Grid only** - Universal grid areas (a-z), no flexbox
4. **Presets only** - Direct values, no tokens or CSS variables
5. **8 colors per element** - color, backgroundColor, borderColor, outlineColor, fill, stroke, accentColor, caretColor

## System Understanding

### Preset System
- **Component presets**: Define structure (button, input, modal)
- **Layout presets**: Grid areas and arrangements (dashboard, split, fullscreen)
- **Style presets**: Complete color sets (all 8 colors defined)
- **Composable**: Apply multiple presets to transform elements

### Example
```javascript
// ONE element with presets applied
<div class="one wrapper button pink-style dashboard-layout">
  // wrapper = structural preset
  // button = component preset  
  // pink-style = color preset (defines all 8 colors)
  // dashboard-layout = grid area preset
</div>
```

## Plan A: DirectRenderer Refactor

### Extract CanvasCore
Split DirectRenderer (1700 lines) into:
- **CanvasCore**: Element management, drag/drop logic
- **Canvas presets**: Grid overlay, selection handles, add button

### Canvas Presets Structure
```json
{
  "grid-overlay": {
    "--background-image": "repeating-linear-gradient(...)",
    "--position": "absolute",
    "--pointer-events": "none"
  },
  "add-button": {
    "--position": "fixed",
    "--grid-area": "a",
    "content": "+ ONE",
    "data-action": "add-element"
  },
  "selection-handle": {
    "--width": "8px",
    "--height": "8px",
    "--background-color": "hsl(342, 36%, 53%)"
  }
}
```

### Implementation
1. Move element state management to CanvasCore
2. Convert GridOverlay component to grid-overlay preset
3. Convert SelectionHandles to 8 handle presets (nw, n, ne, e, se, s, sw, w)
4. Add "+ ONE" button as preset in grid area 'a'
5. Use data attributes for all interactions

## Plan B: JSONtoREACT Generator

### Core Function
```typescript
function JSONtoREACT(config: JSONConfig): ReactElement {
  const { presets, layout, elements } = config;
  
  return createElement('div', {
    className: presets.join(' '),
    style: resolvePresetStyles(presets),
    children: elements?.map(JSONtoREACT)
  });
}
```

### UI Configuration Structure
```json
{
  "ui": {
    "layout": "dashboard",
    "areas": {
      "a": { "preset": "header" },
      "b": { "preset": "layer-tree" },
      "c": { "preset": "canvas" },
      "d": { "preset": "editors" }
    }
  },
  "one": {
    "elements": [],
    "presets": ["wrapper"]
  }
}
```

### Variable Mapping (shadcn → Studio1)
Must map all shadcn variables to existing 100:
- `--radius` → `--border-radius`
- `--ring` → `--outline-width` + `--outline-color`
- `--primary` → NOT USED (use preset with 8 colors)
- `--foreground/background` → NOT USED (use color presets)

## Implementation Progress (UPDATED 2025-09-02)

### ✅ COMPLETED:
1. **JSONtoREACT Created** 
   - Pure generator function built
   - Located at `/src/components/JSONtoREACT.tsx`
   - Alias: JtoR for short

2. **Auto-ID Helper Created**
   - Located at `/src/utils/autoIdHelper.ts`
   - Generates unique IDs (box-001, etc.)
   - Auto-assigns grid areas (a, b, c...)

3. **Documentation Complete**
   - MAGIC-GRID-GUIDE.md
   - ONE-GRID.md
   - STRUCTURE-TEMPLATE.md
   - ONE-BOX-PRESETS.md

### 🔄 IN PROGRESS:
1. **Naming Conventions**
   - Finalizing box/one/wrapper terminology
   - Aligning with existing DirectRenderer patterns

### ⏳ TODO:
1. **Test JSONtoREACT**
   - Create test dashboard
   - Verify flat structure works

2. **CanvasCore extraction**
   - Remove Chakra from DirectRenderer
   - Extract core logic

3. **Integration**
   - Replace UIGenerator with JSONtoREACT
   - Update App.tsx
   - Remove all Chakra imports

## Files to Create

```
/src/generator/
  ├── JSONtoREACT.tsx      # New pure generator
  ├── CanvasCore.tsx       # Extracted from DirectRenderer
  └── presetResolver.ts    # Merges presets into styles

/src/config/
  ├── ui-presets.json      # UI component presets
  ├── one-presets.json     # Canvas element presets
  └── variable-map.json    # shadcn → Studio1 mapping
```

## What NOT to Do
- ❌ No theme variables (primary, surface, etc.)
- ❌ No size variants (sm, md, lg)
- ❌ No flexbox layouts
- ❌ No adding to 100 base variables
- ❌ No hardcoded React components

## What TO Do
- ✅ Everything is `<div class="one [presets]">`
- ✅ Use CSS Grid with areas a-z
- ✅ Each preset defines complete styles
- ✅ Map all external variables to existing 100
- ✅ Generate everything from JSON



ok great now lets update our roadmap/docs above to match our advancments. 

1. I want to update the structure to be flat again the ui theme.
2. I would like to setup a template for each BOX that covers all of the editing optoins so where we have thigns like data-lable: presets: etc.. could we do something like 

box-id:
component: (presets)
style: (presets)
grid: (jsut for grid layouts) 
utilities: (inline styling could we make utilities for these maybe?)
children: 

This would give us the best of both worlds and if we use utilitis made from out one theme could we then still apply presets ontop of them later? 

so utilities for thigns like overflow, or text size where the base sizing for title pretitel etc are set but typically the only thing that changes for the base styles for the se are text size maybe font width.. i also plan to make fresets with mathmatical calculations for the text and also create contextual auto rexiae based on the actual container and padding that the text block scales propotinatly to it and to eachother lie tilse subtitle body etc.. but for now and for building those thing utitlies would be nice right? and it sould be cool if some whow e coudl make them on the fly since eveythin is pre applied idk but thei sgives us the quick sketing we want and then in future steps we caould then save the entire element as a preset right?


ok good, now for the naming and content piece we need to think about this, becasuse really the text and the media are just content presets not different base elemetns and it would be cool if we could add these as lines to our ONE elment settings like add two more lines text content and media content just text and media, but the thing is i dont think in normal html divs you can have text and image/media together without layers right? but layers just make the flattning concept we plan to do anyway.. so right now we are in the ui theme (dog food) but i think it is a good way to prepaire for the actual user piece. and we need the backend to support the visual piece for sure so we should be looking at things from this lense as we are building the actual ui for the app.. even though we coild easily buitld it out real quick not worry about it, right now is a good time to work these things out right? 

So my vision and what we have alredy setup is a library that uses r2 storage and json for content and media etc.. that i want the user to be able to upload add and then add to the projects.. and we have already set this up for images with the library and basic text useing the one element with the presets of media and text.  But im not real happy with that workflow. i would rather have a single +ONE element (the elemetn is silent and actuall not include it is just ONE). so just add a ONE to the screen add the same options we are setting up now like component and style presets, grid, utilities, and then content text and or image. 

Challenge with the above and my visio:  everything is a true element that follows the css rules and has a direct one to one mapping to our base variables.. so a ONE can have either a text or a media not both, unless the media is a background. but with the visual builder this is really simple to navigate becaseu the user can drop multiple ones on the canvas and layer things up they can add a one and add a background color to it then drop a media in it that isnt a background they could even add a background image to the image in the one.. then they can drop another one and add the text and then they can click both group them and visually they are corret and we can user our visual builder settings to create proper nested html for export form it.. easy.  we could also choose to group and flatten, which then could reate the absolute positiongn that we someines want like background overlays etc. right? becaseu flattening is basically just making everyting layers.. but the beausty is at any time we can choose to edit the group or flattened group and they are all elements individual for editing purposes then the user saves and they go back to flat etc. this will alllow for proper html seo exporting later on and if the usre addes data lables etc it will help the converter produce better seop but it should be able to prodice really clean solid proper html right?  

With this in mind should we simply only allow text OR media in a singel ONE? and if so how cold we enforce that in the backend and on the ui, i asume if we set this stuff up now it will makd the acutal ui user one theme setup easier right because we can copy the settings over or user similar setting but maybe modified for it?  and for me i dont need to have a restrictor on me i can just know i can add an image or text as content. but im thining about the ui interface overall make sense?  

we have setupu some really nice integrations with the library also so those settings for the media and text might be a great starting place for this but just a different ui for it right now we have three buttons wrapper media text i just wand one button  fot one thoughts?
