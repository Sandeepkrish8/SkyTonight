import React from 'react';

export default function IssPassCard() {
  return (
    <div className="p-6 rounded-2xl bg-elevated/60 border border-white/10 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-primary">ISS Space Station Pass</h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
          Orbit Tracker
        </span>
      </div>
      <p className="text-xs text-muted">Satellite passes prediction placeholder</p>
    </div>
  );
}
