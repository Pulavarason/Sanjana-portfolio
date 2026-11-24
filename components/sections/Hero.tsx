"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "@/lib/utils";
import { useReady } from "@/components/providers/ReadyContext";
import Button from "@/components/ui/Button";

function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ready = useReady();
  return (
    <span className="block overflow-hidden pb-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={ready ? { y: 0 } : { y: "112%" }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ready = useReady();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "70% top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // keep trigger positions right once images/fonts settle
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-bg text-cream"
    >
      {/* background photograph */}
      <div ref={parallaxRef} className="absolute inset-x-0 -top-[7%] h-[114%]">
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(10% 10% 10% 10%)", scale: 1.12 }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : {}}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src="/images/hero/hero.jpg"
              alt="Wedding photograph by SANJUUUU"
              fill
              priority
              sizes="100vw"
              quality={80}
              className="photo object-cover"
            />
          </div>
        </motion.div>
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      {/* content */}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-24 pt-40 md:px-10 md:pb-28">
        <motion.p
          className="label !text-cream/80"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          THE ART OF PRESERVING MOMENTS
        </motion.p>

        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,7rem)] md:max-w-none">
          <Line delay={0.7}>LOVE IS IN THE DETAILS.</Line>
          <Line delay={0.85}>
            WE CAPTURE THE <em className="!text-accent">FOREVER.</em>
          </Line>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          From intimate emotions to grand celebrations, we turn your beautiful moments into timeless visual stories.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <Button variant="hero-solid" onClick={() => scrollToId("portfolio")}>
            EXPLORE OUR STORIES
          </Button>
          <Button variant="hero-ghost" onClick={() => scrollToId("contact")}>
            LET&apos;S CONNECT
          </Button>
        </motion.div>
      </div>

      {/* floating location – only when confirmed in config/site.ts */}
      {site.location && (
        <motion.div
          className="absolute right-5 top-28 z-10 hidden items-center gap-2 border border-cream/30 px-4 py-2 text-[0.65rem] tracking-[0.3em] backdrop-blur-md md:flex md:right-10"
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <MapPin size={13} strokeWidth={1.5} />
          {site.location.toUpperCase()}
        </motion.div>
      )}

      {/* scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label="Scroll down"
        className="absolute bottom-6 right-5 z-10 hidden flex-col items-center gap-3 text-[0.6rem] tracking-[0.35em] text-cream/80 md:flex md:right-10"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
      >
        SCROLL
        <span className="relative block h-14 w-px overflow-hidden bg-cream/25">
          <span className="absolute inset-0 animate-scrollLine bg-cream" />
        </span>
      </motion.button>
    </section>
  );
}
