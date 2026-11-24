import type { CategoryId } from "./portfolio";

/**
 * FEATURED STORIES
 * Replace titles / locations / descriptions / images with real projects.
 * `placeholder: true` shows a small "Sample" tag (see site.showPlaceholderBadges).
 */
export interface Story {
  id: string;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  location?: string;
  description: string;
  image: string;
  placeholder?: boolean;
}

export const stories: Story[] = [
  {
    id: "story-1",
    title: "A Wedding Story",
    category: "weddings",
    categoryLabel: "WEDDING",
    description:
      "From the quiet nervous minutes before the ceremony to the loudest laughter of the night — a full wedding told in frames.",
    image: "/images/stories/01.jpg",
    placeholder: true,
  },
  {
    id: "story-2",
    title: "A Pre-Wedding Story",
    category: "pre-weddings",
    categoryLabel: "PRE-WEDDING",
    description:
      "Two people, a golden hour and nowhere else to be. A pre-wedding shoot built around who you are together.",
    image: "/images/stories/02.jpg",
    placeholder: true,
  },
  {
    id: "story-3",
    title: "A Maternity Story",
    category: "maternity",
    categoryLabel: "MATERNITY",
    description:
      "The anticipation, the calm and the quiet joy of waiting — preserved before a new chapter begins.",
    image: "/images/stories/03.jpg",
    placeholder: true,
  },
];
