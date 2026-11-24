"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { site } from "@/config/site";
import { instagramTiles } from "@/data/instagram";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function InstagramFeed() {
  return (
    <section id="instagram" className="overflow-hidden bg-bg px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>INSTAGRAM</SectionLabel>
            <SplitHeading
              className="mt-8 text-[clamp(2.6rem,6.5vw,6.5rem)]"
              lines={["MORE STORIES.", <em key="e">MORE MOMENTS.</em>]}
            />
          </div>
          <Reveal className="flex flex-col items-start gap-5 md:items-end">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-serif text-2xl italic transition-colors hover:text-accent"
            >
              <Instagram size={22} strokeWidth={1.4} />
              {site.instagram.handle}
            </a>
            <Button href={site.instagram.url} external variant="solid">
              FOLLOW ON INSTAGRAM
            </Button>
          </Reveal>
        </header>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {instagramTiles.map((t, i) => (
            <Reveal key={t.src} delay={(i % 4) * 0.07} className={cn(i % 2 === 1 && "md:translate-y-12")}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Instagram — ${site.instagram.handle}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-card"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(min-width:768px) 24vw, 50vw"
                  className="photo object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:hidden">
                  <span className="flex h-14 w-14 translate-y-4 items-center justify-center rounded-full border border-[#F5F0E8]/70 text-[#F5F0E8] transition-transform duration-500 group-hover:translate-y-0">
                    <Instagram size={22} strokeWidth={1.4} />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="h-12 md:h-16" />
      </div>
    </section>
  );
}
