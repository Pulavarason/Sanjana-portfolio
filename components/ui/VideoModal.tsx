"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import type { Film } from "@/data/films";
import { lockScroll } from "@/lib/scroll";
import { EASE } from "@/lib/utils";

/** Cinematic video modal. YouTube / Vimeo / local. Never autoplays – the viewer presses play. */
export default function VideoModal({ film, onClose }: { film: Film | null; onClose: () => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = !!film;

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  const fullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  const v = film?.video;

  return (
    <AnimatePresence>
      {film && v && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${film.title} — film`}
          className="fixed inset-0 z-[120] flex flex-col bg-[#070706]/95 text-[#F5F0E8] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="label">{film.kind}</p>
              <p className="font-serif text-xl md:text-2xl">{film.title}</p>
            </div>
            <div className="flex items-center gap-3">
              {v.type !== "none" && (
                <button
                  type="button"
                  onClick={fullscreen}
                  aria-label="Toggle full screen"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent"
                >
                  <Maximize2 size={16} strokeWidth={1.5} />
                </button>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close film"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-3 pb-8 md:px-16" onClick={(e) => e.stopPropagation()}>
            <motion.div
              ref={frameRef}
              className="relative aspect-video w-full max-w-6xl overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {v.type === "youtube" && (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={film.title}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
              {v.type === "vimeo" && (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://player.vimeo.com/video/${v.id}?dnt=1`}
                  title={film.title}
                  allow="fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
              {v.type === "local" && (
                <video
                  className="absolute inset-0 h-full w-full bg-black object-contain"
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
              {v.type === "none" && (
                <>
                  <Image src={film.thumb} alt="" fill sizes="(min-width:1280px) 1152px, 100vw" className="photo object-cover opacity-40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <p className="font-serif text-2xl italic md:text-4xl">This film is on its way.</p>
                    <p className="max-w-md text-sm opacity-70">
                      Add a YouTube, Vimeo or local video link in <code>data/films.ts</code> and it will play right here.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
