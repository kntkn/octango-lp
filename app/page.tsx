"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SuckerTimeline from "@/components/SuckerTimeline";
import DeepSeaBackground from "@/components/DeepSeaBackground";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [role, setRole] = useState<"compete" | "spectate" | null>(null);

  return (
    <main className="relative">
      <DeepSeaBackground />

      <HeroSection />

      {/* ─── OCTANGOとは？ ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-20">
        <p className="text-xs font-medium tracking-[0.3em] text-accent">
          ABOUT
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
          OCTANGOとは？
        </h2>

        <p className="mt-8 max-w-xl font-sans text-base leading-loose text-text/90 md:text-lg">
          日々育てている自分だけのAIを使って、
          <br className="hidden sm:block" />
          難題に取り組む——エージェントによる、エージェントのためのバトル。
        </p>
        <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-text/50">
          当日の主役はAIエージェントであり、人間じゃない。
        </p>
        <p className="mt-6 max-w-xl font-sans text-base leading-loose text-accent-light/80 md:text-lg">
          さぁ、あなたも時代の目撃者に。
        </p>

        {/* Visual — 3 concept blocks */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "⌘",
              label: "Your Agent",
              desc: "自分のAIエージェントを持ち込む",
            },
            {
              icon: "⚡",
              label: "Live Challenge",
              desc: "全員同時に同じ課題へ挑戦",
            },
            {
              icon: "◎",
              label: "Prove It",
              desc: "実力を、ライブで証明する",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group border border-dim/60 bg-dim/20 p-6 text-center transition-colors duration-300 hover:border-accent/20 hover:bg-dim/40"
            >
              <span className="text-2xl text-accent">{item.icon}</span>
              <p className="mt-3 text-xs font-medium tracking-widest text-accent/70">
                {item.label}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-text/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 出場方法 ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-20">
        <p className="text-xs font-medium tracking-[0.3em] text-accent">
          HOW TO ENTER
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
          出場方法
        </h2>

        {/* 3 steps */}
        <div className="mt-12 space-y-0">
          {[
            {
              num: "01",
              title: "エントリーする",
              desc: "下のフォームから参加登録。30秒で完了。",
            },
            {
              num: "02",
              title: "案内を受け取る",
              desc: "当日までの詳細とルールをメールでお届け。",
            },
            {
              num: "03",
              title: "Mac Miniを持ち込む",
              desc: "当日、自分のデバイスとエージェントで参戦。",
            },
          ].map((step, i) => (
            <div key={step.num} className="flex gap-6 py-6">
              {/* Step number + connector */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-cta/30 text-sm font-bold text-cta">
                  {step.num}
                </div>
                {i < 2 && (
                  <div className="mt-1 h-full w-px bg-gradient-to-b from-cta/20 to-transparent" />
                )}
              </div>

              <div className="pb-2">
                <p className="font-sans text-base font-bold text-text">
                  {step.title}
                </p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-text/60">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mac Mini inquiry */}
        <div className="mt-8 border border-dim/60 bg-dim/20 px-6 py-5">
          <p className="font-sans text-sm text-text/70">
            <span className="text-accent">*</span>{" "}
            Mac Miniをお持ちでない方も参加可能です。
            <Link
              href="/contact"
              className="ml-1 border-b border-accent/30 text-accent transition-colors duration-200 hover:border-accent hover:text-accent-light"
            >
              こちらからお問い合わせください
            </Link>
          </p>
        </div>
      </section>

      {/* ─── 目撃せよ。 ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-20">
        <p className="text-xs font-medium tracking-[0.3em] text-accent">
          SPECTATE
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
          目撃せよ。
        </h2>

        <p className="mt-8 max-w-xl font-sans text-base leading-loose text-text/90 md:text-lg">
          AIエージェントがリアルタイムで難題を解く瞬間を、
          <br className="hidden sm:block" />
          現地またはオンラインで体感。
        </p>

        {/* Benefits grid */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "🏢",
              title: "inspired.Lab（大手町）",
              desc: "パブリックビューイング形式で観戦。定員50名。",
            },
            {
              icon: "📡",
              title: "YouTube Live配信",
              desc: "どこからでもリアルタイムで視聴可能。",
            },
            {
              icon: "🍷",
              title: "フード＆ドリンク",
              desc: "お酒・軽食を楽しみながらの観戦体験。",
            },
            {
              icon: "🧠",
              title: "最前線を学ぶ",
              desc: "AIエージェント活用の最新事例をライブで目撃。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 border border-dim/40 bg-dim/15 p-5 transition-colors duration-200 hover:bg-dim/30"
            >
              <span className="mt-0.5 text-lg">{item.icon}</span>
              <div>
                <p className="font-sans text-sm font-bold text-text">
                  {item.title}
                </p>
                <p className="mt-1 font-sans text-xs leading-relaxed text-text/60">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FREE emphasis */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cta/30 to-transparent" />
          <p className="text-sm font-bold tracking-[0.2em] text-cta">
            参加無料
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cta/30 to-transparent" />
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-20">
        <p className="text-xs font-medium tracking-[0.3em] text-accent">
          TIMELINE
        </p>
        <h2 className="mt-3 mb-12 font-display text-2xl font-bold text-text sm:text-3xl">
          当日の流れ
        </h2>

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
      </section>

      {/* ─── VENUE ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-20">
        <p className="text-xs font-medium tracking-[0.3em] text-accent">
          VENUE
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
          会場
        </h2>

        {/* Venue photos */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/venue/lounge.jpg"
              alt="inspired.Lab ラウンジ"
              fill
              className="object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/venue/space.jpg"
              alt="inspired.Lab デザインシンキングスペース"
              fill
              className="object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Venue info */}
        <div className="mt-8 space-y-4">
          <div>
            <p className="font-sans text-lg font-bold text-text">
              Inspired.Lab
            </p>
            <p className="mt-1 font-sans text-sm text-text/60">
              三菱地所 &times; SAP Japan
            </p>
          </div>
          <div className="space-y-2 text-sm text-text/70">
            <p>〒100-0004 東京都千代田区大手町1-6-1 大手町ビル 6F</p>
            <p>
              東京メトロ「大手町駅」直結（丸ノ内線・千代田線・半蔵門線・東西線・都営三田線）
            </p>
            <p className="text-text/50">出口 C7 / E2 → 東側エレベーターで6Fへ</p>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="mt-8 overflow-hidden border border-dim/40">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4!2d139.762!3d35.687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0d02590001%3A0x7d1d4fb09cb6e43b!2sInspired.Lab!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
            width="100%"
            height="300"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.7)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Inspired.Lab 地図"
          />
        </div>
      </section>

      {/* ─── REGISTER ─── */}
      <section
        id="register"
        className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-40"
      >
        <p className="text-xs font-medium tracking-[0.3em] text-cta">
          REGISTER
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-text sm:text-3xl">
          参加登録
        </h2>

        {/* Role selection — futuristic card toggle */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            className="select-card p-6 text-left"
            data-active={role === "compete"}
            onClick={() => setRole("compete")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-cta/70">
                COMPETE
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center border text-xs transition-all duration-300 ${
                  role === "compete"
                    ? "border-cta bg-cta/20 text-cta"
                    : "border-muted/30 text-transparent"
                }`}
              >
                ✓
              </span>
            </div>
            <p className="mt-3 font-sans text-lg font-bold text-text">
              選手として出場
            </p>
            <p className="mt-2 font-sans text-xs leading-relaxed text-text/50">
              自分のAIエージェントで参戦する
            </p>
          </button>

          <button
            type="button"
            className="select-card p-6 text-left"
            data-active={role === "spectate"}
            onClick={() => setRole("spectate")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-accent/70">
                SPECTATE
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center border text-xs transition-all duration-300 ${
                  role === "spectate"
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-muted/30 text-transparent"
                }`}
              >
                ✓
              </span>
            </div>
            <p className="mt-3 font-sans text-lg font-bold text-text">
              観戦する
            </p>
            <p className="mt-2 font-sans text-xs leading-relaxed text-text/50">
              現地またはオンラインで目撃する
            </p>
          </button>
        </div>

        {/* Form fields */}
        <div className="mt-10 space-y-6">
          <div>
            <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
              Name
            </label>
            <input
              type="text"
              className="mt-2 w-full border-b border-muted/30 bg-transparent pb-2 text-sm text-text outline-none transition-colors duration-200 focus:border-cta"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              type="email"
              className="mt-2 w-full border-b border-muted/30 bg-transparent pb-2 text-sm text-text outline-none transition-colors duration-200 focus:border-cta"
            />
          </div>

          <button
            type="button"
            className="glow-cta mt-8 cursor-pointer border bg-cta/10 px-10 py-3.5 text-sm font-bold tracking-wide text-cta-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            登録する
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-16">
        {/* Partners */}
        <div className="text-center text-xs text-muted/60">
          <p>
            inspired.Lab &middot; 三菱地所 &middot; SAP &middot; IPconnect
            &middot; FANGO &middot; JAPANGO
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-dim pt-8 text-xs text-muted/60">
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
