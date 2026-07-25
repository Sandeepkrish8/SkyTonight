import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MotionCard from '../ui/MotionCard';
import { Satellite, Clock, Compass, Eye } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { issPass } from '../../lib/api';

export default function IssPassCard() {
  const { location } = useLocation();
  const [passData, setPassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let intervalId = null;

    const fetchData = async () => {
      const data = await issPass(location.lat, location.lon);
      if (mounted) {
        setPassData(data);
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh live position every 10 seconds
    intervalId = setInterval(fetchData, 10000);

    return () => { 
      mounted = false; 
      clearInterval(intervalId);
    };
  }, [location.lat, location.lon]);

  return (
    <Link 
      to="/object/iss" 
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-3xl"
    >
      <MotionCard className="h-full cursor-pointer flex flex-col justify-between group hover:bg-[#22D3EE]/5 hover:-translate-y-1 transition-all">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              Live Prediction
            </span>
            <div className="w-10 h-10 rounded-full bg-[#22D3EE]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Satellite className="text-[#22D3EE] w-5 h-5" />
            </div>
          </div>
          <h3 className="font-display text-lg font-bold text-primary mb-2">Next ISS Pass</h3>
          
          {passData?.currentPosition && (
            <p className="text-[10px] text-muted mb-4 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Currently over {passData.currentPosition.lat}, {passData.currentPosition.lon}
            </p>
          )}
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-2/3"></div>
          </div>
        ) : !passData?.pass ? (
          <div className="py-2">
            <p className="text-sm text-muted font-medium">
              No visible ISS passes predicted over this location in the next 5 days.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Clock className="w-4 h-4 text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted font-medium mb-0.5">Time & Direction</p>
                <p className="text-sm font-semibold text-primary">{passData.pass.start} • {passData.pass.direction}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Eye className="w-4 h-4 text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted font-medium mb-0.5">Visible</p>
                <p className="text-sm font-semibold text-primary">{passData.pass.duration} <span className="text-xs text-muted font-normal">({passData.pass.brightness})</span></p>
              </div>
            </div>
          </div>
        )}
      </MotionCard>
    </Link>
  );
}
