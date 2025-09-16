# Chakra UI Integration with UI Theme System

## Overview
This document explains how Chakra UI has been integrated with your existing UI theme system while maintaining the JSON-driven architecture.

## Architecture

### 1. Hybrid Approach
- **UI Theme (ui-theme.json)** - Still controls layout, structure, and component placement
- **Chakra UI** - Provides pre-built React components with accessibility
- **CSS Variables** - Bridge between your theme system and Chakra

### 2. File Structure
```
src/
├── components/
│   ├── GeneralControls.tsx          # Original inline styles
│   ├── GeneralControls.chakra.tsx   # Chakra version
│   ├── LayerTree.tsx               # Original inline styles
│   └── LayerTree.chakra.tsx        # Chakra version
├── theme/
│   └── chakra-theme.ts             # Chakra theme using CSS variables
└── config/
    └── ui-config.ts                # Toggle between versions
```

### 3. CSS Variables Integration
Your CSS variables are defined in the Chakra theme and can be used everywhere:

```typescript
// In chakra-theme.ts
':root': {
  '--mi-color-primary': 'hsl(342, 36%, 53%)',
  '--mi-spacing-md': '1rem',
  '--mi-size-button': '32px',
  // ... more variables
}

// Used in Chakra components
<Box bg="var(--mi-color-surface)" p="var(--mi-spacing-md)">
```

### 4. Component Switching
Toggle between regular and Chakra components in `ui-config.ts`:

```typescript
export const uiConfig = {
  useChakra: true,  // Set to false to use original components
}
```

## Benefits

### 1. Keep Your Architecture
- UI theme JSON structure unchanged
- UIGenerator still controls layout
- DirectRenderer works the same way

### 2. Better Components
- Pre-built accessible components
- Consistent styling system
- Built-in animations and transitions
- Tooltip support
- Better keyboard navigation

### 3. Theme Flexibility
- CSS variables work in both systems
- Can mix Chakra and non-Chakra components
- Easy to switch back if needed

## How It Works

### 1. GeneralControls Example
```tsx
// Original (inline styles)
<div className="component-container">
  <div className="button-group button-group-left">
    <button className="button active">...</button>
  </div>
</div>

// Chakra version
<Grid templateAreas='"a b c"'>
  <GridItem area="a">
    <ButtonGroup>
      <IconButton isActive={true} />
    </ButtonGroup>
  </GridItem>
</Grid>
```

### 2. LayerTree Example
```tsx
// Original (inline styles)
<div className="component-container">
  <div className="header">Layers</div>
  <div className="main">...</div>
</div>

// Chakra version
<Box display="grid" gridTemplateAreas='"a" "b"'>
  <HStack gridArea="a">
    <Heading size="xs">Layers</Heading>
  </HStack>
  <Box gridArea="b">...</Box>
</Box>
```

### 3. UIGenerator Integration
The UIGenerator automatically uses the correct version:

```tsx
const ControlsComponent = uiConfig.useChakra 
  ? GeneralControlsChakra 
  : GeneralControls;
```

## Usage

### 1. Enable Chakra
In `src/config/ui-config.ts`:
```typescript
export const uiConfig = {
  useChakra: true
}
```

### 2. Disable Chakra
```typescript
export const uiConfig = {
  useChakra: false
}
```

### 3. Mix and Match
You can use Chakra for some components and original for others by modifying the component-specific logic in UIGenerator or App.tsx.

## Next Steps

### 1. Convert More Components
- EditorControls could benefit from Chakra's form controls
- Library could use Chakra's grid and card components
- DirectRenderer stays as-is (canvas-based)

### 2. Enhanced Features
- Add dark mode support with Chakra's color mode
- Use Chakra's animation utilities
- Implement responsive breakpoints

### 3. Custom Components
Create custom Chakra components that match your design system:
```tsx
const MiButton = chakra('button', {
  baseStyle: {
    bg: 'var(--mi-color-surface)',
    color: 'var(--mi-color-text)',
    // ... your styles
  }
})
```

## Important Notes

1. **No Build Dependency**: When published, your app includes Chakra as a runtime dependency but doesn't require any build tools
2. **CSS Variables**: All theming goes through CSS variables, making it easy to update styles dynamically
3. **Backward Compatible**: Can switch back to original components at any time
4. **Performance**: Chakra uses emotion for CSS-in-JS which is optimized for runtime performance