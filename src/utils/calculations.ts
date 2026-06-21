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

export const calculateTargetMultiplier = (
  targetWage: number,
  hourlyFixed: number,
  avgMph: number,
  totalCPM: number,
  taxRate: number
): number => {
  if (avgMph <= 0) return totalCPM;
  const taxFactor = 1 - (taxRate / 100);
  const safeTaxFactor = taxFactor <= 0 ? 0.01 : taxFactor; // Prevent division by zero or negative factors
  const grossTargetWage = targetWage / safeTaxFactor;
  return ((grossTargetWage + hourlyFixed) / avgMph) + totalCPM;
};
