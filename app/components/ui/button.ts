/**
 * Shared button styles. A class helper rather than a component, because the
 * same look lands on <a>, <Link> and <button>.
 *
 * primary   — the accent. One per screen: the action we actually want.
 * secondary — neutral solid, for account actions like "Sign up".
 * ghost     — text-only, for the alternative next to a primary.
 */
type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-black hover:bg-accent-hover",
  secondary: "bg-white text-black hover:bg-slate-200",
  ghost: "text-ink-soft hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-9 px-4",
  lg: "h-11 px-6",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className = ""
) {
  // Ghost buttons drop horizontal padding so they align with the text around
  // them instead of floating off by an invisible box.
  const sizeClass = variant === "ghost" ? sizes[size].split(" ")[0] : sizes[size];
  return `${base} ${variants[variant]} ${sizeClass} ${className}`.trim();
}

/** Text link with a trailing arrow that nudges on hover. Pair with <ArrowRight size={16} className={linkArrow} />. */
export const arrowLink =
  "group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover";
export const linkArrow = "transition-transform duration-150 group-hover:translate-x-0.5";
