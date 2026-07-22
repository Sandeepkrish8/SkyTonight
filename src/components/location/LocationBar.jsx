import React from 'react';

export default function LocationBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-elevated/40 border border-white/5 my-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#22D3EE]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <div>
          <div className="text-xs text-muted">Current Location</div>
          <div className="text-sm font-semibold text-primary">London, UK (Default)</div>
        </div>
      </div>
      <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-primary transition border border-white/10 flex items-center space-x-2">
        <span>Detect My Location</span>
      </button>
    </div>
  );
}
