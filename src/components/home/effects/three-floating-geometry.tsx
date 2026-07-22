"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";

/* Canvas color constants — Tailwind tokens don't reach three.js
   materials. Hex values in shape definitions below are intentional
   and kept literally (see unify-decorative migration plan). */

/* ─── Floating shape definitions ─────────────────────────────── */

interface FloatingShape {
  geometry:
    | "torus"
    | "icosahedron"
    | "octahedron"
    | "box"
    | "torusKnot"
    | "sphere"
    | "cone"
    | "dodecahedron";
  position: [number, number, number];
  scale: number;
  color: string;
  floatSpeed: number;
  rotationSpeed: [number, number, number];
  opacity: number;
  wireframe?: boolean;
  distort?: boolean;
  wobble?: boolean;
  metalness?: number;
  roughness?: number;
}

const DEFAULT_SHAPES: FloatingShape[] = [
  // Large torus — teal glow
  {
    geometry: "torus",
    position: [-4, 2, -3],
    scale: 1.4,
    color: "#B0DDE4",
    floatSpeed: 2.5,
    rotationSpeed: [0.15, 0.25, 0.05],
    opacity: 0.45,
    metalness: 0.1,
    roughness: 0.55,
  },
  // Icosahedron — brand blue
  {
    geometry: "icosahedron",
    position: [3.5, -1.8, -2],
    scale: 0.9,
    color: "#286FB4",
    floatSpeed: 3.2,
    rotationSpeed: [0.2, 0.15, 0.1],
    opacity: 0.5,
    wireframe: true,
    metalness: 0.3,
    roughness: 0.4,
  },
  // Octahedron — pink accent
  {
    geometry: "octahedron",
    position: [-3, -2.5, -1.5],
    scale: 0.75,
    color: "#DF4C73",
    floatSpeed: 2.8,
    rotationSpeed: [0.12, 0.3, 0.08],
    opacity: 0.4,
    distort: true,
    metalness: 0.15,
    roughness: 0.5,
  },
  // Torus knot — gold
  {
    geometry: "torusKnot",
    position: [4.5, 1.2, -4],
    scale: 0.7,
    color: "#D1A080",
    floatSpeed: 3.8,
    rotationSpeed: [0.18, 0.2, 0.12],
    opacity: 0.35,
    metalness: 0.5,
    roughness: 0.3,
  },
  // Sphere — cyan
  {
    geometry: "sphere",
    position: [-5, -1, -5],
    scale: 0.55,
    color: "#00E5FF",
    floatSpeed: 2.2,
    rotationSpeed: [0.1, 0.1, 0.15],
    opacity: 0.3,
    wobble: true,
    metalness: 0.4,
    roughness: 0.35,
  },
  // Small box — purple
  {
    geometry: "box",
    position: [2.5, 3, -3.5],
    scale: 0.5,
    color: "#7C4DFF",
    floatSpeed: 4.0,
    rotationSpeed: [0.25, 0.22, 0.18],
    opacity: 0.35,
    metalness: 0.25,
    roughness: 0.45,
  },
  // Dodecahedron — orange
  {
    geometry: "dodecahedron",
    position: [-1.5, 3.5, -2.5],
    scale: 0.6,
    color: "#FF7513",
    floatSpeed: 3.5,
    rotationSpeed: [0.14, 0.18, 0.09],
    opacity: 0.3,
    wireframe: true,
    metalness: 0.2,
    roughness: 0.5,
  },
  // Cone — teal light
  {
    geometry: "cone",
    position: [5, -3, -4],
    scale: 0.65,
    color: "#80EEFF",
    floatSpeed: 2.9,
    rotationSpeed: [0.08, 0.28, 0.06],
    opacity: 0.25,
    metalness: 0.35,
    roughness: 0.4,
  },
];

/* ─── Geometry resolver ──────────────────────────────────────── */

function resolveGeometry(
  type: FloatingShape["geometry"],
): THREE.BufferGeometry {
  switch (type) {
    case "torus":
      return new THREE.TorusGeometry(1, 0.4, 32, 64);
    case "icosahedron":
      return new THREE.IcosahedronGeometry(1, 1);
    case "octahedron":
      return new THREE.OctahedronGeometry(1, 1);
    case "box":
      return new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    case "torusKnot":
      return new THREE.TorusKnotGeometry(1, 0.3, 64, 16, 2, 3);
    case "sphere":
      return new THREE.SphereGeometry(1, 32, 32);
    case "cone":
      return new THREE.ConeGeometry(1, 1.6, 32, 1);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(1, 1);
    default:
      return new THREE.IcosahedronGeometry(1, 1);
  }
}

/* ─── Single floating shape ──────────────────────────────────── */

function FloatingMesh({ shape }: { shape: FloatingShape }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => resolveGeometry(shape.geometry), [shape.geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x += shape.rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += shape.rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += shape.rotationSpeed[2] * 0.01;

    // Subtle floating oscillation
    const floatOffset =
      Math.sin(t * shape.floatSpeed * 0.6) * 0.3 +
      Math.cos(t * shape.floatSpeed * 0.4) * 0.2;
    meshRef.current.position.y = shape.position[1] + floatOffset;
  });

  return (
    <Float
      speed={shape.floatSpeed}
      rotationIntensity={0.3}
      floatIntensity={0.4}
    >
      <mesh
        ref={meshRef}
        position={shape.position}
        scale={shape.scale}
        geometry={geom}
      >
        {shape.distort ? (
          <MeshDistortMaterial
            color={shape.color}
            speed={3}
            distort={0.2}
            transparent
            opacity={shape.opacity}
            metalness={shape.metalness ?? 0.1}
            roughness={shape.roughness ?? 0.5}
            wireframe={shape.wireframe}
          />
        ) : shape.wobble ? (
          <MeshWobbleMaterial
            color={shape.color}
            speed={0.6}
            factor={0.15}
            transparent
            opacity={shape.opacity}
            metalness={shape.metalness ?? 0.1}
            roughness={shape.roughness ?? 0.5}
            wireframe={shape.wireframe}
          />
        ) : (
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={shape.opacity}
            metalness={shape.metalness ?? 0.1}
            roughness={shape.roughness ?? 0.5}
            wireframe={shape.wireframe}
          />
        )}
      </mesh>
    </Float>
  );
}

/* ─── Soft ambient particles ─────────────────────────────────── */

function AmbientParticles({ count = 80 }: { count?: number }) {
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const ref = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!geomRef.current) return;
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 16;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    geomRef.current.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        size={0.03}
        color="#B0DDE4"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

interface ThreeFloatingGeometryProps {
  shapes?: FloatingShape[];
  particleCount?: number;
  className?: string;
}

export default function ThreeFloatingGeometry({
  shapes = DEFAULT_SHAPES,
  particleCount = 60,
  className,
}: ThreeFloatingGeometryProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 30 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#ffffff"
        />
        <directionalLight
          position={[-3, -2, -3]}
          intensity={0.15}
          color="#B0DDE4"
        />
        <pointLight position={[3, 2, 4]} intensity={0.2} color="#DF4C73" />

        {shapes.map((shape, i) => (
          <FloatingMesh key={`${shape.geometry}-${i}`} shape={shape} />
        ))}

        <AmbientParticles count={particleCount} />
      </Canvas>
    </div>
  );
}
