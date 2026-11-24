/**
 * PORTFOLIO DATA
 * -----------------------------------------------------------------------------
 * To add real work: drop photos into /public/images/portfolio/<category>/ and
 * list them in a project below (or add a whole new project). No component needs
 * to change – layouts are generated automatically from this list.
 *
 * Right now each category uses generated PLACEHOLDER images (01–04.jpg).
 * Overwrite those files with real photographs, or replace `placeholders(...)`
 * with explicit `{ src, alt }` entries.
 */

export type CategoryId =
  | "weddings"
  | "pre-weddings"
  | "maternity"
  | "baby-stories"
  | "couple-portraits"
  | "events"
  | "bridal-portraits";

export interface Photo {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "50% 20%" to keep faces in frame when cropped. */
  focus?: string;
}

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  location?: string;
  photos: Photo[];
}

export interface Category {
  id: CategoryId;
  number: string;
  label: string;
}

export const categories: Category[] = [
  { id: "weddings", number: "01", label: "WEDDINGS" },
  { id: "pre-weddings", number: "02", label: "PRE-WEDDINGS" },
  { id: "maternity", number: "03", label: "MATERNITY" },
  { id: "baby-stories", number: "04", label: "BABY STORIES" },
  { id: "couple-portraits", number: "05", label: "COUPLE PORTRAITS" },
  { id: "events", number: "06", label: "EVENTS" },
  { id: "bridal-portraits", number: "07", label: "BRIDAL PORTRAITS" },
];

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id;

// --- helper for the generated placeholder files ------------------------------
const placeholders = (cat: CategoryId, label: string, count = 4): Photo[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/images/portfolio/${cat}/${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${label} — photograph ${i + 1}`,
  }));

export const projects: Project[] = [
  { id: "weddings-1", title: "Wedding Collection", category: "weddings", photos: placeholders("weddings", "Wedding") },
  { id: "pre-weddings-1", title: "Pre-Wedding Collection", category: "pre-weddings", photos: placeholders("pre-weddings", "Pre-wedding") },
  { id: "maternity-1", title: "Maternity Collection", category: "maternity", photos: placeholders("maternity", "Maternity") },
  { id: "baby-stories-1", title: "Baby Stories", category: "baby-stories", photos: placeholders("baby-stories", "Baby story") },
  { id: "couple-portraits-1", title: "Couple Portraits", category: "couple-portraits", photos: placeholders("couple-portraits", "Couple portrait") },
  { id: "events-1", title: "Celebrations & Events", category: "events", photos: placeholders("events", "Event") },
  { id: "bridal-portraits-1", title: "Bridal Portraits", category: "bridal-portraits", photos: placeholders("bridal-portraits", "Bridal portrait") },
];

export interface GalleryItem extends Photo {
  title: string;
  category: CategoryId;
  location?: string;
}

/** Flattened list used by the gallery + lightbox. */
export const galleryItems: GalleryItem[] = categories.flatMap((c) =>
  projects
    .filter((p) => p.category === c.id)
    .flatMap((p) =>
      p.photos.map((ph) => ({ ...ph, title: p.title, category: p.category, location: p.location })),
    ),
);
