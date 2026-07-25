import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StarField from './components/layout/StarField';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ObjectDetail from './pages/ObjectDetail';
import TelescopePage from './pages/TelescopePage';
import JournalPage from './pages/JournalPage';
import GalleryPage from './pages/GalleryPage';
import AskTheSky from './components/ai/AskTheSky';

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-base text-primary font-body flex flex-col selection:bg-[#7C5CFF]/30">
      <StarField />

      <Header />

      <main className="flex-1 z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Dashboard />} />
            <Route path="/telescope" element={<TelescopePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/object/:name" element={<ObjectDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <AskTheSky />
    </div>
  );
}
