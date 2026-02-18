"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";

const PARTICLE_COUNT = 4000;
const CONVERGENCE_DURATION = 2.5;

/* ── Shaders ── */

const vertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float core = smoothstep(0.5, 0.05, dist);
    float glow = exp(-dist * 5.0) * 0.4;
    float alpha = (core + glow) * 0.75;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

/* ── Bezier helper ── */

function bezier(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number {
  const mt = 1 - t;
  return (
    mt * mt * mt * p0 +
    3 * mt * mt * t * p1 +
    3 * mt * t * t * p2 +
    t * t * t * p3
  );
}

/* ── Shape generation ── */

interface ParticleData {
  target: Float32Array;
  initial: Float32Array;
  current: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  breathIntensity: Float32Array;
}

function generateParticleData(): ParticleData {
  const target = new Float32Array(PARTICLE_COUNT * 3);
  const initial = new Float32Array(PARTICLE_COUNT * 3);
  const current = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const breathIntensity = new Float32Array(PARTICLE_COUNT);

  let idx = 0;

  function add(
    x: number,
    y: number,
    z: number,
    breath: number,
    bright: number = 0
  ) {
    if (idx >= PARTICLE_COUNT) return;
    const i3 = idx * 3;

    // Target position
    target[i3] = x;
    target[i3 + 1] = y;
    target[i3 + 2] = z + (Math.random() - 0.5) * 0.15;

    // Scattered initial position
    initial[i3] = (Math.random() - 0.5) * 18;
    initial[i3 + 1] = (Math.random() - 0.5) * 18;
    initial[i3 + 2] = (Math.random() - 0.5) * 4;

    // Color: cobalt blue range with variation
    const variation = Math.random();
    if (bright > 0.5) {
      // Eyes: brighter, whiter blue
      colors[i3] = 0.7 + Math.random() * 0.2;
      colors[i3 + 1] = 0.85 + Math.random() * 0.1;
      colors[i3 + 2] = 1.0;
    } else if (variation < 0.3) {
      // Deep blue #3b82f6
      colors[i3] = 0.231 + (Math.random() - 0.5) * 0.06;
      colors[i3 + 1] = 0.510 + (Math.random() - 0.5) * 0.06;
      colors[i3 + 2] = 0.965 + (Math.random() - 0.5) * 0.02;
    } else if (variation < 0.7) {
      // Mid blue #60a5fa
      colors[i3] = 0.376 + (Math.random() - 0.5) * 0.06;
      colors[i3 + 1] = 0.647 + (Math.random() - 0.5) * 0.06;
      colors[i3 + 2] = 0.980 + (Math.random() - 0.5) * 0.02;
    } else {
      // Light blue #93c5fd
      colors[i3] = 0.576 + (Math.random() - 0.5) * 0.06;
      colors[i3 + 1] = 0.773 + (Math.random() - 0.5) * 0.06;
      colors[i3 + 2] = 0.992;
    }

    sizes[idx] = bright > 0.5 ? 1.8 + Math.random() * 1.5 : 1.0 + Math.random() * 2.5;
    breathIntensity[idx] = breath;

    idx++;
  }

  // ── HEAD / MANTLE ──
  const headCount = Math.floor(PARTICLE_COUNT * 0.38);
  for (let i = 0; i < headCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const t = Math.random(); // 0=bottom, 1=top
    const y = t * 3.0 + 0.3;

    // Dome profile: widest at bottom, tapers at top
    const width = 2.2 * Math.sqrt(Math.max(0, 1 - t * t * 0.7));
    const r = Math.sqrt(Math.random()) * width;

    add(Math.cos(angle) * r, y, 0, 0.3 + t * 0.2);
  }

  // ── EYES ──
  const eyeCount = Math.floor(PARTICLE_COUNT * 0.025);
  for (let eye = 0; eye < 2; eye++) {
    const cx = eye === 0 ? -0.75 : 0.75;
    const cy = 1.7;
    for (let i = 0; i < eyeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 0.22;
      add(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 0.1, 0.05, 1);
    }
  }

  // ── TENTACLES ── (8 bezier curves)
  const remaining = PARTICLE_COUNT - idx;
  const perTentacle = Math.floor(remaining / 8);

  //         [startX,  cp1X,  cp2X,  endX,  cp1Y, cp2Y, endY]
  const tentacles = [
    [-1.8, -3.2, -4.0, -2.5, -1.0, -2.5, -5.0],
    [-1.3, -2.5, -2.0, -3.5, -0.5, -2.0, -4.5],
    [-0.8, -1.5, -0.5, -1.8, -1.2, -3.0, -4.8],
    [-0.3, -0.8, 0.3, -0.5, -0.8, -2.5, -4.2],
    [0.3, 0.6, -0.2, 0.6, -0.8, -2.5, -4.2],
    [0.8, 1.2, 0.8, 2.0, -1.2, -3.0, -4.8],
    [1.3, 2.2, 2.5, 3.8, -0.5, -2.0, -4.5],
    [1.8, 2.8, 3.8, 2.8, -1.0, -2.5, -5.0],
  ];

  tentacles.forEach(([sx, c1x, c2x, ex, c1y, c2y, ey], tentacleIdx) => {
    const startY = 0.3;
    for (let j = 0; j < perTentacle; j++) {
      if (idx >= PARTICLE_COUNT) return;

      // Bias sampling toward base
      const t = Math.pow(Math.random(), 0.6);

      const x = bezier(t, sx, c1x, c2x, ex);
      const y = bezier(t, startY, c1y, c2y, ey);

      // Thickness: thick at base → thin at tip
      const thickness = (1 - t) * 0.32 + 0.03;
      const ox = (Math.random() - 0.5) * thickness;
      const oy = (Math.random() - 0.5) * thickness;

      // Tentacle tips breathe more
      const breath = 0.3 + t * 0.7;

      add(x + ox, y + oy, 0, breath);
    }
  });

  current.set(initial);

  return { target, initial, current, colors, sizes, breathIntensity };
}

/* ── Three.js scene ── */

function Particles({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseWorldRef = useRef(new THREE.Vector3(100, 100, 0));
  const startTimeRef = useRef(-1);

  const data = useMemo(() => generateParticleData(), []);

  const { camera } = useThree();

  // Mouse tracking → world coords
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      mouseWorldRef.current = camera.position
        .clone()
        .add(dir.multiplyScalar(dist));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [camera, reducedMotion]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    if (startTimeRef.current < 0) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;

    const posAttr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    // Convergence: ease-out cubic
    const rawProgress = reducedMotion
      ? 1
      : Math.min(elapsed / CONVERGENCE_DURATION, 1);
    const progress = 1 - Math.pow(1 - rawProgress, 3);

    const mx = mouseWorldRef.current.x;
    const my = mouseWorldRef.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Breathing displacement
      const bScale = reducedMotion ? 0 : data.breathIntensity[i] * 0.08;
      const tx =
        data.target[i3] + Math.sin(time * 0.5 + i * 0.007) * bScale;
      const ty =
        data.target[i3 + 1] + Math.cos(time * 0.35 + i * 0.009) * bScale;
      const tz = data.target[i3 + 2];

      // Lerp initial → target
      let x = data.initial[i3] + (tx - data.initial[i3]) * progress;
      let y =
        data.initial[i3 + 1] + (ty - data.initial[i3 + 1]) * progress;
      let z =
        data.initial[i3 + 2] + (tz - data.initial[i3 + 2]) * progress;

      // Mouse repulsion
      if (!reducedMotion && progress > 0.5) {
        const dx = x - mx;
        const dy = y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 2.0 && d > 0.01) {
          const force = (1 - d / 2.0) * 1.2;
          x += (dx / d) * force;
          y += (dy / d) * force;
        }
      }

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.current, 3]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[data.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[data.sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Exported component ── */

export default function OctopusParticles({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // IntersectionObserver — pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div ref={containerRef} className={cn("size-full", className)}>
      {isVisible && (
        <Canvas
          camera={{ position: [0, -0.5, 10], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <Particles reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}
