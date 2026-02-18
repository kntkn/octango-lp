"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* ── Config ─────────────────────────────────────────────── */

const FONT_SIZE = 16;
const LINE_HEIGHT = 1.18;
const CHAR_ASPECT = 0.6; // monospace char width / height
const TARGET_FPS = 30;
const FRAME_TIME = 1000 / TARGET_FPS;

/* Character palettes — density & direction */
const BODY_DENSE = ["█", "▓", "▒", "░"];
const EDGE_CHARS = ["·", ".", "°", "˙"];
const SUCKER = ["◉", "⊙", "○"];

function directionChar(angle: number): string {
  // Normalize angle to [0, PI)
  const a = ((angle % Math.PI) + Math.PI) % Math.PI;
  if (a < Math.PI * 0.125 || a >= Math.PI * 0.875) return "─";
  if (a < Math.PI * 0.375) return "╲";
  if (a < Math.PI * 0.625) return "│";
  return "╱";
}

/* ── CatmullRom evaluation (pure JS, no Three.js) ────── */

function catmullRom(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number,
): [number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  const x =
    0.5 *
    (2 * p1[0] +
      (-p0[0] + p2[0]) * t +
      (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
      (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
  const y =
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * t +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
  return [x, y];
}

function catmullRomTangent(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number,
): [number, number] {
  const t2 = t * t;
  const tx =
    0.5 *
    (-p0[0] +
      p2[0] +
      (4 * p0[0] - 10 * p1[0] + 8 * p2[0] - 2 * p3[0]) * t +
      (-3 * p0[0] + 9 * p1[0] - 9 * p2[0] + 3 * p3[0]) * t2);
  const ty =
    0.5 *
    (-p0[1] +
      p2[1] +
      (4 * p0[1] - 10 * p1[1] + 8 * p2[1] - 2 * p3[1]) * t +
      (-3 * p0[1] + 9 * p1[1] - 9 * p2[1] + 3 * p3[1]) * t2);
  return [tx, ty];
}

/** Evaluate a full CatmullRom spline at parameter t ∈ [0, 1] */
function evalSpline(
  pts: [number, number][],
  t: number,
): { pos: [number, number]; tangent: [number, number] } {
  const n = pts.length - 1;
  const raw = t * n;
  const i = Math.min(Math.floor(raw), n - 1);
  const local = raw - i;

  const p0 = pts[Math.max(i - 1, 0)];
  const p1 = pts[i];
  const p2 = pts[Math.min(i + 1, n)];
  const p3 = pts[Math.min(i + 2, n)];

  return {
    pos: catmullRom(p0, p1, p2, p3, local),
    tangent: catmullRomTangent(p0, p1, p2, p3, local),
  };
}

/* ── 8 Tentacle path definitions ─────────────────────── *
 * Coordinates in normalized [0,1] space.
 * y > 1.0 = below viewport (origin of creature).
 * Each tentacle has: points, baseRadius (at root),
 * speed, amplitude, phase offset.
 * ──────────────────────────────────────────────────────── */

interface TentacleCfg {
  points: [number, number][];
  baseRadius: number; // fraction of viewport width
  speed: number;
  amplitude: number;
  phase: number;
  opacity: number;
}

const TENTACLES: TentacleCfg[] = [
  {
    // #1 — Main left, massive sweep across viewport
    points: [
      [-0.15, 1.3],
      [0.0, 0.82],
      [0.15, 0.52],
      [0.35, 0.28],
      [0.55, 0.12],
      [0.75, -0.02],
    ],
    baseRadius: 0.095,
    speed: 0.5,
    amplitude: 0.07,
    phase: 0,
    opacity: 0.95,
  },
  {
    // #2 — Main right, crosses #1
    points: [
      [1.18, 1.25],
      [0.98, 0.78],
      [0.8, 0.48],
      [0.6, 0.28],
      [0.38, 0.14],
      [0.2, 0.0],
    ],
    baseRadius: 0.088,
    speed: 0.45,
    amplitude: 0.065,
    phase: 1.2,
    opacity: 0.92,
  },
  {
    // #3 — Center-left, rises steeply
    points: [
      [0.25, 1.35],
      [0.28, 0.92],
      [0.32, 0.6],
      [0.37, 0.32],
      [0.34, 0.1],
      [0.3, -0.08],
    ],
    baseRadius: 0.072,
    speed: 0.42,
    amplitude: 0.05,
    phase: 2.5,
    opacity: 0.88,
  },
  {
    // #4 — Center-right, rises steeply
    points: [
      [0.78, 1.32],
      [0.74, 0.9],
      [0.68, 0.58],
      [0.63, 0.3],
      [0.66, 0.08],
      [0.7, -0.08],
    ],
    baseRadius: 0.068,
    speed: 0.48,
    amplitude: 0.055,
    phase: 3.8,
    opacity: 0.85,
  },
  {
    // #5 — Far left, hugs edge
    points: [
      [-0.18, 1.18],
      [-0.08, 0.85],
      [0.0, 0.55],
      [0.06, 0.3],
      [0.1, 0.08],
      [0.12, -0.1],
    ],
    baseRadius: 0.06,
    speed: 0.38,
    amplitude: 0.04,
    phase: 5.0,
    opacity: 0.72,
  },
  {
    // #6 — Far right, hugs edge
    points: [
      [1.2, 1.2],
      [1.1, 0.82],
      [1.0, 0.52],
      [0.94, 0.28],
      [0.9, 0.06],
      [0.88, -0.1],
    ],
    baseRadius: 0.058,
    speed: 0.4,
    amplitude: 0.042,
    phase: 6.2,
    opacity: 0.7,
  },
  {
    // #7 — Background sweep left→right
    points: [
      [0.1, 1.4],
      [0.18, 0.95],
      [0.3, 0.62],
      [0.45, 0.38],
      [0.6, 0.18],
      [0.78, 0.04],
    ],
    baseRadius: 0.048,
    speed: 0.35,
    amplitude: 0.035,
    phase: 7.5,
    opacity: 0.55,
  },
  {
    // #8 — Background sweep right→left
    points: [
      [0.92, 1.38],
      [0.85, 0.94],
      [0.72, 0.62],
      [0.55, 0.36],
      [0.4, 0.16],
      [0.25, 0.02],
    ],
    baseRadius: 0.045,
    speed: 0.33,
    amplitude: 0.032,
    phase: 8.8,
    opacity: 0.5,
  },
];

/* ── Grid cell structure ─────────────────────────────── */

interface Cell {
  char: string;
  r: number;
  g: number;
  b: number;
  a: number;
}

/* ── Component ───────────────────────────────────────── */

export default function TentacleAscii({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ── Grid dimensions (recalculated on resize) ── */
    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let grid: Cell[][] = [];
    let w = 0;
    let h = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellH = FONT_SIZE * LINE_HEIGHT;
      cellW = FONT_SIZE * CHAR_ASPECT;
      cols = Math.ceil(w / cellW) + 1;
      rows = Math.ceil(h / cellH) + 1;

      // Allocate grid
      grid = [];
      for (let r = 0; r < rows; r++) {
        const row: Cell[] = [];
        for (let c = 0; c < cols; c++) {
          row.push({ char: "", r: 0, g: 0, b: 0, a: 0 });
        }
        grid.push(row);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    /* ── Visibility ── */
    let visible = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    obs.observe(canvas);

    /* ── Animate tentacle points ── */
    function animatePoints(
      cfg: TentacleCfg,
      t: number,
    ): [number, number][] {
      if (prefersReduced) return cfg.points;

      return cfg.points.map((pt, i) => {
        const tipFactor =
          0.12 + (i / (cfg.points.length - 1)) * 0.88;
        const ph = cfg.phase + i * 1.7;
        const spd = cfg.speed;
        const amp = cfg.amplitude;

        const dx =
          (Math.sin(t * spd * 6.0 + ph) +
            Math.sin(t * spd * 3.8 + ph * 1.3) * 0.5 +
            Math.sin(t * spd * 1.5 + ph * 2.1) * 0.3) *
          amp *
          tipFactor;
        const dy =
          (Math.cos(t * spd * 5.0 + ph * 0.8) +
            Math.sin(t * spd * 3.0 + ph * 0.9) * 0.4 +
            Math.cos(t * spd * 1.2 + ph * 1.6) * 0.2) *
          amp *
          tipFactor *
          0.7;

        return [pt[0] + dx, pt[1] + dy];
      });
    }

    /* ── Render one frame ── */
    function render(t: number) {
      const fadeIn = Math.min(t / 3.0, 1);

      // Clear grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          cell.char = "";
          cell.a = 0;
        }
      }

      // For each tentacle, sample along the curve and stamp grid cells
      for (const cfg of TENTACLES) {
        const pts = animatePoints(cfg, t);
        const samples = 260;

        for (let s = 0; s <= samples; s++) {
          const param = s / samples;
          const { pos, tangent } = evalSpline(pts, param);

          // Taper: thick at base (param=0), thin at tip (param=1)
          const taper = Math.pow(1 - param, 1.2);
          const radius = cfg.baseRadius * taper * w; // pixels

          // Tangent angle for direction chars
          const angle = Math.atan2(tangent[1], tangent[0]);
          // Normal direction (perpendicular to tangent)
          const len = Math.sqrt(
            tangent[0] * tangent[0] + tangent[1] * tangent[1],
          );
          const nx = len > 0 ? -tangent[1] / len : 0;
          const ny = len > 0 ? tangent[0] / len : 0;

          // Pixel position of spine
          const spineX = pos[0] * w;
          const spineY = pos[1] * h;

          // Stamp cells across the width
          const halfCells = Math.ceil(radius / cellW) + 1;

          for (let offset = -halfCells; offset <= halfCells; offset++) {
            const px = spineX + nx * offset * cellW;
            const py = spineY + ny * offset * cellW;

            const col = Math.floor(px / cellW);
            const row = Math.floor(py / cellH);

            if (col < 0 || col >= cols || row < 0 || row >= rows) continue;

            // Normalized distance from center (0 = spine, 1 = edge)
            const dist = Math.abs(offset * cellW) / Math.max(radius, 1);
            if (dist > 1.15) continue;

            // Edge fade at viewport borders
            const edgeFadeX =
              Math.min(pos[0], 1 - pos[0]) * 5; // 0-1 over 20% from edges
            const edgeFadeY =
              Math.min(Math.max(1 - pos[1], 0) * 3, 1); // fade near bottom
            const edgeFade =
              Math.min(
                Math.max(edgeFadeX, 0),
                1,
              ) * edgeFadeY;

            // Pick character
            let char: string;
            const nd = Math.min(dist, 1);

            // Sucker pattern along the spine
            const suckerPhase = (param * 30 + t * cfg.speed * 2) % 1;

            if (nd < 0.12 && suckerPhase < 0.3) {
              // Sucker at center
              const si = Math.floor(nd * SUCKER.length / 0.12);
              char = SUCKER[Math.min(si, SUCKER.length - 1)];
            } else if (nd < 0.18) {
              // Direction char at near-center
              char = directionChar(angle);
            } else if (nd < 0.45) {
              // Dense body
              const bi = Math.floor(
                ((nd - 0.18) / 0.27) * BODY_DENSE.length,
              );
              char = BODY_DENSE[Math.min(bi, BODY_DENSE.length - 1)];
            } else if (nd < 0.75) {
              // Medium density
              const bi =
                Math.floor(((nd - 0.45) / 0.3) * BODY_DENSE.length) + 1;
              char =
                BODY_DENSE[Math.min(bi, BODY_DENSE.length - 1)];
            } else {
              // Edge dots
              const ei = Math.floor(
                ((nd - 0.75) / 0.4) * EDGE_CHARS.length,
              );
              char = EDGE_CHARS[Math.min(ei, EDGE_CHARS.length - 1)];
            }

            // Color: bright blue at core → dark blue at edges
            const brightness = 1 - nd * 0.65;
            const cr = Math.floor(20 + 76 * brightness);
            const cg = Math.floor(50 + 115 * brightness);
            const cb = Math.floor(140 + 110 * brightness);

            // Alpha: combine tentacle opacity, taper, edge fades, and fade-in
            const cellAlpha =
              cfg.opacity *
              (1 - nd * nd) *
              Math.max(taper, 0.05) *
              edgeFade *
              fadeIn;

            // Write to grid (blend: keep highest alpha)
            const cell = grid[row][col];
            if (cellAlpha > cell.a) {
              cell.char = char;
              cell.r = cr;
              cell.g = cg;
              cell.b = cb;
              cell.a = cellAlpha;
            }
          }
        }
      }

      // Draw to canvas
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx!.textBaseline = "top";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          if (cell.a < 0.02 || !cell.char) continue;

          ctx!.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},${cell.a})`;
          ctx!.fillText(cell.char, c * cellW, r * cellH);
        }
      }
    }

    /* ── Animation loop (30fps accumulator like ghostty.org) ── */
    let raf = 0;
    const start = performance.now();
    let lastFrame = 0;

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visible) return;

      const delta = now - lastFrame;
      if (delta < FRAME_TIME) return;
      lastFrame = now - (delta % FRAME_TIME);

      const t = (now - start) / 1000;
      render(t);
    }

    raf = requestAnimationFrame(loop);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}
