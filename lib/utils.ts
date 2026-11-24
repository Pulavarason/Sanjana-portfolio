export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
