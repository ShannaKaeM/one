# 01 - Self-Applying Variable (CRITICAL)

**Status**: 🚨 CRITICAL - Agents consistently break this concept  
**Domain**: Level 1 - Theme Variable (Atomic)  
**References**: Theme Processor lines 38-106, ui-theme.json, one-theme.json

## Definition

A **self-applying variable** is a CSS custom property that BOTH defines AND applies its value directly using HSL color values, not CSS variable references.

## The Rule

### ✅ CORRECT - Self-Applying
```css
.ui {
  --background-color: hsl(0, 0%, 10%);
  background-color: var(--background-color);
}
```

### ❌ WRONG - Variable Reference
```css
.ui {
  --primary-color: #2196F3;
  --background-color: var(--primary-color); /* NEVER DO THIS */
}
```

## Why This Matters

1. **Direct Values Only**: Each variable must contain the actual HSL value
2. **No Cascading Variables**: Never reference other CSS custom properties
3. **Self-Contained**: Each variable is complete and independent
4. **Theme Isolation**: Prevents cross-theme contamination

## JSON Structure

```json
"variables": {
  "backgroundColor": {
    "defaultValue": "hsl(0, 0%, 10%)",  // Direct HSL value
    "type": "color",
    "category": "colors",
    "cssProperty": "--background-color"
  }
}
```

## Generated CSS Pattern

The Theme Processor generates:

```css
/* Root theme class with ALL variables */
.ui {
  /* Define the variable with direct value */
  --background-color: hsl(0, 0%, 10%);
  
  /* Apply the variable to the property */
  background-color: var(--background-color);
}
```

## Common Agent Mistakes

### Mistake 1: Using CSS Variable References
```css
/* ❌ WRONG */
--button-bg: var(--primary-color);
```

### Mistake 2: Using Hex Colors
```css
/* ❌ WRONG */
--background-color: #1a1a1a;
```

### Mistake 3: Creating Dependency Chains
```css
/* ❌ WRONG */
--base-color: hsl(200, 50%, 50%);
--primary: var(--base-color);
--button: var(--primary);
```

## The ONE Rule

**Every variable must be self-applying with a direct HSL value.**

No exceptions. No references. No cascading.

## Implementation Example

### Theme JSON
```json
{
  "variables": {
    "primaryButtonBg": {
      "defaultValue": "hsl(207, 90%, 54%)",
      "cssProperty": "--primary-button-bg"
    },
    "primaryButtonColor": {
      "defaultValue": "hsl(0, 0%, 100%)",
      "cssProperty": "--primary-button-color"
    }
  }
}
```

### Generated CSS
```css
.ui {
  --primary-button-bg: hsl(207, 90%, 54%);
  --primary-button-color: hsl(0, 0%, 100%);
  background-color: var(--primary-button-bg);
  color: var(--primary-button-color);
}
```

## Critical Reminders

- **ALWAYS** use HSL format: `hsl(hue, saturation%, lightness%)`
- **NEVER** reference another CSS variable in the value
- **EACH** variable stands alone - no dependencies
- **BOTH** themes (UI and ONE) follow this rule

## Why HSL?

1. **Human readable**: Easy to understand and modify
2. **Predictable**: Mathematical color relationships
3. **Themeable**: Simple to create variations
4. **Consistent**: Same format everywhere

## Guardian Protection

This is a foundational atomic concept. Any change to this pattern breaks the entire theme system. Agents must understand: **direct HSL values only, no variable references**.

---

**Note**: This is the most violated rule in the system. When reviewing agent code, check this first.