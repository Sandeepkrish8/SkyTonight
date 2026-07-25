import React, { useState, Suspense, useMemo, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line, DeviceOrientationControls } from '@react-three/drei';
import * as THREE from 'three';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, Clock, FastForward, Play, Compass } from 'lucide-react';
import Container from '../components/layout/Container';
import { Equator, Body, Observer } from 'astronomy-engine';
import StoryPanel from '../components/ui/StoryPanel';

// Helper to convert Right Ascension (hours) and Declination (degrees) to 3D Cartesian coords
function sphericalToCartesian(ra, dec, radius = 80) {
  const raRad = (ra / 24) * 2 * Math.PI;
  const decRad = (dec / 180) * Math.PI;
  
  // Standard 3D spherical to Cartesian conversion
  const x = radius * Math.cos(decRad) * Math.cos(raRad);
  const y = radius * Math.sin(decRad);
  const z = -radius * Math.cos(decRad) * Math.sin(raRad);
  return [x, y, z];
}

// Static definition of objects. Dynamic positions are calculated on the fly.
const CELESTIAL_DEF = [
  { id: 'sun', name: 'Sun', type: 'Star', url: '/textures/sun.png', size: 12, body: Body.Sun },
  { id: 'mercury', name: 'Mercury', type: 'Terrestrial Planet', url: '/textures/mercury.png', size: 2, body: Body.Mercury },
  { id: 'venus', name: 'Venus', type: 'Terrestrial Planet', url: '/textures/venus.png', size: 3.5, body: Body.Venus },
  { id: 'moon', name: 'Moon', type: 'Earth Satellite', url: '/textures/moon.png', size: 5, body: Body.Moon },
  { id: 'mars', name: 'Mars', type: 'Red Planet', url: '/textures/mars.png', size: 4, body: Body.Mars },
  { id: 'jupiter', name: 'Jupiter', type: 'Gas Giant', url: '/textures/jupiter.jpg', size: 6, body: Body.Jupiter },
  { id: 'saturn', name: 'Saturn', type: 'Ringed Planet', url: '/textures/saturn.png', size: 8, body: Body.Saturn },
  { id: 'uranus', name: 'Uranus', type: 'Ice Giant', url: '/textures/uranus.png', size: 5, body: Body.Uranus },
  { id: 'neptune', name: 'Neptune', type: 'Ice Giant', url: '/textures/neptune.png', size: 5, body: Body.Neptune },
  
// Fixed Deep Sky Objects & ISS
  { id: 'andromeda', name: 'Andromeda Galaxy', type: 'Spiral Galaxy', url: '/textures/andromeda.png', size: 25, fixedRa: 0.71, fixedDec: 41.26 },
  { id: 'orion', name: 'Orion Nebula', type: 'Diffuse Nebula', url: '/textures/orion.png', size: 20, fixedRa: 5.58, fixedDec: -5.38 },
  { id: 'iss', name: 'International Space Station', type: 'Spacecraft', url: '/textures/iss.png', size: 1.5, fixedRa: 12.0, fixedDec: 20.0 },
];

const CONSTELLATION_MARKERS = [
  { id: 'constellation_orion', name: 'Orion', ra: 5.5, dec: 5.0 },
  { id: 'constellation_ursa_major', name: 'Ursa Major', ra: 11.0, dec: 50.0 },
  { id: 'constellation_cassiopeia', name: 'Cassiopeia', ra: 1.0, dec: 60.0 },
];

function CelestialSprite({ object, onClick }) {
  const texture = useLoader(THREE.TextureLoader, object.url);
  const [hovered, setHovered] = useState(false);

  const color = hovered ? new THREE.Color(1.2, 1.2, 1.2) : new THREE.Color(1, 1, 1);

  return (
    <group position={object.position}>
      <sprite 
        scale={[object.size, object.size, 1]} 
        onClick={(e) => { e.stopPropagation(); onClick(object.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <spriteMaterial map={texture} color={color} sizeAttenuation={true} />
      </sprite>

      <Html 
        position={[0, object.size / 2 + 1, 0]} 
        center 
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}
      >
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 whitespace-nowrap shadow-2xl">
          <div className="font-display font-bold text-sm text-white">{object.name}</div>
          <div className="text-[10px] text-[#22D3EE] font-medium uppercase tracking-widest">{object.type}</div>
        </div>
      </Html>

      {hovered && (
        <Html center position={[0,0,0]} style={{ pointerEvents: 'none' }}>
          <div className="w-24 h-24 border border-[#22D3EE]/50 rounded-full animate-spin-slow flex items-center justify-center">
            <div className="w-1 h-3 bg-[#22D3EE]/80 absolute -top-1" />
            <div className="w-1 h-3 bg-[#22D3EE]/80 absolute -bottom-1" />
            <div className="w-3 h-1 bg-[#22D3EE]/80 absolute -left-1" />
            <div className="w-3 h-1 bg-[#22D3EE]/80 absolute -right-1" />
          </div>
        </Html>
      )}
    </group>
  );
}

function ConstellationLines({ objects, onObjectClick }) {
  const points = useMemo(() => {
    return objects.map(obj => new THREE.Vector3(...obj.position));
  }, [objects]);
  
  if (points.length === 0) return null;
  const linePoints = [...points, points[0]];

  return (
    <>
      <Line
        points={linePoints}
        color="#22D3EE"
        lineWidth={1}
        dashed={true}
        dashSize={1}
        gapSize={0.5}
        transparent
        opacity={0.3}
      />
      
      {/* Clickable Mythology Markers */}
      {CONSTELLATION_MARKERS.map((marker) => (
        <Html 
          key={marker.id} 
          position={sphericalToCartesian(marker.ra, marker.dec, 80)} 
          center
        >
          <div 
            onClick={(e) => { e.stopPropagation(); onObjectClick(marker.id); }}
            className="group cursor-pointer flex flex-col items-center justify-center hover:scale-110 transition-transform"
          >
            <div className="w-4 h-4 rounded-full border border-[#7C5CFF] bg-[#7C5CFF]/20 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(124,92,255,0.5)]">
              <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:bg-[#22D3EE]" />
            </div>
            <div className="text-[10px] font-display font-bold text-white/80 group-hover:text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
              {marker.name}
            </div>
          </div>
        </Html>
      ))}
    </>
  );
}

// Synth for Ambient Drone
function initAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = 55; // Deep bass A1
  
  filter.type = 'lowpass';
  filter.frequency.value = 200;
  
  gain.gain.value = 0; // Start silent

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  
  // Fade in
  gain.gain.setTargetAtTime(0.15, ctx.currentTime, 2);

  return { ctx, gain };
}

function Scene({ showConstellations, onObjectClick, simulatedDate }) {
  // Calculate real-time positions based on the simulatedDate
  const dynamicObjects = useMemo(() => {
    return CELESTIAL_DEF.map(def => {
      let ra, dec;
      if (def.body) {
        const observer = new Observer(0, 0, 0); // Default to equator/sea level for global sky view
        const eq = Equator(def.body, simulatedDate, observer, true, true);
        ra = eq.ra;
        dec = eq.dec;
      } else {
        ra = def.fixedRa;
        dec = def.fixedDec;
      }
      return {
        ...def,
        position: sphericalToCartesian(ra, dec, 80)
      };
    });
  }, [simulatedDate]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <mesh>
        <sphereGeometry args={[150, 32, 32]} />
        <meshBasicMaterial color="#020308" side={THREE.BackSide} />
      </mesh>

      {dynamicObjects.map(obj => (
        <Suspense fallback={null} key={obj.id}>
          <CelestialSprite object={obj} onClick={onObjectClick} />
        </Suspense>
      ))}

      {showConstellations && <ConstellationLines objects={dynamicObjects} onObjectClick={onObjectClick} />}
    </>
  );
}

export default function TelescopePage() {
  const navigate = useNavigate();
  const [showConstellations, setShowConstellations] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);
  
  // AR / Device Orientation State
  const [arMode, setArMode] = useState(false);

  const toggleAR = async () => {
    if (!arMode) {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            setArMode(true);
          } else {
            alert("AR Mode requires device orientation permission.");
          }
        } catch (error) {
          console.error(error);
          alert("Could not start AR Mode on this device.");
        }
      } else if ('DeviceOrientationEvent' in window) {
        // Non-iOS 13+ devices
        setArMode(true);
      } else {
        alert("Your device doesn't support orientation tracking for AR Mode.");
      }
    } else {
      setArMode(false);
    }
  };

  // New AI Story State
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  // Time Scrubbing State
  const [timeOffsetDays, setTimeOffsetDays] = useState(0);
  const baseDate = useRef(new Date());
  
  const simulatedDate = useMemo(() => {
    const d = new Date(baseDate.current.getTime());
    d.setDate(d.getDate() + timeOffsetDays);
    return d;
  }, [timeOffsetDays]);

  const handleObjectClick = (id) => {
    // Open the AI Story panel instead of navigating
    setSelectedObjectId(id);
  };

  const startAudio = () => {
    if (!audioStarted) {
      audioRef.current = initAudio();
      setAudioStarted(true);
    } else {
      if (audioRef.current) {
        audioRef.current.gain.gain.setTargetAtTime(0, audioRef.current.ctx.currentTime, 0.5);
        setTimeout(() => audioRef.current.ctx.close(), 1000);
      }
      setAudioStarted(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.ctx.close();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-[#7C5CFF]/30 text-white">
      {/* 3D Canvas Viewport */}
      <div className="absolute inset-0 cursor-move" onClick={() => !audioStarted && startAudio()}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          {arMode ? (
            <DeviceOrientationControls />
          ) : (
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={2} 
              maxDistance={100} 
              makeDefault 
            />
          )}
          <Scene showConstellations={showConstellations} onObjectClick={handleObjectClick} simulatedDate={simulatedDate} />
        </Canvas>
      </div>

      {/* HUD Overlay */}
      <div className="absolute top-0 inset-x-0 z-50 pointer-events-none p-4 md:p-6">
        <Container>
          <div className="flex items-center justify-between pointer-events-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-colors text-xs md:text-sm font-medium shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={toggleAR}
                className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl border backdrop-blur-md text-xs font-medium transition-colors ${arMode ? 'bg-green-500/20 border-green-500/50 text-white' : 'bg-black/40 border-white/5 text-white/70 hover:bg-black/60'}`}
              >
                <Compass className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{arMode ? 'AR ON' : 'AR Mode'}</span>
                <span className="sm:hidden">AR</span>
              </button>

              <button
                onClick={startAudio}
                className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl border backdrop-blur-md text-xs font-medium transition-colors ${audioStarted ? 'bg-[#22D3EE]/20 border-[#22D3EE]/50 text-white' : 'bg-black/40 border-white/5 text-white/70 hover:bg-black/60'}`}
              >
                <Play className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{audioStarted ? 'Audio On' : 'Start Audio'}</span>
                <span className="sm:hidden">{audioStarted ? 'On' : 'Audio'}</span>
              </button>

              <button
                onClick={() => setShowConstellations(!showConstellations)}
                className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl border backdrop-blur-md text-xs font-medium transition-colors ${showConstellations ? 'bg-[#7C5CFF]/20 border-[#7C5CFF]/50 text-white' : 'bg-black/40 border-white/5 text-white/70 hover:bg-black/60'}`}
              >
                <span className="hidden sm:inline">Constellations: {showConstellations ? 'ON' : 'OFF'}</span>
                <span className="sm:hidden">{showConstellations ? 'Stars ON' : 'Stars OFF'}</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Time Travel UI */}
      <div className="absolute bottom-4 md:bottom-8 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
        <div className="w-full max-w-3xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 pointer-events-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#22D3EE]" />
              <h3 className="font-display font-semibold text-sm md:text-base">Time Travel</h3>
            </div>
            <div className="text-xs md:text-sm font-mono bg-white/10 px-2 py-1 md:px-3 md:py-1 rounded-lg w-fit">
              {simulatedDate.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-[10px] md:text-xs text-muted font-medium whitespace-nowrap">-1 Yr</span>
            <input 
              type="range" 
              min="-365" 
              max="365" 
              value={timeOffsetDays}
              onChange={(e) => setTimeOffsetDays(parseInt(e.target.value))}
              className="w-full h-1.5 md:h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7C5CFF]"
            />
            <span className="text-[10px] md:text-xs text-muted font-medium whitespace-nowrap">+1 Yr</span>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-[10px] md:text-xs text-slate-400 hidden sm:block">Scrub the timeline to see real planetary orbits.</p>
            <button 
              onClick={() => setTimeOffsetDays(0)}
              className="text-xs text-[#22D3EE] hover:text-white transition-colors flex items-center gap-1 ml-auto sm:ml-0"
            >
              <FastForward className="w-3 h-3" />
              Reset to Now
            </button>
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-40">
        <div className="relative w-32 h-32 rounded-full border border-white/30 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-white/30" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-white/30" />
        </div>
      </div>
      {/* Glass Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-30" />

      {/* AI Story Panel Overlay */}
      <StoryPanel 
        objectId={selectedObjectId} 
        onClose={() => setSelectedObjectId(null)} 
      />
    </div>
  );
}
