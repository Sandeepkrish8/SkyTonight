import React, { useState, useEffect } from 'react';
import { useLocation } from '../../context/LocationContext';
import { explain, issPass } from '../../lib/api';
import MotionCard from '../ui/MotionCard';
import { motion, useReducedMotion } from 'framer-motion';
import { nasaImages, nasaVideo } from '../../lib/nasaMedia';
import AnimatedNumber from '../ui/AnimatedNumber';
import IssVideo from '../../assets/Animate_this_photo_of_the_Inte.mp4';

export default function IssPage() {
  const { location } = useLocation();
  const reducedMotion = useReducedMotion();
  const [data, setData] = useState(null);
  const [passes, setPasses] = useState(null);
  const [crewCount, setCrewCount] = useState(null);
  const [blurb, setBlurb] = useState('');
  const [media, setMedia] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchIss = async () => {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        console.error("Failed to fetch ISS:", err);
      }
    };
    
    fetchIss();
    const interval = setInterval(fetchIss, 5000);

    issPass(location.lat, location.lon).then(passData => {
      if (mounted) setPasses(passData);
    });

    fetch('http://api.open-notify.org/astros.json')
      .then(res => res.json())
      .then(json => {
        if (mounted) setCrewCount(json.number);
      })
      .catch(err => {
        console.warn("Crew fetch failed (possibly mixed content):", err);
        if (mounted) setCrewCount('Unknown');
      });

    nasaImages('International Space Station').then(images => {
      if (mounted) setMedia(images);
    });
    nasaVideo('International Space Station').then(vid => {
      if (mounted) setVideo(vid);
    });

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [location.lat, location.lon]);

  useEffect(() => {
    let mounted = true;
    if (data && blurb === '') {
      explain({ object: 'ISS', data: { ...data, crewCount } }).then(text => {
        if (mounted) setBlurb(text);
      });
    }
    return () => { mounted = false; };
  }, [data, crewCount, blurb]);

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
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">International Space Station</h1>
        <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20">
          Orbit Tracker
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[300px] md:h-[400px]">
          <video 
            src={IssVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover rounded-2xl border border-white/10 bg-black/40"
          />
        </div>
        
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
            <h2 className="text-xl font-display font-semibold mb-4">Live Telemetry</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Latitude</span>
                <span className="font-medium text-primary">
                  <AnimatedNumber value={data.latitude} format={v => v.toFixed(4)} />°
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Longitude</span>
                <span className="font-medium text-primary">
                  <AnimatedNumber value={data.longitude} format={v => v.toFixed(4)} />°
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Altitude</span>
                <span className="font-medium text-primary">
                  <AnimatedNumber value={data.altitude} format={v => Math.round(v)} /> km
                </span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">Velocity</span>
                <span className="font-medium text-primary">
                  <AnimatedNumber value={data.velocity} format={v => Math.round(v).toLocaleString()} /> km/h
                </span>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <MotionCard className="cursor-default h-full">
            <h2 className="text-xl font-display font-semibold mb-4">Station Facts & Passes</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Crew on Board</span>
                <span className="font-medium text-primary">
                  {typeof crewCount === 'number' ? <AnimatedNumber value={crewCount} format={v => Math.round(v)} /> : (crewCount || 'Loading...')}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Orbital Period</span>
                <span className="font-medium text-primary">~92.6 minutes</span>
              </div>
              <div className="flex flex-col pb-2">
                <span className="text-muted mb-2">Next Visible Pass</span>
                {passes ? (
                  <div className="bg-white/5 p-3 rounded text-primary">
                    {passes.start ? (
                      <>
                        <div>Starts: {passes.start}</div>
                        <div>Duration: {passes.duration}</div>
                        <div>Max Elevation: {passes.maxElevation}</div>
                      </>
                    ) : (
                      <div>No visible passes in the near future.</div>
                    )}
                  </div>
                ) : (
                  <div className="text-primary animate-pulse">Calculating...</div>
                )}
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
