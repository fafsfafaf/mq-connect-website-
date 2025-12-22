import React from 'react';
import { Check, Users, Zap, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ApplicationQuiz } from '../components/ApplicationQuiz';
import { APP_CONFIG } from '../constants';
import { EtheralShadow } from '../components/ui/EtheralShadow';
import { motion } from 'framer-motion';

export const Careers: React.FC = () => {
  const scrollToQuiz = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [showBenefits, setShowBenefits] = React.useState(false);

  const benefits = [
    "Überdurchschnittliche Verdienstmöglichkeiten (Provision)",
    "Umfassende Einarbeitung & Sales-Skripte",
    "Schnelle Aufstiegschancen zum Teamleiter",
    "Cooles, junges Team & regelmäßige Events",
    "Persönlichkeitsentwicklung & Mindset-Coaching",
    "Pünktliche Auszahlung & transparente Abrechnung"
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section with Ethereal Background */}
      {/* Changed overflow-hidden to overflow-visible to allow z-index layering if needed, 
          but wrapped backgrounds in overflow-hidden container. 
          Increased pb-24 to pb-32 on mobile. */}
      <section className="relative bg-white text-slate-900 pt-12 pb-32 md:pt-20 md:pb-32 overflow-visible">

        {/* Background Container - Keeps effects contained */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <EtheralShadow
            color="#BAE6FD"
            animation={{ scale: 50, speed: 10 }}
            noise={{ opacity: 0.1, scale: 0.5 }}
            sizing="stretch"
          />
          {/* Light Gradient Overlay */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-50/30 blur-[100px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-30">

          {/* Increased bottom margin to mb-16 to prevent overlap on mobile */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              // REFACTOR: Replaced backdrop-blur-sm with solid semi-transparent bg for Safari
              className="inline-block py-1.5 px-4 rounded-full bg-blue-50/90 border border-blue-100 text-blue-600 font-bold tracking-widest uppercase text-xs mb-8 shadow-sm"
            >
              Karriere bei {APP_CONFIG.COMPANY_NAME}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              // Increased margin-bottom from mb-8 to mb-12 to fix overlap on mobile
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 mb-12 leading-tight drop-shadow-sm"
            >
              Mehr als nur ein Job <br />
              <span className="text-[#004e82]">Deine Chance auf Wachstum</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium"
            >
              Kein Anschreiben, kein Lebenslauf. Checke jetzt in 60 Sekunden, ob du das Zeug zum Top-Verkäufer hast.
            </motion.p>
          </div>

          {/* Quiz Component - High Z-Index to stay on top */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center relative z-40"
          >
            <div className="w-full max-w-xl">
              <ApplicationQuiz />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Requirements Grid */}
      {/* Added z-20 to ensure it sits below the quiz if overlapping occurs */}
      <div className="py-24 bg-slate-50 border-t border-slate-200 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Switched to strict grid-cols-1 on mobile to ensure no overlapping */}
          {/* Increased gap-y-24 (6rem) to prevent overlap between the top card and the bottom headline on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-24 gap-x-12 lg:gap-16">

            {/* Who we search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <Users className="w-6 h-6 text-slate-700" /> Wen wir suchen
              </h2>
              <Card className="h-full bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <ul className="space-y-4">
                  {[
                    "Du bist zwischen 17 und 30 Jahre alt (ideal)",
                    "Du sprichst fließend Deutsch",
                    "Du wohnst im Umkreis von 50km um Moers",
                    "Du hast Bock auf Leistung und willst Geld verdienen",
                    "Quereinsteiger? Sehr gerne! Handwerker, Gastro, Sportler passen oft perfekt.",
                    "Führerschein ist optimal, aber kein Muss"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="mt-1 bg-green-100 rounded-full p-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* What you get - "Was wir bieten" */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <Award className="w-6 h-6 text-slate-700" /> Was wir bieten
              </h2>
              <Card className="h-full bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <ul className="space-y-4">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="mt-1 bg-blue-100 rounded-full p-1 flex-shrink-0">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">So läuft deine Bewerbung ab</h2>
            <p className="text-slate-500">Kein Lebenslauf, kein Anschreiben. Nur du und deine Motivation.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Bewerbungsformular ausfüllen", desc: "Beantworte 9 kurze Fragen zu dir." },
              { step: "02", title: "Kontaktaufnahme", desc: "Wir melden uns innerhalb von 24h per WhatsApp/Anruf." },
              { step: "03", title: "Kennenlernen", desc: "Kurzes Telefonat, um zu checken, ob die Chemie stimmt." },
              { step: "04", title: "Probetag", desc: "Komm vorbei, lerne das Team kennen und zeig was du kannst." }
            ].map((s, i) => (
              <div key={i} className="relative group p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <span className="text-6xl font-black text-slate-100 absolute -top-4 right-4 z-0 group-hover:text-blue-100 transition-colors duration-300 select-none">{s.step}</span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button onClick={scrollToQuiz} size="lg" className="px-12 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg">
              Jetzt oben bewerben
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button
          className="rounded-full shadow-2xl px-6 py-6 text-sm font-bold bg-[#004e82] hover:bg-[#003b61] tracking-wide"
          onClick={() => setShowBenefits(true)}
        >
          <Zap className="w-5 h-5 mr-2" /> Infos einsehen
        </Button>
      </div>

      {/* Mobile Benefits Drawer/Modal */}
      {showBenefits && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowBenefits(false)}
          ></div>

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 sm:p-8 relative z-10 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Deine Vorteile</h3>
              <button
                onClick={() => setShowBenefits(false)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <span className="sr-only">Schließen</span>
                <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="space-y-4 mb-8">
              {benefits.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-blue-100 rounded-full p-1.5 flex-shrink-0">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setShowBenefits(false);
                scrollToQuiz();
              }}
            >
              Jetzt bewerben 🚀
            </Button>
          </motion.div>
        </div>
      )}

    </div>
  );
};