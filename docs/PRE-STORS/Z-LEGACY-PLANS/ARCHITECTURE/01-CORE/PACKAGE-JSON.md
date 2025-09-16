# Package.json

## 🎯 Quick Summary
> **Purpose**: Defines project dependencies, scripts, and metadata  
> **Type**: NPM Configuration  
> **Location**: `/package.json`  
> **Related**: [CORE-CONFIG](../01.10-CORE-CONFIG.md), [VITE-CONFIG](./VITE-CONFIG.md)

---

## 🔄 Simple Explanation

**What it is**: Package.json is the main project file that NPM (Node Package Manager) reads to understand your project.

**What it does**: It lists all the code libraries your app needs to run and defines command shortcuts like 'npm run dev' to start your app.

**What it connects to**: Works with NPM to install dependencies into node_modules/, and provides scripts that Vite and other tools use.

Think of it as your project's **shopping list and instruction manual**:
1. **What libraries to install** - Dependencies list
2. **How to run the project** - Script commands
3. **Project information** - Name, version, author
4. **Development tools** - DevDependencies
5. **Node version** - Engine requirements

```
npm install → Reads package.json → Installs all dependencies
```

---

## 📋 Technical Specification

### Key Sections

| Section | Purpose |
|---------|---------|
| **dependencies** | Production libraries (React, etc.) |
| **devDependencies** | Development tools (Vite, TypeScript) |
| **scripts** | Command shortcuts (dev, build, lint) |
| **type** | Module system (ESM) |
| **engines** | Node.js version requirement |

### Common Scripts
- `dev` - Start development server
- `build` - Create production bundle
- `preview` - Test production build
- `server` - Run backend API
- `lint` - Check code quality

---

## 🔗 Integration

### Dependency Installation
```
package.json → npm install → node_modules/ → Import in code
```

### Script Execution
```
npm run dev → Reads scripts.dev → Executes command
```

---

## 📊 Quick Reference

### Essential Dependencies
- React & React-DOM
- Vite
- TypeScript
- Node.js backend libraries

### Management Commands
- `npm install` - Install all
- `npm update` - Update versions
- `npm run [script]` - Run scripts
- `npm list` - Show installed