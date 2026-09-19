import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Smile, Film, Globe } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function StatsBanner({ isRetroMode }) {
  const [counts, setCounts] = useState({ minutes: 0, satisfaction: 0, commercials: 0, views: 0 });
  const bannerRef = useRef(null);

  useEffect(() => {
    let animId;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1800;
          const startTime = performance.now();

          const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              minutes: Math.floor(ease * 50),
              satisfaction: Math.floor(ease * 98),
              commercials: Math.floor(ease * 200),
              views: Math.floor(ease * 10),
            });

            if (progress < 1) {
              animId = requestAnimationFrame(update);
            }
          };

          animId = requestAnimationFrame(update);
        }
      },
      { threshold: 0.25 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section 
      ref={bannerRef} 
      className={`w-full py-14 px-6 border-y transition-colors duration-700 ${
        isRetroMode ? 'bg-[#EBE8FB] border-[#D5D0F6] text-[#1E2749]' : 'bg-cinematic-card border-cinematic-border text-white'
      }`} 
      id="stats"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-center">
        
        <ScrollReveal delay={100} className="w-full">
          <motion.div 
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl transition-colors ${
              isRetroMode ? 'hover:bg-white/60' : 'hover:bg-white/5'
            }`}
          >
            <Award size={24} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} />
            <div className={`font-heading font-extrabold text-4xl lg:text-5xl tracking-tight ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>
              {counts.minutes}<span className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'}>K+</span>
            </div>
            <p className={`font-accent text-[0.7rem] font-bold tracking-widest uppercase ${
              isRetroMode ? 'text-[#334155]' : 'text-white/60'
            }`}>
              MINUTES OF CONTENT EDITED
            </p>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="w-full">
          <motion.div 
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl transition-colors ${
              isRetroMode ? 'hover:bg-white/60' : 'hover:bg-white/5'
            }`}
          >
            <Smile size={24} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} />
            <div className={`font-heading font-extrabold text-4xl lg:text-5xl tracking-tight ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>
              {counts.satisfaction}<span className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'}>%</span>
            </div>
            <p className={`font-accent text-[0.7rem] font-bold tracking-widest uppercase ${
              isRetroMode ? 'text-[#334155]' : 'text-white/60'
            }`}>
              DIRECTOR SATISFACTION
            </p>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="w-full">
          <motion.div 
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl transition-colors ${
              isRetroMode ? 'hover:bg-white/60' : 'hover:bg-white/5'
            }`}
          >
            <Film size={24} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} />
            <div className={`font-heading font-extrabold text-4xl lg:text-5xl tracking-tight ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>
              {counts.commercials}<span className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'}>+</span>
            </div>
            <p className={`font-accent text-[0.7rem] font-bold tracking-widest uppercase ${
              isRetroMode ? 'text-[#334155]' : 'text-white/60'
            }`}>
              COMMERCIALS DELIVERED
            </p>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={400} className="w-full">
          <motion.div 
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl transition-colors ${
              isRetroMode ? 'hover:bg-white/60' : 'hover:bg-white/5'
            }`}
          >
            <Globe size={24} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} />
            <div className={`font-heading font-extrabold text-4xl lg:text-5xl tracking-tight ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>
              {counts.views}<span className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'}>B+</span>
            </div>
            <p className={`font-accent text-[0.7rem] font-bold tracking-widest uppercase ${
              isRetroMode ? 'text-[#334155]' : 'text-white/60'
            }`}>
              VIEWS GENERATED FOR CLIENTS
            </p>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  );
}
