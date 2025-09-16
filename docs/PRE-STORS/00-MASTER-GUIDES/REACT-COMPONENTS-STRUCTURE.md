# React Components Structure Reference

This document lists the actual HTML elements and CSS classes used in each React component.

## LAYERTREE Components

### LayerTree.tsx
**HTML Elements:**
- `<div>` - Main container, content area, empty state
- `<button>` - Tree items, expand/collapse, visibility, lock controls
- `<input>` - Element name editing
- `<span>` - Icons and text labels
- `<style>` - Component styles injection

**CSS Classes:**
- `layertree` - Main container
- `layertree-header` - Header wrapper
- `layertree-title` - Title text
- `layertree-content` - Scrollable content
- `layertree-empty` - Empty state
- `layertree-button` - Item button
- `layertree-button-selected` - Selected state
- `layertree-button-locked` - Locked button
- `layertree-button-dragover` - Drag hover
- `layertree-item` - Item container
- `layertree-item-locked` - Locked opacity
- `layertree-item-hidden` - Hidden opacity
- `layertree-info` - Info grid
- `layertree-info-group` - Group info grid
- `layertree-expand` - Expand arrow
- `layertree-icon` - Icon wrapper
- `layertree-name` - Element name
- `layertree-input` - Edit input
- `layertree-controls` - Controls container
- `layertree-visibility` - Eye button
- `layertree-visibility-off` - Hidden state
- `layertree-lock` - Lock button
- `layertree-lock-on` - Locked state
- `layertree-children` - Children wrapper

**Child Components:**
- `<LayerTreeHeader />`
- `<LayerTreeItem />` (recursive)

### LayerTreeItem.tsx
**HTML Elements:**
- `<div>` - Item wrapper, info section, controls
- `<button>` - Expand, visibility, lock buttons
- `<span>` - Icon and name display
- `<input>` - Name editing

**CSS Classes:** (Same as LayerTree.tsx)

**Child Components:**
- Icon components (`ChevronRightIcon`, `ViewIcon`, etc.)
- Self (recursive for children)

### LayerTreeHeader.tsx
**HTML Elements:**
- `<div>` - Header container
- `<span>` - Title text

**CSS Classes:**
- `layertree-header`
- `layertree-title`

## EDITORS Components

### Accordion.tsx
**HTML Elements:**
- `<div>` - Container, header, content sections
- `<span>` - Icon, label, toggle indicator

**CSS Classes:**
- `ui accordion` - Root
- `ui accordion-header` - Clickable header
- `ui accordion-title` - Title container
- `ui accordion-icon` - Icon wrapper
- `ui accordion-label` - Label text
- `ui accordion-toggle` - Chevron toggle
- `ui accordion-content` - Collapsible content

**Child Components:**
- `{children}` - Any passed children
- `<InputBar />` when sectionData provided

### Header.tsx
**HTML Elements:**
- `<div>` - Container, actions wrapper
- `<h3>` - Title heading
- `<span>` - Icon containers
- `<button>` - Action buttons

**CSS Classes:**
- `ui header` - Root
- `ui header-title` - Title section
- `ui header-icon` - Icon wrapper
- `ui header-label` - Title text
- `ui header-actions` - Actions container
- `ui header-action` - Action button
- `ui action-icon` - Action icon

### InputBar.tsx
**HTML Elements:**
- `<div>` - Container
- `<label>` - Input label
- `<input>` - Text input

**CSS Classes:**
- `ui input-bar` - Root
- `ui input-bar-label` - Label
- `ui input-bar-input` - Input field

## DIRECT-RENDERER Components

### DirectRenderer.tsx
**HTML Elements:**
- `<div>` - Canvas container, element wrappers
- `<img>` - Image elements
- `<span>` - Text elements
- `<svg>` - Shape elements

**CSS Classes:**
- `direct-renderer` - Main canvas
- `element-wrapper` - Element container
- `element-selected` - Selected state
- `element-locked` - Locked state
- `element-hidden` - Hidden state
- Various dynamic classes from element data

**Child Components:**
- `<GridOverlay />`
- `<SelectionHandles />`
- `<ElementPopup />`
- `<LibraryModal />`
- `<SaveModal />`

### GridOverlay.tsx
**HTML Elements:**
- `<svg>` - Grid container
- `<pattern>` - Grid pattern
- `<line>` - Grid lines
- `<rect>` - Grid fill

**CSS Classes:**
- `grid-overlay`

### SelectionHandles.tsx
**HTML Elements:**
- `<div>` - Handle containers
- `<div>` - Individual resize handles

**CSS Classes:**
- `selection-handles` - Container
- `selection-handle` - Individual handle
- `handle-top`, `handle-right`, `handle-bottom`, `handle-left`
- `handle-top-left`, `handle-top-right`, `handle-bottom-left`, `handle-bottom-right`

### ElementPopup.tsx
**HTML Elements:**
- `<div>` - Popup container, menu items
- `<button>` - Action buttons
- `<span>` - Icons and labels

**CSS Classes:**
- `element-popup` - Container
- `popup-menu` - Menu list
- `popup-item` - Menu item
- `popup-icon` - Item icon
- `popup-label` - Item label

### LibraryModal.tsx
**HTML Elements:**
- `<div>` - Modal overlay, content
- `<h2>` - Modal title
- `<button>` - Close button, library items
- `<img>` - Library item previews

**CSS Classes:**
- `modal-overlay` - Background overlay
- `modal-content` - Modal container
- `modal-header` - Header section
- `modal-title` - Title text
- `modal-close` - Close button
- `library-grid` - Items grid
- `library-item` - Individual item

### SaveModal.tsx
**HTML Elements:**
- `<div>` - Modal structure
- `<input>` - Name input
- `<button>` - Save/Cancel buttons

**CSS Classes:**
- `modal-overlay`
- `modal-content`
- `save-input`
- `save-actions`
- `save-button`
- `cancel-button`

## LIBRARY Components

### Library.tsx
**HTML Elements:**
- `<div>` - Container, sections
- `<select>` - Library selector
- `<button>` - Action buttons

**CSS Classes:**
- `library` - Root
- `library-content` - Content area
- `library-selector` - Dropdown

**Child Components:**
- `<LibraryHeader />`
- `<LibraryGrid />`
- `<LibraryUpload />`
- `<LibraryManager />`

### LibraryGrid.tsx
**HTML Elements:**
- `<div>` - Grid container, items
- `<img>` - Item thumbnails
- `<span>` - Item names

**CSS Classes:**
- `library-grid` - Grid container
- `library-item` - Item card
- `library-thumbnail` - Image wrapper
- `library-name` - Item name

### LibraryHeader.tsx
**HTML Elements:**
- `<div>` - Header container
- `<h3>` - Title
- `<button>` - Action buttons

**CSS Classes:**
- `library-header` - Container
- `library-title` - Title
- `library-actions` - Actions wrapper

### LibraryUpload.tsx
**HTML Elements:**
- `<div>` - Upload zone
- `<input type="file">` - File input
- `<button>` - Upload button
- `<span>` - Instructions

**CSS Classes:**
- `library-upload` - Container
- `upload-zone` - Drop zone
- `upload-input` - File input
- `upload-button` - Button
- `upload-text` - Instructions

### LibraryManager.tsx
**HTML Elements:**
- `<div>` - Manager container
- `<ul>` - Library list
- `<li>` - Library items
- `<button>` - Add/Delete buttons

**CSS Classes:**
- `library-manager` - Container
- `library-list` - List
- `library-list-item` - Item
- `manager-actions` - Actions

### BulkEditModal.tsx
**HTML Elements:**
- `<div>` - Modal structure
- `<table>` - Items table
- `<input>` - Edit fields
- `<button>` - Save/Cancel

**CSS Classes:**
- `modal-overlay`
- `modal-content`
- `bulk-edit-table`
- `edit-row`
- `edit-input`

### ItemEditModal.tsx
**HTML Elements:**
- `<div>` - Modal structure
- `<form>` - Edit form
- `<input>` - Form fields
- `<textarea>` - Description field
- `<button>` - Save/Cancel

**CSS Classes:**
- `modal-overlay`
- `modal-content`
- `edit-form`
- `form-field`
- `field-label`
- `field-input`

## Control Components

### CanvasControls.tsx
**HTML Elements:**
- `<div>` - Control bar
- `<button>` - Control buttons
- `<span>` - Icons and labels

**CSS Classes:**
- `canvas-controls` - Container
- `control-button` - Button
- `control-active` - Active state
- `control-icon` - Icon
- `control-label` - Label

### LayoutSwitcher.tsx
**HTML Elements:**
- `<div>` - Switcher container
- `<button>` - Layout buttons
- `<span>` - Layout names/icons

**CSS Classes:**
- `layout-switcher` - Container
- `layout-button` - Button
- `layout-active` - Active layout
- `layout-icon` - Icon
- `layout-label` - Label

## ONE-CONNECT Components

### OneConnect.tsx
**HTML Elements:**
- `<div>` - Root container, wrappers

**CSS Classes:**
- `ui` - Base class
- `{theme.layout}` - Dynamic layout class (e.g., `dashboard`)
- Auto-generated wrapper classes

**Child Components:**
- All registered components via dynamic loading

### GenericWrapper.tsx
**HTML Elements:**
- `<div>` - Wrapper containers

**CSS Classes:**
- Inherits from parent configuration
- Dynamic preset classes

**Child Components:**
- Wrapped component(s)

## App Component

### App.tsx
**HTML Elements:**
- `<div>` - Loading state

**CSS Classes:**
- None directly (passes to OneConnect)

**Child Components:**
- `<OneConnect />`

## Common Patterns

1. **Naming Convention**: 
   - LayerTree: `layertree-*`
   - Editors: `ui *`
   - Library: `library-*`
   - Modals: `modal-*`
   - Canvas: `element-*`, `selection-*`

2. **State Classes**:
   - `-selected`, `-active`, `-hover`
   - `-locked`, `-hidden`, `-off`, `-on`
   - `-dragover`, `-focus`

3. **Structure Classes**:
   - Container: `-content`, `-wrapper`
   - Header: `-header`, `-title`
   - Controls: `-controls`, `-actions`
   - Items: `-item`, `-button`