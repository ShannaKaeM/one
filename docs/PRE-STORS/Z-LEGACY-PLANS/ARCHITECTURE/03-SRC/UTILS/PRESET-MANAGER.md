# Preset Manager

## 🎯 Quick Summary
> **Purpose**: Manages dynamic CSS variable presets that can transform elements  
> **Type**: Event-driven Utility  
> **Location**: `/src/utils/presetManager.ts`  
> **Related**: [THEME-PROCESSOR](../../01-CORE/THEME-PROCESSOR.md), [JTR](../../01-CORE/JTR.md), [JSON-THEMES](../../02-PUBLIC/JSON-THEMES.md)

---

## 🔄 Simple Explanation

Preset Manager enables **dynamic element transformation**:

1. **Toggles CSS variables** - Apply/remove variable sets
2. **Transforms elements** - Wrapper → text, image, rich types
3. **Tracks applied presets** - Per-element preset management
4. **Event-driven updates** - Real-time preset changes
5. **Category-based organization** - Grouped preset types

```
Select preset → Apply to element → CSS variables toggle → Element transforms
```

---

## 📋 Technical Specification

### Core Functions

| Function | Purpose |
|----------|---------|
| **applyPreset()** | Adds preset variables to element |
| **removePreset()** | Removes preset from element |
| **togglePreset()** | Switches preset on/off |
| **getAppliedPresets()** | Lists active presets |
| **clearAllPresets()** | Removes all presets |

### Event System
- `preset-applied` - When preset added
- `preset-removed` - When preset removed
- `preset-toggled` - When preset switched
- Element updates automatically

---

## 🔗 Integration

### Theme Connection
```
JSON Theme → Contains presets → Preset Manager → Apply to elements
```

### Usage Flow
```
User selects preset → Manager applies variables → Element re-renders → Visual transformation
```

### Component Integration
- **Editors** - Preset selection UI
- **JTR** - Renders with presets
- **Direct Renderer** - Visual updates
- **Theme Processor** - Preset definitions

---

## 📊 Quick Reference

### Preset Structure
```typescript
{
  name: "card-style",
  category: "layout",
  variables: {
    "--padding": "20px",
    "--border": "1px solid",
    "--shadow": "0 2px 4px"
  }
}
```

### Key Features
- Multiple presets per element
- Real-time toggling
- No page refresh needed
- Category organization
- Event-driven updates

### Common Uses
- Style variations
- Layout modes
- Component states
- Theme switching
- Dynamic styling