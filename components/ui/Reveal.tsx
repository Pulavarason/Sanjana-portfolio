"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn, EASE } from "@/lib/utils";

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered line-by-line masked heading reveal. Each array item is one line. */
export function SplitHeading({
  lines,
  className,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("display", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block"
            initial={{ y: "108%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Photograph with a cinematic mask reveal (wipe up + settle zoom) when it enters the viewport. */
export function MaskImage({
  src,
  alt,
  sizes,
  ratio,
  className,
  imgClassName,
  focus,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  focus?: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 1.25, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 1.7, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("photo object-cover", imgClassName)}
          style={focus ? { objectPosition: focus } : undefined}
        />
      </motion.div>
    </motion.div>
  );
}

/** Small uppercase section label with a leading hairline. */
export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="h-px w-10 bg-accent" />
      <span className="label">{children}</span>
    </div>
  );
}
