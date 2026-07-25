import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Map, Sparkles, Loader2, Moon } from 'lucide-react';
import MotionCard from '../ui/MotionCard';
import * as SunCalc from 'suncalc';
import { issPass, visiblePlanets } from '../../lib/api';

export default function TonightItinerary({ location }) {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function generateItinerary() {
      try {
        const city = location?.label?.split(',')[0] || "your area";
        const now = new Date();
        const generatedEvents = [];

        // 1. Golden Hour / Sunset
        const times = SunCalc.getTimes(now, location.lat, location.lon);
        const formatTime = (date) => {
          if (!date || isNaN(date)) return "Unknown";
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };
        
        const sunsetTime = formatTime(times.sunset);
        generatedEvents.push({
          time: sunsetTime,
          title: "Golden Hour Glow",
          description: `The sun will begin setting over ${city}, providing perfect conditions to spot bright objects low on the western horizon as twilight deepens.`,
          icon: <Star className="w-4 h-4 text-yellow-400" />
        });

        // 2. ISS Flyover (Conditional based on real data)
        const issData = await issPass(location.lat, location.lon);
        if (issData && issData.pass) {
          generatedEvents.push({
            time: issData.pass.start,
            title: "ISS Flyover",
            description: `Look up! The International Space Station will make a transit across the sky for ${issData.pass.duration}. It will look like a very fast-moving, unblinking star approaching from the ${issData.pass.direction}.`,
            icon: <Map className="w-4 h-4 text-[#22D3EE]" />
          });
        }

        // 3. Deep Sky or Moon Viewing
        const darkTime = times.nauticalDusk || new Date(now.getTime() + 2 * 60 * 60 * 1000);
        
        // Let's check visible planets for a specific recommendation
        let deepSkyDesc = "The sky is fully dark now. If you drive away from city lights, the Andromeda Galaxy and Orion Nebula will be positioned for viewing.";
        let icon = <Sparkles className="w-4 h-4 text-[#7C5CFF]" />;
        let title = "Deep Sky Viewing";
        
        try {
          const planets = await visiblePlanets(location.lat, location.lon);
          const jupiter = planets.find(p => p.name === 'Jupiter' && p.aboveHorizon);
          const venus = planets.find(p => p.name === 'Venus' && p.aboveHorizon);
          
          if (jupiter) {
            deepSkyDesc = `Jupiter is currently visible in ${jupiter.constellation} at an altitude of ${jupiter.altitude}. A great time to pull out the binoculars or telescope!`;
            title = "Planet Spotting: Jupiter";
          } else if (venus) {
            deepSkyDesc = `Venus is currently visible in ${venus.constellation} at an altitude of ${venus.altitude}. A brilliant target for early evening viewing!`;
            title = "Planet Spotting: Venus";
          }
        } catch (err) {
          // Fallback to deep sky
        }

        generatedEvents.push({
          time: formatTime(darkTime),
          title: title,
          description: deepSkyDesc,
          icon: icon
        });

        // Sort events chronologically (roughly based on strings if needed, but our order is generally Sunset -> ISS -> Dark Sky)
        // Since ISS passes can happen anytime, we'll just sort them sequentially as generated.
        
        if (isMounted) {
          setItinerary(generatedEvents);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error generating itinerary:", err);
        if (isMounted) setLoading(false);
      }
    }

    generateItinerary();

    return () => { isMounted = false; };
  }, [location]);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/20 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(124,92,255,0.2)]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            AI Stargazing Itinerary
          </h2>
          <p className="text-xs text-[#22D3EE] font-medium tracking-wide uppercase">
            Custom generated for {location?.label?.split(',')[0] || 'You'}
          </p>
        </div>
      </div>

      <MotionCard className="p-6 sm:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-32 bg-[#7C5CFF]/5 rounded-full blur-3xl group-hover:bg-[#7C5CFF]/10 transition-colors duration-700" />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-white/50">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#22D3EE]" />
            <p className="text-sm">Calculating celestial mechanics for your exact coordinates...</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col gap-8">
            {itinerary.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex gap-6 relative"
              >
                {/* Timeline line */}
                {idx !== itinerary.length - 1 && (
                  <div className="absolute left-6 top-10 bottom-[-32px] w-px bg-gradient-to-b from-white/10 to-transparent" />
                )}
                
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shadow-lg">
                  {item.icon}
                </div>
                
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-[#7C5CFF] bg-[#7C5CFF]/10 px-2.5 py-0.5 rounded-full border border-[#7C5CFF]/20 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </MotionCard>
    </div>
  );
}
