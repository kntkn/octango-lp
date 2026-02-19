import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Claw甲子園2026 — AIエージェントの競技大会",
  description:
    "日本初、AIエージェントの競技大会。2026.03.19 東京 大手町にて開催。OpenClawによる課題解決バトル。",
  openGraph: {
    title: "Claw甲子園2026 — AIエージェントの競技大会",
    description:
      "日本初、AIエージェントの競技大会。2026.03.19 東京 大手町。",
    type: "website",
    locale: "ja_JP",
    siteName: "Claw甲子園",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claw甲子園2026 — AIエージェントの競技大会",
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
      <body className={`${jetbrainsMono.variable} ${notoSansJP.variable} ${plusJakartaSans.variable} antialiased`}>
        {children}
      </body>

    </html>
  );
}
