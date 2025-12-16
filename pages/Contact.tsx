import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { APP_CONFIG } from '../constants';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-12 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Kontaktieren Sie uns 👋</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Sie haben Fragen zu unseren Dienstleistungen oder möchten Partner werden? 
          Wir freuen uns auf Ihre Nachricht.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Contact Info Side */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Hier finden Sie uns 📍</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Unsere Zentrale befindet sich im Herzen von Moers. Vereinbaren Sie gerne einen Termin für ein persönliches Gespräch.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="flex items-start gap-4 p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-xl text-[#004e82]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Adresse</h3>
                <p className="text-slate-600">{APP_CONFIG.ADDRESS}</p>
                <p className="text-slate-600">{APP_CONFIG.LOCATION}</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4 p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-xl text-[#004e82]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Telefon</h3>
                <p className="text-slate-600 mb-1">Wir sind für Sie erreichbar:</p>
                <a href={`tel:${APP_CONFIG.STAFF_PHONE_NUMBER.replace(/\s/g, '').replace('/', '')}`} className="text-[#004e82] font-bold hover:underline">
                  {APP_CONFIG.STAFF_PHONE_NUMBER}
                </a>
                <p className="text-xs text-slate-400 mt-1">{APP_CONFIG.OPENING_HOURS}</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4 p-6 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-xl text-[#004e82]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">E-Mail</h3>
                <p className="text-slate-600 mb-1">Schreiben Sie uns jederzeit:</p>
                <a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className="text-[#004e82] font-bold hover:underline">
                  {APP_CONFIG.CONTACT_EMAIL}
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Nachricht gesendet! 🚀</h3>
              <p className="text-slate-600 mb-8">
                Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.
              </p>
              <Button onClick={() => { setIsSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}>
                Neue Nachricht schreiben ✍️
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Schreiben Sie uns ✍️</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Name 👤</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#004e82] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Ihr Name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">E-Mail Adresse 📧</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#004e82] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                    placeholder="ihre@email.de"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Worum geht's? 💭</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#004e82] focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer bg-none"
                    value={formState.subject}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Bitte wählen...</option>
                    <option value="general">Allgemeine Anfrage</option>
                    <option value="partnership">Partnerschaft / Kooperation</option>
                    <option value="application">Frage zur Bewerbung</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Ihre Nachricht 📝</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#004e82] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-slate-400"
                    placeholder="Wie können wir Ihnen helfen?"
                    value={formState.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  isLoading={isLoading}
                  className="flex items-center gap-2 justify-center shadow-lg hover:shadow-xl rounded-full"
                >
                  <Send className="w-4 h-4" /> Nachricht absenden
                </Button>
                
                <p className="text-xs text-slate-400 text-center mt-4">
                  Mit dem Absenden erklären Sie sich mit unserer Datenschutzerklärung einverstanden. 🔒
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};