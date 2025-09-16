# Utils

## 🎯 Quick Summary
> **Purpose**: Core utility infrastructure that supports all components with identification, styling, and persistence  
> **Type**: Utility Collection  
> **Location**: `/src/utils/`  
> **Related**: [APP](./01.01-APP.md), [JTR](./01.03-JTR.md), [DIRECT-RENDERER](./01.04-DIRECT-RENDERER.md)

---

## 🔄 Simple Explanation

Utils provides essential services to the entire system:
1. **Auto ID Helper** - Identifies and organizes elements
2. **Preset Manager** - Manages dynamic styling
3. **Storage Manager** - Handles local persistence
4. **R2 Manager** - Manages cloud storage

```
Components → Utils → Core Services → Enhanced Functionality
```

---

## 📋 Technical Specification

### Utility Modules

| Utility | Purpose | Used By |
|---------|---------|----------|
| **autoIdHelper** | ID generation, grid areas | JTR, Theme Processing |
| **presetManager** | Dynamic preset application | DirectRenderer, Editors |
| **storageManager** | Local storage operations | App, DirectRenderer |
| **r2Manager** | Cloud storage, media | Library, DirectRenderer |

### Integration Pattern

Utils are singleton instances that:
- Maintain their own state
- Dispatch events for changes
- Provide synchronous/async APIs
- Handle cross-cutting concerns

### Core Services

#### Auto ID Helper
```javascript
// Provides unique identification
generateId('ui') → 'ui-1'
getGridArea(0) → 'a'
processStructure(json) → processed
```

#### Preset Manager
```javascript
// Manages dynamic styling
applyPreset(elementId, presetName, variables)
togglePreset(elementId, presetName)
getMergedVariables(elementId)
```

#### Storage Manager
```javascript
// Local persistence
saveProject(data)
loadProject(id)
autoSave(data)
```

#### R2 Manager
```javascript
// Cloud storage
uploadAsset(file) → url
getSignedUrl(key) → url
listAssets() → assets
```

---

## 🔗 Integration

### Inputs
- **Component Requests**: Service calls from any component
- **Configuration**: Settings and options
- **Events**: System events to react to

### Outputs
- **Services**: Core functionality
- **Events**: State change notifications
- **Data**: Processed results

### Event Integration
```
Component → Util Function → Event Dispatch → Other Components
```

---

## 📊 Quick Reference

### Common Patterns

#### Using Auto ID Helper
```javascript
import { autoIdHelper } from '@/utils/autoIdHelper'
const id = autoIdHelper.generateId('ui')
const gridArea = autoIdHelper.getGridArea(index)
```

#### Using Preset Manager
```javascript
import { presetManager } from '@/utils/presetManager'
presetManager.applyPreset(elementId, 'primary', variables)
const isApplied = presetManager.hasPreset(elementId, 'primary')
```

#### Using Storage
```javascript
import { storageManager } from '@/utils/storageManager'
await storageManager.saveProject(projectData)
const project = await storageManager.loadProject(id)
```

### Utility Events
- `preset-applied`
- `preset-removed`
- `storage-saved`
- `storage-loaded`
- `asset-uploaded`