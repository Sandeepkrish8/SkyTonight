import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Eye, Sparkles } from 'lucide-react';
import MotionCard from '../ui/MotionCard';

const NAMES = ['Alex', 'Sarah', 'David', 'Emma', 'Michael', 'Chloe', 'James', 'Mia'];
const OBJECTS = ['Jupiter', 'the ISS', 'Orion Nebula', 'Mars', 'Andromeda Galaxy', 'Saturn', 'Venus', 'a shooting star'];

export default function CommunityFeed({ location }) {
  const [feed, setFeed] = useState([
    {
      id: 1,
      name: 'System',
      action: 'started tracking',
      object: 'the night sky',
      time: 'Just now'
    }
  ]);

  useEffect(() => {
    const city = location?.label?.split(',')[0] || "your area";
    let idCounter = 2;

    const interval = setInterval(() => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomObject = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
      
      const newSighting = {
        id: idCounter++,
        name: randomName,
        action: 'just spotted',
        object: randomObject,
        location: `Near ${city}`,
        time: 'Just now'
      };

      setFeed(prev => {
        const newFeed = [newSighting, ...prev];
        return newFeed.slice(0, 4); // Keep only the latest 4
      });
    }, 4500); // New sighting every 4.5 seconds for the demo

    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#7C5CFF]/20 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Users className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Live Community Feed
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              See what others are spotting right now
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {feed.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              layout
            >
              <MotionCard className="p-4 flex items-center gap-4 bg-black/40 hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] p-0.5 shrink-0">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE]">
                      {item.name[0]}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    <span className="font-bold text-[#22D3EE]">{item.name}</span> {item.action} <span className="text-[#7C5CFF] font-bold">{item.object}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    {item.location && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              </MotionCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
