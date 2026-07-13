import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveScene3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene setup
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    
    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 12;

    // 3. Renderer setup with alpha transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Create Geometries / Particle Systems
    
    // Group to hold everything for easier rotation/interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // A. Center Torus Knot (Wireframe / Mesh)
    // We will make a TorusKnot made of glowing points (particles) for a futuristic vibe
    const torusKnotGeo = new THREE.TorusKnotGeometry(3, 0.8, 120, 16);
    
    // Create custom particle materials matching the site's brand colors
    const purpleColor = new THREE.Color('#C04ACF');
    const cyanColor = new THREE.Color('#5CE1E6');
    const violetColor = new THREE.Color('#8A5CFF');

    // Create a particle texture (glowing circle) using canvas
    const createParticleTexture = (colorHex) => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, colorHex);
      gradient.addColorStop(0.3, colorHex);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const purpleTexture = createParticleTexture('#C04ACF');
    const cyanTexture = createParticleTexture('#5CE1E6');
    const violetTexture = createParticleTexture('#8A5CFF');

    const torusMaterial = new THREE.PointsMaterial({
      size: 0.18,
      map: purpleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const torusPoints = new THREE.Points(torusKnotGeo, torusMaterial);
    mainGroup.add(torusPoints);

    // B. Outer Orbiting Particle Cloud (Globe / Sphere)
    const particleCount = 200;
    const sphereGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Distribute points on a sphere of radius 6 to 8
      const radius = 5.5 + Math.random() * 2.5;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mix colors between cyan and violet
      const mixedColor = cyanColor.clone().lerp(violetColor, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    sphereGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    sphereGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const outerMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: cyanTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const outerPoints = new THREE.Points(sphereGeo, outerMaterial);
    mainGroup.add(outerPoints);

    // C. Glowing connections (Faint web connecting some outer points)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8a5cff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const linePositions = [];
    // Select a subset of points to connect
    for (let i = 0; i < particleCount; i += 4) {
      for (let j = i + 1; j < i + 4; j++) {
        if (j >= particleCount) break;
        // Check distance
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (dist < 4.0) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMaterial);
    mainGroup.add(lines);

    // 5. Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Normalize to [-1, 1]
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    const startTime = performance.now();

    const animate = () => {
      const requestID = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Slow rotation for general movement
      torusPoints.rotation.y = elapsedTime * 0.18;
      torusPoints.rotation.x = elapsedTime * 0.08;

      outerPoints.rotation.y = -elapsedTime * 0.06;
      outerPoints.rotation.z = elapsedTime * 0.04;
      lines.rotation.y = -elapsedTime * 0.06;
      lines.rotation.z = elapsedTime * 0.04;

      // Soft wave distortion on Torus Knot points
      const positionAttribute = torusKnotGeo.getAttribute('position');
      const originalPositions = torusKnotGeo.clone().getAttribute('position');
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = originalPositions.getX(i);
        const y = originalPositions.getY(i);
        const z = originalPositions.getZ(i);

        // Simple wave logic
        const wave = Math.sin(elapsedTime * 1.5 + x * 0.5 + y * 0.5) * 0.08;
        
        positionAttribute.setXYZ(
          i,
          x + wave * (x / 3),
          y + wave * (y / 3),
          z + wave * (z / 3)
        );
      }
      positionAttribute.needsUpdate = true;

      // Smooth mouse interaction (Lerp target values)
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      // Tilting the main group based on mouse
      mainGroup.rotation.y = targetX * 0.4;
      mainGroup.rotation.x = -targetY * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose geometries & materials
      torusKnotGeo.dispose();
      torusMaterial.dispose();
      sphereGeo.dispose();
      outerMaterial.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      purpleTexture.dispose();
      cyanTexture.dispose();
      violetTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '420px', 
        position: 'relative', 
        cursor: 'grab' 
      }} 
    />
  );
};

export default InteractiveScene3D;
