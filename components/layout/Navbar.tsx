"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { scrollToId, lockScroll } from "@/lib/scroll";
import { cn, EASE } from "@/lib/utils";
import { useReady } from "@/components/providers/ReadyContext";
import Wordmark from "@/components/ui/Wordmark";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const ready = useReady();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("home");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const mid = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const n of site.nav) {
        const el = document.getElementById(n.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = n.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      // wait for the overlay to release the scroll lock before scrolling
      window.setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };

  const overHero = !scrolled && !open;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[110] transition-[background-color,backdrop-filter,border-color,padding] duration-500",
          overHero
            ? "border-b border-transparent py-5 text-cream"
            : "border-b border-line bg-[var(--nav-bg)] py-3 text-fg backdrop-blur-xl",
        )}
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.25 }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 md:px-10"
        >
          <a href="#home" onClick={go("home")} aria-label={`${site.name} — home`} className="relative z-[120]">
            <Wordmark size="sm" />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {site.nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  aria-current={active === n.id ? "true" : undefined}
                  className={cn(
                    "group relative py-2 text-[0.68rem] font-medium tracking-[0.27em] transition-colors duration-300 hover:text-accent",
                    active === n.id && "text-accent",
                  )}
                >
                  {n.label}
                  {active === n.id ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : (
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent/70 transition-transform duration-500 group-hover:scale-x-100" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-[120] flex items-center gap-4">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={go("contact")}
              className="hidden border border-current/40 px-5 py-3 text-[0.65rem] font-medium tracking-[0.27em] transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-[#111110] md:inline-block"
            >
              BOOK A SHOOT
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
            >
              {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[105] flex flex-col justify-center bg-bg px-8 text-fg lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="space-y-1">
              {site.nav.map((n, i) => (
                <li key={n.id} className="overflow-hidden">
                  <motion.a
                    href={`#${n.id}`}
                    onClick={go(n.id)}
                    className={cn(
                      "display block py-2 text-[clamp(2.6rem,12vw,4.5rem)] transition-colors hover:text-accent",
                      active === n.id && "italic text-accent",
                    )}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: EASE }}
                  >
                    {n.label.charAt(0) + n.label.slice(1).toLowerCase()}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-10 flex items-center justify-between border-t border-line pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#contact" onClick={go("contact")} className="label">
                BOOK A SHOOT
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted">
                {site.instagram.handle}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
