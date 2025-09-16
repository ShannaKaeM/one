# 06 - Base Variable Constraint (CRITICAL)

**Status**: 🚨 CRITICAL - Agents treat this like traditional CSS  
**Domain**: Level 1 - Theme Variable (Atomic)  
**References**: Theme system, all theme JSON files

## Definition

The **Base Variable Constraint** means ONLY pre-defined base variables can exist in the theme system. You cannot add random CSS properties like traditional CSS. Every variable must be explicitly defined in the theme configuration.

## The Rule

### ✅ CORRECT - Only Defined Variables
```json
{
  "variables": {
    "backgroundColor": {
      "defaultValue": "hsl(0, 0%, 10%)",
      "cssProperty": "--background-color"
    },
    "padding": {
      "defaultValue": "20px",
      "cssProperty": "--padding"
    }
    // ONLY these defined variables can be used
  }
}
```

### ❌ WRONG - Random CSS Properties
```css
/* Agents keep doing this - DON'T! */
.one {
  --my-custom-shadow: 0 2px 4px;      /* NO! Not defined */
  --random-border: 1px solid;          /* NO! Not in base */
  --whatever-margin: 10px;             /* NO! Made up */
  box-shadow: 0 2px 4px;              /* NO! Direct CSS */
}
```

## Why This Matters

### 1. Foolproof System
- Can't break if you only use defined variables
- No cascade bugs from random properties
- Predictable, contained system

### 2. 1:1 Architecture
- Every element can have up to 1 of each base variable
- No duplicates, no conflicts
- Perfect mapping

### 3. Preset Hydration
- Presets know exactly what variables exist
- Clean application without surprises
- Guaranteed compatibility

## The Base Variable Set

Our system defines approximately 100+ base variables covering:

### Core Properties
```json
"backgroundColor", "color", "padding", "margin",
"borderRadius", "border", "display", "position",
"width", "height", "top", "left", "right", "bottom"
```

### Typography
```json
"fontSize", "fontWeight", "lineHeight", "fontFamily",
"textAlign", "textTransform", "letterSpacing"
```

### Grid/Layout
```json
"gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows",
"gridArea", "gap", "alignItems", "justifyContent"
```

### Visual Effects
```json
"opacity", "transform", "transition", "cursor",
"zIndex", "overflow", "boxSizing"
```

**THAT'S IT!** No other variables allowed.

## Common Agent Violations

### Violation 1: Adding Shadow Variables
```css
/* ❌ AGENT ATTEMPTS THIS */
.element {
  --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-shadow: var(--box-shadow);
}

/* ✅ USE EXISTING SYSTEM */
/* If shadow isn't in base variables, it's not supported yet */
/* Request addition to base set if needed */
```

### Violation 2: Creating Convenience Variables
```css
/* ❌ AGENT CREATES SHORTCUTS */
.element {
  --spacing-large: 32px;  /* NO! Use defined padding/margin */
  --color-primary: blue;  /* NO! Use HSL in defined variables */
}
```

### Violation 3: Traditional CSS Mixing
```css
/* ❌ AGENT MIXES SYSTEMS */
.element {
  padding: var(--padding);      /* OK - using system */
  box-shadow: 0 2px 4px black;  /* NO! Direct CSS */
  border-top: 1px solid;         /* NO! Not through variable */
}
```

## The Golden Rule

**If it's not in the base variable set, YOU CAN'T USE IT.**

No exceptions. No workarounds. No "just this once."

## How to Check

Before adding ANY style:

1. **Is this variable defined in the theme?**
   - YES → Use it
   - NO → Stop

2. **Am I trying to add a new CSS property?**
   - YES → Stop
   - NO → Continue

3. **Am I treating this like traditional CSS?**
   - YES → Stop and review this document
   - NO → Proceed with defined variables only

## Why Agents Break This

Agents are trained on millions of traditional CSS examples where you can add any property anytime. Our system is different:

### Traditional CSS Mindset
```css
/* Add whatever, whenever */
.element {
  padding: 10px;
  margin: 20px;
  box-shadow: 0 2px 4px;  /* Just add it! */
  transform: rotate(5deg); /* Why not? */
  filter: blur(2px);      /* Sure! */
}
```

### Our System Mindset
```css
/* ONLY defined variables */
.element {
  padding: var(--padding);    /* Defined ✓ */
  margin: var(--margin);      /* Defined ✓ */
  /* That's it. No shadow, transform, or filter */
  /* unless they're in the base variable set */
}
```

## Extension Process

If you genuinely need a new variable:

1. **Don't add it inline** - Never
2. **Check if existing variable works** - Often does
3. **Request addition to base set** - Proper process
4. **Wait for system update** - Variables are added thoughtfully

## Guardian Protection

This constraint is what makes the system foolproof. By limiting to defined variables only, we:
- Prevent cascade bugs
- Ensure preset compatibility
- Maintain predictable behavior
- Keep the 1:1 architecture intact

**Break this rule, break the entire system.**

---

**Note**: When reviewing agent code, immediately flag ANY CSS property or variable not in the defined base set. This is the most common way agents break the system by treating it like traditional CSS.