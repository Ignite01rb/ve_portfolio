import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineVisualizer() {
  return (
    <div className="w-full bg-cinematic-card/90 border border-white/10 rounded-xl p-4 font-mono text-[0.65rem] shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Track Controls Header */}
      <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5 font-accent text-[0.6rem] tracking-wider uppercase">
        <div className="flex items-center gap-3">
          <span className="text-gold-accent font-bold">TIMELINE SEQUENCE: 4K_IMAX_MASTER</span>
          <span>24.00 FPS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/60">REC 00:02:14:18</span>
        </div>
      </div>

      {/* NLE Tracks Grid */}
      <div className="space-y-2 mt-3 relative">
        
        {/* Animated Red Playhead Needle */}
        <motion.div 
          animate={{ x: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] pointer-events-none"
        >
          <div className="w-2.5 h-2.5 bg-red-500 -translate-x-[4px] -top-1 relative clip-polygon" />
        </motion.div>

        {/* Track 1: V1 Video Track */}
        <div className="flex items-center gap-2">
          <span className="w-6 text-gold-accent font-bold">V1</span>
          <div className="flex-grow h-6 bg-cinematic-bg border border-white/5 rounded flex items-center p-1 gap-1 overflow-hidden">
            <div className="h-full bg-indigo-900/60 border border-indigo-500/40 rounded px-2 flex items-center text-indigo-200 text-[0.55rem] font-bold w-1/3">
              CLIP_001.MOV
            </div>
            <div className="h-full bg-indigo-900/80 border border-indigo-500/50 rounded px-2 flex items-center text-indigo-200 text-[0.55rem] font-bold w-1/2">
              PORSCHE_SHOT_04.MOV
            </div>
          </div>
        </div>

        {/* Track 2: V2 VFX & Motion Track */}
        <div className="flex items-center gap-2">
          <span className="w-6 text-purple-400 font-bold">V2</span>
          <div className="flex-grow h-6 bg-cinematic-bg border border-white/5 rounded flex items-center p-1 gap-1 overflow-hidden">
            <div className="h-full bg-purple-900/60 border border-purple-500/40 rounded px-2 flex items-center text-purple-200 text-[0.55rem] font-bold w-1/4 ml-12">
              TITLE_LOWER_THIRD
            </div>
            <div className="h-full bg-purple-900/80 border border-purple-500/50 rounded px-2 flex items-center text-purple-200 text-[0.55rem] font-bold w-1/3">
              COMP_3D_PARTICLES
            </div>
          </div>
        </div>

        {/* Track 3: A1 Foley Audio Track */}
        <div className="flex items-center gap-2">
          <span className="w-6 text-emerald-400 font-bold">A1</span>
          <div className="flex-grow h-6 bg-cinematic-bg border border-white/5 rounded flex items-center p-1 gap-1 overflow-hidden">
            <div className="h-full bg-emerald-900/60 border border-emerald-500/40 rounded px-2 flex items-center text-emerald-200 text-[0.55rem] font-bold w-full">
              FOLEY_ENGINE_ROAR_5.1.WAV
            </div>
          </div>
        </div>

        {/* Track 4: A2 Dialogue Track */}
        <div className="flex items-center gap-2">
          <span className="w-6 text-amber-400 font-bold">A2</span>
          <div className="flex-grow h-6 bg-cinematic-bg border border-white/5 rounded flex items-center p-1 gap-1 overflow-hidden">
            <div className="h-full bg-amber-900/60 border border-amber-500/40 rounded px-2 flex items-center text-amber-200 text-[0.55rem] font-bold w-2/3">
              VOICEOVER_MASTER_RE.709.WAV
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
