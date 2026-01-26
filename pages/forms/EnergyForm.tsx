
import React from 'react';
import { Zap } from 'lucide-react';
import { ContractFormLayout } from '../../components/forms/ContractFormLayout';

export const EnergyForm: React.FC = () => {
    return (
        <ContractFormLayout
            title="Stromtarif wechseln"
            subtitle="Kosten senken mit unseren exklusiven Stromtarifen für Privat & Gewerbe."
            icon={<Zap className="w-8 h-8 text-[#004e82]" />}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Aktueller Stromanbieter</label>
                    <input required name="currentProvider" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all" placeholder="z.B. E.ON..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Jahresverbrauch (kWh)</label>
                        <input required type="number" name="consumptionKwh" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all" placeholder="z.B. 3500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Zählernummer</label>
                        <input required name="meterNumber" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all" placeholder="Schauen Sie auf Ihren Zähler" />
                    </div>
                </div>
            </div>
        </ContractFormLayout>
    );
};
