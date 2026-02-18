"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { OCTOPUS_FRAMES, FRAME_COUNT } from "./octopus-frames";
import { cn } from "@/lib/cn";

interface AsciiOctopusProps {
  className?: string;
  opacity?: number;
}

export default function AsciiOctopus({
  className = "",
  opacity = 1,
}: AsciiOctopusProps) {
  const [frameA, setFrameA] = useState(0);
  const [frameB, setFrameB] = useState(1);
  const [showA, setShowA] = useState(true);

  const accumulatorRef = useRef(0);
  const lastTimeRef = useRef(0);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const prefersReducedMotion = useRef(false);

  const FPS = 6;
  const FRAME_TIME = 1000 / FPS;

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver — pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Only accumulate when visible and motion allowed
      if (isVisibleRef.current && !prefersReducedMotion.current) {
        accumulatorRef.current += delta;

        if (accumulatorRef.current >= FRAME_TIME) {
          accumulatorRef.current -= FRAME_TIME;
          frameIndexRef.current =
            (frameIndexRef.current + 1) % FRAME_COUNT;

          // Crossfade: alternate between layer A and B
          setShowA((prev) => {
            if (prev) {
              setFrameB(frameIndexRef.current);
            } else {
              setFrameA(frameIndexRef.current);
            }
            return !prev;
          });
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [FRAME_TIME]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const linesA = OCTOPUS_FRAMES[frameA];
  const linesB = OCTOPUS_FRAMES[frameB];

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Layer A */}
      <code
        className="block select-none leading-[1.15] transition-opacity duration-300 ease-out"
        style={{ opacity: showA ? 1 : 0 }}
      >
        {linesA.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </code>

      {/* Layer B — positioned on top */}
      <code
        className="absolute inset-0 block select-none leading-[1.15] transition-opacity duration-300 ease-out"
        style={{ opacity: showA ? 0 : 1 }}
      >
        {linesB.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </code>
    </div>
  );
}
