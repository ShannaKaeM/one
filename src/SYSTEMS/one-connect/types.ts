// ONEconnect Types - Minimal version for ONE platform

export interface ThemeConfig {
  layout: string;
  [key: string]: any; // Theme structure is dynamic
}

export interface ONEConnectProps {
  theme: ThemeConfig;
  stores: {
    oneStore: any; // Store hook
    [key: string]: any; // Other stores as needed
  };
  components: {
    [key: string]: React.ComponentType<any>;
  };
}

export interface ComponentConfig {
  id: string;
  gridArea?: string;
  component: string;
  props?: any;
  children?: ComponentConfig[];
}

export interface StoreConnection {
  path: string;
  store: string;
}

export interface ActionBinding {
  action: string;
  store: string;
}