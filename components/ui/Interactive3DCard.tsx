import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Users, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Interactive3DCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the rotation
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card
    const relativeX = e.clientX - rect.left - width / 2;
    const relativeY = e.clientY - rect.top - height / 2;

    // Rotate based on mouse position (divided by factor to control sensitivity)
    x.set(relativeY / 20); // Rotate X axis based on Y mouse movement
    y.set(-relativeX / 20); // Rotate Y axis based on X mouse movement
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // 3D Transform styles
  // Round the values to avoid sub-pixel jitter on Safari
  const rotateX = useTransform(mouseX, (val) => `${Math.round(val * 10) / 10}deg`);
  const rotateY = useTransform(mouseY, (val) => `${Math.round(val * 10) / 10}deg`);

  return (
    <div 
      ref={ref}
      className="perspective-1000 w-full h-full flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: rotateX, 
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        // Applied macos-layer-fix class for stability
        className="relative w-full max-w-[500px] aspect-[4/3] bg-white/95 rounded-[2.5rem] border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,78,130,0.15)] flex flex-col p-8 transition-all duration-200 macos-layer-fix"
      >
        {/* Floating Elements (Parallax) */}
        {/* Added macos-layer-fix to children with z-transform */}
        <div style={{ transform: "translateZ(60px)" }} className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 macos-layer-fix">
           <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Status</p>
              <p className="text-slate-900 font-bold">127 Neukunden heute</p>
           </div>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="absolute -bottom-8 -left-4 bg-[#004e82] text-white p-5 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 macos-layer-fix">
           <div className="bg-white/20 p-2 rounded-full">
              <Users className="w-6 h-6 text-white" />
           </div>
           <div>
              <p className="text-xs text-blue-200 font-bold uppercase">Active Sales Force</p>
              <p className="text-white font-bold text-xl">42 Partner</p>
           </div>
        </div>

        {/* Card Content */}
        <div className="flex-1 flex flex-col macos-layer-fix" style={{ transform: "translateZ(20px)" }}>
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-slate-900 font-bold text-lg">Performance Live</h3>
              <p className="text-slate-500 text-sm">Gebiet: NRW / Moers</p>
            </div>
            <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
          </div>

          {/* Chart Simulation */}
          <div className="flex-1 w-full relative mb-4">
             {/* Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-slate-900"></div>
                <div className="w-full h-px bg-slate-900"></div>
                <div className="w-full h-px bg-slate-900"></div>
                <div className="w-full h-px bg-slate-900"></div>
             </div>
             
             {/* The Chart Line */}
             <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                   <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                 </linearGradient>
               </defs>
               <motion.path
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
                 d="M0,50 L10,45 L20,48 L30,35 L40,38 L50,20 L60,25 L70,10 L80,15 L90,5 L100,0"
                 fill="none"
                 stroke="#004e82"
                 strokeWidth="3"
                 strokeLinecap="round"
                 vectorEffect="non-scaling-stroke"
               />
               <motion.path
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 1, delay: 1 }}
                 d="M0,50 L10,45 L20,48 L30,35 L40,38 L50,20 L60,25 L70,10 L80,15 L90,5 L100,0 V50 Z"
                 fill="url(#gradient)"
                 stroke="none"
               />
               {/* Pulsing Dot at the end */}
               <motion.circle 
                 cx="100" cy="0" r="2" fill="#004e82"
                 initial={{ scale: 0 }}
                 animate={{ scale: [1, 1.5, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
               />
             </svg>
          </div>

          <div className="flex justify-between items-end mt-2">
             <div className="bg-slate-50 rounded-xl px-4 py-2 border border-slate-100">
                <span className="text-slate-400 text-xs font-bold uppercase block">Conversion</span>
                <span className="text-slate-900 font-bold text-lg flex items-center gap-1">
                   18.4% <ArrowUpRight className="w-4 h-4 text-green-500" />
                </span>
             </div>
             <div className="text-right">
                <span className="text-brand-600 font-bold text-4xl tracking-tighter">+245%</span>
                <span className="text-slate-400 text-xs font-bold uppercase block tracking-wide">Wachstum Q3</span>
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};