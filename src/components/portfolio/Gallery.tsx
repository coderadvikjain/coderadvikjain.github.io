"use client";

import { useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { SectionLabel, useProgress } from "./ui";

const frames = [
  { src: "/gallery1.png", speed: -120, cap: "Frame 01" },
  { src: "/gallery2.png", speed: 80, cap: "Frame 02" },
  { src: "/gallery3.jpg", speed: -60, cap: "Frame 03" },
  { src: "/gallery4.jpg", speed: 140, cap: "Frame 04" },
];

function Frame({ f, i, progress }: { f: (typeof frames)[number]; i: number; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [-f.speed, f.speed]);
  return (
    <motion.figure style={{ y }} className={`group relative ${i % 2 ? "mt-24 md:mt-40" : ""}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]" data-cursor="Look">
        <img
          src={f.src}
          alt={f.cap}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        <span>{f.cap}</span>
        <span>IN</span>
      </figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useProgress(ref, [0, 1], [1, 0]);
  const bigX = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);

  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden px-4 py-32 md:px-10 md:py-48">
      <motion.p
        style={{ x: bigX }}
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[30vw] font-extrabold uppercase leading-none tracking-tighter text-stroke opacity-20"
      >
        Fragments — Fragments
      </motion.p>
      <SectionLabel index="07">Visual fragments</SectionLabel>
      <div className="relative mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        {frames.map((f, i) => (
          <Frame key={f.src} f={f} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
