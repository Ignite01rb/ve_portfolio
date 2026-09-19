import React, { useState } from 'react';
import { Volume2, VolumeX, Sliders, Menu, X } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';

export default function ComicHeader({ 
  isCrayonActive, 
  onToggleCrayon, 
  cmykOffset, 
  onToggleCmyk,
  activeChapter 
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSFXClick = (type) => {
    if (soundEnabled) playComicSFX(type);
  };

  const chapters = [
    { id: 'ch1', num: '01', title: 'GAMING' },
    { id: 'ch2', num: '02', title: 'BEGGIN' },
    { id: 'ch3', num: '03', title: '3D VFX' },
    { id: 'ch4', num: '04', title: 'REELS' },
    { id: 'ch5', num: '05', title: '3D' },
    { id: 'ch6', num: '06', title: 'NARRATIVE' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121212] border-b-4 border-black px-3 sm:px-4 py-2.5 shadow-[0_6px_0_#000]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2">
        
        {/* Left Logo Stamp Badge */}
        <a href="#hero" onClick={() => handleSFXClick('WHOOSH')} className="flex items-center gap-2.5 shrink-0">
          <div className="bg-[#FFDD00] text-black font-bangers text-xl sm:text-2xl px-3 py-0.5 border-2 border-black rotate-[-2deg] shadow-[3px_3px_0_#000]">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-bangers text-white tracking-wider text-lg sm:text-2xl leading-none">
              RAAGHAV BISHT<span className="text-[#FFDD00]">.</span>
            </span>
            <span className="font-marker text-[#FFDD00] text-[0.55rem] sm:text-[0.65rem] tracking-widest uppercase">
              VIDEO EDITOR • CREATIVE DIRECTOR
            </span>
          </div>
        </a>

        {/* Center Chapter Nav Pills (Desktop) */}
        <nav className="hidden lg:flex items-center gap-2">
          {chapters.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              onClick={() => handleSFXClick('WHOOSH')}
              className={`font-bangers text-sm px-3 py-1.5 border-2 border-black transition-all ${
                activeChapter === ch.id
                  ? 'bg-[#FFDD00] text-black scale-105 shadow-[3px_3px_0_#000]'
                  : 'bg-white text-black hover:bg-[#FFDD00] hover:shadow-[3px_3px_0_#000]'
              }`}
            >
              CH.{ch.num} {ch.title}
            </a>
          ))}
          <a
            href="#all-works"
            onClick={() => handleSFXClick('WHOOSH')}
            className="font-bangers text-sm px-3 py-1.5 border-2 border-black bg-[#E52535] text-white hover:bg-[#FFDD00] hover:text-black shadow-[3px_3px_0_#000]"
          >
            ALL WORKS
          </a>
          <a
            href="#motion-graphics"
            onClick={() => handleSFXClick('WHOOSH')}
            className="font-bangers text-sm px-3 py-1.5 border-2 border-black bg-[#FFDD00] text-black hover:bg-white shadow-[3px_3px_0_#000]"
          >
            MOTION GRAPHICS
          </a>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* CMYK Misregistration Toggle */}
          <button
            onClick={() => {
              handleSFXClick('ZAP');
              onToggleCmyk();
            }}
            className={`font-bangers text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-black flex items-center gap-1 sm:gap-1.5 transition-all shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] ${
              cmykOffset ? 'bg-[#00FFFF] text-black' : 'bg-white text-black hover:bg-[#FFDD00]'
            }`}
            title="Toggle Vintage CMYK Printing Misregistration"
          >
            <Sliders size={14} />
            <span className="hidden sm:inline">CMYK</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playComicSFX('POW');
            }}
            className={`font-bangers text-xs sm:text-sm px-2 sm:px-2.5 py-1 sm:py-1.5 border-2 border-black flex items-center gap-1 transition-all shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] ${
              soundEnabled ? 'bg-[#FFDD00] text-black' : 'bg-gray-300 text-black'
            }`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => {
              handleSFXClick('WHOOSH');
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden bg-[#FFDD00] text-black border-2 border-black p-1.5 shadow-[2px_2px_0_#000]"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* Mobile Slide-down Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t-2 border-white/20 flex flex-wrap gap-2 justify-center pb-2 animate-fadeIn">
          {chapters.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              onClick={() => {
                handleSFXClick('WHOOSH');
                setIsMobileMenuOpen(false);
              }}
              className={`font-bangers text-xs px-2.5 py-1 border-2 border-black ${
                activeChapter === ch.id ? 'bg-[#FFDD00] text-black' : 'bg-white text-black'
              }`}
            >
              CH.{ch.num} {ch.title}
            </a>
          ))}
          <a
            href="#all-works"
            onClick={() => {
              handleSFXClick('WHOOSH');
              setIsMobileMenuOpen(false);
            }}
            className="font-bangers text-xs px-3 py-1 border-2 border-black bg-[#E52535] text-white"
          >
            ALL WORKS
          </a>
          <a
            href="#motion-graphics"
            onClick={() => {
              handleSFXClick('WHOOSH');
              setIsMobileMenuOpen(false);
            }}
            className="font-bangers text-xs px-3 py-1 border-2 border-black bg-[#FFDD00] text-black"
          >
            MOTION GRAPHICS
          </a>
        </div>
      )}
    </header>
  );
}
