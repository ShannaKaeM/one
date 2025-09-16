---
type: L1-ATOM
category: ARCHITECTURE
status: COMPLETE
source: Component architecture and layer system
related: [layer-hierarchy, layer-operations, component-inheritance, canvas-architecture]
---

# Parent-Child Relationships

## Definition
The foundational system that defines how components and layers relate to each other hierarchically, enabling inheritance, containment, and cascading behaviors throughout the design system.

## Key Principles
- Hierarchical inheritance
- Containment boundaries
- Cascading properties
- Relationship constraints

## Basic Relationship Model

### Parent-Child Structure
```javascript
class ComponentRelationship {
  constructor(parent, child) {
    this.parent = parent;
    this.child = child;
    this.type = 'contains'; // 'contains', 'inherits', 'references'
    this.constraints = [];
    this.inheritance = {
      styles: true,
      properties: true,
      behaviors: false
    };
  }
  
  establish() {
    // Set parent reference
    this.child.parent = this.parent;
    
    // Add to parent's children
    if (!this.parent.children) {
      this.parent.children = [];
    }
    this.parent.children.push(this.child);
    
    // Apply inheritance
    this.applyInheritance();
    
    // Set constraints
    this.applyConstraints();
  }
  
  applyInheritance() {
    if (this.inheritance.styles) {
      this.child.inheritStyles(this.parent);
    }
    
    if (this.inheritance.properties) {
      this.child.inheritProperties(this.parent);
    }
    
    if (this.inheritance.behaviors) {
      this.child.inheritBehaviors(this.parent);
    }
  }
}
```

### Relationship Types
```javascript
const RELATIONSHIP_TYPES = {
  CONTAINS: 'contains',        // Parent contains child physically
  INHERITS: 'inherits',        // Child inherits from parent
  REFERENCES: 'references',    // Component references another
  DEPENDS: 'depends',          // Child depends on parent
  COMPOSES: 'composes',        // Parent is composed of children
  AGGREGATES: 'aggregates'     // Parent aggregates children
};

function createRelationship(parent, child, type = 'contains') {
  switch (type) {
    case RELATIONSHIP_TYPES.CONTAINS:
      return new ContainmentRelationship(parent, child);
    case RELATIONSHIP_TYPES.INHERITS:
      return new InheritanceRelationship(parent, child);
    case RELATIONSHIP_TYPES.REFERENCES:
      return new ReferenceRelationship(parent, child);
    default:
      return new BasicRelationship(parent, child);
  }
}
```

## Containment Relationships

### Physical Containment
```javascript
class ContainmentRelationship extends ComponentRelationship {
  constructor(parent, child) {
    super(parent, child);
    this.type = 'contains';
    this.bounds = null;
    this.overflow = 'hidden'; // 'hidden', 'visible', 'scroll'
  }
  
  establish() {
    super.establish();
    
    // Set containment bounds
    this.setBounds();
    
    // Apply overflow rules
    this.applyOverflow();
    
    // Enable clipping if needed
    if (this.overflow === 'hidden') {
      this.enableClipping();
    }
  }
  
  setBounds() {
    this.bounds = {
      x: this.parent.position.x,
      y: this.parent.position.y,
      width: this.parent.size.width,
      height: this.parent.size.height
    };
    
    // Constrain child within bounds
    this.constrainChild();
  }
  
  constrainChild() {
    const child = this.child;
    const bounds = this.bounds;
    
    // Ensure child doesn't exceed parent bounds
    if (child.position.x < bounds.x) {
      child.position.x = bounds.x;
    }
    
    if (child.position.y < bounds.y) {
      child.position.y = bounds.y;
    }
    
    if (child.position.x + child.size.width > bounds.x + bounds.width) {
      child.position.x = bounds.x + bounds.width - child.size.width;
    }
    
    if (child.position.y + child.size.height > bounds.y + bounds.height) {
      child.position.y = bounds.y + bounds.height - child.size.height;
    }
  }
}
```

### Layout Containment
```javascript
class LayoutContainer extends ContainmentRelationship {
  constructor(parent, child) {
    super(parent, child);
    this.layout = {
      type: 'flow', // 'flow', 'grid', 'flex', 'absolute'
      direction: 'row',
      gap: 0,
      alignment: 'start'
    };
  }
  
  applyLayout() {
    switch (this.layout.type) {
      case 'flow':
        this.applyFlowLayout();
        break;
      case 'grid':
        this.applyGridLayout();
        break;
      case 'flex':
        this.applyFlexLayout();
        break;
      case 'absolute':
        this.applyAbsoluteLayout();
        break;
    }
  }
  
  applyFlowLayout() {
    let currentX = this.parent.padding.left;
    let currentY = this.parent.padding.top;
    let rowHeight = 0;
    
    this.parent.children.forEach(child => {
      // Check if child fits on current row
      if (currentX + child.size.width > this.parent.size.width - this.parent.padding.right) {
        // Move to next row
        currentX = this.parent.padding.left;
        currentY += rowHeight + this.layout.gap;
        rowHeight = 0;
      }
      
      // Position child
      child.position.x = currentX;
      child.position.y = currentY;
      
      // Update position for next child
      currentX += child.size.width + this.layout.gap;
      rowHeight = Math.max(rowHeight, child.size.height);
    });
  }
}
```

## Inheritance Relationships

### Style Inheritance
```javascript
class StyleInheritance {
  constructor(parent, child) {
    this.parent = parent;
    this.child = child;
    this.inheritableProperties = [
      'color', 'fontFamily', 'fontSize', 'fontWeight',
      'lineHeight', 'textAlign', 'textDecoration'
    ];
  }
  
  apply() {
    this.inheritableProperties.forEach(property => {
      if (this.parent.styles[property] && !this.child.styles[property]) {
        this.child.styles[property] = this.parent.styles[property];
      }
    });
    
    // Special handling for CSS custom properties
    this.inheritCustomProperties();
  }
  
  inheritCustomProperties() {
    Object.entries(this.parent.styles).forEach(([property, value]) => {
      if (property.startsWith('--') && !this.child.styles[property]) {
        this.child.styles[property] = value;
      }
    });
  }
}
```

### Property Inheritance
```javascript
class PropertyInheritance {
  constructor(parent, child) {
    this.parent = parent;
    this.child = child;
    this.inheritableProps = [
      'theme', 'locale', 'accessibility', 'permissions'
    ];
  }
  
  apply() {
    this.inheritableProps.forEach(prop => {
      if (this.parent.properties[prop] && !this.child.properties[prop]) {
        this.child.properties[prop] = this.parent.properties[prop];
      }
    });
    
    // Merge context
    this.child.context = {
      ...this.parent.context,
      ...this.child.context
    };
  }
}
```

## Constraint Systems

### Positional Constraints
```javascript
class PositionalConstraints {
  constructor(parent, child) {
    this.parent = parent;
    this.child = child;
    this.constraints = {
      minX: 0,
      minY: 0,
      maxX: parent.size.width,
      maxY: parent.size.height,
      snapToGrid: false,
      maintainAspectRatio: false
    };
  }
  
  apply() {
    // Apply position constraints
    this.constrainPosition();
    
    // Apply size constraints
    this.constrainSize();
    
    // Apply grid snapping if enabled
    if (this.constraints.snapToGrid) {
      this.snapToGrid();
    }
  }
  
  constrainPosition() {
    const pos = this.child.position;
    const size = this.child.size;
    
    // Constrain to parent bounds
    pos.x = Math.max(this.constraints.minX, 
             Math.min(pos.x, this.constraints.maxX - size.width));
    pos.y = Math.max(this.constraints.minY,
             Math.min(pos.y, this.constraints.maxY - size.height));
  }
  
  constrainSize() {
    const size = this.child.size;
    const pos = this.child.position;
    
    // Don't exceed parent bounds
    size.width = Math.min(size.width, this.constraints.maxX - pos.x);
    size.height = Math.min(size.height, this.constraints.maxY - pos.y);
    
    // Maintain aspect ratio if required
    if (this.constraints.maintainAspectRatio) {
      const aspectRatio = size.width / size.height;
      if (size.width / size.height !== aspectRatio) {
        size.height = size.width / aspectRatio;
      }
    }
  }
}
```

### Dependency Constraints
```javascript
class DependencyConstraints {
  constructor() {
    this.dependencies = new Map(); // child -> [parents]
    this.dependents = new Map();   // parent -> [children]
  }
  
  addDependency(child, parent, type = 'hard') {
    // Add to dependencies map
    if (!this.dependencies.has(child)) {
      this.dependencies.set(child, []);
    }
    this.dependencies.get(child).push({ parent, type });
    
    // Add to dependents map
    if (!this.dependents.has(parent)) {
      this.dependents.set(parent, []);
    }
    this.dependents.get(parent).push({ child, type });
  }
  
  validateChange(component, change) {
    const dependencies = this.dependencies.get(component) || [];
    
    // Check if change violates any dependencies
    for (const { parent, type } of dependencies) {
      if (type === 'hard' && this.violatesDependency(component, parent, change)) {
        return {
          valid: false,
          reason: `Change violates dependency on ${parent.id}`
        };
      }
    }
    
    return { valid: true };
  }
  
  violatesDependency(child, parent, change) {
    // Check various dependency violations
    switch (change.type) {
      case 'move':
        return this.checkMoveViolation(child, parent, change);
      case 'resize':
        return this.checkResizeViolation(child, parent, change);
      case 'delete':
        return this.checkDeleteViolation(child, parent, change);
      default:
        return false;
    }
  }
}
```

## Event Propagation

### Bubble Events
```javascript
class EventPropagation {
  constructor(tree) {
    this.tree = tree;
    this.eventHandlers = new Map();
  }
  
  addEventListener(componentId, eventType, handler, options = {}) {
    const key = `${componentId}:${eventType}`;
    if (!this.eventHandlers.has(key)) {
      this.eventHandlers.set(key, []);
    }
    
    this.eventHandlers.get(key).push({
      handler,
      capture: options.capture || false,
      once: options.once || false,
      passive: options.passive || false
    });
  }
  
  dispatchEvent(sourceId, event) {
    const component = this.tree.findNode(sourceId);
    if (!component) return;
    
    // Capture phase - from root to target
    if (event.bubbles) {
      const path = this.getEventPath(component);
      this.processEventPhase(path.reverse(), event, 'capture');
    }
    
    // Target phase
    this.processEventOnComponent(component, event);
    
    // Bubble phase - from target to root
    if (event.bubbles && !event.cancelBubble) {
      const path = this.getEventPath(component);
      this.processEventPhase(path.slice(1), event, 'bubble');
    }
  }
  
  getEventPath(component) {
    const path = [];
    let current = component;
    
    while (current) {
      path.push(current);
      current = current.parent;
    }
    
    return path;
  }
  
  processEventPhase(path, event, phase) {
    for (const component of path) {
      if (event.cancelBubble) break;
      
      const handlers = this.getHandlers(component.id, event.type);
      for (const handlerInfo of handlers) {
        if (handlerInfo.capture === (phase === 'capture')) {
          handlerInfo.handler(event);
          
          if (handlerInfo.once) {
            this.removeEventListener(component.id, event.type, handlerInfo.handler);
          }
        }
      }
    }
  }
}
```

## Lifecycle Management

### Parent-Child Lifecycle
```javascript
class LifecycleManager {
  constructor() {
    this.lifecycleHooks = {
      beforeAdd: [],
      afterAdd: [],
      beforeRemove: [],
      afterRemove: [],
      beforeMove: [],
      afterMove: []
    };
  }
  
  addChild(parent, child) {
    // Before add hooks
    this.runHooks('beforeAdd', { parent, child });
    
    // Establish relationship
    const relationship = new ContainmentRelationship(parent, child);
    relationship.establish();
    
    // Initialize child in parent context
    this.initializeChild(child, parent);
    
    // After add hooks
    this.runHooks('afterAdd', { parent, child });
    
    return relationship;
  }
  
  removeChild(parent, child) {
    // Before remove hooks
    this.runHooks('beforeRemove', { parent, child });
    
    // Clean up child
    this.cleanupChild(child);
    
    // Remove relationship
    parent.children = parent.children.filter(c => c !== child);
    child.parent = null;
    
    // After remove hooks
    this.runHooks('afterRemove', { parent, child });
  }
  
  initializeChild(child, parent) {
    // Inherit parent context
    child.context = { ...parent.context, ...child.context };
    
    // Apply parent styles
    this.applyInheritedStyles(child, parent);
    
    // Set up event propagation
    this.setupEventPropagation(child, parent);
    
    // Initialize child components
    if (child.children) {
      child.children.forEach(grandchild => {
        this.initializeChild(grandchild, child);
      });
    }
  }
  
  cleanupChild(child) {
    // Remove event listeners
    this.removeEventListeners(child);
    
    // Clean up resources
    this.cleanupResources(child);
    
    // Recursively cleanup children
    if (child.children) {
      child.children.forEach(grandchild => {
        this.cleanupChild(grandchild);
      });
    }
  }
}
```

## Circular Reference Prevention

### Reference Validation
```javascript
class CircularReferenceGuard {
  constructor() {
    this.activeChecks = new Set();
  }
  
  canAddChild(parent, child) {
    // Prevent direct circular reference
    if (parent === child) {
      return { allowed: false, reason: 'Cannot add component to itself' };
    }
    
    // Prevent indirect circular reference
    if (this.wouldCreateCycle(parent, child)) {
      return { allowed: false, reason: 'Would create circular reference' };
    }
    
    return { allowed: true };
  }
  
  wouldCreateCycle(parent, child) {
    // Use DFS to check if parent is descendant of child
    const visited = new Set();
    const stack = [child];
    
    while (stack.length > 0) {
      const current = stack.pop();
      
      if (visited.has(current.id)) continue;
      visited.add(current.id);
      
      if (current === parent) {
        return true; // Cycle detected
      }
      
      if (current.children) {
        stack.push(...current.children);
      }
    }
    
    return false;
  }
}
```

## Performance Optimization

### Lazy Loading
```javascript
class LazyRelationshipLoader {
  constructor() {
    this.loadedRelationships = new Set();
    this.pendingLoads = new Map();
  }
  
  loadRelationship(parent, childId) {
    const key = `${parent.id}:${childId}`;
    
    if (this.loadedRelationships.has(key)) {
      return Promise.resolve(this.getChild(parent, childId));
    }
    
    if (this.pendingLoads.has(key)) {
      return this.pendingLoads.get(key);
    }
    
    const loadPromise = this.doLoadChild(parent, childId)
      .then(child => {
        this.loadedRelationships.add(key);
        this.pendingLoads.delete(key);
        return child;
      });
    
    this.pendingLoads.set(key, loadPromise);
    return loadPromise;
  }
  
  async doLoadChild(parent, childId) {
    // Load child component
    const childData = await this.fetchChildData(childId);
    const child = this.createChildComponent(childData);
    
    // Establish relationship
    const relationship = new ContainmentRelationship(parent, child);
    relationship.establish();
    
    return child;
  }
}
```

## Related Atoms
- `layer-hierarchy` - Layer tree structure
- `layer-operations` - Layer manipulation
- `component-inheritance` - Component inheritance
- `canvas-architecture` - Canvas system