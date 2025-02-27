import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalId, setGlobalId] = useState(null);
  
  return (
    <GlobalContext.Provider value={{ globalId, setGlobalId }}>
      {children}
    </GlobalContext.Provider>
  );
};
