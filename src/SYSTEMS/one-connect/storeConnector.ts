// Store Connector - Minimal Zustand connection for ONEconnect

export class StoreConnector {
  private stores: Record<string, any>;

  constructor(stores: Record<string, any>) {
    this.stores = stores;
  }

  // Get value from store using path like "workspace.gridVisible"
  getValue(storeName: string, path: string): any {
    const store = this.stores[storeName];
    if (!store) return undefined;

    // Get current state
    const state = store.getState();
    
    // Navigate path
    const pathParts = path.split('.');
    let value = state;
    
    for (const part of pathParts) {
      if (value && typeof value === 'object') {
        // Handle array index access like activePresets[assetId]
        if (part.includes('[') && part.includes(']')) {
          const [arrayName, key] = part.split('[');
          const cleanKey = key.replace(']', '');
          value = value[arrayName]?.[cleanKey];
        } else {
          value = value[part];
        }
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  // Get action from store
  getAction(storeName: string, actionName: string): Function | undefined {
    const store = this.stores[storeName];
    if (!store) return undefined;

    const state = store.getState();
    
    // Actions are directly on state in Zustand
    if (typeof state[actionName] === 'function') {
      return state[actionName];
    }
    
    return undefined;
  }

  // Subscribe to store changes (minimal version)
  subscribe(storeName: string, callback: () => void): () => void {
    const store = this.stores[storeName];
    if (!store) return () => {};
    
    return store.subscribe(callback);
  }
}