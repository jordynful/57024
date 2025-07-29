import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import Ground from './Ground';
import { Character } from './Character';
import Town from './Town';
import Sun from './Sun';
import Indoor from './Indoor';
// Main scene component
export function Scene({ setDialogue, buildingRefs, scene, setScene }) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 5], fov: 75 }}
      shadows
    >
      {scene === 'outdoor' ? (
        <>
          <Sun />
          <Town buildingRefs={buildingRefs} />
        </>
      ) : (
        <Indoor buildingRefs={buildingRefs} />
      )}
      <Character setDialogue={setDialogue} buildingRefs={buildingRefs} scene={scene} setScene={setScene} />
    </Canvas>
  );
}