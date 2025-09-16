# Editors Component Documentation

## Overview
**Purpose**: Provides property editing UI for selected canvas elements using ONE theme variables
**Type**: Organism (composed of Header, Accordion, InputBar atoms)
**Status**: Planning

---

Ok i have some thoughts: lets base all of our components off of the OOPs state not on the original studio1. We can look back to studio1 for hints on what maybe got mixed up in the state refactor etc but overall the oops is the moste refined and evolved. it just has so many issues with legacy leftover code etc..so im removing the compairison from these docs we have that in oru oops project if we need it.  no need to menion tthing slike reduced or better now just facts. 

Questions:
what is UIsource? 
1. *?* Component Evolution

2. *?* Local states - are those already part of our project meanint before zusterland we had these? I want to make sure we are utalizing the most inovative and updated solutions so as long as it is necessary to have local states then this is fine i just want to be sure, since i am new to the states game. haha

3. Under compnent dependancies i see something that looks strange what is this?? Main app layout (in editors grid area).

4. Names are really important to get right it is ONEstore and ONEconnect not oneStore etc..in general i like to follos that naming caps firslower second when two words wheere possible

5. Sine we only edit one element at a time EVER, should it be selected element not elements? etc? 

6. I had to update the presets you had them as semantic we DONT do semantic. and we use sidbear for the wrapper not editors editors is just the semmantic name we use for users organization. everything in our system is genric and reusable all specifics are not directly tied development

7. List: ONEconnect, States, Data Source, Data Output, Connected Themes, Presets, Componet + Sub-Components, Theme Processor, Icons, Typescripts  ....more.. we need to just see everything that this one component uses and then we can add on as we need them as we continut with the other componets. 
  *If we organize it like this we can then list things like if they are dependancies or if it depends on it, etc. all in one domain so thing of every piece of our app a domain, everything from icons not utils btu icons, so we can list exactly what icons relationship is to the thing even it it is none. so icons, theme processor ONEstore ONEconnect etc.. well maybe we will group Utils and States proably makes sense that is more consistant but like keep State and Data Dource Events etc all separate, we ill see hot it plays out. 

8.  I noticed that several things are repeaded throughut like componet dependancies. we need t single souce of truth onley one place for informatino never repeat. that way if it is wrong or needs updating like the comonent dependancies we dont have to change it multiple times in multiple places. This is really really important sand why we need to really refind the template for all possible itsms we want to document and if there are none just put none that way we are also documenting none (for now)

9. For 1conetc we need to make sure that editors-wrappers hardcoded thing DOES not make its way over here tahat was a mess, we should be able to add any name in there and have it auto regieter it and updat the registration if we change the name we need to investigate this it was a big issue that we need to figure out once and for all.  
  ? what does child components are pure mean? 
  * the lable for the ONEconnect wrapper, should be arbitrary and changeable NOT HARDCODED! but there maybe a good argument for adding something to the lable so we know it is the parent hydrator? we need to review. 
  * - **Solution**: merge wrapper logic - Yes this was how we had it setup in previous itterations it was good. 


---

## 1


### Current Implementation (OOPS-STORS)
- **Location**: `/src/components/EDITORS/` folder
- **Size**: ~296 lines total
- **Features**: 
  - Modular components (Header, Accordion, InputBar)
  - ONE-CONNECT integration
  - Store-based communication

### Target Implementation (ONE)
- **Planned Structure**: 
  - Keep atomic structure
  - Fix wrapper generation issue
  - Enhance input types later
- **Key Changes**: 
  - Cleaner ONE-CONNECT setup
  - No UISource intermediate *?*
  - Direct store integration

---

## 2. State Requirements

### Local State
- `expandedSections`: Which accordions are open
- `localInputValue`: Temp value for input focus fix

### Store State (ONEstore)
**Actor**: Designer
- `selectedElements`: Currently selected element(s)

**Actor**: Projects
- `canvasElements[id].style`: Element styles being edited

### Derived State
- Current element values (from selected element style)
- Available categories (from ONE theme variables)

---

## 3. Component Connections

### Data Sources
- **UI Theme**: Component layout and presets
- **ONE Theme**: 100+ CSS variables organized by category
- **Store Subscriptions**: 
  - `ONEstore.designer.selectedElements`
  - `ONEstore.projects.canvasElements`

### Data Outputs
- **Store Actions**: 
  - `ONEstore.updateElementStyle(elementId, property, value)`
- **Events**: None (direct store updates)

### Component Dependencies
- **Uses**: Header, Accordion, InputBar
- **Used By**: Main app layout (in editors grid area) *?*

---

## 4. Theme Integration

### UI Theme Structure
```json
{
  "editors": {
    "data-component": "editors",
    "data-source": "ONEstore.designer.selectedElements",
    "data-subscriptions": ["oneStore.projects.canvasElements"],
    "data-actions": {
      "onPropertyChange": "oneStore.updateElementStyle"
    },
    "children": ["editors-header", "editors-accordions"]
  }
}
```

### Preset Classes
- `sidebar`: Container grid styles
- `header`: Header styling
- `accordion`: Accordion container
- `input-bar`: Input field styles

### ONE Theme Variables
- **Categories**: colors, visual, borders, behavior, typography, sizing, spacing, positioning, layout, grid, flex, animation
- **Per Variable**: defaultValue, type, category, description, cssProperty

---

## 5. Atomic Breakdown

### Sub-components
1. **Sidebar**
   - Purpose: Wrap component parts
   - Props: 
   - Reusable: Yes - any section header
2. **Header**
   - Purpose: Display "Element Styles" title
   - Props: `className`, `presetClassMap`
   - Reusable: Yes - any section header

3. **Accordion**
   - Purpose: Collapsible section container
   - Props: `title`, `icon`, `isExpanded`, `onToggle`, `children`, `presetClassMap`
   - Reusable: Yes - any collapsible content

4. **InputBar**
   - Purpose: Label + input field
   - Props: `label`, `value`, `onChange`, `type`, `presetClassMap`
   - Reusable: Yes - any form input

### Shared Utilities
- Category icons mapping (in icons.tsx)
- Theme variable loading (runtimeThemeProcessor)

---

## 6. ONE-CONNECT Integration

### Registration
```javascript
// Wrapper handles data loading - 
componentRegistry.register('editors', {
  component: GenericWrapper,
  needsData: true
});

// Child components are pure
componentRegistry.register('accordion', {
  component: Accordion
});

componentRegistry.register('input-bar', {
  component: InputBar
});
```

### Data Hydration
- ONEconnect provides selected element data
- Wrapper loads ONE theme variables
- Dynamically creates accordion sections
- Passes data to child components

---

## 7. Implementation Notes

### Wrapper Considerations
- **Current**: ONE-CONNECT generates wrapper div
- **Issue**: Extra wrapper when component already has container
- **Solution**: merge wrapper logic

### Performance Considerations
- Local input state prevents re-renders during typing
- Accordion state is component-local
- Only commits changes on blur/enter

### TypeScript
```typescript
interface EditorVariable {
  key: string;
  defaultValue: any;
  type: string;
  category: string;
  description: string;
  cssProperty: string;
}
```

---

## 8. Questions/Decisions Needed

1. [x] Keep autocomplete removed? We will reintroduce much more advanced versions later
2. [ ] How to handle wrapper generation better? Merge is a great option. 
3. [ ] Should categories be configurable? Not sure what you mean
4. [ ] Add specialized input types in Phase 1 or later? Later

---

## 9. Migration Path

### Phase 1: Basic Structure
- [ ] Create EDITORS folder structure
- [ ] Port Header component
- [ ] Port Accordion component
- [ ] Port InputBar component - potentially toolbar with input bar preste - need to review

### Phase 2: Data Integration
- [ ] Set up ONE theme variable loading
- [ ] Connect to ONEstore
- [ ] Implement property updates

### Phase 3: Polish
- [ ] Add proper TypeScript types
- [ ] Test all variable categories
- [ ] Optimize re-renders

---

## 10. Success Criteria

- [x] No event listeners (uses store)
- [x] Direct store communication
- [x] Under 400 lines total (~296 lines)
- [x] Fully typed
- [x] Theme-driven styling
- [x] Reusable composable components
- [ ] Clean wrapper setup
- [ ] All 100+ variables editable