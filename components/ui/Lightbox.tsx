"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { lockScroll } from "@/lib/scroll";
import { EASE } from "@/lib/utils";

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface Props {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/** Full-screen immersive gallery: arrows, keyboard, swipe, counter, smooth transitions. */
export default function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const open = index !== null;
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      setDir(delta);
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[120] flex flex-col bg-[#0a0a09] text-[#F5F0E8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* top bar */}
          <div className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
            <p className="text-[0.7rem] tracking-[0.3em]" aria-live="polite">
              {String(index! + 1).padStart(2, "0")}
              <span className="mx-2 opacity-40">/</span>
              <span className="opacity-60">{String(items.length).padStart(2, "0")}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* stage */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.src}
                custom={dir}
                className="absolute inset-0 touch-pan-y"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.98 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.98 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={onDragEnd}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  priority
                  draggable={false}
                  className="select-none object-contain px-2 md:px-24"
                />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent md:flex"
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent md:flex"
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {/* caption */}
          <div className="relative z-10 px-5 py-5 text-center md:px-10">
            {item.title && <p className="font-serif text-xl italic md:text-2xl">{item.title}</p>}
            {item.caption && <p className="label mt-1">{item.caption}</p>}
            <p className="mt-2 text-[0.6rem] tracking-[0.2em] opacity-40 md:hidden">SWIPE TO BROWSE</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
