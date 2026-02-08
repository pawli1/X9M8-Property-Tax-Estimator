import React from 'react';
import { MapPin, DollarSign, Search } from 'lucide-react';
import { NY_COUNTIES } from '../constants';

interface InputSectionProps {
  homeValue: number;
  setHomeValue: (val: number) => void;
  selectedCounty: string;
  setSelectedCounty: (val: string) => void;
  onCalculate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  homeValue,
  setHomeValue,
  selectedCounty,
  setSelectedCounty,
  onCalculate,
}) => {
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters (except decimal points if we wanted to support them, but int is usually fine)
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = Number(rawValue);
    
    if (!isNaN(numericValue)) {
      setHomeValue(numericValue);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Search className="w-6 h-6 text-emerald-600" />
        Property Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Location Select */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Location (County/Region)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow bg-white appearance-none"
            >
              {NY_COUNTIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-slate-500">
            Select the county where the property is located to load effective tax rates.
          </p>
        </div>

        {/* Home Value Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Estimated Market Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={homeValue ? homeValue.toLocaleString() : ''}
              onChange={handleValueChange}
              className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow bg-white text-black"
              placeholder="e.g. 550,000"
            />
          </div>
           <div className="flex justify-between text-xs text-slate-500 px-1">
              <span>Enter full market value</span>
              <span>Min: $10k</span>
           </div>
        </div>
      </div>
      
      {/* Disclaimer / Info */}
      <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-sm text-emerald-800">
        <span className="font-semibold">Note:</span> This calculator uses effective tax rates for estimation. Actual taxes may vary based on specific school districts, villages, and exemptions (STAR).
      </div>
    </div>
  );
};

export default InputSection;