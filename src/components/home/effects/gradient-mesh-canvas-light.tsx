"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Prism palette colors — light theme
  vec3 color1 = vec3(0.0, 0.898, 1.0);   // cyan #00E5FF
  vec3 color2 = vec3(0.161, 0.384, 1.0);  // blue #2962FF
  vec3 color3 = vec3(0.878, 0.251, 0.984); // magenta #E040FB
  vec3 color4 = vec3(0.486, 0.302, 1.0);  // violet #7C4DFF
  vec3 color5 = vec3(0.0, 0.902, 0.463);  // green #00E676

  // Simplex noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;

    // Multi-noise mesh gradient
    float n1 = snoise(uv * 2.0 + vec2(t, t * 0.5));
    float n2 = snoise(uv * 3.0 + vec2(-t * 0.7, t * 0.3));
    float n3 = snoise(uv * 1.5 + vec2(t * 0.4, -t * 0.6));

    vec3 color = vec3(0.98, 0.98, 0.98); // near-white base
    color = mix(color, color1, smoothstep(-0.3, 0.5, n1) * 0.12);
    color = mix(color, color2, smoothstep(-0.2, 0.4, n2) * 0.10);
    color = mix(color, color3, smoothstep(-0.1, 0.6, n3) * 0.08);
    color = mix(color, color4, smoothstep(0.0, 0.5, n1 * n2) * 0.06);
    color = mix(color, color5, smoothstep(0.2, 0.7, n2 * n3) * 0.05);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientMeshLight() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current && state?.clock) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1920, 1080) },
        }}
      />
    </mesh>
  );
}

export function GradientMeshCanvasLight() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{ background: "#FAFAFA" }}
      >
        <GradientMeshLight />
      </Canvas>
    </div>
  );
}
