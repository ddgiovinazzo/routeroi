import { useState, useEffect } from 'react';

export interface CalculatorState {
  gasPrice: number;
  mpg: number;
  maintenanceCpm: number; // e.g., 0.10 for wear/tear
  targetHourlyWage: number;
  averageMph: number; // Estimated local traffic speed to convert time to miles
}

export const DEFAULT_STATE: CalculatorState = {
  gasPrice: 3.50,
  mpg: 20,
  maintenanceCpm: 0.15, // standard maintenance & wear cpm default
  targetHourlyWage: 20,
  averageMph: 15,
};

const LOCAL_STORAGE_KEY = 'routeroi_state_v2';

export const useCalculatorState = () => {
  const [state, setState] = useState<CalculatorState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all keys exist in parsed object to prevent broken state from older versions
        const merged = { ...DEFAULT_STATE, ...parsed };
        return merged;
      }
    } catch (e) {
      console.error('Failed to load calculator state from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save calculator state to localStorage', e);
    }
  }, [state]);

  const updateField = (field: keyof CalculatorState, value: number) => {
    setState((prev) => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value,
    }));
  };

  const resetState = () => {
    setState(DEFAULT_STATE);
  };

  return {
    state,
    updateField,
    resetState,
  };
};
