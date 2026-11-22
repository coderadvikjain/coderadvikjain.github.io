"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { kaggleRepos } from "./data";
import { SectionLabel, EASE, useProgress } from "./ui";

function Ring({ pct }: { pct: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 -rotate-90 md:h-20 md:w-20">
      <defs>
        <linearGradient id="tri" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--red)" />
          <stop offset="50%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--green)" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r={r} fill="none" stroke="var(--line)" strokeWidth="3" />
      <motion.circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="url(#tri)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c * (1 - pct / 100) }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
      />
    </svg>
  );
}

export default function Kaggle() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scrollYProgress = useProgress(section);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={section} id="kaggle" className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mb-8 flex items-end justify-between px-4 md:mb-12 md:px-10">
          <div>
            <SectionLabel index="04">Kaggle notebooks</SectionLabel>
            <h2 className="mt-5 font-display text-[7vw] font-extrabold uppercase leading-[0.9] tracking-tighter md:text-8xl">
              Models <span className="font-serif font-normal normal-case italic text-red">vs.</span> leaderboard
            </h2>
          </div>
          <div className="hidden w-48 md:block">
            <div className="h-px w-full bg-line">
              <motion.div className="h-px bg-tri" style={{ width: bar }} />
            </div>
            <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Keep scrolling →</p>
          </div>
        </div>

        <motion.div ref={track} style={{ x: smoothX }} className="flex w-max gap-4 px-4 md:gap-6 md:px-10">
          {kaggleRepos.map((r, i) => {
            const pct = Math.round((r.myScore / r.topScore) * 100);
            return (
              <a
                key={r.name}
                href={r.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Code"
                className="group relative flex h-[64svh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-accent/50 md:h-[60vh] md:w-[30vw] md:min-w-[380px] md:p-8"
              >
                <span className="pointer-events-none absolute -right-6 -top-10 font-display text-[11rem] font-extrabold leading-none text-paper/[0.04] transition-colors duration-500 group-hover:text-accent/10">
                  0{i + 1}
                </span>
                <div className="relative">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    <span>Notebook / 0{i + 1}</span>
                    <span className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent">↗</span>
                  </div>
                  <h3 className="mt-4 font-display text-[6.4vw] font-extrabold uppercase leading-[0.95] tracking-tight md:mt-6 md:text-4xl">{r.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted md:mt-4 md:line-clamp-none">{r.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.tech.map((t) => (
                      <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase text-paper/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative flex items-end justify-between border-t border-line pt-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{r.metric}</p>
                    <p className="mt-1 font-display text-4xl font-extrabold tracking-tighter md:text-5xl">{r.myScore}</p>
                    <p className="font-mono text-[11px] text-dim">top: {r.topScore}</p>
                  </div>
                  <div className="relative">
                    <Ring pct={pct} />
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold">{pct}%</span>
                  </div>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
