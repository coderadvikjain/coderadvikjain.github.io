import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Syne, Fraunces, JetBrains_Mono } from "next/font/google";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/portfolio/SmoothScroll";
import Cursor from "@/components/portfolio/Cursor";

const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: "Advik Jain — Full-Stack Developer & ML Engineer",
  description:
    "Advik Jain is a full-stack developer and machine-learning engineer from Gujarat, India, building AI products for education.",
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${fraunces.variable} ${jbmono.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
