import {useContext,useState } from 'react';
import CurrencyContex from './CurrencyContex';

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState('AED');
  return (
    <CurrencyContex.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContex.Provider>
  );
}

export function useCurrency() {
  const currencyData = useContext(CurrencyContex);
  return currencyData;
}
