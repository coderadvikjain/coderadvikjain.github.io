import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advik Jain | Portfolio", // <--- CHANGE THIS
  description: "Full-Stack Developer & AI Enthusiast", // <--- AND THIS
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}