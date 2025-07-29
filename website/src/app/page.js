'use client';

import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { KeyboardControls } from '@react-three/drei';
import { Dialogue } from './primary-components/Dialogue';
import { Scene } from './primary-components/Scene';

// Main page component
export default function Home() {
  const [dialogue, setDialogue] = useState({ open: false, content: '', type: '' });
  const buildingRefs = [useRef(), useRef(), useRef()]; // Refs for bookstore, yellow cube, purple cube
const [scene, setScene] = useState('outdoor');
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
    useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio source based on scene
    const audioSource = scene === 'outdoor' ? '/music/outdoor_1.mp3' : '/music/bookstore_1.mp3';
    console.log('Setting audio source:', audioSource);
    audio.volume = 0.04;
    if (audio.src !== window.location.origin + audioSource) {
      audio.src = audioSource;
      audio.load();
      if (isPlaying && !isMuted) {
        audio.play().catch((error) => console.error('Audio play failed:', error.message));
      }
    }

    // Handle initial play and unmute on user interaction
    const handleInteraction = () => {
      if (isMuted) {
        setIsMuted(false);
        setIsPlaying(true);
        audio.play().catch((error) => console.error('Audio play failed:', error.message));
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [scene, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Play or pause based on isPlaying state
    if (isPlaying && !isMuted) {
      audio.play().catch((error) => console.error('Audio play failed:', error.message));
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted]);

  const toggleAudio = () => {
    setIsPlaying((prev) => {
      console.log('Toggling audio:', !prev ? 'Playing' : 'Pausing');
      return !prev;
    });
  };

  return (
 <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-4">My 3D Portfolio</h1>
      <p className="text-center text-lg mb-4">
        Use WASD to move, F or I to interact, Space to jump, scroll or +/- to zoom, drag or Q/R to orbit
      </p>
      <div className="w-full h-[calc(100vh-120px)] relative">
        <audio
          ref={audioRef}
          loop
          muted={isMuted}
        />
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 z-10"
          onClick={toggleAudio}
        >
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
            { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
            { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
            { name: 'right', keys: ['KeyD', 'ArrowRight'] },
            { name: 'interact', keys: ['KeyF', 'KeyI'] },
            { name: 'jump', keys: ['Space'] },
            { name: 'zoomIn', keys: ['Equal', 'NumpadAdd'] },
            { name: 'zoomOut', keys: ['Minus', 'NumpadSubtract'] },
            { name: 'orbitLeft', keys: ['KeyQ'] },
            { name: 'orbitRight', keys: ['KeyR'] },
          ]}
          captureEvents
        >
          <Scene setDialogue={setDialogue} buildingRefs={buildingRefs} scene={scene} setScene={setScene} />
          <Dialogue dialogue={dialogue} setDialogue={setDialogue} />
        </KeyboardControls>
      </div>
    </div>
  );
}

