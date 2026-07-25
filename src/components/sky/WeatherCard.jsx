import React, { useState, useEffect } from 'react';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Moon } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { getWeather } from '../../lib/api';
import MotionCard from '../ui/MotionCard';

export default function WeatherCard() {
  const { location } = useLocation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getWeather(location.lat, location.lon).then(data => {
      if (mounted) {
        setWeather(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [location.lat, location.lon]);

  if (loading || !weather) {
    return (
      <MotionCard className="h-44 relative overflow-hidden flex flex-col items-center justify-center border-[#22D3EE]/20 bg-[#22D3EE]/5">
        <div className="animate-pulse flex flex-col items-center">
          <Cloud className="w-8 h-8 text-[#22D3EE]/50 mb-2" />
          <div className="h-4 bg-white/10 rounded w-24"></div>
        </div>
      </MotionCard>
    );
  }

  let condition = "Clear Skies";
  let Icon = Moon;
  let color = "text-[#22D3EE]";
  let grade = "Excellent";
  let gradeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

  if (weather.cloudCover > 20) { 
    condition = "Partly Cloudy"; 
    Icon = Cloud; 
    grade = "Fair"; 
    gradeColor = "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    color = "text-slate-300"; 
  }
  if (weather.cloudCover > 60) { 
    condition = "Overcast"; 
    Icon = CloudFog; 
    grade = "Poor";
    gradeColor = "bg-red-500/20 text-red-400 border-red-500/30";
    color = "text-slate-400"; 
  }
  
  if (weather.weatherCode >= 50 && weather.weatherCode <= 69) { condition = "Rain"; Icon = CloudRain; grade = "Poor"; gradeColor = "bg-red-500/20 text-red-400 border-red-500/30"; color = "text-blue-400"; }
  if (weather.weatherCode >= 70 && weather.weatherCode <= 79) { condition = "Snow"; Icon = CloudSnow; grade = "Poor"; gradeColor = "bg-red-500/20 text-red-400 border-red-500/30"; color = "text-slate-200"; }
  if (weather.weatherCode >= 95) { condition = "Thunderstorm"; Icon = CloudLightning; grade = "Poor"; gradeColor = "bg-red-500/20 text-red-400 border-red-500/30"; color = "text-yellow-400"; }

  const isGood = grade === "Excellent" || grade === "Fair";

  return (
    <MotionCard className={`h-44 relative flex flex-col justify-between ${isGood ? 'border-[#22D3EE]/30 bg-gradient-to-br from-[#22D3EE]/10 to-transparent' : 'border-white/10 bg-black/20'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display font-semibold text-lg text-white mb-1">Stargazing Grade</h3>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${gradeColor}`}>
            {grade}
          </span>
        </div>
        <div className={`p-2 rounded-xl bg-white/5 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div>
        <div className="flex items-end gap-2 mb-1">
          <span className={`text-2xl font-bold tracking-tight ${isGood ? 'text-white' : 'text-slate-300'}`}>
            {condition}
          </span>
        </div>
        <p className="text-sm font-medium">
          {grade === "Excellent" ? (
             <span className="text-emerald-400">Perfect visibility tonight</span>
          ) : grade === "Fair" ? (
             <span className="text-yellow-400">Visibility might be limited ({weather.cloudCover}% clouds)</span>
          ) : (
             <span className="text-red-400">Not recommended tonight</span>
          )}
        </p>
      </div>
    </MotionCard>
  );
}
