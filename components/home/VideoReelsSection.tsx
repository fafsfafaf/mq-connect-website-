
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { EtheralShadow } from '../ui/EtheralShadow';

// Local data for YouTube Shorts
const YOUTUBE_REELS = [
  {
    id: '1',
    videoId: 'ZxCsR92Voyw', // Fabian
    title: 'Daily Business',
    subtitle: 'Unterwegs für unsere Kunden'
  },
  {
    id: '2',
    videoId: 'iDVDWGp3990', // Milan
    title: 'Team Spirit',
    subtitle: 'Gemeinsam Ziele erreichen'
  }
];

type CarouselItem =
  | { type: 'video'; data: typeof YOUTUBE_REELS[0] }
  | { type: 'instagram'; id: string };

const INSTAGRAM_ITEM: CarouselItem = { type: 'instagram', id: 'insta-card' };

export const VideoReelsSection: React.FC = () => {
  // Combine Reels + Instagram Card
  const items = React.useMemo<CarouselItem[]>(() => [
    ...YOUTUBE_REELS.map(reel => ({ type: 'video' as const, data: reel })),
    INSTAGRAM_ITEM
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);

  // Visibility detection
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  // Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // --- AUTOPLAY & REDIRECT LOGIC ---
  useEffect(() => {
    const activeItem = items[activeIndex];

    // Handle Instagram Redirect
    if (activeItem.type === 'instagram') {
      const timer = setTimeout(() => {
        window.open('https://www.instagram.com/mq.connect', '_blank');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, items]);

  // Navigation Logic
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white content-visibility-auto">

      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <EtheralShadow
          color="#BAE6FD"
          animation={{ scale: 50, speed: 10 }}
          noise={{ opacity: 0.1, scale: 0.5 }}
          sizing="stretch"
        />
        <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* --- LEFT COLUMN: Content & Controls --- */}
          <div className="max-w-lg mx-auto lg:mx-0 lg:pl-20 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-[#004e82] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Insights & Culture
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
            >
              Echte Einblicke. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ohne Filter.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed font-medium"
            >
              Kein Script, keine Schauspieler. Erlebe den echten Alltag bei MQ-Connect.
              Wir nehmen dich mit – vom ersten Pitch bis zum Team-Event.
            </motion.p>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col lg:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-[#004e82] hover:text-white hover:border-[#004e82] transition-all flex items-center justify-center group active:scale-95 shadow-md"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-[#004e82] hover:text-white hover:border-[#004e82] transition-all flex items-center justify-center group active:scale-95 shadow-md"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="h-px w-12 bg-slate-200 mx-2 hidden lg:block"></div>

              <a href="https://www.instagram.com/mq.connect" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-500 hover:text-[#004e82] flex items-center gap-2 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50">
                <Instagram size={18} />
                <span>Folge uns auf Instagram</span>
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: 3D Carousel --- */}
          <div
            className="relative h-[600px] w-full flex items-center justify-center perspective-[1000px] mt-8 lg:mt-0 macos-layer-fix"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {items.map((item, index) => {
              let offset = index - activeIndex;

              // Wrap-around logic
              if (offset > items.length / 2) offset -= items.length;
              if (offset < -items.length / 2) offset += items.length;

              const isActive = index === activeIndex;

              // Render optimization
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={item.type === 'video' ? item.data.videoId : 'insta'}
                  className={`absolute w - [300px] sm: w - [320px] aspect - [9 / 16] rounded - [2rem] shadow - 2xl transition - all duration - 500 ease - out cursor - pointer macos - layer - fix border - 4 border - white
                      ${isActive ? 'z-30 cursor-default shadow-[0_25px_60px_rgba(0,0,0,0.3)]' : 'z-10 hover:z-20'}
`}
                  onClick={() => handleCardClick(index)}
                  initial={false}
                  animate={{
                    rotateY: isActive ? 0 : offset < 0 ? 15 : -15,
                    scale: isActive ? 1 : 0.85,
                    z: isActive ? 0 : -100,
                    x: isActive ? '0%' : offset < 0 ? '-80%' : '80%',
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? 'brightness(1)' : 'brightness(0.95)'
                  }}
                >
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-slate-900 isolate">
                      {/* Only render iframe if card is active AND section is in view to trigger autoplay */}
                      {(isActive && isInView) ? (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${item.data.videoId}?autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0&loop=1&playlist=${item.data.videoId}`}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="eager"
                          title={item.data.title}
                        />
                      ) : (
                        <>
                          {/* Preview Image when inactive */}
                          <img
                            src={`https://img.youtube.com/vi/${item.data.videoId}/maxresdefault.jpg`}
                            alt={item.data.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </>
                      )}

                      {/* Text Content Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6 text-left pointer-events-none z-20">
                        <div className="w-8 h-1 bg-blue-500 mb-3 rounded-full"></div>
                        <h3 className="text-2xl font-bold text-white mb-1 leading-tight text-shadow-lg">{item.data.title}</h3>
                        <p className="text-sm text-slate-100 font-medium tracking-wide text-shadow">{item.data.subtitle}</p>
                      </div>
                    </div >
                  ) : (
                    // INSTAGRAM CARD
                    <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1">
                      <div className="w-full h-full bg-white rounded-[1.6rem] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                        <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-pink-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Instagram className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Mehr?</h3>
                        <p className="text-slate-500 text-base mb-8 leading-relaxed font-medium">
                          Wir leiten dich weiter zu unserem Instagram Profil...
                        </p>

                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          {isActive && (
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5, ease: "linear" }}
                              className="h-full bg-pink-500"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div >
              );
            })}
          </div >

        </div >
      </div >
    </section >
  );
};