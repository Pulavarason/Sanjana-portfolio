"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { categories, categoryLabel, galleryItems, type CategoryId } from "@/data/portfolio";
import { cn, EASE } from "@/lib/utils";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";
import Button from "@/components/ui/Button";

type Filter = "all" | CategoryId;

/**
 * Asymmetric editorial layout. Pattern repeats by index, so adding photos in
 * data/portfolio.ts never needs a layout change. Images are cover-cropped.
 */
const PATTERN = [
  { span: "col-span-2 md:col-span-7", ratio: "4 / 3", offset: "" },
  { span: "col-span-1 md:col-span-5", ratio: "3 / 4", offset: "md:mt-24" },
  { span: "col-span-1 md:col-span-4", ratio: "3 / 4", offset: "" },
  { span: "col-span-2 md:col-span-8", ratio: "16 / 10", offset: "md:mt-16" },
  { span: "col-span-2 md:col-span-12", ratio: "21 / 9", offset: "" },
  { span: "col-span-1 md:col-span-5", ratio: "4 / 5", offset: "md:-mt-10" },
  { span: "col-span-1 md:col-span-7", ratio: "4 / 3", offset: "md:mt-20" },
] as const;

const PAGE = 9;

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  const choose = useCallback((f: Filter) => {
    setFilter(f);
    setVisible(PAGE);
  }, []);

  // Other sections (services, stories) can jump straight into a collection.
  useEffect(() => {
    const handler = (e: Event) => choose((e as CustomEvent<CategoryId>).detail);
    window.addEventListener("portfolio:filter", handler);
    return () => window.removeEventListener("portfolio:filter", handler);
  }, [choose]);

  const lightboxItems = useMemo(
    () => items.map((i) => ({ src: i.src, alt: i.alt, title: i.title, caption: categoryLabel(i.category) })),
    [items],
  );

  return (
    <section id="portfolio" className="relative bg-bg px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel>PORTFOLIO</SectionLabel>
            <SplitHeading
              className="mt-8 text-[clamp(2.8rem,7.5vw,7.5rem)]"
              lines={["A COLLECTION", <em key="e">OF MOMENTS.</em>]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="font-serif text-xl italic text-muted md:text-2xl">
              Different stories. Different emotions. One beautiful perspective.
            </p>
          </Reveal>
        </header>

        {/* category tabs */}
        <div className="no-scrollbar -mx-5 mt-14 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div role="tablist" aria-label="Portfolio categories" className="flex min-w-max gap-8 border-b border-line md:gap-10">
            {[{ id: "all" as const, number: "", label: "ALL" }, ...categories].map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => choose(c.id)}
                  className={cn(
                    "relative whitespace-nowrap pb-4 text-[0.68rem] font-medium tracking-[0.25em] transition-colors duration-300 hover:text-accent",
                    active ? "text-accent" : "text-muted",
                  )}
                >
                  {c.number && <span className="mr-2 opacity-60">{c.number}</span>}
                  {c.label}
                  {active && (
                    <motion.span
                      layoutId="portfolio-tab"
                      className="absolute inset-x-0 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* gallery */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-x-6 md:gap-y-10" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {items.slice(0, visible).map((item, i) => {
              const p = PATTERN[i % PATTERN.length];
              return (
                <motion.figure
                  key={`${filter}-${item.src}`}
                  className={cn("group relative", p.span, p.offset)}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.06 }}
                >
                  <button
                    type="button"
                    data-cursor="VIEW"
                    onClick={() => setLightbox(i)}
                    aria-label={`View ${item.title}, photograph ${i + 1} of ${items.length}`}
                    className="relative block w-full overflow-hidden bg-card text-left"
                    style={{ aspectRatio: p.ratio }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width:768px) 60vw, 50vw"
                      className="photo object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                      style={item.focus ? { objectPosition: item.focus } : undefined}
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-[#F5F0E8] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:p-6 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                      <span className="block text-[0.58rem] tracking-[0.3em] text-[#C6A77D] md:text-[0.62rem]">
                        {categoryLabel(item.category)}
                      </span>
                      <span className="mt-1 block font-serif text-lg italic md:text-2xl">{item.title}</span>
                    </span>
                  </button>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </div>

        {items.length > visible && (
          <div className="mt-16 flex justify-center">
            <Button variant="ghost" onClick={() => setVisible((v) => v + PAGE)}>
              VIEW MORE MOMENTS
            </Button>
          </div>
        )}
      </div>

      <Lightbox items={lightboxItems} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} />
    </section>
  );
}
