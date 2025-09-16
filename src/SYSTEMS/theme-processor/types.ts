// Theme Processor Types - Minimal version

export interface ThemeConfig {
  variables?: Record<string, any>;
  structure?: Record<string, any>;
  presets?: Record<string, any>;
  [key: string]: any;
}

export interface ThemeVariable {
  value: string;
  category?: string;
}

export interface ProcessedTheme {
  name: string;
  config: ThemeConfig;
  css: string;
}