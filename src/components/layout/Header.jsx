import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import logoImg from '../../assets/logo.png';
import { Telescope, Book, Camera, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-base/80 border-b border-white/10 transition-all">
      <Container className="py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-lg shadow-[#7C5CFF]/20 group-hover:scale-105 transition-transform flex items-center justify-center bg-transparent">
            <img src={logoImg} alt="SkyTonight Logo" className="w-full h-full object-cover mix-blend-screen" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-[#7C5CFF] via-[#a78bfa] to-[#22D3EE] bg-clip-text text-transparent">
            SkyTonight
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/gallery"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
          >
            <Camera className="w-4 h-4 text-[#7C5CFF]" />
            <span>Gallery</span>
          </Link>

          <Link
            to="/journal"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
          >
            <Book className="w-4 h-4 text-[#7C5CFF]" />
            <span>Journal</span>
          </Link>

          <Link
            to="/telescope"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
          >
            <Telescope className="w-4 h-4 text-[#22D3EE]" />
            <span>Telescope View</span>
          </Link>

          <Link
            to="/app"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#7C5CFF]/25 hover:shadow-[#7C5CFF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-1.5"
          >
            <span>Open the Sky</span>
            <span>→</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col pt-6 px-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Menu
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium"
              >
                <div className="w-10 h-10 rounded-lg bg-[#7C5CFF]/20 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#7C5CFF]" />
                </div>
                <span className="text-lg">NASA Gallery</span>
              </Link>

              <Link
                to="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium"
              >
                <div className="w-10 h-10 rounded-lg bg-[#7C5CFF]/20 flex items-center justify-center">
                  <Book className="w-5 h-5 text-[#7C5CFF]" />
                </div>
                <span className="text-lg">Observation Journal</span>
              </Link>

              <Link
                to="/telescope"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium"
              >
                <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center">
                  <Telescope className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <span className="text-lg">3D Telescope View</span>
              </Link>
              
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 py-4 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] text-white text-center font-bold text-lg shadow-lg shadow-[#7C5CFF]/25"
              >
                Open the Sky Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
