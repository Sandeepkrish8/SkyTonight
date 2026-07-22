import React from 'react';

export default function ApodHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-elevated/70 border border-white/10 p-8 sm:p-12 text-center my-8 shadow-2xl backdrop-blur-md">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#7C5CFF]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#22D3EE]/20 rounded-full blur-3xl pointer-events-none"></div>

      <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold tracking-wider text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/20 uppercase">
        Night Sky Explorer
      </span>
      <h1 className="font-display text-3xl sm:text-5-xl font-extrabold text-primary tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
        Look up — here's what's above you tonight
      </h1>
      <p className="text-muted text-base sm:text-lg max-w-xl mx-auto font-normal">
        Real-time planet visibility, moon phase calculations, ISS pass predictions, and AI stargazing insights tuned to your location.
      </p>
    </div>
  );
}
