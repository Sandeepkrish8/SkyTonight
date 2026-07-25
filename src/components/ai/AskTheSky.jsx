import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

export default function AskTheSky() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your AI Stargazing Guide. Ask me anything about tonight's sky!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { location } = useLocation();
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setIsTyping(true);

    // Mock AI Response based on keywords
    setTimeout(() => {
      let aiResponse = "I'm not sure about that, but the sky is full of wonders tonight! Try checking the Telescope View.";
      const q = userMessage.text.toLowerCase();
      
      const city = location?.label?.split(',')[0] || "your area";

      if (q.includes('bright') && (q.includes('star') || q.includes('red'))) {
        aiResponse = `That bright red "star" you're seeing above ${city} is actually Mars! It's currently rising in the east and is very prominent tonight.`;
      } else if (q.includes('iss') || q.includes('space station')) {
        aiResponse = "The International Space Station completes an orbit every 90 minutes. Check the dashboard for the exact time it will fly over your coordinates tonight!";
      } else if (q.includes('moon')) {
        aiResponse = "The moon is in its Waning Gibbous phase tonight. The terminator line (where light meets dark) is a great place to point binoculars to see crater shadows!";
      } else if (q.includes('galaxy') || q.includes('andromeda')) {
        aiResponse = `From ${city}, you'll need to drive away from city lights to see Andromeda. Look towards the northeast—it appears as a faint, fuzzy smudge to the naked eye.`;
      }

      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] text-white flex items-center justify-center shadow-[0_0_20px_rgba(124,92,255,0.4)] z-40 transition-opacity ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[80vh] bg-black/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">Ask The Sky</h3>
                  <p className="text-[10px] text-[#22D3EE] uppercase tracking-wider font-medium">AI Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#7C5CFF] text-white rounded-tr-none' 
                        : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What is that bright star?"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#7C5CFF]/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!query.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-[#7C5CFF] text-white flex items-center justify-center hover:bg-[#6c4be0] disabled:opacity-50 disabled:hover:bg-[#7C5CFF] transition-colors shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
