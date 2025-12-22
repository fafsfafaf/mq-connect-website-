
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
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

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

// Helper Hook to load YouTube API
const useYouTubeApi = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => setIsReady(true);
  }, []);

  return isReady;
};

// Hook for responsive check
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// Internal Player Component
const YouTubePlayer: React.FC<{
  videoId: string;
  isMuted: boolean;
  onEnded: () => void;
}> = ({ videoId, isMuted, onEnded }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!window.YT || !playerRef.current) return;

    playerInstance.current = new window.YT.Player(playerRef.current, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        mute: isMuted ? 1 : 0,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(50);
          event.target.playVideo();
          if (isMuted) event.target.mute();
          setIsReady(true);
        },
        onStateChange: (event: any) => {
          if (event.data === 0) onEnded();
          if (event.data === 1) setIsPlaying(true);
          if (event.data === 2) setIsPlaying(false);
        },
      },
    });

    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (playerInstance.current && isReady) {
      if (isMuted) {
        playerInstance.current.mute();
      } else {
        playerInstance.current.unMute();
      }
    }
  }, [isMuted, isReady]);

  const togglePlay = () => {
    if (playerInstance.current && isReady) {
      if (isPlaying) {
        playerInstance.current.pauseVideo();
      } else {
        playerInstance.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-full group">
      <div onClick={togglePlay} className="absolute inset-0 z-10 cursor-pointer" />
      <div ref={playerRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900 p-6 rounded-full border-2 border-slate-700 text-white shadow-xl shadow-black/50"
        >
          {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
        </motion.div>
      </div>
    </div>
  );
};

export const VideoReelsSection: React.FC = () => {
  const items = React.useMemo<CarouselItem[]>(() => [
    ...YOUTUBE_REELS.map(reel => ({ type: 'video' as const, data: reel })),
    INSTAGRAM_ITEM
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const isMobile = useIsMobile();

  useYouTubeApi();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white content-visibility-auto">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <EtheralShadow color="#BAE6FD" animation={{ scale: 50, speed: 10 }} noise={{ opacity: 0.1, scale: 0.5 }} sizing="stretch" />
        <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column */}
          <div className="max-w-lg mx-auto lg:mx-0 lg:pl-20 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-[#004e82] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Insights & Culture
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Echte Einblicke <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ohne Filter</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Kein Script, keine Schauspieler. Erlebe den echten Alltag bei MQ-Connect.
              Wir nehmen dich mit – vom ersten Pitch bis zum Team-Event.
            </p>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-3">
                <button onClick={handlePrev} className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-[#004e82] hover:text-white transition-all flex items-center justify-center shadow-md">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-[#004e82] hover:text-white transition-all flex items-center justify-center shadow-md">
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="h-px w-12 bg-slate-200 mx-2"></div>
              <a href="https://www.instagram.com/mq.connect" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-500 hover:text-[#004e82] flex items-center gap-2 transition-colors">
                <Instagram size={18} />
                <span>Folge uns auf Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hybrid Carousel */}
          <div className="relative h-[600px] w-full flex items-center justify-center lg:perspective-[1000px] mt-8 lg:mt-0">
            {items.map((item, index) => {
              let offset = index - activeIndex;
              if (offset > items.length / 2) offset -= items.length;
              if (offset < -items.length / 2) offset += items.length;

              const isActive = index === activeIndex;

              // On mobile, only render active item to save resources and ensure no overflow issues
              if (isMobile && !isActive) return null;

              // On desktop, limit visual render depth
              if (!isMobile && Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={item.type === 'video' ? item.data.videoId : 'insta'}
                  className={`absolute w-[300px] sm:w-[320px] aspect-[9/16] rounded-[2rem] shadow-2xl transition-all duration-500 ease-out cursor-pointer border-4 border-white overflow-hidden
                      ${isActive ? 'z-30 cursor-default shadow-[0_25px_60px_rgba(0,0,0,0.3)]' : 'z-10 hover:z-20'}
                  `}
                  onClick={() => handleCardClick(index)}
                  initial={false}
                  animate={isMobile ? {
                    // MOBILE: Simple Flat View
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    z: 0
                  } : {
                    // DESKTOP: 3D Carousel View
                    rotateY: isActive ? 0 : offset < 0 ? 15 : -15,
                    scale: isActive ? 1 : 0.85,
                    z: isActive ? 0 : -100,
                    x: isActive ? '0%' : offset < 0 ? '-80%' : '80%',
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? 'brightness(1)' : 'brightness(0.95)'
                  }}
                >
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full bg-slate-900">
                      {(isActive && isInView) ? (
                        <YouTubePlayer
                          videoId={item.data.videoId}
                          isMuted={isMuted}
                          onEnded={handleNext}
                        />
                      ) : (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${item.data.videoId}/maxresdefault.jpg`}
                            alt={item.data.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </>
                      )}

                      <div className="absolute bottom-0 left-0 w-full p-6 text-left pointer-events-none z-20">
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="w-8 h-1 bg-blue-500 mb-3 rounded-full"></div>
                            <h3 className="text-2xl font-bold text-white mb-1 leading-tight text-shadow-lg">{item.data.title}</h3>
                            <p className="text-sm text-slate-100 font-medium tracking-wide text-shadow">{item.data.subtitle}</p>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="pointer-events-auto p-3 rounded-full bg-slate-900 border-2 border-slate-700 text-white hover:bg-black transition-all shadow-md">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1">
                      <div className="w-full h-full bg-white rounded-[1.8rem] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
                        <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl">
                          <Instagram className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Instagram?</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium px-4">
                          Möchtest du dir unser Profil auf Instagram anschauen?
                        </p>
                        <button onClick={() => window.open('https://www.instagram.com/mq.connect', '_blank')} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg mb-2 flex items-center justify-center gap-2">
                          <Instagram size={16} /> Ja, zum Profil
                        </button>
                        <button onClick={handleNext} className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">Nein, weiter</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Mobile Navigation Buttons (Below Video) - Only visible on Mobile */}
            <div className="absolute -bottom-24 lg:hidden flex items-center justify-center gap-4 w-full max-w-[320px]">
              <Button variant="secondary" onClick={handlePrev} className="flex-1 py-6 rounded-2xl border-slate-200">
                <ChevronLeft className="mr-2" /> Zurück
              </Button>
              <Button variant="secondary" onClick={handleNext} className="flex-1 py-6 rounded-2xl border-slate-200">
                Nächstes <ChevronRight className="ml-2" />
              </Button>
            </div>

            {/* Mobile Instagram Link - Only visible on Mobile */}
            <div className="absolute -bottom-36 lg:hidden">
              <a href="https://www.instagram.com/mq.connect" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-400 hover:text-[#004e82] flex items-center gap-2 transition-colors">
                <Instagram size={16} />
                <span>MQ Stories ansehen</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};