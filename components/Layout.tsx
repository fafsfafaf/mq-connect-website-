import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, ArrowRight, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from './ui/Button';
import { APP_CONFIG, NAVIGATION_LINKS } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // --- LOGO TUNER STATE ---
  const [logoMobileHeight, setLogoMobileHeight] = useState(56); // Default ~h-14
  const [logoDesktopHeight, setLogoDesktopHeight] = useState(96); // Default ~h-24
  const [navPadding, setNavPadding] = useState(20); // Default ~py-5

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const openCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookie-settings'));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Dynamic Styles for Tuner */}
      <style>{`
        .logo-tuned { height: ${logoMobileHeight}px; }
        @media (min-width: 768px) {
          .logo-tuned { height: ${logoDesktopHeight}px; }
        }
      `}</style>

      {/* Top Bar - Matches screenshot - Z-Index raised to 52 */}
      <div className="bg-[#004e82] text-white py-2 px-4 z-[52] relative">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-end items-center gap-4 text-xs font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 fill-current" />
            <a href={`tel:${APP_CONFIG.STAFF_PHONE_NUMBER.replace(/\s/g, '').replace('/', '')}`}>
              {APP_CONFIG.STAFF_PHONE_NUMBER}
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2 opacity-80">
            <Clock className="w-3 h-3" />
            <span>{APP_CONFIG.OPENING_HOURS}</span>
          </div>
        </div>
      </div>

      {/* Navbar - Z-Index raised to 51 to sit above mobile menu */}
      <nav
        className="bg-white shadow-sm sticky top-0 z-[51] transition-all duration-200"
        style={{ paddingTop: `${navPadding}px`, paddingBottom: `${navPadding}px` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">

          {/* Logo Text Only */}
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <img
              src="/images/mq-logo-large.png"
              alt="MQ-CONNECT"
              className="w-auto object-contain logo-tuned transition-all duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {NAVIGATION_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${link.label === 'MITARBEITER LOGIN' ? 'text-slate-400' : 'text-slate-700 hover:text-[#004e82]'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button "Jetzt bewerben" added to the right */}
            <Link to="/bewerben">
              <Button size="sm" className="ml-2 xl:ml-6 px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                JETZT BEWERBEN
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden z-50 p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Z-Index raised to 50 to cover page content (z-30/40) but sit under Navbar (51) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-50 z-[50] pt-36 px-6 lg:hidden overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-lg">
            {NAVIGATION_LINKS.map(link => (
              <Link key={link.href} to={link.href} className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-4">
                {link.label}
              </Link>
            ))}

            <Link to="/bewerben" className="mt-2">
              <Button fullWidth className="justify-center py-4 text-base">JETZT BEWERBEN</Button>
            </Link>

            <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-500">
              <p className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4" /> {APP_CONFIG.STAFF_PHONE_NUMBER}</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {APP_CONFIG.OPENING_HOURS}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 md:pb-16 pb-32 border-t border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

            {/* Column 1: Brand & Narrative */}
            <div className="space-y-6">
              <Link to="/" className="block">
                <span className="text-2xl font-extrabold tracking-tighter text-white uppercase">MQ-CONNECT</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                MQ-Connect aus Moers in Nordrhein-Westfalen ist eines der erfolgreichsten und am schnellsten wachsenden Vertriebsunternehmen in der D2D Akquise. Wir verbinden exzellente Beratung mit maximaler Skalierbarkeit für Glasfaser und Energieprodukte.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/mq.connect/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-[#004e82] hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Kontakt</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-bold text-white mb-1">{APP_CONFIG.COMPANY_NAME}</div>
                  <div className="text-slate-400 leading-relaxed">
                    Uerdinger Str. 77<br />
                    47441 Moers
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <a href={`tel:${APP_CONFIG.STAFF_PHONE_NUMBER.replace(/\s/g, '').replace('/', '')}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                    <div className="bg-slate-800 p-1.5 rounded-md group-hover:bg-[#004e82] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>{APP_CONFIG.STAFF_PHONE_NUMBER}</span>
                  </a>
                  <a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                    <div className="bg-slate-800 p-1.5 rounded-md group-hover:bg-[#004e82] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>{APP_CONFIG.CONTACT_EMAIL}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Unternehmen</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/ueber-uns" className="hover:text-white hover:translate-x-1 transition-all inline-block">Über uns</Link></li>
                <li><Link to="/karriere" className="hover:text-white hover:translate-x-1 transition-all inline-block">Karriere & Jobs</Link></li>
                <li><Link to="/fuer-produktgeber" className="hover:text-white hover:translate-x-1 transition-all inline-block">Für Partner</Link></li>
                <li><Link to="/blog" className="hover:text-white hover:translate-x-1 transition-all inline-block">Magazin</Link></li>
                <li><Link to="/kontakt" className="hover:text-white hover:translate-x-1 transition-all inline-block">Kontakt</Link></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Rechtliches</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/impressum" className="hover:text-white hover:translate-x-1 transition-all inline-block">Impressum</Link></li>
                <li><Link to="/datenschutz" className="hover:text-white hover:translate-x-1 transition-all inline-block">Datenschutz</Link></li>
                <li><Link to="/cookie-richtlinien" className="hover:text-white hover:translate-x-1 transition-all inline-block">Cookie-Richtlinie</Link></li>
                <li>
                  <button
                    onClick={openCookieSettings}
                    className="hover:text-white hover:translate-x-1 transition-all inline-block text-left"
                  >
                    Cookie-Einstellungen
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} {APP_CONFIG.COMPANY_NAME}. Alle Rechte vorbehalten.</p>
            <p className="flex items-center gap-1">Made in Moers with <span className="text-red-500">♥</span></p>
          </div>
        </div>
      </footer>

      {/* --- LOGO TUNER PANEL --- */}
      <div className="fixed bottom-4 left-4 z-[9999] bg-slate-900/90 text-white p-4 rounded-xl text-xs backdrop-blur-md border border-white/20 shadow-2xl w-64 shadow-black/50">
        <h3 className="font-bold mb-3 text-sm flex items-center gap-2">🛠️ Logo Größe einstellen</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Mobile Höhe</span>
              <span className="font-mono text-cyan-400">{logoMobileHeight}px</span>
            </div>
            <input
              type="range" min="20" max="150" value={logoMobileHeight}
              onChange={e => setLogoMobileHeight(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Desktop Höhe</span>
              <span className="font-mono text-cyan-400">{logoDesktopHeight}px</span>
            </div>
            <input
              type="range" min="40" max="250" value={logoDesktopHeight}
              onChange={e => setLogoDesktopHeight(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Nav Innenabstand</span>
              <span className="font-mono text-cyan-400">{navPadding}px</span>
            </div>
            <input
              type="range" min="5" max="60" value={navPadding}
              onChange={e => setNavPadding(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-400 font-mono bg-black/30 p-2 rounded">
          Mobile: {logoMobileHeight}px | Desk: {logoDesktopHeight}px<br />
          Padding: {navPadding}px
        </div>
      </div>

    </div>
  );
};