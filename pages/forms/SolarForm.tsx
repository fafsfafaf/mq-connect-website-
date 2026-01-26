
import React from 'react';
import { Sun } from 'lucide-react';
import { ContractFormLayout } from '../../components/forms/ContractFormLayout';

export const SolarForm: React.FC = () => {
    return (
        <ContractFormLayout
            title="Photovoltaik Anfrage"
            subtitle="Machen Sie Ihr Dach zum Kraftwerk und sparen Sie Energiekosten."
            icon={<Sun className="w-8 h-8 text-[#004e82]" />}
        >
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Dachfläche (ca. in m²)</label>
                        <input required type="number" name="roofArea" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all" placeholder="z.B. 40" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Dachausrichtung</label>
                        <div className="relative">
                            <select required name="roofOrientation" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] outline-none transition-all appearance-none">
                                <option value="" disabled selected>Bitte wählen</option>
                                <option value="Sued">Süd</option>
                                <option value="Sued-West">Süd-West</option>
                                <option value="Sued-Ost">Süd-Ost</option>
                                <option value="West">West</option>
                                <option value="Ost">Ost</option>
                            </select>
                            {/* Custom Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <input type="checkbox" name="wantsBatteryStorage" id="battery" className="w-5 h-5 text-[#004e82] rounded border-gray-300 focus:ring-[#004e82]" />
                    <label htmlFor="battery" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                        Interesse an einem Stromspeicher?
                    </label>
                </div>
            </div>
        </ContractFormLayout>
    );
};
