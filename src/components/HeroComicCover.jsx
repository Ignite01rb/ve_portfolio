import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Play, Sparkles, ChevronDown, Flame, Zap, Award, Star } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';

gsap.registerPlugin(ScrollTrigger);

export default function HeroComicCover({ onOpenShowreel, cmykOffset }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const photoRef = useRef(null);
  const photoCardRef = useRef(null);
  const titleRef = useRef(null);
  const tvRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    setTilt({ x, y });
  };

  useEffect(() => {
    const sec = heroRef.current;
    const photo = photoRef.current;
    const title = titleRef.current;
    const tv = tvRef.current;

    if (!sec) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Smooth ScrollTrigger animation on Raaghav's Portrait Photo Cutout!
      if (photo) {
        gsap.to(photo, {
          y: isMobile ? 90 : 280,
          scale: isMobile ? 1.08 : 1.25,
          rotate: isMobile ? 6 : 15,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }

      // Smooth ScrollTrigger animation on Title
      if (title) {
        gsap.to(title, {
          scale: isMobile ? 1.05 : 1.15,
          y: isMobile ? -30 : -100,
          rotate: isMobile ? -2 : -5,
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }

      // Smooth ScrollTrigger on Retro TV Stage
      if (tv) {
        gsap.to(tv, {
          rotateY: isMobile ? -8 : -20,
          scale: isMobile ? 0.96 : 0.92,
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }
    }, sec);

    return () => ctx.revert();
  }, []);

  const triggerBurst = (e, sfxType) => {
    playComicSFX(sfxType);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 85,
      origin: { x, y },
      colors: ['#FFDD00', '#E52535', '#00FFFF', '#FF00FF', '#000000']
    });
  };

  const softwareBadges = [
    { label: 'Da', name: 'DaVinci Resolve Studio', bg: 'bg-[#FFDD00] text-black' },
    { label: 'Cc', name: 'CapCut ', bg: 'bg-[#00FFFF] text-black' },
    { label: 'Pr', name: 'Premiere Pro ', bg: 'bg-[#FF00FF] text-white' },
    { label: 'Ae', name: 'After Effects VFX', bg: 'bg-white text-black' },
  ];

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100vh] bg-halftone-pattern flex flex-col justify-center items-center py-16 px-4 overflow-hidden border-b-8 border-black"
      id="hero"
    >
      
      {/* Rotating Speed Rays Background Animation Overlay */}
      <div className="absolute inset-0 comic-speed-rays opacity-20 pointer-events-none" />

      {/* Vintage Issue Corner Stamps */}
      <div className="absolute top-6 left-6 z-20 hidden sm:flex items-center gap-2">
        <div className="bg-[#FFDD00] text-black font-bangers text-2xl px-4 py-2 border-4 border-black rotate-[-4deg] shadow-[5px_5px_0_#000]">
          2026 EDITION
        </div>
        <div className="bg-white text-black font-marker text-xs px-3 py-1.5 border-2 border-black rotate-[2deg] shadow-[3px_3px_0_#000]">
          Cinematic Editing
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20 hidden md:block">
        <div className="bg-black text-[#00FFFF] font-bangers text-lg px-4 py-1.5 border-4 border-white rotate-[3deg] shadow-[5px_5px_0_#000]">
          VFX
        </div>
      </div>

      {/* Main Comic Cover Board Grid */}
      <div className="max-w-[1380px] mx-auto w-full text-center relative z-10 my-auto flex flex-col items-center">
        
        {/* Top Banner */}
        <div className="inline-block bg-[#FFDD00] text-black border-4 border-black px-6 py-2 rotate-[-1deg] shadow-[6px_6px_0_#000] mb-4">
          <span className="font-bangers text-xl md:text-3xl tracking-widest uppercase">
            ⚡ VIDEO EDITOR ⚡
          </span>
        </div>

        {/* Giant Main Title */}
        <h1 
          ref={titleRef}
          className={`font-bangers text-5xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none tracking-tight uppercase mb-4 break-words max-w-full ${
            cmykOffset ? 'cmyk-offset-yellow' : 'text-[#FFDD00] drop-shadow-[5px_5px_0_#000] sm:drop-shadow-[8px_8px_0_#000]'
          }`}
        >
          RAAGHAV BISHT
        </h1>

        {/* Main Hero Split Grid: Photo Cutout + Retro TV Showreel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-6">
          
          {/* Left Column: Raaghav's Photo Cutout with Magnetic Tilt & Crazy Scroll */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <div 
              ref={photoCardRef}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative cursor-pointer group max-w-full"
              onClick={(e) => triggerBurst(e, 'KABOOM')}
            >
              {/* Pulsing Lightning Glow Starburst behind Photo */}
              <div className="absolute inset-0 bg-[#FFDD00] rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none" />

              {/* Floating Starburst Badges */}
              <div className="absolute -top-6 -left-3 sm:-top-8 sm:-left-6 z-30 font-bangers text-lg sm:text-2xl md:text-4xl bg-[#FFDD00] text-black px-3.5 sm:px-5 py-1.5 sm:py-3 border-3 sm:border-4 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] rotate-[-12deg] group-hover:scale-125 transition-transform">
                💥 EDITOR!
              </div>

              <div className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 z-30 font-bangers text-base sm:text-xl md:text-2xl bg-[#00FFFF] text-black px-3 sm:px-4 py-1 sm:py-2 border-2 sm:border-3 border-black shadow-[4px_4px_0_#000] sm:shadow-[5px_5px_0_#000] rotate-[8deg]">
                ⚡ Motion Graphics
              </div>

              {/* Raaghav's Photo Cutout Image */}
              <img 
                ref={photoRef}
                src="assets/user_cutout.png" 
                alt="Raaghav Bisht - Video Editing Superhero" 
                className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[430px] h-auto object-contain filter drop-shadow-[10px_10px_0_#000] sm:drop-shadow-[16px_16px_0_#000] relative z-10"
              />
            </div>
          </div>

          {/* Right Column: Tagline Speech Box + Retro TV Showreel Stage */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Tagline Speech Box */}
            <div className="relative bg-white text-black border-4 border-black p-6 md:p-8 rotate-[1deg] shadow-[10px_10px_0_#000] mb-6 speech-bubble-bottom w-full">
              <p className="font-comic font-bold text-xl md:text-3xl leading-snug">
                "COMMERCIALS, GAMING MONTAGES, REELS & VFX CRAFTED WITH RHYTHMIC PACING AND HIGH-VOLTAGE WAX CRAYON ENERGY!"
              </p>
            </div>

            {/* Software Mastery Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-6 w-full">
              {softwareBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`font-bangers text-base md:text-lg px-3.5 py-1.5 border-3 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 ${badge.bg}`}
                >
                  <span className="font-extrabold text-xl">{badge.label}</span>
                  <span className="font-comic text-xs font-bold tracking-wider">{badge.name}</span>
                </div>
              ))}
            </div>

            {/* 3D Mossy Retro TV Stage embedded inside Comic Issue Panel */}
            <div ref={tvRef} className="w-full relative">
              <div 
                style={{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }}
                onClick={(e) => {
                  triggerBurst(e, 'KABOOM');
                  onOpenShowreel();
                }}
                className="comic-box p-3 bg-[#121212] cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden border-4 border-black bg-black">
                  <img 
                    src="assets/surreal_retro_tv.png" 
                    alt="Surreal Retro CRT TV Director Showreel" 
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Banner */}
                  <div className="absolute top-3 left-3 bg-[#FFDD00] text-black font-bangers text-xs md:text-sm px-3 py-1 border-2 border-black shadow-[3px_3px_0_#000] flex items-center gap-1.5">
                    <Flame size={14} className="fill-red-600" />
                    <span>2026 DIRECTOR SHOWREEL</span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-18 h-18 bg-[#FFDD00] text-black border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_#000] group-hover:scale-110 transition-transform">
                      <Play size={32} className="ml-1 fill-black" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-2 pt-2.5">
                  <span className="font-bangers text-yellow-400 text-base md:text-lg">
                    🎬 WATCH SHOWREEL (BEGGIN CUT)
                  </span>
                  <span className="font-marker text-[0.65rem] text-white bg-red-600 px-2.5 py-1 border border-white">
                    02:10 • 4K 60FPS
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Interactive SFX Explosive Sound Bursts Bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 my-4">
          {[
            { text: 'POW!', color: 'bg-[#FFDD00] text-black', sfx: 'POW', rot: '-5deg' },
            { text: 'BOOM!', color: 'bg-[#E52535] text-white', sfx: 'BOOM', rot: '4deg' },
            { text: 'ZAP!', color: 'bg-[#00FFFF] text-black', sfx: 'ZAP', rot: '-3deg' },
            { text: 'KABOOM!', color: 'bg-[#FF00FF] text-white', sfx: 'KABOOM', rot: '5deg' },
            { text: 'WHOOSH!', color: 'bg-white text-black', sfx: 'WHOOSH', rot: '-4deg' },
          ].map((burst, idx) => (
            <button
              key={idx}
              onClick={(e) => triggerBurst(e, burst.sfx)}
              style={{ transform: `rotate(${burst.rot})` }}
              className={`font-bangers text-xl md:text-3xl px-5 py-2 border-4 border-black shadow-[5px_5px_0_#000] hover:scale-110 active:scale-95 transition-all ${burst.color}`}
            >
              💥 {burst.text}
            </button>
          ))}
        </div>

        {/* Scroll Instruction */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <a
            href="#ch1"
            onClick={(e) => triggerBurst(e, 'WHOOSH')}
            className="comic-button text-xl md:text-2xl px-7 py-3 inline-flex items-center gap-3"
          >
            <span>SCROLL FOR CRAZY ANIMATION</span>
            <ChevronDown className="animate-bounce" size={24} />
          </a>
        </div>

      </div>

    </section>
  );
}
