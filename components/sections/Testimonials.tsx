"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/config/site";
import { testimonials } from "@/data/testimonials";
import { cn, EASE } from "@/lib/utils";
import { SectionLabel, SplitHeading } from "@/components/ui/Reveal";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-bg2 px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex justify-center">
          <SectionLabel>TESTIMONIALS</SectionLabel>
        </div>
        <SplitHeading
          className="mt-8 text-[clamp(2.4rem,5.5vw,5.5rem)]"
          lines={["KIND WORDS.", <em key="e">BEAUTIFUL MEMORIES.</em>]}
        />

        <div className="relative mt-16 min-h-[22rem] md:min-h-[24rem]" aria-live="polite">
          <span aria-hidden="true" className="display absolute left-1/2 top-0 -translate-x-1/2 text-[8rem] leading-none text-accent/30">
            &ldquo;
          </span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE }}
              className="pt-20"
            >
              <blockquote className="font-serif text-3xl italic leading-snug md:text-5xl">{t.quote}</blockquote>
              <figcaption className="mt-10">
                <p className="text-sm tracking-[0.3em]">{t.name.toUpperCase()}</p>
                <p className="label mt-2">{t.category}</p>
                {t.placeholder && site.showPlaceholderBadges && (
                  <p className="mx-auto mt-5 w-max border border-line px-3 py-1.5 text-[0.55rem] tracking-[0.25em] text-muted">
                    PLACEHOLDER — REPLACE WITH A REAL REVIEW
                  </p>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((_, n) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={`Testimonial ${n + 1}`}
                onClick={() => {
                  setDir(n > i ? 1 : -1);
                  setI(n);
                }}
                className={cn("h-px transition-all duration-500", n === i ? "w-10 bg-accent" : "w-5 bg-line-strong")}
                style={n === i ? undefined : { background: "var(--line-strong)" }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
