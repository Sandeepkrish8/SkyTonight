import React, { createContext, useContext, useState, useEffect } from 'react';

const NightModeContext = createContext();

export function NightModeProvider({ children }) {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    // Check local storage for preference
    const saved = localStorage.getItem('skytonight_nightmode');
    if (saved === 'true') setIsNightMode(true);
  }, []);

  const toggleNightMode = () => {
    setIsNightMode(prev => {
      const next = !prev;
      localStorage.setItem('skytonight_nightmode', String(next));
      return next;
    });
  };

  return (
    <NightModeContext.Provider value={{ isNightMode, toggleNightMode }}>
      <div className={isNightMode ? 'night-vision-overlay' : ''}>
        {children}
        {isNightMode && (
          <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-multiply bg-red-600/50" />
        )}
      </div>
    </NightModeContext.Provider>
  );
}

export const useNightMode = () => useContext(NightModeContext);
