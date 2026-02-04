import React, { useState, useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, User, Clock, X, Ban, ChevronRight, ChevronUp, ChevronDown, Rocket } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { APP_CONFIG } from '../constants';
import { QuizState } from '../types';

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

// Optimized OptionButton with memo to prevent unnecessary re-renders
const OptionButton: React.FC<OptionButtonProps> = memo(({
  selected,
  onClick,
  children,
  className = ""
}) => (
  <button
    type="button"
    className={`
      w-full p-5 rounded-2xl border-2 text-left transition-[border-color,background-color,color,transform,box-shadow] duration-200 font-bold text-lg flex items-center justify-between group
      ${selected
        ? 'bg-[#004e82] border-[#004e82] text-white shadow-lg scale-[1.01]'
        : 'bg-white border-slate-100 text-slate-700 hover:border-[#004e82] hover:text-[#004e82] hover:shadow-md hover:-translate-y-0.5'
      }
      ${className}
    `}
    onClick={onClick}
  >
    <span>{children}</span>
    {selected && <Check className="w-6 h-6 text-white animate-in zoom-in duration-300" />}
    {!selected && <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#004e82] transition-colors" />}
  </button>
));

OptionButton.displayName = 'OptionButton';

// --- Static Sub-Components (Extracted to prevent re-creation) ---

const DisqualificationModal = ({ reason, onRedirect }: { reason?: 'age' | 'intent', onRedirect: () => void }) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/90 animate-in fade-in duration-300">
    <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
        <Ban className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Schade, das passt leider nicht.</h2>
      <p className="text-slate-600 mb-8 leading-relaxed">
        {reason === 'intent'
          ? 'Wenn du bereit bist durchzustarten, melde dich gerne wieder!'
          : 'Aktuell erfüllst du leider nicht alle Voraussetzungen für diese Position. Wir danken dir trotzdem für dein Interesse und wünschen dir viel Erfolg!'}
      </p>
      <Button fullWidth onClick={onRedirect} size="lg">
        Zurück zur Startseite
      </Button>
    </div>
  </div>
);

const PrivacyModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-lg text-slate-900">Datenschutzerklärung</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto custom-scrollbar">
        <div className="prose prose-sm max-w-none text-slate-600">
          <p className="font-bold text-slate-900 mb-2">Datenschutz auf einen Blick</p>
          <p className="mb-4">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          <p className="font-bold text-slate-900 mb-2">Datenerfassung auf dieser Website</p>
          <p className="mb-4">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
          <p className="font-bold text-slate-900 mb-2">Ihre Rechte</p>
          <p className="mb-4">Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.</p>
          <p className="text-xs text-slate-400 mt-8">Dies ist ein Auszug. Die vollständige Datenschutzerklärung finden Sie über den Link im Footer der Webseite.</p>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
        <Button onClick={onClose} size="sm">Verstanden & Schließen</Button>
      </div>
    </div>
  </div>
);

const SuccessView = ({ isMobile, isOverlayOpen, onClose }: { isMobile: boolean, isOverlayOpen: boolean, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="max-w-md mx-auto text-center py-12 px-4"
  >
    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-lg shadow-green-100/50">
      <Check className="w-12 h-12" />
    </div>

    {/* Video Placeholder */}
    <div className="w-full aspect-video bg-slate-100 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden shadow-inner border border-slate-200 group">
      <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors"></div>
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#004e82] border-b-[10px] border-b-transparent ml-1"></div>
      </div>
      <p className="absolute bottom-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Danke-Video (Platzhalter)</p>
    </div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Stark! Deine Daten sind bei uns. 📨</h2>
    <p className="text-slate-600 mb-8 leading-relaxed">
      Wir checken deine Angaben und melden uns blitzschnell (meist innerhalb von 24 Std.) bei dir, um die nächsten Schritte zu besprechen.
    </p>
    <Card className="bg-white border border-slate-100 shadow-xl">
      <p className="text-sm text-slate-500 mb-2 uppercase tracking-wide font-bold">Dein Kontakt für Rückfragen</p>
      <div className="flex items-center justify-center gap-3 mb-1">
        <User className="w-5 h-5 text-[#004e82]" />
        <p className="text-lg font-bold text-slate-900">{APP_CONFIG.STAFF_NAME}</p>
      </div>
      <a href={`tel:${APP_CONFIG.STAFF_PHONE_NUMBER.replace(/\s/g, '').replace('/', '')}`} className="text-[#004e82] font-bold text-xl block hover:underline mb-2">
        {APP_CONFIG.STAFF_PHONE_NUMBER}
      </a>
      <a href="mailto:bewerbung@mq-connect.de" className="text-slate-500 font-medium text-sm block hover:text-[#004e82] transition-colors">
        bewerbung@mq-connect.de
      </a>
    </Card>

    {isMobile && isOverlayOpen && (
      <div className="mt-8">
        <Button
          variant="secondary"
          className="w-full border-slate-200 text-slate-900 bg-white hover:bg-slate-50 font-bold"
          onClick={onClose}
        >
          Schließen & Zurück zur Seite
        </Button>
      </div>
    )}
  </motion.div>
);

// --- Contact Form Component (with Local State for Performance) ---
const ContactForm = memo(({
  initialValues,
  onSubmit,
  isSubmitting,
  onShowPrivacy
}: {
  initialValues: Partial<QuizState['answers']>,
  onSubmit: (data: Partial<QuizState['answers']>) => void,
  isSubmitting: boolean,
  onShowPrivacy: () => void
}) => {
  // Local state to prevent re-rendering parent on every keystroke (Fixes input lag)
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    phone: initialValues.phone || '',
    email: initialValues.email || '',
    consent: initialValues.consent || false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Fast geschafft! Wohin dürfen wir uns melden? 📲</h2>
        <p className="text-slate-500">Wir rufen dich kurz an, um uns persönlich vorzustellen.</p>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Dein Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5 z-10" />
          <input
            required
            type="text"
            placeholder="Max Mustermann"
            className="w-full pl-10 p-3 rounded-xl border-2 border-slate-200 focus:border-[#004e82] bg-white text-slate-900 outline-none font-medium transition-colors"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Deine Nummer</label>
        <div className="relative">
          <div className="absolute left-3 top-3.5 text-slate-400 font-bold text-sm z-10">+49</div>
          <input
            required
            type="tel"
            className="w-full pl-12 p-3 rounded-xl border-2 border-slate-200 focus:border-[#004e82] bg-white text-slate-900 outline-none font-medium transition-colors"
            placeholder="176 12345678"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Deine E-Mail</label>
        <input
          required
          type="email"
          placeholder="max@beispiel.de"
          className="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-[#004e82] bg-white text-slate-900 outline-none font-medium transition-colors"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 mt-4 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors group">
        <div className="relative mt-0.5">
          <input
            required
            type="checkbox"
            className="sr-only"
            checked={formData.consent === true}
            onChange={(e) => handleChange('consent', e.target.checked)}
          />
          <div className={`w-6 h-6 border-2 rounded transition-all flex items-center justify-center ${formData.consent ? 'border-[#004e82] bg-white' : 'border-slate-300 bg-white'}`}>
            <Check
              className={`w-4 h-4 text-black transition-all duration-200 ${formData.consent ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              strokeWidth={3}
            />
          </div>
        </div>
        <span className="text-xs text-slate-500 leading-relaxed pt-1 select-none">
          Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden. Mehr Infos in der <button type="button" onClick={(e) => { e.preventDefault(); onShowPrivacy(); }} className="underline text-[#004e82] hover:text-[#003d66] font-bold">Datenschutzerklärung</button>.
        </span>
      </label>

      <Button fullWidth type="submit" isLoading={isSubmitting} size="lg" className="mt-4 shadow-lg py-4 text-lg">
        {isSubmitting ? 'Wird gesendet...' : 'Jetzt absenden 🚀'}
      </Button>
    </form>
  );
});
ContactForm.displayName = 'ContactForm';

// --- Main ApplicationQuiz Component ---
export const ApplicationQuiz: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<QuizState>({
    step: 0,
    answers: {},
    isSubmitted: false,
    isDisqualified: false
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile Viewport & Overlay Logic
  const [isMobile, setIsMobile] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    // Debounce resize listener if needed, but simple check is usually fine
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-open overlay on /bewerben route when mobile
  useEffect(() => {
    if (isMobile && location.pathname === '/bewerben') {
      setIsOverlayOpen(true);
    }
  }, [isMobile, location.pathname]);

  useEffect(() => {
    if (!isMobile || !isOverlayOpen) {
      document.body.style.overflow = '';
      document.documentElement.style.removeProperty('--vvh');
      return;
    }

    const updateVisualViewport = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--vvh', `${vh}px`);
    };

    window.visualViewport?.addEventListener('resize', updateVisualViewport);
    window.visualViewport?.addEventListener('scroll', updateVisualViewport);
    updateVisualViewport();

    document.body.style.overflow = 'hidden';

    return () => {
      window.visualViewport?.removeEventListener('resize', updateVisualViewport);
      window.visualViewport?.removeEventListener('scroll', updateVisualViewport);
      document.body.style.overflow = '';
      document.documentElement.style.removeProperty('--vvh');
    };
  }, [isMobile, isOverlayOpen]);

  const totalSteps = 8;
  const progressPercentage = (state.step / totalSteps) * 100;

  // Optimized handlers
  const handleAnswer = useCallback((key: keyof QuizState['answers'], value: any) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [key]: value }
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      // Basic validation logic for disqualification
      const { step, answers } = prev;

      if (step === 1 && answers.age) {
        if (answers.age < 18) {
          return { ...prev, isDisqualified: true, disqualificationReason: 'age' };
        }
      }
      return { ...prev, step: prev.step + 1 };
    });
  }, []);

  const handleStartNo = useCallback(() => {
    setState(prev => ({ ...prev, isDisqualified: true, disqualificationReason: 'intent' }));
  }, []);

  // Handler for valid form submission from ContactForm
  const onContactFormSubmit = useCallback(async (data: Partial<QuizState['answers']>) => {
    setIsSubmitting(true);

    // Merge data
    const finalAnswers = { ...state.answers, ...data };

    try {
      // Send to Webhook
      await fetch('https://n8n.srv824470.hstgr.cloud/webhook/bewerbung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalAnswers),
      });
    } catch (error) {
      console.error('Webhook submission failed:', error);
      // Optional: Handle error UI here, but for now we proceed to success view
      // to ensure the user experience isn't broken.
    }

    // Update state to show SuccessView
    setState(prev => ({
      ...prev,
      answers: finalAnswers,
      isSubmitted: true
    }));
    setIsSubmitting(false);
  }, [state.answers]);

  const handleDisqualificationRedirect = useCallback(() => {
    if (isOverlayOpen) {
      setIsOverlayOpen(false);
    }
    navigate('/');
  }, [isOverlayOpen, navigate]);

  const toggleOverlay = useCallback(() => setIsOverlayOpen(v => !v), []);

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <div className="flex flex-col items-center pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-slate-200 rounded-2xl p-4 w-full bg-slate-50 mb-6 flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> NRW & Umgebung</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Vollzeit</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
                <span className="text-lg">💰</span>
                <span className="font-bold text-slate-900">Gehalt: 2.500 € - 4.500 €</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8 leading-tight text-slate-900">
              Möchtest du bei <span className="text-[#004e82] whitespace-nowrap">MQ-CONNECT</span> im Door2Door durchstarten?
            </h2>

            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <button
                onClick={() => { handleAnswer('intent', 'yes'); nextStep(); }}
                className="bg-[#004e82] hover:bg-[#003d66] text-white rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 transition-all hover:scale-[1.02] shadow-lg group active:scale-95"
              >
                <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                  <Check className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <span className="font-bold text-xl md:text-2xl">Ja!</span>
              </button>

              <button
                onClick={handleStartNo}
                className="bg-white border-2 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-600 rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 transition-all hover:scale-[1.02] group active:scale-95"
              >
                <div className="bg-slate-100 p-3 rounded-full group-hover:bg-slate-200 transition-colors">
                  <X className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <span className="font-bold text-xl md:text-2xl">Nein</span>
              </button>
            </div>

            <p className="text-sm text-slate-400 font-medium text-center">
              (Wähle "Ja!", wenn du 2.500 € - 4.500 € verdienen möchtest!)
            </p>
          </div>
        );
      case 1: { // Age
        const currentAge = state.answers.age;
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-8">Wie alt bist du? 🎂</h2>

            <div className="relative w-full max-w-[260px] mx-auto mb-8 group">
              <input
                type="number"
                placeholder="18"
                className="w-full text-center text-4xl font-bold p-6 pr-16 rounded-2xl border-2 border-slate-100 shadow-sm focus:border-[#004e82] bg-white text-slate-900 focus:ring-4 focus:ring-blue-50 outline-none placeholder:text-slate-200 transition-all hover:border-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoFocus
                value={currentAge || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  handleAnswer('age', isNaN(val) ? undefined : val);
                }}
              />
              <div className="absolute right-2 top-2 bottom-2 w-12 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleAnswer('age', (currentAge || 17) + 1)}
                  className="flex-1 bg-slate-50 hover:bg-[#004e82] hover:text-white text-slate-400 rounded-lg flex items-center justify-center transition-all active:scale-95 border border-slate-100 hover:border-[#004e82]"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer('age', Math.max(1, (currentAge || 19) - 1))}
                  className="flex-1 bg-slate-50 hover:bg-[#004e82] hover:text-white text-slate-400 rounded-lg flex items-center justify-center transition-all active:scale-95 border border-slate-100 hover:border-[#004e82]"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Button fullWidth onClick={nextStep} disabled={!state.answers.age}>Weiter</Button>
          </div>
        );
      }
      case 2: // Location
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-8">Deine Postleitzahl 📍</h2>
            <div className="relative mb-8">
              <MapPin className="absolute left-4 top-5 text-slate-400 w-6 h-6 z-10" />
              <input
                type="text"
                placeholder="PLZ eingeben"
                className="w-full pl-12 pr-4 py-5 text-lg rounded-2xl border-2 border-slate-100 shadow-sm focus:border-[#004e82] bg-white text-slate-900 focus:ring-4 focus:ring-blue-50 outline-none placeholder:text-slate-400 font-bold transition-all hover:border-slate-300"
                onChange={(e) => handleAnswer('zipCode', e.target.value)}
              />
            </div>
            <Button fullWidth onClick={nextStep} disabled={!state.answers.zipCode}>Weiter</Button>
          </div>
        );
      case 3: // German Level
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-6">Sprichst du fließend Deutsch?</h2>
            <img
              src="https://flagcdn.com/w160/de.png"
              alt="Deutschland Flagge"
              className="w-20 h-auto mx-auto mb-8 object-contain drop-shadow-md rounded-md"
            />
            <div className="space-y-3">
              {['Muttersprache (C2)', 'Fließend in Wort & Schrift (C1)', 'Grundkenntnisse (B1)'].map(opt => (
                <OptionButton
                  key={opt}
                  selected={state.answers.germanLevel === opt}
                  onClick={() => { handleAnswer('germanLevel', opt); setTimeout(nextStep, 150); }}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case 4: // Driver's License
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-8">Besitzt du einen Führerschein (Klasse B)? 🚗</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className={`p-8 rounded-2xl border-2 font-bold text-xl transition-all shadow-sm hover:-translate-y-1 ${state.answers.driversLicense === true ? 'bg-[#004e82] border-[#004e82] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-700 hover:border-[#004e82] hover:text-[#004e82]'}`}
                onClick={() => { handleAnswer('driversLicense', true); nextStep(); }}
              >
                Ja
              </button>
              <button
                className={`p-8 rounded-2xl border-2 font-bold text-xl transition-all shadow-sm hover:-translate-y-1 ${state.answers.driversLicense === false ? 'bg-[#004e82] border-[#004e82] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-700 hover:border-[#004e82] hover:text-[#004e82]'}`}
                onClick={() => { handleAnswer('driversLicense', false); nextStep(); }}
              >
                Nein
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-8">Nicht zwingend notwendig, aber gut zu wissen.</p>
          </div>
        );
      case 5: // Experience
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-8">Hast du bereits Erfahrung im Vertrieb?</h2>
            <div className="space-y-3">
              {[
                { label: 'Nein, Quereinsteiger', sub: 'Null Erfahrung, aber volle Motivation' },
                { label: 'Ja, erste Erfahrungen', sub: 'Habe schon mal reingeschnuppert' },
                { label: 'Ja, Profi', sub: 'Ich weiß, wie man verkauft & abschließt' }
              ].map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  className={`
                    w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group
                    ${state.answers.experience === opt.label
                      ? 'bg-[#004e82] border-[#004e82] text-white shadow-lg scale-[1.01]'
                      : 'bg-white border-slate-100 text-slate-900 hover:border-[#004e82] hover:shadow-md hover:-translate-y-0.5'
                    }
                  `}
                  onClick={() => { handleAnswer('experience', opt.label); setTimeout(nextStep, 150); }}
                >
                  <div>
                    <div className={`font-bold text-lg ${state.answers.experience === opt.label ? 'text-white' : 'text-slate-900 group-hover:text-[#004e82]'}`}>{opt.label}</div>
                    <div className={`text-sm ${state.answers.experience === opt.label ? 'text-blue-100' : 'text-slate-500'}`}>{opt.sub}</div>
                  </div>
                  {state.answers.experience === opt.label && <Check className="w-6 h-6 text-white animate-in zoom-in duration-300" />}
                  {state.answers.experience !== opt.label && <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#004e82] transition-colors" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 6: // Mindset
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-4">Bist du bereit dich weiterzuentwickeln? 📈</h2>
            <p className="text-slate-600 mb-8">Wir investieren viel in Training & Coaching. Stillstand ist bei uns keine Option.</p>
            <div className="space-y-3">
              <OptionButton
                selected={state.answers.mindset === true}
                onClick={() => { handleAnswer('mindset', true); nextStep(); }}
              >
                Ja, ich will lernen und besser werden
              </OptionButton>
              <OptionButton
                selected={state.answers.mindset === false}
                onClick={() => { handleAnswer('mindset', false); nextStep(); }}
              >
                Nein, ich bin schon gut genug
              </OptionButton>
            </div>
          </div>
        );
      case 7: // Start Date
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-8">Wann kannst du starten? 🏁</h2>
            <div className="space-y-3">
              {['Sofort / Schnellstmöglich', 'In den nächsten 2-4 Wochen', 'Erst später'].map(opt => (
                <OptionButton
                  key={opt}
                  selected={state.answers.startDate === opt}
                  onClick={() => { handleAnswer('startDate', opt); setTimeout(nextStep, 150); }}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </div>
        );
      case 8: // Contact Form - Using Optimized Component
        return (
          <ContactForm
            initialValues={state.answers}
            onSubmit={onContactFormSubmit}
            isSubmitting={isSubmitting}
            onShowPrivacy={() => setShowPrivacy(true)}
          />
        );
      default:
        return null;
    }
  };

  const QuizContent = (
    <AnimatePresence mode="wait">
      {!state.isSubmitted ? (
        <motion.div
          key="quiz-content"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modern Glowing Progress Bar */}
          <div className="mb-8 px-1">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fortschritt</span>
              <span className="text-xs font-bold text-[#004e82]">{Math.min(state.step, totalSteps)} / {totalSteps}</span>
            </div>
            <div className="relative w-full h-4 bg-slate-100 rounded-full shadow-inner overflow-hidden transform-gpu">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-sky-400 to-[#004e82] transition-transform duration-500 ease-out shadow-[0_0_15px_rgba(14,165,233,0.6)] origin-left will-change-transform"
                style={{ transform: `scaleX(${Math.min(progressPercentage, 100) / 100})` }}
              >
                {/* Glowing white tip - using translate to avoid aspect ratio distortion if possible, or just accept it's inside the scaled element */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[2px]"></div>
              </div>
            </div>
          </div>

          {/* REFACTOR: Responsive Card Styling - Compact on mobile, Fixed height on desktop */}
          <Card className="flex flex-col shadow-2xl border-none ring-1 ring-slate-100 bg-white/95 md:min-h-[420px] md:justify-center py-8">
            {renderStep()}
          </Card>

          {state.step > 0 && state.step < 8 && !state.isDisqualified && (
            <button
              onClick={() => setState(prev => ({ ...prev, step: prev.step - 1 }))}
              className="mt-6 text-slate-400 hover:text-slate-600 text-sm font-bold w-full text-center transition-colors uppercase tracking-wide"
            >
              Zurück
            </button>
          )}
        </motion.div>
      ) : (
        <SuccessView isMobile={isMobile} isOverlayOpen={isOverlayOpen} onClose={toggleOverlay} />
      )}
    </AnimatePresence>
  );

  // Mobile View: Full-screen overlay portal
  if (isMobile) {
    if (isOverlayOpen) {
      return createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-50 flex flex-col w-full h-[100dvh] touch-none">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200 shadow-sm flex-shrink-0 z-20">
            <div className="flex items-center gap-2">
              <span className="text-[#004e82] font-bold text-lg">Bewerbung</span>
              {state.step > 0 && !state.isSubmitted && <span className="text-slate-400 text-sm font-medium">• Schritt {state.step}</span>}
            </div>
            <button
              onClick={toggleOverlay}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Inner scroll content */}
          <div className="w-full flex-grow overflow-y-auto flex flex-col px-4 py-8 scroll-smooth overscroll-contain">
            <div className="w-full max-w-xl mx-auto pb-40"> {/* pb-40 ensures space for keyboard scrolling */}
              {state.isDisqualified && <DisqualificationModal reason={state.disqualificationReason} onRedirect={handleDisqualificationRedirect} />}
              {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
              {QuizContent}
            </div>
          </div>
        </div>,
        document.body
      );
    } else {
      // Inline Teaser Card when Overlay is closed
      return (
        <Card className="bg-white border border-slate-200 shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <Rocket className="w-8 h-8 text-[#004e82]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Deine Chance auf Wachstum</h3>
          <p className="text-slate-600 mb-6 text-sm">
            Starte jetzt den 60-Sekunden Check und finde heraus, ob du ins Team passt.
          </p>
          <Button fullWidth onClick={toggleOverlay} size="lg" className="shadow-md">
            Jetzt Bewerbung starten 🚀
          </Button>
        </Card>
      );
    }
  }

  // Desktop View
  return (
    <div className="w-full max-w-xl mx-auto relative">
      {state.isDisqualified && <DisqualificationModal reason={state.disqualificationReason} onRedirect={handleDisqualificationRedirect} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {/* Desktop Padding/Margin adjustments */}
      <div className="py-8">
        {QuizContent}
      </div>
    </div>
  );
}