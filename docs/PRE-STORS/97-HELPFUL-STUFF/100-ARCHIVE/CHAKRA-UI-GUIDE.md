# Chakra UI Integration Guide

## Overview
Studio One uses Chakra UI v2 for its component library while maintaining the JSON-driven theme architecture. This integration enables modern UI components that respect the existing theme system.

## Architecture

### Core Systems
1. **UI Theme (`ui-theme.json`)** - Controls layout structure and component placement via grid areas
2. **CSS Variables** - Define colors, spacing, and sizes used by both systems
3. **Chakra Theme (`chakra-mi-theme.ts`)** - Extends Chakra's default theme with CSS variables
4. **UIGenerator** - Reads theme JSON and renders components in specified grid areas

### File Structure
```
src/
├── theme/
│   └── chakra-mi-theme.ts       # CSS variable to Chakra theme bridge
├── components/
│   ├── GeneralControls.tsx      # Control buttons and layout switcher
│   ├── LayerTree.tsx           # Hierarchical element display
│   ├── Library.tsx             # Asset management and library
│   ├── GridOverlay.tsx         # Canvas grid visualization
│   ├── SelectionHandles.tsx    # Element manipulation handles
│   ├── SelectionActionButton.tsx # Context menu trigger
│   ├── ElementPopup.tsx        # Context menu for elements
│   ├── DirectRenderer.tsx      # Canvas renderer with modal
│   ├── EditorControls.tsx      # Property editor (pending)
│   └── ColorPopup.tsx          # Color picker (pending)
└── TestChakra.tsx              # Component showcase (?chakra)
```

## CSS Variables
The application defines core CSS variables that both the original theme system and Chakra components utilize:

```css
:root {
  /* Colors */
  --mi-primary: hsl(342, 36%, 53%);      /* Desaturated pink */
  --mi-secondary: hsl(32, 45%, 52%);     /* Desaturated orange */
  --mi-neutral: hsl(0, 0%, 50%);         /* Base neutral */
  
  /* Spacing */
  --mi-spacing-xs: 0.25rem;
  --mi-spacing-sm: 0.5rem;
  --mi-spacing-md: 1rem;
  --mi-spacing-lg: 1.5rem;
  
  /* Sizes */
  --mi-button-size: 32px;
  --mi-radius: 6px;
}
```

## Chakra Theme Configuration
The `chakra-mi-theme.ts` file maps CSS variables to Chakra's theme system:

```typescript
export const miTheme = extendTheme({
  colors: {
    primary: {
      50: 'hsl(342, 36%, 95%)',
      100: 'hsl(342, 36%, 90%)',
      500: 'var(--mi-primary)',
      900: 'hsl(342, 36%, 20%)'
    },
    secondary: {
      50: 'hsl(32, 45%, 95%)',
      100: 'hsl(32, 45%, 90%)',
      500: 'var(--mi-secondary)',
      900: 'hsl(32, 45%, 20%)'
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.100'
      }
    }
  }
});
```

## Component Patterns

### Dark Theme Colors
All UI components use a consistent dark theme palette:

```typescript
const bgColor = 'hsl(0, 0%, 15%)';      // Component background
const headerBg = 'hsl(0, 0%, 10%)';     // Header sections
const borderColor = 'hsl(0, 0%, 20%)';  // Borders and dividers
const textColor = 'hsl(0, 0%, 90%)';    // Primary text
const mutedTextColor = 'hsl(0, 0%, 70%)'; // Secondary text
const primaryColor = 'hsl(342, 36%, 53%)'; // Active states
const secondaryColor = 'hsl(32, 45%, 52%)'; // Hover states
```

### Component Structure
Components follow a consistent pattern for Chakra implementation:

```typescript
import { Box, VStack, HStack, Text, IconButton } from '@chakra-ui/react';

export function ComponentName({ props }: ComponentProps) {
  return (
    <Box
      bg={bgColor}
      borderColor={borderColor}
      color={textColor}
      // ... other styling
    >
      {/* Component content */}
    </Box>
  );
}
```

### Hover States
All interactive elements use the secondary color for hover feedback:

```typescript
<Box
  cursor="pointer"
  transition="all 0.2s ease"
  _hover={{
    backgroundColor: secondaryColor,
    color: 'white'
  }}
>
```

## Component Integration

### UIGenerator Pattern
The UIGenerator wraps Chakra components with ChakraProvider:

```typescript
import { ChakraProvider } from '@chakra-ui/react';
import { miTheme } from '../theme/chakra-mi-theme';

// In UIGenerator.tsx
if (element['data-component'] === 'ComponentName') {
  return createElement('div', {
    key,
    className: classes.join(' ')
  }, createElement(ChakraProvider, { theme: miTheme },
    createElement(ComponentName, props)
  ));
}
```

### DirectRenderer Integration
Components used within DirectRenderer are wrapped at the parent level:

```typescript
<ChakraProvider theme={miTheme}>
  <GridOverlay isVisible={gridVisible} />
  <SelectionHandles selectedElement={selectedElement} />
  <SelectionActionButton selectedIds={selectedIds} />
</ChakraProvider>
```

## Converted Components

### GeneralControls
- **Purpose**: Layout switching, element creation, grid/snap toggles
- **Location**: Header area (grid-area from ui-theme.json)
- **Components**: Grid, GridItem, IconButton, Tooltip
- **Features**: 
  - Layout preset buttons
  - Add element actions
  - Grid visibility toggle
  - Snap to grid toggle

### LayerTree
- **Purpose**: Display and manage element hierarchy
- **Location**: Left sidebar
- **Components**: Box, VStack, HStack, Text, IconButton, Input
- **Features**:
  - Drag-and-drop reordering
  - Expand/collapse groups
  - Visibility toggles
  - Lock/unlock elements
  - Inline name editing

### Library
- **Purpose**: Asset management and library interface
- **Location**: Left sidebar (below LayerTree)
- **Components**: Box, VStack, Grid, Modal, Image, Tag, useToast
- **Features**:
  - Library and collection filtering
  - Image upload with R2 storage
  - Drag items to canvas
  - Bulk selection and editing
  - Multiple modal interfaces

### GridOverlay
- **Purpose**: Visual grid for alignment assistance
- **Location**: Canvas overlay
- **Components**: Box with inline SVG
- **Features**:
  - 20px grid lines
  - Major lines every 100px
  - Snap-to-grid helper function

### SelectionHandles
- **Purpose**: Visual manipulation handles for selected elements
- **Location**: Canvas overlay
- **Components**: Box components for handles
- **Features**:
  - 8-directional resize handles
  - Drag overlay for movement
  - Snap-to-grid support
  - Real-time position updates

### SelectionActionButton
- **Purpose**: Context menu trigger for selected elements
- **Location**: Positioned relative to selection
- **Components**: Box, Badge
- **Features**:
  - Multi-selection badge
  - Hover effects
  - Dynamic positioning

### ElementPopup
- **Purpose**: Context menu for element actions
- **Location**: Fixed position near trigger
- **Components**: Box, VStack, HStack, Text, Divider
- **Features**:
  - Group/ungroup actions
  - Element presets (wrapper, text, media)
  - Duplicate and delete
  - Save to library
  - Upload triggers

### DirectRenderer Modal
- **Purpose**: Library image selection for elements
- **Location**: Modal overlay
- **Components**: Modal, ModalOverlay, ModalContent, Grid, Image
- **Features**:
  - Grid layout for images
  - Image fallback handling
  - Hover effects on selection

### Editors (NEW - Atomic Editor System)
- **Purpose**: Dynamic property editor system replacing EditorControls
- **Location**: Right sidebar (grid area from ui-theme.json)
- **Components**: Box, VStack, Accordion, Input, Slider, Select, useToast
- **Architecture**: Atomic editor components composed into categories
- **Features**:
  - Dynamically generated from theme categories
  - 114 properties across 12 categories
  - Real-time property sync with canvas
  - Refresh button for theme reloading

## Atomic Editor Components

### ColorEditor
```typescript
const ColorEditor = ({ property, value, onChange, label }: any) => {
  // Color picker input with text field
  // Returns HSL or hex color values
}
```

### NumberEditor
```typescript
const NumberEditor = ({ property, value, onChange, label, min = 0, max = 100, unit = 'px' }: any) => {
  // Slider with numeric input
  // Supports units: px, %, em, rem, vw, vh
}
```

### SelectEditor
```typescript
const SelectEditor = ({ property, value, onChange, label, options }: any) => {
  // Dropdown for predefined options
  // Used for display, position, overflow, etc.
}
```

### TextEditor
```typescript
const TextEditor = ({ property, value, onChange, label }: any) => {
  // Basic text input
  // Used for font-family, custom values
}
```

## Theme Integration

### Dynamic Category Loading
The Editors component reads the ONE theme and automatically organizes properties:

```typescript
useEffect(() => {
  const loadTheme = async () => {
    await runtimeThemeProcessor.applyTheme('one');
    const theme = runtimeThemeProcessor.getTheme('one');
    
    // Group variables by category
    Object.entries(theme.variables).forEach(([key, variable]) => {
      const category = variable.category || 'other';
      // Organize into accordions
    });
  };
}, []);
```

### Property Change Flow
1. User edits property in atomic editor
2. Editor calls `handlePropertyChange(property, value)`
3. App.tsx dispatches `element-property-changed` event
4. DirectRenderer updates element style in real-time

```typescript
// In Editors.tsx
onPropertyChange(property, value); // e.g., "backgroundColor", "#ff0000"

// In App.tsx
window.dispatchEvent(new CustomEvent('element-property-changed', {
  detail: { id: selectedElement, property, value }
}));

// In DirectRenderer.tsx
if (property === 'backgroundColor' || property === 'color') {
  updatedElement.style = {
    ...updatedElement.style,
    [property]: value
  };
}
```

## Pending Components

### EditorControls (DEPRECATED)
- **Status**: Replaced by Editors component
- **Note**: Old component kept for reference during transition

### ColorPopup
- **Status**: To be integrated into ColorEditor
- **Dependencies**: Advanced color picker features

## Technical Specifications

### Performance Optimizations
1. **Theme Loading**: Cached in DirectRenderer to prevent re-renders
2. **Selection Updates**: Optimized to avoid flickering during drag operations
3. **Event Handling**: Proper cleanup in useEffect hooks

### Accessibility Features
- All buttons include proper ARIA labels
- Keyboard navigation support in all components
- Focus indicators on interactive elements
- Screen reader compatible markup

### Browser Compatibility
- Chakra UI handles cross-browser styling
- CSS variables supported in all modern browsers
- Fallback values provided where needed

## Testing Endpoints
- **Main Application**: `http://localhost:5173/`
- **Chakra Component Test**: `http://localhost:5173/?chakra`

## Implementation Guidelines

### CSS Variable Usage
Always reference CSS variables for theme-dependent values:
```typescript
backgroundColor: 'var(--mi-primary)'
height: 'var(--mi-button-size)'
borderRadius: 'var(--mi-radius)'
```

### ChakraProvider Requirements
Components must be wrapped with ChakraProvider either:
1. In UIGenerator for injected components
2. At parent level for nested components
3. In DirectRenderer for overlay components

### State Management
Components maintain their own state while responding to global events:
- Custom events for cross-component communication
- Window event listeners for canvas updates
- Proper cleanup in component unmount

### Dark Theme Consistency
All components follow the established dark theme palette:
- Backgrounds: 10-15% lightness
- Borders: 20% lightness
- Text: 70-90% lightness
- Hover states: Secondary color

## ONE Element Philosophy

### Core Concept
- Single element type with infinite variations
- All 100+ CSS variables pre-applied to each element
- Properties modify the single element's appearance
- No need for multiple element types

### Property Categories
Automatically organized from `one-theme.json`:
1. **animation** - Transitions, durations, timing functions
2. **behavior** - Display, position, overflow, visibility
3. **borders** - Width, style, color, radius
4. **colors** - Background, text, border, accent colors
5. **flex** - Flex properties for flexible layouts
6. **grid** - CSS Grid properties
7. **layout** - Float, clear, box-sizing
8. **positioning** - Top, right, bottom, left, z-index
9. **sizing** - Width, height, min/max dimensions
10. **spacing** - Padding, margin, gap
11. **typography** - Font properties, text styling
12. **visual** - Filters, transforms, shadows, opacity

### Event System
The application uses custom events for cross-component communication:
- `element-property-changed` - Property updates
- `element-moved` - Position changes
- `element-resized` - Size changes
- `canvas-elements-updated` - Element list changes