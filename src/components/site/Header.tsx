import { Link } from "@tanstack/react-router";
import { Car, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { openBooking } from "@/lib/booking-dialog";

const nav = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/routes", label: "Routes" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Bangalore Cab Rental home" className="flex items-center transition-smooth hover:opacity-80">
          <img src="/logo-sm.webp" alt="Bangalore Cab Rental" width={280} height={114} className="h-12 w-auto sm:h-14" />
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
          <Button onClick={() => openBooking()} className="gradient-cta border-0 text-whatsapp-foreground shadow-glow transition-smooth hover:scale-[1.03]">
              <Phone className="h-4 w-4" />
              Book Now
            </Button>
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
            <Button onClick={() => { setOpen(false); openBooking(); }} className="mt-2 w-full gradient-cta border-0 text-whatsapp-foreground">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}