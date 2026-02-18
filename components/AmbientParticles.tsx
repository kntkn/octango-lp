"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 150;

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    size: 1 + Math.random() * 1.5,
    baseOpacity: 0.25 + Math.random() * 0.45,
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
      const fadeIn = Math.min(elapsed / 2.5, 1);

      ctx!.clearRect(0, 0, w, h);

      // Update positions
      if (!reducedMotion) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.12 * fadeIn;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(96, 165, 250, ${lineOpacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const pulse = reducedMotion
          ? 1
          : 0.7 + 0.3 * Math.sin(elapsed * p.pulseSpeed + p.pulseOffset);
        const opacity = p.baseOpacity * pulse * fadeIn;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(96, 165, 250, ${opacity})`;
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
