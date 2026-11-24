"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";
import { gsap } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";

/** Brand statement: an oversized marquee that travels with the scroll, plus the supporting line. */
export default function Statement() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        track.current,
        { xPercent: 0 },
        {
          xPercent: -33.333,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  const phrase = site.brandStatement.replace(".", "");

  return (
    <section ref={wrap} aria-label="Brand statement" className="overflow-hidden bg-bg py-20 md:py-32">
      <div className="mb-14" aria-hidden="true">
        <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
          {[0, 1, 2].map((i) => (
            <span key={i} className="display outline-text flex items-center gap-10 pr-10 text-[clamp(4rem,13vw,12rem)]">
              {phrase}
              <span className="inline-block h-3 w-3 rotate-45 bg-accent md:h-5 md:w-5" />
            </span>
          ))}
        </div>
      </div>
      <h2 className="sr-only">{site.brandStatement}</h2>
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p className="font-serif text-2xl italic leading-snug text-fg md:text-4xl">{site.brandSupport}</p>
      </Reveal>
    </section>
  );
}
