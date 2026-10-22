import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

function CircuitGrid({ isDark }) {
  const gridRef = useRef();

  useFrame((state) => {
    // Subtle continuous rotation for the grid background
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      {/* PCB Base Board */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color={isDark ? "#020617" : "#e2e8f0"}
          roughness={isDark ? 0.4 : 0.6}
          metalness={isDark ? 0.9 : 0.4}
        />
      </mesh>

      {/* Grid Mesh Traces */}
      <group ref={gridRef}>
        <gridHelper
          args={[30, 50, isDark ? "#00ffff" : "#2563eb", isDark ? "#0044aa" : "#93c5fd"]}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

export default function EtcBackground() {
  const { isDark } = useTheme();

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#020617]" : "bg-gradient-to-b from-sky-50 via-slate-100 to-white"
      }`}
    >
      <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
        <ambientLight intensity={isDark ? 0.5 : 1.2} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={isDark ? 1.5 : 1.8}
          color={isDark ? "#0088ff" : "#3b82f6"}
        />

        {/* Floating background star particles */}
        <Stars
          radius={50}
          depth={20}
          count={isDark ? 1500 : 500}
          factor={isDark ? 3 : 2}
          saturation={0}
          fade
          speed={1.5}
        />

        {/* 3D Grid */}
        <CircuitGrid isDark={isDark} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}