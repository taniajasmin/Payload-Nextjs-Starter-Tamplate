"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Canvas color constants — Tailwind tokens don't reach WebGL buffers.
   Hex/RGB values in the palette below are intentional and kept
   literally (see unify-decorative migration plan). */

const PARTICLE_COUNT_DESKTOP = 2000;
const PARTICLE_COUNT_MOBILE = 500;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // Brand colors
    const palette = [
      [0.69, 0.87, 0.89], // teal #B0DDE4
      [0.16, 0.44, 0.71], // blue #286FB4
      [0.87, 0.3, 0.45], // pink #DF4C73
      [0.82, 0.63, 0.5], // gold #D1A080
      [1.0, 0.46, 0.07], // orange #FF7513
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles across viewport
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      // Slow drift velocities
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      // Random brand color
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, velocities, colors, sizes };
  }, [count]);

  // Track mouse
  useFrame((state) => {
    if (state?.pointer) {
      mouseRef.current.x = state.pointer.x;
      mouseRef.current.y = state.pointer.y;
    }
  });

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Apply velocity
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse repulsion (subtle)
      const dx = posArray[i3] - mouseRef.current.x * 10;
      const dy = posArray[i3 + 1] - mouseRef.current.y * 6;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.001;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      // Wrap around boundaries
      if (posArray[i3] > 10) posArray[i3] = -10;
      if (posArray[i3] < -10) posArray[i3] = 10;
      if (posArray[i3 + 1] > 6) posArray[i3 + 1] = -6;
      if (posArray[i3 + 1] < -6) posArray[i3 + 1] = 6;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
