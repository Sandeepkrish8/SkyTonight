import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_LOCATION } from '../lib/constants';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
