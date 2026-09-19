import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { playTapeClick } from '../utils/audio';
import ScrollReveal from './ScrollReveal';
import { getVideoUrl } from '../utils/videoUtils';

const MOTION_PROJECTS = [
  {
    id: 'mg1',
    title: 'TIMELINE MOTION REEL',
    client: 'MOTION GRAPHICS LAB',
    year: '2026',
    format: '4K MP4',
    video: 'videos/timeline_motion.mp4',
    desc: 'Dynamic 2D/3D motion choreography, fluid keyframe easing, particle effects & title reveals.',
    tags: ['After Effects', 'Motion Graphics', 'Keyframe Pacing']
  },
  {
    id: 'mg2',
    title: 'EDITORIAL TIMELINE CUT II',
    client: 'VE MOTION STUDIO',
    year: '2026',
    format: '4K MP4',
    video: 'videos/timeline_1_1.mp4',
    desc: 'Multi-layer timeline motion edit, rhythmic optical transitions & sound synthesis.',
    tags: ['Premiere Pro', 'Timeline Cut', 'Visual Effects']
  },
  {
    id: 'mg3',
    title: '3D MOTION COMPOSITING & TITLE DESIGN',
    client: 'COMMERCIAL VFX',
    year: '2026',
    format: '4K RAW',
    video: 'videos/Comp 1.mp4',
    desc: '3D camera motion tracking, particle compositing, kinetic typography & visual effects.',
    tags: ['After Effects', '3D Compositing', 'Kinetic Titles']
  },
  {
    id: 'mg4',
    title: 'KINETIC SUBTITLE & REEL MOTION',
    client: 'SOCIAL MEDIA MOTION',
    year: '2026',
    format: 'Vertical 9:16',
    video: 'videos/0724(4).mp4',
    desc: 'Fast-paced kinetic overlays, subtitle pop animations & rhythmic particle motion.',
    tags: ['Kinetic Text', 'Motion Blur', 'Subtitles']
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
  const [durationText, setDurationText] = useState('--:--');
  const videoRef = useRef(null);

  const handleLoadedMetadata = (e) => {
    const dur = e.target.duration;
    if (dur && !isNaN(dur) && dur > 0) {
      const mins = Math.floor(dur / 60);
      const secs = Math.floor(dur % 60);
      setDurationText(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }
  };

  const handleMouseEnter = () => {
    playTapeClick();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0.5;
      } catch (err) {}
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectProject({ ...project, durationText })}
      className="bg-white text-black border-4 border-black shadow-[6px_6px_0_#000] overflow-hidden group cursor-pointer flex flex-col hover:-translate-y-2 transition-transform duration-300"
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
          <source src={`${getVideoUrl(project.video)}#t=0.5`} type={project.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
          <source src={getVideoUrl(project.video)} />
          {project.altVideo && <source src={getVideoUrl(project.altVideo)} />}
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
            <span key={i} className="font-marker text-xs px-2.5 py-0.5 border border-black bg-[#FFDD00] text-black">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
