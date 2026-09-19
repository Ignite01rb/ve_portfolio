import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { playTapeClick } from '../utils/audio';
import ScrollReveal from './ScrollReveal';
import { getVideoUrl } from '../utils/videoUtils';

const PROJECTS = [
  {
    id: 1,
    title: 'VALORANT STAY MONTAGE',
    client: 'GAMING & BEAT SYNC',
    year: '2026',
    category: 'gaming',
    format: '4K 60FPS',
    video: 'videos/Stay 💔 (Valorant Montage) - KING👑.mp4',
    desc: 'High-octane beat sync, optical transitions & speed ramps.',
    tags: ['After Effects', 'Beat Sync', 'Speed Ramps']
  },
  {
    id: 2,
    title: 'VALORANT BEGGIN EDIT',
    client: 'VALORANT MONTAGE',
    year: '2026',
    category: 'gaming',
    format: '4K 60FPS',
    video: 'videos/beggin (1) (2).mp4',
    desc: 'Precision beat sync, speed ramping & custom light leaks.',
    tags: ['Premiere Pro', 'Rhythmic Edit', 'Sound FX']
  },
  {
    id: 3,
    title: '3D MOTION COMPOSITING',
    client: 'COMMERCIAL VFX',
    year: '2025',
    category: 'vfx',
    format: '4K RAW',
    video: 'videos/Comp 1.mp4',
    desc: '3D motion tracking, particle compositing & title design.',
    tags: ['After Effects', '3D Compositing', 'VFX']
  },
  {
    id: 4,
    title: 'HIGH RETENTION VERTICAL REEL',
    client: 'SOCIAL CAMPAIGN',
    year: '2026',
    category: 'reels',
    format: 'Vertical 9:16',
    video: 'videos/reel.mp4',
    desc: 'Fast-paced social media cut engineered for maximum retention.',
    tags: ['CapCut Pro', 'Retention Cut', 'Kinetic Text']
  },
  {
    id: 5,
    title: 'DAVINCI RESOLVE COLOR GRADE',
    client: 'COMMERCIAL POST',
    year: '2025',
    category: 'commercial',
    format: 'ProRes 4444',
    video: 'videos/0717.mov',
    desc: 'Node-based color grading, LUT creation & film grain.',
    tags: ['DaVinci Resolve', 'Node Color Pass', 'Film Grain']
  },
  {
    id: 6,
    title: 'EDITORIAL TIMELINE CUT',
    client: 'NARRATIVE SHORT',
    year: '2025',
    category: 'commercial',
    format: '4K HDR',
    video: 'videos/Timeline 1 (1).mp4',
    desc: 'NLE timeline choreography & multi-cam sound mix.',
    tags: ['Premiere Pro', 'Multi-Cam', 'Sound Mix']
  },
  {
    id: 7,
    title: 'COMMERCIAL SHOWREEL CUT',
    client: 'DIRECTOR HIGHLIGHTS',
    year: '2026',
    category: 'commercial',
    format: '4K 60FPS',
    video: 'videos/core.mp4',
    desc: 'High-octane brand montage cut with fast transitions & audio design.',
    tags: ['DaVinci Resolve', 'Showreel', 'Brand Campaign']
  },
  {
    id: 8,
    title: 'CINEMATIC NARRATIVE REEL',
    client: 'FEATURE PROMO',
    year: '2026',
    category: 'commercial',
    format: 'ProRes 422',
    video: 'videos/core2_web.mp4',
    desc: 'Extended dramatic scene pacing, atmosphere & sound design.',
    tags: ['Premiere Pro', 'Narrative Pacing', 'Atmospheric']
  },
  {
    id: 9,
    title: 'INSTANT HOOK PROMO TEASER',
    client: 'CREATOR CONTENT',
    year: '2026',
    category: 'reels',
    format: 'Vertical 9:16',
    video: 'videos/sample 1.mp4',
    desc: 'Instant hook social promo with kinetic subtitles & motion blur.',
    tags: ['CapCut Pro', 'Hook Cut', 'Short Form']
  },
  {
    id: 10,
    title: 'PRECISION COLOR & EXPOSURE POLISH',
    client: 'POST-PRODUCTION',
    year: '2025',
    category: 'commercial',
    format: 'ProRes 4444',
    video: 'videos/0724(4).mp4',
    desc: 'Color matching, exposure balancing & subtle glow effects.',
    tags: ['DaVinci Resolve', 'Exposure Match', 'Glow Pass']
  },
  {
    id: 11,
    title: 'VIRAL KINETIC SHORT',
    client: 'CREATOR REEL',
    year: '2025',
    category: 'reels',
    format: 'Vertical 9:16',
    video: 'videos/WhatsApp Video 2025-10-18 at 21.43.56_46793ba3.mp4',
    desc: 'Dynamic pacing, punchy sound triggers & vibrant color accents.',
    tags: ['CapCut Pro', 'Kinetic Overlays', 'Sound Triggers']
  }
];

export default function WorkShowcase({ onSelectProject, isRetroMode }) {
  return (
    <section className={`w-full py-24 transition-colors duration-700 ${
      isRetroMode ? 'bg-[#F8F7FF]' : 'bg-cinematic-bg'
    }`} id="work">
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Header */}
        <ScrollReveal variant="scale">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <span className={`font-accent text-xs font-bold tracking-widest block mb-2 ${
                isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
              }`}>// SELECTED WORKS</span>
              <h2 className={`font-heading font-extrabold text-3xl md:text-5xl tracking-tight uppercase ${
                isRetroMode ? 'text-[#1E2749]' : 'text-white'
              }`}>CINEMATIC SHOWCASE</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project) => (
              <ProjectCard3D 
                key={project.id}
                project={project}
                onSelectProject={onSelectProject}
                isRetroMode={isRetroMode}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

// 3D Perspective Comic Card Component with Dynamic Video Timing Detection
function ProjectCard3D({ project, onSelectProject, isRetroMode }) {
  const [isHovered, setIsHovered] = useState(false);
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
    if (typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768)) return;
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
    setIsHovered(true);
    playTapeClick();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      layout
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectProject({ ...project, durationText })}
      data-cursor="PLAY"
      className="comic-box group cursor-pointer flex flex-col h-full relative"
    >
      {/* Media Box - Direct Video Frame Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-black border-b-4 border-black">
        {/* Actual Video Frame as Thumbnail & Live Hover Preview */}
        <video 
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={`${getVideoUrl(project.video)}#t=0.5`} type={project.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
          <source src={getVideoUrl(project.video)} />
        </video>

        {/* Hover Overlay with Play Icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.div 
            whileHover={{ scale: 1.15 }}
            className="w-14 h-14 bg-[#FFDD00] text-black border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000]"
          >
            <Play size={24} className="ml-1 fill-black" />
          </motion.div>
        </div>

        {/* Exact Video Duration Badge */}
        <span className="absolute bottom-3 right-3 bg-black text-white font-bangers text-xs px-2.5 py-1 border-2 border-white flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {durationText} • {project.format}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow gap-2.5 bg-white text-black">
        <div className="flex justify-between font-bangers text-sm text-[#E52535] tracking-wider">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-bangers text-2xl tracking-tight text-black group-hover:text-[#E52535] transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="font-comic font-bold text-xs leading-relaxed text-black/80">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t-2 border-black/10">
          {project.tags.map((tag, tIdx) => (
            <span key={tIdx} className="font-marker text-[0.65rem] px-2 py-0.5 border border-black bg-[#FFDD00] text-black rotate-[-1deg]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
