import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast, smooth, simple progress ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 8;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const doneTimer = setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 350);
      }, 200);
      return () => clearTimeout(doneTimer);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.35, ease: 'easeOut' }
          }}
          className="fixed inset-0 z-[100] bg-[#B81424] bg-halftone-pattern flex flex-col justify-center items-center p-6 selection:bg-[#FFDD00]"
        >
          {/* Simple Clean Comic Card */}
          <motion.div 
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-white border-4 border-black p-8 md:p-12 max-w-sm md:max-w-md w-full text-center shadow-[10px_10px_0_#000] relative"
          >
            {/* Top Issue Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FFDD00] text-black font-bangers text-lg md:text-xl px-4 py-1 border-3 border-black shadow-[4px_4px_0_#000] rotate-[-2deg] whitespace-nowrap">
              ISSUE #2026 • LOADING
            </div>

            {/* Title */}
            <h1 className="font-bangers text-4xl md:text-5xl text-black tracking-wide mt-2">
              RAAGHAV BISHT
            </h1>
            <p className="font-marker text-xs md:text-sm text-[#E52535] mt-1 tracking-widest uppercase">
              Video Editor & Visual Artist
            </p>

            {/* Big Clean Counter */}
            <div className="my-6">
              <span className="font-bangers text-7xl md:text-8xl text-[#B81424] drop-shadow-[4px_4px_0_#000]">
                {progress}%
              </span>
            </div>

            {/* Simple Progress Bar */}
            <div className="w-full bg-black p-1.5 border-3 border-black shadow-[4px_4px_0_#000]">
              <div className="w-full bg-neutral-800 h-3.5 relative overflow-hidden">
                <motion.div 
                  className="h-full bg-[#FFDD00]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-5 flex justify-between items-center text-xs font-mono font-bold text-black border-t-2 border-black/10 pt-4">
              <span className="animate-pulse">LOADING TIMELINE...</span>
              <button 
                onClick={handleSkip}
                className="hover:underline font-bangers text-sm text-[#B81424] cursor-pointer"
              >
                ENTER ⚡
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
