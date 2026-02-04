import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useSpring, useTransform, m } from 'framer-motion';
import {
  Users, TrendingUp, ShieldCheck, Zap, Globe, Award, CheckCircle2,
  Smartphone, Sun, Trophy, Play
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// --- Static Data (Moved outside components to prevent re-creation) ---

const STATS_DATA = [
  {
    value: 5,
    suffix: "+",
    label: "Jahre Erfahrung",
    sub: "Marktkompetenz",
    emoji: "🗓️",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    value: 80,
    suffix: "+",
    label: "Mitarbeiter ausgebildet",
    sub: "Karriere-Chancen",
    emoji: "🚀",
    gradient: "from-green-600 to-emerald-500"
  },
  {
    value: 6000,
    suffix: "+",
    label: "glückliche Kunden gewonnen",
    sub: "Zufriedene Haushalte",
    emoji: "🤝",
    gradient: "from-purple-600 to-pink-500"
  }
];

const BENEFITS_DATA = [
  {
    emoji: "🚀",
    title: "Für Bewerber",
    subtitle: "Karriere & Cash",
    desc: "Du bekommst die Chance auf ein überdurchschnittliches Einkommen und eine Karriere ohne Glasdecke.",
    tags: ["Top Provision", "Aufstiegschancen"]
  },
  {
    emoji: "🧠",
    title: "Für Dich",
    subtitle: "Mindset & Growth",
    desc: "Du entwickelst dich persönlich weiter. Rhetorik, Selbstbewusstsein und Disziplin für dein ganzes Leben.",
    tags: ["Gratis Coaching", "Persönlichkeitsentwicklung"]
  },
  {
    emoji: "⚡",
    title: "Für Versorger",
    subtitle: "Qualität & Volumen",
    desc: "Unsere Partner (E.ON, Telekom) erhalten saubere Aufträge und glückliche Neukunden ohne Streuverluste.",
    tags: ["Hohe Qualität", "Storno-Quote < 5%"]
  },
  {
    emoji: "🤝",
    title: "Für Partner",
    subtitle: "Scale & Support",
    desc: "Vertriebspartner profitieren von unserer Infrastruktur, dem Backoffice und der Academy.",
    tags: ["Plug & Play", "Infrastruktur"]
  }
];

const AREA_CARDS = [
  {
    title: "Telekommunikation",
    colorClass: "bg-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: Smartphone,
    points: ["Glasfaser (FTTH)", "Highspeed VDSL", "TV & Entertainment"],
    partners: ["Telekom", "O2", "E.ON"]
  },
  {
    title: "Energie",
    colorClass: "bg-amber-400",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: Zap,
    points: ["Stromtarife", "Gastarife", "Kostenoptimierung"],
    partners: ["Vattenfall", "Lekker", "E.ON"]
  },
  {
    title: "Photovoltaik",
    colorClass: "bg-green-500",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    icon: Sun,
    points: ["Leadgenerierung", "Eignungsprüfung", "Terminierung"],
    highlight: {
      label: "HIGHLIGHT",
      text: "2023 Deutschland-Rekord: Höchste Netto-Leads an einem Tag (Vattenfall)."
    },
    badge: "REKORDHALTER"
  }
];

// --- Helper: Static Counter (Optimized) ---
export const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  return <span className="tabular-nums">{value.toLocaleString('de-DE')}{suffix}</span>;
};

// --- Helper: Section Wrapper ---
export const SectionWrapper = ({ children, className = "", id = "" }: { children?: React.ReactNode; className?: string; id?: string; }) => (
  <section id={id} className={cn("py-16 md:py-24 relative overflow-hidden content-visibility-auto", className)}>
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
      {children}
    </div>
  </section>
);

// --- Individual Sections Exports ---

export const D2DSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SectionWrapper className="bg-white border-b border-slate-100">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#004e82] text-xs font-bold uppercase tracking-wider mb-6">
            Persönliche Beratung neu gedacht
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            Was ist <span className="text-[#004e82]">Door-to-Door?</span>
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4 group">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300">
                <Users className="w-6 h-6 text-[#004e82]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ehrliche Beratung vor Ort</h3>
                <p className="text-slate-600 leading-relaxed">
                  Wir sind keine anonyme Stimme am Telefon und kein Algorithmus. Wir sind das Gesicht an der Tür.
                  Wir nehmen uns Zeit, erklären komplexe Produkte einfach und lösen Probleme direkt beim Kunden.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-[#004e82]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Vertrauen statt Verkauf</h3>
                <p className="text-slate-600 leading-relaxed">
                  Hard-Selling war gestern. Unser Ansatz basiert auf echter Bedarfsanalyse.
                  Wenn es für den Kunden keinen Sinn macht, machen wir keinen Abschluss. Das ist unsere Qualitätsgarantie.
                </p>
              </div>
            </div>
          </div>
        </m.div>

        {/* Visual Side - YouTube Video */}
        <div className="relative transform-gpu">
          <div className="relative aspect-video bg-black rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white ring-1 ring-slate-100 group">
            {!isPlaying ? (
              <div
                className="absolute inset-0 w-full h-full cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src="/images/thumbnail-door-to-door.jpg"
                  alt="Video Thumbnail"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay for better button contrast */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Play className="w-6 h-6 text-[#004e82] ml-1 fill-[#004e82]" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/p-mwEVqnsxA?autoplay=1&controls=1&mute=0&rel=0&modestbranding=1&playsinline=1"
                title="Was ist Door-to-Door?"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>

          {/* Decorative Glows (Static) */}
          <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-[#004e82]/10 rounded-full blur-[40px]"></div>
          <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-sky-400/10 rounded-full blur-[40px]"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export const IdentitySection: React.FC = () => (
  <SectionWrapper className="pb-8 md:pb-12">
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

      {/* Left Column: Visual of Milan */}
      <div className="relative order-2 lg:order-1 lg:col-span-5 transform-gpu">
        {/* Abstract Background Element */}
        <div className="absolute top-12 left-12 w-full h-full bg-slate-100 rounded-[3rem] -z-10 transform rotate-3 scale-95"></div>

        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-white group">
          {/* The Image */}
          <div className="aspect-[3.5/5] relative overflow-hidden bg-slate-50">
            <img
              src="/images/team/milan-details.png"
              alt="Milan Jasieniecki - MQ Connect"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Sleek inner border overlay */}
            <div className="absolute inset-0 border-[8px] border-white/20 rounded-[2.5rem] pointer-events-none"></div>
          </div>

          {/* Name Tag / Badge Overlay */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 p-6 rounded-3xl shadow-lg border border-white/50">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-[#004e82] uppercase tracking-widest mb-1">Founder & Head of Sales</p>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Milan Jasieniecki</h3>
              </div>
              <div className="h-10 w-10 bg-[#004e82] rounded-full flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Values & Text */}
      <m.div
        className="order-1 lg:order-2 lg:col-span-7"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#004e82] text-xs font-bold uppercase tracking-wider mb-6">
            Unsere DNA
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Verantwortung hat <br />
            <span className="text-[#004e82]">ein Gesicht</span>
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            Bei MQ-Connect verstecken wir uns nicht hinter Firmenlogos. Milan und das gesamte Team stehen für eine Kultur, in der ein Handschlag noch zählt.
            Wir verbinden die Dynamik eines jungen Teams mit Werten, die bleiben.
          </p>
        </div>

        {/* The Values List */}
        <div className="space-y-4">
          <div>
            <Card className="flex items-start gap-5 p-6 border-slate-100 hover:border-blue-100 transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#004e82] group-hover:scale-110 transition-all duration-300">
                <Globe className="w-6 h-6 text-[#004e82] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#004e82] transition-colors">Radikale Transparenz</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Keine versteckten Klauseln. Wir kommunizieren offen mit Partnern, Mitarbeitern und Kunden – auch wenn es mal unbequem ist.</p>
              </div>
            </Card>
          </div>

          <div>
            <Card className="flex items-start gap-5 p-6 border-slate-100 hover:border-green-100 transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors">Echte Leistung</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Wir ruhen uns nicht aus. Wir messen uns an Ergebnissen und feiern gemeinsame Erfolge. Performance ist unsere Währung.</p>
              </div>
            </Card>
          </div>

          <div>
            <Card className="flex items-start gap-5 p-6 border-slate-100 hover:border-purple-100 transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">Volle Verantwortung</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Wir übernehmen Ownership. Für unsere Fehler, unsere Lernkurve und das Vertrauen unserer Kunden.</p>
              </div>
            </Card>
          </div>
        </div>
      </m.div>
    </div>
  </SectionWrapper>
);

export const StatsSection: React.FC = () => (
  <section className="py-12 md:py-16 bg-white w-full content-visibility-auto">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
      <div className="grid md:grid-cols-3 gap-6">
        {STATS_DATA.map((stat, i) => (
          <div
            key={i}
            className="group relative"
          >
            <div className="relative h-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 md:p-8 text-center overflow-hidden cursor-default">
              <div className="text-4xl md:text-5xl mb-4 filter drop-shadow-sm">
                {stat.emoji}
              </div>
              <div className={`text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-slate-900 font-bold uppercase tracking-widest text-base md:text-lg mb-1">
                {stat.label}
              </h3>
              <p className="text-slate-500 font-medium text-sm">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BenefitsSection: React.FC = () => (
  <SectionWrapper className="bg-slate-50 relative overflow-hidden pt-16 md:pt-24 pb-16 md:pb-24">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] mix-blend-multiply opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] mix-blend-multiply opacity-50"></div>
    </div>

    <div className="relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div
          className="inline-block py-1 px-4 rounded-full bg-blue-50 border border-blue-100 text-[#004e82] text-xs font-bold uppercase tracking-widest mb-6"
        >
          Win-Win Situation
        </div>
        <h2
          className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
        >
          Ein Ecosystem. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004e82] to-blue-500">Nur Gewinner</span>
        </h2>
        <p
          className="text-lg text-slate-600"
        >
          Unser Geschäftsmodell ist darauf ausgelegt, dass jeder profitiert.
          Keine Ellenbogen, sondern gemeinsames Wachstum.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        {BENEFITS_DATA.map((card, i) => (
          <div
            key={i}
            className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5 flex flex-col h-full hover:-translate-y-2"
          >
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:bg-blue-50/50 group-hover:shadow-md ring-1 ring-slate-100">
                {card.emoji}
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">{card.subtitle}</p>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#004e82] transition-colors">{card.title}</h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium flex-grow">
                {card.desc}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                {card.tags.map((tag, t) => (
                  <span key={t} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wide group-hover:bg-blue-50/50 group-hover:border-blue-100/50 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export const OriginSection: React.FC = () => (
  <SectionWrapper>
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Unsere Wurzeln: Die Champions League</h2>
        <p className="text-lg text-slate-600">
          Wir kommen aus der härtesten Schule des Vertriebs: Der Kaltakquise.
        </p>
      </div>

      <div className="relative border-l-4 border-slate-200 pl-8 ml-4 md:ml-0 space-y-16">
        <div className="relative">
          <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-300 border-4 border-white shadow-sm"></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Der Ursprung</h3>
          <p className="text-slate-600 leading-relaxed">
            Alles begann unangemeldet an der Haustür. Ohne Leads, ohne Termine. Nur wir, das Produkt und der Kunde.
            Hier lernt man, was Verkaufen wirklich bedeutet: Menschen in Sekunden zu begeistern.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-[#004e82] border-4 border-white shadow-lg ring-4 ring-blue-50"></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Die Evolution</h3>
          <p className="text-slate-600 leading-relaxed">
            Heute nutzen wir diese DNA für komplexe Ausbauprojekte. Wir kombinieren die Abschlussstärke der Kaltakquise
            mit der Seriosität moderner Projektarbeit. Das Ergebnis: Maximale Effizienz bei höchster Qualität.
          </p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export const TrainingSection: React.FC = () => (
  <SectionWrapper className="bg-white border-y border-slate-100">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Modified Left Column: SHRS Card */}
      <div className="relative flex justify-center md:justify-start">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

        {/* Main Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-6 hover:scale-105 transition-transform duration-300 w-full max-w-md">
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center p-2 bg-slate-50 rounded-2xl border border-slate-100">
            <img
              src="/images/partners/shrs-logo.png"
              alt="SHRS Logo"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-[#004e82] uppercase tracking-widest mb-1">Offizieller Partner</p>
            <p className="font-extrabold text-slate-900 text-xl">SHRS D2D Akademie</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Zertifizierte Qualität</h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Verkaufen ist ein Handwerk, das man lernen kann. Wir überlassen deine Ausbildung nicht dem Zufall.
        </p>

        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Exzellente Ausbildungsqualität</h4>
              <p className="text-sm text-slate-600">Wir investieren massiv in dein Know-how. Praxisnahe Schulungen und Mentoring für maximale Kompetenz.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Exklusive SHRS Schulung</h4>
              <p className="text-sm text-slate-600">Wir sind offizieller Partner der SHRS D2D Akademie. Deine Ausbildung auf höchstem Niveau.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

// --- GERMANY MAP SVG COMPONENT ---
const GermanyMapSVG: React.FC = () => {
  // City data with size categories: 'large' for major cities, 'medium' for regional, 'small' for others
  const cities: Array<{ name: string; x: number; y: number; size: 'large' | 'medium' | 'small'; labelPos?: 'left' | 'right' | 'top' | 'bottom' }> = [
    // North
    { name: "Kiel", x: 215, y: 32, size: 'small', labelPos: 'left' },
    { name: "Rostock", x: 285, y: 28, size: 'small', labelPos: 'right' },
    { name: "Lübeck", x: 240, y: 52, size: 'small', labelPos: 'right' },
    { name: "Hamburg", x: 220, y: 72, size: 'large', labelPos: 'right' },
    // Northwest
    { name: "Bremen", x: 185, y: 98, size: 'medium', labelPos: 'left' },
    { name: "Oldenburg", x: 168, y: 88, size: 'small', labelPos: 'left' },
    { name: "Osnabrück", x: 165, y: 122, size: 'small', labelPos: 'left' },
    // Northeast
    { name: "Berlin", x: 320, y: 100, size: 'large', labelPos: 'right' },
    { name: "Potsdam", x: 305, y: 112, size: 'small', labelPos: 'right' },
    // Central North
    { name: "Hannover", x: 215, y: 118, size: 'large', labelPos: 'right' },
    { name: "Wolfsburg", x: 250, y: 102, size: 'small', labelPos: 'right' },
    { name: "Braunschweig", x: 245, y: 118, size: 'small', labelPos: 'right' },
    { name: "Magdeburg", x: 280, y: 120, size: 'small', labelPos: 'right' },
    { name: "Bielefeld", x: 185, y: 132, size: 'small', labelPos: 'left' },
    { name: "Münster", x: 160, y: 128, size: 'small', labelPos: 'left' },
    { name: "Göttingen", x: 220, y: 152, size: 'small', labelPos: 'right' },
    // East
    { name: "Leipzig", x: 290, y: 168, size: 'large', labelPos: 'right' },
    { name: "Dresden", x: 330, y: 178, size: 'medium', labelPos: 'right' },
    { name: "Jena", x: 272, y: 182, size: 'small', labelPos: 'left' },
    { name: "Erfurt", x: 252, y: 175, size: 'small', labelPos: 'left' },
    { name: "Chemnitz", x: 310, y: 188, size: 'small', labelPos: 'right' },
    // West (Ruhrgebiet)
    { name: "Dortmund", x: 158, y: 145, size: 'small', labelPos: 'left' },
    { name: "Essen", x: 145, y: 150, size: 'small', labelPos: 'left' },
    { name: "Düsseldorf", x: 135, y: 165, size: 'large', labelPos: 'left' },
    { name: "Köln", x: 138, y: 182, size: 'large', labelPos: 'left' },
    { name: "Bonn", x: 145, y: 198, size: 'small', labelPos: 'left' },
    { name: "Aachen", x: 115, y: 182, size: 'small', labelPos: 'left' },
    { name: "Kassel", x: 215, y: 165, size: 'small', labelPos: 'left' },
    // Central
    { name: "Koblenz", x: 150, y: 218, size: 'small', labelPos: 'left' },
    { name: "Frankfurt", x: 185, y: 238, size: 'large', labelPos: 'right' },
    { name: "Wiesbaden", x: 175, y: 228, size: 'small', labelPos: 'left' },
    { name: "Würzburg", x: 225, y: 248, size: 'small', labelPos: 'right' },
    { name: "Bayreuth", x: 270, y: 242, size: 'small', labelPos: 'right' },
    // Southwest
    { name: "Trier", x: 125, y: 245, size: 'small', labelPos: 'left' },
    { name: "Mannheim", x: 180, y: 265, size: 'small', labelPos: 'left' },
    { name: "Kaiserslautern", x: 155, y: 272, size: 'small', labelPos: 'left' },
    { name: "Saarbrücken", x: 138, y: 285, size: 'small', labelPos: 'left' },
    { name: "Karlsruhe", x: 182, y: 295, size: 'small', labelPos: 'left' },
    // Southeast
    { name: "Nürnberg", x: 260, y: 275, size: 'large', labelPos: 'right' },
    { name: "Regensburg", x: 295, y: 295, size: 'small', labelPos: 'right' },
    { name: "Ingolstadt", x: 268, y: 308, size: 'small', labelPos: 'left' },
    { name: "Passau", x: 330, y: 318, size: 'small', labelPos: 'right' },
    // South
    { name: "Stuttgart", x: 205, y: 310, size: 'large', labelPos: 'left' },
    { name: "Ulm", x: 228, y: 325, size: 'small', labelPos: 'left' },
    { name: "Freiburg", x: 168, y: 345, size: 'small', labelPos: 'left' },
    { name: "Augsburg", x: 258, y: 328, size: 'small', labelPos: 'right' },
    { name: "Friedrichshafen", x: 218, y: 365, size: 'small', labelPos: 'left' },
    { name: "München", x: 280, y: 348, size: 'large', labelPos: 'right' },
  ];

  const getFontSize = (size: 'large' | 'medium' | 'small') => {
    switch (size) {
      case 'large': return 13;
      case 'medium': return 11;
      default: return 9;
    }
  };

  const getFontWeight = (size: 'large' | 'medium' | 'small') => {
    return size === 'large' ? 700 : 600;
  };

  return (
    <svg viewBox="0 0 380 420" className="w-full h-auto max-w-lg mx-auto">
      {/* Germany outline path - more accurate shape */}
      <path
        d="M205,8 C215,5 235,8 250,12 C265,8 280,5 295,12 C310,18 325,28 335,42 C345,52 352,68 355,85 C358,102 355,118 350,132 C358,145 362,158 358,172 C355,188 345,202 338,218 C345,235 355,252 358,272 C360,288 355,305 345,322 C338,338 325,352 308,362 C292,372 275,378 258,385 C242,392 225,398 208,398 C192,395 175,388 162,378 C148,368 135,355 125,342 C115,328 108,312 102,298 C95,282 92,265 92,248 C92,232 98,215 108,202 C102,185 98,168 105,152 C112,138 125,125 138,115 C152,105 168,95 182,82 C192,68 198,52 205,35 C208,22 205,12 205,8 Z"
        fill="none"
        stroke="#004e82"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="drop-shadow-sm"
      />

      {/* City dots and labels */}
      {cities.map((city, index) => {
        const fontSize = getFontSize(city.size);
        const fontWeight = getFontWeight(city.size);
        const isLeft = city.labelPos === 'left';
        const textAnchor = isLeft ? 'end' : 'start';
        const xOffset = isLeft ? -8 : 8;

        return (
          <g key={index}>
            <circle
              cx={city.x}
              cy={city.y}
              r={city.size === 'large' ? 5 : city.size === 'medium' ? 4 : 3}
              fill="#004e82"
            />
            <text
              x={city.x + xOffset}
              y={city.y + 4}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fill="#004e82"
              textAnchor={textAnchor}
              className="select-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {city.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// --- RECRUITMENT SECTION ---
const RECRUITMENT_CRITERIA = [
  "Du hast Interesse am Vertrieb und Spaß an regelmäßigem Kontakt mit potentiellen Kunden",
  "Du bist fleißig und hast den Willen, erfolgreicher als der Durchschnitt zu sein.",
  "Du bist vor Ort in Deutschland",
  "Du bist bereit, richtig Gas zu geben, um ein überdurchschnittliches Gehalt zu verdienen.",
];

export const RecruitmentSection: React.FC = () => (
  <SectionWrapper className="bg-white">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Left Column: Text Content */}
      <m.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Wir wachsen!<br />
          Vertriebler im<br />
          Außendienst (m/w/d)<br />
          gesucht
        </h2>

        <p className="text-lg text-slate-700 font-medium mb-8">
          Bewirb dich bei uns wenn du folgende Kriterien erfüllst:
        </p>

        <ul className="space-y-4 mb-10">
          {RECRUITMENT_CRITERIA.map((criterion, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-slate-700 leading-relaxed">{criterion}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link to="/bewerben" className="block mb-4">
          <Button size="lg" fullWidth className="py-5 text-base shadow-lg hover:shadow-xl transition-all">
            Jetzt in unter 5 Minuten Bewerben!
          </Button>
        </Link>
        <p className="text-center text-sm text-slate-500 mb-10">
          ohne Anschreiben und ohne Lebenslauf
        </p>

        {/* Secondary Link */}
        <div className="text-center">
          <p className="text-slate-700 font-medium mb-3">
            Alle offenen Stellenangebote ansehen:
          </p>
          <Link to="/karriere">
            <Button variant="primary" size="sm">
              Karriere
            </Button>
          </Link>
        </div>
      </m.div>

      {/* Right Column: Germany Map Image */}
      <m.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex justify-center lg:justify-end"
      >
        <img
          src="/images/germany-map.png"
          alt="Deutschland Standorte - MQ Connect"
          loading="lazy"
          className="w-full max-w-md lg:max-w-lg h-auto"
        />
      </m.div>
    </div>
  </SectionWrapper>
);

// --- AREA CARD COMPONENT (Simplified, No 3D) ---
interface Area3DCardProps {
  card: any;
  index: number;
}

const Area3DCard: React.FC<Area3DCardProps> = ({ card }) => {
  return (
    <div className="h-full">
      <div
        className="relative h-full bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden group hover:-translate-y-1"
      >
        {/* Top Colored Bar - Reduced height */}
        <div className={`h-1.5 w-full ${card.colorClass} relative z-10`}></div>

        {/* Spot Light Effect - Simplified */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

        {/* Badge (Floating) */}
        {card.badge && (
          <div className="absolute top-6 right-6 z-20">
            <span
              className="bg-red-50 text-red-500 text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-red-100 uppercase tracking-wide shadow-sm flex items-center gap-1"
            >
              <Trophy className="w-3 h-3" /> {card.badge}
            </span>
          </div>
        )}

        <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10">

          {/* Icon Bubble */}
          <div className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <card.icon className={`w-8 h-8 ${card.iconColor}`} />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-slate-900 mb-6">{card.title}</h3>

          {/* List */}
          <ul className="space-y-4 mb-8 flex-1">
            {card.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-3 group/item">
                <span className={`mt-2 w-1.5 h-1.5 rounded-full ${card.colorClass} group-hover/item:scale-150 transition-transform`}></span>
                <span className="text-slate-600 font-medium text-base leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100 mb-6"></div>

          {/* Footer */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              {card.highlight ? card.highlight.label : 'Partner'}
            </p>

            {card.partners ? (
              <div className="flex flex-wrap gap-2">
                {card.partners.map((p: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wide hover:bg-white hover:shadow-sm transition-all cursor-default">
                    {p}
                  </span>
                ))}
              </div>
            ) : card.highlight ? (
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 border border-slate-100 leading-relaxed font-medium flex gap-3 items-start">
                <div className="mt-0.5">🏆</div>
                <div>{card.highlight.text}</div>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
};

export const AreasSection: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="text-center mb-16 md:mb-24">
        <div
          className="inline-block py-1.5 px-4 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6"
        >
          Unsere Spielfelder
        </div>
        <h2
          className="text-4xl md:text-5xl font-extrabold text-slate-900"
        >
          Wo wir <span className="text-[#004e82]">gewinnen</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
        {AREA_CARDS.map((card, index) => (
          <Area3DCard key={index} card={card} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export const ExtendedSections: React.FC = () => {
  return (
    <>
      <D2DSection />
      <IdentitySection />
      <StatsSection />
      <BenefitsSection />
      <OriginSection />
      <TrainingSection />
      <RecruitmentSection />
      <AreasSection />
    </>
  );
};