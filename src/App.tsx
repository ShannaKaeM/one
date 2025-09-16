import { useONEstore } from './stores/ONEstore';
import './App.css';

function App() {
  // Get state and actions from ONEstore
  const { 
    projects, 
    workspace,
    toggleGrid,
    toggleSnap,
    setView
  } = useONEstore();

  return (
    <div className="app-container">
      {/* Simple test UI to verify store connection */}
      <div className="test-panel">
        <h1>{projects.projectName}</h1>
        
        <div className="info">
          <p>Current View: {workspace.currentView}</p>
          <p>Grid: {workspace.gridVisible ? 'ON' : 'OFF'}</p>
          <p>Snap: {workspace.snapEnabled ? 'ON' : 'OFF'}</p>
        </div>

        <div className="controls">
          <button onClick={toggleGrid}>
            Toggle Grid
          </button>
          <button onClick={toggleSnap}>
            Toggle Snap
          </button>
          <button onClick={() => setView('canvas')}>
            Canvas View
          </button>
          <button onClick={() => setView('dashboard')}>
            Dashboard View
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;