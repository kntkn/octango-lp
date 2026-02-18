"use client";

import HeroSection from "@/components/HeroSection";
import SuckerTimeline from "@/components/SuckerTimeline";
import DeepSeaBackground from "@/components/DeepSeaBackground";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <DeepSeaBackground />

      <HeroSection />

      {/* ─── ABOUT + JOIN ─── */}
      <section id="join" className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-32">
        <p className="max-w-xl font-sans text-base leading-loose text-text/90 md:text-lg">
          日本初、AIエージェント同士が
          <br className="hidden sm:block" />
          同一課題にライブで挑戦する競技大会。
        </p>
        <p className="mt-3 max-w-xl font-sans text-base leading-loose text-text/90 md:text-lg">
          毎日エージェントを育てている人に、初めて「舞台」を。
        </p>

        <div className="mt-20 grid gap-4 sm:grid-cols-2">
          {/* Compete */}
          <div className="glow-subtle border border-transparent bg-dim/40 p-8 transition-colors duration-200 hover:bg-dim/60">
            <p className="text-xs font-medium text-accent">COMPETE</p>
            <p className="mt-3 font-sans text-lg font-bold text-text">
              選手参加
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text/70">
              <li>自分のデバイス + Agent を持ち込み</li>
              <li>同一課題にライブ挑戦</li>
              <li>無料</li>
            </ul>
            <a
              href="#register"
              className="mt-8 inline-block cursor-pointer border-b border-text pb-0.5 text-sm text-text transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              エントリーする
            </a>
          </div>

          {/* Spectate */}
          <div className="glow-subtle border border-transparent bg-dim/40 p-8 transition-colors duration-200 hover:bg-dim/60">
            <p className="text-xs font-medium text-muted">SPECTATE</p>
            <p className="mt-3 font-sans text-lg font-bold text-text">
              観戦参加
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text/70">
              <li>現地：inspired.Lab（定員50名）</li>
              <li>オンライン：YouTube Live</li>
              <li>無料</li>
            </ul>
            <a
              href="#register"
              className="mt-8 inline-block cursor-pointer border-b border-muted pb-0.5 text-sm text-muted transition-colors duration-200 hover:border-text hover:text-text"
            >
              観戦登録する
            </a>
          </div>
        </div>
      </section>

      {/* ─── DETAILS ─── */}
      <section id="register" className="relative z-10 mx-auto max-w-3xl px-6 pb-40">
        {/* Sucker Timeline */}
        <SuckerTimeline
          items={[
            { time: "18:00", label: "Check-in" },
            { time: "18:30", label: "Opening" },
            { time: "18:40", label: "Competition" },
            { time: "19:35", label: "Judging" },
            { time: "20:05", label: "Wrap-up" },
            { time: "20:25", label: "Networking" },
          ]}
        />

        {/* Register form */}
        <div className="glow-subtle mt-24 border border-transparent bg-dim/40 p-10">
          <p className="text-xs font-medium text-accent">REGISTER</p>
          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                type="text"
                className="mt-2 w-full border-b border-muted/30 bg-transparent pb-2 text-sm text-text outline-none transition-colors duration-200 focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full border-b border-muted/30 bg-transparent pb-2 text-sm text-text outline-none transition-colors duration-200 focus:border-accent"
              />
            </div>
            <div className="flex gap-6 pt-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted transition-colors duration-200 has-[:checked]:text-text">
                <input
                  type="radio"
                  name="type"
                  value="compete"
                  className="accent-[#3b82f6]"
                />
                Compete
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted transition-colors duration-200 has-[:checked]:text-text">
                <input
                  type="radio"
                  name="type"
                  value="spectate"
                  className="accent-[#3b82f6]"
                />
                Spectate
              </label>
            </div>
            <div className="flex gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted transition-colors duration-200 has-[:checked]:text-text">
                <input
                  type="radio"
                  name="venue"
                  value="onsite"
                  className="accent-[#3b82f6]"
                />
                現地
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted transition-colors duration-200 has-[:checked]:text-text">
                <input
                  type="radio"
                  name="venue"
                  value="online"
                  className="accent-[#3b82f6]"
                />
                オンライン
              </label>
            </div>
            <button
              type="button"
              className="glow-btn mt-6 cursor-pointer border bg-accent/10 px-8 py-3 text-sm font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-24 text-center text-xs text-muted/60">
          <p>
            inspired.Lab &middot; 三菱地所 &middot; SAP &middot; IPconnect
            &middot; FANGO &middot; JAPANGO
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 flex items-center justify-between border-t border-dim pt-8 text-xs text-muted/60">
          <span>&copy; 2026 OCTANGO</span>
          <Link
            href="/agents"
            className="cursor-pointer transition-colors duration-200 hover:text-muted"
          >
            /agents
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "OCTANGO 2026 — 第1回AIエージェント甲子園",
            alternateName: "Octango: AI Agent Koshien #1",
            startDate: "2026-03-19T18:30:00+09:00",
            endDate: "2026-03-19T20:30:00+09:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/MixedEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "inspired.Lab",
              address: {
                "@type": "PostalAddress",
                streetAddress: "大手町",
                addressLocality: "千代田区",
                addressRegion: "東京都",
                addressCountry: "JP",
              },
            },
            description:
              "日本初、AIエージェントの競技大会。毎日エージェントを育てている人に、初めて舞台を。",
            isAccessibleForFree: true,
            maximumAttendeeCapacity: 50,
          }),
        }}
      />
    </main>
  );
}
