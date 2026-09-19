import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';
import { playTapeClick } from '../utils/audio';
import ScrollReveal from './ScrollReveal';

const LUTS = [
  { id: 'standard', name: 'Rec.709 Standard', filter: 'none', badge: 'REC.709 MASTER GRADE' },
  { id: 'teal-orange', name: 'Blockbuster Teal & Orange', filter: 'contrast(1.2) saturate(1.4) hue-rotate(-15deg)', badge: 'HOLLYWOOD TEAL & ORANGE' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', filter: 'contrast(1.3) saturate(1.8) hue-rotate(45deg)', badge: 'CYBERPUNK NEON LUT' },
  { id: 'vintage', name: 'Vintage 35mm Film', filter: 'sepia(0.35) contrast(1.1) brightness(0.95)', badge: 'KODAK 35MM GRAIN' },
  { id: 'noir', name: 'Monochrome Noir', filter: 'grayscale(1) contrast(1.4)', badge: 'MONOCHROME NOIR' },
];

export default function ColorGradingSlider({ isRetroMode }) {
  const [splitPos, setSplitPos] = useState(50);
  const [activeLut, setActiveLut] = useState(LUTS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percentage = (x / rect.width) * 100;
    setSplitPos(percentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className={`w-full py-24 border-y transition-colors duration-700 ${
      isRetroMode ? 'bg-[#EBE8FB] border-[#D5D0F6]' : 'bg-cinematic-card border-cinematic-border'
    }`} id="color-grading">
      <div className="max-w-[1320px] mx-auto px-6">
        
        <ScrollReveal variant="scale">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <span className={`font-accent text-xs font-bold tracking-widest block mb-2 ${
              isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
            }`}>// DAVINCI RESOLVE SUITE</span>
            <h2 className={`font-heading font-extrabold text-3xl md:text-5xl tracking-tight uppercase ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>INTERACTIVE COLOR GRADING</h2>
            <p className={`text-xs md:text-sm font-semibold tracking-wider uppercase opacity-70 mt-2 ${
              isRetroMode ? 'text-[#334155]' : 'text-white/60'
            }`}>
              Inspect RAW camera log vs graded cinematic master.
            </p>
          </div>
        </ScrollReveal>

        {/* LUT Preset Switcher Pills with Framer Motion layoutId */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {LUTS.map((lut) => {
              const isActive = activeLut.id === lut.id;
              return (
                <button
                  key={lut.id}
                  onClick={() => { setActiveLut(lut); playTapeClick(); }}
                  onMouseEnter={playTapeClick}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-accent text-xs font-bold tracking-wider transition-colors ${
                    isActive
                      ? (isRetroMode ? 'text-white' : 'text-cinematic-bg')
                      : (isRetroMode ? 'text-[#2B3A67] hover:text-[#6C5CE7]' : 'text-white/70 hover:text-white')
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeLutTab"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className={`absolute inset-0 rounded-full shadow-lg z-0 ${
                        isRetroMode ? 'bg-[#6C5CE7] shadow-[#6C5CE7]/30' : 'bg-gold-accent shadow-gold-accent/20'
                      }`}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'font-extrabold' : ''}`}>
                    <Sparkles size={13} /> {lut.name}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Split Comparison Slider Container */}
        <ScrollReveal delay={200} variant="scale">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={(e) => { setIsDragging(true); if (e.touches[0]) handleMove(e.touches[0].clientX); }}
            onTouchMove={(e) => { if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX); }}
            onTouchEnd={handleMouseUp}
            data-cursor="DRAG"
            className="relative w-full max-w-[1100px] h-[340px] md:h-[520px] mx-auto rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/10 glow-card"
          >
            {/* Graded Image Output */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop" 
                alt="Final Graded Shot" 
                style={{ filter: activeLut.filter }}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-5 right-5 bg-gold-accent text-cinematic-bg font-accent text-[0.72rem] font-extrabold tracking-wider px-4 py-2 rounded-full shadow-xl">
                {activeLut.badge}
              </span>
            </div>

            {/* Flat RAW Log Image Overlay (Clipped) */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop" 
                alt="Raw Log Shot" 
                className="w-full h-full object-cover flat-log"
              />
              <span className="absolute top-5 left-5 bg-black/80 backdrop-blur-md text-white font-accent text-[0.72rem] font-extrabold tracking-wider px-4 py-2 rounded-full shadow-xl border border-white/10">
                RAW LOG FOOTAGE
              </span>
            </div>

            {/* Handle */}
            <div 
              className="absolute top-0 bottom-0 z-20 w-1 bg-gold-accent flex flex-col items-center justify-center -translate-x-1/2 drop-shadow-xl"
              style={{ left: `${splitPos}%` }}
            >
              <motion.div 
                whileHover={{ scale: 1.25 }}
                className="w-12 h-12 bg-gold-accent text-cinematic-bg border-2 border-white rounded-full flex items-center justify-center shadow-2xl"
              >
                <ChevronsLeftRight size={20} />
              </motion.div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
