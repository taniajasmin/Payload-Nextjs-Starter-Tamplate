"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    let width = currentMount.clientWidth || window.innerWidth;
    let height = currentMount.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45;
      velocities[i * 3] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(255, 100, 180, 0.8)");
      grad.addColorStop(0.5, "rgba(255, 100, 180, 0.2)");
      grad.addColorStop(1, "rgba(255, 100, 180, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.9,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff3b9b,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const linePositions = new Float32Array(
      particleCount * particleCount * 2 * 3,
    );
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 10;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 10;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positionsAttr = geometry.attributes
        .position as THREE.BufferAttribute;
      const positionsArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3] += velocities[i * 3];
        positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
        positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

        const boundary = 22;
        if (Math.abs(positionsArray[i * 3]) > boundary) velocities[i * 3] *= -1;
        if (Math.abs(positionsArray[i * 3 + 1]) > boundary)
          velocities[i * 3 + 1] *= -1;
        if (Math.abs(positionsArray[i * 3 + 2]) > boundary)
          velocities[i * 3 + 2] *= -1;
      }
      positionsAttr.needsUpdate = true;

      let lineIndex = 0;
      const posArr = positionsArray;
      const linePosArray = linePositions;
      const maxDistance = 6.8;

      for (let i = 0; i < particleCount; i++) {
        const xi = posArr[i * 3];
        const yi = posArr[i * 3 + 1];
        const zi = posArr[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const xj = posArr[j * 3];
          const yj = posArr[j * 3 + 1];
          const zj = posArr[j * 3 + 2];

          const dx = xi - xj;
          const dy = yi - yj;
          const dz = zi - zj;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePosArray[lineIndex++] = xi;
            linePosArray[lineIndex++] = yi;
            linePosArray[lineIndex++] = zi;
            linePosArray[lineIndex++] = xj;
            linePosArray[lineIndex++] = yj;
            linePosArray[lineIndex++] = zj;
          }
        }
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linePosArray.slice(0, lineIndex), 3),
      );
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate =
        true;

      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
      particleSystem.position.x += (mouseX - particleSystem.position.x) * 0.05;
      particleSystem.position.y += (mouseY - particleSystem.position.y) * 0.05;

      lineSystem.rotation.y = particleSystem.rotation.y;
      lineSystem.rotation.x = particleSystem.rotation.x;
      lineSystem.position.x = particleSystem.position.x;
      lineSystem.position.y = particleSystem.position.y;

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || currentMount.clientWidth;
        height = entry.contentRect.height || currentMount.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });

    resizeObserver.observe(currentMount);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
    />
  );
}
