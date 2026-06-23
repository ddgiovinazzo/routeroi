import { useState, useEffect } from 'react';

export interface VehicleProfile {
  gasPrice: number;
  mpg: number;
  maintenanceCpm: number; // e.g., 0.10 for wear/tear
  targetHourlyWage: number;
}

export interface ActiveOffer {
  expectedRevenue: number;
  screenMiles: number;
  estimatedMinutes: number;
  isDeadhead: boolean;
}

export interface CalculatorState extends VehicleProfile, ActiveOffer {}

export const DEFAULT_VEHICLE_PROFILE: VehicleProfile = {
  gasPrice: 3.50,
  mpg: 20,
  maintenanceCpm: 0.15, // standard maintenance & wear cpm default
  targetHourlyWage: 20,
};

export const DEFAULT_ACTIVE_OFFER: ActiveOffer = {
  expectedRevenue: 0,
  screenMiles: 0,
  estimatedMinutes: 0,
  isDeadhead: false,
};

export const DEFAULT_STATE: CalculatorState = {
  ...DEFAULT_VEHICLE_PROFILE,
  ...DEFAULT_ACTIVE_OFFER,
};

const LOCAL_STORAGE_KEY = 'routeroi_state_v2';

export const useCalculatorState = () => {
  const [vehicleProfile, setVehicleProfile] = useState<VehicleProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all keys exist in parsed object to prevent broken state from older versions
        return {
          gasPrice: typeof parsed.gasPrice === 'number' ? parsed.gasPrice : DEFAULT_VEHICLE_PROFILE.gasPrice,
          mpg: typeof parsed.mpg === 'number' ? parsed.mpg : DEFAULT_VEHICLE_PROFILE.mpg,
          maintenanceCpm: typeof parsed.maintenanceCpm === 'number' ? parsed.maintenanceCpm : DEFAULT_VEHICLE_PROFILE.maintenanceCpm,
          targetHourlyWage: typeof parsed.targetHourlyWage === 'number' ? parsed.targetHourlyWage : DEFAULT_VEHICLE_PROFILE.targetHourlyWage,
        };
      }
    } catch (e) {
      console.error('Failed to load calculator state from localStorage', e);
    }
    return DEFAULT_VEHICLE_PROFILE;
  });

  const [activeOffer, setActiveOffer] = useState<ActiveOffer>(DEFAULT_ACTIVE_OFFER);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vehicleProfile));
    } catch (e) {
      console.error('Failed to save calculator state to localStorage', e);
    }
  }, [vehicleProfile]);

  const state: CalculatorState = {
    ...vehicleProfile,
    ...activeOffer,
  };

  const updateField = (field: keyof CalculatorState, value: number | boolean) => {
    if (field === 'gasPrice' || field === 'mpg' || field === 'maintenanceCpm' || field === 'targetHourlyWage') {
      const numVal = typeof value === 'number' ? value : 0;
      setVehicleProfile((prev) => ({
        ...prev,
        [field]: isNaN(numVal) ? 0 : numVal,
      }));
    } else if (field === 'isDeadhead') {
      setActiveOffer((prev) => ({
        ...prev,
        isDeadhead: !!value,
      }));
    } else {
      const numVal = typeof value === 'number' ? value : 0;
      setActiveOffer((prev) => ({
        ...prev,
        [field]: isNaN(numVal) ? 0 : numVal,
      }));
    }
  };

  const resetState = () => {
    // Only reset active offer fields, leaving vehicle profile intact
    setActiveOffer(DEFAULT_ACTIVE_OFFER);
  };

  return {
    state,
    updateField,
    resetState,
  };
};
