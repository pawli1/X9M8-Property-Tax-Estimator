import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, ShieldCheck, Lightbulb } from 'lucide-react';
import { fetchTaxInsights } from '../services/geminiService';
import { GeminiInsightResponse } from '../types';

interface AiInsightsProps {
  county: string;
  homeValue: number;
}

const AiInsights: React.FC<AiInsightsProps> = ({ county, homeValue }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<GeminiInsightResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTaxInsights(county, homeValue);
      setInsights(data);
    } catch (err) {
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!insights && !loading && !error) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Unlock X9M8 AI Insights
          </h3>
          <p className="text-emerald-800/80 max-w-lg">
            Get a personalized breakdown of specific exemptions, village taxes, and actionable tips to lower your tax bill for {county} using our Gemini-powered engine.
          </p>
        </div>
        <button
          onClick={handleGenerateInsights}
          className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 group"
        >
          Generate Analysis
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-100 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-slate-800">Analyzing Tax Data...</h3>
        <p className="text-slate-500">Querying Gemini for local exemptions and market context.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-emerald-600 p-4 px-6 flex justify-between items-center">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Analysis for {county}
        </h3>
        <button onClick={handleGenerateInsights} className="text-emerald-100 hover:text-white text-sm font-medium">
            Refresh
        </button>
      </div>
      
      <div className="p-6 md:p-8 space-y-8">
        {/* Main Analysis */}
        <div>
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Market Context</h4>
          <p className="text-slate-700 leading-relaxed text-lg">
            {insights?.analysis}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exemptions */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="text-blue-900 font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    Likely Exemptions
                </h4>
                <ul className="space-y-2">
                    {insights?.exemptions.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-blue-800">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                            {ex}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <h4 className="text-amber-900 font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    Actionable Tips
                </h4>
                <ul className="space-y-2">
                    {insights?.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-amber-800">
                             <span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
