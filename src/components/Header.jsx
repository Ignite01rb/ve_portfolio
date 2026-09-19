import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { toggleSound, isSoundEnabled, playTapeClick } from '../utils/audio';

export default function Header({ isRetroMode, onToggleRetroMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const { scrollYProgress } = useScroll();

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    toggleSound(next);
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-6 py-4 transition-colors duration-700 ${
        isRetroMode ? 'bg-white/90 border-[#D5D0F6]' : 'bg-cinematic-bg/90 border-cinematic-border'
      }`}>
        <div className="max-w-[1320px] mx-auto flex justify-between items-center">
          
          {/* Logo Badge */}
          <a href="#hero" onMouseEnter={playTapeClick} className="flex items-center gap-3 group">
            <motion.span 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-8 h-8 font-heading font-extrabold text-lg flex items-center justify-center rounded shadow-lg ${
                isRetroMode ? 'bg-[#6C5CE7] text-white shadow-[#6C5CE7]/30' : 'bg-gold-accent text-cinematic-bg shadow-gold-accent/20'
              }`}
            >
              R
            </motion.span>
            <span className={`font-heading font-extrabold text-xl tracking-tight ${
              isRetroMode ? 'text-[#2B3A67]' : 'text-white'
            }`}>
              RAAGHAV BISHT<span className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'}>.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className={`hidden md:flex items-center gap-6 font-accent text-[0.8rem] font-bold tracking-widest ${
            isRetroMode ? 'text-[#2B3A67]/80' : 'text-white/70'
          }`}>
            <a href="#work" onMouseEnter={playTapeClick} className="hover:text-gold-accent hover:bg-black/5 px-3 py-1.5 rounded transition-all">
              <span className="text-gold-accent text-[0.68rem] mr-1">01</span> WORK
            </a>
            <a href="#about" onMouseEnter={playTapeClick} className="hover:text-gold-accent hover:bg-black/5 px-3 py-1.5 rounded transition-all">
              <span className="text-gold-accent text-[0.68rem] mr-1">02</span> ABOUT
            </a>
            <a href="#contact" onMouseEnter={playTapeClick} className="hover:text-gold-accent hover:bg-black/5 px-3 py-1.5 rounded transition-all">
              <span className="text-gold-accent text-[0.68rem] mr-1">03</span> STUDIO
            </a>
          </nav>

          {/* Action Buttons: Dark Mode Toggle & Sound Toggle */}
          <div className="flex items-center gap-3">
            
            {/* DARK MODE / LIGHT MODE Switcher */}
            <button
              onClick={() => { onToggleRetroMode(); playTapeClick(); }}
              onMouseEnter={playTapeClick}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-accent text-[0.68rem] font-extrabold tracking-wider transition-all shadow-md ${
                isRetroMode
                  ? 'bg-[#1E2749] text-white border-[#1E2749] hover:bg-[#2B3A67]'
                  : 'bg-gold-accent text-cinematic-bg border-gold-accent hover:bg-white'
              }`}
              title="Toggle between Dark Mode & Light Mode"
            >
              {isRetroMode ? <Moon size={12} className="text-gold-accent" /> : <Sun size={12} className="text-cinematic-bg" />}
              <span>{isRetroMode ? 'DARK MODE' : 'LIGHT MODE'}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={playTapeClick}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border font-accent text-[0.65rem] font-bold tracking-wider transition-all ${
                soundOn ? 'bg-gold-accent/15 text-gold-accent border-gold-accent/40' : 'bg-cinematic-card text-white/40 border-cinematic-border'
              }`}
              title="Toggle Sound Effects"
            >
              {soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span>{soundOn ? 'SOUND' : 'MUTED'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); playTapeClick(); }}
              className={`md:hidden p-2 ${isRetroMode ? 'text-[#2B3A67]' : 'text-white'}`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden flex flex-col gap-3 pt-4 pb-2 font-accent text-xs font-bold tracking-widest border-t mt-3 ${
              isRetroMode ? 'bg-[#EBE8FB] border-[#D5D0F6] text-[#2B3A67]' : 'bg-cinematic-bg border-cinematic-border text-white'
            }`}
          >
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-black/5 rounded">01 WORK</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-black/5 rounded">02 ABOUT</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-black/5 rounded">03 STUDIO</a>
          </motion.nav>
        )}
      </header>
    </>
  );
}
