import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls } from '@react-three/drei';

export default function Character() {
    const ref = useRef();
    const [sub, get] = useKeyboardControls();
  
    useFrame(() => {
      const { forward, backward, left, right } = get();
      const speed = 0.1;
      if (forward) ref.current.position.z -= speed;
      if (backward) ref.current.position.z += speed;
      if (left) ref.current.position.x -= speed;
      if (right) ref.current.position.x += speed;
    });
  
    return (
      <mesh ref={ref} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }