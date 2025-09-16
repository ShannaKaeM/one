# Core Config

## 🎯 Quick Summary
> **Purpose**: System configuration files that define how Studio1 builds, runs, and deploys  
> **Type**: Configuration Files  
> **Location**: Root directory  
> **Related**: All components depend on these configurations

---

## 🔄 Simple Explanation

Core Config files are the **foundation** that make everything work. They're "core" because without any one of them, Studio1 cannot run:

1. **package.json** - This is the project manifest that lists all dependencies and defines how to run the app. Without it, you can't install or start anything.

2. **vite.config.ts** - This configures the build tool that transforms your code into something browsers understand. It handles the dev server, hot reloading, and production builds.

3. **server.js** - This runs the backend API that enables file operations and cloud storage. Frontend needs this to save/load files.

4. **tsconfig.json** - This sets up TypeScript to check your code for errors before runtime. It enables type safety across the entire codebase.

5. **.env.local** - This stores secret API keys and passwords needed to connect to external services like R2 storage. Never shared or committed.

6. **postcss.config.js** - This processes all CSS to ensure it works across different browsers and optimizes styles for production.

```
Core Config → Build System → Running Application
```

---

## 📋 Technical Specification

### Configuration Files

| File | Purpose |
|------|---------|
| **package.json** | Dependencies and build scripts |
| **vite.config.ts** | Build and dev server settings |
| **server.js** | Backend API server |
| **tsconfig.json** | TypeScript compiler options |
| **.env.local** | Environment variables (secrets) |
| **postcss.config.js** | CSS processing pipeline |

---

## 🔗 Integration

### How They Work Together
```
package.json → defines what to run
vite.config → controls how it builds
tsconfig → controls TypeScript
server.js → provides API backend
.env → provides secrets
postcss → processes CSS
```

---

## 📊 Quick Reference

### Purpose
Core Config files control:
- What libraries to use
- How to build the app
- How to run the server
- What secrets to use
- How to process code

### Sub-domains
- **PACKAGE-JSON** - Lists all the code libraries needed and defines commands to run the app
- **VITE-CONFIG** - Controls how the app builds and runs the development server
- **SERVER** - Runs the backend API that handles file operations and cloud storage
- **TSCONFIG** - Sets TypeScript rules for type checking and code compilation
- **ENV-LOCAL** - Stores secret API keys and passwords that should never be shared
- **POSTCSS-CONFIG** - Processes CSS to work in all browsers and optimizes styles