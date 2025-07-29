'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { KeyboardControls, useKeyboardControls, useGLTF, useAnimations, useTexture } from '@react-three/drei';
import * as THREE from 'three';
// Town component with ground and buildings

export default function Town({ buildingRefs }) {
  const bookstoreRef = useRef();
  buildingRefs[0] = bookstoreRef;
  let bookstore = null;
    try {
      const bookstoreGLTF = useGLTF('/models_3d/bookstore.glb');
      bookstore = bookstoreGLTF.scene;
     // console.log('Bookstore loaded successfully.');
    } catch (error) {
      console.error('Failed to load bookstore at /models_3d/bookstore.glb:', error.message, error.stack);
      bookstore = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'blue' })
      );
    }
  // Load cobblestone textures
  const textures = useTexture({
    map: '/textures/cobblestone/CobbleStoneColor.jpg', // Diffuse/color map
    normalMap: '/textures/cobblestone/CobbleStoneNormalGL.jpg', // Normal map
    roughnessMap: '/textures/cobblestone/CobbleStoneRoughness.jpg', // Roughness map
  });

  // Configure textures for tiling
  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 50); // Tile 10x10 for 100x100 plane
  });
const yellowCubeRef = useRef();
  const purpleCubeRef = useRef();
  buildingRefs[1] = yellowCubeRef;
  buildingRefs[2] = purpleCubeRef;
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[80, 500]} />
        <meshStandardMaterial
          {...textures} // Apply texture maps
          color="white" // Base color (modulated by map)
        />
      </mesh>
       <primitive
       ref={bookstoreRef}
      object={bookstore}
      position={[-25, -0.5, 0]}
      scale={[70, 70, 70]}
      rotation={[0, Math.PI/2, 0]}
      castShadow />
       <mesh ref={yellowCubeRef} position={[-5, 0, 10]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh ref={purpleCubeRef} position={[0, 0, -10]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="purple" />
      </mesh>
    </>
  );
}