"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = ["Namaste", "Hello", "Kem Cho", "Vanakkam", "Hola", "Bonjour", "नमस्ते"];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 2000);
      // ease-out so the counter decelerates into 100
      setCounter(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const wordTimer = setInterval(() => setWord((w) => (w + 1) % greetings.length), 280);
    const exit = setTimeout(() => {
      setIsLoading(false);
      document.documentElement.style.overflow = "";
    }, 2300);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(wordTimer);
      clearTimeout(exit);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-ink p-5 md:p-10"
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:text-xs">
            <span>Advik Jain ©{new Date().getFullYear()}</span>
            <span>Gujarat, IN</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red" /><span className="h-2.5 w-2.5 rounded-full bg-amber" /><span className="h-2.5 w-2.5 rounded-full bg-green" /></span>
            <span className="font-serif text-4xl italic text-paper md:text-6xl">{greetings[word]}</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-line">
              <div className="h-px bg-tri" style={{ width: `${counter}%` }} />
            </div>
            <span className="font-display text-7xl font-extrabold leading-[0.8] tracking-tighter md:text-[10rem]">
              {counter}
              <span className="text-amber">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
