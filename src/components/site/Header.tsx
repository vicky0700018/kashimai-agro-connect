import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, Menu, MapPin, Phone, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Brand";
import { useAppData } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEnquiry } from "./enquiry";
import { HERO_PATHS, NAV_ITEMS } from "./nav";

export function Header() {
  const { settings } = useAppData();
  const { openEnquiry } = useEnquiry();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const solid = scrolled || !HERO_PATHS.includes(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "hidden overflow-hidden bg-deep text-on-dark-muted transition-all duration-500 lg:block",
          solid ? "max-h-0" : "max-h-12",
        )}
      >
        <div className="container-site flex items-center justify-between py-2.5 text-xs font-medium">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-agri" /> Ahmedpur, Latur, Maharashtra
          </span>
          <span className="flex items-center gap-6">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 transition hover:text-on-dark">
              <Phone className="h-3.5 w-3.5 text-agri" /> {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 transition hover:text-on-dark">
              <Mail className="h-3.5 w-3.5 text-agri" /> {settings.email}
            </a>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-500",
          solid ? "bg-card/95 shadow-soft backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <Link to="/" aria-label="Home">
            <Logo light={!solid} />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition",
                  solid ? "text-foreground hover:text-forest" : "text-on-dark/90 hover:text-on-dark",
                  "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-agri after:transition-transform hover:after:scale-x-100",
                  "data-[status=active]:after:scale-x-100",
                  solid ? "data-[status=active]:text-forest" : "data-[status=active]:text-on-dark",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openEnquiry()}
              className={cn("btn btn-sm hidden sm:inline-flex", solid ? "btn-primary" : "btn-leaf")}
            >
              Enquire Now <ArrowRight className="h-4 w-4" />
            </button>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "rounded-full p-2.5 transition xl:hidden",
                solid ? "text-deep hover:bg-sage" : "text-on-dark hover:bg-on-dark/10",
              )}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-[4.5rem] z-40 bg-deep/60 backdrop-blur-sm transition-opacity xl:hidden lg:top-20",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "ml-auto flex h-full w-full max-w-sm flex-col bg-cream px-6 py-8 shadow-lift transition-transform duration-500",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                className="flex items-center justify-between border-b py-4 font-display text-2xl text-deep transition data-[status=active]:text-leaf"
              >
                {item.label}
                <ArrowRight className="h-5 w-5 opacity-40" />
              </Link>
            ))}
          </nav>
          <button onClick={() => openEnquiry()} className="btn btn-primary mt-8 w-full">
            Enquire Now
          </button>
          <div className="mt-auto space-y-3 pt-8 text-sm text-muted-foreground">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-leaf" /> {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-leaf" /> {settings.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
