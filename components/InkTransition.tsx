"use client";

import { useEffect, useRef, useState } from "react";

export default function InkTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative z-10 -mt-1 h-[120px] sm:h-[160px]">
      {/* Organic ink drip SVG */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Ink glow filter */}
          <filter id="ink-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.97  0 0 0 0.4 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Turbulence for organic feel */}
          <filter id="ink-turbulence">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed="42"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Main ink body — organic dripping shape */}
        <path
          d="M0,0 L1440,0 L1440,40
             C1380,55 1320,70 1260,65
             C1200,60 1140,80 1080,85
             C1020,90 960,75 900,80
             C840,85 780,95 720,90
             C660,85 600,100 540,95
             C480,90 420,75 360,80
             C300,85 240,70 180,75
             C120,80 60,60 0,55 Z"
          fill="#07070a"
          filter="url(#ink-turbulence)"
        />

        {/* Drip tendrils */}
        {[
          { x: 180, h: 130, delay: 0 },
          { x: 420, h: 145, delay: 0.3 },
          { x: 650, h: 120, delay: 0.6 },
          { x: 880, h: 155, delay: 0.15 },
          { x: 1100, h: 135, delay: 0.45 },
          { x: 1300, h: 110, delay: 0.7 },
        ].map((drip, i) => (
          <g key={i} filter="url(#ink-glow)">
            {/* Drip body */}
            <path
              d={`M${drip.x - 8},${55 + Math.sin(i) * 15}
                  Q${drip.x - 3},${drip.h * 0.6} ${drip.x},${drip.h}
                  Q${drip.x + 3},${drip.h * 0.6} ${drip.x + 8},${55 + Math.sin(i) * 15}`}
              fill="rgba(59,130,246,0.08)"
              className={visible ? "ink-drip-animate" : ""}
              style={{
                animationDelay: `${drip.delay}s`,
                opacity: 0,
              }}
            />
            {/* Drip glow line */}
            <line
              x1={drip.x}
              y1={60 + Math.sin(i) * 10}
              x2={drip.x}
              y2={drip.h - 5}
              stroke="rgba(59,130,246,0.12)"
              strokeWidth="1"
              strokeDasharray="3 6"
              className={visible ? "ink-drip-animate" : ""}
              style={{
                animationDelay: `${drip.delay + 0.1}s`,
                opacity: 0,
              }}
            />
          </g>
        ))}

        {/* Subtle glow along the ink edge */}
        <path
          d="M0,55 C60,60 120,80 180,75 C240,70 300,85 360,80
             C420,75 480,90 540,95 C600,100 660,85 720,90
             C780,95 840,85 900,80 C960,75 1020,90 1080,85
             C1140,80 1200,60 1260,65 C1320,70 1380,55 1440,40"
          fill="none"
          stroke="rgba(59,130,246,0.15)"
          strokeWidth="1.5"
          className={visible ? "ink-edge-glow" : ""}
          style={{ opacity: 0 }}
        />
      </svg>

      <style jsx>{`
        .ink-drip-animate {
          animation: ink-drip-in 1.2s ease-out forwards;
        }

        @keyframes ink-drip-in {
          0% {
            opacity: 0;
            transform: translateY(-10px) scaleY(0.3);
          }
          60% {
            opacity: 1;
            transform: translateY(0) scaleY(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }

        .ink-edge-glow {
          animation: edge-glow-in 2s ease-out 0.2s forwards;
        }

        @keyframes edge-glow-in {
          0% {
            opacity: 0;
            stroke-dasharray: 0 2000;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            stroke-dasharray: 2000 0;
          }
        }
      `}</style>
    </div>
  );
}
