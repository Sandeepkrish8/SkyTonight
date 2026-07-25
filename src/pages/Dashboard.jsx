import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Share, Check } from 'lucide-react';
import Container from '../components/layout/Container';
import ApodHero from '../components/hero/ApodHero';
import LocationBar from '../components/location/LocationBar';
import SkyGrid from '../components/sky/SkyGrid';
import CelestialCard from '../components/sky/CelestialCard';
import MoonPhaseCard from '../components/sky/MoonPhaseCard';
import IssPassCard from '../components/sky/IssPassCard';
import WeatherCard from '../components/sky/WeatherCard';
import BortleCard from '../components/sky/BortleCard';
import TonightItinerary from '../components/sky/TonightItinerary';
import DeepSkyTarget from '../components/sky/DeepSkyTarget';
import SpaceWeather from '../components/sky/SpaceWeather';
import { useLocation } from '../context/LocationContext';
import { visiblePlanets } from '../lib/api';
import MotionCard from '../components/ui/MotionCard';
import * as SunCalc from 'suncalc';

export default function Dashboard() {
  const { location } = useLocation();
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();
  const [sunAltDeg, setSunAltDeg] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const pos = SunCalc.getPosition(new Date(), location.lat, location.lon);
    setSunAltDeg(pos.altitude * 180 / Math.PI);

    visiblePlanets(location.lat, location.lon)
      .then((data) => {
        if (isMounted) {
          setPlanets(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to fetch visible planets:', err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [location.lat, location.lon]);

  const handleShare = async () => {
    const text = `I'm exploring the night sky from ${location.label.split(',')[0]} using SkyTonight! 🔭✨\n\nJoin me in finding planets, the Moon, and the ISS tonight!`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Container className="py-6">
      <ApodHero />

      <LocationBar />

      <div className="mt-8">
        <TonightItinerary location={location} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
        <DeepSkyTarget />
        <SpaceWeather />
      </div>

      <div className="my-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary">
              Visible Above You Tonight
            </h2>
            <span className="flex items-center text-xs px-2.5 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] border border-[#7C5CFF]/20 font-medium">
              <motion.span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#7C5CFF] mr-1.5"
                animate={reducedMotion ? {} : { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              Live Data ({location.label.split(',')[0]})
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors w-fit"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share className="w-4 h-4 text-[#22D3EE]" />}
            {copied ? 'Copied to Clipboard!' : 'Share My Sky'}
          </button>
        </div>
        <p className="text-sm text-muted mb-6">
          Live calculated position & astronomical objects calculated for latitude {location.lat.toFixed(2)}°, longitude {location.lon.toFixed(2)}°.
        </p>

        <SkyGrid>
          <WeatherCard />
          <BortleCard />
          <MoonPhaseCard />

          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <MotionCard
                key={idx}
                className="h-44 relative overflow-hidden"
              >
                {!reducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  />
                )}
                <div className="z-10 relative">
                  <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-white/10 rounded w-1/2 mb-2"></div>
                </div>
                <div className="h-4 bg-white/10 rounded w-2/3 z-10 relative mt-auto"></div>
              </MotionCard>
            ))
          ) : planets.length > 0 ? (
            planets.map((planet) => (
              <CelestialCard
                key={planet.name}
                name={planet.name}
                constellation={planet.constellation}
                altitude={planet.altitude}
                azimuth={planet.azimuth}
                aboveHorizon={planet.aboveHorizon}
                sunAltDeg={sunAltDeg}
              />
            ))
          ) : (
            <div className="p-6 rounded-2xl bg-elevated/40 border border-white/5 text-center text-muted col-span-full">
              No visible planets found for this location right now.
            </div>
          )}

          <IssPassCard />
        </SkyGrid>
      </div>
    </Container>
  );
}
