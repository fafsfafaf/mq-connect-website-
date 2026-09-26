import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cookie, X, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

// Types
type CookieCategory = 'necessary' | 'marketing' | 'media';

interface ConsentState {
  necessary: boolean;
  marketing: boolean;
  media: boolean;
}

const STORAGE_KEY = 'cookie-consent';

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // For "Mehr erfahren"
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true, // Always true
    marketing: false,
    media: false,
  });

  // Check storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay for better UX on load
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved state (optional, if we want to sync state for other logic)
      try {
        setConsent(JSON.parse(stored));
      } catch (e) {
        // invalid json, ignore
      }
    }
  }, []);

  // Listen for footer link click
  useEffect(() => {
    const handleOpenSettings = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setConsent(JSON.parse(stored));
      }
      setIsOpen(true);
      setIsExpanded(true); // Open in detailed mode when requested manually
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const saveConsent = (finalConsent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalConsent));
    setConsent(finalConsent);
    setIsOpen(false);
    
    // Here you would typically trigger your scripts
    // e.g. if (finalConsent.marketing) enableGoogleAnalytics();
    if (!finalConsent.marketing && !finalConsent.media) {
       // Logic to reload page or remove cookies if user revokes could go here
       // window.location.reload(); 
    }
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, marketing: true, media: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, marketing: false, media: false });
  };

  const handleSaveSelection = () => {
    saveConsent(consent);
  };

  const toggleCategory = (category: CookieCategory) => {
    if (category === 'necessary') return; // Cannot toggle
    setConsent((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        // REFACTOR: Removed backdrop-blur-sm, used solid bg-slate-900/40
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 pb-2">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#004e82]/10 p-2 rounded-lg">
                     <Cookie className="w-6 h-6 text-[#004e82]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Einwilligung zur Datenverarbeitung</h2>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-2">
                <p>
                  Wir verwenden Cookies und ähnliche Technologien, um die grundlegenden Funktionen dieser Website sicherzustellen sowie – sofern du zustimmst – um Inhalte, Marketing und Medienangebote zu optimieren. Du kannst selbst entscheiden, welche Kategorien du zulassen möchtest. Weitere Informationen findest du unter „Mehr erfahren“.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                <Link to="/impressum" onClick={() => setIsOpen(false)} className="hover:text-[#004e82] underline decoration-slate-300 underline-offset-2">Impressum</Link>
                <Link to="/datenschutz" onClick={() => setIsOpen(false)} className="hover:text-[#004e82] underline decoration-slate-300 underline-offset-2">Datenschutz</Link>
                <Link to="/cookie-richtlinien" onClick={() => setIsOpen(false)} className="hover:text-[#004e82] underline decoration-slate-300 underline-offset-2">Cookie-Richtlinien</Link>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
              
              {/* Expandable "Mehr erfahren" Section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-6 space-y-6 text-sm text-slate-600 border-t border-slate-100 mt-4">
                      
                      {/* General Info */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-slate-900">Details zur Einwilligung</h3>
                        <p>
                          Mit der Schaltfläche „Alle Cookies akzeptieren“ willigst du freiwillig in die Nutzung aller nicht-notwendigen Cookies ein.
                          Mit „Alle ablehnen“ werden ausschließlich technisch notwendige Cookies verwendet.
                        </p>
                        <p>
                          Du kannst außerdem individuelle Cookie-Einstellungen vornehmen, indem du einzelne Kategorien aktivierst und diese mit „Auswahl speichern“ bestätigst.
                        </p>
                        <p>
                          Deine Einwilligung ist freiwillig und kann jederzeit mit Wirkung für die Zukunft widerrufen oder angepasst werden.
                          Das Consent-Management kannst du jederzeit erneut über den entsprechenden Link am unteren Ende der Website aufrufen.
                        </p>
                      </div>

                      {/* Data Transfer Warning */}
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-900/80 text-xs leading-relaxed">
                        <strong className="block mb-1 text-amber-900 font-bold flex items-center gap-2">
                           <ShieldCheck className="w-3 h-3"/> Datenübermittlung in Drittländer
                        </strong>
                        Je nach deiner Auswahl kann es vorkommen, dass Daten an Dienstleister innerhalb der Europäischen Union oder – sofern ausdrücklich zugestimmt – an Dienstleister in Drittländern (z. B. USA) übermittelt werden.
                        Für Datenübermittlungen in Drittländer bestehen möglicherweise geringere Datenschutzstandards. In diesen Fällen erfolgt die Übermittlung nur auf Grundlage deiner ausdrücklichen Einwilligung gemäß Art. 49 Abs. 1 lit. a DSGVO oder geeigneter Garantien (z. B. EU-Standardvertragsklauseln).
                        Welche Dienste betroffen sind, kannst du den jeweiligen Cookie-Kategorien im Consent-Management entnehmen.
                      </div>

                      {/* Categories Accordion */}
                      <div className="space-y-4">
                        <CookieCategoryRow 
                          title="Notwendige Cookies"
                          description="Diese Cookies sind erforderlich, damit die Website ordnungsgemäß funktioniert und grundlegende Funktionen bereitgestellt werden können. Sie können nicht deaktiviert werden. Sie werden beispielsweise gesetzt, um deine Datenschutzeinstellungen zu speichern, Anmeldevorgänge zu ermöglichen oder Formulare korrekt auszuliefern."
                          isEnabled={consent.necessary}
                          isLocked={true}
                          onToggle={() => {}}
                        />
                        <CookieCategoryRow 
                          title="Cookies für Marketing"
                          description="Diese Cookies ermöglichen es dem Betreiber dieser Website, Besucher wiederzuerkennen und Marketing- sowie Vertriebsmaßnahmen zu personalisieren. Abhängig von deiner Auswahl können Informationen an Marketing- und Werbepartner weitergegeben werden, um relevante Inhalte und Anzeigen bereitzustellen."
                          isEnabled={consent.marketing}
                          isLocked={false}
                          onToggle={() => toggleCategory('marketing')}
                        />
                        <CookieCategoryRow 
                          title="Cookies für Medien"
                          description="Diese Cookies ermöglichen die Einbindung von Inhalten externer Plattformen, wie Video- oder Social-Media-Anbietern. Wenn Medien-Cookies akzeptiert werden, können entsprechende Inhalte ohne erneute Zustimmung angezeigt werden. Andernfalls bleiben diese Inhalte blockiert."
                          isEnabled={consent.media}
                          isLocked={false}
                          onToggle={() => toggleCategory('media')}
                        />
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Expand Button */}
              {!isExpanded && (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="mt-2 text-[#004e82] text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  Mehr erfahren <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button 
                variant="primary" 
                onClick={handleAcceptAll}
                className="flex-1 text-xs sm:text-sm py-3"
              >
                Alle Cookies akzeptieren
              </Button>
              {isExpanded && (
                <Button 
                  variant="secondary" 
                  onClick={handleSaveSelection}
                  className="flex-1 text-xs sm:text-sm py-3 border-slate-300 text-slate-700 bg-white"
                >
                  Auswahl speichern
                </Button>
              )}
              <Button 
                variant="secondary" 
                onClick={handleRejectAll}
                className="flex-1 text-xs sm:text-sm py-3 bg-white border-slate-200 text-slate-600 hover:text-slate-900"
              >
                Alle ablehnen
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Sub-component for a Category Row
const CookieCategoryRow: React.FC<{
  title: string;
  description: string;
  isEnabled: boolean;
  isLocked: boolean;
  onToggle: () => void;
}> = ({ title, description, isEnabled, isLocked, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-slate-50/50 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
         <div className="flex items-center gap-3 select-none">
            {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
            <span className="font-bold text-slate-800">{title}</span>
         </div>
         <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
            {/* Custom Toggle Switch */}
            <button
              onClick={() => !isLocked && onToggle()}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#004e82] focus:ring-offset-2",
                isEnabled ? "bg-[#004e82]" : "bg-slate-300",
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isEnabled ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
         </div>
      </div>
      
      {/* Description Accordion Body */}
      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial={{ height: 0 }}
             animate={{ height: 'auto' }}
             exit={{ height: 0 }}
             className="overflow-hidden"
           >
             <div className="p-4 pt-0 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                <div className="pt-3">
                   {description}
                </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};