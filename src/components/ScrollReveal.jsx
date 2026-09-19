import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, variant = 'fade', className = '' }) {
  const getVariants = () => {
    switch (variant) {
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.92, y: 40 },
          visible: { opacity: 1, scale: 1, y: 0 },
        };
      case 'wipe':
        return {
          hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
          visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0, y: 45 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={getVariants()}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
