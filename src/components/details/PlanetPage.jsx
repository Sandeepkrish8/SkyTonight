import React, { useState, useEffect } from 'react';
import { useLocation } from '../../context/LocationContext';
import { visiblePlanets, explain } from '../../lib/api';
import MotionCard from '../ui/MotionCard';
import * as SunCalc from 'suncalc';
import { motion, useReducedMotion } from 'framer-motion';
import CelestialBody3D from './CelestialBody3D';
import { nasaImages, nasaVideo } from '../../lib/nasaMedia';
import AnimatedNumber from '../ui/AnimatedNumber';
import EquipmentBadge from '../ui/EquipmentBadge';
import VenusImage from '../../assets/Venus.jpg';
import SaturnImage from '../../assets/saturn.jpg';
import JupiterImage from '../../assets/jupiter.jpg';
import UranusImage from '../../assets/uranus.jpg';
import NeptuneImage from '../../assets/neptune.jpg';
import MarsImage from '../../assets/mars.jpg';
import MercuryImage from '../../assets/mercury.jpg';
import SaturnVideoAsset from '../../assets/make_a_cinmatic_video_about_sa.mp4';

// ... keeping all the existing code intact up to line 125 ...
const customImages = {
  venus: VenusImage,
  saturn: SaturnImage,
  jupiter: JupiterImage,
  uranus: UranusImage,
  neptune: NeptuneImage,
  mars: MarsImage,
  mercury: MercuryImage,
};

const PLANET_FACTS = {
  mercury: { type: 'Terrestrial Planet', diameter: '4,879', moons: 0 },
  venus: { type: 'Terrestrial Planet', diameter: '12,104', moons: 0 },
  mars: { type: 'Terrestrial Planet', diameter: '6,779', moons: 2 },
  jupiter: { type: 'Gas Giant', diameter: '139,820', moons: 95 },
  saturn: { type: 'Gas Giant', diameter: '116,460', moons: 146 },
  uranus: { type: 'Ice Giant', diameter: '50,724', moons: 28 },
  neptune: { type: 'Ice Giant', diameter: '49,244', moons: 16 }
};

export default function PlanetPage({ name }) {
  const { location } = useLocation();
  const reducedMotion = useReducedMotion();
  const [data, setData] = useState(null);
  const [blurb, setBlurb] = useState('');
  const [loading, setLoading] = useState(true);
  const [sunAlt, setSunAlt] = useState(0);
  const [media, setMedia] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const pos = SunCalc.getPosition(new Date(), location.lat, location.lon);
    setSunAlt(pos.altitude * 180 / Math.PI);

    visiblePlanets(location.lat, location.lon).then(planets => {
      if (!mounted) return;
      const planet = planets.find(p => p.name.toLowerCase() === name.toLowerCase());
      setData(planet || null);
      setLoading(false);

      if (planet) {
        explain({ object: planet.name, data: planet }).then(text => {
          if (mounted) setBlurb(text);
        });
      }
    });

    nasaImages(`${name} planet`).then(images => {
      if (mounted) setMedia(images);
    });
    nasaVideo(`${name} planet`).then(vid => {
      if (mounted) setVideo(vid);
    });

    return () => { mounted = false; };
  }, [name, location.lat, location.lon]);

  if (loading) {
    return <div className="animate-pulse h-40 bg-white/5 rounded-2xl"></div>;
  }

  if (!data) {
    return <div className="text-muted text-center py-10">Planet data not found for {name}.</div>;
  }

  let badgeText = 'Below Horizon';
  let badgeClasses = 'bg-white/5 text-muted border-white/10';
  if (data.aboveHorizon) {
    if (sunAlt < -6) {
      badgeText = 'Visible';
      badgeClasses = 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20';
    } else if (sunAlt < 0) {
      badgeText = 'Twilight';
      badgeClasses = 'bg-[#F5B14C]/10 text-[#F5B14C] border-[#F5B14C]/20';
    } else {
      badgeText = 'Up (Daytime)';
      badgeClasses = 'bg-white/5 text-muted border-white/10';
    }
  }

  const facts = PLANET_FACTS[name.toLowerCase()] || {};

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

  const customImg = customImages[name.toLowerCase()];
  const displayMedia = customImg ? [{ thumbnail: customImg, title: data.name }, ...media] : media;
  const displayVideo = name.toLowerCase() === 'saturn' ? { videoUrl: SaturnVideoAsset } : video;

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">{data.name}</h1>
          <EquipmentBadge objectName={name} />
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeClasses} w-fit`}>
          {badgeText}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div layoutId={`planet-${name.toLowerCase()}`} className="h-[300px] md:h-[400px]">
          <CelestialBody3D name={name} />
        </motion.div>
        
        <div className="flex flex-col gap-4">
          {displayMedia.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 flex-1">
              {displayMedia.slice(0, 2).map((img, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 h-full min-h-[140px]">
                  <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
              {displayVideo && (
                <div className="col-span-2 rounded-xl overflow-hidden border border-white/10 bg-black/40 h-[200px] relative group">
                  <video src={displayVideo.videoUrl} controls className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
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
                <span className="text-muted">Constellation</span>
                <span className="font-medium text-primary">{data.constellation}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Altitude</span>
                <span className="font-medium text-primary">{data.altitude}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">Azimuth</span>
                <span className="font-medium text-primary">{data.azimuth}</span>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <MotionCard className="cursor-default h-full">
            <h2 className="text-xl font-display font-semibold mb-4">Planet Facts</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Type</span>
                <span className="font-medium text-primary">{facts.type || 'Unknown'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Diameter</span>
                <span className="font-medium text-primary">
                  {facts.diameter ? <><AnimatedNumber value={parseFloat(facts.diameter.replace(/,/g, ''))} format={v => Math.round(v).toLocaleString()} /> km</> : '?'}
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">Moons</span>
                <span className="font-medium text-primary">
                  {facts.moons !== undefined ? <AnimatedNumber value={facts.moons} format={v => Math.round(v)} /> : '?'}
                </span>
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
