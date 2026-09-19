import React, { useState, useEffect } from 'react';
import ComicHeader from './components/ComicHeader';
import HeroComicCover from './components/HeroComicCover';
import ChapterSection from './components/ChapterSection';
import WorkShowcase from './components/WorkShowcase';
import ContactForm from './components/ContactForm';
import ComicFooter from './components/ComicFooter';
import VideoModal from './components/VideoModal';
import ComicLoader from './components/ComicLoader';
import MotionGraphicsSection from './components/MotionGraphicsSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cmykOffset, setCmykOffset] = useState(false);
  const [activeChapter, setActiveChapter] = useState('ch1');

  const handleOpenShowreel = () => {
    setSelectedProject({
      title: 'RAAGHAV BISHT — 2026 DIRECTOR SHOWREEL',
      client: 'VALORANT BEGGIN MONTAGE & RHYTHMIC CUT',
      year: '2026',
      desc: 'Precision beat sync, speed ramping, optical transitions, custom light leaks & sound design.',
      video: 'videos/beggin (1) (2).mp4',
    });
    setIsModalOpen(true);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Track active chapter section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const chapters = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6'];
      for (const chId of chapters) {
        const el = document.getElementById(chId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveChapter(chId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chaptersData = [
    {
      id: 'ch1',
      num: '01',
      title: 'VALORANT STAY MONTAGE',
      subtitle: 'HIGH-OCTANE BEAT SYNC',
      flyDirection: 'top-left',
      speedLabel: '1.5x SCROLL VELOCITY',
      scrubSpeed: 1.2,
      finalRotation: 0,
      image: '/images/cutouts/crt_monitor.png',
      projectTitle: 'VALORANT STAY MONTAGE',
      client: 'GAMING & BEAT SYNC',
      year: '2026',
      format: '4K 60FPS',
      video: 'videos/Stay 💔 (Valorant Montage) - KING👑.mp4',
      desc: 'High-octane beat sync, optical transitions & speed ramps.',
      story: 'Out from the cosmic signals of Sector 9, the Neon CRT Monitor unleashes high-octane beat syncs, optical transitions & speed ramps with raw analog power!',
      speakerName: 'NEON CRT MONITOR',
      dialogue: 'HIGH-OCTANE 60FPS BEAT SYNC LOADED INTO MEMORY!',
      sfxWord: 'BOOM',
      sfxType: 'BOOM',
      bgClass: 'bg-halftone-pattern',
      burstBg: 'bg-[#FFDD00] text-black',
      confettiColors: ['#FFDD00', '#E52535', '#000000']
    },
    {
      id: 'ch2',
      num: '02',
      title: 'VALORANT BEGGIN EDIT',
      subtitle: 'RHYTHMIC LIGHT LEAKS',
      flyDirection: 'right',
      speedLabel: '2.2x HYPER SPEED',
      scrubSpeed: 0.8,
      finalRotation: 0,
      reverseLayout: true,
      image: '/images/cutouts/vhs_tape.png',
      projectTitle: 'VALORANT BEGGIN EDIT',
      client: 'VALORANT MONTAGE',
      year: '2026',
      format: '4K 60FPS',
      video: 'videos/beggin (1) (2).mp4',
      desc: 'Precision beat sync, speed ramping & custom light leaks.',
      story: 'Shattering the right margin at 2.2x velocity, the Glitch VHS Tape charges in with high-voltage sound FX and rhythmic light leak pacing!',
      speakerName: 'GLITCH VHS TAPE',
      dialogue: 'ANALOG LIGHT LEAKS & HIGH-VOLTAGE TAPE PACING!',
      sfxWord: 'POW',
      sfxType: 'POW',
      bgClass: 'bg-halftone-pattern',
      burstBg: 'bg-[#00FFFF] text-black',
      confettiColors: ['#00FFFF', '#FF00FF', '#000000']
    },
    {
      id: 'ch3',
      num: '03',
      title: '3D MOTION COMPOSITING',
      subtitle: 'AFTER EFFECTS VFX',
      flyDirection: 'bottom-left',
      speedLabel: '1.8x SEISMIC DRIFT',
      scrubSpeed: 1.1,
      finalRotation: 0,
      image: '/images/cutouts/vfx_camera.png',
      projectTitle: '3D MOTION COMPOSITING',
      client: 'COMMERCIAL VFX',
      year: '2025',
      format: '4K RAW',
      video: 'videos/Comp 1.mp4',
      desc: '3D motion tracking, particle compositing & title design.',
      story: 'Landing with a thunderous seismic shockwave from the bottom-left, the 3D VFX Camera projects precision motion tracking and particle compositing!',
      speakerName: '3D VFX CAMERA',
      dialogue: '3D MOTION TRACKING AND PARTICLE VFX DOMINATE THE CANVAS!',
      sfxWord: 'ZAP',
      sfxType: 'ZAP',
      bgClass: 'bg-halftone-pattern',
      burstBg: 'bg-[#FFDD00] text-black',
      confettiColors: ['#10B981', '#FFDD00', '#000000']
    },
    {
      id: 'ch4',
      num: '04',
      title: 'HIGH RETENTION VERTICAL REEL',
      subtitle: 'CAPCUT PRO SOCIAL',
      flyDirection: 'bottom-right',
      speedLabel: '2.5x MISSILE THRUST',
      scrubSpeed: 0.7,
      finalRotation: 0,
      reverseLayout: true,
      image: '/images/cutouts/vertical_phone.png',
      projectTitle: 'HIGH RETENTION VERTICAL REEL',
      client: 'SOCIAL CAMPAIGN',
      year: '2026',
      format: 'Vertical 9:16',
      video: 'videos/reel.mp4',
      desc: 'Fast-paced social media cut engineered for maximum retention.',
      story: 'Blasting off at high velocity, 9:16 vertical cuts engineered for viral social media retention scorch the halftone paper through the Retention Reel Deck!',
      speakerName: 'RETENTION REEL DECK',
      dialogue: 'HOOK THE VIEWER IN THE FIRST 0.5 SECONDS OR DIE!',
      sfxWord: 'KABOOM',
      sfxType: 'KABOOM',
      bgClass: 'bg-halftone-pattern',
      burstBg: 'bg-[#E52535] text-white',
      confettiColors: ['#E52535', '#FFDD00', '#000000']
    },
    {
      id: 'ch5',
      num: '05',
      title: 'COLOR & 3D PARTICLES',
      subtitle: 'AFTER EFFECTS & DAVINCI',
      flyDirection: 'top-right',
      speedLabel: '1.4x SPINNING ZOOM',
      scrubSpeed: 1.3,
      finalRotation: 0,
      image: '/images/cutouts/color_console.png',
      projectTitle: 'COLOR & 3D PARTICLES',
      client: 'COMMERCIAL 3D VFX',
      year: '2025',
      format: '4K RAW',
      video: 'videos/Comp 1.mp4',
      desc: '3D camera motion tracking, particle compositing & title design.',
      story: 'Spinning 360 degrees through a kaleidoscopic vortex from the top-right, the Color Wheel Console transforms raw footage into cinematic 3D motion mastery!',
      speakerName: 'COLOR WHEEL CONSOLE',
      dialogue: 'PRECISION 3D PARTICLES AND COLOR SCULPTING IN PRORES RAW!',
      sfxWord: 'WHOOSH',
      sfxType: 'WHOOSH',
      bgClass: 'bg-halftone-pattern',
      burstBg: 'bg-[#FF00FF] text-white',
      confettiColors: ['#FF00FF', '#00FFFF', '#FFDD00']
    },
    {
      id: 'ch6',
      num: '06',
      title: 'EDITORIAL TIMELINE CUT',
      subtitle: 'NARRATIVE MULTI-CAM',
      flyDirection: 'top',
      speedLabel: '1.6x SKY SWOOP',
      scrubSpeed: 1.0,
      finalRotation: 0,
      reverseLayout: true,
      image: '/images/cutouts/reel_deck.png',
      projectTitle: 'EDITORIAL TIMELINE CUT',
      client: 'NARRATIVE SHORT',
      year: '2025',
      format: '4K HDR',
      video: 'videos/timeline_1_1.mp4',
      desc: 'NLE timeline choreography & multi-cam sound mix.',
      story: 'Diving straight down from the sky, NLE multi-cam timeline choreography and master audio mixes spin to completion on the Master Reel Deck!',
      speakerName: 'MASTER REEL DECK',
      dialogue: 'NLE MULTI-CAM TIMELINE COMPLETE & MASTERED IN PRORES 4444!',
      sfxWord: 'POW',
      sfxType: 'POW',
      bgClass: 'bg-halftone-pattern',
      burstBg: 'bg-[#FFDD00] text-black',
      confettiColors: ['#FFDD00', '#E52535', '#000000']
    }
  ];

  return (
    <div className={`min-h-screen font-body text-black bg-[#B81424] relative selection:bg-[#FFDD00] selection:text-black ${
      cmykOffset ? 'cmyk-offset-active' : ''
    }`}>
      
      {/* Unique Vintage Comic Loader */}
      {isLoading && (
        <ComicLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Sticky Issue Header Navigation */}
      <ComicHeader 
        cmykOffset={cmykOffset}
        onToggleCmyk={() => setCmykOffset(!cmykOffset)}
        activeChapter={activeChapter}
      />

      {/* Hero Comic Book Issue Cover */}
      <HeroComicCover 
        onOpenShowreel={handleOpenShowreel}
        cmykOffset={cmykOffset} 
      />

      {/* 6 GSAP ScrollTrigger Fly-In Chapter Sections */}
      {chaptersData.map((ch) => (
        <ChapterSection 
          key={ch.id} 
          chapter={ch} 
          cmykOffset={cmykOffset}
          onSelectProject={handleSelectProject}
        />
      ))}

      {/* All Projects Showcase Grid Section */}
      <div id="all-works">
        <WorkShowcase 
          onSelectProject={handleSelectProject} 
          isRetroMode={true} 
        />
      </div>

      {/* Motion Graphics & 3D VFX Showcase Section */}
      <MotionGraphicsSection onSelectProject={handleSelectProject} />

      {/* Studio Contact Section */}
      <div id="contact">
        <ContactForm isRetroMode={true} />
      </div>

      {/* Comic End Footer */}
      <ComicFooter cmykOffset={cmykOffset} />

      {/* HD Video Lightbox Modal */}
      <VideoModal 
        isOpen={isModalOpen} 
        project={selectedProject} 
        onClose={handleCloseModal} 
      />

    </div>
  );
}
