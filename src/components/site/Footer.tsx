import { Link } from "@tanstack/react-router";
import { Car, Mail, Phone, MapPin } from "lucide-react";
import { routes } from "@/data/routes";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-5 lg:px-8">
        <div>
          <img src="/logo.png" alt="Bangalore Cab Rental" width={720} height={288} loading="lazy" className="h-14 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Premium cab rentals across Bangalore. Airport transfers, outstation trips and local hourly rentals.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/fleet" className="hover:text-foreground">Fleet</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Services</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Airport Transfers</li>
            <li>Outstation Trips</li>
            <li>Local Rentals</li>
            <li>Corporate Travel</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Popular routes</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {routes.slice(0, 6).map((r) => (
              <li key={r.slug}>
                <Link to="/routes/$slug" params={{ slug: r.slug }} className="hover:text-foreground">{r.title}</Link>
              </li>
            ))}
            <li><Link to="/routes" className="font-medium text-foreground hover:underline">All routes</Link></li>
            <li><Link to="/drop-taxi-bangalore" className="hover:text-foreground">Drop taxi Bangalore</Link></li>
            <li><Link to="/outstation-cabs-bangalore" className="hover:text-foreground">Outstation cabs</Link></li>
            <li><Link to="/mini-bus-on-rent-bangalore" className="hover:text-foreground">Mini bus on rent</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+91 81231 40946</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>chandrshekar45555@gmail.com</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Bangalore, Karnataka</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bangalore Cab Rental. All rights reserved.
      </div>
    </footer>
  );
}
