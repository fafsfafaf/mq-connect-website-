import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Bereit für den nächsten Schritt?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Egal ob du Karriere machen willst oder einen starken Vertriebspartner suchst. Wir sind bereit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/karriere">
                <Button variant="primary" size="lg">Karriere starten</Button>
              </Link>
              <Link to="/fuer-produktgeber">
                <Button variant="secondary" size="lg">Partner werden</Button>
              </Link>
          </div>
      </div>
    </section>
  );
};