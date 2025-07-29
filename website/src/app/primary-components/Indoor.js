'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { KeyboardControls, useKeyboardControls, useGLTF, useAnimations, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Indoor({ buildingRefs }) {
  const bookshelf1Ref = useRef();
  const bookshelf2Ref = useRef();
  const doorRef = useRef();
  buildingRefs[0] = bookshelf1Ref;
  buildingRefs[1] = bookshelf2Ref;
  buildingRefs[2] = doorRef;

  // Load wooden floor texture
  const textures = useTexture({
    map: '/textures/WoodFloor/WoodFloorColor.jpg',
    normalMap: '/textures/WoodFloor/WoodFloorNormal.jpg',
    roughnessMap: '/textures/WoodFloor/WoodFloorRoughness.jpg',
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2); // Tile for 10x10 floor
  });

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial {...textures} color="white" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="beige" />
      </mesh>
      <mesh position={[0, 2, 5]} receiveShadow>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="beige" />
      </mesh>
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="beige" />
      </mesh>
      <mesh position={[5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="beige" />
      </mesh>
      {/* Bookshelves */}
      <mesh ref={bookshelf1Ref} position={[3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <mesh ref={bookshelf2Ref} position={[-3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      {/* Door */}
      <mesh ref={doorRef} position={[0, 0, 5]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="darkblue" />
      </mesh>
      {/* Lighting */}
      <pointLight position={[0, 3, 0]} intensity={1} distance={15} castShadow />
      <ambientLight intensity={0.3} />
    </>
  );
}
