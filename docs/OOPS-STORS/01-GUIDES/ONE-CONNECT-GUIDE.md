# ONE-CONNECT System Guide

## Overview

ONE-CONNECT is our unified component orchestration system that connects your UI components to data stores automatically. It reads configuration from your theme file and creates a living, reactive interface without manual wiring.

---

## How It Works

```
Theme Configuration → ONE-CONNECT → Living Components
         ↓                 ↓              ↓
   (JSON structure)  (Reads & Connects)  (React UI)
```

ONE-CONNECT reads your theme structure and:
1. Creates components (or generic wrappers)
2. Connects them to data stores
3. Applies presets and styling
4. Handles updates automatically

---

## Data Attributes Explained

### 📊 **data-component**

Specifies which React component to render.

```json
{
  "layertree": {
    "data-component": "layertree"  // Renders the LayerTree component
  }
}
```

**🎯 Generic Wrapper Feature:**
If the component doesn't exist, ONE-CONNECT creates a generic wrapper!

```json
{
  "editors": {
    "data-component": "editors-wrapper"  // No actual "editors-wrapper" component exists!
  }
}
```

This creates a `<div>` that can be styled with presets - no extra wrapper component needed!

---

### 📥 **data-source**

The primary data source from stores. Think of it as "what data does this component display?"

```json
{
  "library": {
    "data-component": "library",
    "data-source": "libraryStore.items"  // Gets items array from libraryStore
  }
}
```

The component receives this data as props automatically:
```typescript
function Library({ data }) {
  // data = libraryStore.items
  return <div>{data.map(item => ...)}</div>
}
```

---

### 🔄 **data-subscriptions**

Store properties to watch for changes. When these change, the component re-renders.

```json
{
  "canvas": {
    "data-component": "direct-renderer",
    "data-source": "oneStore.elements",
    "data-subscriptions": [
      "oneStore.selectedElementId",      // Re-render when selection changes
      "oneStore.selectedElementIds",     // Re-render when multi-selection changes
      "uiStore.gridVisible",            // Re-render when grid toggled
      "uiStore.snapEnabled"             // Re-render when snap toggled
    ]
  }
}
```

**How it works:**
- Component subscribes to these store values
- ANY change triggers a re-render
- Keeps UI perfectly in sync

---

### 🎬 **data-actions**

Maps UI events to store methods. Think "when user clicks, what happens?"

```json
{
  "canvas-controls": {
    "data-component": "canvas-controls",
    "data-actions": {
      "onGridToggle": "uiStore.toggleGrid",    // Button click → store method
      "onSnapToggle": "uiStore.toggleSnap"
    }
  }
}
```

The component receives these as callback props:
```typescript
function CanvasControls({ onGridToggle, onSnapToggle }) {
  return (
    <button onClick={onGridToggle}>Toggle Grid</button>
  );
}
```

---

### 🎨 **data-preset-targets**

Specifies which presets to apply and where. This is the styling magic!

```json
{
  "layertree": {
    "data-component": "layertree",
    "data-preset-targets": [
      ":",                              // Apply to wrapper (no suffix)
      "sidebar",                        // Also apply 'sidebar' preset
      "tree-item:custom-tree-item"      // Apply 'custom-tree-item' to internal '.tree-item' elements
    ]
  }
}
```

**Target Syntax:**
- `:` or `:wrapper` → Apply to the wrapper element
- `sidebar` → Apply preset class to wrapper
- `internal-class:preset-name` → Apply preset to internal elements

---

### 🔧 **props**

Static props passed to the component. These don't change based on store data.

```json
{
  "header": {
    "data-component": "header",
    "props": {
      "title": "Properties",
      "icon": "⚙️",
      "displayMode": "compact"
    }
  }
}
```

Component receives these directly:
```typescript
function Header({ title, icon, displayMode }) {
  return <h2>{icon} {title}</h2>
}
```

---

### 👶 **children**

Defines child components to render inside this component.

```json
{
  "editors": {
    "data-component": "editors-wrapper",
    "children": ["header", "accordion"]  // Renders these components inside
  }
}
```

---

## The Generic Wrapper Magic ✨

This is ONE-CONNECT's killer feature! You can create styled containers without writing wrapper components.

### Example: Editors Section

**Traditional Approach (❌ Extra Component):**
```typescript
// EditorsWrapper.tsx - A whole file just for a wrapper!
function EditorsWrapper({ children }) {
  return <div className="editors-wrapper sidebar">{children}</div>
}
```

**ONE-CONNECT Approach (✅ No Component):**
```json
{
  "editors": {
    "data-component": "editors-wrapper",  // Doesn't exist as a component!
    "children": ["header", "accordion"],
    "data-preset-targets": [":sidebar"]   // Styled via preset
  }
}
```

ONE-CONNECT creates a generic `<div>` with:
- Class: `ui editors-wrapper sidebar`
- Children: Renders header and accordion inside
- Grid area: Automatically assigned

### Benefits:
1. **Less Code** - No wrapper components to maintain
2. **Flexible** - Change structure in theme, not code
3. **Clean** - Components focus on their actual purpose
4. **Reusable** - Same component, different wrappers

---

## Real Example: Editors Structure

Let's break down the editors configuration:

```json
{
  "editors": {
    "type": "ui",
    "data-component": "editors-wrapper",      // Generic wrapper (doesn't exist)
    "data-source": "uiStore.themeVariables",  // Provides theme variables
    "data-subscriptions": [
      "oneStore.selectedElementId",           // Re-render on selection change
      "oneStore.elements",                    // Re-render on element changes
      "uiStore.expandedSections"             // Re-render on accordion toggle
    ],
    "data-actions": {
      "onToggleSection": "uiStore.toggleSection",
      "onUpdateElement": "oneStore.updateElement",
      "onGetCurrentValue": "oneStore.getElementStyle",
      "onHandleChange": "oneStore.updateElementStyle"
    },
    "props": {},                              // No static props
    "children": ["header", "accordion"],      // Render these inside
    "data-preset-targets": [
      ":sidebar"                              // Apply sidebar preset to wrapper
    ]
  }
}
```

**What happens:**
1. ONE-CONNECT creates a generic div
2. Applies classes: `ui editors-wrapper sidebar`
3. Connects to stores for data and subscriptions
4. Passes actions as callbacks
5. Renders header and accordion as children
6. Re-renders when any subscription changes

---

## Component vs Generic Wrapper

### When to Use a Real Component:

```json
{
  "layertree": {
    "data-component": "layertree"  // Complex logic needs real component
  }
}
```

Use when:
- Complex internal logic
- Custom hooks needed
- Heavy data processing
- Special event handling

### When to Use Generic Wrapper:

```json
{
  "content-area": {
    "data-component": "content-wrapper",  // Just a container
    "data-preset-targets": [":content-area"]
  }
}
```

Use when:
- Just grouping components
- Only need styling
- Simple container logic
- Reducing component count

---

## Data Flow Example

Here's how data flows through ONE-CONNECT:

```
1. Theme Definition
   ↓
{
  "color-editor": {
    "data-component": "input-bar",
    "data-source": "oneStore.selectedElement.style.color",
    "data-actions": {
      "onChange": "oneStore.updateElementStyle"
    }
  }
}
   ↓
2. ONE-CONNECT Processing
   ↓
- Loads InputBar component
- Gets current color from store
- Creates onChange handler
   ↓
3. Rendered Component
   ↓
<InputBar 
  value={selectedElement.style.color}
  onChange={(value) => updateElementStyle(id, 'color', value)}
/>
   ↓
4. User Interaction
   ↓
- User types new color
- onChange fires
- Store updates
- Component re-renders with new value
```

---

## Best Practices

### 1. **Minimize Wrappers**
```json
// ✅ Good: Generic wrapper
{
  "panel": {
    "data-component": "panel-wrapper",
    "data-preset-targets": [":panel-styles"]
  }
}

// ❌ Avoid: Creating PanelWrapper.tsx just for styling
```

### 2. **Clear Naming**
```json
// ✅ Good: Descriptive names
"data-component": "editors-wrapper"
"data-component": "content-container"

// ❌ Bad: Unclear names
"data-component": "wrapper"
"data-component": "div1"
```

### 3. **Logical Grouping**
```json
{
  "tool-panel": {
    "data-component": "tool-panel-wrapper",
    "children": [
      "tool-header",      // Related components
      "tool-options",     // grouped together
      "tool-actions"
    ]
  }
}
```

### 4. **Smart Subscriptions**
```json
// ✅ Good: Only subscribe to what you need
"data-subscriptions": ["oneStore.selectedElementId"]

// ❌ Bad: Over-subscribing
"data-subscriptions": ["oneStore"]  // Re-renders on ANY change!
```

---

## Advanced Patterns

### Conditional Rendering
```json
{
  "pro-features": {
    "data-component": "pro-wrapper",
    "data-auth": "required",          // Only renders if user authenticated
    "children": ["ai-tools", "export-options"]
  }
}
```

### Dynamic Components
```json
{
  "element-editor": {
    "data-component": "dynamic-editor",
    "data-source": "oneStore.selectedElement.type",  // Component changes based on type
    "data-map": {
      "text": "text-editor",
      "image": "image-editor",
      "video": "video-editor"
    }
  }
}
```

### Nested Data Sources
```json
{
  "style-editor": {
    "data-component": "style-panel",
    "data-source": "oneStore.selectedElement",
    "children": [
      {
        "color-input": {
          "data-component": "input-bar",
          "data-source": "parent.style.color"  // References parent's data
        }
      }
    ]
  }
}
```

---

## Summary

ONE-CONNECT transforms static theme definitions into living, reactive components:

- **data-component** → What to render (or generic wrapper)
- **data-source** → Primary data to display
- **data-subscriptions** → What to watch for updates
- **data-actions** → User interactions to store methods
- **data-preset-targets** → Styling without CSS files
- **props** → Static configuration
- **children** → Nested components

The generic wrapper feature means you can create complex layouts without writing wrapper components - just define structure in your theme and style with presets!