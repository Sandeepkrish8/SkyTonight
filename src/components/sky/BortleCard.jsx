import React from 'react';
import MotionCard from '../ui/MotionCard';
import { useLocation } from '../../context/LocationContext';
import { LightbulbOff, Building, Trees, Mountain } from 'lucide-react';

export default function BortleCard() {
  const { location } = useLocation();

  // Pseudo-random but consistent heuristic for Bortle scale based on coordinates.
  // In a real app, this would query a Light Pollution map API.
  const calculateBortle = (lat, lon, name) => {
    if (!lat || !lon) return { class: 5, desc: 'Suburban Sky', vis: 'Milky Way washed out' };
    
    const lowerName = (name || '').toLowerCase();
    if (lowerName.includes('london') || lowerName.includes('new york') || lowerName.includes('tokyo') || lowerName.includes('city')) {
      return { class: 8, desc: 'City Sky', vis: 'Only bright planets and moon visible' };
    }
    
    // Hash function to generate a consistent number
    const hash = Math.abs(Math.sin(lat * 12.9898 + lon * 78.233)) * 43758.5453;
    const score = Math.floor((hash % 7) + 2); // 2 to 8
    
    if (score <= 3) return { class: score, desc: 'Dark Sky', vis: 'Milky Way clearly visible' };
    if (score <= 5) return { class: score, desc: 'Suburban Sky', vis: 'Milky Way washed out at zenith' };
    if (score <= 7) return { class: score, desc: 'Bright Suburban', vis: 'Only brightest stars visible' };
    return { class: score, desc: 'City Sky', vis: 'Only bright planets visible' };
  };

  const bortle = calculateBortle(location.lat, location.lon, location.name);
  
  let Icon = Building;
  let colorClass = 'text-red-400 bg-red-400/10 border-red-400/20';
  let badgeColor = 'bg-red-500/10 text-red-400';
  
  if (bortle.class <= 3) {
    Icon = Mountain;
    colorClass = 'text-green-400 bg-green-400/10 border-green-400/20';
    badgeColor = 'bg-green-500/10 text-green-400';
  } else if (bortle.class <= 5) {
    Icon = Trees;
    colorClass = 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    badgeColor = 'bg-yellow-500/10 text-yellow-400';
  } else if (bortle.class <= 7) {
    Icon = LightbulbOff;
    colorClass = 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    badgeColor = 'bg-orange-500/10 text-orange-400';
  }

  return (
    <MotionCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-white">Light Pollution</h3>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${colorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${badgeColor}`}>
            Class {bortle.class}
          </span>
        </div>
        
        <div className="text-2xl font-bold font-display text-[#E7ECF5] mb-1">
          {bortle.desc}
        </div>
        
        <p className="text-sm text-muted font-medium mb-4">
          Bortle Scale Estimate
        </p>
      </div>

      <div className="pt-4 mt-auto border-t border-white/5">
        <p className="text-xs text-muted mb-1 uppercase tracking-wider font-semibold">Visibility Expectation</p>
        <p className="text-sm text-primary">{bortle.vis}</p>
      </div>
    </MotionCard>
  );
}
