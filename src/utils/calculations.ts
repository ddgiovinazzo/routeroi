import type { CalculatorState } from '../hooks/useCalculatorState';

export const calculateTripMetrics = (state: CalculatorState) => {
  // 1. Calculate physical vehicle cost to move one mile
  const gasCostPerMile = state.mpg > 0 ? state.gasPrice / state.mpg : 0;
  const totalVehicleCpm = gasCostPerMile + state.maintenanceCpm;

  // 2. Convert Target Hourly Wage into a Target Profit Per Mile
  // If you want $20/hr and drive 20mph, you need $1 of profit per mile.
  const targetProfitCpm = state.averageMph > 0 ? state.targetHourlyWage / state.averageMph : 0;

  // 3. The absolute minimum the app should tell the user to accept
  const minimumPayoutPerMile = totalVehicleCpm + targetProfitCpm;

  return {
    gasCostPerMile,
    totalVehicleCpm,
    targetProfitCpm,
    minimumPayoutPerMile
  };
};
