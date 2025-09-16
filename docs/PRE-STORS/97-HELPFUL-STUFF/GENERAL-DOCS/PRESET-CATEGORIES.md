# Studio ONE - Preset Categories (FINAL)

**Goal:** Universal, reusable presets covering all 100+ CSS variables. Each preset is a complete style group with all relevant properties.

---

## 📋 **FINAL PRESET CATEGORIES**

### **1. LAYOUT** *(Grid Structure + Display + Behavior)*
**Variables:** 25 total
- **Grid:** `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-column`, `grid-row`, `grid-area`, `grid-auto-columns`, `grid-auto-rows`, `grid-auto-flow` (9)
- **Alignment:** `justify-content`, `align-items`, `align-content`, `justify-items`, `place-items`, `align-self`, `justify-self`, `place-self` (8)
- **Behavior:** `display`, `position`, `overflow`, `overflow-x`, `overflow-y`, `visibility`, `pointer-events`, `z-index` (8)

**Purpose:** Complete layout structure without physical sizing

### **2. TYPOGRAPHY** *(Text Styling)*
**Variables:** 15 total
- **Font:** `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `letter-spacing` (6)
- **Text:** `text-align`, `text-decoration`, `text-transform`, `text-overflow` (4)
- **Flow:** `white-space`, `word-break`, `word-wrap`, `vertical-align` (4)
- **Shadows:** `text-shadow` (1)

**Purpose:** Complete text styling and formatting

**Note:** This seems complete for typography - font properties, text styling, and text flow control are all covered.

### **3. COLORS** *(Color Relationships)*
**Variables:** 8 total
- `color`, `background-color`, `border-color`, `fill`, `stroke`, `accent-color`, `outline-color`, `caret-color`

**Purpose:** Complete color theming for all visual elements

### **4. VISUAL** *(Effects + Borders + Images)*
**Variables:** 29 total
- **Backgrounds:** `background-image`, `background-size`, `background-position`, `background-repeat` (4)
- **Masks:** `mask-image`, `mask-mode`, `mask-repeat`, `mask-position`, `mask-size` (5)
- **Effects:** `backdrop-filter`, `filter`, `box-shadow`, `opacity`, `transform`, `transform-origin` (6)
- **Borders:** `border-radius`, `border-width`, `border-style`, `border-top-width`, `border-right-width`, `border-bottom-width`, `border-left-width`, `border-top-style`, `border-right-style`, `border-bottom-style`, `border-left-style`, `outline-width`, `outline-style`, `outline-offset`, `stroke-width` (14)

**Purpose:** Visual effects, shadows, filters, borders, and styling

### **5. SPACING** *(Physical Spacing)*
**Variables:** 3 total
- `padding`, `margin`, `gap`

**Purpose:** All physical spacing including internal, external, and grid gaps

**Note:** Gap moved here since it's physical sizing and often coordinated with padding.

### **6. POSITIONING** *(Offset Properties)*
**Variables:** 4 total
- `top`, `right`, `bottom`, `left`

**Purpose:** Absolute/relative positioning offsets

### **7. SIZING** *(Dimensions)*
**Variables:** 7 total
- `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`, `aspect-ratio`

**Purpose:** Element dimensions and constraints

### **8. INTERACTIONS** *(User Behavior)*
**Variables:** 3 total
- `cursor`, `user-select`

**Purpose:** User interaction behavior

**Note:** Removed pointer-events (moved to Layout/Behavior)

### **9. ANIMATIONS** *(Motion + Transitions)*
**Variables:** 2 total
- `animation`, `transition`

**Purpose:** Motion and animation effects

---

## **EXCLUDED VARIABLES**
**Flex Properties:** 6 variables not used in current system
- `flex-direction`, `flex-wrap`, `flex-basis`, `flex-grow`, `flex-shrink`, `order`

---

## **TOTAL COVERAGE**
**96 Variables Categorized** (100+ minus 6 flex properties)

**✅ COVERS ALL CURRENT NEEDS:** Yes, these 9 categories cover all variables in your current ui-theme.json system.

---

## 🎯 **NAMING CONVENTION**

**Universal, reusable names based on pattern, not usage:**
- Layout: `3-col`, `2-row`, `dashboard`, `auto-flow`
- Typography: `body`, `heading`, `small`, `caption`
- Colors: `neutral-light`, `neutral-dark`, `primary`, `secondary`
- Visual: `rounded`, `shadow-soft`, `elevated`
- Spacing: `spacing-tight`, `spacing-loose`, `no-spacing`
- Positioning: `centered`, `top-left`, `sticky-top`
- Sizing: `fill-container`, `constrained`, `square`
- Interactions: `clickable`, `selectable`, `static`
- Animations: `smooth`, `quick`, `fade-in`

---

## 💡 **USAGE EXAMPLES**

```json
"preset": "3-col spacing-tight neutral-dark rounded clickable"
```

**Each category contributes specific properties, combined for complete element styling.**