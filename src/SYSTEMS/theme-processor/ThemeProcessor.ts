import { ThemeConfig } from './types';

export class ThemeProcessor {
  private themes: Map<string, ThemeConfig> = new Map();

  /**
   * Load theme from JSON file
   */
  async loadTheme(themeName: string): Promise<ThemeConfig> {
    try {
      const response = await fetch(`/data/themes/${themeName}-theme.json`);
      if (!response.ok) {
        throw new Error(`Failed to load theme: ${response.statusText}`);
      }
      
      const themeConfig = await response.json();
      this.themes.set(themeName, themeConfig);
      return themeConfig;
    } catch (error) {
      console.error(`Error loading ${themeName} theme:`, error);
      throw error;
    }
  }

  /**
   * Generate CSS from theme config
   */
  generateCSS(themeConfig: ThemeConfig, themeName: string): string {
    const cssLines: string[] = [];
    
    // Open scope
    cssLines.push(`.${themeName} {`);
    
    // Process variables if they exist
    if (themeConfig.variables) {
      cssLines.push('  /* Theme Variables */');
      this.processVariables(themeConfig.variables, cssLines);
    }
    
    // Process structure if it exists
    if (themeConfig.structure?.root) {
      cssLines.push('  /* Root Structure */');
      this.processStyles(themeConfig.structure.root, cssLines);
    }
    
    // Close scope
    cssLines.push('}');
    
    // Process any additional structure elements
    if (themeConfig.structure) {
      Object.entries(themeConfig.structure).forEach(([key, styles]) => {
        if (key !== 'root' && typeof styles === 'object') {
          cssLines.push('');
          cssLines.push(`.${themeName} .${key} {`);
          this.processStyles(styles, cssLines);
          cssLines.push('}');
        }
      });
    }
    
    // Process presets
    if (themeConfig.presets) {
      cssLines.push('');
      cssLines.push('/* Theme Presets */');
      this.processPresets(themeConfig.presets, cssLines, themeName);
    }
    
    return cssLines.join('\n');
  }

  /**
   * Process variables into CSS custom properties
   */
  private processVariables(variables: Record<string, any>, cssLines: string[], prefix = ''): void {
    Object.entries(variables).forEach(([key, value]) => {
      if (typeof value === 'object' && !value.value) {
        // Nested category
        this.processVariables(value, cssLines, `${prefix}${key}-`);
      } else {
        // Variable with value
        const varValue = typeof value === 'object' ? value.value : value;
        const cssVarName = `--${prefix}${this.camelToKebab(key)}`;
        cssLines.push(`  ${cssVarName}: ${varValue};`);
      }
    });
  }


  /**
   * Process presets into CSS classes
   */
  private processPresets(presets: Record<string, any>, cssLines: string[], themeName: string): void {
    Object.entries(presets).forEach(([category, categoryPresets]) => {
      cssLines.push(`/* ${category} presets */`);
      
      Object.entries(categoryPresets).forEach(([presetName, presetStyles]) => {
        // Skip if not an object with styles
        if (typeof presetStyles !== 'object') return;
        
        // Handle different selector types based on category
        if (category === 'layouts' || category === 'looks') {
          // Compound selector for layouts and looks
          cssLines.push(`.${themeName}.${presetName} {`);
        } else if (category === 'components') {
          // Component-specific presets
          Object.entries(presetStyles).forEach(([componentClass, componentStyles]) => {
            cssLines.push(`.${themeName} .${componentClass} {`);
            this.processStyles(componentStyles, cssLines);
            cssLines.push('}');
          });
          return; // Skip the rest for component presets
        } else {
          // Default: descendant selector
          cssLines.push(`.${themeName} .${presetName} {`);
        }
        
        // Process regular styles
        this.processStyles(presetStyles, cssLines);
        
        // Process state variations
        if (presetStyles._states) {
          Object.entries(presetStyles._states).forEach(([state, stateStyles]) => {
            cssLines.push(`  &:${state} {`);
            this.processStyles(stateStyles, cssLines, '    ');
            cssLines.push(`  }`);
          });
        }
        
        cssLines.push('}');
      });
    });
  }

  /**
   * Process style properties with optional indent
   */
  private processStyles(styles: Record<string, any>, cssLines: string[], indent = '  '): void {
    Object.entries(styles).forEach(([prop, value]) => {
      if (prop.startsWith('_')) return; // Skip special properties
      if (typeof value === 'string' || typeof value === 'number') {
        const cssProp = this.camelToKebab(prop);
        cssLines.push(`${indent}${cssProp}: ${value};`);
      }
    });
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }

  /**
   * Apply theme by injecting CSS
   */
  async applyTheme(themeName: string): Promise<boolean> {
    try {
      // Load theme if not cached
      let themeConfig = this.themes.get(themeName);
      if (!themeConfig) {
        themeConfig = await this.loadTheme(themeName);
      }
      
      // Generate CSS
      const css = this.generateCSS(themeConfig, themeName);
      
      // Inject CSS
      this.injectCSS(css, `${themeName}-theme-styles`);
      
      return true;
    } catch (error) {
      console.error(`Failed to apply ${themeName} theme:`, error);
      return false;
    }
  }

  /**
   * Inject CSS into DOM
   */
  private injectCSS(css: string, styleId: string): void {
    // Remove existing style if present
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    
    // Create and inject new style
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Get cached theme
   */
  getTheme(themeName: string): ThemeConfig | undefined {
    return this.themes.get(themeName);
  }
}

// Export singleton instance
export const themeProcessor = new ThemeProcessor();