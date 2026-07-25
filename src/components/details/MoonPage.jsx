import React, { useState, useEffect } from 'react';
import { useLocation } from '../../context/LocationContext';
import * as SunCalc from 'suncalc';
import { explain, azimuthToDirection } from '../../lib/api';
import { moonInfo } from '../../lib/sky';
import MotionCard from '../ui/MotionCard';
import { motion, useReducedMotion } from 'framer-motion';
import CelestialBody3D from './CelestialBody3D';
import { nasaImages, nasaVideo } from '../../lib/nasaMedia';
import AnimatedNumber from '../ui/AnimatedNumber';
import moonSatelliteImg from '../../assets/moon_satellite.jpg';

export default function MoonPage() {
  const { location } = useLocation();
  const reducedMotion = useReducedMotion();
  const [data, setData] = useState(null);
  const [blurb, setBlurb] = useState('');
  const [media, setMedia] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const date = new Date();
    const info = moonInfo(date);
    const pos = SunCalc.getMoonPosition(date, location.lat, location.lon);
    const times = SunCalc.getMoonTimes(date, location.lat, location.lon);
    
    const altDeg = pos.altitude * 180 / Math.PI;
    const azDeg = ((pos.azimuth * 180 / Math.PI) + 180) % 360;

    let nextFullDate = null;
    let nextNewDate = null;
    let prev = info.phase;
    
    for (let i = 1; i <= 35; i++) {
      let d = new Date(date.getTime() + i * 86400000);
      let curr = SunCalc.getMoonIllumination(d).phase;
      
      if (!nextFullDate && prev <= 0.5 && curr > 0.5) nextFullDate = d;
      if (!nextNewDate && curr < prev) nextNewDate = d;
      
      prev = curr;
    }

    const formatTime = (d) => d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';
    const formatDate = (d) => d ? d.toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'N/A';

    const moonData = {
      name: 'The Moon',
      phaseName: info.name,
      illumination: info.illumination,
      age: parseFloat((info.phase * 29.53).toFixed(1)),
      distance: Math.round(pos.distance),
      altitude: Math.round(altDeg),
      azimuth: `${Math.round(azDeg)}° ${azimuthToDirection(azDeg)}`,
      rise: formatTime(times.rise),
      set: formatTime(times.set),
      nextFull: formatDate(nextFullDate),
      nextNew: formatDate(nextNewDate),
      aboveHorizon: altDeg > 0
    };

    if (mounted) {
      setData(moonData);
      explain({ object: 'Moon', data: moonData }).then(text => {
        if (mounted) setBlurb(text);
      });
    }

    nasaImages('Moon surface').then(images => {
      if (mounted) setMedia(images);
    });
    nasaVideo('Moon').then(vid => {
      if (mounted) setVideo(vid);
    });

    return () => { mounted = false; };
  }, [location.lat, location.lon]);

  if (!data) {
    return <div className="animate-pulse h-40 bg-white/5 rounded-2xl"></div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">{data.name}</h1>
        <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-[#F5B14C]/10 text-[#F5B14C] border-[#F5B14C]/20">
          {data.phaseName} ({data.illumination}%)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div layoutId="planet-moon" className="h-[300px] md:h-[400px]">
          <img 
            src={moonSatelliteImg} 
            alt="Satellite heading to moon" 
            className="w-full h-full object-cover rounded-xl border border-white/10" 
          />
        </motion.div>
        
        <div className="flex flex-col gap-4">
          {media.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 flex-1">
              {media.slice(0, 2).map((img, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 h-full min-h-[140px]">
                  <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
              {video && (
                <div className="col-span-2 rounded-xl overflow-hidden border border-white/10 bg-black/40 h-[200px] relative group">
                  <video src={video.videoUrl} controls className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-muted min-h-[300px]">
              Loading NASA imagery...
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="h-full">
          <MotionCard className="cursor-default h-full">
            <h2 className="text-xl font-display font-semibold mb-4">Live Position</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Altitude</span>
                <span className="font-medium text-primary">{data.altitude}°</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Azimuth</span>
                <span className="font-medium text-primary">{data.azimuth}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">Distance</span>
                <span className="font-medium text-primary">
                  <AnimatedNumber value={data.distance} format={v => Math.round(v).toLocaleString()} /> km
                </span>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <MotionCard className="cursor-default h-full">
            <h2 className="text-xl font-display font-semibold mb-4">Lunar Cycle</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Moon Age</span>
                <span className="font-medium text-primary">
                  <AnimatedNumber value={data.age} format={v => v.toFixed(1)} /> days
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Next Full Moon</span>
                <span className="font-medium text-primary">{data.nextFull}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">Next New Moon</span>
                <span className="font-medium text-primary">{data.nextNew}</span>
              </div>
            </div>
          </MotionCard>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <MotionCard className="bg-[#7C5CFF]/5 border-[#7C5CFF]/20 cursor-default">
          <h2 className="text-xl font-display font-semibold mb-3 text-[#7C5CFF]">AI Sky Guide Summary</h2>
          <p className="text-sm text-primary/90 leading-relaxed">
            {blurb || 'Analyzing live data...'}
          </p>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
}
