import { Link } from "@tanstack/react-router";
import { Car, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { waLink, messages } from "@/lib/whatsapp";

const nav = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-hero text-primary-foreground shadow-elegant">
            <Car className="h-5 w-5" />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full ring-2 ring-background" style={{ background: "var(--whatsapp)" }} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">Bangalore Cab Rental</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Premium Travel</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-smooth hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={waLink(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gradient-cta border-0 text-whatsapp-foreground shadow-glow transition-smooth hover:scale-[1.03]">
              <Phone className="h-4 w-4" />
              Book on WhatsApp
            </Button>
          </a>
        </div>

        <button
          aria-label="Menu"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waLink(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button className="w-full gradient-cta border-0 text-whatsapp-foreground">
                Book on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}