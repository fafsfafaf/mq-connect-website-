import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BarChart3, Users, Globe, Building2, Send, ShieldCheck, Mail, Phone, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EtheralShadow } from '../components/ui/EtheralShadow';
import { Interactive3DCard } from '../components/ui/Interactive3DCard'; // Import new card
import { APP_CONFIG } from '../constants';

export const BusinessPartner: React.FC = () => {
  const [formState, setFormState] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
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
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section - Light Theme with Etheral Background */}
      <section className="relative bg-white text-slate-900 overflow-hidden pt-12 pb-32 md:pt-24 md:pb-48">
        
        {/* Etheral Shadow Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <EtheralShadow
             color="#BAE6FD" // Pastel Blue
             animation={{ scale: 50, speed: 10 }}
             noise={{ opacity: 0.1, scale: 0.5 }}
             sizing="stretch"
           />
        </div>
        
        {/* Additional Light Gradient for depth */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-50/30 blur-[100px] z-0 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Changed Layout: Grid for Desktop to place 3D Card on the right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* REFACTOR: Replaced backdrop-blur-sm with bg-blue-50/90 */}
              <div className="inline-flex items-center gap-2 bg-blue-50/90 px-4 py-2 rounded-full border border-blue-100 mb-10 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#004e82] animate-pulse"></span>
                <span className="text-sm font-bold tracking-wide text-[#004e82] uppercase">Open for High-Ticket Partnerships</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900 drop-shadow-sm">
                Wir skalieren Ihren <br />
                <span className="text-[#004e82]">Vertriebserfolg.</span>
              </h1>
              
              {/* Reduced margin-bottom from mb-10 to mb-2 on mobile for tighter spacing */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-2 md:mb-10 font-medium">
                Sie haben das Produkt, wir haben die Power. {APP_CONFIG.COMPANY_NAME} ist Ihr Premium-Partner für High-Performance D2D-Sales. Skalierbar, transparent, compliance-konform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => document.getElementById('b2b-contact')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg" 
                  variant="primary"
                  // Mobile optimization: !px-4 (reduced padding), !py-2.5 (slimmer), !text-xs (small text), !tracking-normal (tight letters)
                  className="shadow-xl shadow-blue-900/10 w-full sm:w-auto !px-4 !py-2.5 !text-xs !tracking-normal sm:!text-base sm:!px-10 sm:!py-4 whitespace-nowrap"
                >
                  Jetzt Potenzial analysieren
                </Button>
              </div>
            </motion.div>

            {/* Right Column: 3D Interactive Card (Hidden on Mobile) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
               transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
               className="hidden lg:block h-[500px] w-full relative perspective-1000"
            >
               <Interactive3DCard />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Stats / Features */}
      <section className="py-20 -mt-20 relative z-20">
         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-3 gap-6">
             {[
               { icon: <Users className="w-8 h-8 text-blue-400" />, title: "Skalierbare Teams", desc: "Von 5 auf 50 Vertriebspartner in Rekordzeit. Wir bauen Teams, die liefern." },
               { icon: <BarChart3 className="w-8 h-8 text-green-400" />, title: "Maximale Conversion", desc: "Durch datengestützte Gebietsplanung und psychologisch optimierte Sales-Skripte." },
               { icon: <ShieldCheck className="w-8 h-8 text-purple-400" />, title: "100% Compliance", desc: "Qualitätssicherung steht an erster Stelle. Kein Hard-Selling, sondern Beratung." }
             ].map((feature, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
               >
                 {/* REFACTOR: Replaced backdrop-blur-sm with bg-white/95 */}
                 <Card className="bg-white/95 border-slate-100 shadow-xl hover:shadow-2xl h-full flex flex-col justify-between">
                   <div>
                     <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                       {feature.icon}
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                     <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                   </div>
                 </Card>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Split Section: Value Prop & Contact Form */}
      <section id="b2b-contact" className="py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Persuasive Text */}
            <div className="pt-8">
              <span className="text-[#004e82] font-bold tracking-widest uppercase text-sm mb-4 block">Exklusiv für Produktgeber</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Warum {APP_CONFIG.COMPANY_NAME}?</h2>
              <div className="space-y-8">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Der Markt ist voll von Agenturen, die das Blaue vom Himmel versprechen. Wir liefern Ergebnisse. Unsere Infrastruktur in Moers ist darauf ausgelegt, große Volumen zu bewältigen, ohne die Qualität zu verwässern.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Eigene Recruiting-Pipeline für stetiges Wachstum",
                    "Interne Academy für konstante Schulung der Partner",
                    "Digitales Reporting & Real-Time KPI Tracking",
                    "Spezialisierung auf Glasfaser, Energie & Telekommunikation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#004e82]/5 border-l-4 border-[#004e82] p-6 rounded-r-xl">
                  <p className="text-sm font-medium text-[#004e82] italic">
                    "Wir suchen keine kurzfristigen Projekte. Wir suchen strategische Partnerschaften mit dem Ziel der Marktführerschaft."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Premium Form */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#004e82] via-blue-400 to-[#004e82]"></div>

              {isSubmitted ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                   <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                     <CheckCircle2 className="w-12 h-12 text-green-500" />
                   </div>
                   <h3 className="text-3xl font-bold text-slate-900 mb-4">Anfrage erhalten.</h3>
                   <p className="text-slate-600 max-w-sm mx-auto mb-8">
                     Vielen Dank für Ihr Interesse an einer Partnerschaft. Unsere Geschäftsführung wird Ihre Daten prüfen und sich innerhalb von 48 Stunden persönlich bei Ihnen melden.
                   </p>
                   <Button onClick={() => setIsSubmitted(false)} variant="outline" className="text-slate-400 hover:text-slate-900 border-slate-200">
                     Zurück zum Formular
                   </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Projektanfrage starten</h3>
                  <p className="text-slate-500 mb-8 text-sm">Lassen Sie uns darüber sprechen, wie wir Ihre Verkaufszahlen steigern können.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Firma</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                          <input 
                            required name="company" type="text" placeholder="Firmenname GmbH"
                            className="w-full pl-10 p-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Branche</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                          <select 
                             name="industry" 
                             className="w-full pl-10 p-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium appearance-none"
                             onChange={handleChange}
                             required
                          >
                            <option value="" disabled selected>Bitte wählen</option>
                            <option value="energy">Energie (Strom/Gas)</option>
                            <option value="telco">Telekommunikation / Glasfaser</option>
                            <option value="solar">Solar / PV</option>
                            <option value="finance">Finanzen / Versicherungen</option>
                            <option value="other">Sonstiges</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">Ansprechpartner</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <input 
                          required name="contactPerson" type="text" placeholder="Max Mustermann (Geschäftsführung)"
                          className="w-full pl-10 p-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">E-Mail</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                          <input 
                            required name="email" type="email" placeholder="max@firma.de"
                            className="w-full pl-10 p-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Telefon</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                          <input 
                            required name="phone" type="tel" placeholder="+49 123 45678"
                            className="w-full pl-10 p-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">Nachricht (Optional)</label>
                      <textarea 
                        name="message" rows={3} placeholder="Kurze Beschreibung Ihres Projekts..."
                        className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium resize-none"
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <Button 
                      type="submit" 
                      fullWidth 
                      size="lg" 
                      isLoading={isLoading}
                      className="mt-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      <Send className="w-5 h-5 mr-2" /> Kostenloses Strategiegespräch anfordern
                    </Button>
                  </form>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};