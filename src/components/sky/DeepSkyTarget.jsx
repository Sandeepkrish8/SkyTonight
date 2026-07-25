import React from 'react';
import { Sparkles, Telescope, Info, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeepSkyTarget() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group h-[400px] flex flex-col justify-end shadow-2xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1200" 
          alt="Andromeda Galaxy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b15] via-[#080b15]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b15]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            Target of the Night
          </div>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2 tracking-tight drop-shadow-md">
            Andromeda Galaxy
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-md drop-shadow">
            The nearest major galaxy to the Milky Way. Under dark skies, it appears as a faint, elongated smudge to the naked eye.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <MapPin className="w-4 h-4 text-[#7C5CFF]" />
              <div>
                <div className="text-[10px] text-muted uppercase font-bold tracking-wider mb-0.5">Constellation</div>
                <div className="text-sm font-medium text-white">Andromeda</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <Info className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-muted uppercase font-bold tracking-wider mb-0.5">Magnitude</div>
                <div className="text-sm font-medium text-white">3.44 (Visible)</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7C5CFF]/20 backdrop-blur-md border border-[#7C5CFF]/30">
              <Telescope className="w-4 h-4 text-[#22D3EE]" />
              <div>
                <div className="text-[10px] text-[#22D3EE] uppercase font-bold tracking-wider mb-0.5">Equipment</div>
                <div className="text-sm font-medium text-white">Binoculars</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
