# SANJUUUU — Photography & Films

Luxury wedding-photography portfolio. Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger · Lenis · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where to change things

| What | File |
| --- | --- |
| Brand text, nav, About copy, shoot types, hero location label | `config/site.ts` |
| WhatsApp / email / phone / form endpoint | `.env.local` (copy `.env.example`) or `config/site.ts` |
| Portfolio photos & categories | `data/portfolio.ts` |
| Films (YouTube / Vimeo / local) | `data/films.ts` |
| Services | `data/services.ts` |
| Featured stories | `data/stories.ts` |
| Testimonials | `data/testimonials.ts` |
| Instagram tiles | `data/instagram.ts` |
| Colours for both themes | top of `app/globals.css` |

## Replacing the placeholder photos

Every image in `public/images/` is a generated, clearly-labelled **PLACEHOLDER**. Replace them with real photographs by either:

1. Overwriting the file with the same name (e.g. `public/images/hero/hero.jpg`), or
2. Adding new files and listing them in the matching `data/*.ts` file.

```
public/images/
  hero/hero.jpg                    full-screen hero (landscape, ~2400px wide)
  about/portrait.jpg               photographer portrait (4:5)
  about/support-1.jpg, support-2.jpg
  portfolio/<category>/01.jpg …    weddings, pre-weddings, maternity, baby-stories,
                                   couple-portraits, events, bridal-portraits
  films/01–04.jpg                  film thumbnails (16:9)
  experience/moment|emotion|memory.jpg
  stories/01–03.jpg
  instagram/01–08.jpg              (4:5)
```

To add a new project, append to `projects` in `data/portfolio.ts`. The editorial layout is generated automatically. Use `focus: "50% 20%"` on a photo to keep faces in frame when it is cropped.

Next.js resizes and converts images to AVIF/WebP automatically. Originals up to ~3000px on the long edge are fine.

## Videos
Edit `data/films.ts`: `{ type: "youtube", id: "…" }`, `{ type: "vimeo", id: "…" }` or `{ type: "local", src: "/videos/name.mp4" }` (put files in `public/videos/`). Videos never autoplay.

## Enquiry form
- With `NEXT_PUBLIC_FORM_ENDPOINT` set (e.g. a Formspree URL) the form posts straight to it.
- Otherwise, with a WhatsApp number and/or email set, a valid enquiry is handed over to WhatsApp / email with the details pre-filled.
- With nothing configured, visitors are pointed to Instagram DM.

The floating button opens WhatsApp once a number is set; until then it scrolls to the form.

## Instagram
Instagram images cannot be pulled in automatically without an official API integration, so the grid is a simple list in `data/instagram.ts`. Save photos into `public/images/instagram/`.

## Notes
- Theme: saved in `localStorage` (`sanjuuuu-theme`), falls back to the system theme on first visit, applied before first paint (no flash).
- Fonts are self-hosted via Fontsource (Cormorant Garamond + DM Sans) – no external font requests.
- Set `showPlaceholderBadges: false` in `config/site.ts` once real stories/testimonials are in.
- Set `location` in `config/site.ts` (e.g. `"Chennai, India"`) only once confirmed – it adds the hero location label.
# Sanjana-portfolio
