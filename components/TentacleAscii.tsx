"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* ── Config ─────────────────────────────────────────────── */

const FONT_SIZE = 16;
const LINE_HEIGHT = 1.18;
const CHAR_ASPECT = 0.6;
const TARGET_FPS = 30;
const FRAME_TIME = 1000 / TARGET_FPS;

/* Character palettes */
const BODY_DENSE = ["█", "▓", "▒", "░"];
const EDGE_CHARS = ["·", ".", "°", "˙"];
const CLAW_CHARS = ["▛", "▜", "▟", "▙", "█", "▓"];
const SEGMENT_CHARS = ["═", "║"];

function directionChar(angle: number): string {
  const a = ((angle % Math.PI) + Math.PI) % Math.PI;
  if (a < Math.PI * 0.125 || a >= Math.PI * 0.875) return "─";
  if (a < Math.PI * 0.375) return "╲";
  if (a < Math.PI * 0.625) return "│";
  return "╱";
}

/* ── CatmullRom ────────────────────────────────────────── */

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

/* ── Lobster anatomy ───────────────────────────────────── *
 * Body center at (0.5, 0.75). Claws reach upward,
 * tail extends below viewport. Coordinates in [0,1] space.
 * ──────────────────────────────────────────────────────── */

type PartType = "claw" | "pincer" | "body" | "antenna" | "leg" | "tail";

interface PartCfg {
  points: [number, number][];
  baseRadius: number;
  speed: number;
  amplitude: number;
  phase: number;
  opacity: number;
  type: PartType;
}

const PARTS: PartCfg[] = [
  // ─── RIGHT CLAW ───
  {
    points: [[0.52, 0.72], [0.58, 0.58], [0.65, 0.42], [0.72, 0.28], [0.78, 0.18], [0.82, 0.10]],
    baseRadius: 0.065, speed: 0.4, amplitude: 0.025, phase: 0, opacity: 0.95, type: "claw",
  },
  {
    points: [[0.82, 0.10], [0.88, 0.04], [0.94, 0.01], [0.98, 0.0]],
    baseRadius: 0.035, speed: 0.6, amplitude: 0.015, phase: 0.3, opacity: 0.9, type: "pincer",
  },
  {
    points: [[0.82, 0.10], [0.87, 0.10], [0.92, 0.08], [0.95, 0.06]],
    baseRadius: 0.028, speed: 0.6, amplitude: 0.012, phase: 0.3, opacity: 0.85, type: "pincer",
  },

  // ─── LEFT CLAW ───
  {
    points: [[0.48, 0.72], [0.42, 0.58], [0.35, 0.42], [0.28, 0.28], [0.22, 0.18], [0.18, 0.10]],
    baseRadius: 0.065, speed: 0.4, amplitude: 0.025, phase: 3.14, opacity: 0.95, type: "claw",
  },
  {
    points: [[0.18, 0.10], [0.12, 0.04], [0.06, 0.01], [0.02, 0.0]],
    baseRadius: 0.035, speed: 0.6, amplitude: 0.015, phase: 3.44, opacity: 0.9, type: "pincer",
  },
  {
    points: [[0.18, 0.10], [0.13, 0.10], [0.08, 0.08], [0.05, 0.06]],
    baseRadius: 0.028, speed: 0.6, amplitude: 0.012, phase: 3.44, opacity: 0.85, type: "pincer",
  },

  // ─── BODY ───
  {
    points: [[0.50, 0.58], [0.50, 0.65], [0.50, 0.72], [0.50, 0.80], [0.50, 0.88]],
    baseRadius: 0.10, speed: 0.15, amplitude: 0.008, phase: 1.0, opacity: 0.9, type: "body",
  },

  // ─── ANTENNAE ───
  {
    points: [[0.54, 0.60], [0.60, 0.42], [0.62, 0.25], [0.58, 0.08], [0.52, -0.05]],
    baseRadius: 0.015, speed: 0.7, amplitude: 0.04, phase: 1.5, opacity: 0.6, type: "antenna",
  },
  {
    points: [[0.46, 0.60], [0.40, 0.42], [0.38, 0.25], [0.42, 0.08], [0.48, -0.05]],
    baseRadius: 0.015, speed: 0.7, amplitude: 0.04, phase: 4.5, opacity: 0.6, type: "antenna",
  },

  // ─── RIGHT LEGS ───
  {
    points: [[0.54, 0.68], [0.65, 0.66], [0.76, 0.62], [0.85, 0.56]],
    baseRadius: 0.022, speed: 0.5, amplitude: 0.018, phase: 2.0, opacity: 0.7, type: "leg",
  },
  {
    points: [[0.54, 0.74], [0.66, 0.73], [0.78, 0.70], [0.88, 0.66]],
    baseRadius: 0.020, speed: 0.45, amplitude: 0.016, phase: 2.5, opacity: 0.65, type: "leg",
  },
  {
    points: [[0.54, 0.80], [0.66, 0.80], [0.78, 0.78], [0.87, 0.75]],
    baseRadius: 0.018, speed: 0.42, amplitude: 0.014, phase: 3.0, opacity: 0.6, type: "leg",
  },

  // ─── LEFT LEGS ───
  {
    points: [[0.46, 0.68], [0.35, 0.66], [0.24, 0.62], [0.15, 0.56]],
    baseRadius: 0.022, speed: 0.5, amplitude: 0.018, phase: 5.0, opacity: 0.7, type: "leg",
  },
  {
    points: [[0.46, 0.74], [0.34, 0.73], [0.22, 0.70], [0.12, 0.66]],
    baseRadius: 0.020, speed: 0.45, amplitude: 0.016, phase: 5.5, opacity: 0.65, type: "leg",
  },
  {
    points: [[0.46, 0.80], [0.34, 0.80], [0.22, 0.78], [0.13, 0.75]],
    baseRadius: 0.018, speed: 0.42, amplitude: 0.014, phase: 6.0, opacity: 0.6, type: "leg",
  },

  // ─── TAIL FAN ───
  {
    points: [[0.50, 0.88], [0.50, 0.96], [0.50, 1.04], [0.50, 1.12]],
    baseRadius: 0.07, speed: 0.3, amplitude: 0.02, phase: 7.0, opacity: 0.75, type: "tail",
  },
  {
    points: [[0.50, 1.04], [0.56, 1.10], [0.62, 1.16], [0.66, 1.20]],
    baseRadius: 0.035, speed: 0.35, amplitude: 0.015, phase: 7.3, opacity: 0.6, type: "tail",
  },
  {
    points: [[0.50, 1.04], [0.44, 1.10], [0.38, 1.16], [0.34, 1.20]],
    baseRadius: 0.035, speed: 0.35, amplitude: 0.015, phase: 7.6, opacity: 0.6, type: "tail",
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

const BLEED_PX = 280;

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

    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let grid: Cell[][] = [];
    let renderW = 0;
    let h = 0;
    let viewH = 0;
    let offsetX = 0;

    const MIN_ASPECT = 1.3;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const screenW = window.innerWidth;
      viewH = window.innerHeight;
      h = viewH + BLEED_PX;

      // Maintain minimum aspect ratio — render wider than viewport on mobile
      renderW = Math.max(screenW, viewH * MIN_ASPECT);
      offsetX = (renderW - screenW) / 2;

      canvas!.width = screenW * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${screenW}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellH = FONT_SIZE * LINE_HEIGHT;
      cellW = FONT_SIZE * CHAR_ASPECT;
      cols = Math.ceil(renderW / cellW) + 1;
      rows = Math.ceil(h / cellH) + 1;

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

    let visible = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    obs.observe(canvas);

    /* ── Animate: crayfish-style jerky motion ── */
    function animatePoints(
      cfg: PartCfg,
      t: number,
    ): [number, number][] {
      if (prefersReduced) return cfg.points;

      return cfg.points.map((pt, i) => {
        const tipFactor =
          0.1 + (i / (cfg.points.length - 1)) * 0.9;
        const ph = cfg.phase + i * 1.7;
        const spd = cfg.speed;
        const amp = cfg.amplitude;

        const raw =
          Math.sin(t * spd * 6.0 + ph) +
          Math.sin(t * spd * 3.8 + ph * 1.3) * 0.5 +
          Math.sin(t * spd * 1.5 + ph * 2.1) * 0.3;
        const snap = Math.round(raw * 4) / 4;
        const dx = snap * amp * tipFactor;

        const rawY =
          Math.cos(t * spd * 5.0 + ph * 0.8) +
          Math.sin(t * spd * 3.0 + ph * 0.9) * 0.4;
        const snapY = Math.round(rawY * 4) / 4;
        let dy = snapY * amp * tipFactor * 0.6;

        // Pincers: open/close motion
        if (cfg.type === "pincer") {
          dy += Math.sin(t * 1.2 + cfg.phase) * 0.015 * tipFactor;
        }

        return [pt[0] + dx, pt[1] + dy];
      });
    }

    /* ── Render one frame ── */
    function render(t: number) {
      const fadeIn = Math.min(t / 2.5, 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          cell.char = "";
          cell.a = 0;
        }
      }

      for (const cfg of PARTS) {
        const pts = animatePoints(cfg, t);
        const samples = 200;

        for (let s = 0; s <= samples; s++) {
          const param = s / samples;
          const { pos, tangent } = evalSpline(pts, param);

          // Taper per part type
          let taper: number;
          if (cfg.type === "body") {
            taper = 0.8 + 0.2 * Math.sin(param * Math.PI);
          } else if (cfg.type === "claw") {
            taper = Math.pow(1 - param, 0.8) + Math.sin(param * Math.PI) * 0.3;
          } else if (cfg.type === "tail") {
            taper = 0.5 + 0.5 * param;
          } else {
            taper = Math.pow(1 - param, 1.2);
          }
          const radius = cfg.baseRadius * taper * renderW;

          const angle = Math.atan2(tangent[1], tangent[0]);
          const len = Math.sqrt(
            tangent[0] * tangent[0] + tangent[1] * tangent[1],
          );
          const nx = len > 0 ? -tangent[1] / len : 0;
          const ny = len > 0 ? tangent[0] / len : 0;

          const spineX = pos[0] * renderW;
          const spineY = pos[1] * viewH;

          const halfCells = Math.ceil(radius / cellW) + 1;

          for (let offset = -halfCells; offset <= halfCells; offset++) {
            const px = spineX + nx * offset * cellW;
            const py = spineY + ny * offset * cellW;

            const col = Math.floor(px / cellW);
            const row = Math.floor(py / cellH);

            if (col < 0 || col >= cols || row < 0 || row >= rows) continue;

            const dist = Math.abs(offset * cellW) / Math.max(radius, 1);
            if (dist > 1.15) continue;

            const nd = Math.min(dist, 1);

            // Edge fade
            const edgeFadeX =
              Math.min(Math.max(Math.min(pos[0], 1 - pos[0]) * 5, 0), 1);
            const bleedRatio = BLEED_PX / viewH;
            let edgeFadeY: number;
            if (pos[1] < 0) {
              edgeFadeY = 0;
            } else if (pos[1] <= 1.0) {
              edgeFadeY = Math.min(pos[1] * 5, 1);
            } else {
              const bleedProgress = (pos[1] - 1.0) / bleedRatio;
              edgeFadeY = Math.max(1 - bleedProgress, 0);
            }
            const edgeFade = edgeFadeX * edgeFadeY;

            // Pick character based on part type
            let char: string;

            if (cfg.type === "claw" || cfg.type === "pincer") {
              if (nd < 0.2) {
                char = CLAW_CHARS[Math.floor(nd * CLAW_CHARS.length / 0.2) % CLAW_CHARS.length];
              } else if (nd < 0.5) {
                char = BODY_DENSE[Math.floor((nd - 0.2) / 0.3 * BODY_DENSE.length)];
              } else {
                char = EDGE_CHARS[Math.floor((nd - 0.5) / 0.65 * EDGE_CHARS.length) % EDGE_CHARS.length];
              }
            } else if (cfg.type === "body") {
              const segPhase = (param * 12) % 1;
              if (nd < 0.15 && segPhase < 0.15) {
                char = SEGMENT_CHARS[Math.floor(segPhase * 2 / 0.15) % SEGMENT_CHARS.length];
              } else if (nd < 0.4) {
                char = BODY_DENSE[Math.floor(nd / 0.4 * BODY_DENSE.length)];
              } else if (nd < 0.7) {
                char = BODY_DENSE[Math.floor((nd - 0.4) / 0.3 * BODY_DENSE.length) + 1];
              } else {
                char = EDGE_CHARS[Math.floor((nd - 0.7) / 0.45 * EDGE_CHARS.length) % EDGE_CHARS.length];
              }
            } else if (cfg.type === "antenna") {
              char = nd < 0.3 ? directionChar(angle) : EDGE_CHARS[0];
            } else {
              // legs, tail
              if (nd < 0.3) {
                char = directionChar(angle);
              } else if (nd < 0.6) {
                char = BODY_DENSE[Math.min(Math.floor((nd - 0.3) / 0.3 * BODY_DENSE.length), BODY_DENSE.length - 1)];
              } else {
                char = EDGE_CHARS[Math.min(Math.floor((nd - 0.6) / 0.55 * EDGE_CHARS.length), EDGE_CHARS.length - 1)];
              }
            }

            // Color per part type
            const brightness = 1 - nd * 0.65;
            let cr: number, cg: number, cb: number;

            if (cfg.type === "body") {
              cr = Math.floor(120 + 90 * brightness);
              cg = Math.floor(12 + 30 * brightness);
              cb = Math.floor(8 + 18 * brightness);
            } else if (cfg.type === "claw" || cfg.type === "pincer") {
              cr = Math.floor(150 + 105 * brightness);
              cg = Math.floor(22 + 55 * brightness);
              cb = Math.floor(10 + 20 * brightness);
            } else if (cfg.type === "antenna") {
              cr = Math.floor(140 + 80 * brightness);
              cg = Math.floor(40 + 50 * brightness);
              cb = Math.floor(15 + 20 * brightness);
            } else {
              cr = Math.floor(130 + 100 * brightness);
              cg = Math.floor(18 + 40 * brightness);
              cb = Math.floor(10 + 22 * brightness);
            }

            const cellAlpha =
              cfg.opacity *
              (1 - nd * nd) *
              Math.max(taper, 0.05) *
              edgeFade *
              fadeIn;

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

      // Draw to canvas (shift by -offsetX to crop sides)
      ctx!.clearRect(0, 0, renderW, h);
      ctx!.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx!.textBaseline = "top";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          if (cell.a < 0.02 || !cell.char) continue;

          const drawX = c * cellW - offsetX;
          if (drawX < -cellW || drawX > renderW) continue;

          ctx!.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},${cell.a})`;
          ctx!.fillText(cell.char, drawX, r * cellH);
        }
      }
    }

    /* ── Animation loop ── */
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

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute top-0 left-0 right-0", className)}
      aria-hidden="true"
    />
  );
}
