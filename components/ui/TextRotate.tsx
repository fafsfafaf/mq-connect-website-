import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TextRotateProps {
  words: string[];
  staticText: string;
}

export const TextRotate: React.FC<TextRotateProps> = ({ words, staticText }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] drop-shadow-xl">
      <div className="relative inline-block min-w-[200px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            // REFACTOR: Removed 'filter: blur()' to prevent Safari text jitter
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-0 top-0 block font-black italic text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-white to-brand-100 pb-2 macos-layer-fix"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
        {/* Invisible spacer to reserve space for the longest word */}
        <span className="invisible font-black italic block pb-2" aria-hidden="true">
          VERGRÖSSERE
        </span>
      </div>
      <span className="block text-white">
        {staticText}
      </span>
    </h1>
  );
};