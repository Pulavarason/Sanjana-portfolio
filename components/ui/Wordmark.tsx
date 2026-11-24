import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** SANJUUUU / PHOTOGRAPHY & FILMS */
export default function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const main = { sm: "text-xl", md: "text-2xl", lg: "text-5xl md:text-7xl" }[size];
  const sub = { sm: "text-[0.5rem]", md: "text-[0.55rem]", lg: "text-[0.65rem]" }[size];
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("font-serif font-light tracking-[0.2em]", main)}>{site.name}</span>
      <span className={cn("mt-1.5 font-sans font-medium uppercase tracking-[0.42em] opacity-70", sub)}>
        {site.subtitle}
      </span>
    </span>
  );
}
