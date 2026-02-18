"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/cn";

/* ── Tentacle path definitions ──────────────────────────── *
 * Each tentacle enters from off-screen (below/sides) and
 * curves behind the hero text. The origin of the creature
 * is implied to be below the viewport — you never see
 * the full octopus, only massive tentacle fragments.
 * ──────────────────────────────────────────────────────── */

interface TentacleConfig {
  points: [number, number, number][];
  radius: number;
  opacity: number;
  speed: number;
  amplitude: number;
}

const TENTACLES: TentacleConfig[] = [
  {
    // Main left — massive, sweeps bottom-left → top-right
    points: [
      [-6, -6, 0.8],
      [-4, -3.5, 1.2],
      [-1.5, -1, 1.5],
      [0.8, 0.8, 1],
      [2.8, 2, 0.4],
      [4.5, 3, -0.2],
    ],
    radius: 0.85,
    opacity: 0.6,
    speed: 0.08,
    amplitude: 0.55,
  },
  {
    // Main right — crosses the first, bottom-right → top-left
    points: [
      [7, -5.5, 0.3],
      [4.5, -3, 0.8],
      [2, -0.8, 1.2],
      [-0.5, 0.8, 1.2],
      [-2.5, 2, 0.6],
      [-4.5, 3.2, 0],
    ],
    radius: 0.72,
    opacity: 0.52,
    speed: 0.065,
    amplitude: 0.5,
  },
  {
    // Center — rises from directly below, almost vertical
    points: [
      [-0.8, -7, 1.2],
      [-0.4, -4.5, 1.5],
      [0, -2, 1.2],
      [0.4, -0.2, 0.8],
      [0, 1.5, 0.3],
      [-0.4, 3.2, -0.2],
    ],
    radius: 0.55,
    opacity: 0.42,
    speed: 0.06,
    amplitude: 0.35,
  },
  {
    // Far left edge — follows the left border upward
    points: [
      [-7.5, -4.5, -0.5],
      [-6, -2.5, 0],
      [-4.5, -0.3, 0.3],
      [-3.5, 1.5, 0.5],
      [-3, 3, 0.2],
      [-2.5, 4.5, -0.3],
    ],
    radius: 0.48,
    opacity: 0.32,
    speed: 0.055,
    amplitude: 0.35,
  },
  {
    // Background right — deep layer, adds atmosphere
    points: [
      [7, -5.5, -1.5],
      [5, -3.5, -1],
      [3.5, -1.2, -0.5],
      [2, 0.5, -0.5],
      [0.8, 2, -0.8],
      [-0.3, 3.5, -1.2],
    ],
    radius: 0.38,
    opacity: 0.22,
    speed: 0.045,
    amplitude: 0.28,
  },
];

/* ── Shaders ────────────────────────────────────────────── */

const VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uFadeIn;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    /* Fresnel — bright silhouette edges, darker center */
    vec3 V = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(V, vNormal)), 2.2);

    /* Color: volumetric deep-sea creature feel */
    vec3 deep   = vec3(0.03, 0.06, 0.14);
    vec3 mid    = vec3(0.08, 0.18, 0.38);
    vec3 glow   = vec3(0.24, 0.52, 0.97);

    /* Core gets mid-blue, edges get bright glow */
    vec3 color = mix(mid, glow, fresnel * 0.8);
    color = mix(deep, color, 0.4 + fresnel * 0.6);

    /* Taper fade along length (UV.x: 0 = base, 1 = tip) */
    float taper = smoothstep(0.0, 0.06, vUv.x) * (1.0 - vUv.x * vUv.x);

    /* Subtle pulse — slow, organic breathing */
    float pulse = 0.88 + 0.12 * sin(uTime * 0.3 + vUv.x * 6.283);

    /* Subsurface scattering — light bleeds through edges */
    float sss = 0.35 + 0.65 * (fresnel * 0.6 + 0.4);

    /* Rim highlight — extra bright at extreme edges */
    float rim = pow(fresnel, 4.0) * 0.5;

    float a = uOpacity * taper * sss * pulse * uFadeIn;
    gl_FragColor = vec4(color + rim * glow, a);
  }
`;

/* ── Geometry helpers ───────────────────────────────────── */

const TUBE_SEGMENTS = 80;
const RADIAL_SEGMENTS = 16;

/**
 * Taper the tube: thick at base (UV.x=0), thin at tip (UV.x=1).
 * Uses arc-length–spaced centers to match TubeGeometry internals.
 */
function applyTaper(
  geometry: THREE.TubeGeometry,
  curve: THREE.CatmullRomCurve3,
) {
  const pos = geometry.attributes.position;
  const centers = curve.getSpacedPoints(TUBE_SEGMENTS);
  const ringSize = RADIAL_SEGMENTS + 1;

  for (let i = 0; i <= TUBE_SEGMENTS; i++) {
    const t = i / TUBE_SEGMENTS;
    const scale = Math.max(Math.pow(1 - t, 1.3), 0.04);
    const c = centers[i];

    for (let j = 0; j < ringSize; j++) {
      const idx = i * ringSize + j;
      pos.setXYZ(
        idx,
        c.x + (pos.getX(idx) - c.x) * scale,
        c.y + (pos.getY(idx) - c.y) * scale,
        c.z + (pos.getZ(idx) - c.z) * scale,
      );
    }
  }

  geometry.computeVertexNormals();
}

function buildMesh(
  curve: THREE.CatmullRomCurve3,
  cfg: TentacleConfig,
): { mesh: THREE.Mesh; material: THREE.ShaderMaterial } {
  const geometry = new THREE.TubeGeometry(
    curve,
    TUBE_SEGMENTS,
    cfg.radius,
    RADIAL_SEGMENTS,
    false,
  );
  applyTaper(geometry, curve);

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: cfg.opacity },
      uFadeIn: { value: 0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  return { mesh: new THREE.Mesh(geometry, material), material };
}

/* ── Component ──────────────────────────────────────────── */

export default function TentacleBackground({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
    camera.position.set(0, 0, 6);

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Build tentacles ── */
    const data = TENTACLES.map((cfg) => {
      const basePoints = cfg.points.map(
        ([x, y, z]) => new THREE.Vector3(x, y, z),
      );
      const curve = new THREE.CatmullRomCurve3(
        basePoints.map((v) => v.clone()),
      );
      const { mesh, material } = buildMesh(curve, cfg);
      scene.add(mesh);
      return { cfg, basePoints, curve, mesh, material, seed: Math.random() * 100 };
    });

    /* ── Resize ── */
    function onResize() {
      const w = el!.clientWidth;
      const h = el!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    onResize();
    window.addEventListener("resize", onResize);

    /* ── Visibility ── */
    let visible = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    obs.observe(el);

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let raf = 0;

    function loop() {
      raf = requestAnimationFrame(loop);
      if (!visible) return;

      const t = clock.getElapsedTime();
      const fadeIn = Math.min(t / 3.5, 1); // 3.5s fade-in

      for (const td of data) {
        /* Animate control points with layered sine waves */
        const animated = td.basePoints.map((bp, i) => {
          if (prefersReduced) return bp.clone();

          const tipFactor = 0.15 + (i / (td.basePoints.length - 1)) * 0.85;
          const s = td.seed;
          const ph = i * 1.7;
          const spd = td.cfg.speed;
          const amp = td.cfg.amplitude;

          return new THREE.Vector3(
            bp.x +
              (Math.sin(t * spd + s + ph) +
                Math.sin(t * spd * 0.6 + s * 2.1 + ph * 1.3) * 0.5) *
                amp *
                tipFactor,
            bp.y +
              (Math.cos(t * spd * 0.8 + s * 1.7 + ph) +
                Math.sin(t * spd * 0.5 + s * 3.1 + ph * 0.9) * 0.4) *
                amp *
                tipFactor,
            bp.z +
              Math.sin(t * spd * 0.6 + s * 0.5 + ph) * amp * 0.3 * tipFactor,
          );
        });

        /* Rebuild geometry with updated curve */
        td.curve.points = animated;
        const oldGeom = td.mesh.geometry;
        td.mesh.geometry = new THREE.TubeGeometry(
          td.curve,
          TUBE_SEGMENTS,
          td.cfg.radius,
          RADIAL_SEGMENTS,
          false,
        );
        applyTaper(td.mesh.geometry as THREE.TubeGeometry, td.curve);
        oldGeom.dispose();

        /* Update uniforms */
        td.material.uniforms.uTime.value = t;
        td.material.uniforms.uFadeIn.value = fadeIn;
      }

      renderer.render(scene, camera);
    }

    raf = requestAnimationFrame(loop);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      obs.disconnect();
      for (const td of data) {
        td.mesh.geometry.dispose();
        td.material.dispose();
        scene.remove(td.mesh);
      }
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}
