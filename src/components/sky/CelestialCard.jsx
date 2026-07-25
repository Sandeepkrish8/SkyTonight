import React from 'react';
import { Link } from 'react-router-dom';
import MotionCard from '../ui/MotionCard';
import AnimatedNumber from '../ui/AnimatedNumber';
import { motion } from 'framer-motion';

import mercuryImg from '../../assets/download (9).jpg';
import venusImg from '../../assets/Venus.jpg';
import marsImg from '../../assets/mars.jpg';
import jupiterImg from '../../assets/jupiter.jpg';
import saturnImg from '../../assets/saturn.jpg';
import uranusImg from '../../assets/download (7).jpg';
import neptuneImg from '../../assets/neptune.jpg';
import moonImg from '../../assets/moon_satellite.jpg';

const PLANET_IMAGES = {
  mercury: mercuryImg,
  venus: venusImg,
  mars: marsImg,
  jupiter: jupiterImg,
  saturn: saturnImg,
  uranus: uranusImg,
  neptune: neptuneImg,
  moon: moonImg,
};

export default function CelestialCard({
  name,
  constellation,
  altitude,
  azimuth,
  aboveHorizon = true,
  sunAltDeg = 0
}) {
  const altNum = parseFloat(altitude);
  const azNum = parseFloat(azimuth);
  const azSuffix = azimuth ? azimuth.replace(/[0-9.-]/g, '') : '';

  let badgeText = 'Below Horizon';
  let badgeClasses = 'bg-white/5 text-muted border-white/10';

  if (aboveHorizon) {
    if (name === 'Moon' || name.toLowerCase().includes('moon')) {
      badgeText = 'Visible';
      badgeClasses = 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20';
    } else {
      if (sunAltDeg < -6) {
        badgeText = 'Visible';
        badgeClasses = 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20';
      } else if (sunAltDeg < 0) {
        badgeText = 'Twilight';
        badgeClasses = 'bg-[#F5B14C]/10 text-[#F5B14C] border-[#F5B14C]/20';
      } else {
        badgeText = 'Up (Daytime)';
        badgeClasses = 'bg-white/5 text-muted border-white/10';
      }
    }
  }

  const imgSrc = PLANET_IMAGES[name.toLowerCase()];

  return (
    <Link 
      to={`/object/${name.toLowerCase()}`} 
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] rounded-3xl"
    >
      <MotionCard className="h-full cursor-pointer group hover:bg-white/5 hover:-translate-y-1 transition-all">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeClasses}`}>
            {badgeText}
          </span>
          <motion.div layoutId={`planet-${name.toLowerCase()}`} className="w-10 h-10 rounded-full flex-shrink-0 z-10 overflow-hidden border border-white/20 bg-black/50 shadow-lg">
            {imgSrc ? (
              <img src={imgSrc} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
            )}
          </motion.div>
        </div>
        <h3 className="font-display text-xl font-bold text-primary mb-1">{name}</h3>
        <p className="text-xs text-muted mb-4">{constellation}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-xs">
        <div>
          <span className="text-muted block">Altitude</span>
          <span className="font-semibold text-primary">
            {!isNaN(altNum) ? (
              <AnimatedNumber value={altNum} format={(v) => `${Math.round(v)}°`} />
            ) : (
              altitude
            )}
          </span>
        </div>
        <div>
          <span className="text-muted block">Azimuth</span>
          <span className="font-semibold text-primary">
            {!isNaN(azNum) ? (
              <AnimatedNumber value={azNum} format={(v) => `${Math.round(v)}${azSuffix}`} />
            ) : (
              azimuth
            )}
          </span>
        </div>
      </div>
    </MotionCard>
    </Link>
  );
}
