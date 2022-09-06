import { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable';
import { Header } from './components/Header';
import { useOAuth, TokenContext, SettingsContext } from './hooks/useOAuth';

function App() {
  const [settings, setSettings] = useState({
    "api_url": "",
    "oauth_endpoint": "", 
    "client_id": "", 
    "response_type": "", 
    "scope": "", 
    "nonce": "", 
    "redirect_url": ""
  });

  useEffect(() => {
    fetch("/settings.json").then(data => data.json()).then(json => {
      setSettings(json);
    });
  }, []);

  const [accessToken, idToken] = useOAuth(
    settings.oauth_endpoint,
    settings.client_id,
    settings.response_type,
    settings.scope,
    settings.nonce,
    settings.redirect_url
  );

  return (
    <TokenContext.Provider value={[accessToken, idToken]}>
      <SettingsContext.Provider value={settings}>
        <Header />
        <main>
          <div className='container'>
            <DataTable />
          </div>
        </main>
      </SettingsContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
