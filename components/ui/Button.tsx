"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost" | "hero-solid" | "hero-ghost";

const variants: Record<Variant, string> = {
  solid: "bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-bg)] hover:bg-[var(--btn-hover)]",
  ghost: "border border-[var(--line-strong)] text-fg hover:border-accent hover:text-accent",
  "hero-solid": "bg-cream text-[#111110] border border-cream hover:bg-accent hover:border-accent",
  "hero-ghost": "border border-[rgba(245,240,232,0.45)] text-cream hover:border-cream hover:bg-[rgba(245,240,232,0.1)]",
};

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  href?: string;
  external?: boolean;
  arrow?: boolean;
}

/** Pill-less editorial button with an arrow micro-interaction. Renders <a> when href is given. */
export default function Button({
  variant = "solid",
  href,
  external,
  arrow = true,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-3 px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.25em] transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          size={15}
          strokeWidth={1.5}
          className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={rest.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
