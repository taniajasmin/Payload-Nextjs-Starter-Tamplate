"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Canvas color constants — Tailwind tokens don't reach WebGL shaders.
   Hex/RGB values below are intentional and kept literally. Per the
   unify-decorative migration rule, decorative brand colors (teal/blue/
   pink/gold/orange) would normally collapse to `--primary`, but WebGL
   can't read CSS vars without runtime plumbing. Left as-is for v1. */

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

  // Brand palette colors
  vec3 color1 = vec3(0.69, 0.87, 0.89); // teal #B0DDE4
  vec3 color2 = vec3(0.16, 0.44, 0.71);  // blue #286FB4
  vec3 color3 = vec3(0.87, 0.30, 0.45); // pink #DF4C73
  vec3 color4 = vec3(0.82, 0.63, 0.50); // gold #D1A080
  vec3 color5 = vec3(1.0, 0.46, 0.07);  // orange #FF7513

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
    float t = uTime * 0.15;

    // Multi-noise mesh gradient
    float n1 = snoise(uv * 2.0 + vec2(t, t * 0.5));
    float n2 = snoise(uv * 3.0 + vec2(-t * 0.7, t * 0.3));
    float n3 = snoise(uv * 1.5 + vec2(t * 0.4, -t * 0.6));

    vec3 color = vec3(0.06, 0.07, 0.09); // dark base
    color = mix(color, color1, smoothstep(-0.3, 0.5, n1) * 0.25);
    color = mix(color, color2, smoothstep(-0.2, 0.4, n2) * 0.2);
    color = mix(color, color3, smoothstep(-0.1, 0.6, n3) * 0.2);
    color = mix(color, color4, smoothstep(0.0, 0.5, n1 * n2) * 0.15);
    color = mix(color, color5, smoothstep(0.2, 0.7, n2 * n3) * 0.1);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientMesh() {
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

export function GradientMeshCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{ background: "#0F1117" }}
      >
        <GradientMesh />
      </Canvas>
    </div>
  );
}
