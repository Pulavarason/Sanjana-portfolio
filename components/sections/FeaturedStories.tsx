"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/config/site";
import { stories } from "@/data/stories";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import { openCollection } from "./Services";
import Button from "@/components/ui/Button";

/** Horizontal storytelling: each featured project is its own full-width editorial split. */
export default function FeaturedStories() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setIndex(Math.round(el.scrollLeft / (card.clientWidth + 24)));
  };

  return (
    <section id="stories" className="bg-bg2 py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>FEATURED STORIES</SectionLabel>
            <SplitHeading
              className="mt-8 text-[clamp(2.6rem,6vw,6rem)]"
              lines={["STORIES WORTH", <em key="e">TELLING TWICE.</em>]}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="mr-2 text-[0.7rem] tracking-[0.3em] text-muted">
              {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </header>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 md:px-10"
        tabIndex={0}
        aria-label="Featured stories carousel"
      >
        {stories.map((s, i) => (
          <article
            key={s.id}
            className="grid w-[88vw] shrink-0 snap-center grid-cols-1 overflow-hidden border border-line bg-card md:w-[78vw] md:grid-cols-5 lg:w-[70vw]"
          >
            <div className="relative aspect-[4/5] md:col-span-3 md:aspect-auto md:min-h-[560px]">
              <Image
                src={s.image}
                alt={`${s.title} — ${s.categoryLabel.toLowerCase()} photograph`}
                fill
                sizes="(min-width:1024px) 42vw, (min-width:768px) 47vw, 88vw"
                className="photo object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="flex flex-col justify-between p-7 md:col-span-2 md:p-10">
              <div>
                <p className="label">{s.categoryLabel}</p>
                <p className="display outline-text mt-4 text-7xl leading-none">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-6 text-4xl md:text-5xl">{s.title}</h3>
                {s.location && <p className="mt-3 text-[0.68rem] tracking-[0.28em] text-muted">{s.location.toUpperCase()}</p>}
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">{s.description}</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button variant="ghost" onClick={() => openCollection(s.category)}>
                  VIEW COLLECTION
                </Button>
                {s.placeholder && site.showPlaceholderBadges && (
                  <span className="border border-line px-3 py-1.5 text-[0.55rem] tracking-[0.25em] text-muted">
                    SAMPLE STORY
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Reveal className="mx-auto mt-12 max-w-[1600px] px-5 md:px-10">
        <div className="h-px w-full bg-line">
          <div
            className="h-px bg-accent transition-all duration-500"
            style={{ width: `${((index + 1) / stories.length) * 100}%` }}
          />
        </div>
      </Reveal>
    </section>
  );
}
