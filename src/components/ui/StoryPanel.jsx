import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, BookOpen, Atom, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIStory } from '../../lib/ai-stories';

export default function StoryPanel({ objectId, onClose }) {
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [mode, setMode] = useState('science'); // 'science' | 'lore'
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!objectId) {
      setStoryData(null);
      setTypedText('');
      setMode('science');
      setSaved(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setStoryData(null);
    setTypedText('');
    setSaved(false);

    getAIStory(objectId).then((data) => {
      if (isMounted) {
        setStoryData(data);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [objectId]);

  // Simulate AI typing effect
  useEffect(() => {
    if (!storyData || loading) return;

    setTypedText(''); // Reset when mode changes
    const targetText = storyData[mode] || '';

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(targetText.substring(0, i));
      i++;
      if (i > targetText.length) {
        clearInterval(interval);
      }
    }, 20); // 20ms per character

    return () => clearInterval(interval);
  }, [storyData, loading, mode]);

  const handleLogJournal = () => {
    if (!storyData || saved) return;
    
    const existing = localStorage.getItem('skytonight_journal');
    const entries = existing ? JSON.parse(existing) : [];
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      object: storyData.title,
      notes: `Logged directly from the AI Telescope Guide while in ${mode === 'science' ? 'Science' : 'Mythology'} mode.`
    };
    
    localStorage.setItem('skytonight_journal', JSON.stringify([newEntry, ...entries]));
    setSaved(true);
  };

  return (
    <AnimatePresence>
      {objectId && (
        <motion.div
          initial={{ opacity: 0, y: '100%', x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: '100%', x: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 bottom-0 w-full md:top-0 md:w-96 md:h-full max-h-[70vh] md:max-h-none bg-black/90 backdrop-blur-3xl md:border-l border-t md:border-t-0 border-white/20 p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:shadow-2xl z-50 pointer-events-auto flex flex-col rounded-t-3xl md:rounded-none"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 md:hidden" />

          <div className="flex items-center gap-2 mb-4 md:mb-6 mt-2">
            <Sparkles className="w-5 h-5 text-[#7C5CFF]" />
            <h2 className="font-display font-bold text-[#7C5CFF] tracking-wide text-sm uppercase">
              AI Guide
            </h2>
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/50">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#22D3EE]" />
              <p className="text-sm animate-pulse">Consulting the cosmic archives...</p>
            </div>
          ) : storyData ? (
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col">
              <h1 className="font-display text-4xl font-bold mb-1 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {storyData.title}
              </h1>
              <p className="text-[#22D3EE] font-medium text-sm tracking-wider uppercase mb-6">
                {storyData.subtitle}
              </p>
              
              {/* Mode Toggle */}
              <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 mb-6 shrink-0">
                <button
                  onClick={() => setMode('science')}
                  className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'science' 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <Atom className="w-4 h-4" />
                  Science
                </button>
                <button
                  onClick={() => setMode('lore')}
                  className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${
                    mode === 'lore' 
                      ? 'bg-[#F5B14C]/20 text-[#F5B14C] shadow-sm' 
                      : 'text-white/50 hover:text-[#F5B14C]/80'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Mythology
                </button>
              </div>

              <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-slate-300">
                <p>{typedText}</p>
                {storyData[mode] && typedText.length < storyData[mode].length && (
                  <span className="inline-block w-2 h-4 bg-[#7C5CFF] ml-1 animate-pulse" />
                )}
              </div>
              
              {/* Spacer */}
              <div className="flex-1 min-h-[40px]" />
              
              <button
                onClick={handleLogJournal}
                disabled={saved}
                className={`mt-8 shrink-0 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  saved 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved to Journal
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    I Saw This!
                  </>
                )}
              </button>
            </div>
          ) : null}

          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-white/40 flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            AI Storytelling Active
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
