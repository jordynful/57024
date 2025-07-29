import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, KeyboardControls, useKeyboardControls, useAnimations, useGLTF } from '@react-three/drei';
import { Dialogue } from './Dialogue';



// Character component with animated model
export function Character({ setDialogue, buildingRefs, scene, setScene }) {
  const ref = useRef();
  let scene2 = null;
  let animations = [];
  const [cameraDistance, setCameraDistance] = useState(7); // Initial distance from character
  const [cameraTheta, setCameraTheta] = useState(0.5); // Horizontal angle for orbiting
  const [isDragging, setIsDragging] = useState(false); // Track mouse drag state
  try {
    const gltf = useGLTF('/models_3d/cat.glb');
    scene2 = gltf.scene;
    animations = gltf.animations;
   // console.log('Model loaded successfully. Available animations:', gltf.animations.map(a => a.name));
  } catch (error) {
    console.error('Failed to load model at /models_3d/cat.glb:', error.message, error.stack);
    scene2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 'red' })
    );
    animations = [];
  }
  const { actions, mixer } = useAnimations(animations, ref);
  const [sub, get] = useKeyboardControls();
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (event) => {
      if (isDragging) {
        setCameraTheta((prev) => prev + event.movementX * 0.005); // Adjust sensitivity
      }
    };
    const handleWheel = (event) => {
      setCameraDistance((prev) => {
        const newDistance = prev + event.deltaY * 0.005; // Adjust zoom speed
        return Math.max(2, Math.min(20, newDistance)); // Clamp between 2 and 10
      });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging]);

  useEffect(() => {
    //console.log('Animation actions available:', Object.keys(actions));
  }, [actions]);

  useFrame(() => {
    if (!ref.current) return;
      const buildings = [
          { position: [0, 0, 5], content: 'Bookstore: Welcome to my creative hub!', action: () => setScene('indoor') },
          { position: [-5, 0, 0], content: 'Projects: Built a 3D portfolio using Next.js and Three.js.' },
          { position: [0, 0, -10], content: 'Skills: JavaScript, React, Three.js, Next.js, Tailwind CSS.' },
        ];
    const { forward, backward, left, right, interact, zoomIn, zoomOut, orbitLeft, orbitRight } = get();
  
    const speed = 0.1;
    let isMoving = false;
    let inProximity = false;
    let targetRotation = cameraTheta + Math.PI;

    // Calculate potential new position
    let moveX = 0;
    let moveZ = 0;
    if (forward) moveZ -= speed;
    if (backward) moveZ += speed;
    if (left) moveX -= speed;
    if (right) moveX += speed;

    if (moveX !== 0 || moveZ !== 0) {
      isMoving = true;
      const newX = ref.current.position.x + moveX * Math.cos(cameraTheta) + moveZ * Math.sin(cameraTheta);
      const newZ = ref.current.position.z + moveZ * Math.cos(cameraTheta) - moveX * Math.sin(cameraTheta);

      // Create character bounding box (adjusted for scale=[0.1, 0.1, 0.1])
      const characterBox = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(newX, ref.current.position.y, newZ),
        new THREE.Vector3(0.5 * 0.1, 0.5 * 0.1, 0.5 * 0.1) // Small box for cat
      );

      // Check collisions with building bounding boxes
        let canMove = true;
    // Check proximity to buildings for interaction


      // Update position only if no collision
      if (canMove) {
        ref.current.position.x = newX;
        ref.current.position.z = newZ;
      }

      // Clamp to plane bounds (80x500)
      ref.current.position.x = THREE.MathUtils.clamp(ref.current.position.x, -40, 40);
      ref.current.position.z = THREE.MathUtils.clamp(ref.current.position.z, -250, 250);

      if (moveX !== 0 || moveZ !== 0) {
        targetRotation = Math.atan2(moveX, moveZ) + cameraTheta;
      }
    }
    // Smoothly interpolate rotation
    if (ref.current.rotation.y !== undefined) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        targetRotation,
        0.1 // Adjust for smoother/faster rotation
      );
    }

    // Handle zoom and orbit
    if (zoomIn) {
      setCameraDistance((prev) => Math.max(2, prev - 0.1)); // Zoom in
    }
    if (zoomOut) {
      setCameraDistance((prev) => Math.min(10, prev + 0.1)); // Zoom out
    }
    if (orbitLeft) {
      setCameraTheta((prev) => prev + 0.02); // Rotate left
    }
    if (orbitRight) {
      setCameraTheta((prev) => prev - 0.02); // Rotate right
    }

    // Play walk animation when moving, idle when not
    const walkAction = actions['walk'] || actions['Walk'] || actions['WalkCycle'] || actions[Object.keys(actions)[0]];
    const idleAction = actions['idle'] || actions['Idle'] || actions[Object.keys(actions)[1]];
    if (isMoving && walkAction) {
      walkAction.play();
      if (idleAction) idleAction.stop();
    } else {
      if (walkAction) walkAction.stop();
      if (idleAction) idleAction.play();
    }

    // Update camera position using spherical coordinates
    const cameraHeight = 7; // Height above character
    const x = ref.current.position.x + cameraDistance * Math.sin(cameraTheta);
    const z = ref.current.position.z + cameraDistance * Math.cos(cameraTheta);
    camera.position.set(x, ref.current.position.y + cameraHeight, z);
    camera.lookAt(ref.current.position);

    // Check proximity to buildings for interaction

    //SHOW dialogue that they can interact..
        buildings.forEach((building) => {
        const distance = ref.current.position.distanceTo(new THREE.Vector3(...building.position));
        if (distance < 3) {
          inProximity = true;
          setDialogue({ open: true, content: building.content, type: 'proximity' });
        }
      });
      if (interact) {
        
      if (scene === 'outdoor') {

        buildings.forEach((building) => {
          const distance = ref.current.position.distanceTo(new THREE.Vector3(...building.position));
          if (distance < 3) {
            console.log('distance less than 3');
            //setDialogue({ open: true, content: building.content });
            if (building.action) {

              console.log(building);
              building.action();
              ref.current.position.set(0, 0, 0); // Reset position for indoor
            }
          }
        });
      } else {
        const indoorObjects = [
          { position: [0, 0, 5], content: 'Door: Return to the town.', action: () => setScene('outdoor') },
          { position: [3, 0, 0], content: 'Bookshelf: Explore my projects!' },
          { position: [-3, 0, 0], content: 'Bookshelf: Check out my skills!' },
        ];
        indoorObjects.forEach((obj) => {
          const distance = ref.current.position.distanceTo(new THREE.Vector3(...obj.position));
          if (distance < 2) {
            setDialogue({ open: true, content: obj.content });
            if (obj.action) {
              obj.action();
              ref.current.position.set(0, 0, 0); // Reset position for outdoor
            }
          }
        });
      }
    }
  });

  // Only render primitive if scene is valid
  if (!scene2) {
    console.error('Scene is invalid, not rendering primitive');
    return null;
  }

  return (
    <primitive
      ref={ref}
      object={scene2}
      position={[0, 0.5, 0]}
      scale={[0.008, 0.008, 0.008]}
      rotation={[0, Math.PI, 0]}
      castShadow />
  );
}
