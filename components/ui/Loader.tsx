"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { EASE } from "@/lib/utils";

/** Elegant wordmark intro. Shown once per session and kept short so nobody waits. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("sanjuuuu-loaded") === "1";
      sessionStorage.setItem("sanjuuuu-loaded", "1");
    } catch {
      /* ignore */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      onDone();
      return;
    }
    const t1 = window.setTimeout(onDone, 1500);
    const t2 = window.setTimeout(() => setShow(false), 1750);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="js-only fixed inset-0 z-[150] flex flex-col items-center justify-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: EASE }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          aria-hidden="true"
        >
          <div className="flex overflow-hidden pb-2">
            {site.name.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="display text-[clamp(2.4rem,9vw,5.5rem)] tracking-[0.12em]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="label mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {site.subtitle}
          </motion.p>
          <motion.span
            className="mt-8 block h-px w-24 origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
