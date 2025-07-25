'use client';

import { useState } from 'react';
import { KeyboardControls } from '@react-three/drei';
import { Dialogue } from './primary-components/Dialogue';
import { Scene } from './primary-components/Scene';

// Main page component
export default function Home() {
  const [dialogue, setDialogue] = useState({ open: false, content: '' });


  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-4">My 3D Portfolio</h1>
      <p className="text-center text-lg mb-4">Use WASD to move, Spacebar to interact with buildings</p>
      <div className="w-full h-[calc(100vh-120px)] relative">
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
            { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
            { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
            { name: 'right', keys: ['KeyD', 'ArrowRight'] },
            { name: 'interact', keys: ['Space'] },
          ]}
        >
          <Scene setDialogue={setDialogue} />
          <Dialogue dialogue={dialogue} setDialogue={setDialogue} />
        </KeyboardControls>
      </div>
    </div>
  );
}

