import React, { useState, useEffect } from 'react';
import { Camera, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ApodHero() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchApod = async () => {
      try {
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        if (!res.ok) throw new Error('APOD fetch failed');
        const data = await res.json();
        
        if (mounted && data.media_type === 'image') {
          setApod(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchApod();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] rounded-3xl bg-white/5 border border-white/10 animate-pulse mb-8" />
    );
  }

  if (!apod) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 group"
    >
      <img 
        src={apod.hdurl || apod.url} 
        alt={apod.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30 flex items-center gap-1.5 backdrop-blur-md">
            <Camera className="w-3.5 h-3.5" />
            NASA Photo of the Day
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white border border-white/10 backdrop-blur-md flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {apod.date}
          </span>
        </div>
        
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
          {apod.title}
        </h2>
        
        <p className="text-sm md:text-base text-slate-300 max-w-3xl line-clamp-2 md:line-clamp-3 mb-6">
          {apod.explanation}
        </p>
        
        <Link 
          to="/gallery"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#22D3EE] hover:text-white transition-colors w-fit group/link"
        >
          View Full Gallery
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
