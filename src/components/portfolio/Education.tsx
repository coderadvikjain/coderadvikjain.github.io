"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useProgress, EASE } from "./ui";

const subjects = ["Statistics", "Machine learning", "Python", "Databases", "Linear algebra"];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref, [0, 0.85], [1, 0.4]);
  const fill = useTransform(p, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  return (
    <section id="education" className="relative px-4 pb-32 md:px-10">
      <div ref={ref} className="border-t border-line pt-14 md:pt-20">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          <span>
            <span className="text-green">↳</span> Education
          </span>
          <span>Chennai, IN</span>
        </div>

        <h2 className="relative mt-8 font-display text-[8.4vw] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
          <span className="text-stroke block">IIT Madras</span>
          <motion.span aria-hidden className="absolute inset-0 block text-amber" style={{ clipPath: fill }}>
            IIT Madras
          </motion.span>
        </h2>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:col-span-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-red">Bachelor of Science</p>
            <h3 className="mt-3 font-serif text-3xl italic leading-tight md:text-4xl">Data Science &amp; Applications</h3>
            <p className="mt-2 text-muted">Indian Institute of Technology Madras</p>
            <div className="mt-8 inline-block rounded-2xl border border-line px-6 py-4">
              <p className="font-display text-4xl font-extrabold tracking-tighter md:text-5xl">2027</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Graduating</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="md:col-span-6 md:col-start-7"
          >
            <p className="text-lg leading-relaxed text-paper/80 md:text-xl">
              Where the maths behind the models gets serious. The degree gives my engineering its foundations: the
              statistics, algorithms and data thinking behind every model I train and every product I ship.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/60">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
