import MatrixRain from "@/components/MatrixRain";
import GlitchText from "@/components/GlitchText";
import OctangoLogo from "@/components/OctangoLogo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <MatrixRain />

      {/* ─── HERO ─── */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <OctangoLogo className="mb-8 h-40 w-40 md:h-52 md:w-52" />

        <p className="mb-4 font-mono text-sm tracking-[0.3em] text-primary opacity-80">
          OCTANGO PRESENTS
        </p>

        <GlitchText
          text="第1回 AIエージェント甲子園"
          className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
        />

        <p className="mx-auto mb-8 max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
          「人間がソフトウェアを操作する時代」は終わる。
          <br />
          <span className="text-text-primary">
            自律型エージェントが組織的にタスクを完遂する時代
          </span>
          への、パラダイムシフトを目撃せよ。
        </p>

        <div className="mb-12 flex items-center gap-3 font-mono text-sm">
          <span className="text-accent">2026.03.19</span>
          <span className="text-text-secondary">THU</span>
          <span className="text-text-secondary">18:30–20:30</span>
          <span className="hidden text-border md:inline">|</span>
          <span className="hidden text-text-secondary md:inline">
            大手町 inspired.Lab
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#register"
            className="group relative overflow-hidden rounded-sm bg-accent px-8 py-3 font-mono text-sm font-bold text-base transition-all hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]"
          >
            <span className="relative z-10">選手として出場する</span>
            <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform group-hover:translate-x-0" />
          </a>
          <a
            href="#register"
            className="rounded-sm border border-border px-8 py-3 font-mono text-sm text-text-secondary transition-all hover:border-text-secondary hover:text-text-primary"
          >
            観戦チケット（無料）
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-xs text-text-secondary">SCROLL</span>
          <div className="h-8 w-px animate-pulse bg-primary" />
        </div>
      </section>

      {/* ─── WHAT IS THIS ─── */}
      <section className="relative z-10 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="bracket-header mb-4 text-center font-mono text-xs tracking-[0.3em] text-primary">
            WHAT_IS_THIS
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-text-secondary md:text-xl">
            複数のAIエージェントが
            <span className="text-text-primary">同一課題にライブで挑戦</span>
            し、成果物が並び、評価される。
            <br className="hidden md:block" />
            日本初の
            <span className="text-primary glow-green">
              AIエージェント競技イベント
            </span>
            。
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "MAS_WITNESS",
                title: "マルチエージェントの目撃",
                desc: "複数のエージェントが自律的に役割を分担し、組織として連携しながら課題を解決していくプロセスを公開",
              },
              {
                label: "OPS_KNOWLEDGE",
                title: "運用知の可視化",
                desc: "エージェントをどう育てるか、どう権限を与えるか、失敗時にどう監査するか。社会実装に不可欠な知見を共有",
              },
              {
                label: "LIVE_COMPETITION",
                title: "ライブ競技",
                desc: "事前に用意されたデモではなく、その場で与えられる実務課題にエージェントがどう立ち向かうかをライブで観戦",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group rounded-sm border border-border bg-surface/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface"
              >
                <p className="mb-3 font-code text-xs text-primary opacity-60">
                  {">"} {item.label}
                </p>
                <h3 className="mb-3 font-mono text-lg font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTICIPATION ─── */}
      <section className="relative z-10 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="bracket-header mb-16 text-center font-mono text-xs tracking-[0.3em] text-primary">
            HOW_TO_JOIN
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Compete card */}
            <div className="relative overflow-hidden rounded-sm border border-accent/30 bg-surface/50 p-8 backdrop-blur-sm">
              <div className="absolute right-0 top-0 bg-accent/10 px-4 py-1 font-code text-xs text-accent">
                COMPETE
              </div>
              <p className="mb-2 font-code text-xs text-accent">
                {"$"} octango join --type=player
              </p>
              <h3 className="mb-4 text-2xl font-bold">選手参加</h3>
              <ul className="mb-6 space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">{">"}</span>
                  <span>
                    Mac Mini等のデバイスを持参し、自分のAIエージェント運用で課題に挑戦
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">{">"}</span>
                  <span>
                    成功も失敗も可視化。判断プロセス・監査ログが評価される
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">{">"}</span>
                  <span>参加費無料</span>
                </li>
              </ul>
              <a
                href="#register"
                className="inline-block rounded-sm bg-accent px-6 py-2.5 font-mono text-sm font-bold text-base transition-all hover:shadow-[0_0_20px_rgba(255,107,53,0.3)]"
              >
                エントリーする →
              </a>
            </div>

            {/* Spectate card */}
            <div className="relative overflow-hidden rounded-sm border border-secondary/20 bg-surface/50 p-8 backdrop-blur-sm">
              <div className="absolute right-0 top-0 bg-secondary/10 px-4 py-1 font-code text-xs text-secondary">
                SPECTATE
              </div>
              <p className="mb-2 font-code text-xs text-secondary">
                {"$"} octango join --type=spectator
              </p>
              <h3 className="mb-4 text-2xl font-bold">観戦参加</h3>
              <ul className="mb-6 space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-secondary">{">"}</span>
                  <span>
                    現地観戦：大手町 inspired.Lab カフェラウンジ（定員20-50名）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-secondary">{">"}</span>
                  <span>
                    オンライン視聴：YouTube Live＋Discord実況
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-secondary">{">"}</span>
                  <span>参加費無料</span>
                </li>
              </ul>
              <a
                href="#register"
                className="inline-block rounded-sm border border-secondary/40 px-6 py-2.5 font-mono text-sm text-secondary transition-all hover:bg-secondary/10"
              >
                観戦登録する →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="relative z-10 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="bracket-header mb-16 text-center font-mono text-xs tracking-[0.3em] text-primary">
            TIMELINE
          </h2>

          <div className="relative space-y-0 border-l border-border pl-8">
            {[
              {
                time: "18:00",
                label: "CHECKIN",
                desc: "受付開始",
                active: false,
              },
              {
                time: "18:30",
                label: "OPENING",
                desc: "オープニング — 背景・目的・ルール・選手宣誓",
                active: false,
              },
              {
                time: "18:40",
                label: "COMPETITION_START",
                desc: "AIエージェント甲子園 — 複数エージェントが同一課題に並列挑戦",
                active: true,
              },
              {
                time: "19:35",
                label: "JUDGING",
                desc: "判定・講評 + 参加者投票 + 運用Tips共有",
                active: false,
              },
              {
                time: "20:05",
                label: "WRAP_UP",
                desc: "まとめ — 運用パターン・監査要件・次アクション",
                active: false,
              },
              {
                time: "20:25",
                label: "NETWORKING",
                desc: "クロージング・ご歓談",
                active: false,
              },
            ].map((item) => (
              <div key={item.label} className="relative pb-8">
                <div
                  className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
                    item.active
                      ? "border-accent bg-accent shadow-[0_0_10px_rgba(255,107,53,0.5)]"
                      : "border-primary/40 bg-base"
                  }`}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-code text-sm text-accent">
                    {item.time}
                  </span>
                  <span className="font-mono text-xs text-primary opacity-60">
                    {item.label}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGISTER ─── */}
      <section id="register" className="relative z-10 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="bracket-header mb-4 text-center font-mono text-xs tracking-[0.3em] text-primary">
            REGISTER
          </h2>
          <p className="mb-12 text-center text-text-secondary">
            参加登録はこちらから
          </p>

          <div className="space-y-6 rounded-sm border border-border bg-surface/50 p-8 backdrop-blur-sm">
            <div>
              <label className="mb-2 block font-code text-xs text-primary">
                NAME
              </label>
              <input
                type="text"
                placeholder="名前"
                className="w-full rounded-sm border border-border bg-base px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block font-code text-xs text-primary">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full rounded-sm border border-border bg-base px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block font-code text-xs text-primary">
                PARTICIPATION_TYPE
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="group cursor-pointer rounded-sm border border-border p-4 transition-all hover:border-accent/40 has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                  <input
                    type="radio"
                    name="type"
                    value="compete"
                    className="sr-only"
                  />
                  <p className="font-mono text-sm font-bold text-accent">
                    COMPETE
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">選手参加</p>
                </label>
                <label className="group cursor-pointer rounded-sm border border-border p-4 transition-all hover:border-secondary/40 has-[:checked]:border-secondary has-[:checked]:bg-secondary/5">
                  <input
                    type="radio"
                    name="type"
                    value="spectate"
                    className="sr-only"
                  />
                  <p className="font-mono text-sm font-bold text-secondary">
                    SPECTATE
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">観戦参加</p>
                </label>
              </div>
            </div>
            <div>
              <label className="mb-2 block font-code text-xs text-primary">
                VENUE_PREFERENCE
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="group cursor-pointer rounded-sm border border-border p-4 transition-all hover:border-primary/30 has-[:checked]:border-primary/60 has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="venue"
                    value="onsite"
                    className="sr-only"
                  />
                  <p className="font-mono text-sm font-bold">現地参加</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    大手町 inspired.Lab
                  </p>
                </label>
                <label className="group cursor-pointer rounded-sm border border-border p-4 transition-all hover:border-primary/30 has-[:checked]:border-primary/60 has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="venue"
                    value="online"
                    className="sr-only"
                  />
                  <p className="font-mono text-sm font-bold">オンライン</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    YouTube Live
                  </p>
                </label>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-sm bg-accent py-3 font-mono text-sm font-bold text-base transition-all hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]"
            >
              {">"} SUBMIT_REGISTRATION
            </button>
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <section className="relative z-10 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="bracket-header mb-12 text-center font-mono text-xs tracking-[0.3em] text-primary">
            PARTNERS
          </h2>

          <div className="mb-8">
            <p className="mb-4 text-center font-code text-xs text-text-secondary">
              {"// co-hosts"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {["Inspired.Lab", "三菱地所", "SAP"].map((name) => (
                <span
                  key={name}
                  className="font-mono text-lg text-text-secondary/60 transition-colors hover:text-text-primary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-center font-code text-xs text-text-secondary">
              {"// participants"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {["IPconnect", "FANGO", "JAPANGO"].map((name) => (
                <span
                  key={name}
                  className="font-mono text-base text-text-secondary/40 transition-colors hover:text-text-secondary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-border px-4 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <p className="font-code text-xs text-text-secondary/40">
            {"// AIも視聴します。AIエージェントによる実況・解説・評価補助を予定。"}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/agents"
              className="font-code text-xs text-secondary/60 transition-colors hover:text-secondary"
            >
              {">"} /agents — AIエージェント向けページ
            </Link>
          </div>
          <p className="font-code text-xs text-text-secondary/30">
            &copy; 2026 Octango. Built for the age of autonomous agents.
          </p>
        </div>
      </footer>

      {/* Schema.org Event JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "第1回AIエージェント甲子園",
            alternateName: "Octango: AI Agent Koshien #1",
            startDate: "2026-03-19T18:30:00+09:00",
            endDate: "2026-03-19T20:30:00+09:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/MixedEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "inspired.Lab カフェラウンジ",
              address: {
                "@type": "PostalAddress",
                addressLocality: "千代田区",
                addressRegion: "東京都",
                streetAddress: "大手町",
                addressCountry: "JP",
              },
            },
            description:
              "日本初、複数のAIエージェントが同一課題にライブで挑戦し、成果物が並び、評価される競技イベント。",
            organizer: {
              "@type": "Organization",
              name: "Octango",
            },
            isAccessibleForFree: true,
            maximumAttendeeCapacity: 50,
          }),
        }}
      />
    </main>
  );
}
