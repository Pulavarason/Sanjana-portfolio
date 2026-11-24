/**
 * TESTIMONIALS
 * These are clearly-marked PLACEHOLDERS – no reviews have been invented.
 * Replace each entry with a real client review (and remove `placeholder: true`).
 */
export interface Testimonial {
  quote: string;
  name: string;
  category: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: "A real client review will appear here once it is added to data/testimonials.ts.",
    name: "Client Name",
    category: "Wedding",
    placeholder: true,
  },
  {
    quote: "Add the words your clients shared about their experience — short and honest works best.",
    name: "Client Name",
    category: "Maternity",
    placeholder: true,
  },
  {
    quote: "Each testimonial shows a name and the type of shoot, so visitors see who is speaking.",
    name: "Client Name",
    category: "Pre-Wedding",
    placeholder: true,
  },
];
