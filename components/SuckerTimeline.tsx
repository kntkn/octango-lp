"use client";

import { useEffect, useRef } from "react";

interface TimelineItem {
  time: string;
  label: string;
}

export default function SuckerTimeline({ items }: { items: TimelineItem[] }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    // Animate suckers on scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("timeline-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={lineRef} className="timeline-container relative">
      {/* ASCII wavy line - vertical */}
      <div className="absolute left-[18px] top-0 bottom-0 w-px sm:left-[22px]">
        <div className="wavy-line h-full" />
      </div>

      <div className="space-y-10">
        {items.map((item, i) => (
          <div
            key={i}
            className="timeline-item group relative flex items-baseline gap-6 pl-1"
            style={{
              animationDelay: `${i * 120}ms`,
            }}
          >
            {/* Sucker symbol */}
            <div className="sucker relative z-10 flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center text-lg sm:h-[46px] sm:w-[46px]">
              <span className="sucker-ring text-accent/60">◉</span>
            </div>

            {/* Content */}
            <div className="flex items-baseline gap-4 pb-1">
              <span className="font-mono text-xs tabular-nums text-accent/70 sm:text-sm">
                {item.time}
              </span>
              <span className="font-sans text-sm text-muted transition-colors duration-300 group-hover:text-text sm:text-base">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .wavy-line {
          background: repeating-linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.15) 0px,
            rgba(59, 130, 246, 0.08) 4px,
            transparent 4px,
            transparent 8px,
            rgba(59, 130, 246, 0.12) 8px,
            rgba(59, 130, 246, 0.06) 12px,
            transparent 12px,
            transparent 16px
          );
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='200'%3E%3Cpath d='M3 0 Q6 25 3 50 Q0 75 3 100 Q6 125 3 150 Q0 175 3 200' stroke='white' fill='none' stroke-width='3'/%3E%3C/svg%3E");
          mask-repeat: repeat-y;
          mask-size: 6px 200px;
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='200'%3E%3Cpath d='M3 0 Q6 25 3 50 Q0 75 3 100 Q6 125 3 150 Q0 175 3 200' stroke='white' fill='none' stroke-width='3'/%3E%3C/svg%3E");
          -webkit-mask-repeat: repeat-y;
          -webkit-mask-size: 6px 200px;
        }

        .sucker-ring {
          display: inline-block;
          animation: sucker-pulse 3s ease-in-out infinite;
          animation-delay: inherit;
        }

        @keyframes sucker-pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
            text-shadow: 0 0 4px rgba(59, 130, 246, 0.1);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
            text-shadow: 0 0 12px rgba(59, 130, 246, 0.3),
              0 0 24px rgba(59, 130, 246, 0.1);
          }
        }

        .timeline-item {
          opacity: 0;
          transform: translateX(-10px);
        }

        .timeline-visible .timeline-item {
          animation: timeline-enter 0.5s ease-out forwards;
        }

        @keyframes timeline-enter {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
