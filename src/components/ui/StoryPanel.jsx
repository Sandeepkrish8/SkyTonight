import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIStory } from '../../lib/ai-stories';

export default function StoryPanel({ objectId, onClose }) {
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!objectId) {
      setStoryData(null);
      setTypedText('');
      return;
    }

    let isMounted = true;
    setLoading(true);
    setStoryData(null);
    setTypedText('');

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

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(storyData.story.substring(0, i));
      i++;
      if (i > storyData.story.length) {
        clearInterval(interval);
      }
    }, 20); // 20ms per character

    return () => clearInterval(interval);
  }, [storyData, loading]);

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

          <div className="flex items-center gap-2 mb-4 md:mb-8 mt-2">
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
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h1 className="font-display text-4xl font-bold mb-1 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {storyData.title}
              </h1>
              <p className="text-[#22D3EE] font-medium text-sm tracking-wider uppercase mb-8">
                {storyData.subtitle}
              </p>
              
              <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-slate-300">
                <p>{typedText}</p>
                {typedText.length < storyData.story.length && (
                  <span className="inline-block w-2 h-4 bg-[#7C5CFF] ml-1 animate-pulse" />
                )}
              </div>
            </div>
          ) : null}

          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-white/40 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            AI Storytelling Active
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
