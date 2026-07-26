import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

class TextureErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Texture failed to load (user has not added it yet):", error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#444444" wireframe />
        </mesh>
      );
    }
    return this.props.children;
  }
}

class RingErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Ring texture failed to load:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function SphereMesh({ name, textureUrl }) {
  const texture = useTexture(textureUrl);
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {name === 'saturn' && (
        <RingErrorBoundary>
          <SaturnRings />
        </RingErrorBoundary>
      )}
    </group>
  );
}

function SaturnRings() {
  const ringTexture = useTexture('/textures/saturn_ring.png');
  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[2.5, 4.5, 64]} />
      <meshStandardMaterial map={ringTexture} side={THREE.DoubleSide} transparent={true} opacity={0.9} />
    </mesh>
  );
}

export default function CelestialBody3D({ name, interactive = true }) {
  const reducedMotion = useReducedMotion();
  const lowerName = name.toLowerCase();
  const isPng = ['mercury', 'venus', 'mars', 'saturn', 'uranus', 'neptune', 'moon'].includes(lowerName);
  const filename = `${lowerName}.${isPng ? 'png' : 'jpg'}`;
  
  return (
    <div className={`w-full h-full min-h-[300px] bg-black/40 rounded-2xl overflow-hidden border border-white/10 relative ${interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none !min-h-0 bg-transparent border-none'}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={interactive ? 0.4 : 0.6} />
        <directionalLight position={[5, 3, 5]} intensity={interactive ? 2.0 : 2.5} />
        <TextureErrorBoundary>
          <Suspense fallback={null}>
            <SphereMesh name={lowerName} textureUrl={`/textures/${filename}`} />
          </Suspense>
        </TextureErrorBoundary>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={interactive}
          autoRotate={!reducedMotion} 
          autoRotateSpeed={interactive ? 1.5 : 2.5} 
        />
      </Canvas>
    </div>
  );
}
