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
  Phone,
  Mail,
  Check,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_CONFIG } from '../constants';

// TODO: replace with a live endpoint before running ads — the old n8n host
// (n8n.srv824470.hstgr.cloud) is offline, see HANDOVER.md "Offene Punkte".
const FUNNEL_WEBHOOK_URL = 'https://n8n.srv824470.hstgr.cloud/webhook/funnel-kundenberater';

type Step = 'landing' | 'info' | 'q1' | 'q2' | 'q3' | 'q4' | 'form' | 'done' | 'rejected';

// Global progress (like the Perspective progress bar) — only shown during the quiz.
const STEP_PROGRESS: Partial<Record<Step, number>> = {
  q1: 20,
  q2: 40,
  q3: 60,
  q4: 80,
  form: 95,
};

interface FunnelAnswers {
  prioritaeten: string[];
  vertriebserfahrung: string;
  deutschkenntnisse: string;
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
  { icon: Rocket, text: <>Vertreibe <strong>Produkte von Top-Anbietern</strong> wie E.ON, Vattenfall und O2.</> },
  { icon: FileCheck2, text: <><strong>Kein Lebenslauf, kein Anschreiben:</strong> Bewirb Dich in unter 2 Minuten.</> },
];

const TRAITS: { icon: React.ElementType; text: React.ReactNode }[] = [
  { icon: Users, text: <>Du gehst <strong>offen auf Menschen zu</strong> und trittst <strong>gepflegt und sicher</strong> auf.</> },
  { icon: Euro, text: <><strong>Du willst mehr verdienen</strong> — Dein Einsatz soll sich direkt auszahlen.</> },
  { icon: GraduationCap, text: <>Du bringst <strong>Neugier und Lernwillen</strong> mit.</> },
  { icon: Rocket, text: <>Du bist <strong>gerne aktiv unterwegs</strong> und liebst Abwechslung.</> },
];

const DAY_IN_LIFE: { icon: React.ElementType; text: React.ReactNode }[] = [
  { icon: Coffee, text: <>Du startest morgens <strong>gemeinsam mit Deinem Team</strong> motiviert in den Tag.</> },
  { icon: Map, text: <>Ab Mittag bist Du <strong>im kleinen Team in Deinem Einsatzgebiet</strong> unterwegs.</> },
  { icon: Tablet, text: <><strong>Du berätst Kunden</strong> zu Glasfaser- und Energieprodukten von Top-Anbietern.</> },
  { icon: Trophy, text: <>Mit unserem erprobten System arbeitest Du Dich <strong>zum Teamleiter</strong> hoch.</> },
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

const Q4_OPTIONS = [
  { emoji: '☀️', label: 'Jederzeit' },
  { emoji: '🕛', label: 'Vormittags von 8 – 12 Uhr' },
  { emoji: '🕕', label: 'Nachmittags von 12 – 18 Uhr' },
  { emoji: '🌙', label: 'Abends ab 18 Uhr' },
];

/* -------------------------------- UI-Bausteine -------------------------------- */

const FunnelCta: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={cn(
      // Single line always: small text + nowrap so the label never wraps.
      'block w-full overflow-hidden whitespace-nowrap rounded-lg bg-[#5687BC] px-3 py-3.5 text-center text-sm font-bold text-white shadow-md',
      'transition-all hover:-translate-y-0.5 hover:bg-[#46759f] hover:shadow-lg active:translate-y-0',
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
const SectionBand: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-[#1F2147] px-5 py-5 text-center">
    <h2 className="text-xl font-bold leading-snug text-white">{children}</h2>
  </div>
);

const stepMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.25 },
};

/* --------------------------------- Hauptseite --------------------------------- */

export const Kundenberater: React.FC = () => {
  const [step, setStep] = useState<Step>('landing');
  const [answers, setAnswers] = useState<FunnelAnswers>({
    prioritaeten: [],
    vertriebserfahrung: '',
    deutschkenntnisse: '',
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
    if (!form.consent || submitting) return;
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
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
      {/* Header — Logo zentriert, Klick führt zurück zum Funnel-Start */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-center px-4 py-3">
          <button onClick={() => goTo('landing')} aria-label="Zum Anfang">
            <img src="/images/mq-logo-large.png" alt="MQ-Connect Logo" className="h-12 w-auto" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-md">
        <AnimatePresence mode="wait">
          {/* ------------------------------ Landing ------------------------------ */}
          {step === 'landing' && (
            <m.div key="landing" {...stepMotion}>
              {/* Headline-Band */}
              <div className="bg-[#1F2147] px-5 py-6 text-center text-white">
                <h1 className="text-sm leading-relaxed">
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
                  className="h-56 w-full rounded-lg object-cover shadow-sm"
                />
              </div>

              {/* Standort-Zeilen */}
              <div className="px-5 pt-6 text-center text-[15px] text-slate-900">
                <p>📍 47441, Moers (NRW)</p>
                <p className="mt-1">🕐 Ab sofort</p>
              </div>

              <div className="px-8 pb-2 pt-6">
                <FunnelCta onClick={() => goTo('info')}>Hier geht's zu Deinen Vorteilen!</FunnelCta>
              </div>

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
                    Bewirb Dich jetzt in unter 2 Minuten!
                  </FunnelCta>
                </div>
              </div>

              {/* Foto nach 8 Gründen */}
              <div className="px-8 pb-2">
                <img src="/images/office.jpg" alt="MQ-Connect im Außendienst" className="h-64 w-full rounded-lg object-cover shadow-sm" />
              </div>

              <hr className="mx-5 my-8 border-slate-300" />

              {/* Das macht uns besonders */}
              <SectionBand>Das macht uns besonders</SectionBand>
              <div className="px-5 py-8">
                <div className="space-y-10">
                  <div>
                    <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="h-48 w-full rounded-lg object-cover shadow-sm" />
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
                      <div className="mt-4 grid grid-cols-2 items-center gap-3">
                        {['vodafone-logo.png', 'o2-logo.png', 'vattenfall-logo.png', '1und1-logo.png'].map((logo) => (
                          <span key={logo} className="flex h-12 items-center justify-center rounded-md bg-white px-3">
                            <img src={`/images/partners/${logo}`} alt="" className="max-h-8 w-auto object-contain" />
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="mt-5 text-[17px] font-bold">Starke Partner</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      Wir vermitteln Glasfaser-, Strom- und Gasverträge im Auftrag von Top-Anbietern wie E.ON,
                      Vattenfall, O2 und Lekker Energie. Diese Partnerschaften sichern uns langfristige Projekte —
                      und Dir einen stabilen Arbeitsplatz.
                    </p>
                  </div>

                  <div>
                    <img src="/images/team/milan-portrait.png" alt="Milan Jasieniecki, Gründer von MQ-Connect" className="h-48 w-full rounded-lg object-cover object-top shadow-sm" />
                    <h3 className="mt-5 text-[17px] font-bold">Mit System zum Erfolg</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      Umfassende Einarbeitung, erprobte Sales-Skripte und Mindset-Coaching: Unser
                      Ausbildungssystem hat schon zahlreichen Quereinsteigern den Weg nach oben geebnet —
                      vom ersten Probetag bis zum Teamleiter.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <FunnelCta onClick={() => goTo('q1')}>Jetzt in unter 2 Minuten bewerben!</FunnelCta>
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

              {/* Standort */}
              <SectionBand>Unser Büro in Moers</SectionBand>
              <div className="px-5 py-8 text-center">
                <img src="/images/office.jpg" alt="Büro von MQ-Connect in Moers" className="h-44 w-full rounded-lg object-cover" />
                <p className="mt-4 text-[15px] font-semibold text-slate-700">{APP_CONFIG.ADDRESS}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=MQ-Connect%20Uerdinger%20Str.%2077%2047441%20Moers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-bold text-[#5687BC] underline"
                >
                  In Google Maps öffnen
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

              <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="h-56 w-full object-cover" />

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

              <img src="/images/hero-bg-door-v2.jpg" alt="Unterwegs im Einsatzgebiet" className="h-56 w-full object-cover" />
            </m.div>
          )}

          {/* -------------------------------- Frage 1 -------------------------------- */}
          {step === 'q1' && (
            <m.div key="q1" {...stepMotion} className="px-5 py-8">
              <p className="text-center text-[15px] text-slate-600">
                Um Dich besser kennenzulernen, haben wir <strong>4 kurze Fragen</strong> an Dich.
              </p>
              <div className="-mx-5 mt-6 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white">Frage 1 von 4</div>
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
                <FunnelCta onClick={() => goTo('q2')}>Weiter</FunnelCta>
              </div>
            </m.div>
          )}

          {/* -------------------------------- Frage 2 -------------------------------- */}
          {step === 'q2' && (
            <m.div key="q2" {...stepMotion} className="px-5 py-8">
              <div className="-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white">Frage 2 von 4</div>
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
              <div className="-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white">Frage 3 von 4</div>
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
                      goTo(opt.label === 'Ja' ? 'q4' : 'rejected');
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

          {/* -------------------------------- Frage 4 -------------------------------- */}
          {step === 'q4' && (
            <m.div key="q4" {...stepMotion} className="px-5 py-8">
              <div className="-mx-5 -mt-8 bg-[#1F2147] py-2.5 text-center text-sm font-bold text-white">Letzte Frage</div>
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
            <m.div key="form" {...stepMotion} className="px-5 py-8">
              <h2 className="text-center text-2xl font-black">Perfekt! 🎉</h2>
              <p className="mt-2 text-center text-lg font-extrabold leading-snug">
                Sieht aus, als würde unser Team super zu Dir passen!
              </p>
              <p className="mt-3 text-center text-[15px] text-slate-600">
                Trage hier Deine Kontaktdaten ein — wir melden uns meist innerhalb von 24 Stunden bei Dir. 🤝
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                {(
                  [
                    { key: 'vorname', emoji: '👋', placeholder: 'Dein Vorname', type: 'text', required: true },
                    { key: 'nachname', emoji: '👤', placeholder: 'Dein Nachname', type: 'text', required: true },
                    { key: 'email', emoji: '✉️', placeholder: 'Deine E-Mail Adresse', type: 'email', required: true },
                    { key: 'telefon', emoji: '📞', placeholder: 'Deine Telefonnummer', type: 'tel', required: true },
                    { key: 'wohnort', emoji: '🏙️', placeholder: 'Dein Wohnort', type: 'text', required: true },
                  ] as const
                ).map((field) => (
                  <label key={field.key} className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 transition-colors focus-within:border-[#5687BC]">
                    <span className="text-lg">{field.emoji}</span>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                    />
                  </label>
                ))}
                <label className="flex items-start gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 transition-colors focus-within:border-[#5687BC]">
                  <span className="text-lg">💬</span>
                  <textarea
                    rows={3}
                    value={form.ziele}
                    onChange={(e) => setForm((prev) => ({ ...prev, ziele: e.target.value }))}
                    placeholder="Was sind Deine nächsten Ziele? Was möchtest Du mit uns erreichen? (optional)"
                    className="w-full resize-none bg-transparent text-base outline-none placeholder:text-slate-400"
                  />
                </label>
                <label className="flex items-start gap-3 px-1 py-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#5687BC]"
                  />
                  <span>
                    <Link to="/datenschutz" target="_blank" className="font-semibold text-[#5687BC] underline">
                      Datenschutzbestimmungen
                    </Link>{' '}
                    gelesen und akzeptiert
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="block w-full overflow-hidden whitespace-nowrap rounded-lg bg-[#5687BC] px-3 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#46759f] hover:shadow-lg disabled:opacity-60"
                >
                  {submitting ? 'Wird gesendet …' : 'Jetzt Bewerbung absenden!'}
                </button>
              </form>
            </m.div>
          )}

          {/* -------------------------------- Danke-Seite -------------------------------- */}
          {step === 'done' && (
            <m.div key="done" {...stepMotion} className="px-5 py-12 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-black">Deine Bewerbung ist eingegangen! 🎉</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                Wir melden uns <strong>meist innerhalb von 24 Stunden</strong> telefonisch oder per WhatsApp bei
                Dir. Danach folgt ein kurzes Kennenlern-Telefonat — und wenn alles passt, Dein Probetag bei uns
                in Moers.
              </p>
              {/* So geht es weiter */}
              <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">So geht es jetzt weiter</p>
                <ol className="mt-4 space-y-4">
                  {[
                    'Wir prüfen Deine Bewerbung und melden uns telefonisch oder per WhatsApp.',
                    'Kurzes Kennenlern-Telefonat — ganz entspannt, ohne Druck.',
                    'Dein Probetag bei uns in Moers: Du lernst das Team und den Job live kennen.',
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-slate-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5687BC] text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      {text}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Du willst schneller sein?</p>
                <a href={`tel:${APP_CONFIG.STAFF_PHONE_NUMBER.replace(/[^+\d]/g, '')}`} className="mt-3 flex items-center gap-3 font-bold text-[#5687BC]">
                  <Phone className="h-5 w-5" /> {APP_CONFIG.STAFF_PHONE_NUMBER}
                </a>
                <a href="mailto:bewerbung@mq-connect.de" className="mt-2 flex items-center gap-3 font-bold text-[#5687BC]">
                  <Mail className="h-5 w-5" /> bewerbung@mq-connect.de
                </a>
                <p className="mt-3 text-sm text-slate-500">
                  Optional: Schick uns Deinen Lebenslauf einfach per E-Mail — ist aber kein Muss.
                </p>
              </div>

              <a
                href="https://www.instagram.com/mq.connect/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-2xl bg-[#1F2147] p-6 text-center font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Folge uns auf Instagram und lerne das Team schon mal kennen! 📸
              </a>
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
              <img src="/images/vision-team.jpg" alt="Das MQ-Connect Team" className="mt-8 h-44 w-full rounded-2xl object-cover" />
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
          <div className="mx-auto h-[5px] max-w-md bg-white">
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
