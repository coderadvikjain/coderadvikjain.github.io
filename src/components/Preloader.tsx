"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1. Handle the 0-100% counter
    const countInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(countInterval);
          return 100;
        }
        return prev + 1; 
      });
    }, 20);

    const exitTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => {
      clearInterval(countInterval);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px]" />

          <div className="absolute top-6 left-6 md:top-12 md:left-12 flex flex-col gap-1 w-max max-w-[80vw]">
            <span className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 animate-pulse shrink-0" />
              Advik_OS // SYS.BOOT
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-600 font-mono uppercase tracking-widest pl-3.5 md:pl-4">
              Loading Kernel... [{counter < 100 ? "PENDING" : "OK"}]
            </span>
          </div>

          {/* Main */}
          {/* Scales from massive 22vw on phones down to 12vw on large monitors */}
          <div className="relative text-[22vw] sm:text-[18vw] md:text-[15vw] lg:text-[12vw] font-black uppercase leading-none tracking-tighter select-none font-sans flex items-center justify-center">
            
            {/* Hollow Outline */}
            <span 
              className="text-transparent w-full text-center" 
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}
            >
              ADVIK
            </span>

            {/* Solid Fill Text */}
            <motion.span
              className="absolute left-0 top-0 w-full text-center text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
              animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              transition={{ duration: 2, ease: [0.85, 0, 0.15, 1] }} 
            >
              ADVIK
            </motion.span>
          </div>

          {/* Loading Counter ─ */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-end">
            <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white font-mono leading-none tracking-tighter">
              {counter.toString().padStart(3, "0")}
            </span>
            <span className="text-xs sm:text-sm md:text-base text-zinc-500 font-mono mb-1 md:mb-1.5 ml-1 font-bold">
              %
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}