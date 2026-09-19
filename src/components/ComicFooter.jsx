import React from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';

export default function ComicFooter({ cmykOffset }) {
  
  const scrollToTop = () => {
    playComicSFX('KABOOM');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.8 },
      colors: ['#FFDD00', '#E52535', '#00FFFF', '#FF00FF', '#000000']
    });
  };

  return (
    <footer className="w-full bg-[#121212] text-white py-20 px-4 border-t-8 border-black relative z-30">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-8">
        
        {/* End of Issue Banner */}
        <div className="bg-[#FFDD00] text-black border-4 border-black p-8 rotate-[-1deg] shadow-[10px_10px_0_#000] max-w-[800px] w-full speech-bubble-bottom">
          <h2 className="font-bangers text-4xl md:text-6xl uppercase tracking-wider mb-2">
            TO BE CONTINUED...
          </h2>
          <p className="font-comic font-bold text-lg md:text-2xl">
            "THE CRAYON BEASTS WILL RETURN IN ISSUE #405: REVENGE OF THE HALFTONE INK!"
          </p>
        </div>

        {/* Comic Credits Panel Box */}
        <div className="comic-box bg-white text-black p-6 md:p-8 max-w-[800px] w-full text-left">
          <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
            <span className="font-bangers text-2xl md:text-3xl">COMIC ISSUE CREDITS</span>
            <span className="font-marker text-xs bg-[#FF00FF] text-white px-3 py-1 border-2 border-black">
              SEPTEMBER 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-comic font-bold text-base md:text-lg">
            <div>
              <span className="text-red-600">STORY & DIRECTION:</span> RAAGHAV BISHT
            </div>
            <div>
              <span className="text-red-600">CRAYON ARTISTRY:</span> WAX & INK LABS
            </div>
            <div>
              <span className="text-red-600">ANIMATION ENGINE:</span> GSAP SCROLLTRIGGER
            </div>
            <div>
              <span className="text-red-600">PRINT TECHNIQUE:</span> CMYK HALFTONE OFFSET
            </div>
          </div>
        </div>

        {/* Action Button: Scroll Back To Top */}
        <button
          onClick={scrollToTop}
          className="comic-button text-2xl md:text-4xl px-10 py-5 flex items-center gap-3 my-4"
        >
          <ArrowUp size={32} />
          <span>RESTART COMIC SCROLL</span>
          <Sparkles size={28} />
        </button>

        <p className="font-marker text-xs text-white/60 tracking-widest uppercase">
          © 2026 RAAGHAV BISHT. CRAFTED WITH CRAZY WAX CRAYONS & SCROLLTRIGGER PHYSICS.
        </p>

      </div>
    </footer>
  );
}
