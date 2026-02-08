import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import AiInsights from './components/AiInsights';
import { NY_COUNTIES, BREAKDOWN_PRESETS } from './constants';
import { CalculationResult } from './types';

const App: React.FC = () => {
  // Default to Nassau County or first in list
  const [selectedCountyName, setSelectedCountyName] = useState<string>('Nassau County');
  const [homeValue, setHomeValue] = useState<number>(650000);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Memoize the selected county object
  const selectedCounty = useMemo(() => 
    NY_COUNTIES.find(c => c.name === selectedCountyName) || NY_COUNTIES[0], 
  [selectedCountyName]);

  // Calculation Logic
  useEffect(() => {
    if (!selectedCounty || homeValue < 0) return;

    const rate = selectedCounty.effectiveRate / 100;
    const totalTax = homeValue * rate;
    const monthlyTax = totalTax / 12;

    const breakdownPreset = BREAKDOWN_PRESETS[selectedCounty.name] || BREAKDOWN_PRESETS['default'];
    
    const breakdown = {
      school: Math.round(totalTax * breakdownPreset.school),
      municipal: Math.round(totalTax * breakdownPreset.municipal),
      specialDistricts: Math.round(totalTax * breakdownPreset.special),
    };

    setResult({
      estimatedTax: Math.round(totalTax),
      monthlyTax: Math.round(monthlyTax),
      breakdown,
      effectiveRateUsed: selectedCounty.effectiveRate
    });
  }, [selectedCounty, homeValue]);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Accurate Property Tax Estimates for <span className="text-emerald-600">New York</span>
          </h1>
          <p className="text-lg text-slate-600">
            Calculate your property tax liability instantly for Long Island, NYC, and upstate regions using the X9M8 algorithm.
          </p>
        </div>

        {/* Input & Calculator */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-5">
             <InputSection
                homeValue={homeValue}
                setHomeValue={setHomeValue}
                selectedCounty={selectedCountyName}
                setSelectedCounty={setSelectedCountyName}
                onCalculate={() => {}} // Calculation is reactive via useEffect
             />
             
             {/* County Info Card */}
             <div className="mt-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">About {selectedCounty.name}</h4>
                <p className="text-slate-600 text-sm">{selectedCounty.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                    <span className="text-slate-500">Avg. Effective Rate</span>
                    <span className="font-mono font-medium text-slate-900">{selectedCounty.effectiveRate.toFixed(2)}%</span>
                </div>
             </div>
          </div>

          <div className="xl:col-span-7 space-y-8">
            {result && (
              <>
                <ResultsSection result={result} countyName={selectedCounty.name} />
                <AiInsights county={selectedCounty.name} homeValue={homeValue} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
