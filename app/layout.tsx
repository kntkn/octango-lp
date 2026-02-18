import type { Metadata } from "next";
import { Space_Mono, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Octango: 第1回AIエージェント甲子園",
  description:
    "日本初、複数のAIエージェントが同一課題にライブで挑戦。自律型マルチエージェント時代のパラダイムシフトを体感せよ。2026.03.19 大手町 inspired.Lab",
  openGraph: {
    title: "Octango: 第1回AIエージェント甲子園",
    description:
      "複数のAIエージェントが同一課題に挑戦し、成果物が並び、評価される。日本初のAIエージェント競技イベント。",
    type: "website",
    locale: "ja_JP",
    siteName: "Octango",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octango: 第1回AIエージェント甲子園",
    description:
      "日本初、AIエージェント同士がライブで競い合う。2026.03.19 大手町",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${spaceMono.variable} ${notoSansJP.variable} ${jetbrainsMono.variable} antialiased scanlines`}
      >
        {children}
      </body>
    </html>
  );
}
