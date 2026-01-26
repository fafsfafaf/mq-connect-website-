
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check, FileText, Loader2, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EtheralShadow } from '../ui/EtheralShadow';

interface ContractFormLayoutProps {
    title: string;
    subtitle: string;
    webhookUrl?: string; // Optional, defaults to placeholder if not provided
    children?: React.ReactNode; // For specific fields
    icon?: React.ReactNode;
}

export const ContractFormLayout: React.FC<ContractFormLayoutProps> = ({
    title,
    subtitle,
    webhookUrl = 'https://n8n.srv824470.hstgr.cloud/webhook/testing', // Default placeholder
    children,
    icon
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Standard Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // File Upload Handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
            } else {
                alert('Bitte nur PDF-Dateien hochladen.');
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === 'application/pdf') {
                setFile(droppedFile);
            } else {
                alert('Bitte nur PDF-Dateien hochladen.');
            }
        }
    };

    // Helper to convert file to Base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Gather specific fields from children (if they are input elements inside the form)
            // Note: In React, children inputs need to be managed by parent or we gather them via form constraints. 
            // For simplicity here, we assume children are managed inputs or standard HTML inputs that bubble up changes if needed,
            // but optimally specific forms should pass their data state up or we use FormData object.

            // Better approach: Use FormData to capture all inputs, including children
            const formElement = e.target as HTMLFormElement;
            const submissionData = new FormData(formElement);
            const payload: Record<string, any> = {};

            submissionData.forEach((value, key) => {
                // Exclude file from standard payload loop to handle it specifically if needed
                if (key !== 'contractFile') {
                    payload[key] = value;
                }
            });

            // Handle File
            if (file) {
                // Sending as Base64 JSON usually works best with generic webhooks like n8n unless multipart is strictly required
                payload['contractFileBase64'] = await fileToBase64(file);
                payload['contractFileName'] = file.name;
            }

            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Submission failed', error);
            alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex items-center justify-center px-4">
                <Card className="max-w-md w-full p-8 text-center shadow-xl animate-in zoom-in-95 duration-300 bg-white">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Vielen Dank!</h2>
                    <p className="text-slate-600 mb-8">
                        Wir haben deine Daten erhalten und werden uns schnellstmöglich bei dir melden.
                    </p>
                    <Button fullWidth onClick={() => window.location.href = '/'}>
                        Zurück zur Startseite
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <EtheralShadow color="#BAE6FD" animation={{ scale: 30, speed: 15 }} />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-24 sm:px-6">

                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-3 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm mb-6 border border-slate-100"
                    >
                        {icon || <FileText className="w-8 h-8 text-[#004e82]" />}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* 1. Kundendaten */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                                    Kundendaten
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Vorname *</label>
                                        <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="Max" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Nachname *</label>
                                        <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="Mustermann" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Straße *</label>
                                        <input required name="street" value={formData.street} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="Musterstraße" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Nr. *</label>
                                        <input required name="houseNumber" value={formData.houseNumber} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="12" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">PLZ *</label>
                                        <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="12345" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Ort *</label>
                                        <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="Musterstadt" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">E-Mail *</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="max@beispiel.de" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Telefon *</label>
                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#004e82] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all" placeholder="0176 123456" />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Vertragsspezifische Daten */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                                    Vertragsdetails
                                </h3>
                                {/* Injected specific fields */}
                                {children}
                            </div>

                            {/* 3. Datei Upload */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
                                    Dokumente
                                </h3>

                                <div
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group
                        ${file ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
                    `}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                    />

                                    {file ? (
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                                <FileText className="w-8 h-8 text-green-600" />
                                            </div>
                                            <p className="font-bold text-slate-900 break-all">{file.name}</p>
                                            <p className="text-sm text-green-600 mt-1">Datei bereit zum Senden</p>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                Datei entfernen
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="w-8 h-8 text-[#004e82]" />
                                            </div>
                                            <p className="font-bold text-slate-900 mb-1">Datei hier ablegen oder klicken</p>
                                            <p className="text-sm text-slate-500">Nur PDF-Dateien erlaubt (z.B. Vertrag)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    fullWidth
                                    isLoading={isSubmitting}
                                    className="shadow-xl hover:shadow-2xl py-6 text-lg"
                                >
                                    {isSubmitting ? 'Wird übertragen...' : 'Daten jetzt absenden 🚀'}
                                </Button>
                                <p className="text-center text-xs text-slate-400 mt-4">
                                    Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung zu.
                                </p>
                            </div>

                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
