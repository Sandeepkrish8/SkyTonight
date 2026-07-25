import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnimationFrame, useReducedMotion, motion } from 'framer-motion';

export default function StarField() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const reducedMotion = useReducedMotion();
  const location = useLocation();

  const isObjectPage = location.pathname.startsWith('/object/');

  // Initialize stars once
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numStars = 120;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // 0.5 to 2.5px
        baseOpacity: Math.random() * 0.5 + 0.1, // 0.1 to 0.6
        opacity: Math.random(),
        speedX: (Math.random() - 0.5) * 0.1, // Drift X
        speedY: (Math.random() - 0.5) * 0.1, // Drift Y
        twinkleSpeed: Math.random() * 0.005 + 0.001,
        twinkleDir: Math.random() > 0.5 ? 1 : -1
      });
    }
    starsRef.current = stars;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame((time) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = starsRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, 0, 0,
      canvas.width / 2, 0, canvas.width
    );
    gradient.addColorStop(0, '#121628');
    gradient.addColorStop(0.5, '#070A14');
    gradient.addColorStop(1, '#070A14');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      // Update twinkle
      star.opacity += star.twinkleSpeed * star.twinkleDir;
      if (star.opacity >= star.baseOpacity * 1.5 || star.opacity >= 1) {
        star.twinkleDir = -1;
      } else if (star.opacity <= star.baseOpacity * 0.2 || star.opacity <= 0) {
        star.twinkleDir = 1;
      }

      // Update position if not reduced motion
      if (!reducedMotion) {
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.opacity)})`;
      ctx.fill();
    }
  });

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={false}
      animate={{ 
        scale: isObjectPage && !reducedMotion ? 1.15 : 1,
        opacity: isObjectPage ? 0.6 : 0.8
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ display: 'block', transformOrigin: 'center' }}
    />
  );
}
