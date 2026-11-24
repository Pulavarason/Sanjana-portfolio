"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { films, type Film } from "@/data/films";
import { cn } from "@/lib/utils";
import { Reveal, SplitHeading } from "@/components/ui/Reveal";
import VideoModal from "@/components/ui/VideoModal";

function FilmCard({ film, index, featured, onOpen }: { film: Film; index: number; featured?: boolean; onOpen: () => void }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className={cn(featured ? "md:col-span-3" : "")}>
      <button
        type="button"
        data-cursor="PLAY"
        onClick={onOpen}
        aria-label={`Play ${film.title}`}
        className="group relative block w-full overflow-hidden bg-black text-left"
        style={{ aspectRatio: featured ? "21 / 9" : "16 / 10" }}
      >
        <Image
          src={film.thumb}
          alt=""
          fill
          sizes={featured ? "(min-width:768px) 90vw, 100vw" : "(min-width:768px) 30vw, 100vw"}
          className="photo object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F5F0E8]/60 bg-black/20 text-[#F5F0E8] backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-[#111110] md:h-20 md:w-20">
          <Play size={22} strokeWidth={1.5} className="ml-1" fill="currentColor" />
        </span>
        <span className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <span className="label block">{film.kind}</span>
          <span
            className={cn("mt-1 block font-serif italic text-[#F5F0E8]", featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl")}
          >
            {film.title}
          </span>
        </span>
      </button>
    </Reveal>
  );
}

/** Always-dark cinematic showcase, in both themes. */
export default function Films() {
  const [active, setActive] = useState<Film | null>(null);
  const [first, ...rest] = films;

  return (
    <section id="films" className="relative overflow-hidden bg-[#0b0b0a] px-5 py-24 text-[#F5F0E8] md:px-10 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C6A77D]/50 to-transparent"
      />
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span className="label !text-[#C6A77D]">WEDDING FILMS</span>
            </div>
            <SplitHeading
              className="mt-8 text-[clamp(2.8rem,7vw,7rem)] [&_em]:!text-[#C6A77D]"
              lines={["THE MOMENTS", <em key="e">THAT MOVE US.</em>]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="font-serif text-xl italic text-[#AAA39A] md:text-2xl">
              Some memories are too beautiful to stay still.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <FilmCard film={first} index={0} featured onOpen={() => setActive(first)} />
          {rest.map((f, i) => (
            <FilmCard key={f.id} film={f} index={i + 1} onOpen={() => setActive(f)} />
          ))}
        </div>

        <motion.p
          className="mt-10 text-center text-[0.65rem] tracking-[0.3em] text-[#AAA39A]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          PRESS PLAY — FILMS NEVER AUTOPLAY
        </motion.p>
      </div>

      <VideoModal film={active} onClose={() => setActive(null)} />
    </section>
  );
}
