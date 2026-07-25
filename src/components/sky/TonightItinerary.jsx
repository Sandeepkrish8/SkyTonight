import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Map, Sparkles, Loader2 } from 'lucide-react';
import MotionCard from '../ui/MotionCard';

export default function TonightItinerary({ location }) {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI generation of an itinerary based on location
    setLoading(true);
    const timer = setTimeout(() => {
      const city = location?.label?.split(',')[0] || "your area";
      const now = new Date();
      
      const hour1 = (now.getHours() + 1) % 24;
      const hour2 = (now.getHours() + 3) % 24;
      const hour3 = (now.getHours() + 5) % 24;
      
      const formatTime = (h) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr}:00 ${ampm}`;
      };

      setItinerary([
        {
          time: formatTime(hour1),
          title: "Golden Hour Glow",
          description: `The sun will begin setting over ${city}, providing perfect conditions to spot Venus low on the western horizon before it dips out of sight.`,
          icon: <Star className="w-4 h-4 text-yellow-400" />
        },
        {
          time: formatTime(hour2),
          title: "ISS Flyover",
          description: "Look straight up! The International Space Station will make a bright, 4-minute transit across the sky. It will look like a very fast-moving, unblinking star.",
          icon: <Map className="w-4 h-4 text-[#22D3EE]" />
        },
        {
          time: formatTime(hour3),
          title: "Deep Sky Viewing",
          description: "The sky is fully dark now. If you drive 20 minutes away from city lights, the Andromeda Galaxy and Orion Nebula will be perfectly positioned for binocular viewing.",
          icon: <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
        }
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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
