"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";
import { SplitHeading } from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "THE MOMENT", text: "Finding beauty in the unexpected.", img: "/images/experience/moment.jpg" },
  { n: "02", title: "THE EMOTION", text: "Preserving feelings that words cannot describe.", img: "/images/experience/emotion.jpg" },
  { n: "03", title: "THE MEMORY", text: "Creating something you will revisit forever.", img: "/images/experience/memory.jpg" },
];

/**
 * Scroll storytelling: a sticky image stage that transitions as each chapter
 * scrolls through the centre of the screen.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="relative bg-bg">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-40">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-accent" />
          <span className="label">THE EXPERIENCE</span>
        </div>
        <SplitHeading
          className="mt-8 text-[clamp(2.8rem,7vw,7rem)]"
          lines={["IT'S MORE THAN", <em key="e">A PHOTOGRAPH.</em>]}
        />
      </div>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
        {/* sticky stage */}
        <div className="sticky top-0 z-10 h-[52svh] lg:h-[100svh]">
          <div className="relative mx-5 mt-4 h-[calc(100%-2rem)] overflow-hidden bg-card shadow-[var(--shadow)] md:mx-10 lg:my-0 lg:mt-0 lg:h-[82svh] lg:translate-y-[9svh]">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                className="absolute inset-0"
                initial={false}
                animate={{
                  clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                  scale: i === active ? 1 : 1.12,
                }}
                transition={{ duration: 1.1, ease: EASE }}
                style={{ zIndex: i === active ? 2 : 1 }}
              >
                <Image
                  src={s.img}
                  alt={`${s.title.toLowerCase()} — storytelling image`}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="photo object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </motion.div>
            ))}
            <p className="absolute bottom-5 left-6 z-10 font-serif text-5xl italic text-[#F5F0E8] md:text-7xl">
              {steps[active].n}
            </p>
          </div>
        </div>

        {/* chapters */}
        <div className="px-5 md:px-10 lg:pl-20 lg:pr-10">
          {steps.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                blocks.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[70svh] flex-col justify-center py-16 lg:min-h-[100svh]"
            >
              <p
                className={`display outline-text text-[clamp(6rem,14vw,13rem)] leading-none transition-opacity duration-700 ${
                  active === i ? "opacity-100" : "opacity-30"
                }`}
              >
                {s.n}
              </p>
              <h3
                className={`display mt-4 text-[clamp(2.2rem,4.5vw,4.5rem)] transition-colors duration-700 ${
                  active === i ? "text-accent" : "text-fg"
                }`}
              >
                {s.title}
              </h3>
              <p className="mt-6 max-w-sm font-serif text-2xl italic text-muted md:text-3xl">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
