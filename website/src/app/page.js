// app/page.jsx
'use client';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls } from '@react-three/drei';
import Scene from './primary-components/Scene';


// Character component with movement


// Main page component with WebGL check
export default function Home() {
  // Check for WebGL support
  // if (!THREE.WebGLRenderer.prototype.getContext()) {
  //   return (
  //     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  //       <p className="text-red-500 text-lg">
  //         WebGL is not supported on this device. Please try a different browser or enable hardware acceleration.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-4">Welcome to My 3D Website!</h1>
      <p className="text-center text-lg mb-4">Use WASD to move the character</p>
      <div className="w-full h-[calc(100vh-120px)]">
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
            { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
            { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
            { name: 'right', keys: ['KeyD', 'ArrowRight'] },
          ]}
        >
          <Scene />
        </KeyboardControls>
      </div>
    </div>
  );
}