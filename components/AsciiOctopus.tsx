"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { OCTOPUS_FRAMES, FRAME_COUNT } from "./octopus-frames";

interface AsciiOctopusProps {
  className?: string;
  opacity?: number;
}

export default function AsciiOctopus({
  className = "",
  opacity = 1,
}: AsciiOctopusProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const accumulatorRef = useRef(0);
  const lastTimeRef = useRef(0);
  const frameRef = useRef(0);

  const FPS = 4; // Slow, breathing animation
  const FRAME_TIME = 1000 / FPS;

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accumulatorRef.current += delta;

      if (accumulatorRef.current >= FRAME_TIME) {
        accumulatorRef.current -= FRAME_TIME;
        frameRef.current = (frameRef.current + 1) % FRAME_COUNT;
        setCurrentFrame(frameRef.current);
      }

      requestAnimationFrame(animate);
    },
    [FRAME_TIME]
  );

  useEffect(() => {
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const lines = OCTOPUS_FRAMES[currentFrame];

  return (
    <code
      className={`block select-none leading-[1.15] ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line}
        </div>
      ))}
    </code>
  );
}
