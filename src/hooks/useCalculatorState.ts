import { useState, useEffect } from 'react';

export interface CalculatorState {
  mpg: number;
  gasPrice: number;
  maintCpm: number;
  replCpm: number;
  insurance: number;
  phone: number;
  hours: number;
  targetWage: number;
  avgMph: number;
  taxRate: number;
}

export const DEFAULT_STATE: CalculatorState = {
  mpg: 20,
  gasPrice: 3.50,
  maintCpm: 0.10,
  replCpm: 0.07,
  insurance: 30,
  phone: 20,
  hours: 50,
  targetWage: 20,
  avgMph: 12,
  taxRate: 30,
};

const LOCAL_STORAGE_KEY = 'routeroi_state_v1';

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
