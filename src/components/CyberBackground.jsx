import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    
    // We use perspective camera for depth perception of particles
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // keeps background transparent to let CSS gradients show through
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Create particles
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color definitions
    const colorPurple = new THREE.Color('#8A5CFF');
    const colorCyan = new THREE.Color('#5CE1E6');
    const colorPink = new THREE.Color('#C04ACF');

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a wide 3D space
      positions[i * 3] = (Math.random() - 0.5) * 150;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z

      // Color variation
      let mixedColor;
      const rand = Math.random();
      if (rand < 0.33) {
        mixedColor = colorPurple;
      } else if (rand < 0.66) {
        mixedColor = colorCyan;
      } else {
        mixedColor = colorPink;
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create particle texture (glowing orb)
    const createTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      grad.addColorStop(0.6, 'rgba(255,255,255,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createTexture();

    const material = new THREE.PointsMaterial({
      size: 1.2,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 4. Parallax Mouse & Scroll interaction
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 5. Animation loop
    const startTime = performance.now();

    const animate = () => {
      const requestID = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Slow drift
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = elapsedTime * 0.01;

      // Lerp interactions for buttery smooth feel
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      targetScroll += (scrollY - targetScroll) * 0.05;

      // Apply mouse parallax tilting
      particleSystem.position.x = targetX * 12;
      particleSystem.position.y = -targetY * 12;

      // Scroll effect: move particles up/down as we scroll
      particleSystem.position.y += (targetScroll * 0.015);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Window Resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cyber-background">
      {/* Dynamic Cyber Grid (Overlay backplane) */}
      <div className="cyber-grid" />
      
      {/* 3D Particle Space */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1,
          pointerEvents: 'none' 
        }} 
      />
    </div>
  );
};

export default CyberBackground;
