"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uAccentColor;
  varying vec2 vUv;

  // Smooth noise
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

    // Mouse parallax offset
    vec2 mouseOffset = (uMouse - 0.5) * 0.08;
    uv += mouseOffset;

    // Create flowing silk ribbons
    float ribbon1 = sin(uv.x * 3.0 + t * 1.5 + snoise(uv * 2.0 + t * 0.3) * 0.5) * 0.5 + 0.5;
    float ribbon2 = sin(uv.y * 2.5 - t * 1.2 + snoise(uv * 1.5 - t * 0.2) * 0.5) * 0.5 + 0.5;
    float ribbon3 = sin((uv.x + uv.y) * 2.0 + t * 0.8 + snoise(uv * 3.0 + t * 0.4) * 0.3) * 0.5 + 0.5;

    // Soft wave blending
    float wave1 = smoothstep(0.3, 0.7, ribbon1) * 0.12;
    float wave2 = smoothstep(0.3, 0.7, ribbon2) * 0.10;
    float wave3 = smoothstep(0.3, 0.7, ribbon3) * 0.08;

    // Prism colors — Electric Cyan, Royal Blue, Soft Magenta, Vivid Violet
    vec3 cyan = vec3(0.0, 0.898, 1.0);
    vec3 blue = vec3(0.161, 0.384, 1.0);
    vec3 magenta = vec3(0.878, 0.251, 0.984);
    vec3 violet = vec3(0.486, 0.302, 1.0);

    // Mix colors based on accent
    vec3 accent1 = mix(cyan, blue, sin(t * 0.5) * 0.5 + 0.5);
    vec3 accent2 = mix(magenta, violet, sin(t * 0.7 + 1.0) * 0.5 + 0.5);
    vec3 accent3 = mix(cyan, magenta, sin(t * 0.3 + 2.0) * 0.5 + 0.5);

    // Blend accent color
    vec3 accentBlend = mix(accent1, uAccentColor, 0.3);

    // White base
    vec3 color = vec3(1.0, 1.0, 1.0);

    // Add translucent silk layers
    color = mix(color, accentBlend, wave1);
    color = mix(color, accent2, wave2);
    color = mix(color, accent3, wave3);

    // Subtle edge fade for seamless blending
    float edgeFade = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x)
                   * smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.85, uv.y);

    // Overall opacity — very subtle
    float alpha = (wave1 + wave2 + wave3) * edgeFade * 0.6;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface LiquidSilkMeshProps {
  accentColor?: [number, number, number];
}

function LiquidSilkMesh({
  accentColor = [0.0, 0.898, 1.0],
}: LiquidSilkMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
      uAccentColor: { value: new THREE.Vector3(...accentColor) },
    }),
    [accentColor],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse lerp
      targetMouseRef.current.x = state.pointer.x * 0.5 + 0.5;
      targetMouseRef.current.y = state.pointer.y * 0.5 + 0.5;
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      materialRef.current.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y,
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

interface LiquidSilkCanvasProps {
  accentColor?: [number, number, number];
}

export function LiquidSilkCanvas({ accentColor }: LiquidSilkCanvasProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <LiquidSilkMesh accentColor={accentColor} />
      </Canvas>
    </div>
  );
}
