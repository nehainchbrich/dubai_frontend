import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.sass';
import NextTopLoader from 'nextjs-toploader';
import { SiteSettingProvider } from '@/context/SiteProvider';
import { AuthProvider } from '@/helper/Auth';
import { CurrencyProvider } from '@/context/CurrencyProvider';
import MapProvider from '@/context/MapProvider';

const App = ({ Component, pageProps }) => {
const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
    <NextTopLoader 
      color="#2299DD"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
    />
    <AuthProvider>
    <SiteSettingProvider>
      <CurrencyProvider>
        <MapProvider>
          {getLayout (<Component  {...pageProps}/> )}
        </MapProvider>
      </CurrencyProvider>
    </SiteSettingProvider>
    </AuthProvider>
    </>
  );
};
export default App;
