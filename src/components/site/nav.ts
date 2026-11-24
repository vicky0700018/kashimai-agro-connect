export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/activities", label: "Activities" },
  { to: "/products", label: "Agro Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
] as const;

/** Public pages that open with a dark photo banner (header starts transparent there). */
export const HERO_PATHS: string[] = NAV_ITEMS.map((n) => n.to);
