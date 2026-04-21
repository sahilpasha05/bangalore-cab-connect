import { createFileRoute } from "@tanstack/react-router";
import { Plane, MapPin, Clock, Briefcase, Heart, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, messages } from "@/lib/whatsapp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Bangalore Cab Rental" },
      { name: "description", content: "Airport transfers, outstation, local rentals, corporate, weddings & events. Book on WhatsApp." },
      { property: "og:title", content: "Services — Bangalore Cab Rental" },
      { property: "og:description", content: "Cab services for every occasion across Bangalore and Karnataka." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Plane, title: "Airport Transfers", desc: "Reliable on-time pickups and drops to Kempegowda Airport with flight tracking and meet & greet.", msg: messages.airport },
  { icon: MapPin, title: "Outstation Trips", desc: "Coorg, Ooty, Mysuru, Chikmagalur, Wayanad — one-way and round-trip options at fair prices.", msg: messages.outstation },
  { icon: Clock, title: "Local Hourly Rentals", desc: "4hr / 8hr / 12hr packages for meetings, errands and city sightseeing.", msg: messages.local },
  { icon: Briefcase, title: "Corporate Travel", desc: "Monthly billing, dedicated drivers and priority dispatch for business teams.", msg: messages.general },
  { icon: Heart, title: "Wedding & Events", desc: "Decorated cars, fleet bookings and guest transfers handled end-to-end.", msg: messages.general },
  { icon: Calendar, title: "Multi-day Tours", desc: "Custom itineraries across Karnataka with experienced tour drivers.", msg: messages.outstation },
];

function ServicesPage() {
  return (
    <>
      <section className="gradient-soft border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--whatsapp)" }}>Our Services</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">Cabs for every occasion</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Whether it's a quick airport drop or a week-long Karnataka tour, we've got the right car and driver.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant animate-fade-in-up sm:p-7"
              style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href={waLink(s.msg)} target="_blank" rel="noopener noreferrer" className="mt-6">
                <Button className="w-full gradient-cta border-0 text-whatsapp-foreground shadow-glow transition-smooth group-hover:scale-[1.02]">
                  <MessageCircle className="h-4 w-4" />
                  Book on WhatsApp
                </Button>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}