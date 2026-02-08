import React, { ReactNode } from 'react';
import { Building2, Calculator, Info } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">X9M8 Property Tax Estimator</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <Calculator className="w-4 h-4" /> Calculator
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} X9M8 Property Tax Estimator. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This is an estimator tool. Official tax bills are determined by local assessors.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;