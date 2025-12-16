import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, Play, ExternalLink, ArrowRight } from 'lucide-react';
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
  const items: CarouselItem[] = [
    ...YOUTUBE_REELS.map(reel => ({ type: 'video' as const, data: reel })),
    INSTAGRAM_ITEM
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [playingReelId, setPlayingReelId] = useState<string | null>(null);

  // Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset playing state on slide change
  useEffect(() => {
    setPlayingReelId(null);
  }, [activeIndex]);

  // Navigation Logic
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleCardClick = (index: number) => {
    const item = items[index];
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else if (item.type === 'video') {
      // If clicking the active video card (and not already playing), start playing
      setPlayingReelId(item.data.id);
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
    <section className="py-24 relative overflow-hidden bg-white content-visibility-auto">
      
      {/* --- Dynamic Background (Etheral Shadow - Career Page Style) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <EtheralShadow
             color="#BAE6FD" 
             animation={{ scale: 50, speed: 10 }} 
             noise={{ opacity: 0.1, scale: 0.5 }}
             sizing="stretch"
        />
        {/* Light overlay for better text contrast if needed */}
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
              Echte Einblicke. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ohne Filter.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed font-medium"
            >
              Kein Script, keine Schauspieler. Erlebe den echten Alltag bei MQ-Connect. Vom morgendlichen Meeting bis zum erfolgreichen Abschluss. Spüre den Vibe, bevor du dich bewirbst.
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
            className="relative h-[550px] w-full flex items-center justify-center perspective-[1000px] mt-8 lg:mt-0 macos-layer-fix"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
             {items.map((item, index) => {
                let offset = index - activeIndex;
                const isActive = index === activeIndex;
                
                // Wrap-around logic
                if (offset > items.length / 2) offset -= items.length;
                if (offset < -items.length / 2) offset += items.length;

                // Render optimization
                if (Math.abs(offset) > 2) return null;

                return (
                  <motion.div
                    key={item.type === 'video' ? item.data.id : 'insta'}
                    className={`absolute w-[280px] sm:w-[300px] aspect-[9/16] rounded-3xl shadow-2xl transition-all duration-500 ease-out cursor-pointer macos-layer-fix
                      ${isActive ? 'z-30 cursor-default shadow-[0_20px_50px_rgba(0,0,0,0.2)]' : 'z-10 hover:z-20'}
                    `}
                    onClick={() => handleCardClick(index)}
                    initial={false}
                    animate={{
                      rotateY: isActive ? 0 : offset < 0 ? 20 : -20,
                      scale: isActive ? 1 : 0.85,
                      z: isActive ? 0 : -100,
                      x: isActive ? '0%' : offset < 0 ? '-70%' : '70%', 
                      opacity: isActive ? 1 : 0.4,
                      filter: isActive ? 'brightness(1)' : 'brightness(0.95)'
                    }}
                  >
                    {item.type === 'video' ? (
                      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border border-white/20 group shadow-lg">
                        {isActive && playingReelId === item.data.id ? (
                           <iframe 
                             className="absolute inset-0 w-full h-full"
                             src={`https://www.youtube.com/embed/${item.data.videoId}?autoplay=1&playsinline=1&controls=1&rel=0`}
                             allow="autoplay; encrypted-media; picture-in-picture"
                             allowFullScreen
                             loading="lazy"
                             title={item.data.title}
                             onError={() => {
                                // Fallback: open in new tab if embed fails
                                window.open(`https://youtube.com/shorts/${item.data.videoId}`, "_blank", "noopener,noreferrer");
                             }}
                           />
                        ) : (
                          <>
                            <img 
                              src={`https://img.youtube.com/vi/${item.data.videoId}/maxresdefault.jpg`} 
                              alt={item.data.title}
                              loading="lazy"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none"></div>

                            <div className="absolute bottom-0 left-0 w-full p-6 text-left pointer-events-none">
                               <div className="w-8 h-1 bg-blue-500 mb-3 rounded-full"></div>
                               <h3 className="text-xl font-bold text-white mb-1 leading-tight">{item.data.title}</h3>
                               <p className="text-xs text-slate-300 font-medium tracking-wide">{item.data.subtitle}</p>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                               <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center border border-white/40 backdrop-blur-md group-hover:scale-110 transition-transform">
                                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      // INSTAGRAM CARD
                      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1">
                        <div className="w-full h-full bg-white rounded-[1.3rem] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                           
                           <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                              <Instagram className="w-10 h-10 text-white" />
                           </div>
                           <h3 className="text-2xl font-bold text-slate-900 mb-2">Mehr Content</h3>
                           <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                             Folge uns für Daily Updates aus dem Team.
                           </p>
                           
                           <Button 
                             variant="secondary"
                             size="sm"
                             className="rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 w-full shadow-sm py-3 flex items-center justify-center gap-2"
                             onClick={(e) => {
                               e.stopPropagation();
                               window.open('https://www.instagram.com/mq.connect', '_blank');
                             }}
                           >
                             <ExternalLink className="w-3 h-3" /> ZUM PROFIL
                           </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
             })}
          </div>

        </div>
      </div>
    </section>
  );
};