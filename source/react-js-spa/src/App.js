import React, { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable';
import { Header } from './components/Header';

export const SettingsContext = React.createContext();

function App() {
  const [settings, setSettings] = useState({
    "api_url": ""
  });

  useEffect(() => {
    fetch("/settings.json").then(data => data.json()).then(json => {
      setSettings(json);
    });
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <Header />
      <main>
        <div className='container'>
          <DataTable />
        </div>
      </main>
    </SettingsContext.Provider>
  );
}

export default App;
