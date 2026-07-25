import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, animate, useTransform, useReducedMotion } from 'framer-motion';

export default function AnimatedNumber({ value, format = (v) => Math.round(v), duration = 1 }) {
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => format(latest));
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    if (reducedMotion) {
      count.set(value);
    } else {
      const animation = animate(count, value, {
        duration,
        ease: "easeOut",
      });
      return animation.stop;
    }
  }, [value, duration, reducedMotion, count]);

  return <motion.span>{isRendered ? display : format(reducedMotion ? value : 0)}</motion.span>;
}
