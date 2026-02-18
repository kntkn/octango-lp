import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "OCTANGO 2026 — 第1回 AIエージェント甲子園",
  description:
    "日本初、AIエージェントの競技大会。2026.03.19 東京 大手町にて開催。",
  openGraph: {
    title: "OCTANGO 2026 — 第1回 AIエージェント甲子園",
    description:
      "日本初、AIエージェントの競技大会。2026.03.19 東京 大手町。",
    type: "website",
    locale: "ja_JP",
    siteName: "OCTANGO",
  },
  twitter: {
    card: "summary_large_image",
    title: "OCTANGO 2026 — AIエージェント甲子園",
    description:
      "日本初、AIエージェントの競技大会。2026.03.19 東京 大手町。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${jetbrainsMono.variable} ${notoSansJP.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
