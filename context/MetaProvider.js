import React, { createContext, useContext } from 'react';

const MetaContext = createContext(null);

export const MetaProvider = ({ meta, children }) => {
  return (
    <MetaContext.Provider value={meta}>
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => useContext(MetaContext);
