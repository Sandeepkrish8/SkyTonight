import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';
import { reverseGeocode } from '../../lib/api';
import CitySearch from './CitySearch';

export default function LocationBar() {
  const { location, setLocation } = useLocation();
  const [locating, setLocating] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude.toFixed(4));
        const lon = Number(position.coords.longitude.toFixed(4));

        const placeLabel = await reverseGeocode(lat, lon);
        const finalLabel = placeLabel ? placeLabel : `My Location (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;

        setLocation({
          lat,
          lon,
          label: finalLabel
        });
        setLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not detect your location. Please check location permissions.');
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

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
          <div className="text-xs text-muted">Active Observation Location</div>
          <div className="text-sm font-semibold text-primary">
            {location.label} <span className="text-xs font-normal text-muted font-mono">({location.lat.toFixed(2)}°, {location.lon.toFixed(2)}°)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <CitySearch />
        <button
          onClick={handleDetectLocation}
          disabled={locating}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-primary transition border border-white/10 flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          {locating ? (
            <>
              <div className="w-3 h-3 border-2 border-white/20 border-t-[#22D3EE] rounded-full animate-spin"></div>
              <span>Detecting...</span>
            </>
          ) : (
            <span>Detect My Location</span>
          )}
        </button>
      </div>
    </div>
  );
}
