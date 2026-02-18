"use client";

import { useEffect, useRef, useCallback } from "react";

export default function DeepSeaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const fragmentsRef = useRef<Fragment[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight;
    const viewH = window.innerHeight;

    drawFragments(ctx, w, h, scrollY, viewH, docH, fragmentsRef.current);
  }, []);

  useEffect(() => {
    fragmentsRef.current = generateFragments();
    draw();

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          draw();
          ticking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", draw);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}

/* ── tentacle edge fragments ── */

interface Fragment {
  side: "left" | "right";
  yRatio: number; // position as ratio of document height
  length: number;
  thickness: number;
  curve: number;
  phase: number;
}

function generateFragments(): Fragment[] {
  const count = 10;
  return Array.from({ length: count }, (_, i) => ({
    side: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    yRatio: 0.2 + (i / count) * 0.65 + (Math.random() - 0.5) * 0.05,
    length: 40 + Math.random() * 60,
    thickness: 1.5 + Math.random() * 1.5,
    curve: 20 + Math.random() * 30,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawFragments(
  ctx: CanvasRenderingContext2D,
  viewW: number,
  viewH: number,
  scrollY: number,
  _viewH: number,
  docH: number,
  fragments: Fragment[]
) {
  const time = performance.now() * 0.001;

  for (const frag of fragments) {
    // Convert document-relative Y to viewport-relative Y
    const docY = docH * frag.yRatio;
    const viewportY = docY - scrollY;

    // Skip if not visible (with margin)
    if (viewportY < -100 || viewportY > viewH + 100) continue;

    // Proximity-based opacity — brightest when centered in viewport
    const centerDist = Math.abs(viewportY - viewH / 2) / (viewH / 2);
    const alpha = Math.max(0, 0.18 - centerDist * 0.14);
    if (alpha <= 0) continue;

    ctx.save();

    const startX = frag.side === "left" ? 0 : viewW;
    const dir = frag.side === "left" ? 1 : -1;
    const steps = Math.floor(frag.length / 2.5);

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const x = startX + dir * s * 5;
      const y =
        viewportY +
        Math.sin(t * Math.PI * 1.5 + frag.phase + time * 0.3) *
          frag.curve *
          t;

      // Character selection — thicker near edge, thinner toward center
      const chars =
        t < 0.2 ? "█▓" : t < 0.5 ? "▓░" : t < 0.75 ? "░·" : "·.";
      const char = chars[Math.floor(Math.random() * chars.length)];

      const localAlpha = alpha * (1 - t * 0.8);
      ctx.globalAlpha = localAlpha;
      ctx.font = `${8 + frag.thickness * 2}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `rgba(59, 130, 246, 0.7)`;
      ctx.fillText(char, x, y);
    }

    ctx.restore();
  }
}
