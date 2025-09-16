---
type: L1-ATOM
category: CANVAS
status: COMPLETE
source: LayerTree implementation and canvas architecture
related: [layer-operations, parent-child-relationships, canvas-architecture, selection-system]
---

# Layer Hierarchy

## Definition
The nested structure system that organizes canvas elements in a tree-like hierarchy, enabling grouping, nesting, and logical organization of design elements with parent-child relationships.

## Key Principles
- Tree structure organization
- Parent-child relationships
- Depth-based rendering
- Hierarchical selection

## Tree Structure

### Basic Hierarchy
```javascript
const layerTree = {
  id: "root",
  type: "container",
  children: [
    {
      id: "header",
      type: "group",
      children: [
        { id: "logo", type: "element", component: "image" },
        { id: "nav", type: "element", component: "navigation" }
      ]
    },
    {
      id: "main",
      type: "group",
      children: [
        { id: "hero", type: "element", component: "hero-section" },
        { id: "content", type: "element", component: "text-block" }
      ]
    }
  ]
};
```

### Node Properties
```javascript
class LayerNode {
  constructor(config) {
    this.id = config.id;
    this.type = config.type; // 'element', 'group', 'container'
    this.name = config.name || this.id;
    this.parent = null;
    this.children = [];
    this.visible = config.visible !== false;
    this.locked = config.locked || false;
    this.expanded = config.expanded !== false;
    this.depth = 0;
    this.order = config.order || 0;
  }
  
  addChild(child) {
    child.parent = this;
    child.depth = this.depth + 1;
    this.children.push(child);
    this.sortChildren();
  }
  
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }
  
  sortChildren() {
    this.children.sort((a, b) => a.order - b.order);
  }
}
```

## Depth Management

### Z-Index Calculation
```javascript
function calculateZIndex(node) {
  let zIndex = node.depth * 100; // Base depth
  
  // Add order within level
  zIndex += node.order;
  
  // Special handling for floating elements
  if (node.floating) {
    zIndex += 10000;
  }
  
  // Modal and overlay layers
  if (node.type === 'modal') {
    zIndex += 50000;
  }
  
  return zIndex;
}
```

### Render Order
```javascript
function getRenderOrder(tree) {
  const renderList = [];
  
  function traverse(node) {
    if (node.visible) {
      renderList.push({
        id: node.id,
        zIndex: calculateZIndex(node),
        element: node
      });
      
      // Process children in order
      node.children
        .sort((a, b) => a.order - b.order)
        .forEach(traverse);
    }
  }
  
  traverse(tree);
  
  // Sort by z-index for final render order
  return renderList.sort((a, b) => a.zIndex - b.zIndex);
}
```

## Tree Operations

### Traversal Methods
```javascript
class LayerTreeManager {
  // Depth-first traversal
  traverse(node, callback) {
    callback(node);
    node.children.forEach(child => 
      this.traverse(child, callback)
    );
  }
  
  // Breadth-first traversal
  traverseBreadthFirst(root, callback) {
    const queue = [root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      queue.push(...node.children);
    }
  }
  
  // Find node by ID
  findNode(root, id) {
    if (root.id === id) return root;
    
    for (const child of root.children) {
      const found = this.findNode(child, id);
      if (found) return found;
    }
    
    return null;
  }
  
  // Get all ancestors
  getAncestors(node) {
    const ancestors = [];
    let current = node.parent;
    
    while (current) {
      ancestors.unshift(current);
      current = current.parent;
    }
    
    return ancestors;
  }
  
  // Get all descendants
  getDescendants(node) {
    const descendants = [];
    
    function collect(n) {
      n.children.forEach(child => {
        descendants.push(child);
        collect(child);
      });
    }
    
    collect(node);
    return descendants;
  }
}
```

### Tree Manipulation
```javascript
// Move node to new parent
function moveNode(node, newParent, index = -1) {
  // Remove from current parent
  if (node.parent) {
    node.parent.removeChild(node);
  }
  
  // Add to new parent
  newParent.addChild(node);
  
  // Set specific position if provided
  if (index >= 0) {
    const children = newParent.children;
    children.splice(children.indexOf(node), 1);
    children.splice(index, 0, node);
    
    // Update order values
    children.forEach((child, i) => {
      child.order = i;
    });
  }
  
  // Update depths for entire subtree
  updateDepths(node);
}

function updateDepths(node) {
  const baseDepth = node.parent ? node.parent.depth + 1 : 0;
  
  function updateSubtree(n, depth) {
    n.depth = depth;
    n.children.forEach(child => 
      updateSubtree(child, depth + 1)
    );
  }
  
  updateSubtree(node, baseDepth);
}
```

## Grouping System

### Group Creation
```javascript
function createGroup(selectedNodes, name = "New Group") {
  // Find common parent
  const commonParent = findCommonParent(selectedNodes);
  
  // Create group node
  const group = new LayerNode({
    id: generateId(),
    type: "group",
    name: name
  });
  
  // Add group to common parent
  commonParent.addChild(group);
  
  // Move selected nodes to group
  selectedNodes.forEach(node => {
    moveNode(node, group);
  });
  
  return group;
}

function findCommonParent(nodes) {
  if (nodes.length === 0) return null;
  if (nodes.length === 1) return nodes[0].parent;
  
  // Get all ancestor paths
  const paths = nodes.map(node => getAncestors(node));
  
  // Find common ancestors
  let commonAncestor = null;
  const minDepth = Math.min(...paths.map(p => p.length));
  
  for (let i = 0; i < minDepth; i++) {
    const ancestor = paths[0][i];
    if (paths.every(path => path[i] === ancestor)) {
      commonAncestor = ancestor;
    } else {
      break;
    }
  }
  
  return commonAncestor;
}
```

### Group Operations
```javascript
// Ungroup - move children to parent
function ungroupNode(groupNode) {
  const parent = groupNode.parent;
  const children = [...groupNode.children];
  
  // Move all children to group's parent
  children.forEach(child => {
    moveNode(child, parent);
  });
  
  // Remove the empty group
  parent.removeChild(groupNode);
}

// Flatten hierarchy
function flattenGroup(groupNode) {
  const descendants = getDescendants(groupNode);
  const parent = groupNode.parent;
  
  // Move all descendants to parent level
  descendants
    .filter(node => node.type === 'element')
    .forEach(node => {
      moveNode(node, parent);
    });
  
  // Remove group and intermediate groups
  parent.removeChild(groupNode);
}
```

## Selection Hierarchy

### Hierarchical Selection
```javascript
class HierarchicalSelection {
  constructor(tree) {
    this.tree = tree;
    this.selected = new Set();
  }
  
  select(nodeId, mode = 'replace') {
    const node = this.tree.findNode(this.tree.root, nodeId);
    if (!node) return;
    
    switch (mode) {
      case 'replace':
        this.selected.clear();
        this.selected.add(nodeId);
        break;
        
      case 'add':
        this.selected.add(nodeId);
        break;
        
      case 'toggle':
        if (this.selected.has(nodeId)) {
          this.selected.delete(nodeId);
        } else {
          this.selected.add(nodeId);
        }
        break;
        
      case 'parent':
        if (node.parent) {
          this.select(node.parent.id, 'replace');
        }
        break;
        
      case 'children':
        this.selected.clear();
        node.children.forEach(child => {
          this.selected.add(child.id);
        });
        break;
    }
  }
  
  selectWithin(groupId) {
    const group = this.tree.findNode(this.tree.root, groupId);
    if (!group) return;
    
    // Select all elements within group
    this.selected.clear();
    this.tree.traverse(group, node => {
      if (node.type === 'element') {
        this.selected.add(node.id);
      }
    });
  }
}
```

### Smart Selection
```javascript
// Select based on hierarchy level
function selectByLevel(tree, targetDepth) {
  const nodesAtLevel = [];
  
  tree.traverse(tree.root, node => {
    if (node.depth === targetDepth) {
      nodesAtLevel.push(node.id);
    }
  });
  
  return nodesAtLevel;
}

// Select siblings
function selectSiblings(nodeId) {
  const node = tree.findNode(tree.root, nodeId);
  if (!node || !node.parent) return [nodeId];
  
  return node.parent.children.map(child => child.id);
}
```

## Visual Hierarchy

### Tree Visualization
```javascript
function LayerTreeView({ tree, onSelect, selected }) {
  const renderNode = (node, depth = 0) => (
    <div 
      key={node.id}
      className={`layer-node depth-${depth}`}
      style={{ paddingLeft: `${depth * 20}px` }}
    >
      <div 
        className={`node-content ${selected.has(node.id) ? 'selected' : ''}`}
        onClick={() => onSelect(node.id)}
      >
        {node.children.length > 0 && (
          <button 
            className="expand-toggle"
            onClick={() => toggleExpanded(node.id)}
          >
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
        
        <span className="node-icon">
          {getNodeIcon(node.type)}
        </span>
        
        <span className="node-name">
          {node.name}
        </span>
        
        <div className="node-actions">
          <button onClick={() => toggleVisibility(node.id)}>
            {node.visible ? '👁' : '🚫'}
          </button>
          <button onClick={() => toggleLock(node.id)}>
            {node.locked ? '🔒' : '🔓'}
          </button>
        </div>
      </div>
      
      {node.expanded && node.children.length > 0 && (
        <div className="children">
          {node.children.map(child => 
            renderNode(child, depth + 1)
          )}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="layer-tree">
      {renderNode(tree.root)}
    </div>
  );
}
```

### Depth Indicators
```css
.layer-node {
  position: relative;
  border-left: 1px dotted var(--border-subtle);
}

.layer-node.depth-0 { border-left: none; }
.layer-node.depth-1 { border-left-color: var(--accent-primary); }
.layer-node.depth-2 { border-left-color: var(--accent-secondary); }
.layer-node.depth-3 { border-left-color: var(--accent-tertiary); }

.node-content {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  gap: 0.5rem;
  cursor: pointer;
}

.node-content:hover {
  background: var(--surface-hover);
}

.node-content.selected {
  background: var(--surface-selected);
  color: var(--text-selected);
}
```

## Hierarchy Validation

### Structure Validation
```javascript
function validateHierarchy(tree) {
  const issues = [];
  
  tree.traverse(tree.root, node => {
    // Check for circular references
    if (hasCircularReference(node)) {
      issues.push({
        type: 'circular-reference',
        nodeId: node.id,
        message: 'Circular reference detected'
      });
    }
    
    // Check depth limits
    if (node.depth > MAX_DEPTH) {
      issues.push({
        type: 'max-depth-exceeded',
        nodeId: node.id,
        message: `Depth ${node.depth} exceeds maximum ${MAX_DEPTH}`
      });
    }
    
    // Check parent-child consistency
    node.children.forEach(child => {
      if (child.parent !== node) {
        issues.push({
          type: 'parent-mismatch',
          nodeId: child.id,
          message: 'Parent reference mismatch'
        });
      }
    });
  });
  
  return issues;
}
```

### Auto-Correction
```javascript
function repairHierarchy(tree) {
  const repairs = [];
  
  // Fix orphaned nodes
  const orphans = findOrphanedNodes(tree);
  orphans.forEach(orphan => {
    tree.root.addChild(orphan);
    repairs.push(`Moved orphaned node ${orphan.id} to root`);
  });
  
  // Fix depth values
  tree.traverse(tree.root, node => {
    const correctDepth = node.parent ? node.parent.depth + 1 : 0;
    if (node.depth !== correctDepth) {
      node.depth = correctDepth;
      repairs.push(`Corrected depth for ${node.id}`);
    }
  });
  
  return repairs;
}
```

## Performance Optimization

### Virtual Scrolling
```javascript
// Render only visible nodes in large trees
function VirtualLayerTree({ tree, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 32;
  
  const flattenedNodes = useMemo(() => {
    const nodes = [];
    
    function flatten(node, depth = 0) {
      nodes.push({ ...node, depth });
      if (node.expanded) {
        node.children.forEach(child => 
          flatten(child, depth + 1)
        );
      }
    }
    
    flatten(tree.root);
    return nodes;
  }, [tree]);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const visibleNodes = flattenedNodes.slice(
    visibleStart, 
    visibleStart + visibleCount
  );
  
  return (
    <div 
      className="virtual-tree"
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: flattenedNodes.length * itemHeight }}>
        <div style={{ transform: `translateY(${visibleStart * itemHeight}px)` }}>
          {visibleNodes.map(node => (
            <LayerNodeItem key={node.id} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Related Atoms
- `layer-operations` - Operations on layers
- `parent-child-relationships` - Relationship mechanics
- `canvas-architecture` - Canvas system
- `selection-system` - Selection mechanics