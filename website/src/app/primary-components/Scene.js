import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import Ground from './Ground';
import Character from './Character';

export default function Scene() {
    return (
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Character />
        <Ground />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    );
  }