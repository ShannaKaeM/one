# TSConfig

## 🎯 Quick Summary
> **Purpose**: TypeScript compiler configuration and type checking rules  
> **Type**: TypeScript Configuration  
> **Location**: `/tsconfig.json`  
> **Related**: [CORE-CONFIG](../01.10-CORE-CONFIG.md), [VITE-CONFIG](./VITE-CONFIG.md)

---

## 🔄 Simple Explanation

tsconfig.json controls **TypeScript behavior**:
1. **Type checking** - Strict or loose rules
2. **Module system** - How imports work
3. **Target version** - Which JS features to use
4. **Path mapping** - Import shortcuts
5. **Include/exclude** - Which files to check

```
TypeScript → Reads tsconfig → Type checks → Compiles to JS
```

---

## 📋 Technical Specification

### Compiler Options

| Option | Purpose |
|--------|---------|
| **strict** | Enable all strict checks |
| **target** | Output JavaScript version |
| **module** | Module system (ESNext) |
| **jsx** | React JSX handling |
| **esModuleInterop** | Import compatibility |

### Path Configuration
- `baseUrl: "."`
- `paths: { "@/*": ["./src/*"] }`
- Enables clean imports

---

## 🔗 Integration

### Type Checking Flow
```
VS Code → tsconfig.json → Real-time errors → Better code
```

### Build Integration
```
Vite → Uses tsconfig → Compiles TypeScript → JavaScript
```

---

## 📊 Quick Reference

### Strict Mode Rules
- No implicit any
- Strict null checks
- No unused variables
- No implicit returns

### File Handling
- Include: `src/**/*`
- Exclude: `node_modules`
- Types: `.ts`, `.tsx`

### Development Benefits
- Catch errors early
- Better autocomplete
- Refactoring safety
- Type documentation