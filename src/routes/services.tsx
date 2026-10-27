import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, MapPin, Clock, Briefcase, Heart, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openBooking } from "@/lib/booking-dialog";
import { messages } from "@/lib/whatsapp";
import { HubLinks, FaqList, Section } from "@/components/site/Seo";
import { breadcrumbLd, faqLd, seoHead, type Faq } from "@/lib/seo";

const faqs: Faq[] = [
  { q: "Which cab services do you offer in Bangalore?", a: "We offer airport transfers, outstation trips, local hourly rentals, corporate travel, wedding and event transport, and multi-day tours. Vehicles range from sedans and Innova Crysta to Tempo Traveller, Force Urbania and 22 to 50 seater buses." },
  { q: "How do I book a cab?", a: "Send your pickup, drop, date and group size on WhatsApp or call +91 81472 60587. We confirm the vehicle and fare before you book." },
  { q: "How is the fare calculated?", a: "Outstation and drop trips are charged per km plus driver bata. Local rentals use hourly packages. Tolls, parking and state entry fees are charged on actuals. Per-km rates for every vehicle are on the fleet page." },
  { q: "Do you offer one-way drop taxis?", a: "Yes. Share your pickup and drop, and we confirm the one-way fare. See our drop taxi page for routes and rates." },
  { q: "Can I book a vehicle for a wedding or a group?", a: "Yes. For groups we suggest a Tempo Traveller, Force Urbania or a 22 to 50 seater bus. Share the date, pickup points and timings and we plan the vehicle." },
];

export const Route = createFileRoute("/services")({
  head: () =>
    seoHead({
      title: "Cab Services in Bangalore | Airport, Outstation, Local & Corporate",
      description: "Airport transfers, outstation trips, local hourly rentals, corporate travel, weddings and group tours in Bangalore. Cab, Tempo Traveller and bus with driver.",
      path: "/services",
      ld: [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]), faqLd(faqs)],
    }),
  component: ServicesPage,
});

const services = [
  { icon: Plane, title: "Airport Transfers", desc: "Pickups and drops to Kempegowda Airport. Read how fares, timing and toll work before you book.", msg: messages.airport, to: "/blog/$slug", params: { slug: "bangalore-airport-taxi-guide" }, link: "Airport taxi guide" },
  { icon: MapPin, title: "Outstation Trips", desc: "Coorg, Ooty, Mysuru, Chikmagalur, Wayanad: one-way and round-trip options with per-km rates.", msg: messages.outstation, to: "/outstation-cabs-bangalore", link: "Outstation cabs" },
  { icon: Clock, title: "Local Hourly Rentals", desc: "4hr / 8hr / 12hr packages for meetings, errands and city sightseeing, with a driver.", msg: messages.local, to: "/car-rental-with-driver-bangalore", link: "Car rental with driver" },
  { icon: Briefcase, title: "Corporate Travel", desc: "Dedicated drivers for business teams, client transfers and office outings.", msg: messages.general, to: "/fleet", link: "See the fleet" },
  { icon: Heart, title: "Wedding & Events", desc: "Cars, vans and buses for guest transfers. Tempo Traveller, Force Urbania and 22 to 50 seater buses.", msg: messages.general, to: "/mini-bus-on-rent-bangalore", link: "Mini bus on rent" },
  { icon: Calendar, title: "One-way Drop Taxi", desc: "Leaving Bangalore for another city? Book a one-way drop and confirm the fare before you go.", msg: messages.outstation, to: "/drop-taxi-bangalore", link: "Drop taxi rates" },
] as const;

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
              <Link to={s.to} params={"params" in s ? s.params : undefined} className="mt-4 text-sm font-medium underline">{s.link}</Link>
              <Button onClick={() => openBooking()} className="mt-6 w-full gradient-cta border-0 text-whatsapp-foreground shadow-glow transition-smooth group-hover:scale-[1.02]">
                  <MessageCircle className="h-4 w-4" />
                  Book Now
                </Button>
            </div>
          ))}
        </div>
      </section>
      <Section title="How booking works">
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed max-w-3xl">
          <li>Send your pickup, drop, date and group size on WhatsApp or call.</li>
          <li>We suggest the right vehicle and confirm the fare.</li>
          <li>You get the driver and vehicle details before the trip.</li>
          <li>The driver reaches your pickup point on time.</li>
        </ol>
      </Section>
      <Section title="Services questions"><FaqList faqs={faqs} /></Section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Popular pages</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Rates, distances and trip estimates for the routes and vehicles customers ask about most.</p>
        <div className="mt-4"><HubLinks /></div>
      </section>
    </>
  );
}