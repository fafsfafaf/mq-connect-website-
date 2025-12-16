import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Users, Award } from "lucide-react";
import { HERO_DATA } from "../../data/home";

export const Hero3DVisual = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center
    const relativeX = e.clientX - rect.left - width / 2;
    const relativeY = e.clientY - rect.top - height / 2;

    // Reduced sensitivity by increasing divisor (from 80 to 200)
    x.set(relativeY / 200);
    y.set(-relativeX / 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(mouseX, (val) => `${Math.round(val * 10) / 10}deg`);
  const rotateY = useTransform(mouseY, (val) => `${Math.round(val * 10) / 10}deg`);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full h-full flex items-center justify-center relative z-20 py-8 lg:py-0"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          backfaceVisibility: "hidden", // Safari fix
          WebkitBackfaceVisibility: "hidden" // Safari fix
        }}
        className="relative w-[300px] sm:w-[350px] md:w-[400px] lg:w-[420px] aspect-[3/4] rounded-[2.5rem] bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-2xl border border-slate-700/50 flex flex-col justify-end overflow-visible group will-change-transform"
      >
        {/* Card Shine Effect */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ transform: "translateZ(1px)" }}></div>

        {/* Background Elements inside Card */}
        <div className="absolute inset-2 rounded-[2.2rem] overflow-hidden bg-slate-900 border border-slate-800" style={{ transform: "translateZ(0)" }}>
          {/* Abstract Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

          {/* Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
        </div>

        {/* Main Person Image - Popping out of the frame */}
        {/* REFACTOR: Simplify z-index and use translate3d for safari */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] h-[110%] z-10 pointer-events-none flex items-end justify-center"
          style={{ transform: "translateZ(40px) translateX(-50%)", willChange: "transform" }}
        >
          <img
            src={HERO_DATA.personImageUrl}
            alt="MQ Performer"
            className="max-w-full max-h-full object-contain drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.6)]"
            style={{ WebkitTransform: "translateZ(0)" }} // Force GPU layer
          />
        </div>

        {/* Floating Stats Card - Top Left */}
        <div className="absolute top-16 -left-4 md:-left-8" style={{ transform: "translateZ(60px)" }}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            // Use solid safe glass without blur
            className="bg-white/95 p-3 pr-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-white/40 flex items-center gap-3"
          >
            <div className="bg-green-100 p-2 rounded-xl text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Provision</p>
              <p className="text-slate-900 font-bold text-sm leading-none">High-Ticket</p>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats Card - Bottom Right */}
        <div className="absolute bottom-32 -right-4 md:-right-8" style={{ transform: "translateZ(50px)" }}>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            // Use solid safe glass without blur
            className="bg-white/95 p-3 pr-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-white/40 flex items-center gap-3"
          >
            <div className="bg-blue-100 p-2 rounded-xl text-[#004e82]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Community</p>
              <p className="text-slate-900 font-bold text-sm leading-none">Starkes Team</p>
            </div>
          </motion.div>
        </div>

        {/* Floating Badge Top Right */}
        <div className="absolute top-6 right-6" style={{ transform: "translateZ(30px)" }}>
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
              <Award className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};