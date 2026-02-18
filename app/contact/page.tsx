"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="relative min-h-svh">
      <div className="mx-auto max-w-xl px-6 pt-24 pb-32">
        {/* Back link */}
        <Link
          href="/"
          className="text-xs text-muted transition-colors duration-200 hover:text-text"
        >
          &larr; トップに戻る
        </Link>

        <h1 className="mt-10 font-display text-2xl font-bold text-text sm:text-3xl">
          お問い合わせ
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-text/60">
          Mac Miniをお持ちでない方の出場相談、その他ご質問はこちらから。
        </p>

        {sent ? (
          <div className="mt-12 border border-cta/30 bg-cta/5 p-8">
            <p className="font-sans text-base font-bold text-text">
              送信しました
            </p>
            <p className="mt-2 font-sans text-sm text-text/60">
              ご連絡ありがとうございます。折り返しご連絡いたします。
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm text-cta transition-colors duration-200 hover:text-cta-light"
            >
              トップに戻る &rarr;
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-10 space-y-8"
          >
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-2 w-full border-b border-muted/30 bg-transparent pb-2 text-sm text-text outline-none transition-colors duration-200 focus:border-cta"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-2 w-full border-b border-muted/30 bg-transparent pb-2 text-sm text-text outline-none transition-colors duration-200 focus:border-cta"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                rows={4}
                className="mt-2 w-full resize-none border-b border-muted/30 bg-transparent pb-2 text-sm leading-relaxed text-text outline-none transition-colors duration-200 focus:border-cta"
                placeholder="Mac Miniの貸出について相談したい、など"
              />
            </div>

            <button
              type="submit"
              className="glow-cta cursor-pointer border bg-cta/10 px-10 py-3.5 text-sm font-bold tracking-wide text-cta-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
            >
              送信する
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-xl px-6 pb-16">
        <div className="flex items-center justify-between border-t border-dim pt-8 text-xs text-muted/60">
          <span>&copy; 2026 OCTANGO</span>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-muted"
          >
            octango.dev
          </Link>
        </div>
      </div>
    </main>
  );
}
