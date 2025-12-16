import React from 'react';
import { Card } from '../components/ui/Card';
import { CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="pt-12 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Unsere Leistungen</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Wir sind spezialisiert auf den direkten Kundenkontakt. Unser Fokus liegt auf erklärungsbedürftigen Produkten, die echten Mehrwert bieten.
        </p>
      </div>

      <div className="space-y-24">
        {/* Glasfaser */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="text-brand-600 font-bold tracking-widest text-sm uppercase mb-2 block">Core Business</span>
            <h2 className="text-3xl font-bold mb-6">Glasfaser Direktvertrieb</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Der Glasfaserausbau in Deutschland ist das Infrastrukturprojekt des Jahrzehnts. Wir beraten Haushalte vor Ort über den Anschluss an das Netz der Zukunft.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3"><CheckCircle2 className="text-green-500 w-5 h-5"/> <span>Exklusiv für Marktführer wie E.ON</span></li>
              <li className="flex gap-3"><CheckCircle2 className="text-green-500 w-5 h-5"/> <span>Vorvermarktung & Bauphasenbegleitung</span></li>
              <li className="flex gap-3"><CheckCircle2 className="text-green-500 w-5 h-5"/> <span>Hohe Akzeptanz durch echten Mehrwert</span></li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <Card className="bg-blue-50 border-none aspect-video flex items-center justify-center">
              <span className="text-blue-200 font-bold text-4xl">FIBER</span>
            </Card>
          </div>
        </div>

        {/* Energy */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <Card className="bg-yellow-50 border-none aspect-video flex items-center justify-center">
              <span className="text-yellow-200 font-bold text-4xl">ENERGY</span>
            </Card>
          </div>
          <div>
            <span className="text-yellow-600 font-bold tracking-widest text-sm uppercase mb-2 block">Upsell & Cross-Sell</span>
            <h2 className="text-3xl font-bold mb-6">Strom & Gas</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Energiekosten optimieren ist Vertrauenssache. Wir überprüfen bestehende Tarife und bieten günstigere, grüne Alternativen an.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3"><CheckCircle2 className="text-slate-900 w-5 h-5"/> <span>Einsparpotential für Kunden</span></li>
              <li className="flex gap-3"><CheckCircle2 className="text-slate-900 w-5 h-5"/> <span>Perfektes Cross-Selling Produkt</span></li>
            </ul>
          </div>
        </div>

        {/* PV */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
            <span className="text-green-600 font-bold tracking-widest text-sm uppercase mb-2 block">Special Unit</span>
            <h2 className="text-3xl font-bold mb-6">PV Lead Generation</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Photovoltaik ist ein Wachstumsmarkt. Unser spezialisiertes Team qualifiziert Hauseigentümer vor und generiert hochwertige Leads für Solarteure.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3"><CheckCircle2 className="text-green-600 w-5 h-5"/> <span>Hochqualifizierte Datensätze</span></li>
              <li className="flex gap-3"><CheckCircle2 className="text-green-600 w-5 h-5"/> <span>Fokus auf Eigenheimbesitzer</span></li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <Card className="bg-green-50 border-none aspect-video flex items-center justify-center">
              <span className="text-green-200 font-bold text-4xl">SOLAR</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};