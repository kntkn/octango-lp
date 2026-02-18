"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 120;

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0,
    baseOpacity: 0.15 + Math.random() * 0.4,
    pulseSpeed: 0.3 + Math.random() * 0.7,
    pulseOffset: Math.random() * Math.PI * 2,
  }));
}

export default function AmbientParticles({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = createParticles(w, h);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let startTime = -1;

    function draw(time: number) {
      if (startTime < 0) startTime = time;
      const elapsed = (time - startTime) / 1000;

      // Fade-in over 2 seconds
      const fadeIn = Math.min(elapsed / 2, 1);

      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        // Subtle pulse
        const pulse = reducedMotion
          ? 1
          : 0.7 + 0.3 * Math.sin(elapsed * p.pulseSpeed + p.pulseOffset);

        p.opacity = p.baseOpacity * pulse * fadeIn;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isVisible, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      aria-hidden="true"
    />
  );
}
