import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxText({ children, baseVelocity = 100, className = '' }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const x = useTransform(smoothScroll, [0, 1], ['0%', `${baseVelocity}%`]);

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap pointer-events-none select-none my-4">
      <motion.div style={{ x }} className={`inline-block ${className}`}>
        {children}
      </motion.div>
    </div>
  );
}
