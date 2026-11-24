import { cn } from "@/lib/utils";

/** Leaf-and-sun brand mark drawn as inline SVG. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-11 w-11", className)} aria-hidden>
      <circle cx="24" cy="24" r="23" className="fill-forest" />
      <circle cx="24" cy="24" r="19.5" className="fill-none stroke-agri" strokeWidth="1" opacity="0.6" />
      <path d="M24 36c0-9 3.5-15 11-18-1 8-4.5 13.5-11 18z" className="fill-agri" />
      <path d="M24 36c0-8-3-13-10-16 .8 7.5 4 12.5 10 16z" className="fill-sage" />
      <path d="M24 37V20" className="stroke-sage" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="24" cy="14" r="3.2" className="fill-earth-soft" />
    </svg>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <BrandMark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-semibold tracking-tight sm:text-lg",
            light ? "text-on-dark" : "text-deep",
          )}
        >
          Shri Sant Kashimai
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]",
            light ? "text-on-dark-muted" : "text-leaf",
          )}
        >
          Agro Farmer Producer Co.
        </span>
      </span>
    </span>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44zM12.07 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 0 1 9.88 9.9c0 5.45-4.44 9.89-9.88 9.89zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

/** Decorative wave used as a section separator. */
export function Wave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={cn("block h-12 w-full sm:h-20", className)} aria-hidden>
      <path d="M0 48c160-36 320-36 480-12s320 48 480 24 320-60 480-36v56H0z" />
    </svg>
  );
}

export function LeafDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-12 bg-agri/50" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-leaf" fill="currentColor">
        <path d="M12 21c0-7 3-12 9-14-.8 6.5-3.7 11-9 14zM12 21c0-6-2.5-10-8-12 .6 5.8 3.2 9.6 8 12z" />
      </svg>
      <span className="h-px w-12 bg-agri/50" />
    </div>
  );
}
