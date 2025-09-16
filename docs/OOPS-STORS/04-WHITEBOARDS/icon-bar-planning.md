# Icon Bar Planning Whiteboard

## Current Situation Analysis

### What We Found About LayoutSwitcher

1. **"It" is the LayoutSwitcher component** that auto-discovers layouts
2. **Auto-discovery mechanism**: useEffect hook that reads from theme presets
3. **The override issue**: App.tsx reads initial layout from `structure.root.layouts` (hardcoded as "dashboard")
4. **Multiple lookup locations**:
   - LayoutSwitcher looks in: `presets.layouts`
   - App.tsx looks in: `structure.root.layouts`
   - We tried to add: `presets.layouts.dashboard-layouts`

### State Connections to LayoutSwitcher

**Direct State Connections:**
1. **uiStore**
   - `layout: string` - Current active layout (default: 'dashboard')
   - `setLayout: (layout: string) => void` - Sets the layout

2. **presetStore** 
   - `availableLayouts: string[]` - List of available layout names
   - `currentLayout: string | null` - Tracks current layout
   - `switchLayout: (layout: string) => void` - Switches layout AND syncs with uiStore
   - `setAvailablePresets` - Populates available layouts from theme

### What Was Created Specifically for LayoutSwitcher
1. **LayoutInfo type** - Specific to this component
2. **Auto icon generation logic** (generateLayoutIcon function) - KEEP THIS!
3. **Layout discovery from theme logic**
4. **The hardcoded initial layout in structure.root.layouts**

### What's Reusable/Integrated Elsewhere
1. **layout state in uiStore** - Used by App.tsx, processThemeStructure, OneConnect
2. **setLayout action** - Used throughout the app
3. **availableLayouts in presetStore** - Could be used by other components
4. **The preset target system** (`:icon-toolbar`, `button:icon-button`)

---

## Proposed Plan: icon-bar & icon-btn Components

### Design Principles
- **Composable**: icon-bar contains icon-btn components
- **Generic**: Works for ANY toolbar (layouts, tools, layers, etc.)
- **CSS Grid**: Both components use grid (NO FLEX)
- **100% sizing**: All components fill their grid area
- **Auto grid areas**: Automatic assignment based on position
- **Preset-driven**: All styling from theme presets
- **Data-driven**: Content from data-source, actions from data-actions

### Step 1: Create icon-btn Component
**Purpose**: Generic button component for any icon-based action

**Features**:
- Accepts icon (from props or auto-generated)
- Click handler from data-actions
- Active state from data *what does this mean?*
- 100% width/height-CSS grid based (1fr 1fr)-Grid area 'a' for content - *these are already applied to the base ui element so we dont need to add them fyi*
- Fully preset-driven styling

**Example Usage**:
```json
{
  "type": "ui",
  "data-component": "icon-btn",
  "data-preset-targets": [":icon-button", ":active"], *how will we style active state hover etc?*
  "props": {
    "icon": "�",
    "title": "Dashboard Layout" *where does this come from? is it hardcoded?*
  },
  "data-actions": {
    "onClick": "uiStore.setLayout"
  }
}
```

### Step 2: Create icon-bar Component
**Purpose**: Generic container for icon buttons

**Features**:
- CSS grid container (1fr 1fr pattern) *this is the bases settings but we would modify this for the icons to congrole heigh tand width of them*
- Accepts data-source for items to display 
- Maps items to icon-btn components
- 100% width/height *the outter is 100% but the grid inside of it can dictate the size of the component, so for example this will go inside of grid area that has 60px height above the canvas - this is set by the grid area that it sits inside of so the wrapper is 100% w h, but its grid area inside of it then dictates the size of its children and its children are 100% w h as well but it can also have grid areas insiee... so this is how we size and layout*
- Auto-assigns grid areas to children *this is already built inoto every component right? so we dont want to duplicate it, but if you saying it auto assigne grid area like "a b c" that is ok and i assume it woudl be more of an auto col right? but from there the auto grid areas are applied to the children so we dont have to manually assign them grid areas whcih makes everythign modular and flexiable* 
- Supports any array data source *can you give me an example pleaase of aray data souce? use case?*

**Example Usage**:
```json
{
  "type": "ui", 
  "data-component": "icon-bar",
  "data-source": "presetStore.availableLayouts", *is this a universal store or created sepcifically for this component or for all layouts im confused about where this is setup and how it defines which layouts to use?*
  "data-preset-targets": [":icon-bar"], *you had toolbar but it is icon-bar i chagned*
  "data-actions": {
    "onItemClick": "uiStore.setLayout"
  },
  "props": {
    "iconGenerator": "layoutIcon", // optional auto-icon function
    "activeKey": "layout" // which store property to check for active state
  }
}
```

### Step 3: Update Theme Configuration
1. Replace 'layout-switcher' with 'icon-bar' in theme structure
2. Add proper data-source and data-actions *proper data source can we setit up to use a dashboard specific layout category because if we just use layout there could be many other componets added to generic layout* 
3. Keep existing preset targets
4. Remove layout-switcher specific props

### Step 4: Update All Layout Definitions
Replace in all layouts: *im not sure what you mean replace in all layouts where woudl this be because in our current dashboar layouts we currently dont have anything like this andded andour structure layout is minimal just referecing the first dashboard layout*
- `"layout-switcher"` � `"icon-bar"`

Affected layouts:
- dashboard
- dashboard-canvas  
- dashboard-library-canvas

### Step 5: Clean Up Old Code
1. Delete `/src/components/LayoutSwitcher.tsx`
2. Remove LayoutSwitcherProps and LayoutInfo from `controls.types.ts`
3. Update `App.tsx` - remove LayoutSwitcher import
4. Update `registerComponents.ts` - remove layout-switcher, add icon-bar and icon-btn *do we need to register components now with the oneconnect, does it auto reginser for us?*

### Step 6: Handle Auto Icon Generation
Move the clever auto-icon logic to a utility:
- `/src/utils/iconGenerators.ts`
- Export functions like `generateLayoutIcon(cols, rows, children)`
- Can be referenced by name in theme props

---

## Benefits of This Approach

1. **Reusability**: icon-bar can be used for:
   - Layout switcher
   - Tool palette
   - Layer actions
   - Any other icon-based toolbar

2. **Simplicity**: Two simple components vs one complex one

3. **Flexibility**: Different icon generators for different use cases

4. **Consistency**: All toolbars work the same way

5. **Theme-driven**: Everything configured in JSON

---

## Questions to Consider

1. Should icon-bar support different grid patterns (2x2, 3x3, etc.)?
2. Should we keep the subcategory approach (dashboard-layouts)?
3. How should we handle tooltips - built into icon-btn or separate?
4. Should active state highlighting be automatic based on data-source?

---

## Next Steps

[ ] Review and refine this plan
[ ] Decide on icon-bar grid patterns
[ ] Create icon-btn component first
[ ] Create icon-bar component
[ ] Update theme configuration
[ ] Test with layout switching
[ ] Apply pattern to other toolbars

*ok final questions and thoughts, 
1. can you tell me in this plan are there any hardecoded connections like we had with the previous layout switcher that depended on the name of the default layout?
2. can we use the custom category like dashboard-layouts and use the existing order top to bottom for example to direct the auto generation etc instead of connecting anything to any names? 
3. which pieces of this setup are "tied" to the auto creation of the icons or other potential items? for example is it fully reliant on data-stors and the new util? so we could use them on any components like other button types and other toolbars not just the icon-bar? what i am getting at is, it it is all external between stors and the utils coudl we just copy all the settings to another toolbar and another button for a differntt setup etc or if it is tied to the icon-bar maybe we make it more generic toolbar? then we can just use props for differnt layouts for the toolbar. But also yyou asked about differnt layouts but we can just use presets for diffent layuts etc.. so we dont need to weigh anythign down with a buch of pre optinions.. we are looking for th bare minimum irght now 
---

*Add your comments and changes below:*