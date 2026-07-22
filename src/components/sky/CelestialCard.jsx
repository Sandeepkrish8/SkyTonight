import React from 'react';

export default function CelestialCard({ name = 'Jupiter', constellation = 'Taurus', altitude = '34°', azimuth = '142° SE' }) {
  return (
    <div className="p-6 rounded-2xl bg-elevated/60 border border-white/10 hover:border-white/20 transition-all shadow-lg backdrop-blur-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20">
            Visible
          </span>
          <span className="text-xs text-muted font-medium">{constellation}</span>
        </div>
        <h3 className="font-display text-xl font-bold text-primary mb-1">{name}</h3>
        <p className="text-xs text-muted mb-4">Celestial Object</p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-xs">
        <div>
          <span className="text-muted block">Altitude</span>
          <span className="font-semibold text-primary">{altitude}</span>
        </div>
        <div>
          <span className="text-muted block">Azimuth</span>
          <span className="font-semibold text-primary">{azimuth}</span>
        </div>
      </div>
    </div>
  );
}
