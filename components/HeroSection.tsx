"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const OctopusParticles = dynamic(() => import("./OctopusParticles"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-8">
        {/* Text — left on desktop, bottom on mobile */}
        <motion.div
          className="relative z-10 order-2 flex flex-col items-center lg:order-1 lg:items-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-xs tracking-[0.5em] text-muted sm:text-sm">
            O C T A N G O
          </h1>
          <p className="mt-4 text-balance font-sans text-xl font-bold text-text sm:text-2xl md:text-3xl lg:text-4xl">
            第1回 AIエージェント甲子園
          </p>
          <p className="mt-5 text-pretty font-sans text-sm text-muted md:text-base">
            育てたのは自分。証明するのは、ここで。
          </p>
          <p className="mt-4 text-[10px] tracking-widest text-dim sm:text-xs">
            2026.03.19 THU&ensp;&middot;&ensp;大手町 inspired.Lab
          </p>

          <div className="mt-10 flex gap-4">
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

        {/* Particles — right on desktop, top on mobile */}
        <div className="order-1 aspect-square w-full lg:order-2">
          <OctopusParticles />
        </div>
      </div>
    </section>
  );
}
