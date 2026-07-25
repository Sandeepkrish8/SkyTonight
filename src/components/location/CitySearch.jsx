import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '../../context/LocationContext';
import { geocodeCity } from '../../lib/api';

export default function CitySearch() {
  const { setLocation } = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      geocodeCity(query)
        .then(items => {
          setResults(items);
          setIsOpen(items.length > 0);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setLocation({
      lat: item.lat,
      lon: item.lon,
      label: item.label
    });
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full sm:w-64" ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city (e.g. Tokyo)..."
            className="w-full px-4 py-2 bg-elevated/80 border border-white/10 rounded-xl text-sm text-primary placeholder-muted focus:outline-none focus:border-[#7C5CFF] transition"
          />
          {loading && (
            <div className="absolute right-3 top-2.5 w-4 h-4 border-2 border-white/20 border-t-[#7C5CFF] rounded-full animate-spin"></div>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#121624] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto backdrop-blur-md">
          {results.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-2.5 text-xs text-primary hover:bg-white/10 transition border-b border-white/5 last:border-0"
            >
              <div className="font-semibold text-white/90 truncate">{item.label}</div>
              <div className="text-[10px] text-muted">{item.lat.toFixed(2)}°, {item.lon.toFixed(2)}°</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
