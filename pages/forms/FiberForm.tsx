
import React from 'react';
import { Wifi } from 'lucide-react';
import { ContractFormLayout } from '../../components/forms/ContractFormLayout';

export const FiberForm: React.FC = () => {
    return (
        <ContractFormLayout
            title="Glasfaser Verfügbarkeit"
            subtitle="Highspeed-Internet für Ihr Zuhause. Jetzt Verfügbarkeit prüfen."
            icon={<Wifi className="w-8 h-8 text-[#004e82]" />}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Aktueller Internetanbieter</label>
                    <input required name="currentProvider" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all" placeholder="z.B. Telekom, Vodafone..." />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Gewünschte Bandbreite</label>
                    <div className="relative">
                        <select required name="bandWidth" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all appearance-none">
                            <option value="" disabled selected>Bitte wählen</option>
                            <option value="100">100 Mbit/s</option>
                            <option value="250">250 Mbit/s</option>
                            <option value="500">500 Mbit/s</option>
                            <option value="1000">1.000 Mbit/s (1 Gbit/s)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </ContractFormLayout>
    );
};
