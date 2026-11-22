"use client";

import { useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { socials, EMAIL } from "./data";
import { SectionLabel, VelocityMarquee, Magnetic, EASE, useProgress } from "./ui";

export default function Contact() {
  const footRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(footRef, [0, 1], [1, 1]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section id="connect" className="relative pt-32">
      <div className="px-4 md:px-10">
        <SectionLabel index="08">Contact</SectionLabel>
      </div>

      <a href={`mailto:${EMAIL}`} className="group mt-10 block border-y border-line py-6 md:py-10" data-cursor="Say hi">
        <VelocityMarquee baseVelocity={-2.2}>
          <span className="mx-6 font-display text-[18vw] font-extrabold uppercase leading-none tracking-tighter transition-colors group-hover:text-accent md:text-[11vw]">
            Let&apos;s talk
          </span>
          <span className="mx-6 flex items-center gap-[1.2vw]" aria-hidden>
            <span className="h-[5vw] w-[5vw] rounded-full bg-red md:h-[3vw] md:w-[3vw]" />
            <span className="h-[5vw] w-[5vw] rounded-full bg-amber md:h-[3vw] md:w-[3vw]" />
            <span className="h-[5vw] w-[5vw] rounded-full bg-green md:h-[3vw] md:w-[3vw]" />
          </span>
        </VelocityMarquee>
      </a>

      <div className="grid gap-16 px-4 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <p className="max-w-md font-serif text-3xl italic leading-tight md:text-4xl">
            Have an idea, a product, or a classroom that needs AI? <span className="text-amber">Let&apos;s build it.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="flex h-36 w-36 items-center justify-center rounded-full bg-tri text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-transform duration-500 hover:scale-110 md:h-44 md:w-44"
              >
                Write
                <br />
                to me ↗
              </a>
            </Magnetic>
            <button
              onClick={copy}
              className="rounded-full border border-line px-5 py-3 font-mono text-xs text-muted transition-colors hover:border-paper hover:text-paper"
            >
              {copied ? "Copied ✓" : EMAIL}
            </button>
          </div>
        </div>

        <ul className="md:col-span-6 md:col-start-7">
          {socials.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="border-t border-line last:border-b"
            >
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between overflow-hidden py-5 md:py-6">
                <span className="absolute inset-0 -translate-x-full bg-paper transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
                <span className="relative flex items-baseline gap-4 transition-all duration-500 group-hover:translate-x-4 group-hover:text-ink">
                  <span className="font-mono text-[10px] text-dim group-hover:text-ink/60">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">{s.name}</span>
                </span>
                <span className="relative flex items-center gap-4 pr-2 font-mono text-xs text-muted transition-colors group-hover:text-ink">
                  <span className="hidden sm:inline">@{s.handle}</span>
                  <span className="text-xl transition-transform duration-500 group-hover:rotate-45">↗</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <footer ref={footRef} className="relative overflow-hidden border-t border-line px-4 pt-10 md:px-10">
        <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Advik Jain — Designed &amp; built in India</span>
          <span>Next.js · Framer Motion · Lenis</span>
          <a href="#top" className="w-fit text-paper hover:text-accent">
            Back to top ↑
          </a>
        </div>
        <div className="overflow-hidden">
          <motion.p
            style={{ y: nameY }}
            className="whitespace-nowrap pt-6 text-center font-display text-[18vw] font-extrabold uppercase leading-[0.78] tracking-[-0.06em]"
          >
            Advik<span className="text-green">.</span>
          </motion.p>
        </div>
      </footer>
    </section>
  );
}
