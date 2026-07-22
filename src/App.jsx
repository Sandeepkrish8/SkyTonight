import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import StarField from './components/layout/StarField';
import ApodHero from './components/hero/ApodHero';
import LocationBar from './components/location/LocationBar';
import SkyGrid from './components/sky/SkyGrid';
import CelestialCard from './components/sky/CelestialCard';
import MoonPhaseCard from './components/sky/MoonPhaseCard';
import IssPassCard from './components/sky/IssPassCard';
import SkyGuideChat from './components/ai/SkyGuideChat';

export default function App() {
  return (
    <div className="relative min-h-screen bg-base text-primary font-body flex flex-col selection:bg-[#7C5CFF]/30">
      <StarField />
      
      <Header />
      
      <main className="flex-1 z-10">
        <Container>
          <ApodHero />
          
          <LocationBar />
          
          <div className="my-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary mb-2">
              Visible Above You Tonight
            </h2>
            <p className="text-sm text-muted mb-6">
              Live calculated position & astronomical objects above your horizon right now.
            </p>
            
            <SkyGrid>
              <CelestialCard name="Jupiter" constellation="Taurus" altitude="38°" azimuth="145° SE" />
              <CelestialCard name="Mars" constellation="Gemini" altitude="22°" azimuth="088° E" />
              <CelestialCard name="Saturn" constellation="Aquarius" altitude="15°" azimuth="210° SW" />
              <MoonPhaseCard phaseName="Waxing Gibbous" illumination={84} />
              <IssPassCard />
            </SkyGrid>
          </div>

          <SkyGuideChat />
        </Container>
      </main>

      <Footer />
    </div>
  );
}
