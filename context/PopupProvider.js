import {useContext} from 'react';
import PopupContex from './PopupContex';

export function PopupProvider({ children, popupData }) {
  return (
    <PopupContex.Provider value={popupData}>
      {children}
    </PopupContex.Provider>
  );
}

export function usePopup() {
  const PopupData = useContext(PopupContex);
  return PopupData;
}
