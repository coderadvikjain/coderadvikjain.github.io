"use client";

import { motion } from "framer-motion";
import { ScrollLitParagraph, SectionLabel, CountUp, EASE } from "./ui";
import { projects, kaggleRepos, techCategories, inProgress } from "./data";
import Terminal from "./Terminal";

const toolCount = techCategories.reduce((n, c) => n + c.items.length, 0);

const stats = [
  { n: projects.length, s: "", label: "Products live" },
  { n: kaggleRepos.length, s: "", label: "Kaggle comps" },
  { n: toolCount, s: "+", label: "Tools in the kit" },
  { n: inProgress.length, s: "", label: "AI products brewing" },
];

const pillars = [
  { k: "The mission", v: "High-tier education for every kid who has the drive but not the means." },
  { k: "The craft", v: "Full-stack systems, ML pipelines and interfaces that feel effortless." },
  { k: "The markets", v: "Active trader & investor — equity, debt, commodities. Charts by day, code by night." },
];

export default function About() {
  return (
    <section id="about" className="relative px-4 pb-24 pt-32 md:px-10 md:pt-44">
      <SectionLabel index="01">About</SectionLabel>

      <ScrollLitParagraph
        className="mt-10 max-w-[22ch] font-display text-[9vw] font-bold leading-[1.02] tracking-tight md:mt-14 md:text-[5.4vw]"
        highlight={["freelancing", "models", "education", "india"]}
        text="Freelancer turned full-stack engineer. Now I train models and ship products — building AI for education, from India, for everyone."
      />

      <div className="mt-24 grid grid-cols-2 gap-px border-y border-line bg-line md:mt-32 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            className="bg-ink px-4 py-8 md:px-8 md:py-10"
          >
            <CountUp to={s.n} suffix={s.s} className="block font-display text-6xl font-extrabold tracking-tighter md:text-8xl" />
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{s.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="group border-t border-line py-7 first:border-t-0 first:pt-0"
            >
              <h3 className="font-serif text-3xl italic text-paper transition-colors group-hover:text-accent">{p.k}</h3>
              <p className="mt-2 max-w-sm text-base leading-relaxed text-muted">{p.v}</p>
            </motion.div>
          ))}
          <a
            href="/resume.pdf"
            download="Advik_Jain_Resume.pdf"
            className="group mt-6 inline-flex items-center gap-3 rounded-full border border-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            Download résumé
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="md:col-span-7"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">↳ It&apos;s interactive — try typing</p>
          <Terminal />
          <p className="mt-4 font-mono text-[11px] text-dim">[system] Optimised by paneer &amp; lo-fi.</p>
        </motion.div>
      </div>
    </section>
  );
}
