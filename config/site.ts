/**
 * CENTRAL SITE CONFIGURATION
 * Everything personal / editable lives here (or in /data). Nothing below is
 * invented: contact details are empty until you provide them.
 */

export const site = {
  name: "SANJUUUU",
  subtitle: "PHOTOGRAPHY & FILMS",
  title: "SANJUUUU — Photography & Films",
  description:
    "Luxury wedding photography and cinematic films. Weddings, pre-weddings, maternity, baby stories, couple portraits, bridal portraits and celebrations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  instagram: {
    handle: "@visheshaphotography",
    url: "https://www.instagram.com/visheshaphotography/",
    dm: "https://ig.me/m/visheshaphotography",
  },

  /** Fill these in via .env.local (see .env.example) or type them directly here. */
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // digits only, with country code
    email: process.env.NEXT_PUBLIC_EMAIL ?? "",
    phone: process.env.NEXT_PUBLIC_PHONE ?? "",
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "", // optional (e.g. Formspree)
  },

  /** Set to e.g. "Chennai, India" ONLY once confirmed – shows a floating label in the hero. */
  location: null as string | null,

  /** Shows a small "Placeholder" tag on sample stories / testimonials. Set false when real content is in. */
  showPlaceholderBadges: true,

  brandStatement: "EVERY FRAME HOLDS A FEELING.",
  brandSupport:
    "We capture the moments you live, the emotions you feel, and the memories you will cherish forever.",
  tagline: "Turning fleeting moments into forever memories.",

  nav: [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "films", label: "FILMS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "contact", label: "CONTACT" },
  ],

  /** About section – fully editable. No qualifications / awards / background are claimed. */
  about: {
    portrait: "/images/about/portrait.jpg",
    support: ["/images/about/support-1.jpg", "/images/about/support-2.jpg"],
    paragraphs: [
      "Behind every beautiful photograph is an eye that sees beyond the obvious.",
      "For me, photography is about emotions, genuine connections and the little details that make every story unique.",
      "Whether it's the joy of a wedding, the anticipation of motherhood or the innocence of a newborn, every moment deserves to be remembered beautifully.",
    ],
    philosophy: "Every frame holds a feeling.",
    approach: [
      { title: "Emotion first", text: "Real feeling over perfect posing." },
      { title: "The little details", text: "The small things that make a story yours." },
      { title: "Timeless frames", text: "Images that feel as true in twenty years as today." },
    ],
  },

  shootTypes: [
    "Wedding Photography",
    "Wedding Cinematography",
    "Pre-Wedding Shoot",
    "Maternity Shoot",
    "Baby Shoot",
    "Couple Shoot",
    "Bridal Portraits",
    "Event Photography",
    "Candid Photography",
    "Special Celebration",
  ],
} as const;

export type SiteConfig = typeof site;
