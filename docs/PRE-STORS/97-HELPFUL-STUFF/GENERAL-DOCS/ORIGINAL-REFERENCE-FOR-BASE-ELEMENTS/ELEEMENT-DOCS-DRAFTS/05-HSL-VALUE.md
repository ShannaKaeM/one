# 05 - HSL Value

**Status**: Foundational  
**Domain**: Level 1 - Theme Variable (Atomic)  
**References**: All theme colors, Session 008 handoff

## Definition

**HSL** (Hue, Saturation, Lightness) is the ONLY color format used in the Studio1 system. Every color must be defined as an HSL value.

## The Format

```css
hsl(hue, saturation%, lightness%)
```

- **Hue**: 0-360 degrees on color wheel
- **Saturation**: 0-100% color intensity  
- **Lightness**: 0-100% brightness

## Why Only HSL?

### 1. Human Readable
```css
hsl(0, 0%, 10%)     /* Obviously dark gray */
hsl(0, 0%, 90%)     /* Obviously light gray */
hsl(200, 100%, 50%) /* Obviously bright blue */
```

### 2. Mathematical Relationships
```css
/* Easy to create variations */
--primary: hsl(200, 70%, 50%);
--primary-dark: hsl(200, 70%, 40%);   /* Darker: reduce lightness */
--primary-light: hsl(200, 70%, 60%);  /* Lighter: increase lightness */
--primary-muted: hsl(200, 40%, 50%);  /* Muted: reduce saturation */
```

### 3. Theme Variations
```css
/* Create entire color schemes mathematically */
--base-hue: 200;
--primary: hsl(var(--base-hue), 70%, 50%);
--secondary: hsl(calc(var(--base-hue) + 120), 70%, 50%);
--tertiary: hsl(calc(var(--base-hue) + 240), 70%, 50%);
```

### 4. Accessibility
```css
/* Easy contrast checking */
--background: hsl(0, 0%, 10%);  /* 10% lightness */
--text: hsl(0, 0%, 90%);        /* 90% lightness */
/* 80% difference = high contrast */
```

## Common Color Patterns

### Grayscale
```css
--black: hsl(0, 0%, 0%);
--dark-gray: hsl(0, 0%, 20%);
--gray: hsl(0, 0%, 50%);
--light-gray: hsl(0, 0%, 80%);
--white: hsl(0, 0%, 100%);
```

### Primary Colors
```css
--red: hsl(0, 70%, 50%);
--blue: hsl(200, 70%, 50%);
--green: hsl(120, 70%, 50%);
--yellow: hsl(60, 70%, 50%);
```

### UI Colors
```css
--success: hsl(120, 60%, 40%);
--warning: hsl(45, 100%, 50%);
--error: hsl(0, 70%, 50%);
--info: hsl(200, 70%, 50%);
```

## The Rules

### ✅ ALWAYS Use HSL
```json
{
  "defaultValue": "hsl(207, 90%, 54%)"
}
```

### ❌ NEVER Use Other Formats
```json
{
  "defaultValue": "#2196F3"    // ❌ NO hex
  "defaultValue": "rgb(33, 150, 243)" // ❌ NO rgb
  "defaultValue": "blue"       // ❌ NO named colors
}
```

## Conversion Guide

If you have colors in other formats:

| Format | Example | HSL Equivalent |
|--------|---------|----------------|
| Hex | #2196F3 | hsl(207, 90%, 54%) |
| RGB | rgb(33, 150, 243) | hsl(207, 90%, 54%) |
| Named | blue | hsl(240, 100%, 50%) |

## HSL Tips

### Creating Color Schemes

1. **Monochromatic**: Same hue, vary saturation/lightness
```css
--primary-dark: hsl(200, 70%, 30%);
--primary: hsl(200, 70%, 50%);
--primary-light: hsl(200, 70%, 70%);
```

2. **Complementary**: Opposite hues (±180°)
```css
--primary: hsl(200, 70%, 50%);
--complement: hsl(20, 70%, 50%);
```

3. **Triadic**: Three evenly spaced (±120°)
```css
--primary: hsl(200, 70%, 50%);
--secondary: hsl(320, 70%, 50%);
--tertiary: hsl(80, 70%, 50%);
```

### Ensuring Contrast

For text on backgrounds:
- **Light text**: 80%+ lightness
- **Dark text**: 20%- lightness
- **Difference**: 60%+ for good contrast

## Common Mistakes

### Mistake 1: Using Hex Colors
```css
/* ❌ WRONG */
--primary: #2196F3;

/* ✅ CORRECT */
--primary: hsl(207, 90%, 54%);
```

### Mistake 2: Alpha Channel
```css
/* ❌ WRONG */
--overlay: hsla(0, 0%, 0%, 0.5);

/* ✅ CORRECT - Use opacity separately */
--overlay-color: hsl(0, 0%, 0%);
--overlay-opacity: 0.5;
```

### Mistake 3: CSS Variables for HSL Parts
```css
/* ❌ WRONG */
--hue: 200;
--color: hsl(var(--hue), 70%, 50%);

/* ✅ CORRECT - Direct values */
--color: hsl(200, 70%, 50%);
```

## Guardian Protection

HSL is the only accepted color format. This is non-negotiable. Any other format breaks the mathematical relationships and themability of the system.

---

**Note**: When reviewing code, immediately flag any non-HSL color values. They must be converted.