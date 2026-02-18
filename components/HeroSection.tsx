"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const TentacleAscii = dynamic(() => import("./TentacleAscii"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-end justify-center overflow-hidden px-6 pb-[12vh] sm:items-center sm:pb-0 sm:pt-[6vh]">
      {/* Radial glow behind text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(900px, 80vw)",
          height: "min(700px, 70vh)",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <TentacleAscii />

      <motion.div
        className="relative z-10 flex max-w-5xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1
          className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.95] tracking-[0.06em] text-text"
          style={{
            textShadow:
              "0 0 40px rgba(59,130,246,0.12), 0 0 80px rgba(59,130,246,0.04)",
          }}
        >
          OCTANGO
          <br className="sm:hidden" />
          <span className="text-[0.38em] font-bold tracking-[0.25em] text-accent-light sm:ml-[0.15em] sm:text-[0.4em] sm:tracking-[0.12em] sm:align-[0.15em]">
            2026
          </span>
        </h1>

        <p className="mt-5 font-sans text-[clamp(0.8rem,2vw,1.15rem)] font-medium tracking-wide text-muted">
          第1回 AIエージェント甲子園
        </p>

        <p className="mt-8 text-[clamp(0.85rem,2.5vw,1.1rem)] tracking-[0.15em] text-text">
          2026.03.19 THU&ensp;&middot;&ensp;東京 大手町
        </p>

        <div className="mt-14 flex gap-5">
          <a
            href="#join"
            className="glow-btn cursor-pointer border px-8 py-3 text-xs font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            出場する
          </a>
          <a
            href="#join"
            className="glow-btn cursor-pointer border px-8 py-3 text-xs font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            観戦する
          </a>
        </div>
      </motion.div>
    </section>
  );
}
