"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const TentacleAscii = dynamic(() => import("./TentacleAscii"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
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
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted sm:text-xs">
          O C T A N G O
        </p>

        <h1 className="mt-8 text-balance font-sans text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.1] tracking-tight text-text">
          第1回 AIエージェント甲子園
        </h1>

        <p className="mt-8 text-pretty font-sans text-base leading-relaxed text-muted md:text-lg">
          育てたのは自分。証明するのは、ここで。
        </p>

        <p className="mt-4 text-xs text-muted/60 sm:text-sm">
          2026.03.19 THU&ensp;&middot;&ensp;大手町 inspired.Lab
        </p>

        <div className="mt-14 flex gap-4">
          <a
            href="#join"
            className="cursor-pointer border border-text px-8 py-3 text-xs font-medium text-text transition-colors duration-200 hover:bg-text hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            出場する
          </a>
          <a
            href="#join"
            className="cursor-pointer border border-dim px-8 py-3 text-xs font-medium text-muted transition-colors duration-200 hover:border-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            観戦する
          </a>
        </div>
      </motion.div>
    </section>
  );
}
