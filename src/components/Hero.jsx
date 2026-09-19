import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, ArrowRight } from 'lucide-react';
import TimelineVisualizer from './TimelineVisualizer';

export default function Hero({ onOpenShowreel, isRetroMode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className={`w-full relative overflow-hidden transition-colors duration-700 ${
        isRetroMode ? 'bg-gradient-to-b from-[#87CEEB]/20 via-[#EBE8FB]/50 to-[#F8F7FF]' : 'bg-cinematic-bg'
      }`} 
      id="hero"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <motion.div 
        className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 ${
          isRetroMode ? 'bg-[#6C5CE7]/15' : 'bg-gold-accent/10'
        }`}
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      <div className="max-w-[1320px] mx-auto px-6 py-12 lg:py-20 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Headline & Content) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Minimal Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full w-fit border ${
                isRetroMode ? 'bg-white/90 border-[#D5D0F6] text-[#2B3A67]' : 'bg-cinematic-card/90 border-white/10 text-gold-accent'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  isRetroMode ? 'bg-[#6C5CE7]' : 'bg-gold-accent'
                }`} />
                <span className="font-accent text-[0.72rem] font-extrabold tracking-widest uppercase">
                  CREATIVE DIRECTOR — RAAGHAV BISHT
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`font-heading font-extrabold text-5xl md:text-7xl lg:text-[5rem] leading-[0.94] tracking-tight uppercase ${
                isRetroMode ? 'text-[#1E2749]' : 'text-white'
              }`}
            >
              VIDEO<br />
              <span className="inline-flex items-center gap-4">
                EDITOR
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className={`w-12 h-12 rounded-full inline-flex items-center justify-center shadow-lg cursor-pointer ${
                    isRetroMode ? 'bg-[#6C5CE7] text-white' : 'bg-gold-accent text-cinematic-bg'
                  }`}
                >
                  <Film size={24} />
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`text-base font-semibold max-w-[460px] tracking-wide uppercase opacity-75 ${
                isRetroMode ? 'text-[#334155]' : 'text-white/70'
              }`}
            >
              Rhythmic Pacing • DaVinci Color Grading • Motion VFX
            </motion.p>

            {/* Real-Time NLE Timeline Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TimelineVisualizer />
            </motion.div>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#contact" 
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-accent text-sm font-bold tracking-wider shadow-lg transition-all ${
                  isRetroMode ? 'bg-[#6C5CE7] text-white hover:bg-[#5B4BC4]' : 'bg-gold-accent text-cinematic-bg hover:bg-white'
                }`}
              >
                Initiate Project
              </motion.a>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenShowreel}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border font-accent text-sm font-bold tracking-wider transition-all ${
                  isRetroMode ? 'bg-white text-[#2B3A67] border-[#D5D0F6] hover:border-[#6C5CE7]' : 'bg-cinematic-card text-white border-white/10 hover:border-gold-accent hover:text-gold-accent'
                }`}
              >
                Watch Showreel <ArrowRight size={16} />
              </motion.button>
            </motion.div>

          </div>

          {/* Right Stage: Isolated Portrait Cutout */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[420px] h-[540px] flex justify-center items-center py-4">
              
              {/* Paint Splash Backdrop */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                <svg viewBox="0 0 500 500" className="w-[460px] h-[460px] filter drop-shadow-xl">
                  <path d="M420,120 Q480,240 430,360 Q380,480 240,460 Q100,440 60,320 Q20,200 110,90 Q200,-20 320,40 Z" fill={isRetroMode ? "#2B3A67" : "#18181B"} />
                  <path d="M460,80 C520,200 460,380 340,440 C220,500 80,420 40,280 C0,140 140,20 280,40 C420,60 400,-40 460,80 Z" fill={isRetroMode ? "#6C5CE7" : "#27272A"} opacity="0.5"/>
                </svg>
              </div>

              {/* Cutout Portrait Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full h-[520px] flex items-end justify-center pointer-events-none"
              >
                <img 
                  src="assets/user_cutout.png" 
                  alt="Raaghav Bisht — Senior Video Editor" 
                  className="max-w-none h-[520px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.04] brightness-[0.98]"
                />
              </motion.div>

              {/* Minimal Clean Software Badges (DaVinci & CapCut & Premiere) */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2 }}
                className="absolute top-6 -right-2 z-20 bg-gradient-to-r from-[#003B46] to-[#07575B] text-white border border-white/20 font-heading font-extrabold text-base px-3.5 py-1.5 rounded-xl shadow-xl cursor-pointer flex items-center gap-1.5"
                title="DaVinci Resolve Studio"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Da
              </motion.div>

              <motion.div 
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2 }}
                className="absolute top-28 -left-4 z-20 bg-[#111111] text-white border border-white/20 font-heading font-extrabold text-base px-3 py-1.5 rounded-xl shadow-xl cursor-pointer"
                title="CapCut Pro Master"
              >
                <span className="text-emerald-400 mr-1">Cc</span> CapCut
              </motion.div>

              <motion.div 
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2 }}
                className="absolute bottom-28 -right-2 z-20 bg-[#00005B] text-[#9999FF] border border-[#141480] font-heading font-extrabold text-lg px-3.5 py-1.5 rounded-xl shadow-xl cursor-pointer"
                title="Adobe Premiere Pro"
              >
                Pr
              </motion.div>

              {/* Minimal Status Badge */}
              <div className={`absolute bottom-4 left-6 right-6 z-30 backdrop-blur-md border rounded-xl p-2.5 flex items-center gap-3 shadow-xl ${
                isRetroMode ? 'bg-white/95 border-[#D5D0F6] text-[#2B3A67]' : 'bg-cinematic-card/90 border-white/10 text-white'
              }`}>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="font-accent text-[0.7rem] font-extrabold tracking-wider block uppercase">
                  AVAILABLE FOR HIRE • WORLDWIDE
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
