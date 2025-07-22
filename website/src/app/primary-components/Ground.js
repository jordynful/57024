import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls } from '@react-three/drei';

export default function Ground() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
  }
  