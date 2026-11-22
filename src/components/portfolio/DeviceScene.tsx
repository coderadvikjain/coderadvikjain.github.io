"use client";

import { useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

// desk setup drawn in css with the screenshot on the monitor.
// everything is in container units (cqw/cqh) so it scales with the card
export default function DeviceScene({
  src,
  alt,
  accent,
  progress,
}: {
  src: string;
  alt: string;
  accent: string;
  progress: MotionValue<number>;
}) {
  const zoom = useTransform(progress, [0, 1], [1.2, 1]);
  // match the screen to the screenshot so nothing gets cropped
  const [ratio, setRatio] = useState(1917 / 982);
  const glow = useTransform(progress, [0.3, 1], [0.35, 1]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f0d0b]" style={{ containerType: "size" }}>
      <motion.div className="absolute inset-0" style={{ scale: zoom, transformOrigin: "50% 42%" }}>
        {/* wall */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 45% at 12% 8%, rgba(255,176,96,0.22), transparent 70%),
              linear-gradient(180deg, #1d1915 0%, #14110e 75%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ background: "repeating-linear-gradient(90deg, transparent 0 9cqw, #000 9cqw calc(9cqw + 1px))" }}
        />
        {/* glow from the screen */}
        <motion.div
          className="absolute left-1/2 top-[38%] h-[70cqh] w-[110cqw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${accent}40, transparent)`, opacity: glow }}
        />

        {/* frame on the wall */}
        <div className="absolute left-[7cqw] top-[9cqh] h-[22cqh] w-[13cqw] border-[0.6cqw] border-[#2b241d] bg-[#191512] shadow-[0_1.5cqw_3cqw_rgba(0,0,0,0.6)]">
          <div className="absolute inset-[1cqw] opacity-70" style={{ background: `linear-gradient(160deg, ${accent}55, transparent 60%), #221c17` }} />
        </div>

        {/* desk */}
        <div className="absolute inset-x-0 bottom-0 h-[21cqh]">
          <div className="absolute inset-x-0 top-0 h-[0.5cqh] bg-[#6b4a32]" />
          <div
            className="absolute inset-x-0 bottom-0 top-[0.5cqh]"
            style={{
              background: `repeating-linear-gradient(178deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 9px),
                linear-gradient(180deg, #4a3322 0%, #2a1c12 100%)`,
            }}
          />
          <motion.div
            className="absolute left-1/2 top-0 h-[16cqh] w-[60cqw] -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: `radial-gradient(closest-side, ${accent}55, transparent)`, opacity: glow }}
          />
        </div>

        {/* monitor */}
        <div
          className="absolute bottom-[19cqh] left-1/2 flex -translate-x-1/2 flex-col items-center"
          style={{ width: "min(84cqw, 96cqh)" }}
        >
          <div className="w-full rounded-[1.2cqw] bg-[#0c0c0c] p-[1.1%] shadow-[0_3cqw_6cqw_rgba(0,0,0,0.65)] ring-1 ring-white/10">
            <div className="relative w-full overflow-hidden rounded-[0.5cqw] bg-black" style={{ aspectRatio: ratio }}>
              <img src={src} alt={alt} onLoad={(e) => e.currentTarget.naturalWidth && setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
                className="absolute inset-0 h-full w-full object-contain" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.02)_35%,transparent_36%)]" />
            </div>
            <div className="flex h-[3.2cqw] max-h-5 items-center justify-center">
              <span className="h-[0.5cqw] w-[0.5cqw] rounded-full bg-white/25" />
            </div>
          </div>
          {/* stand */}
          <div className="h-[8cqh] w-[9%] bg-gradient-to-r from-[#1a1a1a] via-[#3a3a3a] to-[#1a1a1a]" />
          <div className="h-[1.4cqh] w-[30%] rounded-t-[0.6cqw] bg-gradient-to-b from-[#3a3a3a] to-[#161616] shadow-[0_1cqh_2cqh_rgba(0,0,0,0.7)]" />
        </div>

        {/* keyboard */}
        <div
          className="absolute bottom-[7cqh] left-[54%] h-[7cqh] w-[36cqw] -translate-x-1/2 rounded-[0.8cqw] bg-[#1b1b1b] shadow-[0_1cqh_2cqh_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          style={{ transform: "translateX(-50%) perspective(40cqw) rotateX(55deg)" }}
        >
          <div
            className="absolute inset-[8%] rounded-[0.4cqw] opacity-80"
            style={{
              background:
                "repeating-linear-gradient(90deg, #2c2c2c 0 2.2cqw, transparent 2.2cqw 2.6cqw), repeating-linear-gradient(0deg, transparent 0 0.4cqh, #1b1b1b 0.4cqh 0.8cqh)",
            }}
          />
        </div>

        {/* mouse */}
        <div className="absolute bottom-[7.5cqh] right-[18cqw] h-[5cqh] w-[3.2cqw] rounded-[50%] bg-gradient-to-b from-[#2e2e2e] to-[#151515] shadow-[0_0.8cqh_1.5cqh_rgba(0,0,0,0.6)] ring-1 ring-white/10" />

        {/* mug */}
        <div className="absolute bottom-[9cqh] left-[9cqw] h-[9cqh] w-[5.5cqw]">
          <div className="absolute inset-0 rounded-b-[1cqw] rounded-t-[0.3cqw] bg-gradient-to-r from-[#d9cfc0] via-[#f1ead9] to-[#b9ae9e] shadow-[0_1cqh_2cqh_rgba(0,0,0,0.5)]" />
          <div className="absolute -right-[1.8cqw] top-[22%] h-[45%] w-[2.4cqw] rounded-r-full border-[0.6cqw] border-l-0 border-[#d9cfc0]" />
          <div className="absolute left-[15%] top-[30%] h-[25%] w-[70%] rounded-sm" style={{ background: accent, opacity: 0.85 }} />
        </div>

        {/* plant */}
        <div className="absolute bottom-[9cqh] right-[1.5cqw] h-[27cqh] w-[10cqw]">
          {[-38, -12, 10, 34, -60, 58].map((r, k) => (
            <span
              key={k}
              className="absolute bottom-[30%] left-1/2 h-[70%] w-[30%] origin-bottom rounded-[50%_50%_50%_50%/80%_80%_20%_20%]"
              style={{
                transform: `translateX(-50%) rotate(${r}deg)`,
                background: `linear-gradient(90deg, #1f3a22, ${k % 2 ? "#35603a" : "#2b4f2f"})`,
              }}
            />
          ))}
          <div
            className="absolute bottom-0 left-1/2 h-[32%] w-[70%] -translate-x-1/2 bg-gradient-to-r from-[#8a5a3c] via-[#b5784f] to-[#6e452d]"
            style={{ clipPath: "polygon(0 0, 100% 0, 86% 100%, 14% 100%)" }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      </motion.div>
    </div>
  );
}
