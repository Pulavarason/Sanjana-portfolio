"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/enquiry";
import { scrollToId } from "@/lib/scroll";

/**
 * Floating enquiry button. Opens WhatsApp when a number is configured
 * (config/site.ts or NEXT_PUBLIC_WHATSAPP); until then it scrolls to the enquiry form.
 */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const link = whatsappLink("Hello! I'd like to enquire about a shoot.");

  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const cls =
    "fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#111110] shadow-[var(--shadow)] transition-transform duration-300 hover:scale-110 md:bottom-8 md:right-8";

  return (
    <AnimatePresence>
      {show &&
        (link ? (
          <motion.a
            key="wa"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className={cls}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
          >
            <MessageCircle size={24} strokeWidth={1.6} />
          </motion.a>
        ) : (
          <motion.button
            key="wa"
            type="button"
            onClick={() => scrollToId("contact")}
            aria-label="Enquire about a shoot"
            className={cls}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
          >
            <MessageCircle size={24} strokeWidth={1.6} />
          </motion.button>
        ))}
    </AnimatePresence>
  );
}
