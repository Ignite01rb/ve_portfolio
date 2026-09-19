import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ImpactCalculator({ isRetroMode }) {
  const [videoType, setVideoType] = useState('commercial');
  const [volume, setVolume] = useState('single');

  // Dynamic calculations based on selection
  const getMetrics = () => {
    switch (videoType) {
      case 'commercial':
        return { retention: '+85%', multiplier: '4.2x', turnaround: '3-5 Days', soundMix: '5.1 Surround & Spatial' };
      case 'youtube':
        return { retention: '+62%', multiplier: '3.8x', turnaround: '2-4 Days', soundMix: 'Stereo & Dialogue Scrubbed' };
      case 'reel':
        return { retention: '+94%', multiplier: '5.5x', turnaround: '24-48 Hours', soundMix: 'High-Pacing Beat Sync' };
      case 'music':
        return { retention: '+78%', multiplier: '4.0x', turnaround: '4-6 Days', soundMix: 'Stem Audio Master' };
      default:
        return { retention: '+75%', multiplier: '3.5x', turnaround: '3-5 Days', soundMix: 'Custom Sound Design' };
    }
  };

  const metrics = getMetrics();

  return (
    <section className="py-20 px-6 max-w-[1320px] mx-auto" id="impact-calculator">
      <ScrollReveal>
        <div className={`border rounded-2xl p-8 lg:p-12 shadow-2xl transition-colors duration-700 glow-card ${
          isRetroMode ? 'bg-white border-[#D5D0F6]' : 'bg-cinematic-card border-cinematic-border'
        }`}>
          
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b ${
            isRetroMode ? 'border-[#D5D0F6]' : 'border-cinematic-border'
          }`}>
            <div>
              <span className={`font-accent text-xs font-bold tracking-widest flex items-center gap-2 mb-2 ${
                isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
              }`}>
                <Calculator size={14} /> // EDITORIAL IMPACT ESTIMATOR
              </span>
              <h2 className={`font-heading font-extrabold text-2xl md:text-4xl tracking-tight uppercase ${
                isRetroMode ? 'text-[#1E2749]' : 'text-white'
              }`}>
                PROJECT PERFORMANCE CALCULATOR
              </h2>
            </div>
            <p className={`text-xs md:text-sm max-w-[440px] ${
              isRetroMode ? 'text-[#334155]' : 'text-white/60'
            }`}>
              Select your campaign format to calculate projected audience retention boost and turnaround timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Input Selectors */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-3">
                <label className={`font-accent text-[0.72rem] font-extrabold tracking-wider ${
                  isRetroMode ? 'text-[#2B3A67]' : 'text-white/80'
                }`}>
                  1. SELECT CAMPAIGN FORMAT
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'commercial', label: 'Commercial Spot' },
                    { id: 'youtube', label: 'YouTube Narrative' },
                    { id: 'reel', label: 'Social Reel (9:16)' },
                    { id: 'music', label: 'Music Video' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setVideoType(opt.id)}
                      className={`p-3.5 rounded-xl font-accent text-xs font-bold border transition-all text-left ${
                        videoType === opt.id
                          ? (isRetroMode ? 'bg-[#6C5CE7] text-white border-[#6C5CE7] shadow-md shadow-[#6C5CE7]/20' : 'bg-gold-accent text-cinematic-bg border-gold-accent shadow-md shadow-gold-accent/20')
                          : (isRetroMode ? 'bg-[#F8F7FF] text-[#2B3A67] border-[#D5D0F6] hover:border-[#6C5CE7]' : 'bg-cinematic-bg text-white/70 border-cinematic-border hover:border-gold-accent')
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className={`font-accent text-[0.72rem] font-extrabold tracking-wider ${
                  isRetroMode ? 'text-[#2B3A67]' : 'text-white/80'
                }`}>
                  2. PROJECT VOLUME
                </label>
                <div className="flex gap-3">
                  {[
                    { id: 'single', label: 'Single Film' },
                    { id: 'series', label: 'Campaign Series (3-5 Videos)' },
                    { id: 'retainer', label: 'Monthly Retainer' },
                  ].map(vol => (
                    <button
                      key={vol.id}
                      onClick={() => setVolume(vol.id)}
                      className={`flex-1 p-3 rounded-xl font-accent text-[0.7rem] font-bold border transition-all ${
                        volume === vol.id
                          ? (isRetroMode ? 'bg-[#6C5CE7] text-white border-[#6C5CE7]' : 'bg-gold-accent text-cinematic-bg border-gold-accent')
                          : (isRetroMode ? 'bg-[#F8F7FF] text-[#2B3A67] border-[#D5D0F6] hover:border-[#6C5CE7]' : 'bg-cinematic-bg text-white/70 border-cinematic-border hover:border-gold-accent')
                      }`}
                    >
                      {vol.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Dynamic Calculated Metric Output Display */}
            <div className={`border rounded-xl p-8 flex flex-col gap-6 ${
              isRetroMode ? 'bg-[#F8F7FF] border-[#D5D0F6]' : 'bg-cinematic-bg border-cinematic-border'
            }`}>
              <span className={`font-accent text-[0.68rem] font-extrabold tracking-widest uppercase ${
                isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
              }`}>
                ESTIMATED EDITORIAL ROI METRICS
              </span>

              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  key={metrics.retention}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border p-4 rounded-xl flex flex-col gap-1 ${
                    isRetroMode ? 'bg-white border-[#D5D0F6]' : 'bg-cinematic-card border-cinematic-border'
                  }`}
                >
                  <span className={`font-accent text-[0.65rem] font-bold flex items-center gap-1 ${
                    isRetroMode ? 'text-[#334155]' : 'text-white/60'
                  }`}>
                    <TrendingUp size={12} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} /> RETENTION BOOST
                  </span>
                  <span className={`font-heading font-extrabold text-3xl ${
                    isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
                  }`}>
                    {metrics.retention}
                  </span>
                </motion.div>

                <motion.div 
                  key={metrics.multiplier}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border p-4 rounded-xl flex flex-col gap-1 ${
                    isRetroMode ? 'bg-white border-[#D5D0F6]' : 'bg-cinematic-card border-cinematic-border'
                  }`}
                >
                  <span className={`font-accent text-[0.65rem] font-bold flex items-center gap-1 ${
                    isRetroMode ? 'text-[#334155]' : 'text-white/60'
                  }`}>
                    <Zap size={12} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} /> VIEW VELOCITY
                  </span>
                  <span className={`font-heading font-extrabold text-3xl ${
                    isRetroMode ? 'text-[#1E2749]' : 'text-white'
                  }`}>
                    {metrics.multiplier}
                  </span>
                </motion.div>
              </div>

              <div className={`flex justify-between items-center pt-4 border-t text-xs ${
                isRetroMode ? 'border-[#D5D0F6] text-[#334155]' : 'border-cinematic-border text-white/70'
              }`}>
                <span className="flex items-center gap-1.5 font-accent font-bold">
                  <Clock size={14} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} /> TURNAROUND: <span className={isRetroMode ? 'text-[#1E2749]' : 'text-white'}>{metrics.turnaround}</span>
                </span>
                <a href="#contact" className={`font-accent font-extrabold underline transition-colors ${
                  isRetroMode ? 'text-[#6C5CE7] hover:text-[#1E2749]' : 'text-gold-accent hover:text-white'
                }`}>
                  Book Slot →
                </a>
              </div>
            </div>

          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
