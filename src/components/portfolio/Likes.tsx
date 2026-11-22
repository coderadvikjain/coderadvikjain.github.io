"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { SectionLabel, RevealText, useProgress, useDesktopMV } from "./ui";

const fmt = (t: number) => {
  if (!isFinite(t)) return "0:00";
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
};

function FanCard({
  i,
  progress,
  desktop,
  children,
  accent,
}: {
  i: number;
  progress: MotionValue<number>;
  desktop: MotionValue<number>;
  children: ReactNode;
  accent: string;
}) {
  const offset = 1.5 - i; // distance from centre in card-widths
  const both = [progress, desktop] as MotionValue[];
  const x = useTransform(both, ([p, d]) => `${(1 - (p as number)) * offset * 100 * (d as number)}%`);
  const rotate = useTransform(both, ([p, d]) => (i - 1.5) * (7 - 5 * (p as number)) * (d as number));
  const y = useTransform(both, ([p, d]) => (1 - (p as number)) * Math.abs(offset) * 30 * (d as number));
  return (
    <motion.div
      style={{ x, rotate, y, zIndex: 10 + i }}
      whileHover={{ y: -16, rotate: 0, transition: { duration: 0.3 } }}
      className="group relative flex h-[440px] w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 md:w-auto"
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      {children}
    </motion.div>
  );
}

function CardBody({
  img,
  tag,
  title,
  bullets,
  accent,
  link,
}: {
  img: string;
  tag: string;
  title: string;
  bullets: string[];
  accent: string;
  link?: { href: string; label: string };
}) {
  return (
    <>
      <div className="relative h-[48%] overflow-hidden">
        <img src={img} alt={title} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: accent }}>
            {tag}
          </p>
          <h3 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight">{title}</h3>
          <p className="mt-2 font-serif text-sm italic text-muted">{bullets.join(" · ")}</p>
        </div>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80 underline-offset-4 hover:underline"
          >
            {link.label} <span>↗</span>
          </a>
        )}
      </div>
    </>
  );
}

export default function Likes() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktopMV();
  const scrollYProgress = useProgress(ref, [0, 0.95], [0, 0.25]);

  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState({ cur: 0, dur: 0 });

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="likes" className="relative overflow-hidden px-4 py-32 md:px-10">
      <SectionLabel index="06">Off the clock</SectionLabel>
      <h2 className="mt-8 font-display text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tighter md:text-[8vw]">
        <RevealText text="When I'm not" />
        <br />
        <span className="font-serif font-normal normal-case italic">
          <RevealText text="shipping code" delay={0.15} wordClassName="text-green" />
        </span>
      </h2>

      <div
        ref={ref}
        className="-mx-4 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] md:mx-0 md:mt-24 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0"
      >
        <FanCard i={0} progress={scrollYProgress} desktop={desktop} accent="#2fd3e0">
          <CardBody
            img="https://tse3.mm.bing.net/th/id/OIP._SnsAlV-OLiK9DXyAOU7pgHaFZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            tag="Destination"
            title="Gilgit"
            bullets={["High altitudes", "Mountainscapes"]}
            accent="#2fd3e0"
            link={{ href: "https://maps.app.goo.gl/D9u2SPbYddHfsrN17", label: "Open map" }}
          />
        </FanCard>
        <FanCard i={1} progress={scrollYProgress} desktop={desktop} accent="#ff4d5e">
          <CardBody
            img="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=500&fit=crop"
            tag="Battle royale"
            title="PUBG"
            bullets={["Erangel drops", "Tactical survival"]}
            accent="#ff4d5e"
            link={{ href: "https://pubg.com", label: "Play now" }}
          />
        </FanCard>
        <FanCard i={2} progress={scrollYProgress} desktop={desktop} accent="#b583ff">
          <CardBody
            img="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=500&fit=crop"
            tag="Favourite movie"
            title="Sita Ramam"
            bullets={["Dir. Hanu Raghavapudi", "Romance · War"]}
            accent="#b583ff"
            link={{ href: "https://youtu.be/PFcE1Rw5lmo?si=AWyaKHTsdIYffYsn", label: "Watch trailer" }}
          />
        </FanCard>
        <FanCard i={3} progress={scrollYProgress} desktop={desktop} accent="#28c840">
          <div className="relative flex h-[48%] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_60%,rgba(254,188,46,0.3),transparent_60%)]">
            <span className="absolute h-36 w-36 rounded-full bg-[repeating-radial-gradient(circle,#1c1a16_0,#1c1a16_2px,#0b0a08_3px,#0b0a08_5px)]" />
            <img
              src="https://lh3.googleusercontent.com/UOY2VeiYo2WNdKr2JKYPHYFmWOrY3UQ6kr6haU4IleuP-6k9nWgpv-d7cZZ4plUTHiDQzWmnfm2PUPqY"
              alt=""
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-xl"
            />
            <motion.img
              src="https://lh3.googleusercontent.com/UOY2VeiYo2WNdKr2JKYPHYFmWOrY3UQ6kr6haU4IleuP-6k9nWgpv-d7cZZ4plUTHiDQzWmnfm2PUPqY"
              alt=""
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              animate={{ rotate: playing ? 360 : 0 }}
              transition={playing ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.6 }}
              className="relative h-36 w-36 rounded-full border-[6px] border-ink object-cover shadow-2xl"
            />
            <span className="absolute h-4 w-4 rounded-full border-2 border-ink-2 bg-ink" />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <audio
              ref={audio}
              src="/songs.m4a"
              loop
              preload="metadata"
              onTimeUpdate={(e) => {
                const { currentTime, duration } = e.currentTarget;
                setT({ cur: currentTime, dur: duration || 0 });
              }}
              onLoadedMetadata={(e) => {
                // grab it here, the event is already gone when the updater runs
                const dur = e.currentTarget.duration || 0;
                setT((p) => ({ ...p, dur }));
              }}
            />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">On repeat</p>
              <h3 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight">Dekhha Tenu</h3>
              <p className="mt-2 font-serif text-sm italic text-muted">Station: Audixa · 99.9 fm</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tri text-ink transition-transform hover:scale-110"
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12" /><rect x="8.5" y="1" width="3.5" height="12" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-0.5"><path d="M2 1l11 6-11 6z" /></svg>
                )}
              </button>
              <div className="flex-1">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full bg-tri" style={{ width: t.dur ? `${(t.cur / t.dur) * 100}%` : "0%" }} />
                </div>
                <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted">
                  <span>{fmt(t.cur)}</span>
                  <span>{fmt(t.dur)}</span>
                </div>
              </div>
            </div>
          </div>
        </FanCard>
      </div>
    </section>
  );
}
