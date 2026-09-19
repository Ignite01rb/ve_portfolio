import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Play, Sparkles } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';
import { getVideoUrl } from '../utils/videoUtils';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterSection({ chapter, cmykOffset, onSelectProject }) {
  const sectionRef = useRef(null);
  const animalRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const burstBadgeRef = useRef(null);
  const [durationText, setDurationText] = useState('--:--');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = animalRef.current;
    const sec = sectionRef.current;
    const panel = panelRef.current;
    const badge = burstBadgeRef.current;

    if (!el || !sec) return;

    // CRAZY Fly-In Trajectories & Multi-Axis Animations
    let fromState = { opacity: 0 };
    let toState = {
      x: 0,
      y: 0,
      rotate: chapter.finalRotation || 0,
      scale: 1,
      opacity: 1,
      ease: 'power4.out',
    };

    switch (chapter.flyDirection) {
      case 'top-left':
        fromState = { x: -850, y: -600, rotate: -180, scale: 0.2, opacity: 0 };
        toState.rotate = 360 + (chapter.finalRotation || 0); // 360 Spin Roll!
        break;
      case 'right':
        fromState = { x: 950, y: 200, rotate: 90, scale: 0.2, opacity: 0 };
        toState.rotate = chapter.finalRotation || 0;
        break;
      case 'bottom-left':
        fromState = { x: -850, y: 700, rotate: -45, scale: 0.3, opacity: 0 };
        break;
      case 'bottom-right':
        fromState = { x: 950, y: 800, rotate: -90, scale: 0.2, opacity: 0 };
        break;
      case 'top-right':
        fromState = { x: 850, y: -650, rotate: 720, scale: 0.1, opacity: 0 }; // 720 Double Spin!
        toState.rotate = 720 + (chapter.finalRotation || 0);
        break;
      case 'top':
        fromState = { x: 0, y: -1100, rotate: 25, scale: 2.5, opacity: 0 }; // Dive-Bomb Swoop!
        break;
      default:
        fromState = { x: -700, opacity: 0 };
    }

    const ctx = gsap.context(() => {
      // 1. CRAZY Animal Cutout ScrollTrigger Fly-In & Parallax
      gsap.fromTo(
        el,
        fromState,
        {
          ...toState,
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            end: 'center 40%',
            scrub: chapter.scrubSpeed || 1.1,
          }
        }
      );

      // Continuous Electric Jitter/Flicker for Electric Bear (Chapter 2)
      if (chapter.flyDirection === 'right') {
        gsap.to(el, {
          x: '+=6',
          y: '-=6',
          repeat: -1,
          yoyo: true,
          duration: 0.08,
          ease: 'rough'
        });
      }

      // 2. CRAZY Panel Box 3D Pop & Tilt Reveal
      if (panel) {
        gsap.fromTo(
          panel,
          { y: 120, opacity: 0, rotateX: 20, rotateY: -10, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.0,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sec,
              start: 'top 75%',
            }
          }
        );
      }

      // 3. Floating Sound Burst Badge Pulsing Motion
      if (badge) {
        gsap.fromTo(
          badge,
          { scale: 0.5, rotate: -20, opacity: 0 },
          {
            scale: 1.1,
            rotate: -12,
            opacity: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
            scrollTrigger: {
              trigger: sec,
              start: 'top 70%',
            }
          }
        );
      }
    }, sec);

    return () => ctx.revert();
  }, [chapter]);

  const handleLoadedMetadata = (e) => {
    const dur = e.target.duration;
    if (dur && !isNaN(dur) && dur > 0) {
      const mins = Math.floor(dur / 60);
      const secs = Math.floor(dur % 60);
      setDurationText(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }
  };

  const triggerBurst = (e) => {
    playComicSFX(chapter.sfxType);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 65,
      spread: 90,
      origin: { x, y },
      colors: chapter.confettiColors || ['#FFDD00', '#E52535', '#00FFFF', '#FF00FF', '#000000']
    });
  };

  const handleVideoHoverEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoHoverLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      try { videoRef.current.currentTime = 0.5; } catch (err) {}
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id={chapter.id}
      className={`relative w-full min-h-screen py-24 px-4 flex flex-col justify-center items-center overflow-hidden border-b-8 border-black ${chapter.bgClass || 'bg-halftone-pattern'}`}
    >
      
      {/* Background Section Title Banner */}
      <div className="max-w-[1300px] w-full mx-auto mb-10 text-center relative z-10">
        <div className="inline-block bg-black text-[#FFDD00] font-bangers text-xl md:text-3xl px-6 py-2 border-4 border-white rotate-[-1deg] shadow-[6px_6px_0_#000]">
          CHAPTER {chapter.num}: {chapter.subtitle}
        </div>
        <h2 className={`font-bangers text-5xl md:text-8xl tracking-wide uppercase mt-4 ${
          cmykOffset ? 'cmyk-offset-yellow' : 'text-[#FFDD00] drop-shadow-[7px_7px_0_#000]'
        }`}>
          {chapter.title}
        </h2>
      </div>

      {/* Main Chapter Content Grid */}
      <div className="max-w-[1300px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        
        {/* Flying Crayon Animal Cutout Container */}
        <div className={`lg:col-span-6 flex flex-col items-center justify-center relative ${chapter.reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
          
          <div className="relative group cursor-pointer mb-6" onClick={triggerBurst}>
            {/* Action SFX Sound Burst Badge over Animal Cutout */}
            <div 
              ref={burstBadgeRef}
              className={`absolute -top-10 -left-6 z-30 font-bangers text-3xl md:text-5xl px-6 py-4 border-4 border-black shadow-[6px_6px_0_#000] rotate-[-12deg] group-hover:scale-125 transition-transform ${chapter.burstBg || 'bg-[#FFDD00] text-black'}`}
            >
              💥 {chapter.sfxWord}!
            </div>

            {/* Big Crayon Animal Cutout Image */}
            <img 
              ref={animalRef}
              src={chapter.image} 
              alt={chapter.title}
              className="w-full max-w-[520px] h-auto object-contain filter drop-shadow-[14px_14px_0_#000] transition-transform duration-300"
            />
          </div>

        </div>

        {/* Comic Story & Video Panel Box */}
        <div className={`lg:col-span-6 ${chapter.reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
          <div ref={panelRef} className="comic-box p-6 md:p-8 relative" style={{ perspective: 1000 }}>
            
            {/* Panel Issue Header */}
            <div className="flex justify-between items-center border-b-4 border-black pb-3 mb-4">
              <span className="font-bangers text-2xl md:text-3xl text-black">
                PANEL {chapter.num}.1 — {chapter.projectTitle}
              </span>
              <span className="font-marker text-xs bg-[#FFDD00] text-black px-3 py-1 border-2 border-black rotate-[2deg]">
                FLY: {chapter.flyDirection.toUpperCase()}
              </span>
            </div>

            {/* Video Box with Direct Video Frame Thumbnail & Live Hover Playback */}
            <div 
              onMouseEnter={handleVideoHoverEnter}
              onMouseLeave={handleVideoHoverLeave}
              onClick={() => onSelectProject({
                title: chapter.projectTitle,
                client: chapter.client,
                year: chapter.year,
                desc: chapter.desc,
                video: chapter.video,
                format: chapter.format
              })}
              className="relative aspect-video rounded-lg overflow-hidden border-4 border-black bg-black shadow-[6px_6px_0_#000] cursor-pointer group mb-5"
            >
              <video 
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={`${getVideoUrl(chapter.video)}#t=0.5`} type={chapter.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                <source src={getVideoUrl(chapter.video)} />
              </video>

              {/* Hover Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-[#FFDD00] text-black rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] group-hover:scale-110 transition-transform">
                  <Play size={28} className="ml-1 fill-black" />
                </div>
              </div>

              {/* Duration Badge */}
              <span className="absolute bottom-3 right-3 bg-black text-white font-bangers text-sm px-3 py-1 border-2 border-white flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {durationText} • {chapter.format}
              </span>
            </div>

            {/* Story Text Box */}
            <div className="bg-[#FFF8E7] border-4 border-black p-4 shadow-[4px_4px_0_#000] mb-4">
              <p className="font-comic font-bold text-base md:text-xl text-black leading-snug">
                "{chapter.story}"
              </p>
            </div>

            {/* Character Dialogue Bubble */}
            <div className="relative bg-black text-white p-4 border-4 border-black shadow-[5px_5px_0_#000] mb-4">
              <span className="font-bangers text-[#FFDD00] text-lg block mb-1">
                🗣️ {chapter.speakerName}:
              </span>
              <p className="font-comic text-sm md:text-lg font-bold leading-tight">
                "{chapter.dialogue}"
              </p>
            </div>

            {/* Interactive Action Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t-4 border-black">
              <button
                onClick={() => onSelectProject({
                  title: chapter.projectTitle,
                  client: chapter.client,
                  year: chapter.year,
                  desc: chapter.desc,
                  video: chapter.video,
                  format: chapter.format
                })}
                className="comic-button text-lg md:text-xl px-5 py-2.5 flex items-center gap-2"
              >
                <Play size={18} className="fill-black" />
                <span>WATCH FULL PROJECT</span>
              </button>

              <button
                onClick={triggerBurst}
                className="font-bangers text-lg bg-[#FFDD00] text-black px-4 py-2 border-2 border-black shadow-[3px_3px_0_#000] hover:bg-white"
              >
                💥 {chapter.sfxWord}!
              </button>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
