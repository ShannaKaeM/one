# Dashboard Rules
## Studio One Framework - Simple Rules

---

## 🚨 NEVER DO

- **Never use `display: flex`** - Always use `display: grid`
- **Never use semantic grid areas** - Always use `a`, `b`, `c`, `d`
- **Never create semantic classes** - No `.button-primary`, `.text-lg`, `.theme-dark`
- **Never use size variants** - No `sm`, `md`, `lg`, `xl`
- **Never edit base CSS variables** - Without full approval

---

## ✅ ALWAYS DO
sizing
- **Always use CSS variables** - `--property-name` format
- **Always use HSL colors** - `hsl(360, 100%, 50%)` format

---

## 🎯 WHAT IS WHAT

### **Three Base Elements**
- **`wrapper`** = Container
- **`text`** = Text content 
- **`image`** = Media content



### **Data Attributes**
- **`data-label`** = Human description (for developers)
- **`data-component`** = React component to insert
- **`data-preset-targets`** = Where to apply presets on component
- **`data-props`** = Props for React component ie, using the one theme for content. 

### **Grid System**
- **Universal Areas** = `a`, `b`, `c`, `d` (never semantic names)

---

## 🔧 HOW TO EDIT

### **Add New Presets**
```json
"new-preset": {
  "--property": "value"
}
```

### **Combine Presets**
```json
"preset": "layout style grid-area"
```

### **Add Components**
```json
{
  "data-component": "ComponentName",
  "data-preset-targets": [":react-wrapper"]
}
```

### **Change Layout**
?

---

## 🎨 STYLING RULES

- **CSS Variables Only** - `--color`, `--width`, `--margin`
- **HSL Colors Only** - `hsl(0, 0%, 100%)`
- **No Direct CSS** - Everything through presets
- **No INLINE STYLES EVER** - Use presets 
- **Scope to Elements** - Variables applied to wrapper/text/image

---

## 📱 LAYOUT PRINCIPLES

- ?

---

That's it. These are the core rules. Follow these and you'll stay within the framework.