import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NOVERA OSS | Lost Saga Revival",
    template: "%s | NOVERA OSS",
  },
  description:
    "NOVERA OSS - a revival of the classic Lost Saga action brawler. Fast-paced PvP, guild wars, gashapon, and 20+ playable mercenaries. Download free now!",
  keywords: ["Lost Saga", "NOVERA OSS", "action brawler", "PvP", "mercenary", "fighting game"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
