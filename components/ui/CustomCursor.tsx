"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle desktop-only cursor. Elements with data-cursor="VIEW" (or any label)
 * make it grow and show that label. Disabled on touch / coarse pointers.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setLabel(tagged.dataset.cursor ?? null);
        setInteractive(true);
        return;
      }
      setLabel(null);
      setInteractive(!!el?.closest("a,button,input,select,textarea,label"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 88 : interactive ? 46 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-accent"
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "var(--accent)" : "rgba(198,167,125,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label && (
          <span className="text-[0.62rem] font-medium tracking-[0.25em] text-[#111110]">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
