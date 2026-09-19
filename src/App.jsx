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
      image: '/images/cutouts/audio_waveform_badge.png',
      projectTitle: 'VALORANT STAY MONTAGE',
      client: 'GAMING & BEAT SYNC',
      year: '2026',
      format: '4K 60FPS',
      video: 'videos/Stay 💔 (Valorant Montage) - KING👑.mp4',
      desc: 'High-octane beat sync, optical transitions & speed ramps.',
      story: 'Precision audio spectrum visualizers track every sub-bass pulse, aligning frame-accurate cuts to high-octane 60fps rhythms!',
      speakerName: 'SOUND VISUALIZER ENGINE',
      dialogue: 'BOOM! 60FPS AUDIO SPECTRUM LOCKED & BEAT-SYNCED!',
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
      image: '/images/cutouts/timeline_playhead_badge.png',
      projectTitle: 'VALORANT BEGGIN EDIT',
      client: 'VALORANT MONTAGE',
      year: '2026',
      format: '4K 60FPS',
      video: 'videos/beggin (1) (2).mp4',
      desc: 'Precision beat sync, speed ramping & custom light leaks.',
      story: 'The NLE timeline playhead scrubs through multi-track video at 2.2x velocity with high-voltage light leaks and speed curves!',
      speakerName: 'NLE TIMELINE ENGINE',
      dialogue: 'SCRUBBING TIMECODE AT 200% VELOCITY WITH RHYTHMIC PACING!',
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
      image: '/images/cutouts/keyframe_node_badge.png',
      projectTitle: '3D MOTION COMPOSITING',
      client: 'COMMERCIAL VFX',
      year: '2025',
      format: '4K RAW',
      video: 'videos/Comp 1.mp4',
      desc: '3D motion tracking, particle compositing & title design.',
      story: 'Camera tracking keyframe nodes project 3D spatial vectors onto the canvas, binding glowing particles seamlessly to motion path curves!',
      speakerName: '3D KEYFRAME MATRIX',
      dialogue: '3D SPATIAL VECTORS & CAMERA PATH CURVES LOCKED!',
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
      image: '/images/cutouts/vertical_retention_badge.png',
      projectTitle: 'HIGH RETENTION VERTICAL REEL',
      client: 'SOCIAL CAMPAIGN',
      year: '2026',
      format: 'Vertical 9:16',
      video: 'videos/reel.mp4',
      desc: 'Fast-paced social media cut engineered for maximum retention.',
      story: 'Real-time audience retention curves spike straight up, capturing viewer engagement within the first 0.5 seconds of vertical playback!',
      speakerName: 'RETENTION ANALYTICS WIDGET',
      dialogue: 'AUDIENCE RETENTION AT 100%! MAXIMUM HOOK ENGAGEMENT!',
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
      image: '/images/cutouts/color_wheels_badge.png',
      projectTitle: 'COLOR & 3D PARTICLES',
      client: 'COMMERCIAL 3D VFX',
      year: '2025',
      format: '4K RAW',
      video: 'videos/Comp 1.mp4',
      desc: '3D camera motion tracking, particle compositing & title design.',
      story: 'DaVinci color wheels and vectorscope parades calibrate midtones, lift, and gamma curves into rich cinematic ProRes RAW tones!',
      speakerName: 'COLOR GRADING SUITE',
      dialogue: 'VECTORSCOPE & RGB PARADE BALANCED IN PRORES RAW!',
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
      image: '/images/cutouts/multicam_track_badge.png',
      projectTitle: 'EDITORIAL TIMELINE CUT',
      client: 'NARRATIVE SHORT',
      year: '2025',
      format: '4K HDR',
      video: 'videos/timeline_1_1.mp4',
      desc: 'NLE timeline choreography & multi-cam sound mix.',
      story: 'Multi-cam video tracks V1-V4 and audio master channels align flawlessly on the master NLE timeline to produce a polished final edit!',
      speakerName: 'MULTI-CAM MASTER TIMELINE',
      dialogue: 'MULTI-TRACK AUDIO MIX COMPLETE & MASTERED IN PRORES 4444!',
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
