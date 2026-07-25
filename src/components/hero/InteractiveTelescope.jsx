import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const planets = [
  { name: 'Jupiter', top: '30%', left: '20%', size: 24, color: '#e3dccb', glow: '#b5a782' },
  { name: 'Saturn', top: '70%', left: '60%', size: 30, color: '#f4c585', glow: '#c99650' },
  { name: 'Mars', top: '40%', left: '80%', size: 18, color: '#e27b58', glow: '#a34828' },
  { name: 'Venus', top: '20%', left: '75%', size: 20, color: '#e8e1cc', glow: '#bcae88' },
];

export default function InteractiveTelescope() {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const constraintsRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldReduceMotion && !hasInteracted) {
      controls.start({
        x: [0, -100, 100, 0],
        y: [0, 50, -50, 0],
        transition: {
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        },
      });
    } else {
      controls.stop();
    }
  }, [shouldReduceMotion, hasInteracted, controls]);

  const handleDragStart = () => {
    setHasInteracted(true);
    controls.stop();
  };

  const handlePlanetClick = (name) => {
    navigate(`/object/${name.toLowerCase()}`);
  };

  const handlePlanetKeyDown = (e, name) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlanetClick(name);
    }
  };

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      {/* Telescope Body Image */}
      {/* The SVG telescope is pointing up and to the right */}
      <img
        src="/telescope.svg"
        alt="Telescope"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-2xl"
      />

      {/* Eyepiece Viewport (The Sky) */}
      {/* Positioned at the top right to align with the front lens of the telescope */}
      <div 
        ref={constraintsRef}
        className="absolute w-[45%] h-[45%] rounded-full overflow-hidden bg-[#0a0a14] z-10 border-[6px] border-[#1a1b26] shadow-[0_0_50px_rgba(34,211,238,0.1)] focus-within:ring-4 focus-within:ring-[#7C5CFF]/50"
        style={{ top: '12%', right: '15%' }}
      >
        {/* Inner Vignette / Glass Effect */}
        <div className="absolute inset-0 rounded-full pointer-events-none z-30 shadow-[inset_0_0_40px_rgba(0,0,0,0.9),inset_0_0_15px_rgba(255,255,255,0.1)]" />

        {/* Draggable Sky Layer */}
        <motion.div
          drag={!shouldReduceMotion}
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          animate={controls}
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] cursor-grab active:cursor-grabbing"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #111424 0%, #05060a 100%)',
          }}
        >
          {/* Starfield Background */}
          <div className="absolute inset-0 opacity-60" style={{
            backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0))',
            backgroundSize: '200px 200px',
          }} />

          {/* Planets */}
          {planets.map((planet) => (
            <div
              key={planet.name}
              role="button"
              tabIndex={0}
              onClick={() => handlePlanetClick(planet.name)}
              onKeyDown={(e) => handlePlanetKeyDown(e, planet.name)}
              className="absolute group outline-none"
              style={{ top: planet.top, left: planet.left }}
              title={`${planet.name} — tap to explore`}
            >
              {/* Planet Body */}
              <div
                className="rounded-full shadow-lg transition-transform group-hover:scale-125 focus:scale-125"
                style={{
                  width: planet.size,
                  height: planet.size,
                  backgroundColor: planet.color,
                  boxShadow: `0 0 20px ${planet.glow}`,
                }}
              />
              
              {/* Planet Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-white bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {planet.name}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hint */}
        {!hasInteracted && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-white/70 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md pointer-events-none z-40 whitespace-nowrap"
          >
            Drag to explore the sky
          </motion.div>
        )}
      </div>
    </div>
  );
}
