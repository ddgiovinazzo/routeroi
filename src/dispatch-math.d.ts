declare module '@ddgiovinazzo/dispatch-math' {
  export interface EvaluateTripParams {
    expectedRevenue: number;
    totalMiles: number;
    estimatedMinutes: number;
    vehicleCostPerMile: number;
  }

  export interface EvaluateTripResult {
    trueVehicleCost: number;
    netProfit: number;
    hourlyRate: number;
  }

  export function evaluateTrip(params: EvaluateTripParams): EvaluateTripResult;
}
