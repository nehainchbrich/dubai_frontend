import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import API_URLS from '@/config/apiconfig';
import { fetchData } from '@/config/fetchApi';

const SiteSettingContext = createContext();

const CACHE_KEY = 'siteSettings';
const CACHE_TIME_KEY = 'siteSettingsTime';
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export const SiteSettingProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState({});

  // Fetch from API and update cache/state
  const fetchAndUpdateSettings = useCallback(async () => {
    try {
      const response = await fetchData(API_URLS.SITES, {
        status: 1,
        columns: 'title,value',
      });

      const result = {};
      response?.data?.forEach((item) => {
        result[item.title] = item.value;
      });

      // Cache in localStorage
      localStorage.setItem(CACHE_KEY, JSON.stringify(result));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

      setSiteSettings(result);
    } catch (err) {
      console.error('Failed to load site settings', err);
    }
  }, []);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    const isFresh =
      cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL;

    if (cached) {
      setSiteSettings(JSON.parse(cached)); // ⏱ Fast load
    }

    if (!isFresh) {
      fetchAndUpdateSettings(); // 🔄 Fetch if expired or not cached
    }
  }, [fetchAndUpdateSettings]);

  return (
    <SiteSettingContext.Provider value={{ siteSettings, refreshSiteSettings: fetchAndUpdateSettings }}>
      {children}
    </SiteSettingContext.Provider>
  );
};

// Hook
export const useSites = () => {
  const context = useContext(SiteSettingContext);
  if (!context) {
    throw new Error('useSites must be used within a SiteSettingProvider');
  }
  return context;
};
