"use client";

import { ArrowUp, Instagram, Mail, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { mailLink, whatsappLink } from "@/lib/enquiry";
import { scrollToId, scrollToTop } from "@/lib/scroll";
import Wordmark from "@/components/ui/Wordmark";

export default function Footer() {
  const wa = whatsappLink();
  const mail = mailLink();

  const social = [
    { label: "Instagram", href: site.instagram.url, icon: Instagram, external: true },
    wa && { label: "WhatsApp", href: wa, icon: MessageCircle, external: true },
    mail && { label: "Email", href: mail, icon: Mail, external: false },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Mail; external: boolean }[];

  return (
    <footer className="border-t border-line bg-bg2 px-5 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Wordmark size="lg" />
            <p className="mt-8 max-w-md font-serif text-2xl italic text-muted md:text-3xl">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label mb-5">EXPLORE</p>
            <ul className="space-y-3">
              {site.nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(n.id);
                    }}
                    className="text-sm tracking-[0.15em] text-muted transition-colors hover:text-accent"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label mb-5">CONNECT</p>
            <ul className="space-y-3">
              {social.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {label === "Instagram" ? site.instagram.handle : label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} {site.subtitle.charAt(0) + site.subtitle.slice(1).toLowerCase()}. All
            rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 tracking-[0.25em] transition-colors hover:text-accent"
          >
            BACK TO TOP
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent">
              <ArrowUp size={15} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
