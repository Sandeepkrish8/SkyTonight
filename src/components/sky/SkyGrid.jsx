import React from 'react';
import { motion } from 'framer-motion';

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function SkyGrid({ children }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
    >
      {children}
    </motion.div>
  );
}
