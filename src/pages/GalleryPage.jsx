import React, { useState, useEffect } from 'react';
import { Camera, Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch last 15 days of NASA APOD
    const fetchImages = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 15);

        const startStr = startDate.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];

        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startStr}&end_date=${endStr}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch from NASA APOD');
        
        const data = await response.json();
        // Reverse so newest is first, and filter out videos if any
        const filtered = data.reverse().filter(item => item.media_type === 'image');
        setImages(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#7C5CFF]/30 pb-20">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#7C5CFF]/10 to-transparent -z-10 pointer-events-none" />
      
      <Container className="pt-24 md:pt-32">
        <div className="flex items-center gap-4 mb-12">
          <Link 
            to="/" 
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              NASA Gallery
            </h1>
            <p className="text-muted flex items-center gap-2 mt-1">
              <Camera className="w-4 h-4" />
              Astronomy Picture of the Day
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-muted">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#22D3EE]" />
            <p>Fetching from NASA servers...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-400 bg-red-500/10 rounded-2xl border border-red-500/20">
            {error} (NASA DEMO_KEY rate limit may be exceeded. Try again later.)
          </div>
        )}

        {!loading && !error && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={img.date} 
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display font-bold text-lg mb-1 leading-tight">{img.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#22D3EE] font-medium mb-3">
                      <Calendar className="w-3 h-3" />
                      {img.date}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {img.explanation}
                    </p>
                    {img.hdurl && (
                      <a 
                        href={img.hdurl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block mt-4 text-xs font-semibold text-white/80 hover:text-white underline decoration-white/30 underline-offset-4"
                      >
                        View High-Res
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
