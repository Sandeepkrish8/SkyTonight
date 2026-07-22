import React from 'react';

export default function MoonPhaseCard({ phaseName = 'Waxing Gibbous', illumination = 78 }) {
  return (
    <div className="p-6 rounded-2xl bg-elevated/60 border border-white/10 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-primary">Moon Phase</h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F5B14C]/10 text-[#F5B14C] border border-[#F5B14C]/20">
          {illumination}% Illuminated
        </span>
      </div>
      <div className="text-2xl font-bold font-display text-[#E7ECF5] mb-2">{phaseName}</div>
      <p className="text-xs text-muted">Real-time astronomical phase derived via SunCalc</p>
    </div>
  );
}
