import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types
interface Element {
  id: string;
  type: 'one' | 'text' | 'image' | 'group';
  content?: any;
  style: {
    gridArea?: string;
    [key: string]: any;
  };
  children?: string[]; // IDs of child elements
  parent?: string; // ID of parent element
}

interface ONEStoreState {
  // Designer Actor - User Actions
  designer: {
    selectedElement: string | null;
    currentTool: 'select' | 'move' | 'text' | 'image' | 'one';
  };

  // Workspace Actor - UI State
  workspace: {
    currentView: string; // 'dashboard', 'canvas', 'library-canvas', etc.
    gridVisible: boolean;
    snapEnabled: boolean;
  };

  // Projects Actor - Data
  projects: {
    elements: Element[];
    projectName: string;
  };

  // Actions
  selectElement: (elementId: string | null) => void;
  setTool: (tool: ONEStoreState['designer']['currentTool']) => void;
  setView: (view: string) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  deleteElement: (id: string) => void;
  setProjectName: (name: string) => void;
}

// Create the store
export const useONEstore = create<ONEStoreState>()(
  devtools(
    (set, get) => ({
      // Initial state
      designer: {
        selectedElement: null,
        currentTool: 'select',
      },
      
      workspace: {
        currentView: 'dashboard',
        gridVisible: true,
        snapEnabled: true,
      },
      
      projects: {
        elements: [],
        projectName: 'Untitled Project',
      },

      // Designer actions
      selectElement: (elementId) => set((state) => ({
        designer: { ...state.designer, selectedElement: elementId }
      }), false, 'selectElement'),

      setTool: (tool) => set((state) => ({
        designer: { ...state.designer, currentTool: tool }
      }), false, 'setTool'),

      // Workspace actions
      setView: (view) => set((state) => ({
        workspace: { ...state.workspace, currentView: view }
      }), false, 'setView'),

      toggleGrid: () => set((state) => ({
        workspace: { ...state.workspace, gridVisible: !state.workspace.gridVisible }
      }), false, 'toggleGrid'),

      toggleSnap: () => set((state) => ({
        workspace: { ...state.workspace, snapEnabled: !state.workspace.snapEnabled }
      }), false, 'toggleSnap'),

      // Projects actions
      addElement: (element) => set((state) => ({
        projects: {
          ...state.projects,
          elements: [...state.projects.elements, element]
        }
      }), false, 'addElement'),

      updateElement: (id, updates) => set((state) => ({
        projects: {
          ...state.projects,
          elements: state.projects.elements.map(el =>
            el.id === id ? { ...el, ...updates } : el
          )
        }
      }), false, 'updateElement'),

      deleteElement: (id) => set((state) => ({
        projects: {
          ...state.projects,
          elements: state.projects.elements.filter(el => el.id !== id)
        }
      }), false, 'deleteElement'),

      setProjectName: (name) => set((state) => ({
        projects: { ...state.projects, projectName: name }
      }), false, 'setProjectName'),
    }),
    {
      name: 'ONE-store', // Name for devtools
    }
  )
);