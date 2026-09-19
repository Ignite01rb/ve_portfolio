import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { playTapeClick } from '../utils/audio';
import ScrollReveal from './ScrollReveal';

const MOTION_PROJECTS = [
  {
    id: 'mg1',
    title: '3D MOTION COMPOSITING & TITLE DESIGN',
    client: 'COMMERCIAL VFX',
    year: '2026',
    format: '4K RAW',
    video: 'videos/Comp 1.mp4',
    altVideo: 'videos/timeline motion.mp4',
    desc: '3D camera motion tracking, particle compositing, kinetic typography & visual effects.',
    tags: ['After Effects', '3D Compositing', 'Kinetic Titles']
  },
  {
    id: 'mg2',
    title: 'NLE TIMELINE MOTION & SOUND MIX',
    client: 'EDITORIAL MOTION',
    year: '2026',
    format: '4K HDR',
    video: 'videos/timeline motion.mp4',
    altVideo: 'videos/Timeline 1.mov',
    desc: 'Timeline motion choreography, multi-layered video transitions & optical motion graphics.',
    tags: ['Motion Graphics', 'Timeline FX', 'Optical Transitions']
  },
  {
    id: 'mg3',
    title: 'KINETIC SUBTITLE & REEL MOTION',
    client: 'SOCIAL MEDIA MOTION',
    year: '2026',
    format: 'Vertical 9:16',
    video: 'videos/0724(4).mp4',
    desc: 'Fast-paced kinetic overlays, subtitle pop animations & rhythmic particle motion.',
    tags: ['Kinetic Text', 'Motion Blur', 'Subtitles']
  },
  {
    id: 'mg4',
    title: 'BRAND COMMERCIAL MOTION CAMPAIGN',
    client: 'DIRECTOR PROMO',
    year: '2026',
    format: '4K 60FPS',
    video: 'videos/core.mp4',
    desc: 'Dynamic brand motion graphics, logo reveals & high-voltage color grading.',
    tags: ['DaVinci Resolve', 'Logo Motion', 'Color Pass']
  }
];

export default function MotionGraphicsSection({ onSelectProject }) {
  return (
    <section id="motion-graphics" className="w-full py-24 bg-[#B81424] bg-halftone-pattern relative text-white border-t-8 border-b-8 border-black selection:bg-[#FFDD00] selection:text-black">
      
      {/* Background Comic Rays */}
      <div className="absolute inset-0 comic-speed-rays opacity-15 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        
        {/* Header Banner */}
        <ScrollReveal variant="scale">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FFDD00] text-black font-bangers text-sm px-4 py-1.5 border-3 border-black shadow-[4px_4px_0_#000] rotate-[-2deg] mb-3">
                <Sparkles size={16} /> SPECIALTY LAB // AFTER EFFECTS & CAVIAR MOTION
              </div>
              <h2 className="font-bangers text-4xl md:text-6xl text-white tracking-wide uppercase drop-shadow-[5px_5px_0_#000]">
                MOTION GRAPHICS
              </h2>
            </div>
            <div className="bg-black text-[#FFDD00] font-bangers text-lg px-5 py-2.5 border-3 border-white shadow-[4px_4px_0_#000] rotate-[1deg]">
              ⚡ 3D COMPOSITING & KINETIC ANIMATION
            </div>
          </div>
        </ScrollReveal>

        {/* Motion Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOTION_PROJECTS.map((proj) => (
            <MotionCard 
              key={proj.id} 
              project={proj} 
              onSelectProject={onSelectProject} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function MotionCard({ project, onSelectProject }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [durationText, setDurationText] = useState('--:--');
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const handleLoadedMetadata = (e) => {
    const dur = e.target.duration;
    if (dur && !isNaN(dur) && dur > 0) {
      const mins = Math.floor(dur / 60);
      const secs = Math.floor(dur % 60);
      setDurationText(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    playTapeClick();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0.5;
      } catch (err) {}
    }
  };

  return (
    <motion.article
      ref={cardRef}
      animate={{ 
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectProject({ ...project, durationText })}
      className="bg-white text-black border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden group cursor-pointer flex flex-col"
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black border-b-4 border-black overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        >
          <source src={`${project.video}#t=0.5`} />
          {project.altVideo && <source src={`${project.altVideo}#t=0.5`} />}
        </video>

        {/* Hover Play Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-[#FFDD00] text-black border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000] group-hover:scale-110 transition-transform">
            <Play size={28} className="ml-1 fill-black" />
          </div>
        </div>

        {/* Duration Badge */}
        <span className="absolute bottom-3 right-3 bg-black text-[#FFDD00] font-bangers text-xs px-3 py-1 border-2 border-white flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {durationText} • {project.format}
        </span>
      </div>

      {/* Card Info */}
      <div className="p-6 flex flex-col flex-grow gap-2">
        <div className="flex justify-between font-bangers text-sm text-[#E52535]">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-bangers text-2xl md:text-3xl text-black group-hover:text-[#E52535] transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="font-comic font-bold text-xs text-black/80 leading-relaxed">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t-2 border-black/10">
          {project.tags.map((tag, i) => (
            <span key={i} className="font-marker text-xs px-2.5 py-0.5 border border-black bg-[#FFDD00] text-black rotate-[-1deg]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
