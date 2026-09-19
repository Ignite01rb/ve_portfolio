import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crop } from 'lucide-react';
import { playTapeClick } from '../utils/audio';

export default function Y2KAboutCollage({ isRetroMode }) {
  const sectionRef = useRef(null);
  const [collageTilt, setCollageTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Scroll-driven Photoshop crop expansion physics!
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const cropScale = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [0.9, 1, 1, 0.9]);
  const handleScale = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0.8, 1.1, 1.1, 0.8]);

  const handleCollageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCollageTilt({ rotateX: (y / rect.height) * -12, rotateY: (x / rect.width) * 12 });
  };

  const handleCollageMouseLeave = () => {
    setCollageTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section 
      ref={sectionRef}
      className={`w-full py-20 border-t transition-colors duration-700 relative overflow-hidden ${
        isRetroMode ? 'bg-[#EBE8FB] border-[#D5D0F6] text-[#2B3A67]' : 'bg-cinematic-card border-cinematic-border text-white'
      }`} 
      id="about"
    >
      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        
        {/* Main Grid: Photoshop Crop Box "About Me" & Pop Art Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Photoshop Animated Crop Box Frame */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative">

            {/* Scroll-Driven Photoshop Crop Box */}
            <motion.div 
              style={{ scale: cropScale }}
              className="relative rounded-2xl shadow-xl group"
            >
              
              {/* SVG Animated Marching Ants Border */}
              <div className="absolute inset-0 pointer-events-none z-10 rounded-xl overflow-hidden">
                <svg className="w-full h-full">
                  <rect
                    x="2"
                    y="2"
                    width="99%"
                    height="99%"
                    fill="none"
                    stroke="#6C5CE7"
                    strokeWidth="2"
                    strokeDasharray="8, 8"
                    className="animate-marching-ants"
                  />
                </svg>
              </div>

              {/* Photoshop Corner Transform Handles */}
              {[
                '-top-2 -left-2',
                '-top-2 -right-2',
                '-bottom-2 -left-2',
                '-bottom-2 -right-2',
              ].map((pos, hIdx) => (
                <motion.div
                  key={hIdx}
                  style={{ scale: handleScale }}
                  className={`absolute ${pos} w-3.5 h-3.5 bg-white border-2 border-[#6C5CE7] shadow-md z-20 rounded-sm`}
                />
              ))}

              {/* Card Content Interior */}
              <div className="relative p-8 md:p-10 rounded-xl bg-white/85 backdrop-blur-md z-0 shadow-inner">
                
                <span className="font-accent text-xs font-bold tracking-widest text-[#6C5CE7] block mb-2">// DIRECTORIAL STATEMENT</span>
                
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-[#1E2749] tracking-tight mb-4">
                  ABOUT RAAGHAV
                </h2>

                <p className="text-sm md:text-base text-[#334155] leading-relaxed mb-6 font-medium">
                  6+ years sculpting commercial cuts, music video speed ramps, and broadcast color grading across DaVinci Resolve, CapCut Pro & Adobe Suite.
                </p>

                {/* Clean 3 Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/10">
                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-2xl text-[#1E2749]">50K+</span>
                    <span className="font-accent text-[0.65rem] font-bold text-[#6C5CE7] uppercase">Minutes Cut</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-2xl text-[#1E2749]">98%</span>
                    <span className="font-accent text-[0.65rem] font-bold text-[#6C5CE7] uppercase">Retention</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-2xl text-[#1E2749]">10B+</span>
                    <span className="font-accent text-[0.65rem] font-bold text-[#6C5CE7] uppercase">Views</span>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>

          {/* Right Column: Pop Art Collage */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              onMouseMove={handleCollageMouseMove}
              onMouseLeave={handleCollageMouseLeave}
              animate={{
                rotateX: collageTilt.rotateX,
                rotateY: collageTilt.rotateY,
              }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-white/40 bg-white/30 p-2 cursor-pointer group"
              onClick={playTapeClick}
            >
              <img 
                src="assets/vintage_pop_collage.png" 
                alt="Y2K Pop Art Vintage Camera Collage" 
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-black/10 shadow-md text-center">
                <span className="font-accent text-[0.7rem] font-extrabold text-[#2B3A67] tracking-wider uppercase block">
                  DAVINCI • CAPCUT • PREMIERE • AFTER EFFECTS
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
