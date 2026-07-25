import React, { useState, useEffect } from 'react';
import { Book, Plus, Star, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ object: '', notes: '' });

  useEffect(() => {
    const saved = localStorage.getItem('skytonight_journal');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntries = (updatedEntries) => {
    setEntries(updatedEntries);
    localStorage.setItem('skytonight_journal', JSON.stringify(updatedEntries));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newEntry.object.trim()) return;
    
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      object: newEntry.object,
      notes: newEntry.notes
    };
    
    saveEntries([entry, ...entries]);
    setNewEntry({ object: '', notes: '' });
  };

  const handleDelete = (id) => {
    saveEntries(entries.filter(e => e.id !== id));
  };

  return (
    <Container className="py-12 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/20 flex items-center justify-center border border-white/10">
            <Book className="w-6 h-6 text-[#22D3EE]" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Observation Journal</h1>
            <p className="text-sm text-muted">Log the celestial bodies you've spotted.</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-elevated/40 border border-white/5 mb-8"
        >
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1 uppercase tracking-wider">Celestial Object</label>
              <input
                type="text"
                value={newEntry.object}
                onChange={e => setNewEntry({ ...newEntry, object: e.target.value })}
                placeholder="e.g. Jupiter, ISS, Orion Nebula"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#7C5CFF]/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-1 uppercase tracking-wider">Observation Notes</label>
              <textarea
                value={newEntry.notes}
                onChange={e => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder="What did you see? Weather conditions, equipment used..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white min-h-[80px] focus:outline-none focus:border-[#7C5CFF]/50 transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              className="self-end inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </button>
          </form>
        </motion.div>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-muted border border-white/5 rounded-2xl bg-white/5 border-dashed">
              No observations logged yet. Go look at the sky!
            </div>
          ) : (
            entries.map(entry => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-black/40 border border-white/10 relative group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-[#22D3EE]">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <h3 className="font-display font-bold text-lg text-white">{entry.object}</h3>
                  </div>
                  <span className="text-xs text-muted font-medium">
                    {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-sm text-slate-300 leading-relaxed mt-2">{entry.notes}</p>
                )}
                
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}
