import React from 'react';
import { LogoCloud } from '../ui/LogoCloud';
import { PARTNER_LOGOS } from '../../data/home';

export const PartnerLogosSection: React.FC = () => {
  return (
    <section className="bg-white py-12 border-b border-slate-100 overflow-hidden relative z-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 mb-8">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
          Unsere Starken Partner
        </p>
      </div>
      <div className="w-full">
        <LogoCloud logos={PARTNER_LOGOS} />
      </div>
    </section>
  );
};