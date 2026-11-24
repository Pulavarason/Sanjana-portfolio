"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Instagram, Mail, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { enquiryText, mailLink, whatsappLink, type EnquiryData } from "@/lib/enquiry";
import { cn, EASE } from "@/lib/utils";
import { Reveal, SectionLabel, SplitHeading } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

type Errors = Partial<Record<keyof EnquiryData, string>>;
type Status = "idle" | "sending" | "sent" | "ready" | "unconfigured" | "error";

const empty: EnquiryData = { name: "", email: "", phone: "", type: "", date: "", location: "", details: "" };

function validate(d: EnquiryData): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Please enter a valid email address.";
  if (d.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(d.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!d.type) e.type = "Please choose the type of photoshoot.";
  if (d.date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(d.date) < today) e.date = "Please choose a date that is today or later.";
  }
  if (d.details.length > 1500) e.details = "Please keep details under 1500 characters.";
  return e;
}

const field =
  "w-full border-0 border-b border-[var(--line-strong)] bg-transparent px-0 py-3.5 text-base text-fg placeholder:text-muted/70 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-0";

function Field({
  id,
  label,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label !text-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-2 text-xs text-[#d9826b]">
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [data, setData] = useState<EnquiryData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof EnquiryData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const wa = whatsappLink();
  const waEnquiry = whatsappLink(enquiryText(data));
  const mailEnquiry = mailLink(data);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honeypot) return; // bot
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    if (site.contact.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("bad response");
        setStatus("sent");
        setData(empty);
      } catch {
        setStatus("error");
      }
    } else if (waEnquiry || mailEnquiry) {
      setStatus("ready"); // hand the finished enquiry to WhatsApp / email
    } else {
      setStatus("unconfigured");
    }
  };

  const done = status === "sent" || status === "ready" || status === "unconfigured";

  return (
    <section id="contact" className="relative bg-bg2 px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionLabel>CONTACT & BOOKING</SectionLabel>
          <SplitHeading
            className="mt-8 text-[clamp(2.8rem,6vw,6rem)]"
            lines={["LET'S MAKE", "SOMETHING", <em key="e">TIMELESS.</em>]}
          />
          <Reveal className="mt-8">
            <p className="max-w-sm font-serif text-2xl italic text-muted md:text-3xl">
              Have a beautiful story waiting to be captured? Let&apos;s talk about it.
            </p>
          </Reveal>

          <Reveal className="mt-12 space-y-4 border-t border-line pt-8">
            <a
              href={site.instagram.dm}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-sm transition-colors hover:text-accent"
            >
              <Instagram size={18} strokeWidth={1.4} /> Message {site.instagram.handle}
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm transition-colors hover:text-accent">
                <MessageCircle size={18} strokeWidth={1.4} /> WhatsApp
              </a>
            )}
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-4 text-sm transition-colors hover:text-accent">
                <Mail size={18} strokeWidth={1.4} /> {site.contact.email}
              </a>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="border border-line bg-card p-8 md:p-14"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent">
                  <Check size={24} strokeWidth={1.5} />
                </span>

                {status === "sent" && (
                  <>
                    <h3 className="display mt-8 text-4xl md:text-5xl">Thank you.</h3>
                    <p className="mt-4 max-w-md text-muted">
                      Your enquiry has been sent. We&apos;ll get back to you very soon.
                    </p>
                  </>
                )}

                {status === "ready" && (
                  <>
                    <h3 className="display mt-8 text-4xl md:text-5xl">Your enquiry is ready.</h3>
                    <p className="mt-4 max-w-md text-muted">One last step — send it through your preferred channel.</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      {waEnquiry && (
                        <Button href={waEnquiry} external variant="solid">
                          SEND VIA WHATSAPP
                        </Button>
                      )}
                      {mailEnquiry && (
                        <Button href={mailEnquiry} variant="ghost">
                          SEND VIA EMAIL
                        </Button>
                      )}
                    </div>
                  </>
                )}

                {status === "unconfigured" && (
                  <>
                    <h3 className="display mt-8 text-4xl md:text-5xl">Almost there.</h3>
                    <p className="mt-4 max-w-md text-muted">
                      Online enquiries aren&apos;t switched on yet. In the meantime, please message us on Instagram.
                    </p>
                    <div className="mt-8">
                      <Button href={site.instagram.dm} external variant="solid">
                        MESSAGE ON INSTAGRAM
                      </Button>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                  }}
                  className="mt-10 text-[0.68rem] tracking-[0.28em] text-muted underline-offset-8 hover:text-accent hover:underline"
                >
                  EDIT ENQUIRY
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
                aria-label="Enquiry form"
              >
                {/* honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>
                    Company
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                <Field id="f-name" label="FULL NAME" required error={errors.name}>
                  <input
                    id="f-name"
                    value={data.name}
                    onChange={set("name")}
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "f-name-error" : undefined}
                    className={field}
                  />
                </Field>
                <Field id="f-email" label="EMAIL ADDRESS" required error={errors.email}>
                  <input
                    id="f-email"
                    type="email"
                    value={data.email}
                    onChange={set("email")}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "f-email-error" : undefined}
                    className={field}
                  />
                </Field>
                <Field id="f-phone" label="PHONE NUMBER" error={errors.phone}>
                  <input
                    id="f-phone"
                    type="tel"
                    value={data.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    placeholder="+00 00000 00000"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "f-phone-error" : undefined}
                    className={field}
                  />
                </Field>
                <Field id="f-type" label="TYPE OF PHOTOSHOOT" required error={errors.type}>
                  <select
                    id="f-type"
                    value={data.type}
                    onChange={set("type")}
                    aria-invalid={!!errors.type}
                    aria-describedby={errors.type ? "f-type-error" : undefined}
                    className={cn(field, !data.type && "text-muted/70")}
                  >
                    <option value="" disabled>
                      Select a shoot
                    </option>
                    {site.shootTypes.map((t) => (
                      <option key={t} value={t} className="bg-card text-fg">
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="f-date" label="EVENT DATE" error={errors.date}>
                  <input
                    id="f-date"
                    type="date"
                    value={data.date}
                    onChange={set("date")}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "f-date-error" : undefined}
                    className={cn(field, !data.date && "text-muted/70")}
                  />
                </Field>
                <Field id="f-location" label="EVENT LOCATION" error={errors.location}>
                  <input
                    id="f-location"
                    value={data.location}
                    onChange={set("location")}
                    placeholder="City / venue"
                    className={field}
                  />
                </Field>
                <Field id="f-details" label="ADDITIONAL DETAILS" error={errors.details} className="sm:col-span-2">
                  <textarea
                    id="f-details"
                    rows={4}
                    value={data.details}
                    onChange={set("details")}
                    placeholder="Tell us about your story…"
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? "f-details-error" : undefined}
                    className={cn(field, "resize-none")}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Button type="submit" variant="solid" disabled={status === "sending"} className="w-full sm:w-auto">
                    {status === "sending" ? "SENDING…" : "START YOUR ENQUIRY"}
                  </Button>
                  {status === "error" && (
                    <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-[#d9826b]">
                      <AlertCircle size={15} /> Something went wrong sending your enquiry. Please try again or message us on
                      Instagram.
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
