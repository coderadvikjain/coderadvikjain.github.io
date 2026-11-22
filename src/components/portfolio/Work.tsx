"use client";

import { useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { projects, inProgress } from "./data";
import { SectionLabel, RevealText, EASE, Magnetic, useProgress } from "./ui";
import DeviceScene from "./DeviceScene";

type Project = (typeof projects)[number];

function Card({ p, i, progress, total }: { p: Project; i: number; progress: MotionValue<number>; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(ref, [0, 1], [0, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const targetScale = 1 - (total - i - 1) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / total, 1], [0, (total - i - 1) * 0.18]);

  return (
    <div ref={ref} className="sticky top-0 flex h-svh items-center justify-center px-3 md:px-10">
      <motion.article
        style={{ scale, top: `calc(-3vh + ${i * 20}px)`, backgroundColor: p.tone, borderColor: `${p.accent}33` }}
        className="relative flex h-[80svh] w-full max-w-[1400px] origin-top flex-col overflow-hidden rounded-[1.75rem] border md:h-[78vh] md:flex-row"
      >
        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between p-6 md:p-12" style={{ containerType: "inline-size" }}>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] md:text-[11px]" style={{ color: p.accent }}>
            <span>{p.kind}</span>
            <span className="text-muted">
              0{i + 1} / 0{total} — {p.year}
            </span>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="font-display text-[10.5cqi] font-extrabold uppercase leading-[0.85] tracking-tighter">{p.name}</h3>
            <p className="mt-3 line-clamp-4 max-w-md text-sm leading-relaxed text-paper/70 md:mt-8 md:line-clamp-none md:text-lg">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/60">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <Magnetic>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink"
                style={{ backgroundColor: p.accent }}
              >
                {p.cta}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-45">↗</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="View"
          className="relative order-first h-[28%] shrink-0 overflow-hidden md:order-none md:m-4 md:h-auto md:w-[54%] md:rounded-[1.25rem]"
        >
          {"device" in p && p.device ? (
            <DeviceScene src={p.image} alt={`${p.name} on a desktop monitor`} accent={p.accent} progress={scrollYProgress} />
          ) : (
            <motion.img src={p.image} alt={`${p.name} preview`} style={{ scale: imgScale }} className="absolute inset-0 h-full w-full origin-top-left object-cover object-left-top" />
          )}
          {"avatar" in p && p.avatar && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
              <img
                src={p.avatar}
                alt={`${p.name} avatar`}
                className="h-20 w-20 rounded-full border-4 object-cover md:h-36 md:w-36"
                style={{ borderColor: p.accent, boxShadow: `0 0 80px ${p.accent}88` }}
              />
            </div>
          )}
          {!("device" in p && p.device) && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
        </a>

        <motion.div className="pointer-events-none absolute inset-0 z-20 bg-black" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export default function Work() {
  const container = useRef<HTMLDivElement>(null);
  const scrollYProgress = useProgress(container);

  return (
    <section id="work" className="relative pt-32">
      <div className="px-4 md:px-10">
        <SectionLabel index="03">Selected work</SectionLabel>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-[12vw] font-extrabold uppercase leading-[0.85] tracking-tighter md:text-[10vw]">
            <RevealText text="Shipped" />
            <br />
            <span className="text-stroke">
              <RevealText text="& live." delay={0.15} />
            </span>
          </h2>
          <p className="max-w-xs pb-3 text-muted">Products real people use — streaming, music, bots and deployed deep-learning models.</p>
        </div>
      </div>

      <div ref={container} className="relative mt-10">
        {projects.map((p, i) => (
          <Card key={p.name} p={p} i={i} progress={scrollYProgress} total={projects.length} />
        ))}
      </div>

      <div className="px-4 pb-10 pt-24 md:px-10">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          <span className="mr-3 inline-block h-2 w-2 animate-pulse rounded-full bg-green" />
          Currently in the lab
        </p>
        {inProgress.map((x, i) => (
          <motion.div
            key={x.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className="group relative -mx-4 grid gap-3 overflow-hidden border-t border-line px-4 py-8 last:border-b md:-mx-6 md:grid-cols-12 md:items-center md:px-6 md:py-10"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-tri transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
            <span className="relative font-mono text-xs text-muted transition-colors group-hover:text-ink md:col-span-1">0{i + 1}</span>
            <h3 className="relative font-display text-[6.5vw] font-extrabold uppercase tracking-tighter transition-colors group-hover:text-ink md:col-span-6 md:text-[3vw] min-w-0 leading-none">
              {x.name}
            </h3>
            <p className="relative text-muted transition-colors group-hover:text-ink md:col-span-3 md:pr-4">{x.desc}</p>
            <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-accent transition-colors group-hover:text-ink md:col-span-2 md:text-right">
              In development
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
