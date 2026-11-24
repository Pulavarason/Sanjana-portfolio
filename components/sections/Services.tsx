"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { alsoOffered, services } from "@/data/services";
import type { CategoryId } from "@/data/portfolio";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { MaskImage, Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";

export function openCollection(category: CategoryId) {
  window.dispatchEvent(new CustomEvent("portfolio:filter", { detail: category }));
  scrollToId("portfolio");
}

export default function Services() {
  return (
    <section id="services" className="bg-bg2 px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-20 max-w-4xl md:mb-28">
          <SectionLabel>SIGNATURE SERVICES</SectionLabel>
          <SplitHeading
            className="mt-8 text-[clamp(2.6rem,6.5vw,6.5rem)]"
            lines={["BEAUTIFULLY CAPTURED.", <em key="e">FOREVER CHERISHED.</em>]}
          />
        </header>

        <div className="space-y-24 md:space-y-40">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={s.number} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={cn("md:col-span-6 lg:col-span-5", flip ? "md:order-2 md:col-start-7 lg:col-start-8" : "")}>
                  <button
                    type="button"
                    data-cursor="VIEW"
                    onClick={() => openCollection(s.category)}
                    aria-label={`View ${s.title.toLowerCase()} collection`}
                    className="group block w-full overflow-hidden"
                  >
                    <MaskImage
                      src={s.image}
                      alt={s.title}
                      ratio="4 / 5"
                      sizes="(min-width:1024px) 40vw, 100vw"
                      imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      className="shadow-[var(--shadow)]"
                    />
                  </button>
                </div>

                <div className={cn("md:col-span-6", flip ? "md:order-1 lg:col-span-6" : "lg:col-span-6 lg:col-start-7")}>
                  <Reveal>
                    <p className="display outline-text text-[clamp(5rem,12vw,10rem)] leading-none">{s.number}</p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="display mt-2 text-[clamp(2rem,4.2vw,4rem)]">{s.title}</h3>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-6 max-w-md font-serif text-2xl italic text-muted md:text-3xl">{s.line}</p>
                    <button
                      type="button"
                      onClick={() => openCollection(s.category)}
                      className="group mt-10 inline-flex items-center gap-3 border-b border-accent pb-2 text-[0.68rem] font-medium tracking-[0.28em] text-accent"
                    >
                      VIEW THE COLLECTION
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                      />
                    </button>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-28 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-line pt-10 text-center md:mt-40">
          <span className="label">ALSO OFFERED</span>
          {alsoOffered.map((a) => (
            <span key={a} className="font-serif text-xl italic text-muted md:text-2xl">
              {a}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
