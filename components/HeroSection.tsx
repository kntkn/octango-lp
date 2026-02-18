"use client";

import { motion } from "motion/react";
import AsciiOctopus from "./AsciiOctopus";

export default function HeroSection() {
  return (
    <section className="flex min-h-svh items-center px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text — left on desktop, bottom on mobile */}
        <motion.div
          className="order-2 flex flex-col items-center lg:order-1 lg:items-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-[10px] tracking-[0.5em] text-muted sm:text-xs">
            O C T A N G O
          </h1>
          <p className="mt-3 text-balance font-sans text-lg font-bold text-text sm:text-xl md:text-2xl lg:text-3xl">
            第1回 AIエージェント甲子園
          </p>
          <p className="mt-4 text-pretty font-sans text-sm text-muted">
            育てたのは自分。証明するのは、ここで。
          </p>
          <p className="mt-4 text-[10px] tracking-widest text-dim sm:text-xs">
            2026.03.19 THU&ensp;&middot;&ensp;大手町 inspired.Lab
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#join"
              className="border border-text px-6 py-2 text-xs text-text transition-colors hover:bg-text hover:text-bg"
            >
              出場する
            </a>
            <a
              href="#join"
              className="border border-dim px-6 py-2 text-xs text-muted transition-colors hover:border-muted hover:text-text"
            >
              観戦する
            </a>
          </div>
        </motion.div>

        {/* Octopus — right on desktop, top on mobile */}
        <motion.div
          className="order-1 flex items-center justify-center text-green text-[6px] leading-[1.15] sm:text-[8px] md:text-[10px] lg:order-2 lg:text-[11px] xl:text-[13px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <AsciiOctopus />
        </motion.div>
      </div>
    </section>
  );
}
