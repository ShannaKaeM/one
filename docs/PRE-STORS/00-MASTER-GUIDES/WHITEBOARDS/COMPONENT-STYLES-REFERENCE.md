# Component Styles Reference

This document lists all CSS classes and styles applied to each React component based on the ui-theme.json structure.

## LayerTree Component

### Classes Applied:
- `layertree` (root)
- `layertree-wrapper` (auto-generated wrapper)

### Preset Styles:
```css
.layertree {
  width: 100%;
  height: 100%;
  background-color: hsl(0, 0%, 15%);
  color: hsl(0, 0%, 90%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
}
```

### Child Elements:
- **layertree-header**
  ```css
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid hsl(0, 0%, 25%);
  ```

- **layertree-title**
  ```css
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(0, 0%, 70%);
  ```

- **layertree-content**
  ```css
  display: grid;
  grid-auto-rows: max-content;
  align-content: start;
  overflow-y: auto;
  overflow-x: hidden;
  ```

- **layertree-item**
  ```css
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  ```

- **layertree-info**
  ```css
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "icon name";
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  overflow: hidden;
  ```

- **layertree-icon**
  ```css
  grid-area: icon;
  color: hsla(0, 0%, 100%, 0.5);
  font-size: 14px;
  width: 1rem;
  height: 1rem;
  ```

- **layertree-name**
  ```css
  grid-area: name;
  font-size: 0.8125rem;
  color: inherit;
  ```

- **layertree-controls**
  ```css
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "visibility lock";
  align-items: center;
  gap: 0.25rem;
  ```

- **layertree-visibility**
  ```css
  grid-area: visibility;
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  font-size: 0.75rem;
  opacity: 0.5;
  color: hsl(0, 0%, 80%);
  border-radius: 3px;
  ```

- **layertree-lock**
  ```css
  grid-area: lock;
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  font-size: 0.75rem;
  opacity: 0.5;
  color: hsl(0, 0%, 80%);
  border-radius: 3px;
  ```

## Header Component

### Classes Applied:
- `header` (root)
- `header-wrapper` (auto-generated wrapper)

### Preset Target Mapping:
- `:header` → applies `header` preset to root
- `header-title:header-title` → applies `header-title` preset to title element

### Preset Styles:
```css
.header {
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid hsl(0, 0%, 25%);
}

.header-title {
  font-size: 1rem;
  font-weight: 500;
  color: hsl(0, 0%, 90%);
}
```

## Accordion Component

### Classes Applied:
- `accordian` (root - note the typo)
- `accordion-wrapper` (auto-generated wrapper)

### Preset Target Mapping:
- `:accordian` → root element
- `accordion-header:accordian-header` → header element
- `accordion-title:accordian-title` → title container
- `accordion-icon:accordian-icon` → icon element
- `accordion-label:accordian-label` → label text
- `accordion-toggle:accordian-toggle-icon` → toggle icon
- `accordion-content:accordian-content` → content area

### Preset Styles:
```css
.accordian {
  grid-auto-rows: min-content;
  border-bottom: 1px solid hsl(0, 0%, 20%);
}

.accordian-header {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: "title toggle";
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.accordian-header-hover {
  background-color: hsla(0, 0%, 100%, 0.05);
}

.accordian-title {
  grid-area: title;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
}

.accordian-icon {
  font-size: 1rem;
  line-height: 1;
  height: 1rem;
  align-items: center;
  overflow: hidden;
}

.accordian-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.accordian-toggle-icon {
  grid-area: toggle;
  font-size: 0.75rem;
  color: hsl(0, 0%, 60%);
}

.accordian-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  padding: 0 0 1rem 0;
  gap: 0.75rem;
}
```

## InputBar Component

### Classes Applied:
- `input-bar` (root)
- `input-bar-wrapper` (auto-generated wrapper)

### Preset Target Mapping:
- `:input-bar` → root element
- `input-bar-control:input-bar` → control container
- `input-bar-label:input-bar-label` → label element
- `input-bar-input:input-bar-input` → input element

### Preset Styles:
```css
.input-bar {
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 2fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.input-bar-label {
  font-size: 0.75rem;
  color: hsl(0, 0%, 70%);
}

.input-bar-input {
  padding: 0.375rem 0.5rem;
  background-color: hsl(0, 0%, 20%);
  color: hsl(0, 0%, 90%);
  border: 1px solid hsl(0, 0%, 25%);
  border-radius: 4px;
  font-size: 0.75rem;
  transition: all 0.15s ease;
  outline: none;
}

.input-bar-input-focus {
  border-color: hsl(342, 36%, 53%);
  background-color: hsl(0, 0%, 22%);
}
```

## DirectRenderer Component (Canvas)

### Classes Applied:
- `canvas-wrapper` (auto-generated wrapper)
- No specific presets defined in theme

### Props:
- `theme: "one"` - Uses the "one" theme for rendered elements

## Library Component

### Classes Applied:
- `library-wrapper` (auto-generated wrapper)
- No specific presets defined in theme

## CanvasControls Component

### Classes Applied:
- `canvas-controls-wrapper` (auto-generated wrapper)
- No specific presets defined in theme

## LayoutSwitcher Component

### Classes Applied:
- `layout-switcher-wrapper` (auto-generated wrapper)
- No specific presets defined in theme

### Props:
- `displayMode: "icons"`

## GenericWrapper (editors-wrapper)

### Classes Applied:
- `sidebar` (from preset target `:sidebar`)
- `editors-wrapper` (auto-generated wrapper)

### Preset Styles:
```css
.sidebar {
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: "a" "b";
  background-color: hsl(0, 0%, 15%);
  color: hsl(0, 0%, 90%);
  overflow: hidden;
  padding: 1rem;
}
```

## Base UI Class

All components inherit from:
```css
.ui {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "a";
}
```

## Layout Classes

### dashboard
```css
.dashboard {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  grid-template-columns: 250px 1fr 1fr 350px;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas: "a b e f" "a c c f" "a d d f";
}
```

### dashboard-library-canvas
```css
.dashboard-library-canvas {
  min-height: 100%;
  position: relative;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: "a c" "b d";
}
```

### dashboard-canvas
```css
.dashboard-canvas {
  min-height: 100%;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas: "a" "b" "c";
}
```

## Notes

1. **Wrapper Classes**: Each component automatically gets a `{component-key}-wrapper` class
2. **Grid Areas**: Components are assigned to grid areas (a, b, c, d, e, f) based on their order in the layout children array
3. **Inheritance**: All components inherit the base `ui` class styles
4. **Preset Application**: Components use `data-preset-targets` to map presets to specific elements
5. **Missing Styles**: Several components (Library, CanvasControls, LayoutSwitcher) don't have specific preset styles defined in the theme