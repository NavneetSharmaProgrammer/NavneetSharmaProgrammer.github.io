
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type Vibe = 'neural' | 'minimal' | 'maximal';

interface NeuralBackgroundProps {
  vibe: Vibe;
}

export const NeuralBackground = React.memo(({ vibe }: NeuralBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  // Store vibe in a ref to access inside the animation loop without restarting it
  const vibeRef = useRef(vibe);

  useEffect(() => {
    vibeRef.current = vibe;
  }, [vibe]);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Detect hardware tier for performance scaling
    const isLowPower = window.navigator.hardwareConcurrency <= 4 || /Mobi|Android/i.test(navigator.userAgent);
    const particleCount = isLowPower ? 600 : 1500;
    const starCount = isLowPower ? 1000 : 3000;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    // Premium matte black fog
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isLowPower,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- NEURAL SPHERE ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 5; 

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Color Palette: Deep Emerald to White
      const mix = Math.random();
      if (mix > 0.8) {
        color.setHex(0xffffff); // White sparks
      } else {
        color.setHSL(0.45 + Math.random() * 0.05, 0.9, 0.4 + Math.random() * 0.2);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: isLowPower ? 0.15 : 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    // --- GRID PLANE ---
    const gridHelper = new THREE.GridHelper(200, 40, 0x10b981, 0x111111);
    gridHelper.position.y = -30;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.05;
    scene.add(gridHelper);

    // --- STARFIELD ---
    const starsGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 400;     // x
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 400; // y
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 400; // z
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.05, 
      transparent: true, 
      opacity: 0.1 
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // --- ANIMATION LOOP ---
    let frameId: number;
    let time = 0;
    
    // Linear interpolation helper
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const currentVibe = vibeRef.current;
      time += 0.002;

      // Base kinematics (Always active background movement)
      starField.rotation.y -= 0.0002;
      
      // Determine Target States based on Vibe
      let targetScale = 1;
      let targetOpacity = 0.8;
      let rotationSpeedY = 0.001;
      let targetRotationX = 0;

      if (currentVibe === 'neural') {
        // Breathing effect
        targetScale = 1 + Math.sin(time) * 0.05;
        targetOpacity = 0.8;
        rotationSpeedY = 0.001;
      } else if (currentVibe === 'maximal') {
        // High energy
        targetScale = 1.2;
        targetOpacity = 1.0;
        rotationSpeedY = 0.015;
        targetRotationX = Math.sin(time * 0.5) * 0.2;
      } else {
        // Minimal - Subtle presence (not invisible)
        targetScale = 0.8; 
        targetOpacity = 0.15; // Very faint
        rotationSpeedY = 0.0005; // Very slow
      }

      // Pulse effect for the sphere
      const pulse = Math.sin(time * 2) * 0.02;
      sphere.scale.setScalar(targetScale + pulse);

      // Smooth Transitions (Lerp)
      material.opacity = lerp(material.opacity, targetOpacity, 0.05);
      
      // Interpolate scale (uniform)
      const currentScale = sphere.scale.x; 
      const nextScale = lerp(currentScale, targetScale, 0.05);
      sphere.scale.setScalar(nextScale);

      // Apply rotations
      sphere.rotation.y += rotationSpeedY;
      sphere.rotation.x = lerp(sphere.rotation.x, targetRotationX, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Debounce resize
    let timeoutId: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current) {
         mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array = Single mount

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
});
