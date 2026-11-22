"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { RevealText, Magnetic, useProgress } from "./ui";

const pillars = [
  {
    k: "Core architecture",
    v: "Distributed backend systems and predictive ML pipelines — the unseen, high-velocity engine behind modern B2C products.",
  },
  {
    k: "Active build: CogniTutor",
    v: "A personalised AI tutor that turns a learner's goals into structured, adaptive learning paths, so every student gets a teacher that fits them.",
  },
];

export default function Labs() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useProgress(ref);
  const clip = useTransform(scrollYProgress, [0, 0.45], ["circle(6% at 50% 50%)", "circle(75% at 50% 50%)"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.45], [0.6, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.7], [80, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section id="labs" ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-tri text-ink">
          <motion.svg
            style={{ rotate }}
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -right-[20vw] -top-[20vw] h-[70vw] w-[70vw] opacity-20 md:-right-[10vw] md:-top-[15vw] md:h-[50vw] md:w-[50vw]"
            aria-hidden
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1="100" y1="100" x2="100" y2="2" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 15} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="0.4" />
          </motion.svg>

          <div className="relative flex h-full flex-col justify-between px-4 py-24 md:px-10 md:py-28">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
              <span className="flex items-center gap-3">
                <span className="text-ink">(05)</span>
                <span className="h-px w-10 bg-ink/40" />
                R&amp;D Division
              </span>
              <span className="hidden sm:inline">Est. by Advik</span>
            </div>

            <motion.h2
              style={{ scale: titleScale }}
              className="origin-left font-display text-[10.5vw] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] md:text-[10.5vw]"
            >
              CorrZen
              <span className="block font-serif font-normal normal-case italic tracking-tight">Labs</span>
            </motion.h2>

            <motion.div style={{ y: contentY, opacity: contentOpacity }} className="grid gap-8 md:grid-cols-12 md:items-end">
              <p className="text-lg font-medium leading-snug md:col-span-5 md:text-2xl">
                An independent research &amp; development ecosystem — where complex backend engineering meets futuristic digital design.
              </p>
              <div className="grid gap-6 md:col-span-5 md:col-start-7 md:grid-cols-2">
                {pillars.map((p) => (
                  <div key={p.k} className="border-t border-ink/30 pt-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">{p.k}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{p.v}</p>
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 md:text-right">
                <Magnetic>
                  <a
                    href="https://corrzenlabs.vercel.app/connect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-28 w-28 items-center justify-center rounded-full bg-ink text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper transition-transform duration-500 hover:scale-110 md:h-36 md:w-36"
                  >
                    Connect
                    <br />
                    to labs ↗
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          <RevealText text="Enter the lab ↓" />
        </motion.p>
      </div>
    </section>
  );
}

