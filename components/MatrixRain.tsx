"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  color?: string;
  opacity?: number;
}

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|=+-*&^%$#@!";

export default function MatrixRain({
  color = "#00ff41",
  opacity = 0.15,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let animationId: number;
    const fontSize = 14;
    let columns: number;
    let drops: Float32Array;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      const newDrops = new Float32Array(columns);
      if (drops) {
        for (let i = 0; i < Math.min(drops.length, columns); i++) {
          newDrops[i] = drops[i];
        }
      }
      for (let i = drops ? drops.length : 0; i < columns; i++) {
        newDrops[i] = Math.random() * -100;
      }
      drops = newDrops;
    }

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const interval = 50;

    function draw(time: number) {
      if (!canvas || !ctx) return;
      animationId = requestAnimationFrame(draw);

      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.fillStyle = `rgba(5, 5, 7, 0.08)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character - bright
        const brightness = 1.0;
        ctx.fillStyle = color;
        ctx.globalAlpha = brightness;
        ctx.fillText(char, x, y);

        // Trail character - dimmer
        if (drops[i] > 1) {
          ctx.globalAlpha = 0.4;
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillText(trailChar, x, y - fontSize);
        }

        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ opacity }}
    />
  );
}
