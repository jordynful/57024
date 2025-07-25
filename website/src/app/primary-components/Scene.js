import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import Ground from './Ground';
import { Character } from './Character';
import Town from './Town';
import Sun from './Sun';
// Main scene component
export function Scene({ setDialogue }) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 5], fov: 75 }}
      shadows // Enable shadows in the renderer
    >
      <ambientLight intensity={0.3} /> {/* Reduced to emphasize sun */}
      <Sun />
      <Character setDialogue={setDialogue} />
      <Town />
    </Canvas>
  );
}