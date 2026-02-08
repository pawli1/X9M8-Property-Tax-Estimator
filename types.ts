export interface CountyData {
  name: string;
  effectiveRate: number; // Percentage
  medianHomeValue: number;
  description: string;
}

export interface TaxBreakdown {
  school: number;
  municipal: number;
  specialDistricts: number; // Library, fire, etc.
}

export interface CalculationResult {
  estimatedTax: number;
  breakdown: TaxBreakdown;
  monthlyTax: number;
  effectiveRateUsed: number;
}

export interface GeminiInsightResponse {
  analysis: string;
  tips: string[];
  exemptions: string[];
}
