/**
 * FILMS DATA
 * -----------------------------------------------------------------------------
 * Add real videos by changing `video`:
 *   { type: "youtube", id: "dQw4w9WgXcQ" }            // the ID from youtube.com/watch?v=ID
 *   { type: "vimeo",   id: "123456789" }              // the ID from vimeo.com/ID
 *   { type: "local",   src: "/videos/highlights.mp4", poster?: "/images/films/01.jpg" }
 * Put local files in /public/videos/. Videos never autoplay.
 * Replace the thumbnail in /public/images/films/ (or change `thumb`).
 */

export type FilmSource =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "local"; src: string; poster?: string }
  | { type: "none" };

export interface Film {
  id: string;
  title: string;
  kind: string;
  thumb: string;
  video: FilmSource;
}

export const films: Film[] = [
  { id: "highlights", title: "Wedding Highlights", kind: "WEDDING FILM", thumb: "/images/films/01.jpg", video: { type: "none" } },
  { id: "pre-wedding", title: "Pre-Wedding Films", kind: "PRE-WEDDING", thumb: "/images/films/02.jpg", video: { type: "none" } },
  { id: "celebrations", title: "Cinematic Celebrations", kind: "CELEBRATION", thumb: "/images/films/03.jpg", video: { type: "none" } },
  { id: "special", title: "Special Moments", kind: "SPECIAL MOMENTS", thumb: "/images/films/04.jpg", video: { type: "none" } },
];
