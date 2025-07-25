
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';


export default function Sun() {
  const lightRef = useRef();
  const sphereRef = useRef();

  useFrame(() => {
    if (!lightRef.current || !sphereRef.current) return;

    // Get current time
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60; // Fractional hours
    const sunAngle = (hours / 24) * 2 * Math.PI; // Map 24 hours to 0-2π
    const radius = 100; // Distance from origin
    const height = 50; // Max height at noon

    // Calculate sun position (hemispherical path)
    const x = radius * Math.cos(sunAngle);
    const y = height * Math.abs(Math.sin(sunAngle)); // Height peaks at noon
    const z = radius * Math.sin(sunAngle);

    lightRef.current.position.set(x, y, z);
    sphereRef.current.position.set(x, y, z);

    // Adjust light color based on time (optional)
    const isDay = y > 0.1; // Consider "day" when sun is above horizon
    lightRef.current.color.set(isDay ? 0xfff8e1 : 0xcccccc); // Warm yellow for day, cooler for night
    lightRef.current.intensity = isDay ? 1 : 0.3; // Brighter during day
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={[0, 50, 0]} // Initial position (updated in useFrame)
        intensity={1}
        color={0xfff8e1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <mesh ref={sphereRef} position={[0, 50, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={0xff000} />
      </mesh>
    </>
  );
}