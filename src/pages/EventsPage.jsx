import React from 'react';
import { Calendar, ArrowLeft, Bell, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { motion } from 'framer-motion';

import saturnImg from '../assets/saturn.jpg';
import jupiterImg from '../assets/jupiter.jpg';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Perseid Meteor Shower Peak',
    date: 'August 12-13',
    type: 'Meteor Shower',
    description: 'One of the best meteor showers of the year, producing up to 60 meteors per hour at its peak. Best viewing will be from a dark location after midnight.',
    icon: Star,
    color: 'from-orange-500/20 to-orange-400/5 text-orange-400 border-orange-500/20',
    image: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Saturn at Opposition',
    date: 'August 27',
    type: 'Planetary Opposition',
    description: 'The ringed planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long.',
    icon: Star,
    color: 'from-amber-500/20 to-amber-400/5 text-amber-400 border-amber-500/20',
    image: saturnImg
  },
  {
    id: 3,
    title: 'Supermoon (Harvest Moon)',
    date: 'September 29',
    type: 'Lunar Event',
    description: 'The Moon will be located on the opposite side of the Earth as the Sun and its face will be fully illuminated. This full moon was known by early Native American tribes as the Harvest Moon.',
    icon: Star,
    color: 'from-slate-300/20 to-slate-400/5 text-slate-300 border-slate-300/20',
    image: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Annular Solar Eclipse',
    date: 'October 14',
    type: 'Solar Eclipse',
    description: 'An annular solar eclipse occurs when the Moon is too far away from the Earth to completely cover the Sun. This results in a ring of light around the darkened Moon.',
    icon: Star,
    color: 'from-yellow-500/20 to-orange-500/5 text-yellow-400 border-yellow-500/20',
    image: 'https://images.unsplash.com/photo-1537429149819-74d6c41b87be?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Jupiter at Opposition',
    date: 'November 3',
    type: 'Planetary Opposition',
    description: 'The giant planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. A good pair of binoculars should allow you to see Jupiter\'s four largest moons.',
    icon: Star,
    color: 'from-[#7C5CFF]/20 to-[#22D3EE]/5 text-[#22D3EE] border-[#22D3EE]/20',
    image: jupiterImg
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#7C5CFF]/30 pb-20">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#22D3EE]/10 to-transparent -z-10 pointer-events-none" />
      
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
              Cosmic Events
            </h1>
            <p className="text-muted flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              Upcoming Astronomical Calendar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={event.id}
              className="relative group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all flex flex-col hover:-translate-y-1 shadow-xl hover:shadow-[#7C5CFF]/10"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${event.color.split(' ')[0]} ${event.color.split(' ')[1]} z-10`} />
              
              {/* Event Cover Image */}
              <div className="w-full h-48 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 -mt-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border ${event.color} bg-black/80 backdrop-blur-md`}>
                    {event.type}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white/80 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {event.date}
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl mb-3 text-white">
                  {event.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed flex-1">
                  {event.description}
                </p>

                <button className="mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-[#7C5CFF]/20 border border-white/10 hover:border-[#7C5CFF]/50 text-white transition-all group-hover:text-[#22D3EE]">
                  <Bell className="w-4 h-4" />
                  <span className="font-medium text-sm">Remind Me</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
