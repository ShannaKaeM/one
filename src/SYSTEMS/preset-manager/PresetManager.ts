import { useONEstore } from '../../stores/ONEstore';

export class PresetManager {
  private static instance: PresetManager;
  private styleElements: Map<string, HTMLStyleElement> = new Map();
  private activeVariables: Map<string, Record<string, string>> = new Map();
  
  // Singleton pattern
  static getInstance(): PresetManager {
    if (!PresetManager.instance) {
      PresetManager.instance = new PresetManager();
    }
    return PresetManager.instance;
  }
  
  private constructor() {
    // Subscribe to preset changes
    this.subscribeToPresetChanges();
  }
  
  /**
   * Subscribe to store preset changes
   */
  private subscribeToPresetChanges() {
    // Get store subscribe method
    const unsubscribe = useONEstore.subscribe(
      (state) => state.activePresets,
      (activePresets) => {
        // Update all assets when presets change
        Object.keys(activePresets).forEach(assetId => {
          this.updateAssetPresets(assetId, activePresets[assetId]);
        });
      },
      { equalityFn: Object.is }
    );
    
    // Store unsubscribe for cleanup if needed
    (this as any).unsubscribe = unsubscribe;
  }
  
  /**
   * Update CSS variables for an asset based on active presets
   */
  updateAssetPresets(assetId: string, presetIds: string[]) {
    const store = useONEstore.getState();
    const asset = store.assets.find(a => a.id === assetId);
    if (!asset) return;
    
    // Get theme config
    const theme = (window as any).themeProcessor?.getTheme('ui');
    if (!theme?.presets) return;
    
    // Collect all variables from active presets
    const variables: Record<string, string> = {};
    
    presetIds.forEach(presetId => {
      // Find preset in theme
      const preset = this.findPreset(theme.presets, presetId);
      if (preset) {
        this.extractVariables(preset, variables);
      }
    });
    
    // Apply variables to element
    this.applyVariables(assetId, variables);
  }
  
  /**
   * Find a preset by ID in theme presets
   */
  private findPreset(presets: any, presetId: string): any {
    for (const category of Object.values(presets)) {
      if (typeof category === 'object' && category[presetId]) {
        return category[presetId];
      }
    }
    return null;
  }
  
  /**
   * Extract CSS variables from preset
   */
  private extractVariables(preset: any, variables: Record<string, string>) {
    Object.entries(preset).forEach(([key, value]) => {
      if (key.startsWith('_')) return; // Skip special keys
      
      if (typeof value === 'string' || typeof value === 'number') {
        // Convert camelCase to kebab-case CSS variable
        const cssVar = `--${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}`;
        variables[cssVar] = String(value);
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Nested object - flatten with prefix
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string' || typeof subValue === 'number') {
            const cssVar = `--${key}-${subKey}`.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            variables[cssVar] = String(subValue);
          }
        });
      }
    });
  }
  
  /**
   * Apply CSS variables to specific element
   */
  private applyVariables(assetId: string, variables: Record<string, string>) {
    // Store variables for this asset
    this.activeVariables.set(assetId, variables);
    
    // Create or update style element
    let styleEl = this.styleElements.get(assetId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = `preset-vars-${assetId}`;
      document.head.appendChild(styleEl);
      this.styleElements.set(assetId, styleEl);
    }
    
    // Generate CSS
    const css = this.generateCSS(assetId, variables);
    styleEl.textContent = css;
  }
  
  /**
   * Generate CSS for runtime variables
   */
  private generateCSS(assetId: string, variables: Record<string, string>): string {
    if (Object.keys(variables).length === 0) return '';
    
    const cssVars = Object.entries(variables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
    
    return `
/* Runtime preset variables for ${assetId} */
[data-id="${assetId}"] {
${cssVars}
}`;
  }
  
  /**
   * Handle preset conflicts - last one wins for now
   */
  resolveConflicts(presets: string[]): Record<string, string> {
    const resolved: Record<string, string> = {};
    
    presets.forEach(presetId => {
      const theme = (window as any).themeProcessor?.getTheme('ui');
      if (!theme?.presets) return;
      
      const preset = this.findPreset(theme.presets, presetId);
      if (preset) {
        this.extractVariables(preset, resolved);
      }
    });
    
    return resolved;
  }
  
  /**
   * Clear runtime styles for an asset
   */
  clearAssetStyles(assetId: string) {
    const styleEl = this.styleElements.get(assetId);
    if (styleEl) {
      styleEl.remove();
      this.styleElements.delete(assetId);
    }
    this.activeVariables.delete(assetId);
  }
  
  /**
   * Get active variables for an asset
   */
  getAssetVariables(assetId: string): Record<string, string> {
    return this.activeVariables.get(assetId) || {};
  }
  
  /**
   * Update all assets (useful after theme change)
   */
  updateAllAssets() {
    const store = useONEstore.getState();
    Object.entries(store.activePresets).forEach(([assetId, presetIds]) => {
      this.updateAssetPresets(assetId, presetIds);
    });
  }
}

// Export singleton instance
export const presetManager = PresetManager.getInstance();