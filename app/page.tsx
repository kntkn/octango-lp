import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* ─── HERO: single viewport, 2-col on desktop ─── */}
      <HeroSection />

      {/* ─── ABOUT + JOIN ─── */}
      <section id="join" className="mx-auto max-w-2xl px-6 py-32">
        <p className="font-sans text-sm leading-relaxed text-muted">
          日本初、AIエージェント同士が同一課題にライブで挑戦する競技大会。
          <br />
          毎日エージェントを育てている人に、初めて「舞台」を。
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {/* Compete */}
          <div className="border border-dim p-6">
            <p className="text-xs text-accent">COMPETE</p>
            <p className="mt-2 font-sans text-sm font-bold text-text">
              選手参加
            </p>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
              <li>自分のデバイス + Agent を持ち込み</li>
              <li>同一課題にライブ挑戦</li>
              <li>無料</li>
            </ul>
            <a
              href="#register"
              className="mt-6 inline-block border-b border-text pb-0.5 text-xs text-text transition-colors hover:border-accent hover:text-accent"
            >
              エントリーする
            </a>
          </div>

          {/* Spectate */}
          <div className="border border-dim p-6">
            <p className="text-xs text-muted">SPECTATE</p>
            <p className="mt-2 font-sans text-sm font-bold text-text">
              観戦参加
            </p>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
              <li>現地：inspired.Lab（定員50名）</li>
              <li>オンライン：YouTube Live</li>
              <li>無料</li>
            </ul>
            <a
              href="#register"
              className="mt-6 inline-block border-b border-muted pb-0.5 text-xs text-muted transition-colors hover:border-text hover:text-text"
            >
              観戦登録する
            </a>
          </div>
        </div>
      </section>

      {/* ─── DETAILS ─── */}
      <section id="register" className="mx-auto max-w-2xl px-6 pb-32">
        {/* Timeline */}
        <div className="space-y-3 text-xs">
          {[
            ["18:00", "Check-in"],
            ["18:30", "Opening"],
            ["18:40", "Competition"],
            ["19:35", "Judging"],
            ["20:05", "Wrap-up"],
            ["20:25", "Networking"],
          ].map(([time, label]) => (
            <div key={time} className="flex gap-6">
              <span className="w-12 text-muted">{time}</span>
              <span className="text-text">{label}</span>
            </div>
          ))}
        </div>

        {/* Register form */}
        <div className="mt-20 border border-dim p-8">
          <p className="text-xs text-accent">REGISTER</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                type="text"
                className="mt-1 w-full border-b border-dim bg-transparent pb-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full border-b border-dim bg-transparent pb-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div className="flex gap-4 pt-2">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted has-[:checked]:text-text">
                <input
                  type="radio"
                  name="type"
                  value="compete"
                  className="accent-[#3b82f6]"
                />
                Compete
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted has-[:checked]:text-text">
                <input
                  type="radio"
                  name="type"
                  value="spectate"
                  className="accent-[#3b82f6]"
                />
                Spectate
              </label>
            </div>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted has-[:checked]:text-text">
                <input
                  type="radio"
                  name="venue"
                  value="onsite"
                  className="accent-[#3b82f6]"
                />
                現地
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted has-[:checked]:text-text">
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
              className="mt-4 border border-text px-6 py-2 text-xs text-text transition-colors hover:bg-text hover:text-bg"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-20 text-center text-xs text-dim">
          <p>
            inspired.Lab &middot; 三菱地所 &middot; SAP &middot; IPconnect
            &middot; FANGO &middot; JAPANGO
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between text-[10px] text-dim">
          <span>&copy; 2026 Octango</span>
          <Link href="/agents" className="transition-colors hover:text-muted">
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
            name: "第1回AIエージェント甲子園",
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
