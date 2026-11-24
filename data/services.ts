import type { CategoryId } from "./portfolio";

export interface Service {
  number: string;
  title: string;
  line: string;
  image: string;
  /** Portfolio collection this service links to. */
  category: CategoryId;
}

export const services: Service[] = [
  { number: "01", title: "WEDDING PHOTOGRAPHY", line: "Every emotion, every ritual, every unforgettable moment.", image: "/images/portfolio/weddings/02.jpg", category: "weddings" },
  { number: "02", title: "MATERNITY PHOTOGRAPHY", line: "Celebrating the beautiful beginning of a new chapter.", image: "/images/portfolio/maternity/02.jpg", category: "maternity" },
  { number: "03", title: "BABY PHOTOGRAPHY", line: "Little moments. Endless memories.", image: "/images/portfolio/baby-stories/02.jpg", category: "baby-stories" },
  { number: "04", title: "EVENT PHOTOGRAPHY", line: "Capturing the energy, happiness and details of every celebration.", image: "/images/portfolio/events/02.jpg", category: "events" },
  { number: "05", title: "PRE-WEDDING PHOTOGRAPHY", line: "Two people. One beautiful story.", image: "/images/portfolio/pre-weddings/02.jpg", category: "pre-weddings" },
  { number: "06", title: "COUPLE & BRIDAL PORTRAITS", line: "Creating timeless portraits filled with personality and emotion.", image: "/images/portfolio/couple-portraits/02.jpg", category: "couple-portraits" },
];

export const alsoOffered = ["Wedding Cinematography", "Candid Photography", "Special Celebrations"];
