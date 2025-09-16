import React, { useMemo } from 'react';
import { ONEConnectProps } from './types';
import { StoreConnector } from './storeConnector';

// Built-in grid area assignment
function getGridArea(index: number): string {
  if (index < 26) {
    return String.fromCharCode(97 + index); // a-z
  }
  // After z: aa, ab, ac...
  const first = String.fromCharCode(97 + Math.floor(index / 26) - 1);
  const second = String.fromCharCode(97 + (index % 26));
  return first + second;
}

// Built-in component ID generation
let componentIdCounter = 0;
function generateComponentId(type: string): string {
  return `${type}-${Date.now()}-${componentIdCounter++}`;
}

export const ONEconnect: React.FC<ONEConnectProps> = ({ theme, stores, components }) => {
  // Create store connector instance
  const storeConnector = useMemo(() => new StoreConnector(stores), [stores]);

  // Get the active layout from STORE, not hardcoded theme path!
  const layoutKey = storeConnector.getValue('oneStore', 'currentView') || 'dashboard';
  
  // Look for layout definition in presets.layouts
  const layoutDef = theme.presets?.layouts?.[layoutKey];
  
  if (!layoutDef) {
    console.warn('ONEconnect: No valid layout found for:', layoutKey);
    return null;
  }

  // Extract children from layout
  const children = layoutDef.children || [];

  // Render components
  return (
    <div className={`one-connect ${layoutKey}`}>
      {children.map((childId: string, index: number) => {
        // Get component definition from theme.structure
        const componentDef = theme.structure?.[childId];
        
        if (!componentDef) {
          console.warn('ONEconnect: Component definition not found:', childId);
          return null;
        }

        // Extract component type
        const componentType = typeof componentDef === 'string' 
          ? componentDef 
          : componentDef['data-component'] || childId;

        // Get actual component OR use div as fallback
        const Component = components[componentType] || 'div';

        // Auto-assign grid area
        const gridArea = componentDef['grid-area'] || getGridArea(index);

        // Generate ID if needed
        const componentId = componentDef.id || generateComponentId(componentType);

        // Extract data source if specified
        let data = {};
        if (componentDef['data-source']) {
          const [storeName, ...pathParts] = componentDef['data-source'].split('.');
          const path = pathParts.join('.');
          const value = storeConnector.getValue(storeName, path);
          if (value !== undefined) {
            data = { [path.split('.').pop()]: value };
          }
        }

        // Extract actions if specified
        let actions = {};
        if (componentDef['data-actions']) {
          Object.entries(componentDef['data-actions']).forEach(([event, actionPath]) => {
            if (typeof actionPath === 'string') {
              const [storeName, actionName] = actionPath.split('.');
              const action = storeConnector.getAction(storeName, actionName);
              if (action) {
                actions[event] = action;
              }
            }
          });
        }

        // Get active presets from store
        const activePresets = storeConnector.getValue('oneStore', `activePresets.${componentId}`) || [];
        
        // Extract preset targets from component definition
        const presetTargets = componentDef['data-preset-targets'] || [];
        
        // Build class names including presets
        const wrapperClasses = [
          'one-wrapper',
          `${componentType}-wrapper`,
          ...activePresets // Add active preset classes
        ].join(' ');

        // Create wrapper with grid area
        return (
          <div 
            key={componentId}
            className={wrapperClasses}
            style={{ gridArea }}
            data-component={componentType}
            data-id={componentId}
          >
            <Component 
              {...componentDef.props}
              {...data}
              {...actions}
              id={componentId}
              data-component={typeof Component === 'string' ? componentType : undefined}
            />
          </div>
        );
      })}
    </div>
  );
};

// Export utilities for external use if needed
export { getGridArea, generateComponentId };