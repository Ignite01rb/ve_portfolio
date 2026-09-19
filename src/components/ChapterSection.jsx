import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Play, Sparkles, Flame } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';
import { getVideoUrl } from '../utils/videoUtils';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterSection({ chapter, cmykOffset, onSelectProject }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const videoBoxRef = useRef(null);
  const videoRef = useRef(null);
  const burstBadgeRef = useRef(null);
  const [durationText, setDurationText] = useState('--:--');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const sec = sectionRef.current;
    const header = headerRef.current;
    const panel = panelRef.current;
    const videoBox = videoBoxRef.current;
    const badge = burstBadgeRef.current;

    if (!sec) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Premium SaaS 3D Perspective Card Unfold Scroll Scrub
      if (panel) {
        gsap.set(panel, { 
          transformPerspective: 1200, 
          transformStyle: "preserve-3d",
          force3D: true
        });

        gsap.fromTo(
          panel,
          {
            rotateX: isMobile ? 8 : 16,
            scale: isMobile ? 0.94 : 0.88,
            y: isMobile ? 60 : 120,
            opacity: 0,
            filter: 'brightness(0.7)'
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            filter: 'brightness(1)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 90%',
              end: 'center 50%',
              scrub: isMobile ? 0.6 : 1.1,
            }
          }
        );
      }

      // 2. SaaS Header Title Smooth Entrance
      if (header) {
        gsap.fromTo(
          header,
          { y: -45, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.8,
            }
          }
        );
      }

      // 3. Inner Video Player Spring Scale-Up
      if (videoBox) {
        gsap.fromTo(
          videoBox,
          { scale: 0.94, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 70%',
              end: 'center 55%',
              scrub: 0.7,
            }
          }
        );
      }

      // 4. Elastic Sound Burst Badge Snap
      if (badge) {
        gsap.fromTo(
          badge,
          { scale: 0.3, rotate: -25, opacity: 0 },
          {
            scale: 1.05,
            rotate: -6,
            opacity: 1,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
            scrollTrigger: {
              trigger: sec,
              start: 'top 65%',
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
      <div ref={headerRef} className="max-w-[1000px] w-full mx-auto mb-8 text-center relative z-10">
        <div className="inline-block bg-black text-[#FFDD00] font-bangers text-xl md:text-3xl px-6 py-2 border-4 border-white shadow-[6px_6px_0_#000]">
          CHAPTER {chapter.num}: {chapter.subtitle}
        </div>
        <h2 className={`font-bangers text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase mt-4 ${
          cmykOffset ? 'cmyk-offset-yellow' : 'text-[#FFDD00] drop-shadow-[7px_7px_0_#000]'
        }`}>
          {chapter.title}
        </h2>
      </div>

      {/* Main Centered Chapter Panel Box with 3D SaaS Perspective */}
      <div className="max-w-[950px] w-full mx-auto relative z-20">
        <div 
          ref={panelRef} 
          className="comic-box p-5 sm:p-8 relative transition-shadow duration-500 hover:shadow-[16px_16px_0_#000]"
        >
          
          {/* Action SFX Sound Burst Badge */}
          <div 
            ref={burstBadgeRef}
            onClick={triggerBurst}
            className={`absolute -top-6 -right-2 sm:-top-8 sm:-right-4 z-30 font-bangers text-xl sm:text-3xl md:text-4xl px-4 sm:px-6 py-2 border-4 border-black shadow-[6px_6px_0_#000] cursor-pointer hover:scale-110 transition-transform ${chapter.burstBg || 'bg-[#FFDD00] text-black'}`}
          >
            💥 {chapter.sfxWord}!
          </div>

          {/* Panel Issue Header */}
          <div className="flex flex-wrap justify-between items-center gap-3 border-b-4 border-black pb-4 mb-6 pr-20 sm:pr-24">
            <div className="flex items-center gap-3">
              <span className="font-bangers text-2xl sm:text-3xl md:text-4xl text-black">
                PANEL {chapter.num}.1 — {chapter.projectTitle}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-marker text-xs sm:text-sm bg-black text-[#FFDD00] px-3 py-1 border-2 border-black">
                {chapter.client}
              </span>
              <span className="font-marker text-xs sm:text-sm bg-[#FFDD00] text-black px-3 py-1 border-2 border-black">
                {chapter.year}
              </span>
            </div>
          </div>

          {/* Video Box with Direct Video Frame Thumbnail & Live Hover Playback */}
          <div 
            ref={videoBoxRef}
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
            className="relative aspect-video rounded-xl overflow-hidden border-4 border-black bg-black shadow-[8px_8px_0_#000] cursor-pointer group mb-6 transition-all duration-300 group-hover:shadow-[12px_12px_0_#000]"
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFDD00] text-black rounded-full flex items-center justify-center border-4 border-black shadow-[5px_5px_0_#000] group-hover:scale-110 transition-transform">
                <Play size={32} className="ml-1 fill-black" />
              </div>
            </div>

            {/* Top Right Live Preview Indicator */}
            <div className="absolute top-3 right-3 bg-black/80 text-[#00FFFF] font-bangers text-xs sm:text-sm px-3 py-1 border-2 border-black flex items-center gap-1.5 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              HOVER TO PREVIEW
            </div>

            {/* Bottom Duration & Format Badge */}
            <span className="absolute bottom-3 right-3 bg-black text-white font-bangers text-xs sm:text-sm px-3.5 py-1.5 border-2 border-white flex items-center gap-2 shadow-md">
              <Sparkles size={14} className="text-[#FFDD00]" />
              {durationText} • {chapter.format}
            </span>
          </div>

          {/* Story Text Box */}
          <div className="bg-[#FFF8E7] border-4 border-black p-4 sm:p-5 shadow-[5px_5px_0_#000] mb-5">
            <p className="font-comic font-bold text-base sm:text-xl text-black leading-snug">
              "{chapter.story}"
            </p>
          </div>

          {/* Character / Engine Dialogue Bubble */}
          <div className="relative bg-black text-white p-4 sm:p-5 border-4 border-black shadow-[6px_6px_0_#000] mb-6">
            <span className="font-bangers text-[#FFDD00] text-lg sm:text-xl block mb-1">
              🗣️ {chapter.speakerName}:
            </span>
            <p className="font-comic text-sm sm:text-lg font-bold leading-tight text-slate-100">
              "{chapter.dialogue}"
            </p>
          </div>

          {/* Interactive Action Button Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t-4 border-black">
            <button
              onClick={() => onSelectProject({
                title: chapter.projectTitle,
                client: chapter.client,
                year: chapter.year,
                desc: chapter.desc,
                video: chapter.video,
                format: chapter.format
              })}
              className="comic-button text-lg sm:text-xl px-6 py-3 flex items-center gap-2.5"
            >
              <Play size={20} className="fill-black" />
              <span>WATCH FULL PROJECT</span>
            </button>

            <button
              onClick={triggerBurst}
              className="font-bangers text-lg sm:text-xl bg-[#FFDD00] text-black px-5 py-2.5 border-3 border-black shadow-[4px_4px_0_#000] hover:bg-white transition-colors"
            >
              💥 {chapter.sfxWord}!
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
