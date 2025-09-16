# Session 09: Reimplementation of data-preset-targets for data-component System

## Date: January 2, 2025

## Overview
This session focused on reimplementing the `data-preset-targets` system from a backup version to fix the DirectRenderer height issue. The system allows React components injected via `data-component` to receive styling through theme presets applied to their wrapper elements.

## Key Problem Identified
The DirectRenderer component had no height because:
1. React components injected via `data-component` were not getting proper wrapper styling
2. The previous `data-preset-targets` system that handled this was not fully implemented
3. Height chain was broken due to missing presets and wrapper configuration

## Solution Implemented

### 1. Understanding the Original System
From backup analysis (`/Users/shannamiddleton/Local Drive Mac/mi agency/miApps/BACKUP/studio1-AUG-24/`):
- `data-component` elements could have `data-preset-targets` array
- Format: `[":react-wrapper"]` where `:` prefix meant "apply to the wrapper div"
- This gave theme-based styling control over injected React components

### 2. JSONtoREACT Updates
Modified the data-component handling to parse `data-preset-targets`:

```typescript
// Parse data-preset-targets BEFORE creating the component
if (element['data-preset-targets']) {
  const targets = Array.isArray(element['data-preset-targets']) 
    ? element['data-preset-targets'] 
    : [element['data-preset-targets']];
  
  targets.forEach((target: string) => {
    if (target.startsWith(':')) {
      // Target starts with ':', meaning it applies to the wrapper div
      const presetName = target.substring(1); // Remove the :
      classNames.push(presetName);
      console.log('🎯 Adding wrapper preset to classes:', presetName);
    }
  });
}
```

### 3. Theme Configuration Updates
Added to ui-theme.json:
- Added `react-wrapper` preset (later changed to use `canvas-container` directly)
- Added missing `full-vh-height` preset for root element height chain
- DirectRenderer configuration includes `data-preset-targets: [":canvas-container"]`

### 4. Height Chain Fix
Established proper height chain:
1. Root element: `height: 100vh` (via `full-vh-height` preset)
2. Grid system: Allocates `60px` to header, `1fr` to canvas area
3. DirectRenderer wrapper: `height: 100%` (via `canvas-container` preset)
4. Inner components: Can now use percentage-based heights

## Current Implementation

### DirectRenderer Element Structure
```json
"direct-renderer": {
  "type": "one",
  "data-label": "direct-renderer",
  "grid-area": "b",
  "layouts": "canvas-container",
  "looks": "neutral-dark",
  "data-component": "direct-renderer",
  "data-preset-targets": [":canvas-container"]
}
```

### Resulting HTML Structure
```html
<div class="one canvas-container neutral-dark" data-label="direct-renderer" style="grid-area: b;">
  <div style="position: relative; width: 100%; height: 100%;">
    <!-- DirectRenderer content -->
  </div>
</div>
```

## Key Insights
1. The `:` prefix in data-preset-targets is crucial - it indicates wrapper targeting
2. Height percentages require explicit parent heights all the way up the chain
3. The system allows theme-based control over React component styling without modifying the components
4. This approach maintains separation between theme layer (JSON) and component layer (React)

## Files Modified
1. `/src/components/JSONtoREACT.tsx` - Added data-preset-targets parsing for wrapper classes
2. `/public/data/themes/ui-theme.json` - Added full-vh-height preset, configured direct-renderer

## Testing Results
- DirectRenderer now properly fills its grid area
- Height chain is complete from root to canvas
- Elements can be dropped and moved within the canvas
- Grid overlay and selection handles are visible

## Next Steps
- Add specific classes to DirectRenderer child components for granular preset targeting
- Test with different viewport sizes and container scenarios
- Consider adding more layout presets for different dashboard configurations

## Agent Handoff

### Current State
- Core `data-preset-targets` functionality is implemented and working
- DirectRenderer has proper height and fills its container
- The wrapper system allows theme-based styling of React components

### Immediate Tasks if Continuing
1. **Child Component Targeting**: Add classes to DirectRenderer's internal components (GridOverlay, SelectionHandles, etc.) for preset-based styling
2. **Testing**: Verify the system works with different layout configurations
3. **Documentation**: Update main documentation with data-preset-targets usage

### Known Issues
- None currently blocking, but watch for:
  - Height calculation in nested grid scenarios
  - Preset inheritance in deeply nested components
  - Performance with many preset applications

### Key Code Locations
- JSONtoREACT data-preset handling: `src/components/JSONtoREACT.tsx` lines 231-245
- Theme presets: `public/data/themes/ui-theme.json` presets section
- DirectRenderer structure: `public/data/themes/ui-theme.json` lines 865-873

### Context for Next Session
The user specifically wanted this system reimplemented to match their backup version's approach. They prefer theme-based control over component styling and may want to extend this to other components beyond DirectRenderer.