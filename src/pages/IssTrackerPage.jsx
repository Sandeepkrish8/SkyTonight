import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowLeft, Navigation, MapPin } from 'lucide-react';
import Container from '../components/layout/Container';
import { reverseGeocode } from '../lib/api';

// Convert lat/lon to 3D spherical coordinates (radius = Earth radius in scene)
function getCartesian(lat, lon, radius = 5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

function Earth() {
  const earthTexture = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const earthRef = useRef();

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial 
        map={earthTexture}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function IssMarker({ lat, lon }) {
  const pos = getCartesian(lat, lon, 5.3); // Hover slightly above Earth surface (5 + 0.3)
  const markerRef = useRef();
  const issTexture = useLoader(THREE.TextureLoader, '/textures/iss.png');

  useFrame(({ clock }) => {
    if (markerRef.current) {
      // Gentle floating animation
      const hover = Math.sin(clock.elapsedTime * 2) * 0.05;
      const hoveredPos = getCartesian(lat, lon, 5.3 + hover);
      markerRef.current.position.copy(hoveredPos);
    }
  });

  return (
    <group ref={markerRef}>
      <sprite scale={[1.5, 1.5, 1]}>
        <spriteMaterial map={issTexture} sizeAttenuation={true} />
      </sprite>
      
      {/* Glow */}
      <pointLight color="#7C5CFF" intensity={2} distance={2} />
      
      <Html center position={[0, 1, 0]}>
        <div className="bg-black/80 backdrop-blur-md border border-[#7C5CFF]/50 rounded-full px-3 py-1 flex items-center gap-2 whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold font-display text-white tracking-widest">ISS LIVE</span>
        </div>
      </Html>
    </group>
  );
}

export default function IssTrackerPage() {
  const [issData, setIssData] = useState({ lat: 0, lon: 0 });
  const [loading, setLoading] = useState(true);

  // Poll Open Notify API every 3 seconds for live ISS location
  useEffect(() => {
    let mounted = true;
    
    const fetchIss = async () => {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await res.json();
        if (mounted) {
          setIssData({
            lat: parseFloat(data.latitude),
            lon: parseFloat(data.longitude)
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch ISS position:', err);
      }
    };

    fetchIss(); // Initial fetch
    const interval = setInterval(fetchIss, 3000); // Live poll

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const [country, setCountry] = useState('Locating...');
  const latestIssData = useRef(issData);

  useEffect(() => {
    latestIssData.current = issData;
  }, [issData]);

  useEffect(() => {
    if (loading) return;
    
    const getCountry = async () => {
      const { lat, lon } = latestIssData.current;
      if (lat === 0 && lon === 0) return;
      try {
        const placeLabel = await reverseGeocode(lat, lon);
        setCountry(placeLabel || 'Over Ocean');
      } catch (err) {
        setCountry('Over Ocean');
      }
    };
    
    getCountry();
    const interval = setInterval(getCountry, 10000);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-[#7C5CFF]/30 text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 cursor-move">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls enablePan={false} enableZoom={true} minDistance={6} maxDistance={20} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
          
          <Suspense fallback={null}>
            <Earth />
            {!loading && <IssMarker lat={issData.lat} lon={issData.lon} />}
          </Suspense>
        </Canvas>
      </div>

      {/* HUD Overlays */}
      <div className="absolute top-0 inset-x-0 z-50 pointer-events-none p-6">
        <Container>
          <div className="flex items-center justify-between pointer-events-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-colors text-sm font-medium shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </Container>
      </div>

      <div className="absolute bottom-8 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 pointer-events-auto shadow-2xl flex flex-col md:flex-row items-center gap-8 min-w-[300px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/20 flex items-center justify-center border border-[#7C5CFF]/30">
              <Navigation className="w-6 h-6 text-[#7C5CFF]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-lg">ISS Live Telemetry</h2>
              <p className="text-sm text-muted flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block" />
                Tracking Active
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Latitude</p>
              <p className="font-mono text-lg text-[#22D3EE]">{loading ? '--' : issData.lat.toFixed(4)}°</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Longitude</p>
              <p className="font-mono text-lg text-[#22D3EE]">{loading ? '--' : issData.lon.toFixed(4)}°</p>
            </div>
            <div className="hidden md:block">
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Speed</p>
              <p className="font-mono text-lg text-white">27,580 km/h</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Above</p>
              <p className="font-display font-medium text-lg text-white max-w-[150px] truncate" title={country}>{country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
