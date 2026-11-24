import { site } from "@/config/site";

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  type: string;
  date: string;
  location: string;
  details: string;
}

export function enquiryText(d: EnquiryData) {
  const lines: Array<string | null> = [
    `Hello ${site.name}! I'd like to enquire about a shoot.`,
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Type of shoot: ${d.type}`,
    d.date ? `Event date: ${d.date}` : null,
    d.location ? `Location: ${d.location}` : null,
    d.details ? `Details: ${d.details}` : null,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export const digits = (s: string) => s.replace(/\D/g, "");

export function whatsappLink(text?: string) {
  const n = digits(site.contact.whatsapp);
  if (!n) return null;
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function mailLink(d?: EnquiryData) {
  if (!site.contact.email) return null;
  if (!d) return `mailto:${site.contact.email}`;
  const subject = `Enquiry — ${d.type}`;
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryText(d))}`;
}
