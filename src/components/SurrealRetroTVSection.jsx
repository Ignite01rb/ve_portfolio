import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { playTapeClick } from '../utils/audio';
import ScrollReveal from './ScrollReveal';

export default function SurrealRetroTVSection({ onOpenShowreel, isRetroMode }) {
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
      className={`w-full relative py-16 overflow-hidden border-y transition-colors duration-700 ${
        isRetroMode ? 'bg-gradient-to-b from-[#87CEEB]/20 via-[#EBE8FB]/50 to-[#F8F7FF] border-[#D5D0F6]' : 'bg-cinematic-card border-cinematic-border'
      }`}
      id="retro-tv-showcase"
    >
      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center">
          
          <ScrollReveal variant="scale">
            <h2 className={`font-heading font-extrabold text-3xl md:text-5xl tracking-tight uppercase mb-6 ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>
              SURREAL CINEMATIC STUDIO
            </h2>
          </ScrollReveal>

          {/* 3D Mossy CRT TV Display Stage */}
          <ScrollReveal delay={150} variant="scale" className="w-full flex justify-center">
            <div 
              style={{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }}
              className="relative w-full max-w-[620px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 group cursor-pointer transition-transform duration-300 glow-card"
              onClick={() => { onOpenShowreel(); playTapeClick(); }}
              data-cursor="PLAY REEL"
            >
              <img 
                src="assets/surreal_retro_tv.png" 
                alt="Surreal Retro CRT TV Monitor displaying Video Editing Timeline" 
                className="w-full h-auto object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Live Playback Indicator */}
              <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md text-white font-accent text-[0.68rem] font-extrabold px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>NLE STREAMING SUITE</span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="w-20 h-20 bg-gold-accent text-cinematic-bg rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play size={32} className="ml-1 fill-cinematic-bg" />
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
