import React, { useState } from 'react';
import { Volume2, VolumeX, Edit3, Sliders, Zap, Film } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';

export default function ComicHeader({ 
  isCrayonActive, 
  onToggleCrayon, 
  cmykOffset, 
  onToggleCmyk,
  activeChapter 
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSFXClick = (type) => {
    if (soundEnabled) playComicSFX(type);
  };

  const chapters = [
    { id: 'ch1', num: '01', title: 'GAMING' },
    { id: 'ch2', num: '02', title: 'VFX' },
    { id: 'ch3', num: '03', title: 'REELS' },
    { id: 'ch4', num: '04', title: 'COLOR' },
    { id: 'ch5', num: '05', title: 'COMMERCIAL' },
    { id: 'ch6', num: '06', title: 'NARRATIVE' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121212] border-b-4 border-black px-4 py-3 shadow-[0_6px_0_#000]">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Logo Stamp Badge */}
        <a href="#hero" onClick={() => handleSFXClick('WHOOSH')} className="flex items-center gap-3">
          <div className="bg-[#FFDD00] text-black font-bangers text-2xl px-3.5 py-1 border-2 border-black rotate-[-2deg] shadow-[3px_3px_0_#000]">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-bangers text-white tracking-wider text-xl md:text-2xl leading-none">
              RAAGHAV BISHT<span className="text-[#FFDD00]">.</span>
            </span>
            <span className="font-marker text-[#FFDD00] text-[0.65rem] tracking-widest uppercase">
              SENIOR VIDEO EDITOR • CREATIVE DIRECTOR
            </span>
          </div>
        </a>

        {/* Center Chapter Nav Pills */}
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
        <div className="flex items-center gap-2">

          {/* CMYK Misregistration Toggle */}
          <button
            onClick={() => {
              handleSFXClick('ZAP');
              onToggleCmyk();
            }}
            className={`font-bangers text-xs md:text-sm px-3 py-1.5 border-2 border-black flex items-center gap-1.5 transition-all shadow-[3px_3px_0_#000] ${
              cmykOffset ? 'bg-[#00FFFF] text-black' : 'bg-white text-black hover:bg-[#FFDD00]'
            }`}
            title="Toggle Vintage CMYK Printing Misregistration"
          >
            <Sliders size={15} />
            <span>CMYK OFFSET</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playComicSFX('POW');
            }}
            className={`font-bangers text-xs md:text-sm px-2.5 py-1.5 border-2 border-black flex items-center gap-1 transition-all shadow-[3px_3px_0_#000] ${
              soundEnabled ? 'bg-[#FFDD00] text-black' : 'bg-gray-300 text-black'
            }`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

        </div>

      </div>
    </header>
  );
}
