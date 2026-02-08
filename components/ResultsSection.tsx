import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResult } from '../types';
import { TrendingUp, Wallet, Landmark } from 'lucide-react';

interface ResultsSectionProps {
  result: CalculationResult;
  countyName: string;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b']; // Emerald, Blue, Amber

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, countyName }) => {
  const data = [
    { name: 'School Tax', value: result.breakdown.school },
    { name: 'Municipal/Town', value: result.breakdown.municipal },
    { name: 'Special Districts', value: result.breakdown.specialDistricts },
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Numbers Card */}
      <div className="lg:col-span-2 bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

        <div>
          <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider mb-1">
            Annual Estimated Tax
          </h3>
          <div className="text-4xl md:text-6xl font-bold text-white mb-2">
            {formatCurrency(result.estimatedTax)}
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 inline-flex px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4" />
            {result.effectiveRateUsed.toFixed(2)}% Effective Rate
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Wallet className="w-3 h-3" /> Monthly Cost
            </div>
            <div className="text-xl font-semibold">{formatCurrency(result.monthlyTax)}</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Landmark className="w-3 h-3" /> Location
            </div>
            <div className="text-xl font-semibold truncate">{countyName}</div>
          </div>
        </div>
      </div>

      {/* Breakdown Chart Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center">
        <h3 className="text-slate-700 font-semibold mb-4 w-full text-left">Tax Distribution</h3>
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full space-y-2 mt-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-slate-600">{item.name}</span>
              </div>
              <span className="font-medium text-slate-900">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
