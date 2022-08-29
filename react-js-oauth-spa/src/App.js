import { DataTable } from './components/DataTable';
import { Header } from './components/Header';
import { useOAuth, TokenContext } from './hooks/useOAuth';

function App() {

  const [accessToken, idToken] = useOAuth(
    "https://esc-adfs.sb-cloud.ru/adfs/oauth2/authorize",
    "6b59f990-dbfe-4ce5-b560-aa7bf87a7a80",
    "id_token+token",
    "openid profile access_api",
    "fragment",
    "ABCDEFHIJK",
    "https://demo-static-site-api.obs-website.ru-moscow-1.hc.sbercloud.ru",
    "http://localhost:4000"
  );

  return (
    <TokenContext.Provider value={[accessToken, idToken]}>
      <Header />
      <main>
        <div className='container'>
          <DataTable />
        </div>
      </main>
    </TokenContext.Provider>
  );
}

export default App;
