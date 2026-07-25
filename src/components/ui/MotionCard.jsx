import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function MotionCard({ children, className = '', ...props }) {
  const reducedMotion = useReducedMotion();

  const hoverProps = reducedMotion ? {} : {
    whileHover: { scale: 1.02, y: -4 },
    whileTap: { scale: 0.99 }
  };

  return (
    <motion.div
      variants={reducedMotion ? {} : itemVariants}
      {...hoverProps}
      className={`group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#7C5CFF]/40 hover:shadow-[0_0_25px_rgba(124,92,255,0.15)] transition-colors duration-300 ${className}`}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7C5CFF]/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7C5CFF]/10 to-transparent pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
