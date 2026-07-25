import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MotionCard from '../ui/MotionCard';
import AnimatedNumber from '../ui/AnimatedNumber';
import { motion } from 'framer-motion';
import { useLocation } from '../../context/LocationContext';
import * as SunCalc from 'suncalc';

export default function MoonPhaseCard() {
  const { location } = useLocation();
  const [moonPhase, setMoonPhase] = useState({ fraction: 0, phase: 0 });

  useEffect(() => {
    const data = SunCalc.getMoonIllumination(new Date());
    setMoonPhase({ fraction: data.fraction, phase: data.phase });
  }, []);

  let phaseName = 'New Moon';
  if (moonPhase.phase > 0.05 && moonPhase.phase < 0.25) phaseName = 'Waxing Crescent';
  else if (moonPhase.phase >= 0.25 && moonPhase.phase < 0.3) phaseName = 'First Quarter';
  else if (moonPhase.phase >= 0.3 && moonPhase.phase < 0.45) phaseName = 'Waxing Gibbous';
  else if (moonPhase.phase >= 0.45 && moonPhase.phase <= 0.55) phaseName = 'Full Moon';
  else if (moonPhase.phase > 0.55 && moonPhase.phase < 0.75) phaseName = 'Waning Gibbous';
  else if (moonPhase.phase >= 0.75 && moonPhase.phase < 0.8) phaseName = 'Last Quarter';
  else if (moonPhase.phase >= 0.8 && moonPhase.phase < 0.95) phaseName = 'Waning Crescent';

  return (
    <Link 
      to="/object/moon" 
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#F5B14C] rounded-3xl"
    >
      <MotionCard className="h-full cursor-pointer group hover:bg-[#F5B14C]/5 hover:-translate-y-1 transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F5B14C]/10 text-[#F5B14C] border border-[#F5B14C]/20">
            <AnimatedNumber value={moonPhase.fraction * 100} format={(v) => `${Math.round(v)}%`} /> Illum
          </span>
          <motion.div layoutId="planet-moon" className="w-10 h-10 rounded-full flex-shrink-0 z-10 overflow-hidden border border-white/20 bg-black/50 shadow-lg">
            <img src="/textures/moon.png" alt="Moon" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </motion.div>
        </div>
        <div className="text-2xl font-bold font-display text-[#E7ECF5] mb-2">{phaseName}</div>
        <p className="text-xs text-muted">Real-time astronomical phase calculated live via SunCalc</p>
      </div>

      <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted font-medium">
        <span>Moon Age</span>
        <span className="text-primary font-semibold">
          <AnimatedNumber value={info.phase * 29.53} format={(v) => `${v.toFixed(1)} days`} />
        </span>
      </div>
    </MotionCard>
    </Link>
  );
}
