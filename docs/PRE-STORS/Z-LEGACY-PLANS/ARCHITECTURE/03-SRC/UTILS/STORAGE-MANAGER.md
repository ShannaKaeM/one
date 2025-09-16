# Storage Manager

## 🎯 Quick Summary
> **Purpose**: Handles local project persistence, autosave, and data management  
> **Type**: LocalStorage Utility  
> **Location**: `/src/utils/storageManager.ts`  
> **Related**: [APP](../../01-CORE/APP.md), [R2-MANAGER](./R2-MANAGER.md), [LIBRARY](../../01-CORE/LIBRARY.md)

---

## 🔄 Simple Explanation

Storage Manager handles **local project saving**:

1. **Saves projects locally** - Browser localStorage
2. **Auto-save functionality** - Configurable intervals
3. **Project management** - Create, update, delete
4. **Version tracking** - Project history
5. **Settings persistence** - User preferences

```
User edits → Auto-save timer → Storage Manager → localStorage → Project saved
```

---

## 📋 Technical Specification

### Data Structure

| Component | Purpose |
|-----------|---------|
| **Projects** | Array of saved projects |
| **Current Project ID** | Active project reference |
| **Settings** | Auto-save config |
| **Version** | Storage schema version |
| **Timestamps** | Created/updated tracking |

### Core Methods
- `saveProject()` - Persist project data
- `loadProject()` - Retrieve project
- `deleteProject()` - Remove project
- `exportProject()` - Download JSON
- `importProject()` - Upload JSON

### Auto-save System
```
Default: 30 seconds
Configurable interval
Debounced on rapid changes
Background operation
```

---

## 🔗 Integration

### Save Flow
```
App state changes → Debounce → Storage Manager → localStorage → Saved
```

### Load Flow
```
App starts → Storage Manager → Check localStorage → Restore last project
```

### Connected Systems
- **App** - Provides state to save
- **R2 Manager** - Cloud backup option
- **Library** - Saved items reference
- **Settings** - User preferences

---

## 📊 Quick Reference

### Storage Limits
- localStorage: ~5-10MB
- Per project: ~1-2MB typical
- Compression: Optional
- Overflow: Prompt to clean

### Data Persistence
- Browser-specific
- Survives refresh
- Domain-bound
- User-clearable

### Features
- Multiple projects
- Version history
- Export/Import
- Auto-save
- Thumbnail generation

### Best Practices
- Regular exports
- Cloud backup via R2
- Clean old projects
- Monitor storage usage