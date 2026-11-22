"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { INTRO_DELAY } from "./data";
import { EASE, useProgress } from "./ui";

// position of the "BUILDING MY IDEAS" print in itsme.jpeg (0-1)
const PRINT = { x: 0.469, y: 0.669 };
const PHOTO_RATIO = 1402 / 1122;

// where the print ends up on screen (%) once the photo is object-cover'd
function printSpot(w: number, h: number) {
  const wide = w / h > PHOTO_RATIO;
  const rw = wide ? w : h * PHOTO_RATIO;
  const rh = wide ? w / PHOTO_RATIO : h;
  return {
    x: ((PRINT.x * rw - (rw - w) / 2) / w) * 100,
    y: ((PRINT.y * rh - (rh - h) / 2) / h) * 100,
  };
}

function Letters({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden" aria-label={word}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.06 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  // photo is hidden at first and opens up from the hoodie print as you scroll.
  // spot gets measured after mount, otherwise SSR and client styles don't match
  const spot = useMotionValue({ x: 47, y: 70 });
  useEffect(() => {
    const f = () => spot.set(printSpot(window.innerWidth, window.innerHeight));
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [spot]);
  const clip = useTransform([p, spot] as MotionValue[], ([pv, sv]) => {
    const v = pv as number;
    const { x, y } = sv as { x: number; y: number };
    const t = 1 - Math.min(1, v / 0.55);
    const e = t * t * (3 - 2 * t); // smoothstep
    return `inset(${y * e}% ${(100 - x) * e}% ${(100 - y) * e}% ${x * e}% round ${e > 0.02 ? 999 : 0}px)`;
  });
  const imgScale = useTransform(p, [0, 0.55], [1.35, 1]);
  const imgOrigin = useTransform(spot, ({ x, y }) => `${x}% ${y}%`);
  const imgFilter = useTransform(p, [0.2, 0.55], ["brightness(1)", "brightness(0.55)"]);
  const shade = useTransform(p, [0.2, 0.55], [0, 1]);

  const leftX = useTransform(p, [0, 0.4], ["0vw", "-60vw"]);
  const rightX = useTransform(p, [0, 0.4], ["0vw", "60vw"]);
  const nameOpacity = useTransform(p, [0.2, 0.4], [1, 0]);
  const chromeOpacity = useTransform(p, [0, 0.15], [1, 0]);

  const lineA = useTransform(p, [0.55, 0.72], ["100%", "0%"]);
  const lineB = useTransform(p, [0.6, 0.77], ["100%", "0%"]);
  const lineC = useTransform(p, [0.65, 0.82], ["100%", "0%"]);
  const statementOpacity = useTransform(p, [0.5, 0.6, 0.95, 1], [0, 1, 1, 0.6]);

  return (
    <section id="top" ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ opacity: nameOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-center px-4 md:px-10"
        >
          <motion.h1
            style={{ x: leftX }}
            className="font-display text-[19vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-paper md:text-[20vw]"
          >
            <Letters word="Advik" delay={INTRO_DELAY} />
          </motion.h1>
          <motion.div
            style={{ x: rightX }}
            className="self-end font-display text-[19vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-paper md:text-[20vw]"
          >
            <Letters word="Jain" delay={INTRO_DELAY + 0.15} />
          </motion.div>
        </motion.div>

        {/* photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: INTRO_DELAY + 0.35 }}
          className="absolute inset-0"
        >
          <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
            <motion.img
              src="/itsme.jpeg"
              alt="Portrait of Advik Jain"
              className="h-full w-full object-cover"
              style={{ scale: imgScale, transformOrigin: imgOrigin, filter: imgFilter }}
            />
            <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: chromeOpacity }} className="absolute inset-x-0 top-24 flex justify-between px-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:top-28 md:px-10 md:text-[11px]">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: INTRO_DELAY + 0.8 }} className="max-w-[16rem] leading-relaxed">
            Full-stack developer
            <br />& machine-learning engineer
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: INTRO_DELAY + 0.9 }} className="text-right leading-relaxed">
            Building AI
            <br />
            for education
          </motion.p>
        </motion.div>

        <motion.div style={{ opacity: chromeOpacity }} className="absolute inset-x-0 bottom-6 flex items-end justify-between px-4 md:bottom-8 md:px-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: INTRO_DELAY + 1 }} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute left-0 top-0 h-1/2 w-px bg-tri"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            Scroll
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: INTRO_DELAY + 1.1 }}
            className="hidden max-w-xs text-right font-serif text-lg italic leading-snug text-paper/80 md:block"
          >
            “Great dreams need people who believe in them.”
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: statementOpacity }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="font-display text-[11vw] font-extrabold uppercase leading-[0.9] tracking-tighter md:text-[7.5vw]">
            <span className="block overflow-hidden">
              <motion.span className="block" style={{ y: lineA }}>
                I build things
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block font-serif font-normal normal-case italic text-amber" style={{ y: lineB }}>
                that help
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" style={{ y: lineC }}>
                people.
              </motion.span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
