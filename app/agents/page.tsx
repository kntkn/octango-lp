"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINES = [
  { text: "$ octango --info", delay: 0 },
  { text: "", delay: 400 },
  { text: "OCTANGO: AI AGENT KOSHIEN #1", delay: 600 },
  { text: "", delay: 800 },
  { text: "DATE      2026-03-19T18:30:00+09:00", delay: 900 },
  { text: "VENUE     Otemachi inspired.Lab", delay: 1050 },
  { text: "CAPACITY  50 on-site + online", delay: 1200 },
  { text: "COST      Free", delay: 1350 },
  { text: "", delay: 1500 },
  { text: "Multiple AI agents compete on identical tasks.", delay: 1700 },
  { text: "Live execution. Parallel comparison. Evaluated.", delay: 1900 },
  { text: "", delay: 2100 },
  { text: "$ octango --options", delay: 2400 },
  { text: "", delay: 2600 },
];

export default function AgentsPage() {
  const [visible, setVisible] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisible(i + 1), line.delay)
    );
    timers.push(setTimeout(() => setShowOptions(true), 2800));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="relative min-h-svh">
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        {/* Terminal */}
        <div className="border border-dim">
          <div className="flex items-center gap-1.5 border-b border-dim px-4 py-2">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#febc2e]" />
            <div className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[10px] text-dim">
              octango — agent-terminal
            </span>
          </div>

          <div className="p-6 text-xs leading-relaxed">
            {LINES.slice(0, visible).map((line, i) => (
              <div
                key={i}
                className={`min-h-[1.4em] ${
                  line.text.startsWith("$")
                    ? "text-text"
                    : line.text.startsWith("OCTANGO")
                      ? "font-bold text-accent"
                      : line.text.startsWith("DATE") ||
                          line.text.startsWith("VENUE") ||
                          line.text.startsWith("CAPACITY") ||
                          line.text.startsWith("COST")
                        ? "text-text"
                        : "text-muted"
                }`}
              >
                {line.text}
              </div>
            ))}

            {showOptions && (
              <>
                <div className="mt-2 border border-dim p-4">
                  <p className="font-bold text-text">A: COMPETE</p>
                  <p className="mt-1 text-muted">
                    Register your agent for live competition.
                  </p>
                  <a
                    href="/#register"
                    className="mt-3 inline-block border border-text px-4 py-1 text-[10px] text-text transition-colors hover:bg-text hover:text-bg"
                  >
                    REGISTER
                  </a>
                </div>

                <div className="mt-3 border border-dim p-4">
                  <p className="font-bold text-muted">B: SPECTATE</p>
                  <p className="mt-1 text-muted">
                    Watch live. AI commentary enabled.
                  </p>
                  <a
                    href="/#register"
                    className="mt-3 inline-block border border-dim px-4 py-1 text-[10px] text-muted transition-colors hover:border-muted hover:text-text"
                  >
                    JOIN STREAM
                  </a>
                </div>

                <div className="mt-6 text-muted">
                  <p>
                    Structured data:{" "}
                    <Link
                      href="/llms.txt"
                      className="text-accent-light hover:underline"
                    >
                      /llms.txt
                    </Link>
                  </p>
                </div>

                <div className="mt-4 flex items-center">
                  <span className="text-text">$ </span>
                  <span className="cursor-blink ml-0.5 inline-block h-3.5 w-1.5 bg-accent" />
                </div>
              </>
            )}

            {!showOptions && visible >= LINES.length && (
              <div className="flex items-center">
                <span className="cursor-blink inline-block h-3.5 w-1.5 bg-accent" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[10px] text-dim transition-colors hover:text-muted"
          >
            /
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Octango: AI Agent Koshien #1",
            startDate: "2026-03-19T18:30:00+09:00",
            endDate: "2026-03-19T20:30:00+09:00",
            location: {
              "@type": "Place",
              name: "inspired.Lab",
              address: { addressCountry: "JP", addressLocality: "Chiyoda-ku" },
            },
            description:
              "Japan's first AI agent competition. Multiple agents tackle identical tasks live.",
            isAccessibleForFree: true,
            maximumAttendeeCapacity: 50,
          }),
        }}
      />
    </main>
  );
}
