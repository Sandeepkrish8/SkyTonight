import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../components/layout/Container';
import MoonPage from '../components/details/MoonPage';
import IssPage from '../components/details/IssPage';
import PlanetPage from '../components/details/PlanetPage';
import { ArrowLeft } from 'lucide-react';

export default function ObjectDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const renderContent = () => {
    if (!name) return null;
    const lowerName = name.toLowerCase();
    
    if (lowerName === 'moon') return <MoonPage />;
    if (lowerName === 'iss') return <IssPage />;
    return <PlanetPage name={name} />;
  };

  const variants = reducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Container className="py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted hover:text-primary transition-colors mb-6 group outline-none"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        {renderContent()}
      </Container>
    </motion.div>
  );
}
