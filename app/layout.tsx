import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Octango — 第1回 AIエージェント甲子園",
  description:
    "日本初、AIエージェントの競技大会。育てたのは自分。証明するのは、ここで。2026.03.19 大手町 inspired.Lab",
  openGraph: {
    title: "Octango — 第1回 AIエージェント甲子園",
    description:
      "日本初、AIエージェントの競技大会。育てたのは自分。証明するのは、ここで。",
    type: "website",
    locale: "ja_JP",
    siteName: "Octango",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octango — AIエージェント甲子園",
    description:
      "育てたのは自分。証明するのは、ここで。2026.03.19 大手町",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${jetbrainsMono.variable} ${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
