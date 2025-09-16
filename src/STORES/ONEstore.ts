import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types
interface Asset {
  // Identity
  id: string;
  type: string; // From theme, not hardcoded!
  name: string;
  
  // Location & Storage
  location: string; // From theme, not hardcoded!
  url?: string;
  
  // Relationships
  parent?: string;
  children?: string[];
  usedBy?: string[];
  uses?: string[];
  
  // Properties
  content?: any;
  style?: object;
  transform?: object;
  
  // State
  visible: boolean;
  locked: boolean;
  zIndex: number;
  
  // PRESET FIELDS
  presets: string[]; // Active presets on this asset
  inheritedPresets?: string[]; // Calculated from parent
  
  // Metadata
  created: Date;
  modified: Date;
  version: number;
  size?: number;
  dimensions?: { width: number; height: number };
  tags: string[];
  collections: string[];
}

interface ONEStoreState {
  // FLAT STRUCTURE - No nested actors!
  
  // Selection
  selectedAssets: string[];
  activeAsset: string | null;
  
  // Clipboard & History
  clipboard: Asset | Asset[] | null;
  history: any[]; // Action history for undo/redo
  
  // Canvas Tools
  activeTool: string; // From theme, not hardcoded
  isDragging: boolean;
  isResizing: boolean;
  isRotating: boolean;
  isGrouping: boolean;
  isPanning: boolean;
  
  // Edit Mode
  mode: string; // From theme, not hardcoded
  
  // View Settings
  currentView: string; // From theme layouts, not hardcoded!
  zoom: number;
  grid: boolean;
  snap: boolean;
  rulers: boolean;
  
  // Panels (Dynamic)
  panels: { [key: string]: boolean }; // From theme, not positions!
  
  // Library View
  libraryFilter: string; // From theme, not hardcoded!
  librarySortBy: string; // From theme
  libraryView: string; // From theme
  librarySearch: string;
  
  // Assets (Everything is an asset)
  assets: Asset[];
  
  // PRESET SYSTEM
  activePresets: { [assetId: string]: string[] }; // Which presets active per asset
  globalPresets: { [assetType: string]: string[] }; // Default presets by type
  availablePresets: string[]; // All presets from theme
  presetInheritance: { [assetId: string]: string[] }; // Calculated inheritance
  
  // ACTIONS
  // Selection
  selectAsset: (id: string) => void;
  selectMultiple: (ids: string[]) => void;
  clearSelection: () => void;
  
  // Clipboard
  copy: () => void;
  paste: () => void;
  cut: () => void;
  undo: () => void;
  redo: () => void;
  
  // Tools
  setTool: (tool: string) => void;
  setMode: (mode: string) => void;
  
  // View
  setView: (view: string) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  toggleRulers: () => void;
  togglePanel: (panelId: string) => void;
  
  // Library
  setLibraryFilter: (filter: string) => void;
  setLibrarySort: (sort: string) => void;
  setLibraryView: (view: string) => void;
  searchLibrary: (query: string) => void;
  
  // Assets
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  duplicateAsset: (id: string) => string;
  groupAssets: (ids: string[]) => string;
  ungroupAsset: (groupId: string) => string[];
  moveToLibrary: (id: string) => void;
  importAsset: (file: File) => Promise<Asset>;
  exportAsset: (id: string) => Promise<Blob>;
  saveProject: () => Promise<void>;
  loadProject: (data: any) => Promise<void>;
  
  // PRESET SYSTEM ACTIONS
  applyPreset: (assetId: string, presetId: string) => void;
  removePreset: (assetId: string, presetId: string) => void;
  togglePreset: (assetId: string, presetId: string) => void;
  setGlobalPreset: (assetType: string, presetId: string) => void;
  clearPresets: (assetId: string) => void;
  calculateInheritance: (assetId: string) => string[];
  setAvailablePresets: (presets: string[]) => void;
}

// Create the store
export const useONEstore = create<ONEStoreState>()(
  devtools(
    (set, get) => ({
      // Initial state - FLAT!
      selectedAssets: [],
      activeAsset: null,
      clipboard: null,
      history: [],
      
      // Canvas Tools
      activeTool: 'select',
      isDragging: false,
      isResizing: false,
      isRotating: false,
      isGrouping: false,
      isPanning: false,
      
      // Edit Mode
      mode: 'design',
      
      // View Settings
      currentView: 'dashboard',
      zoom: 100,
      grid: true,
      snap: true,
      rulers: false,
      
      // Panels
      panels: {},
      
      // Library View
      libraryFilter: 'all',
      librarySortBy: 'name',
      libraryView: 'grid',
      librarySearch: '',
      
      // Assets
      assets: [],
      
      // Preset System
      activePresets: {},
      globalPresets: {},
      availablePresets: [],
      presetInheritance: {},
      
      // ACTIONS
      // Selection actions
      selectAsset: (id) => set((state) => ({
        selectedAssets: [id],
        activeAsset: id
      }), false, 'selectAsset'),
      
      selectMultiple: (ids) => set({
        selectedAssets: ids,
        activeAsset: ids[ids.length - 1] || null
      }, false, 'selectMultiple'),
      
      clearSelection: () => set({
        selectedAssets: [],
        activeAsset: null
      }, false, 'clearSelection'),
      
      // Clipboard actions
      copy: () => {
        const state = get();
        const toCopy = state.assets.filter(a => state.selectedAssets.includes(a.id));
        set({ clipboard: toCopy }, false, 'copy');
      },
      
      paste: () => {
        const state = get();
        if (!state.clipboard) return;
        // Implementation would create new assets from clipboard
        console.log('Paste not fully implemented');
      },
      
      cut: () => {
        get().copy();
        const state = get();
        state.selectedAssets.forEach(id => get().deleteAsset(id));
      },
      
      undo: () => {
        console.log('Undo not implemented');
      },
      
      redo: () => {
        console.log('Redo not implemented');
      },
      
      // Tool actions
      setTool: (tool) => set({ activeTool: tool }, false, 'setTool'),
      setMode: (mode) => set({ mode }, false, 'setMode'),
      
      // View actions
      setView: (view) => set({ currentView: view }, false, 'setView'),
      setZoom: (zoom) => set({ zoom }, false, 'setZoom'),
      toggleGrid: () => set((state) => ({ grid: !state.grid }), false, 'toggleGrid'),
      toggleSnap: () => set((state) => ({ snap: !state.snap }), false, 'toggleSnap'),
      toggleRulers: () => set((state) => ({ rulers: !state.rulers }), false, 'toggleRulers'),
      togglePanel: (panelId) => set((state) => ({
        panels: { ...state.panels, [panelId]: !state.panels[panelId] }
      }), false, 'togglePanel'),
      
      // Library actions
      setLibraryFilter: (filter) => set({ libraryFilter: filter }, false, 'setLibraryFilter'),
      setLibrarySort: (sort) => set({ librarySortBy: sort }, false, 'setLibrarySort'),
      setLibraryView: (view) => set({ libraryView: view }, false, 'setLibraryView'),
      searchLibrary: (query) => set({ librarySearch: query }, false, 'searchLibrary'),
      
      // Asset actions
      addAsset: (asset) => set((state) => ({
        assets: [...state.assets, asset]
      }), false, 'addAsset'),
      
      updateAsset: (id, updates) => set((state) => ({
        assets: state.assets.map(asset =>
          asset.id === id ? { ...asset, ...updates } : asset
        )
      }), false, 'updateAsset'),
      
      deleteAsset: (id) => set((state) => ({
        assets: state.assets.filter(asset => asset.id !== id),
        selectedAssets: state.selectedAssets.filter(sid => sid !== id),
        activeAsset: state.activeAsset === id ? null : state.activeAsset
      }), false, 'deleteAsset'),
      
      duplicateAsset: (id) => {
        const state = get();
        const original = state.assets.find(a => a.id === id);
        if (!original) return '';
        
        const newAsset: Asset = {
          ...original,
          id: `${original.id}-copy-${Date.now()}`,
          name: `${original.name} Copy`,
          created: new Date(),
          modified: new Date()
        };
        
        get().addAsset(newAsset);
        return newAsset.id;
      },
      
      groupAssets: (ids) => {
        // Implementation needed
        console.log('Group not implemented');
        return '';
      },
      
      ungroupAsset: (groupId) => {
        // Implementation needed
        console.log('Ungroup not implemented');
        return [];
      },
      
      moveToLibrary: (id) => {
        get().updateAsset(id, { location: 'library' });
      },
      
      importAsset: async (file) => {
        // Implementation needed
        console.log('Import not implemented');
        throw new Error('Not implemented');
      },
      
      exportAsset: async (id) => {
        // Implementation needed
        console.log('Export not implemented');
        throw new Error('Not implemented');
      },
      
      saveProject: async () => {
        // Implementation needed
        console.log('Save not implemented');
      },
      
      loadProject: async (data) => {
        // Implementation needed
        console.log('Load not implemented');
      },
      
      // PRESET SYSTEM ACTIONS
      applyPreset: (assetId, presetId) => set((state) => {
        const currentPresets = state.activePresets[assetId] || [];
        return {
          activePresets: {
            ...state.activePresets,
            [assetId]: [...currentPresets, presetId]
          }
        };
      }, false, 'applyPreset'),
      
      removePreset: (assetId, presetId) => set((state) => {
        const currentPresets = state.activePresets[assetId] || [];
        return {
          activePresets: {
            ...state.activePresets,
            [assetId]: currentPresets.filter(p => p !== presetId)
          }
        };
      }, false, 'removePreset'),
      
      togglePreset: (assetId, presetId) => {
        const state = get();
        const currentPresets = state.activePresets[assetId] || [];
        if (currentPresets.includes(presetId)) {
          get().removePreset(assetId, presetId);
        } else {
          get().applyPreset(assetId, presetId);
        }
      },
      
      setGlobalPreset: (assetType, presetId) => set((state) => ({
        globalPresets: {
          ...state.globalPresets,
          [assetType]: [presetId]
        }
      }), false, 'setGlobalPreset'),
      
      clearPresets: (assetId) => set((state) => ({
        activePresets: {
          ...state.activePresets,
          [assetId]: []
        }
      }), false, 'clearPresets'),
      
      calculateInheritance: (assetId) => {
        // Implementation needed - would calculate based on parent chain
        console.log('Calculate inheritance not implemented');
        return [];
      },
      
      setAvailablePresets: (presets) => set({
        availablePresets: presets
      }, false, 'setAvailablePresets'),
    }),
    {
      name: 'ONE-store', // Name for devtools
    }
  )
);