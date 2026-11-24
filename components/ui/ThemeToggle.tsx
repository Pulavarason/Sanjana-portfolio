"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

/** Sliding sun/moon switch. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      className={`relative flex h-9 w-[4.25rem] items-center rounded-full border border-current/30 px-1 transition-colors duration-500 hover:border-accent ${className}`}
    >
      <span className="sr-only">{isLight ? "Light mode on" : "Dark mode on"}</span>
      <Moon size={13} strokeWidth={1.5} className="absolute left-2.5 opacity-60" aria-hidden="true" />
      <Sun size={13} strokeWidth={1.5} className="absolute right-2.5 opacity-60" aria-hidden="true" />
      <motion.span
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[#111110]"
        animate={{ x: isLight ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {isLight ? <Sun size={14} strokeWidth={1.75} /> : <Moon size={14} strokeWidth={1.75} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
