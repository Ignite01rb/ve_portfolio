import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const STEPS = [
  {
    num: '01',
    title: 'INGEST & ASSEMBLY',
    desc: 'Proxy workflows, bin structures & assembly cut.'
  },
  {
    num: '02',
    title: 'PACING & SOUND',
    desc: 'Beat sync, foley layering & dialogue scrub.'
  },
  {
    num: '03',
    title: 'COLOR & VFX',
    desc: 'DaVinci node grading, film grain & motion graphics.'
  },
  {
    num: '04',
    title: 'MASTERING & QC',
    desc: 'ProRes 4444 XQ masters & 9:16 social reframes.'
  }
];

export default function ProcessWorkflow({ isRetroMode }) {
  return (
    <section className={`w-full py-20 relative transition-colors duration-700 ${
      isRetroMode ? 'bg-[#F8F7FF]' : 'bg-cinematic-bg'
    }`} id="process">
      <div className="max-w-[1320px] mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className={`font-accent text-xs font-bold tracking-widest block mb-2 ${
              isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
            }`}>// EDITORIAL METHODOLOGY</span>
            <h2 className={`font-heading font-extrabold text-3xl md:text-5xl tracking-tight uppercase ${
              isRetroMode ? 'text-[#1E2749]' : 'text-white'
            }`}>PROCESS & WORKFLOW</h2>
          </div>
        </ScrollReveal>

        {/* 4 Pipeline Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => (
            <ScrollReveal key={idx} delay={100 + idx * 80}>
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`border rounded-xl p-6 flex flex-col gap-3 transition-colors h-full ${
                  isRetroMode 
                    ? 'bg-white border-[#D5D0F6] hover:border-[#6C5CE7]' 
                    : 'bg-cinematic-card border-cinematic-border hover:border-gold-accent/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-heading font-extrabold text-3xl ${
                    isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
                  }`}>{step.num}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    isRetroMode ? 'bg-[#6C5CE7]' : 'bg-gold-accent'
                  }`} />
                </div>
                
                <h3 className={`font-heading font-extrabold text-base tracking-tight ${
                  isRetroMode ? 'text-[#1E2749]' : 'text-white'
                }`}>{step.title}</h3>
                
                <p className={`text-xs leading-relaxed ${
                  isRetroMode ? 'text-[#334155]' : 'text-white/60'
                }`}>{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
