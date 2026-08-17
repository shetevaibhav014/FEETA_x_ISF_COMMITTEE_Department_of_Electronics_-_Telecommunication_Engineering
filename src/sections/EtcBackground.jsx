import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function CircuitGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    // Subtle continuous rotation for the grid background
    gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      {/* PCB Base Board */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#020617" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* Grid Mesh Traces */}
      <group ref={gridRef}>
        <gridHelper args={[30, 50, '#00ffff', '#0044aa']} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
}

export default function EtcBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
      <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#0088ff" />

        {/* Floating background star particles */}
        <Stars radius={50} depth={20} count={1500} factor={3} saturation={0} fade speed={1.5} />

        {/* 3D Grid Only */}
        <CircuitGrid />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}