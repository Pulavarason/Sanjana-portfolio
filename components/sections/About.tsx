"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/config/site";
import { MaskImage, Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [60, -90]);
  const yB = useTransform(scrollYProgress, [0, 1], [100, -140]);
  const { about } = site;

  return (
    <section id="about" ref={ref} className="relative bg-bg px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* editorial image composition */}
        <div className="relative lg:col-span-6">
          <MaskImage
            src={about.portrait}
            alt="Portrait of the photographer"
            ratio="4 / 5"
            sizes="(min-width:1024px) 48vw, 100vw"
            className="w-[88%] shadow-[var(--shadow)] lg:w-[82%]"
          />
          <motion.div style={{ y: yA }} className="absolute -bottom-12 right-0 w-[40%] md:-bottom-20">
            <MaskImage
              src={about.support[0]}
              alt="Supporting photograph"
              ratio="3 / 4"
              sizes="(min-width:1024px) 20vw, 40vw"
              className="border-[6px] border-bg shadow-[var(--shadow)]"
            />
          </motion.div>
          <motion.div style={{ y: yB }} className="absolute -top-10 right-[6%] hidden w-[26%] md:block lg:-top-16">
            <MaskImage
              src={about.support[1]}
              alt="Supporting photograph"
              ratio="4 / 3"
              sizes="14vw"
              className="border-[6px] border-bg shadow-[var(--shadow)]"
            />
          </motion.div>
          <span
            aria-hidden="true"
            className="display outline-text pointer-events-none absolute -left-2 -top-14 hidden text-[9rem] leading-none lg:block"
          >
            01
          </span>
        </div>

        {/* text */}
        <div className="lg:col-span-6 lg:pl-16">
          <SectionLabel>THE ARTIST BEHIND THE LENS</SectionLabel>
          <SplitHeading
            className="mt-8 text-[clamp(2.6rem,6vw,5.6rem)]"
            lines={["THE EYE BEHIND", <em key="e">EVERY STORY.</em>]}
          />
          <div className="mt-10 space-y-6 text-base leading-[1.85] text-muted md:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-serif text-2xl italic text-fg md:text-3xl" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {about.approach.map((a, i) => (
              <div key={a.title}>
                <p className="label">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-serif text-xl">{a.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <p className="font-serif text-3xl italic text-accent md:text-4xl">&ldquo;{about.philosophy}&rdquo;</p>
            <p className="mt-3 text-[0.7rem] tracking-[0.35em] text-muted">— {site.name}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
