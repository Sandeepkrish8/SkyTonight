import React from 'react';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8 bg-base/50 text-center text-sm text-muted">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-display font-semibold text-primary">SkyTonight</span> — Real-time Ephemeris & Stargazing AI
        </div>
        <div className="text-xs text-muted/70">
          Powered by SunCalc, VisiblePlanets API & NASA APOD
        </div>
      </Container>
    </footer>
  );
}
