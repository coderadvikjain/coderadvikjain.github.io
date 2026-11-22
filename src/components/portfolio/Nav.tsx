"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { navItems, socials, EMAIL, INTRO_DELAY } from "./data";
import { EASE } from "./ui";

function useIST() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(
        new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const time = useIST();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-tri" style={{ scaleX: progress }} />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: hidden ? 0 : 0 }}
        className={`fixed left-0 right-0 top-0 z-[70] ${open ? "" : "mix-blend-difference"}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO_DELAY + 0.6, duration: 0.6 }}
          className={`flex items-center justify-between px-4 py-5 transition-colors duration-500 md:px-10 ${open ? "text-ink" : "text-paper"}`}
        >
          <a href="#top" className="group flex items-baseline gap-1 text-lg font-bold tracking-tight">
            Advik<span className="font-serif font-normal italic">Jain</span>
            <span className={open ? "text-ink" : "text-accent"}>.</span>
          </a>

          <div className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
              <span className={`relative inline-flex h-2 w-2 rounded-full bg-green ${open ? "ring-1 ring-ink/60" : ""}`} />
            </span>
            Gujarat, IN — {time} IST
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em]"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
            <span className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${open ? "border-ink/40 group-hover:border-ink" : "border-paper/40 group-hover:border-paper"}`}>
              <span className={`absolute h-px w-4 transition-transform duration-300 ${open ? "rotate-45 bg-ink" : "-translate-y-[3px] bg-paper"}`} />
              <span className={`absolute h-px w-4 transition-transform duration-300 ${open ? "-rotate-45 bg-ink" : "translate-y-[3px] bg-paper"}`} />
            </span>
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.6rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[65] flex flex-col justify-between gap-6 overflow-y-auto bg-tri px-4 pb-6 pt-20 text-ink md:px-10 md:pt-24"
            data-lenis-prevent
          >
            <nav className="flex flex-col">
              {navItems.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-ink/15">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                    className="group flex items-baseline gap-4 py-[0.8svh] text-[min(10vw,8.5svh)] font-extrabold uppercase leading-[0.95] tracking-tighter md:text-[min(6.5vw,9svh)]"
                  >
                    <span className="font-mono text-xs font-normal tracking-normal md:text-sm">0{i + 1}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-4 group-hover:italic">{item.label}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest md:flex-row md:items-end md:justify-between"
            >
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                {EMAIL}
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
