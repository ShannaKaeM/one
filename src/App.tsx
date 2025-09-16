import { useEffect, useState } from 'react';
import { ONEconnect } from './SYSTEMS/one-connect';
import { useONEstore } from './stores/ONEstore';
import { themeProcessor } from './SYSTEMS/theme-processor';
import { presetManager } from './SYSTEMS/preset-manager';

function App() {
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [uiTheme, setUiTheme] = useState<any>(null);

  // Component map - empty for now, ONEconnect will create divs!
  const components = {
    // Real components go here when needed
    // For now, everything is just divs with data-component attributes
  };

  // Store hooks map
  const stores = {
    oneStore: useONEstore
  };

  useEffect(() => {
    // Load UI theme
    themeProcessor.applyTheme('ui').then(success => {
      if (success) {
        const theme = themeProcessor.getTheme('ui');
        setUiTheme(theme);
        setThemeLoaded(true);
        
        // Initialize preset manager with theme
        presetManager.updateAllAssets();
        
        // Set available presets in store
        const allPresets = Object.values(theme.presets || {})
          .flatMap(category => Object.keys(category));
        useONEstore.getState().setAvailablePresets(allPresets);
      }
    });
  }, []);

  if (!themeLoaded || !uiTheme) {
    return <div className="loading">Loading theme...</div>;
  }

  // Use ONEconnect with the theme structure
  return (
    <div className="ui">
      <ONEconnect 
        theme={uiTheme}
        stores={stores}
        components={components}
      />
    </div>
  );
}

export default App;