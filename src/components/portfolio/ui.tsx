"use client";

import { useRef, ReactNode, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
  animate,
  MotionValue,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

// one colour per word, cycled
export const ACCENTS = ["text-red", "text-amber", "text-green"] as const;

// words slide up from a mask when they enter the viewport
export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  once = true,
  wordClassName = "",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionLabel({ index, children, light = false }: { index: string; children: ReactNode; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] ${light ? "text-ink/70" : "text-muted"}`}
    >
      <span className={light ? "text-ink" : ACCENTS[(parseInt(index, 10) - 1) % 3]}>({index})</span>
      <span className={`h-px w-10 ${light ? "bg-ink/40" : "bg-line"}`} />
      <span>{children}</span>
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

// infinite marquee, speeds up / flips direction with scroll velocity.
// children are rendered 4 times and x wraps over one copy (-25%)
export function VelocityMarquee({
  children,
  baseVelocity = 2,
  className = "",
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollLitParagraph({ text, className = "", highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollYProgress = useProgress(ref, [0, 0.85], [1, 0.45]);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = w.replace(/[^\w]/g, "").toLowerCase();
        return (
          <LitWord key={i} progress={scrollYProgress} range={[start, end]} accent={highlight.indexOf(clean)}>
            {w}
          </LitWord>
        );
      })}
    </p>
  );
}

function LitWord({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: number }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={accent >= 0 ? `font-serif italic ${ACCENTS[accent % 3]}` : ""}>
        {children}
      </motion.span>
    </span>
  );
}

export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {v}
      {suffix}
    </span>
  );
}

// 0..1 scroll progress for an element.
// from/to = [edge of element (0 top, 1 bottom), point in viewport (0 top, 1 bottom)]
// e.g. a pinned section is [0,0] -> [1,1]
// (useScroll's target option was giving page-level progress for me, so this measures manually)
export function useProgress(
  ref: React.RefObject<HTMLElement | null>,
  from: [number, number] = [0, 0],
  to: [number, number] = [1, 1]
) {
  const { scrollY } = useScroll();
  const range = useMotionValue<[number, number]>([0, 1]);
  const [f0, f1] = from;
  const [t0, t1] = to;

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const vh = window.innerHeight;
      const start = top + r.height * f0 - vh * f1;
      const end = top + r.height * t0 - vh * t1;
      range.set([start, Math.max(end, start + 1)]);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, range, f0, f1, t0, t1]);

  return useTransform([scrollY, range] as MotionValue[], ([y, rg]) => {
    const [s, e] = rg as unknown as [number, number];
    return Math.min(1, Math.max(0, ((y as number) - s) / (e - s)));
  });
}

// 1 on desktop, 0 on mobile. motion value so transforms can use it
export function useDesktopMV() {
  const mv = useMotionValue(0);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const f = () => mv.set(m.matches ? 1 : 0);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [mv]);
  return mv;
}
