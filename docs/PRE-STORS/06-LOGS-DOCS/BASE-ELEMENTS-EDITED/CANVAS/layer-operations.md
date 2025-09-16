---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: LayerTree implementation and canvas operations
related: [layer-hierarchy, parent-child-relationships, selection-system, drag-drop-system]
---

# Layer Operations

## Definition
The set of actions and manipulations that can be performed on layer tree nodes, including creation, deletion, moving, reordering, grouping, and property changes.

## Key Principles
- Non-destructive operations
- Undo/redo support
- Batch operations
- Hierarchy preservation

## Basic Operations

### Create Layer
```javascript
function createLayer(parentId, type, position) {
  const parent = findNode(parentId);
  if (!parent) throw new Error('Parent not found');
  
  const layer = new LayerNode({
    id: generateId(),
    type: type,
    name: generateName(type),
    order: position !== undefined ? position : parent.children.length
  });
  
  // Add to parent
  parent.addChild(layer);
  
  // Reorder siblings if position specified
  if (position !== undefined) {
    reorderSiblings(parent, layer, position);
  }
  
  // Record operation for undo
  recordOperation('create', { layerId: layer.id, parentId });
  
  return layer;
}
```

### Delete Layer
```javascript
function deleteLayer(layerId, preserveChildren = false) {
  const layer = findNode(layerId);
  if (!layer) return;
  
  const parent = layer.parent;
  const children = [...layer.children];
  
  if (preserveChildren) {
    // Move children to parent before deleting
    children.forEach(child => {
      moveLayer(child.id, parent.id);
    });
  }
  
  // Remove from parent
  parent.removeChild(layer);
  
  // Record operation for undo
  recordOperation('delete', {
    layerId,
    parentId: parent.id,
    layerData: serializeLayer(layer),
    preserveChildren
  });
  
  return layer;
}
```

### Move Layer
```javascript
function moveLayer(layerId, newParentId, position) {
  const layer = findNode(layerId);
  const newParent = findNode(newParentId);
  
  if (!layer || !newParent) return;
  if (isDescendant(newParent, layer)) {
    throw new Error('Cannot move layer into its own descendant');
  }
  
  const oldParent = layer.parent;
  const oldPosition = oldParent.children.indexOf(layer);
  
  // Remove from old parent
  oldParent.removeChild(layer);
  
  // Add to new parent
  newParent.addChild(layer);
  
  // Set position if specified
  if (position !== undefined) {
    reorderSiblings(newParent, layer, position);
  }
  
  // Update depths
  updateSubtreeDepths(layer);
  
  // Record operation
  recordOperation('move', {
    layerId,
    oldParentId: oldParent.id,
    newParentId,
    oldPosition,
    newPosition: position
  });
}
```

## Reordering Operations

### Reorder Siblings
```javascript
function reorderSiblings(parent, targetLayer, newPosition) {
  const children = parent.children;
  const currentIndex = children.indexOf(targetLayer);
  
  // Remove from current position
  children.splice(currentIndex, 1);
  
  // Insert at new position
  const insertIndex = Math.min(newPosition, children.length);
  children.splice(insertIndex, 0, targetLayer);
  
  // Update order values
  children.forEach((child, index) => {
    child.order = index;
  });
  
  return children;
}
```

### Move Up/Down
```javascript
function moveLayerUp(layerId) {
  const layer = findNode(layerId);
  if (!layer || !layer.parent) return;
  
  const siblings = layer.parent.children;
  const currentIndex = siblings.indexOf(layer);
  
  if (currentIndex > 0) {
    // Swap with previous sibling
    [siblings[currentIndex - 1], siblings[currentIndex]] = 
    [siblings[currentIndex], siblings[currentIndex - 1]];
    
    // Update order values
    siblings.forEach((sibling, index) => {
      sibling.order = index;
    });
    
    recordOperation('reorder', {
      layerId,
      direction: 'up',
      oldIndex: currentIndex,
      newIndex: currentIndex - 1
    });
  }
}

function moveLayerDown(layerId) {
  const layer = findNode(layerId);
  if (!layer || !layer.parent) return;
  
  const siblings = layer.parent.children;
  const currentIndex = siblings.indexOf(layer);
  
  if (currentIndex < siblings.length - 1) {
    // Swap with next sibling
    [siblings[currentIndex], siblings[currentIndex + 1]] = 
    [siblings[currentIndex + 1], siblings[currentIndex]];
    
    // Update order values
    siblings.forEach((sibling, index) => {
      sibling.order = index;
    });
    
    recordOperation('reorder', {
      layerId,
      direction: 'down',
      oldIndex: currentIndex,
      newIndex: currentIndex + 1
    });
  }
}
```

### Bring to Front/Send to Back
```javascript
function bringToFront(layerId) {
  const layer = findNode(layerId);
  if (!layer || !layer.parent) return;
  
  const siblings = layer.parent.children;
  const currentIndex = siblings.indexOf(layer);
  
  // Move to end of array (front in render order)
  siblings.splice(currentIndex, 1);
  siblings.push(layer);
  
  // Update order values
  siblings.forEach((sibling, index) => {
    sibling.order = index;
  });
  
  recordOperation('reorder', {
    layerId,
    operation: 'bring-to-front',
    oldIndex: currentIndex,
    newIndex: siblings.length - 1
  });
}

function sendToBack(layerId) {
  const layer = findNode(layerId);
  if (!layer || !layer.parent) return;
  
  const siblings = layer.parent.children;
  const currentIndex = siblings.indexOf(layer);
  
  // Move to beginning of array (back in render order)
  siblings.splice(currentIndex, 1);
  siblings.unshift(layer);
  
  // Update order values
  siblings.forEach((sibling, index) => {
    sibling.order = index;
  });
  
  recordOperation('reorder', {
    layerId,
    operation: 'send-to-back',
    oldIndex: currentIndex,
    newIndex: 0
  });
}
```

## Grouping Operations

### Create Group
```javascript
function createGroup(layerIds, groupName = 'New Group') {
  const layers = layerIds.map(id => findNode(id));
  if (layers.some(layer => !layer)) {
    throw new Error('Some layers not found');
  }
  
  // Find common parent
  const commonParent = findCommonParent(layers);
  
  // Create group
  const group = createLayer(commonParent.id, 'group');
  group.name = groupName;
  
  // Calculate group position (average of selected layers)
  const avgOrder = layers.reduce((sum, layer) => 
    sum + layer.order, 0) / layers.length;
  group.order = Math.floor(avgOrder);
  
  // Move layers to group
  layers.forEach(layer => {
    moveLayer(layer.id, group.id);
  });
  
  recordOperation('group', {
    groupId: group.id,
    layerIds,
    parentId: commonParent.id
  });
  
  return group;
}
```

### Ungroup
```javascript
function ungroupLayer(groupId) {
  const group = findNode(groupId);
  if (!group || group.type !== 'group') return;
  
  const parent = group.parent;
  const children = [...group.children];
  const groupOrder = group.order;
  
  // Move children to parent, maintaining relative order
  children.forEach((child, index) => {
    moveLayer(child.id, parent.id, groupOrder + index);
  });
  
  // Delete the empty group
  deleteLayer(groupId);
  
  recordOperation('ungroup', {
    groupId,
    childIds: children.map(child => child.id),
    parentId: parent.id
  });
  
  return children;
}
```

## Property Operations

### Visibility Toggle
```javascript
function setLayerVisibility(layerId, visible) {
  const layer = findNode(layerId);
  if (!layer) return;
  
  const oldVisible = layer.visible;
  layer.visible = visible;
  
  // Apply to all descendants if hiding
  if (!visible) {
    traverse(layer, node => {
      node.visible = false;
    });
  }
  
  recordOperation('visibility', {
    layerId,
    oldVisible,
    newVisible: visible
  });
  
  return layer;
}

function toggleLayerVisibility(layerId) {
  const layer = findNode(layerId);
  return setLayerVisibility(layerId, !layer.visible);
}
```

### Lock Toggle
```javascript
function setLayerLock(layerId, locked) {
  const layer = findNode(layerId);
  if (!layer) return;
  
  const oldLocked = layer.locked;
  layer.locked = locked;
  
  recordOperation('lock', {
    layerId,
    oldLocked,
    newLocked: locked
  });
  
  return layer;
}

function toggleLayerLock(layerId) {
  const layer = findNode(layerId);
  return setLayerLock(layerId, !layer.locked);
}
```

### Rename Layer
```javascript
function renameLayer(layerId, newName) {
  const layer = findNode(layerId);
  if (!layer) return;
  
  const oldName = layer.name;
  layer.name = newName;
  
  recordOperation('rename', {
    layerId,
    oldName,
    newName
  });
  
  return layer;
}
```

## Batch Operations

### Multi-Layer Operations
```javascript
function batchOperation(operation, layerIds, ...args) {
  const operations = [];
  
  // Begin batch
  startBatch();
  
  try {
    layerIds.forEach(layerId => {
      const result = operation(layerId, ...args);
      operations.push(result);
    });
    
    // Commit batch
    commitBatch();
    
    return operations;
  } catch (error) {
    // Rollback batch
    rollbackBatch();
    throw error;
  }
}

// Usage examples
function hideMultipleLayers(layerIds) {
  return batchOperation(setLayerVisibility, layerIds, false);
}

function deleteMultipleLayers(layerIds) {
  return batchOperation(deleteLayer, layerIds);
}

function groupMultipleLayers(layerIds, groupName) {
  return createGroup(layerIds, groupName);
}
```

### Bulk Property Changes
```javascript
function applyToSelection(propertyChanges, selectedIds) {
  startBatch();
  
  selectedIds.forEach(layerId => {
    const layer = findNode(layerId);
    if (!layer) return;
    
    Object.entries(propertyChanges).forEach(([property, value]) => {
      const oldValue = layer[property];
      layer[property] = value;
      
      recordOperation('property', {
        layerId,
        property,
        oldValue,
        newValue: value
      });
    });
  });
  
  commitBatch();
}
```

## Duplicate Operations

### Duplicate Layer
```javascript
function duplicateLayer(layerId, offset = { x: 20, y: 20 }) {
  const original = findNode(layerId);
  if (!original) return;
  
  const parent = original.parent;
  
  // Deep clone the layer and its children
  const duplicate = cloneLayerTree(original);
  duplicate.id = generateId();
  duplicate.name = `${original.name} Copy`;
  
  // Add offset to position
  if (duplicate.position) {
    duplicate.position.x += offset.x;
    duplicate.position.y += offset.y;
  }
  
  // Insert after original
  const originalIndex = parent.children.indexOf(original);
  parent.children.splice(originalIndex + 1, 0, duplicate);
  duplicate.parent = parent;
  
  // Update order values
  parent.children.forEach((child, index) => {
    child.order = index;
  });
  
  recordOperation('duplicate', {
    originalId: layerId,
    duplicateId: duplicate.id,
    parentId: parent.id
  });
  
  return duplicate;
}

function cloneLayerTree(node) {
  const clone = new LayerNode({
    id: generateId(),
    type: node.type,
    name: node.name,
    visible: node.visible,
    locked: node.locked,
    position: node.position ? { ...node.position } : null,
    properties: node.properties ? { ...node.properties } : {}
  });
  
  // Clone children recursively
  node.children.forEach(child => {
    const childClone = cloneLayerTree(child);
    clone.addChild(childClone);
  });
  
  return clone;
}
```

## Search and Filter Operations

### Find Layers
```javascript
function findLayersByName(name, caseSensitive = false) {
  const results = [];
  const searchName = caseSensitive ? name : name.toLowerCase();
  
  traverse(rootLayer, layer => {
    const layerName = caseSensitive ? layer.name : layer.name.toLowerCase();
    if (layerName.includes(searchName)) {
      results.push(layer);
    }
  });
  
  return results;
}

function findLayersByType(type) {
  const results = [];
  
  traverse(rootLayer, layer => {
    if (layer.type === type) {
      results.push(layer);
    }
  });
  
  return results;
}

function findLayersByProperty(property, value) {
  const results = [];
  
  traverse(rootLayer, layer => {
    if (layer.properties && layer.properties[property] === value) {
      results.push(layer);
    }
  });
  
  return results;
}
```

### Filter Operations
```javascript
function filterLayers(predicate) {
  const results = [];
  
  traverse(rootLayer, layer => {
    if (predicate(layer)) {
      results.push(layer);
    }
  });
  
  return results;
}

// Common filters
const filters = {
  visible: (layer) => layer.visible,
  hidden: (layer) => !layer.visible,
  locked: (layer) => layer.locked,
  unlocked: (layer) => !layer.locked,
  groups: (layer) => layer.type === 'group',
  elements: (layer) => layer.type === 'element',
  empty: (layer) => layer.children.length === 0,
  hasChildren: (layer) => layer.children.length > 0
};
```

## Validation Operations

### Validate Tree Structure
```javascript
function validateLayerTree(root) {
  const errors = [];
  
  traverse(root, layer => {
    // Check parent-child consistency
    layer.children.forEach(child => {
      if (child.parent !== layer) {
        errors.push({
          type: 'parent-mismatch',
          layerId: child.id,
          message: `Child ${child.id} parent mismatch`
        });
      }
    });
    
    // Check for duplicate IDs
    const ids = new Set();
    traverse(layer, node => {
      if (ids.has(node.id)) {
        errors.push({
          type: 'duplicate-id',
          layerId: node.id,
          message: `Duplicate ID: ${node.id}`
        });
      }
      ids.add(node.id);
    });
    
    // Check depth limits
    if (layer.depth > MAX_DEPTH) {
      errors.push({
        type: 'max-depth',
        layerId: layer.id,
        message: `Depth ${layer.depth} exceeds maximum ${MAX_DEPTH}`
      });
    }
  });
  
  return errors;
}
```

### Auto-Repair
```javascript
function repairLayerTree(root) {
  const repairs = [];
  
  // Fix orphaned layers
  const orphans = findOrphanedLayers(root);
  orphans.forEach(orphan => {
    root.addChild(orphan);
    repairs.push(`Moved orphaned layer ${orphan.id} to root`);
  });
  
  // Fix depth values
  traverse(root, layer => {
    const correctDepth = layer.parent ? layer.parent.depth + 1 : 0;
    if (layer.depth !== correctDepth) {
      layer.depth = correctDepth;
      repairs.push(`Fixed depth for layer ${layer.id}`);
    }
  });
  
  // Fix order values
  traverse(root, layer => {
    layer.children.forEach((child, index) => {
      if (child.order !== index) {
        child.order = index;
        repairs.push(`Fixed order for layer ${child.id}`);
      }
    });
  });
  
  return repairs;
}
```

## Related Atoms
- `layer-hierarchy` - Layer tree structure
- `parent-child-relationships` - Relationship mechanics
- `selection-system` - Selection operations
- `drag-drop-system` - Drag operations