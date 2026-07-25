import React from 'react';
import { Activity, Wind, Sun, Zap, AlertTriangle, CloudOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from '../../context/LocationContext';

export default function SpaceWeather() {
  const { location } = useLocation();
  const absLat = Math.abs(location.lat);
  const isHighLat = absLat >= 50;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 h-[400px] flex flex-col shadow-2xl group"
    >
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0f1c]">
        {isHighLat ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-[#7C5CFF]/10 to-transparent mix-blend-screen opacity-50" />
            
            {/* Animated Orbs */}
            <motion.div 
              animate={{ 
                x: ['-20%', '20%', '-20%'],
                y: ['0%', '10%', '0%']
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-emerald-500/20 rounded-full blur-[80px]"
            />
            <motion.div 
              animate={{ 
                x: ['20%', '-20%', '20%'],
                y: ['10%', '0%', '10%']
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-[20%] -right-[20%] w-[90%] h-[90%] bg-[#7C5CFF]/20 rounded-full blur-[100px]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent mix-blend-screen opacity-50" />
        )}
        
        {/* Dark Vignette to ground the design */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b15] via-transparent to-[#080b15]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Space Weather & Aurora
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isHighLat ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isHighLat ? 'text-emerald-400' : 'text-slate-400'}`}>Live Forecast</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* KP Index */}
          <div className={`col-span-2 sm:col-span-1 rounded-2xl bg-black/40 backdrop-blur-md border ${isHighLat ? 'border-emerald-500/20 group-hover:border-emerald-500/40' : 'border-white/10'} p-5 flex flex-col justify-between transition-colors`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-semibold uppercase tracking-widest ${isHighLat ? 'text-emerald-400/80' : 'text-slate-400'}`}>KP Index</span>
              <AlertTriangle className={`w-4 h-4 ${isHighLat ? 'text-emerald-400/50' : 'text-slate-400/50'}`} />
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-bold text-5xl text-white tracking-tighter drop-shadow-md">4.3</span>
                <span className="text-sm font-medium text-muted">/ 9</span>
              </div>
              <p className={`text-sm font-medium ${isHighLat ? 'text-emerald-400' : 'text-slate-400'}`}>Moderate Activity</p>
            </div>
          </div>

          {/* Solar Wind */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">Solar Wind</span>
              <Wind className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-bold text-4xl text-white tracking-tighter">412</span>
                <span className="text-sm font-medium text-muted">km/s</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">Steady Stream</p>
            </div>
          </div>
        </div>

        {/* Verdict / Forecast */}
        <div className={`mt-4 p-4 rounded-xl border flex items-center gap-4 backdrop-blur-md ${isHighLat ? 'bg-gradient-to-r from-emerald-500/10 to-[#7C5CFF]/10 border-white/10' : 'bg-white/5 border-white/10'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${isHighLat ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}>
            {isHighLat ? <Zap className="w-5 h-5 text-emerald-400" /> : <CloudOff className="w-5 h-5 text-slate-400" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Aurora Visibility Verdict</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isHighLat 
                ? "Auroras may be visible at high latitudes tonight. Dark sky location strongly recommended."
                : "Auroras are generally not visible from your current latitude, as they typically require traveling closer to the poles."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
