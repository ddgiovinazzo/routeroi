/**
 * Calculate Fuel Cost Per Mile (CPM)
 * Formula: Gas Price / MPG
 */
export const calculateFuelCPM = (gasPrice: number, mpg: number): number => {
  if (mpg <= 0) return 0;
  return gasPrice / mpg;
};

/**
 * Calculate Total Cost Per Mile (CPM)
 * Formula: Fuel CPM + Maintenance CPM + Replacement CPM
 */
export const calculateTotalCPM = (
  fuelCPM: number,
  maintCPM: number,
  replCPM: number
): number => {
  return fuelCPM + maintCPM + replCPM;
};

/**
 * Calculate Hourly Fixed Expenses
 * Formula: (Insurance + Phone) / Hours
 */
export const calculateHourlyFixed = (
  insurance: number,
  phone: number,
  hours: number
): number => {
  if (hours <= 0) return 0;
  return (insurance + phone) / hours;
};

/**
 * Calculate Target Multiplier (required rate per mile to hit target hourly net wage)
 * Formula: ((TargetWage + HourlyFixed) / AvgMph) + TotalCPM
 */
export const calculateTargetMultiplier = (
  targetWage: number,
  hourlyFixed: number,
  avgMph: number,
  totalCPM: number
): number => {
  if (avgMph <= 0) return totalCPM; // If stationary, required rate is CPM, or wait, division by zero check
  return ((targetWage + hourlyFixed) / avgMph) + totalCPM;
};
