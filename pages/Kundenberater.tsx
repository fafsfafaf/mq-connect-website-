import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
  Euro,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Users,
  Sparkles,
  Rocket,
  FileCheck2,
  Coffee,
  Map,
  Tablet,
  Trophy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Search,
  ClipboardCheck,
  FileText,
  PhoneCall,
  Instagram,
  FolderOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// TODO: replace with a live endpoint before running ads — the old n8n host
// (n8n.srv824470.hstgr.cloud) is offline, see HANDOVER.md "Offene Punkte".
const FUNNEL_WEBHOOK_URL = 'https://n8n.srv824470.hstgr.cloud/webhook/funnel-kundenberater';
// TODO: same as above — needs a live endpoint that accepts multipart/form-data.
const CV_UPLOAD_WEBHOOK_URL = 'https://n8n.srv824470.hstgr.cloud/webhook/funnel-kundenberater-cv';

// qlicense = driving licence question, sits between the language and availability step.
type Step = 'landing' | 'info' | 'q1' | 'q2' | 'q3' | 'qlicense' | 'q4' | 'form' | 'done' | 'rejected';

// Global progress (like the Perspective progress bar) — only shown during the quiz.
const STEP_PROGRESS: Partial<Record<Step, number>> = {
  q1: 17,
  q2: 33,
  q3: 50,
  qlicense: 67,
  q4: 83,
  form: 95,
};

interface FunnelAnswers {
  prioritaeten: string[];
  vertriebserfahrung: string;
  deutschkenntnisse: string;
  fuehrerschein: string;
  erreichbarkeit: string;
}

/* ---------------------------------- Content ---------------------------------- */

const REASONS: { icon: React.ElementType; text: React.ReactNode }[] = [
  { icon: Euro, text: <>Verdiene <strong>2.500 – 4.500 €</strong> mit <strong>starken Provisionen</strong>.</> },
  { icon: GraduationCap, text: <>Starte mit <strong>umfassender Einarbeitung</strong> und Deinem <strong>persönlichen Mentor</strong>.</> },
  { icon: TrendingUp, text: <>Steige im Rekordtempo zum <strong>Teamleiter</strong> auf.</> },
  { icon: ShieldCheck, text: <><strong>Krisensicherer Arbeitsplatz.</strong><br />Wir wachsen seit über 5 Jahren.</> },
  { icon: Users, text: <>Werde Teil eines <strong>jungen Teams</strong> mit regelmäßigen <strong>Team-Events</strong>.</> },
  { icon: Sparkles, text: <>Entwickle Dich weiter mit <strong>Persönlichkeits- und Mindset-Coaching</strong>.</> },
  { icon: Rocket, text: <>Vertreibe <strong>Produkte von Top-Anbietern</strong> wie E.ON, Vodafone und Telekom.</> },
  { icon: FileCheck2, text: <><strong>Kein Lebenslauf, kein Anschreiben:</strong> Bewirb Dich in unter 60 Sekunden.</> },
];

const TRAITS: { icon: React.ElementType; text: React.ReactNode }[] = [
  { icon: Users, text: <>Du gehst <strong>offen auf Menschen zu</strong> und trittst <strong>gepflegt und sicher</strong> auf.</> },
  { icon: Euro, text: <><strong>Du willst mehr verdienen</strong> — Dein Einsatz soll sich direkt auszahlen.</> },
  { icon: GraduationCap, text: <>Du bringst <strong>Neugier und Lernwillen</strong> mit.</> },
  { icon: Rocket, text: <>Du bist <strong>gerne aktiv unterwegs</strong> und liebst Abwechslung.</> },
];

const DAY_IN_LIFE: { icon: React.ElementType; text: React.ReactNode }[] = [
  { icon: Coffee, text: <>Du startest morgens <strong>gemeinsam mit Deinem Team</strong> motiviert in den Tag.</> },
  { icon: Map, text: <>Ab Mittag bist Du <strong>im kleinen Team in Deinem Einsatzgebiet</strong> in Essen & Düsseldorf unterwegs.</> },
  { icon: Tablet, text: <><strong>Du berätst Kunden</strong> zu Glasfaser- und Energieprodukten von Top-Anbietern.</> },
  { icon: Trophy, text: <>Mit unserem erprobten System arbeitest Du Dich <strong>zum Teamleiter</strong> hoch.</> },
];

// Benefit bar for the "classic" landing variant (route /kundenberater-2).
const TOP_BENEFITS = [
  { emoji: '💰', text: '2.500 – 4.500 € Verdienst möglich' },
  { emoji: '✅', text: 'Quereinsteiger willkommen' },
  { emoji: '📈', text: 'Schneller Aufstieg zum Teamleiter' },
];

const Q1_OPTIONS = [
  { emoji: '💶', label: 'Überdurchschnittlicher Verdienst' },
  { emoji: '👥', label: 'Persönliche Einarbeitung' },
  { emoji: '⌚', label: 'Freiheit & Flexibilität' },
  { emoji: '📈', label: 'Persönliche Weiterentwicklung' },
  { emoji: '🚀', label: 'Junges Team & Events' },
];

const Q2_OPTIONS = [
  'Noch keine (Quereinstieg)',
  'Bis zu 2 Jahre',
  '2 – 5 Jahre',
  'Über 5 Jahre',
];

const LICENSE_OPTIONS = [
  { emoji: '🚗', label: 'Ja, Klasse B (Auto)' },
  { emoji: '🛵', label: 'Ja, eine andere Klasse' },
  { emoji: '📝', label: 'Noch nicht — ich mache ihn gerade' },
  { emoji: '🚶', label: 'Nein, ich habe keinen' },
];

const Q4_OPTIONS = [
  { emoji: '☀️', label: 'Jederzeit' },
  { emoji: '🕛', label: 'Vormittags von 8 – 12 Uhr' },
  { emoji: '🕕', label: 'Nachmittags von 12 – 18 Uhr' },
  { emoji: '🌙', label: 'Abends ab 18 Uhr' },
];

// Country picker for the phone field (flags via flagcdn.com, German names).
interface PhoneCountry {
  code: string;
  name: string;
  dial: string;
}

const COUNTRIES: PhoneCountry[] = [
  { code: 'de', name: 'Deutschland', dial: '+49' },
  { code: 'at', name: 'Österreich', dial: '+43' },
  { code: 'ch', name: 'Schweiz', dial: '+41' },
  { code: 'af', name: 'Afghanistan', dial: '+93' },
  { code: 'eg', name: 'Ägypten', dial: '+20' },
  { code: 'al', name: 'Albanien', dial: '+355' },
  { code: 'be', name: 'Belgien', dial: '+32' },
  { code: 'ba', name: 'Bosnien und Herzegowina', dial: '+387' },
  { code: 'bg', name: 'Bulgarien', dial: '+359' },
  { code: 'dk', name: 'Dänemark', dial: '+45' },
  { code: 'fr', name: 'Frankreich', dial: '+33' },
  { code: 'gr', name: 'Griechenland', dial: '+30' },
  { code: 'gb', name: 'Großbritannien', dial: '+44' },
  { code: 'iq', name: 'Irak', dial: '+964' },
  { code: 'ir', name: 'Iran', dial: '+98' },
  { code: 'ie', name: 'Irland', dial: '+353' },
  { code: 'it', name: 'Italien', dial: '+39' },
  { code: 'xk', name: 'Kosovo', dial: '+383' },
  { code: 'hr', name: 'Kroatien', dial: '+385' },
  { code: 'lv', name: 'Lettland', dial: '+371' },
  { code: 'lt', name: 'Litauen', dial: '+370' },
  { code: 'lu', name: 'Luxemburg', dial: '+352' },
  { code: 'ma', name: 'Marokko', dial: '+212' },
  { code: 'md', name: 'Moldau', dial: '+373' },
  { code: 'me', name: 'Montenegro', dial: '+382' },
  { code: 'nl', name: 'Niederlande', dial: '+31' },
  { code: 'mk', name: 'Nordmazedonien', dial: '+389' },
  { code: 'no', name: 'Norwegen', dial: '+47' },
  { code: 'pl', name: 'Polen', dial: '+48' },
  { code: 'pt', name: 'Portugal', dial: '+351' },
  { code: 'ro', name: 'Rumänien', dial: '+40' },
  { code: 'ru', name: 'Russland', dial: '+7' },
  { code: 'se', name: 'Schweden', dial: '+46' },
  { code: 'rs', name: 'Serbien', dial: '+381' },
  { code: 'sk', name: 'Slowakei', dial: '+421' },
  { code: 'si', name: 'Slowenien', dial: '+386' },
  { code: 'es', name: 'Spanien', dial: '+34' },
  { code: 'sy', name: 'Syrien', dial: '+963' },
  { code: 'cz', name: 'Tschechien', dial: '+420' },
  { code: 'tn', name: 'Tunesien', dial: '+216' },
  { code: 'tr', name: 'Türkei', dial: '+90' },
  { code: 'ua', name: 'Ukraine', dial: '+380' },
  { code: 'hu', name: 'Ungarn', dial: '+36' },
  { code: 'us', name: 'USA', dial: '+1' },
  { code: 'vn', name: 'Vietnam', dial: '+84' },
];

const CountryFlag: React.FC<{ code: string }> = ({ code }) => (
  <img
    src={`https://flagcdn.com/w40/${code}.png`}
    alt=""
    className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
    loading="lazy"
  />
);

/* -------------------------------- UI-Bausteine -------------------------------- */

const FunnelCta: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean }> = ({ onClick, children, className, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      // Single line always: small text + nowrap so the label never wraps.
      'block w-full overflow-hidden whitespace-nowrap rounded-lg bg-[#5687BC] px-3 py-3.5 text-center text-sm font-bold text-white shadow-md',
      'transition-all hover:-translate-y-0.5 hover:bg-[#46759f] hover:shadow-lg active:translate-y-0',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#5687BC] disabled:hover:shadow-md',
      className,
    )}
  >
    {children}
  </button>
);

// Blue outline icon + compact black text on white — like the original list style.
const IconRow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="flex items-start gap-3.5 text-left">
    <Icon className="h-8 w-8 shrink-0 text-[#5687BC]" strokeWidth={1.25} />
    <p className="text-sm leading-snug text-slate-900">{children}</p>
  </div>
);

// Dark navy title band; the section content below stays on white.
// On desktop the band bleeds to the full viewport width like the original.
const FULL_BLEED = 'md:ml-[calc(50%-50vw)] md:w-screen';

const SectionBand: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={cn('bg-[#1F2147] px-5 py-5 text-center md:py-7', FULL_BLEED)}>
    <h2 className="text-xl font-bold leading-snug text-white md:text-3xl">{children}</h2>
  </div>
);

const stepMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.25 },
};

/* --------------------------------- Hauptseite --------------------------------- */

// variant 'video' = default landing (dark headline band + video slot);
// variant 'classic' = benefit bar + big headline + two photo CTAs (/kundenberater-2).
export const Kundenberater: React.FC<{ variant?: 'video' | 'classic' }> = ({ variant = 'video' }) => {
  const [step, setStep] = useState<Step>('landing');
  const [answers, setAnswers] = useState<FunnelAnswers>({
    prioritaeten: [],
    vertriebserfahrung: '',
    deutschkenntnisse: '',
    fuehrerschein: '',
    erreichbarkeit: '',
  });
  const [form, setForm] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    wohnort: '',
    ziele: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountry>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  // Set on a failed submit attempt; each field's error clears as soon as it is filled.
  const [showErrors, setShowErrors] = useState(false);
  // Optional CV upload on the confirmation page.
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvState, setCvState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [cvError, setCvError] = useState('');

  const handleCvSelect = (file: File | null) => {
    setCvError('');
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      setCvError('Die Datei ist größer als 25 MB — bitte wähle eine kleinere Datei.');
      return;
    }
    setCvFile(file);
  };

  const handleCvSubmit = async () => {
    if (!cvFile || cvState !== 'idle') return;
    setCvState('sending');
    try {
      const payload = new FormData();
      payload.append('quelle', 'funnel-kundenberater-cv');
      payload.append('name', `${form.vorname} ${form.nachname}`.trim());
      payload.append('email', form.email);
      payload.append('datei', cvFile);
      await fetch(CV_UPLOAD_WEBHOOK_URL, { method: 'POST', body: payload });
    } catch {
      // Same fallback behavior as the main submit: don't strand the applicant.
    }
    setCvState('done');
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Dein neuer Job als Kundenberater im Außendienst (m/w/d) bei MQ-Connect';
    // Load Roboto only for the funnel route (rest of the site keeps Inter).
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap';
    document.head.appendChild(fontLink);
    return () => {
      document.title = previousTitle;
      document.head.removeChild(fontLink);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const goTo = (next: Step) => setStep(next);

  const togglePriority = (label: string) => {
    setAnswers((prev) => ({
      ...prev,
      prioritaeten: prev.prioritaeten.includes(label)
        ? prev.prioritaeten.filter((p) => p !== label)
        : [...prev.prioritaeten, label],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const missingRequired =
      !form.vorname.trim() ||
      !form.nachname.trim() ||
      !form.email.trim() ||
      !form.telefon.trim() ||
      !form.wohnort.trim() ||
      !form.consent;
    if (missingRequired) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    try {
      await fetch(FUNNEL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quelle: 'funnel-kundenberater',
          eingereichtAm: new Date().toISOString(),
          ...answers,
          ...form,
          telefon: `${phoneCountry.dial} ${form.telefon}`,
          telefonLand: phoneCountry.name,
        }),
      });
    } catch {
      // Same behavior as ApplicationQuiz: don't strand the applicant on a network
      // error — the thank-you screen shows direct contact details as fallback.
    }
    setSubmitting(false);
    goTo('done');
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-slate-900" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
      {/* Header — Logo zentriert, Klick führt zurück zum Funnel-Start */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-md md:max-w-[35rem] items-center justify-center px-4 py-3">
          <button onClick={() => goTo('landing')} aria-label="Zum Anfang">
            <img src="/images/mq-logo-large.png" alt="MQ-Connect Logo" className="h-12 w-auto" />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md md:max-w-[35rem] flex-1">
        <AnimatePresence mode="wait">
          {/* ------------------------------ Landing ------------------------------ */}
          {step === 'landing' && (
            <m.div key="landing" {...stepMotion}>
              {variant === 'video' ? (
                <>
                  {/* Headline-Band */}
                  <div className={cn('bg-[#1F2147] px-5 py-6 text-center text-white', FULL_BLEED)}>
                    <h1 className="text-sm leading-relaxed md:text-base">
                      Entdecke Deine Vorteile als
                      <br />
                      <strong>Kundenberater im Außendienst (m/w/d)</strong> 👇
                    </h1>
                  </div>

                  {/* Video-Platzhalter (TODO: echtes Recruiting-Video einsetzen) */}
                  <div className="px-8 pt-8">
                    <img
                      src="/images/hero-bg-door-v2.jpg"
                      alt="MQ-Connect im Außendienst"
                      className="h-56 w-full rounded-lg object-cover shadow-sm md:h-72"
                    />
                  </div>

                  {/* Standort-Zeilen */}
                  <div className="px-5 pt-6 text-center text-[15px] text-slate-900">
                    <p>📍 Essen & Düsseldorf (NRW)</p>
                    <p className="mt-1">🕐 Ab sofort</p>
                  </div>

                  <div className="px-8 pb-2 pt-6">
                    <FunnelCta onClick={() => goTo('info')}>Hier geht's zu Deinen Vorteilen!</FunnelCta>
                  </div>
                </>
              ) : (
                <>
                  {/* Benefit-Bar */}
                  <div className={cn('bg-[#1F2147] px-5 py-3.5 text-center text-white', FULL_BLEED)}>
                    {TOP_BENEFITS.map((b) => (
                      <p key={b.text} className="py-0.5 text-sm font-bold">
                        <span className="mr-1.5">{b.emoji}</span>
                        {b.text}
                      </p>
                    ))}
                  </div>

                  {/* Große Headline */}
                  <div className={cn('px-5 pt-7 text-center', FULL_BLEED)}>
                    <h1 className="mx-auto text-[22px] leading-snug md:max-w-3xl md:text-4xl md:leading-tight">
                      Entdecke Deine unschlagbaren <strong>Vorteile</strong> als{' '}
                      <strong>Kundenberater im Außendienst (m/w/d)</strong> bei <strong>MQ-Connect</strong>.
                    </h1>
                    <div className="mt-4 text-[15px] text-slate-900">
                      <p>📍 Essen & Düsseldorf (NRW)</p>
                      <p className="mt-1">🕐 Ab sofort</p>
                    </div>
                  </div>

                  {/* Zwei Foto-CTA-Kacheln */}
                  <div className="grid grid-cols-2 gap-4 px-5 pt-6">
                    {[
                      { img: '/images/hero-bg-door-v2.jpg', label: "Los geht's!" },
                      { img: '/images/vision-team.jpg', label: 'Mehr erfahren!' },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => goTo('info')}
                        className="overflow-hidden rounded-lg shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
                      >
                        <img src={btn.img} alt="" className="h-36 w-full object-cover md:h-44" />
                        <span className="block bg-[#5687BC] py-2.5 text-sm font-bold text-white">{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              <hr className="mx-5 my-8 border-slate-300" />

              {/* 8 Gründe */}
              <SectionBand>
                8 Gründe für
                <br />
                MQ-Connect
              </SectionBand>
              <div className="px-5 py-8">
                <div className="space-y-4">
                  {REASONS.map((r, i) => (
                    <IconRow key={i} icon={r.icon}>{r.text}</IconRow>
                  ))}
                </div>
                <p className="mt-5 text-[15px]">… und vieles mehr! 😊</p>
                <div className="mt-6">
                  <FunnelCta onClick={() => goTo('q1')}>
                    Bewirb Dich jetzt in unter 60 Sekunden!
                  </FunnelCta>
                </div>
              </div>

              {/* Foto nach 8 Gründen */}
              <div className="px-8 pb-2">
                <img src="/images/office.jpg" alt="MQ-Connect im Außendienst" className="h-64 w-full rounded-lg object-cover shadow-sm md:h-72" />
              </div>

              <hr className="mx-5 my-8 border-slate-300" />

              {/* Das macht uns besonders */}
              <SectionBand>Das macht uns besonders</SectionBand>
              <div className="px-5 py-8">
                <div className="space-y-10">
                  <div>
                    <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="h-48 w-full rounded-lg object-cover shadow-sm md:h-56" />
                    <h3 className="mt-5 text-[17px] font-bold">Messbarer Erfolg</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      Seit über 5 Jahren wachsen wir Jahr für Jahr: Wir haben bereits über 80 Mitarbeitende
                      ausgebildet und mehr als 6.000 Kunden für unsere Partner gewonnen — mit einem
                      Vertriebskonzept, das nachweislich funktioniert.
                    </p>
                  </div>

                  <div>
                    <div className="rounded-lg bg-[#1F2147] px-4 py-6">
                      <p className="text-center text-sm font-semibold text-white">
                        Viele zufriedene <span className="text-[#8FB4DC]">Produktpartner</span>
                      </p>
                      {/* TODO: Logo-Dateien für Telekom, Eprimo und TNG nachliefern —
                          bis dahin erscheinen sie als Wortmarken-Kacheln. */}
                      <div className="mt-4 grid grid-cols-2 items-center gap-3">
                        {[
                          { logo: '/images/eon.png', name: 'E.ON' },
                          { logo: '/images/partners/vodafone-logo.png', name: 'Vodafone' },
                          { name: 'Telekom' },
                          { name: 'Eprimo' },
                          { name: 'TNG' },
                        ].map((partner) => (
                          <span
                            key={partner.name}
                            className="flex h-12 items-center justify-center rounded-md bg-white px-3 last:odd:col-span-2"
                          >
                            {partner.logo ? (
                              <img src={partner.logo} alt={partner.name} className="max-h-8 w-auto object-contain" />
                            ) : (
                              <span className="text-sm font-bold text-[#1F2147]">{partner.name}</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="mt-5 text-[17px] font-bold">Starke Partner</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      Wir vermitteln Glasfaser-, Strom- und Gasverträge im Auftrag von Top-Anbietern wie E.ON,
                      Vodafone, Telekom, Eprimo und TNG. Diese Partnerschaften sichern uns langfristige Projekte —
                      und Dir einen stabilen Arbeitsplatz.
                    </p>
                  </div>

                  <div>
                    <img src="/images/team/milan-portrait.png" alt="Milan Jasieniecki, Gründer von MQ-Connect" className="h-48 w-full rounded-lg object-cover object-top shadow-sm md:h-56" />
                    <h3 className="mt-5 text-[17px] font-bold">Mit System zum Erfolg</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      Umfassende Einarbeitung, erprobte Sales-Skripte und Mindset-Coaching: Unser
                      Ausbildungssystem hat schon zahlreichen Quereinsteigern den Weg nach oben geebnet —
                      vom ersten Probetag bis zum Teamleiter.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <FunnelCta onClick={() => goTo('q1')}>Jetzt in unter 60 Sekunden bewerben!</FunnelCta>
                </div>
              </div>

              <hr className="mx-5 my-2 border-slate-300" />

              {/* Tagesablauf */}
              <SectionBand>
                Darauf kannst
                <br />
                Du Dich freuen
              </SectionBand>
              <div className="px-5 py-8">
                <div className="space-y-4">
                  {DAY_IN_LIFE.map((d, i) => (
                    <IconRow key={i} icon={d.icon}>{d.text}</IconRow>
                  ))}
                </div>
                <div className="mt-7">
                  <FunnelCta onClick={() => goTo('q1')}>Gestalte jetzt Deine Zukunft!</FunnelCta>
                </div>
              </div>

              {/* Einsatzgebiet */}
              <SectionBand>Dein Einsatzgebiet</SectionBand>
              <div className="px-5 py-8 text-center">
                <img src="/images/office.jpg" alt="Das Team von MQ-Connect" className="h-44 w-full rounded-lg object-cover md:h-52" />
                <p className="mt-4 text-[15px] font-semibold text-slate-700">Essen, Düsseldorf und Umgebung (NRW)</p>
                <p className="mt-1 text-sm text-slate-600">
                  Du bist immer im Team unterwegs — jeden Tag in einem anderen Viertel.
                </p>
                <a
                  href="/impressum"
                  className="mt-2 inline-block text-sm font-bold text-[#5687BC] underline"
                >
                  Mehr über MQ-Connect
                </a>
              </div>
            </m.div>
          )}

          {/* ------------------------------- Info-Seite ------------------------------- */}
          {step === 'info' && (
            <m.div key="info" {...stepMotion}>
              <SectionBand>
                Deine Vorteile
                <br />
                auf einen Blick!
              </SectionBand>
              <div className="px-5 py-8">
                <div className="space-y-4">
                  {REASONS.map((r, i) => (
                    <IconRow key={i} icon={r.icon}>{r.text}</IconRow>
                  ))}
                </div>
                <p className="mt-5 text-[15px]">… und vieles mehr! 😊</p>
                <div className="mt-6">
                  <FunnelCta onClick={() => goTo('q1')}>
                    Klingt super, das will ich haben!
                  </FunnelCta>
                </div>
              </div>

              <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="h-56 w-full object-cover md:h-72" />

              <SectionBand>Das zeichnet Dich aus</SectionBand>
              <div className="px-5 py-8">
                <div className="space-y-4">
                  {TRAITS.map((t, i) => (
                    <IconRow key={i} icon={t.icon}>{t.text}</IconRow>
                  ))}
                </div>
                <div className="mt-7">
                  <FunnelCta onClick={() => goTo('q1')}>Das klingt nach mir — auf zur Bewerbung! 😊</FunnelCta>
                </div>
              </div>

              <img src="/images/hero-bg-door-v2.jpg" alt="Unterwegs im Einsatzgebiet" className="h-56 w-full object-cover md:h-72" />
            </m.div>
          )}

          {/* -------------------------------- Frage 1 -------------------------------- */}
          {step === 'q1' && (
            <m.div key="q1" {...stepMotion} className="px-5 pb-8 pt-3">
              <p className="text-center text-[15px] text-[#1F2147]">
                Um Dich besser kennenzulernen, haben wir <strong>5 kurze Fragen</strong> an Dich.
              </p>
              <div className={cn('-mx-5 mt-6 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white', FULL_BLEED)}>Frage 1 von 5</div>
              <h2 className="mt-3 text-center text-xl leading-snug">
                Was ist Dir bei Deinem <strong>neuen Job</strong> besonders <strong>wichtig</strong>?
              </h2>
              <p className="mt-2 text-center text-sm text-slate-500">(Mehrfachauswahl möglich)</p>
              <div className="mt-6 space-y-3">
                {Q1_OPTIONS.map((opt) => {
                  const selected = answers.prioritaeten.includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      onClick={() => togglePriority(opt.label)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-3.5 text-left text-sm font-bold text-slate-900 shadow-sm transition-all',
                        selected ? 'border-[#5687BC]' : 'border-slate-200 hover:border-slate-300',
                      )}
                    >
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="flex-1">{opt.label}</span>
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                          selected ? 'border-[#5687BC] bg-[#5687BC]' : 'border-slate-300 bg-white',
                        )}
                      >
                        {selected && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6">
                <FunnelCta onClick={() => goTo('q2')} disabled={answers.prioritaeten.length === 0}>
                  Weiter
                </FunnelCta>
              </div>
            </m.div>
          )}

          {/* -------------------------------- Frage 2 -------------------------------- */}
          {step === 'q2' && (
            <m.div key="q2" {...stepMotion} className="px-5 py-8">
              <div className={cn('-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white', FULL_BLEED)}>Frage 2 von 5</div>
              <h2 className="mt-3 text-center text-xl leading-snug">
                Wie viele <strong>Jahre Berufserfahrung</strong> hast Du bereits im <strong>Vertrieb</strong> gesammelt?
              </h2>
              <p className="mt-2 text-center text-sm text-slate-500">
                (Keine Voraussetzung — viele unserer Besten sind Quereinsteiger)
              </p>
              <div className="mt-6 space-y-3">
                {Q2_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, vertriebserfahrung: opt }));
                      goTo('q3');
                    }}
                    className="w-full rounded-lg bg-[#5687BC] px-4 py-3.5 text-center text-sm font-bold text-white transition-all hover:bg-[#46759f] hover:shadow-md"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {/* -------------------------------- Frage 3 -------------------------------- */}
          {step === 'q3' && (
            <m.div key="q3" {...stepMotion} className="px-5 py-8">
              <div className={cn('-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white', FULL_BLEED)}>Frage 3 von 5</div>
              <h2 className="mt-3 text-center text-xl leading-snug">
                Hast Du <strong>gute Deutschkenntnisse</strong> in Wort und Schrift?
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Ja', icon: ThumbsUp },
                  { label: 'Nein', icon: ThumbsDown },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, deutschkenntnisse: opt.label }));
                      // Same branching as the original funnel: without German skills
                      // the application ends on a friendly rejection page.
                      goTo(opt.label === 'Ja' ? 'qlicense' : 'rejected');
                    }}
                    className="overflow-hidden rounded-lg shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <span className="flex h-36 items-center justify-center bg-[#1F2147]">
                      <opt.icon className="h-14 w-14 text-white" strokeWidth={1.25} />
                    </span>
                    <span className="block bg-[#5687BC] py-2.5 text-sm font-bold text-white">{opt.label}</span>
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {/* ---------------------------- Frage 4: Führerschein ---------------------------- */}
          {step === 'qlicense' && (
            <m.div key="qlicense" {...stepMotion} className="px-5 py-8">
              <div className={cn('-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white', FULL_BLEED)}>Frage 4 von 5</div>
              <h2 className="mt-3 text-center text-xl leading-snug">
                Hast Du einen <strong>Führerschein</strong> — und wenn ja, welche <strong>Klasse</strong>?
              </h2>
              <p className="mt-2 text-center text-sm text-slate-500">
                (Keine Voraussetzung — wir sind immer im Team unterwegs)
              </p>
              <div className="mt-6 space-y-3">
                {LICENSE_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, fuehrerschein: opt.label }));
                      goTo('q4');
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-[#5687BC] px-4 py-3.5 text-left text-sm font-bold text-white transition-all hover:bg-[#46759f] hover:shadow-md"
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {/* -------------------------------- Frage 5 -------------------------------- */}
          {step === 'q4' && (
            <m.div key="q4" {...stepMotion} className="px-5 py-8">
              <div className={cn('-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white', FULL_BLEED)}>Letzte Frage</div>
              <h2 className="mt-3 text-center text-xl leading-snug">
                Wann können wir Dich <strong>telefonisch</strong> am besten <strong>erreichen</strong>? ✨
              </h2>
              <p className="mt-2 text-center text-sm text-slate-500">
                (Deine Kontaktdaten gibst Du auf der nächsten Seite an)
              </p>
              <div className="mt-6 space-y-3">
                {Q4_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, erreichbarkeit: opt.label }));
                      goTo('form');
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-[#5687BC] px-4 py-3.5 text-left text-sm font-bold text-white transition-all hover:bg-[#46759f] hover:shadow-md"
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {/* ------------------------------ Kontaktformular ------------------------------ */}
          {step === 'form' && (
            <m.div key="form" {...stepMotion} className="px-5 pb-6 pt-3">
              <h2 className="text-center text-[17px] font-bold leading-snug">
                Perfekt
                <br />
                Sieht aus, als würde unser Team super zu Dir passen!
              </h2>
              <p className="mt-2.5 text-center text-sm text-slate-700">
                Trage hier einfach Deine Kontaktdaten ein und wir werden uns direkt bei Dir melden. 🤝
              </p>
              <form onSubmit={handleSubmit} noValidate className="mt-3.5 space-y-2">
                {(
                  [
                    { key: 'vorname', emoji: '👋', placeholder: 'Dein Vorname', type: 'text' },
                    { key: 'nachname', emoji: '👤', placeholder: 'Dein Nachname', type: 'text' },
                    { key: 'email', emoji: '✉️', placeholder: 'Deine E-Mail Adresse', type: 'email' },
                    { key: 'telefon', emoji: '', placeholder: 'Deine Telefonnummer', type: 'tel' },
                    { key: 'wohnort', emoji: '🏙️', placeholder: 'Dein Wohnort', type: 'text' },
                  ] as const
                ).map((field) => {
                  const hasError = showErrors && !form[field.key].trim();
                  return (
                    <div key={field.key} className={cn(field.key === 'telefon' && 'relative')}>
                      <label className="block rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-[#5687BC]">
                        <span className="flex items-center gap-3">
                          {field.key === 'telefon' ? (
                            <button
                              type="button"
                              onClick={() => {
                                setCountryOpen((open) => !open);
                                setCountrySearch('');
                              }}
                              className="flex shrink-0 items-center gap-1.5"
                            >
                              <CountryFlag code={phoneCountry.code} />
                              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                              <span className="text-sm text-slate-500">{phoneCountry.dial}</span>
                            </button>
                          ) : (
                            <span className="text-base">{field.emoji}</span>
                          )}
                          <input
                            type={field.type}
                            value={form[field.key]}
                            onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent text-sm font-light outline-none placeholder:font-light placeholder:text-slate-400"
                          />
                          {hasError && (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">!</span>
                          )}
                        </span>
                        {hasError && (
                          <span className="mt-1 block pl-9 text-xs text-red-500">Dies ist ein Pflichtfeld</span>
                        )}
                      </label>

                      {/* Ländervorwahl-Dropdown mit Suche (wie im Original) */}
                      {field.key === 'telefon' && countryOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setCountryOpen(false)} />
                          <div className="absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5">
                              <Search className="h-4 w-4 shrink-0 text-slate-400" />
                              <input
                                autoFocus
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Suche"
                                className="w-full text-sm font-light outline-none placeholder:font-light placeholder:text-slate-400"
                              />
                            </div>
                            <ul className="max-h-56 overflow-y-auto py-1">
                              {COUNTRIES.filter((c) =>
                                c.name.toLowerCase().includes(countrySearch.toLowerCase()),
                              ).map((c) => (
                                <li key={c.code}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPhoneCountry(c);
                                      setCountryOpen(false);
                                    }}
                                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-normal hover:bg-slate-50"
                                  >
                                    <CountryFlag code={c.code} />
                                    <span className="flex-1">{c.name}</span>
                                    <span className="text-slate-500">{c.dial}</span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
                <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-[#5687BC]">
                  <span className="text-base">💬</span>
                  <textarea
                    rows={4}
                    value={form.ziele}
                    onChange={(e) => setForm((prev) => ({ ...prev, ziele: e.target.value }))}
                    placeholder="Was sind Deine nächsten Ziele? Was möchtest Du mit uns erreichen? (optional)"
                    className="w-full resize-none bg-transparent text-sm font-light outline-none placeholder:font-light placeholder:text-slate-400"
                  />
                </label>
                <div className="px-1 py-1">
                  <label className="flex items-start gap-2.5 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#5687BC]"
                    />
                    <span>
                      <Link to="/datenschutz" target="_blank" className="font-semibold text-[#5687BC] underline">
                        Datenschutzbestimmungen
                      </Link>{' '}
                      gelesen und akzeptiert
                    </span>
                  </label>
                  {showErrors && !form.consent && (
                    <span className="mt-1 block pl-6 text-xs text-red-500">Dies ist ein Pflichtfeld</span>
                  )}
                </div>
                <m.button
                  type="submit"
                  disabled={submitting}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="block w-full overflow-hidden whitespace-nowrap rounded-lg bg-[#5687BC] px-3 py-3.5 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-[#46759f] disabled:opacity-60"
                >
                  {submitting ? 'Wird gesendet …' : 'Jetzt Bewerbung absenden!'}
                </m.button>
              </form>
            </m.div>
          )}

          {/* -------------------------------- Danke-Seite -------------------------------- */}
          {step === 'done' && (
            <m.div key="done" {...stepMotion} className="pb-4 pt-8">
              <ClipboardCheck className="mx-auto h-10 w-10 text-green-500" strokeWidth={1.5} />
              <h2 className="mt-5 px-5 text-center text-[19px] font-bold leading-snug">
                Großartig! 🤩
                <br />
                Deine Bewerbung ist bei uns eingegangen!
              </h2>
              <div className="px-8 pt-5">
                <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="h-52 w-full rounded-lg object-cover shadow-sm md:h-64" />
              </div>
              <p className="mt-4 px-8 text-center text-sm text-[#1F2147]">
                Wir rufen Dich zeitnah an und besprechen alles Weitere ganz in Ruhe mit Dir!
              </p>

              {/* Optionaler Lebenslauf-Upload */}
              <p className="mt-6 px-6 text-center text-lg leading-snug">
                Lade hier gerne noch Deinen Lebenslauf hoch, um den Bewerbungsprozess zu beschleunigen.
              </p>
              <div className="px-5 pt-4">
                {cvState === 'done' ? (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3.5 text-center text-sm font-semibold text-green-700">
                    Danke! Deine Datei ist bei uns eingegangen. ✅
                  </p>
                ) : (
                  <>
                    <label className="block cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3.5 text-center shadow-sm transition-colors hover:border-[#5687BC]">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => handleCvSelect(e.target.files?.[0] ?? null)}
                      />
                      <span className="flex items-center justify-center gap-2 text-sm font-semibold text-[#1F2147]">
                        <FolderOpen className="h-4.5 w-4.5 shrink-0 text-[#5687BC]" />
                        {cvFile ? cvFile.name : 'Hier klicken und Datei hochladen'}
                      </span>
                      <span className="mt-0.5 block text-xs font-light text-slate-400">(max. 25MB, .pdf, .png, .jpg)</span>
                    </label>
                    {cvError && <p className="mt-1.5 text-center text-xs text-red-500">{cvError}</p>}
                    <div className="mt-3">
                      <FunnelCta onClick={handleCvSubmit} disabled={!cvFile || cvState === 'sending'}>
                        {cvState === 'sending' ? 'Wird gesendet …' : 'Datei absenden'}
                      </FunnelCta>
                    </div>
                  </>
                )}
              </div>

              <ChevronDown className="mx-auto mt-7 h-6 w-6 text-slate-900" strokeWidth={3} />

              {/* So geht es jetzt weiter */}
              <div className="mt-5">
                <SectionBand>So geht es jetzt weiter</SectionBand>
              </div>
              <div className="space-y-5 px-5 py-6">
                <IconRow icon={FileText}>
                  <strong>1. Prüfung Deiner Bewerbung:</strong>
                  <br />
                  Wir schauen uns Deine Angaben an und prüfen, ob wir zueinander passen.
                </IconRow>
                <IconRow icon={PhoneCall}>
                  <strong>2. Kennenlern-Telefonat:</strong>
                  <br />
                  Wir rufen Dich an und lernen uns kurz kennen. Meldet sich in den nächsten Tagen eine
                  unbekannte Nummer — das sind vermutlich wir. 😉
                </IconRow>
                <IconRow icon={Users}>
                  <strong>3. Persönliches Gespräch & Probetag:</strong>
                  <br />
                  Passt alles, laden wir Dich persönlich zu uns ein und bereiten Deinen perfekten Start vor.
                </IconRow>
              </div>

              <ChevronDown className="mx-auto h-6 w-6 text-slate-900" strokeWidth={3} />

              {/* Social Follow */}
              <div className="px-5 py-6 text-center">
                <p className="text-lg font-bold leading-snug">
                  Folge uns auf Social Media und begleite uns schon jetzt im Alltag 🤩
                </p>
                <div className="mx-auto mt-5 max-w-[190px]">
                  <a
                    href="https://www.instagram.com/mq.connect/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span className="flex h-32 items-center justify-center bg-[#1F2147]">
                      <Instagram className="h-12 w-12 text-white" strokeWidth={1.25} />
                    </span>
                    <span className="block bg-[#5687BC] py-2.5 text-sm font-bold text-white">Instagram</span>
                  </a>
                </div>
              </div>
            </m.div>
          )}

          {/* ---------------------------- Freundliche Absage ---------------------------- */}
          {step === 'rejected' && (
            <m.div key="rejected" {...stepMotion} className="px-5 py-12 text-center">
              <h2 className="text-2xl font-black">Danke für Dein Interesse! 🙏</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Für die Arbeit als Kundenberater im Außendienst sind <strong>gute Deutschkenntnisse in Wort
                und Schrift</strong> leider eine feste Voraussetzung — deshalb können wir Deine Bewerbung
                aktuell nicht berücksichtigen.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                Sobald sich Deine Deutschkenntnisse verbessert haben, freuen wir uns sehr über eine neue
                Bewerbung von Dir!
              </p>
              <p className="mt-5 text-sm text-slate-600">
                Du hast Dich nur verklickt? 😅{' '}
                <button
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, deutschkenntnisse: '' }));
                    goTo('q3');
                  }}
                  className="font-bold text-[#5687BC] underline"
                >
                  Hier geht's zurück zur Frage.
                </button>
              </p>
              <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="mt-8 h-44 w-full rounded-2xl object-cover md:h-52" />
            </m.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-5 py-6 text-center text-sm text-slate-500">
        <Link to="/impressum" className="hover:text-[#5687BC]">Impressum</Link>
        <span className="mx-2">·</span>
        <Link to="/datenschutz" className="hover:text-[#5687BC]">Datenschutzerklärung</Link>
        <span className="mx-2">·</span>
        <Link to="/cookie-richtlinien" className="hover:text-[#5687BC]">Cookies</Link>
      </footer>

      {/* Fixierte Progressbar am unteren Bildschirmrand — nur während Quiz + Formular */}
      {STEP_PROGRESS[step] !== undefined && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white">
          <div className="mx-auto h-[5px] max-w-md bg-white md:max-w-none">
            <div
              className="h-full bg-[#5687BC] transition-all duration-500"
              style={{ width: `${STEP_PROGRESS[step]}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
