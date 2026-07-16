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
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Main Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Canvas textures for glowing nodes
    const createOrbTexture = (colorHex) => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.2, colorHex);
      gradient.addColorStop(0.6, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const violetTexture = createOrbTexture('#8B5CF6');
    const blueTexture = createOrbTexture('#3B82F6');
    const cyanTexture = createOrbTexture('#06B6D4');

    // --- A. 3D Glowing Hexagonal Shield (Logo Outline) ---
    const radius = 3.2;
    const zOffset = 0.8;
    const hexPoints = [];

    // Generate 6 vertices for Front Hexagon (Z = 0.8) and 6 for Back Hexagon (Z = -0.8)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      hexPoints.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, zOffset));
    }
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      hexPoints.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, -zOffset));
    }

    // Connect vertices to form a 3D wireframe Hexagonal Prism
    const linePositions = [];
    const lineColors = [];
    const colorViolet = new THREE.Color('#8B5CF6');
    const colorCyan = new THREE.Color('#06B6D4');

    const addLine = (p1, p2) => {
      linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      lineColors.push(colorViolet.r, colorViolet.g, colorViolet.b);
      lineColors.push(colorCyan.r, colorCyan.g, colorCyan.b);
    };

    // 1. Front hexagon loops
    for (let i = 0; i < 6; i++) {
      addLine(hexPoints[i], hexPoints[(i + 1) % 6]);
    }
    // 2. Back hexagon loops
    for (let i = 0; i < 6; i++) {
      addLine(hexPoints[i + 6], hexPoints[((i + 1) % 6) + 6]);
    }
    // 3. Connect front and back vertices
    for (let i = 0; i < 6; i++) {
      addLine(hexPoints[i], hexPoints[i + 6]);
    }

    const wireframeGeo = new THREE.BufferGeometry();
    wireframeGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    wireframeGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const wireframeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });

    const shieldMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    logoGroup.add(shieldMesh);

    // --- B. Central Glowing Logo Core (Sphere of points) ---
    const coreGeo = new THREE.SphereGeometry(1.3, 24, 24);
    const coreMat = new THREE.PointsMaterial({
      size: 0.22,
      map: cyanTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const corePoints = new THREE.Points(coreGeo, coreMat);
    logoGroup.add(corePoints);

    // Faint solid core sphere reflecting light
    const sphereGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(sphereGeo, sphereMat);
    logoGroup.add(coreMesh);

    // --- C. Orbiting Logo Ellipse Ring ---
    const ringRadius = 4.2;
    const ringSegments = 64;
    const ringPoints = [];
    for (let i = 0; i <= ringSegments; i++) {
      const angle = (i / ringSegments) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(angle) * ringRadius, 0, Math.sin(angle) * ringRadius * 0.45));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const orbitRing = new THREE.Line(ringGeo, ringMat);
    // Tilt the orbit ring relative to core
    orbitRing.rotation.x = Math.PI / 4;
    orbitRing.rotation.z = Math.PI / 6;
    logoGroup.add(orbitRing);

    // --- D. Executing Data Packets (Traversing the Logo Hexagon & Ring) ---
    const packetCount = 8;
    const packetGeo = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    const packetMat = new THREE.PointsMaterial({
      size: 0.5,
      map: violetTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    logoGroup.add(packetPoints);

    // Packets tracking
    const packets = [];
    for (let i = 0; i < packetCount; i++) {
      // Alternating packets between ring and hexagon lines
      const onRing = i % 2 === 0;
      packets.push({
        onRing,
        progress: Math.random(),
        speed: 0.12 + Math.random() * 0.15,
        hexLineIndex: Math.floor(Math.random() * 18) // 18 lines in hexagonal prism
      });
    }

    // Line segment coordinates map for indexing
    const segments = [];
    for (let i = 0; i < linePositions.length; i += 6) {
      segments.push({
        p1: new THREE.Vector3(linePositions[i], linePositions[i+1], linePositions[i+2]),
        p2: new THREE.Vector3(linePositions[i+3], linePositions[i+4], linePositions[i+5])
      });
    }

    // --- E. Background Ambient Stars ---
    const starCount = 60;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 6.0 + Math.random() * 3.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.15,
      map: blueTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const stars = new THREE.Points(starGeo, starMat);
    logoGroup.add(stars);

    // 5. Interactive Mouse Coordination
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation loop
    const startTime = performance.now();

    const animate = () => {
      const requestID = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Base rotations
      shieldMesh.rotation.y = elapsedTime * 0.08;
      shieldMesh.rotation.x = elapsedTime * 0.04;

      corePoints.rotation.y = -elapsedTime * 0.1;
      corePoints.rotation.z = elapsedTime * 0.06;

      orbitRing.rotation.y = elapsedTime * 0.05;
      stars.rotation.y = -elapsedTime * 0.02;

      // Core pulsing heartbeat
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3.5) * 0.06;
      corePoints.scale.set(pulseScale, pulseScale, pulseScale);
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Traversal packets updating
      const posArray = packetPoints.geometry.attributes.position.array;
      packets.forEach((packet, idx) => {
        packet.progress += packet.speed * 0.04;
        if (packet.progress >= 1.0) {
          packet.progress = 0;
          packet.hexLineIndex = Math.floor(Math.random() * segments.length);
        }

        if (packet.onRing) {
          // Flow along tilted ellipse orbit path
          const angle = (packet.progress) * Math.PI * 2;
          const localPos = new THREE.Vector3(Math.cos(angle) * ringRadius, 0, Math.sin(angle) * ringRadius * 0.45);
          localPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), orbitRing.rotation.x);
          localPos.applyAxisAngle(new THREE.Vector3(0, 0, 1), orbitRing.rotation.z);
          localPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbitRing.rotation.y); // apply dynamic rotation
          
          posArray[idx * 3] = localPos.x;
          posArray[idx * 3 + 1] = localPos.y;
          posArray[idx * 3 + 2] = localPos.z;
        } else {
          // Flow along wireframe hexagon prism segments
          const line = segments[packet.hexLineIndex];
          if (line) {
            const localPos = new THREE.Vector3().lerpVectors(line.p1, line.p2, packet.progress);
            // Apply hexagon mesh rotations
            localPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), shieldMesh.rotation.y);
            localPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), shieldMesh.rotation.x);
            
            posArray[idx * 3] = localPos.x;
            posArray[idx * 3 + 1] = localPos.y;
            posArray[idx * 3 + 2] = localPos.z;
          }
        }
      });
      packetPoints.geometry.attributes.position.needsUpdate = true;

      // Mouse tracking inertia inertia
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      logoGroup.rotation.y = targetX * 0.4;
      logoGroup.rotation.x = -targetY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
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

    // 8. Unmount cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      wireframeGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      violetTexture.dispose();
      blueTexture.dispose();
      cyanTexture.dispose();
      
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
