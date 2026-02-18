"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const AmbientParticles = dynamic(() => import("./AmbientParticles"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center justify-center px-6">
      <AmbientParticles />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-xs tracking-[0.5em] text-muted sm:text-sm">
          O C T A N G O
        </h1>

        <p className="mt-6 text-balance font-sans text-2xl font-bold text-text sm:text-3xl md:text-4xl lg:text-5xl">
          第1回 AIエージェント甲子園
        </p>

        <p className="mt-6 text-pretty font-sans text-sm text-muted md:text-base">
          育てたのは自分。証明するのは、ここで。
        </p>

        <p className="mt-4 text-[10px] tracking-widest text-dim sm:text-xs">
          2026.03.19 THU&ensp;&middot;&ensp;大手町 inspired.Lab
        </p>

        <div className="mt-12 flex gap-4">
          <a
            href="#join"
            className="border border-text px-6 py-2.5 text-xs text-text transition-colors hover:bg-text hover:text-bg"
          >
            出場する
          </a>
          <a
            href="#join"
            className="border border-dim px-6 py-2.5 text-xs text-muted transition-colors hover:border-muted hover:text-text"
          >
            観戦する
          </a>
        </div>
      </motion.div>
    </section>
  );
}
