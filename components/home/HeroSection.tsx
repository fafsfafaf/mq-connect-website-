import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextRotate } from '../ui/TextRotate';
import { Hero3DVisual } from './Hero3DVisual';
import { HERO_DATA } from '../../data/home';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[50vh] md:min-h-[85vh] flex flex-col justify-start overflow-hidden bg-slate-900">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_DATA.backgroundImageUrl}
          alt="Office Building"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        {/* Complex Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40"></div>

        {/* Animated Light Effects (Spotlights/Glow) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Blue Glow Top Left */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-[#004e82]/30 blur-[120px] rounded-full animate-pulse"></div>
          {/* White Glow Center-Right (Moving) */}
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full animate-[bounce_12s_infinite]"></div>
          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full pt-16 md:pt-8 pb-32 md:pb-8 flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up max-w-3xl">
            <div>
              <TextRotate
                words={HERO_DATA.rotatingWords}
                staticText={HERO_DATA.staticHeadline}
              />
              <p className="mt-6 text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                {HERO_DATA.subheadline}
              </p>
            </div>

            {/* Buttons: Forced to single line on desktop with xl:flex-row and whitespace-nowrap */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full items-stretch sm:items-center">
              <Link to="/fuer-produktgeber">
                <Button variant="primary" size="lg" className="shadow-[0_0_30px_rgba(0,78,130,0.6)] hover:shadow-[0_0_40px_rgba(0,78,130,0.8)] transition-shadow duration-300 w-full sm:w-auto whitespace-nowrap">
                  {HERO_DATA.primaryButtonText}
                </Button>
              </Link>
              <Link to="/karriere">
                {/* REFACTOR: Removed backdrop-blur-sm, used bg-white/10 for safe semi-transparency */}
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 hover:bg-white/20 w-full sm:w-auto whitespace-nowrap">
                  {HERO_DATA.secondaryButtonText}
                </Button>
              </Link>
            </div>

            {/* Badges Row - Modernized */}
            <div className="pt-6 flex flex-wrap items-center gap-4">

              {/* Google Badge Glassmorphism REFACTOR: Use bg-slate-800/80 instead of blur */}
              <div className="group relative bg-slate-800/80 rounded-xl p-3 flex items-center gap-3 border border-white/10 cursor-default">
                <div className="bg-white p-1.5 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-.6z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Google bewertet</div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-lg">{HERO_DATA.trustBadges.googleRating}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kununu Top Company Badge REFACTOR: Remove blur */}
              <div className="h-16 w-auto bg-slate-800/80 rounded-xl p-2 border border-white/10">
                <img
                  src={HERO_DATA.trustBadges.kununuUrl}
                  alt="Kununu Top Company Badge"
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* IHK Badge */}
              {HERO_DATA.trustBadges.ihkUrl && (
                <div className="h-16 w-auto bg-white rounded-xl p-1 border border-white/20">
                  <img
                    src={HERO_DATA.trustBadges.ihkUrl}
                    alt="IHK Ausbildungssiegel"
                    className="h-full w-auto object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Side - New 3D Visual */}
          <div className="hidden lg:block h-full min-h-[500px] xl:min-h-[600px] relative">
            <Hero3DVisual />
          </div>

        </div>
      </div>

      {/* --- LIGHT EFFECT & MORPHING WAVE --- */}

      {/* Subtle Horizontal Aurora Light Line */}
      <div className="absolute bottom-[40px] md:bottom-[100px] left-0 w-full h-[2px] z-20 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[2px] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[4px]"></div>
      </div>

      {/* Wave Divider with Morph Effect */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <svg className="block w-full h-[60px] md:h-[120px] drop-shadow-[0_-10px_20px_rgba(255,255,255,0.2)]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <path fill="#ffffff" fillOpacity="1" d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,266.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                    M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,266.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                    M0,260L48,255C96,250,192,240,288,245C384,250,480,260,576,250C672,240,768,220,864,235C960,250,1056,260,1152,250C1248,240,1344,230,1392,225L1440,220L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                    M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,266.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>
    </section>
  );
};