import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Download, Sparkles } from 'lucide-react';
import { playTapeClick } from '../utils/audio';

export default function SurrealRetroHero({ onOpenShowreel, isRetroMode }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.03;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.03;
    setTilt({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className={`relative px-6 py-12 lg:py-24 max-w-[1320px] mx-auto overflow-hidden transition-colors duration-700 ${
        isRetroMode ? 'bg-gradient-to-b from-[#87CEEB]/20 via-[#EBE8FB]/50 to-transparent' : ''
      }`}
      id="hero"
    >
      {/* Floating Dandelion Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -140],
              x: [0, (i % 2 === 0 ? 30 : -30)],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(i * 8.5) % 100}%`,
              top: `${80 + (i * 3) % 20}%`,
            }}
            className="absolute w-2 h-2 bg-white/80 rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* GIANT 3D BACKGROUND TYPOGRAPHY: "PORTFOLIO" (Matching Screenshot 4) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none text-center w-full">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isRetroMode ? 0.18 : 0.06, y: 0 }}
          transition={{ duration: 1 }}
          className={`font-heading font-extrabold text-7xl md:text-[11rem] lg:text-[14rem] leading-none tracking-tight uppercase ${
            isRetroMode ? 'text-[#2B3A67] drop-shadow-lg' : 'text-white'
          }`}
        >
          PORTFOLIO
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center relative z-10 pt-10 md:pt-16">
        
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full w-fit shadow-md border ${
              isRetroMode ? 'bg-white/90 border-[#D5D0F6] text-[#2B3A67]' : 'bg-cinematic-card border-white/10 text-gold-accent'
            }`}>
              <Sparkles size={14} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} />
              <span className="font-accent text-[0.72rem] font-extrabold tracking-widest uppercase">
                VIDEO EDITOR • DAVINCI COLORIST • MOTION ARTIST
              </span>
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`font-heading font-extrabold text-5xl md:text-7xl lg:text-[4.75rem] leading-[0.94] tracking-tight uppercase ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}
          >
            RAAGHAV<br />
            <span className="inline-flex items-center gap-4 text-gold-accent">
              BISHT
              <span className={`w-14 h-14 rounded-full inline-flex items-center justify-center shadow-xl animate-spin-slow ${
                isRetroMode ? 'bg-[#6C5CE7] text-white' : 'bg-gold-accent text-cinematic-bg'
              }`}>
                <Play size={24} className="fill-current ml-1" />
              </span>
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-lg max-w-[540px] leading-relaxed ${
              isRetroMode ? 'text-[#334155]' : 'text-white/70'
            }`}
          >
            Sculpting cinematic narratives through <strong className={`font-bold underline underline-offset-4 ${isRetroMode ? 'text-[#1E2749] decoration-[#6C5CE7]' : 'text-white decoration-gold-accent'}`}>RHYTHMIC EDITING</strong> and advanced post-production choreography in DaVinci Resolve, Premiere Pro, After Effects & CapCut.
          </motion.p>

          {/* Software Badge Row (DaVinci, CapCut, Premiere, After Effects, Photoshop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-2.5 items-center mt-1"
          >
            <span className="font-accent text-xs font-bold tracking-wider opacity-60 uppercase mr-2">SOFTWARE SUITE:</span>
            
            {/* DaVinci Badge */}
            <span className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-white border border-white/20 font-accent text-xs font-extrabold flex items-center gap-2 shadow-md">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="w-2 h-2 rounded-full bg-sky-500" />
              </span>
              DaVinci Resolve
            </span>

            {/* CapCut Badge */}
            <span className="px-3 py-1.5 rounded-lg bg-black text-white border border-white/20 font-heading font-extrabold text-xs shadow-md">
              <span className="text-emerald-400 mr-1">Cc</span> CapCut Pro
            </span>

            {/* Premiere Pro Badge */}
            <span className="px-3 py-1.5 rounded-lg bg-[#00005B] text-[#9999FF] border border-[#141480] font-heading font-extrabold text-xs shadow-md">
              Pr Premiere Pro
            </span>

            {/* After Effects Badge */}
            <span className="px-3 py-1.5 rounded-lg bg-[#00005B] text-[#D6A2FF] border border-[#141480] font-heading font-extrabold text-xs shadow-md">
              Ae After Effects
            </span>

            {/* Photoshop Badge */}
            <span className="px-3 py-1.5 rounded-lg bg-[#001E36] text-[#31A8FF] border border-[#003366] font-heading font-extrabold text-xs shadow-md">
              Ps Photoshop
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-3"
          >
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              onClick={playTapeClick}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-accent text-sm font-bold tracking-wider shadow-lg transition-all ${
                isRetroMode ? 'bg-[#6C5CE7] text-white shadow-[#6C5CE7]/30 hover:bg-[#5B4BC4]' : 'bg-gold-accent text-cinematic-bg shadow-gold-accent/20 hover:bg-white'
              }`}
            >
              Initiate Project
            </motion.a>
            
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { onOpenShowreel(); playTapeClick(); }}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border font-accent text-sm font-bold tracking-wider shadow-md transition-all ${
                isRetroMode ? 'bg-white text-[#2B3A67] border-[#D5D0F6] hover:border-[#6C5CE7]' : 'bg-cinematic-card text-white border-white/10 hover:border-gold-accent hover:text-gold-accent'
              }`}
            >
              Explore Showreel <ArrowRight size={16} />
            </motion.button>

            <a 
              href="#about" 
              onClick={playTapeClick}
              className={`inline-flex items-center gap-2 font-accent text-sm font-bold underline underline-offset-8 px-3 py-2 transition-colors ${
                isRetroMode ? 'text-[#2B3A67] hover:text-[#6C5CE7]' : 'text-white/80 hover:text-gold-accent'
              }`}
            >
              Curriculum Vitae <Download size={16} />
            </a>
          </motion.div>

        </div>

        {/* Right Stage: 3D Mossy CRT TV Display (Matching Screenshot 1 & 4) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[460px] flex justify-center items-center py-4"
          >
            
            {/* Ambient Backlight Ring */}
            <div className={`absolute inset-0 rounded-full blur-3xl pointer-events-none ${
              isRetroMode ? 'bg-[#6C5CE7]/20' : 'bg-gold-accent/15'
            }`} />

            {/* Surreal 3D Retro TV Display Box */}
            <div 
              style={{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }}
              className="relative z-10 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group cursor-pointer transition-transform duration-300"
              onClick={() => { onOpenShowreel(); playTapeClick(); }}
              data-cursor="PLAY REEL"
            >
              <img 
                src="assets/surreal_retro_tv.png" 
                alt="Surreal Retro CRT TV displaying Video Editing Timeline" 
                className="w-full h-auto object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-20 bg-black/75 backdrop-blur-md text-white font-accent text-[0.68rem] font-extrabold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>NLE TIMELINE STREAMING</span>
              </div>
            </div>

            {/* Floating 3D Software Badges Around TV */}
            
            {/* DaVinci Resolve Floating Badge */}
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 left-2 z-20 bg-[#1A1A1A] border border-white/20 p-3 rounded-full shadow-2xl backdrop-blur-md"
              title="DaVinci Resolve Studio"
            >
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              </div>
            </motion.div>

            {/* CapCut Floating Badge */}
            <motion.div 
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 -right-3 z-20 bg-black text-white border border-white/20 font-heading font-extrabold text-sm px-3.5 py-1.5 rounded-xl shadow-2xl"
              title="CapCut Pro"
            >
              <span className="text-emerald-400 font-extrabold">Cc</span> CapCut
            </motion.div>

            {/* Premiere Pro Floating Badge */}
            <motion.div 
              animate={{ y: [-6, 8, -6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-16 -left-4 z-20 bg-[#00005B] text-[#9999FF] border border-[#141480] font-heading font-extrabold text-lg px-4 py-2 rounded-xl shadow-2xl"
              title="Adobe Premiere Pro CC"
            >
              Pr
            </motion.div>

            {/* After Effects Floating Badge */}
            <motion.div 
              animate={{ y: [8, -6, 8] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 -right-3 z-20 bg-[#00005B] text-[#D6A2FF] border border-[#141480] font-heading font-extrabold text-lg px-4 py-2 rounded-xl shadow-2xl"
              title="Adobe After Effects CC"
            >
              Ae
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
