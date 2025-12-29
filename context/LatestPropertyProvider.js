import {useContext} from 'react';
import Propertycontex from './PropertyContex';
export function LatestPropertyProvider({ children, latestProperty }) {
    return (
      <Propertycontex.Provider value={latestProperty}>
        {children}
      </Propertycontex.Provider>
    );
  }
  export function useLatestProperty() {
    const latestProperty = useContext(Propertycontex);
    return latestProperty;
  }