'use client';

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

type TemperatureUnit = 'C' | 'F';

interface TemperatureUnitContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  convertTemp: (tempC: number) => number;
}

const TemperatureUnitContext = createContext<TemperatureUnitContextType | undefined>(undefined);

export function TemperatureUnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  const toggleUnit = useCallback(() => {
    setUnit(current => current === 'C' ? 'F' : 'C');
  }, []);

  const convertTemp = useCallback((tempC: number): number => {
    return unit === 'C' ? tempC : Math.round((tempC * 9/5) + 32);
  }, [unit]);

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit, convertTemp }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);
  if (context === undefined) {
    throw new Error('useTemperatureUnit must be used within a TemperatureUnitProvider');
  }
  return context;
}
