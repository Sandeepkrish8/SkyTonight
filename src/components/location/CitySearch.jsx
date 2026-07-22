import React from 'react';

export default function CitySearch() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search city..."
        className="w-full px-4 py-2 bg-elevated/60 border border-white/10 rounded-xl text-sm text-primary placeholder-muted focus:outline-none focus:border-[#7C5CFF]"
      />
    </div>
  );
}
