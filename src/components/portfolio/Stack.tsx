"use client";

import { techCategories } from "./data";
import { SectionLabel, RevealText, VelocityMarquee, ACCENTS } from "./ui";

export default function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden py-32">
      <div className="px-4 md:px-10">
        <SectionLabel index="02">Stack</SectionLabel>
        <h2 className="mt-8 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tighter md:text-8xl">
          <RevealText text="Tools I think" /> <span className="font-serif font-normal normal-case italic"><RevealText text="in." delay={0.2} wordClassName="text-green" /></span>
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-3 md:mt-24">
        {techCategories.map((cat, i) => (
          <div key={cat.id} className="border-y border-line py-4 md:py-6">
            <VelocityMarquee baseVelocity={i % 2 === 0 ? -1.4 : 1.4}>
              <span className={`mx-6 font-serif text-3xl italic md:mx-10 ${ACCENTS[i % 3]} md:text-6xl`}>{cat.label}</span>
              {cat.items.map((t) => (
                <span key={t.name} className="group mx-5 flex items-center gap-3 md:mx-8 md:gap-4">
                  <img
                    src={t.src}
                    alt=""
                    className="h-7 w-7 object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-12 md:w-12"
                  />
                  <span className="font-display text-3xl font-bold uppercase tracking-tight text-paper/85 md:text-6xl">{t.name}</span>
                  <span className="ml-5 h-2 w-2 rounded-full bg-dim md:ml-8 md:h-3 md:w-3" aria-hidden />
                </span>
              ))}
            </VelocityMarquee>
          </div>
        ))}
      </div>
    </section>
  );
}
