import React from 'react';
import { motion } from 'framer-motion';

export default function KineticTicker({ items, speed = 25, reverse = false }) {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-3 bg-cinematic-card/60 border-y border-white/5 backdrop-blur-md select-none">
      <motion.div
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="inline-flex items-center gap-8 font-accent font-extrabold text-[0.72rem] tracking-[0.2em] text-white/50 uppercase"
      >
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-8">
            <span className="hover:text-gold-accent transition-colors">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
