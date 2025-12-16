import React from 'react';

export const Partners: React.FC = () => {
  return (
    <div className="pt-12 pb-24 text-center max-w-[1440px] mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Unsere Partner</h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16">
        Wir arbeiten exklusiv mit den renommiertesten Anbietern Deutschlands zusammen.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-12 border border-slate-200 rounded-3xl flex items-center justify-center h-64 hover:border-slate-900 transition-colors">
          <span className="text-4xl font-bold text-slate-400">E.ON</span>
        </div>
        <div className="p-12 border border-slate-200 rounded-3xl flex items-center justify-center h-64 border-dashed">
           <span className="text-slate-400">Weitere Partner in Anbahnung</span>
        </div>
      </div>
    </div>
  );
};