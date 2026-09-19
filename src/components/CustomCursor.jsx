import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch screens
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target.closest('a, button, .project-card, [data-cursor]');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (target.classList.contains('project-card')) {
          setCursorText('PLAY');
        } else if (target.tagName === 'BUTTON') {
          setCursorText('SELECT');
        } else {
          setCursorText('VIEW');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Center Reticle Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold-accent rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.1 }}
      />

      {/* Expanding Outer Target Ring */}
      <motion.div
        className={`fixed top-0 left-0 border border-gold-accent rounded-full pointer-events-none z-50 flex items-center justify-center font-accent text-[0.6rem] font-extrabold tracking-widest text-gold-accent backdrop-blur-[2px] transition-colors ${
          isHovered ? 'bg-gold-accent/15 border-gold-accent' : 'bg-transparent border-gold-accent/40'
        }`}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          translateX: isHovered ? -32 : -16,
          translateY: isHovered ? -32 : -16,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {isHovered && cursorText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none uppercase drop-shadow"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
