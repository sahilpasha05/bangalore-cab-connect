import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Clock, Star, Plane, MapPin, Car, Quote, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingBar } from "@/components/site/BookingBar";
import { VehicleCard } from "@/components/site/VehicleCard";
import { fleet } from "@/data/fleet";
import { waLink, messages } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-cab.jpg";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bangalore Cab Rental — Airport, Outstation & Local Rentals" },
      { name: "description", content: "Premium cab rental in Bangalore. Book Innova, Tempo Traveller, Sedan & Coach on WhatsApp. Trusted drivers, transparent pricing." },
      { property: "og:title", content: "Bangalore Cab Rental — Premium Booking" },
      { property: "og:description", content: "Airport transfers, outstation trips & hourly local rentals across Bangalore." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <FleetPreview />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: "oklch(0.17 0.03 250)" }}>
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Premium cab in Bangalore"
          width={1920}
          height={1080}
          className="h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.14 0.025 260 / 0.92) 0%, oklch(0.16 0.03 250 / 0.85) 55%, oklch(0.18 0.03 250 / 0.78) 100%)" }} />
        <div className="absolute inset-0 gradient-mesh opacity-90" />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 z-0 h-64 w-64 rounded-full opacity-20 blur-2xl" style={{ background: "var(--whatsapp)" }} />
      <div className="pointer-events-none absolute -right-10 top-40 z-0 h-72 w-72 rounded-full opacity-15 blur-2xl" style={{ background: "var(--gold)", animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="max-w-3xl text-primary-foreground animate-fade-in-up">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-medium leading-tight text-white sm:px-3.5 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--whatsapp)" }} />
            </span>
            Trusted by 10,000+ travellers in Bangalore
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:mt-6 sm:text-6xl lg:text-7xl">
            Premium Cab Rental
            <br />
            <span className="block pb-2 font-serif text-[1.15em] font-normal italic leading-[1.2] text-gradient-gold" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.92 0.13 90), oklch(0.78 0.15 75), oklch(0.92 0.13 90))" }}>
              in Bangalore
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            Airport Transfers, Outstation Trips & Local Rentals — booked in seconds on WhatsApp. Clean cars, professional drivers, no surprises.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <a href={waLink(messages.general)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="group relative h-12 gap-2 overflow-hidden gradient-cta border-0 px-7 text-base font-semibold text-whatsapp-foreground shadow-glow transition-smooth hover:scale-[1.03]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <MessageCircle className="h-5 w-5" />
                Book on WhatsApp
              </Button>
            </a>
            <Link to="/fleet" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-12 border-white/25 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:text-white">
                View Fleet
              </Button>
            </Link>
          </div>

          {/* Mini stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
            {[
              { n: "10K+", l: "Happy riders" },
              { n: "4.9★", l: "Average rating" },
              { n: "24×7", l: "Always available" },
            ].map((s) => (
              <div key={s.l} className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                <div className="font-serif text-2xl text-gradient-gold sm:text-3xl" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.92 0.13 90), oklch(0.78 0.15 75))" }}>{s.n}</div>
                <div className="text-[10px] uppercase tracking-wide text-white/70 sm:text-xs sm:tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <BookingBar />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: "Verified Drivers" },
    { icon: Clock, label: "24×7 Available" },
    { icon: Star, label: "4.9 Rated Service" },
    { icon: Car, label: "Sanitised Fleet" },
  ];
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
        {items.map((it) => (
          <div key={it.label} className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <it.icon className="h-4 w-4" style={{ color: "var(--whatsapp)" }} />
            {it.label}
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview() {
  const services = [
    { icon: Plane, title: "Airport Transfers", desc: "On-time pickups and drops to KIA Airport with flight tracking.", msg: messages.airport },
    { icon: MapPin, title: "Outstation Trips", desc: "Coorg, Ooty, Mysuru, Chikmagalur and more — one-way & round-trip.", msg: messages.outstation },
    { icon: Clock, title: "Local Rentals", desc: "Hourly packages for meetings, shopping or city exploration.", msg: messages.local },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading eyebrow="What we offer" title="Cab services built for Bangalore" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title}
            className="group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant animate-fade-in-up sm:p-7"
            style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-primary-foreground">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <a href={waLink(s.msg)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-smooth group-hover:gap-2.5" style={{ color: "var(--whatsapp)" }}>
              <MessageCircle className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function FleetPreview() {
  return (
    <section className="gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Our fleet" title="Pick the perfect ride" align="left" />
          <Link to="/fleet" className="text-sm font-semibold hover:underline" style={{ color: "var(--whatsapp)" }}>
            View all vehicles →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v, i) => <VehicleCard key={v.name} v={v} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { title: "Transparent Pricing", desc: "No hidden charges. Confirmed fare on WhatsApp before booking." },
    { title: "Professional Drivers", desc: "Verified, courteous and well-versed with Bangalore routes." },
    { title: "Clean & Sanitised", desc: "Every cab is deep-cleaned before each trip." },
    { title: "Instant Booking", desc: "Reach a real human on WhatsApp — no app, no signup." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading eyebrow="Why choose us" title="A better way to ride" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.title}
            className="rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant animate-fade-in-up"
            style={{ animationDelay: `${i * 70}ms` }}>
            <div className="text-3xl font-bold" style={{ color: "var(--whatsapp)" }}>0{i + 1}</div>
            <h3 className="mt-3 text-base font-semibold">{it.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const list = [
    { name: "Anjali R.", role: "Whitefield", quote: "Booked an Innova for Coorg last weekend — driver was on-time, polite and the car was spotless. Will book again." },
    { name: "Karthik M.", role: "Indiranagar", quote: "Best airport cab service in Bangalore. Fixed price on WhatsApp, no surprises. Highly recommend." },
    { name: "Priya S.", role: "Koramangala", quote: "Hired a Tempo Traveller for our team offsite. Smooth experience from booking to drop. Loved it." },
  ];
  return (
    <section className="gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="Loved by travellers across Bangalore" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {list.map((t, i) => (
            <div key={t.name}
              className="rounded-2xl border border-border/70 bg-card p-5 shadow-card animate-fade-in-up sm:p-7"
              style={{ animationDelay: `${i * 80}ms` }}>
              <Quote className="h-6 w-6" style={{ color: "var(--whatsapp)" }} />
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-hero text-sm font-semibold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" style={{ color: "var(--gold)" }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How do I book a cab?", a: "Tap any 'Book on WhatsApp' button. We'll confirm your fare and driver details within minutes." },
    { q: "Do you provide outstation cabs?", a: "Yes — Coorg, Ooty, Mysuru, Chikmagalur, Wayanad and more. Both one-way and round-trip available." },
    { q: "Are the drivers verified?", a: "All our drivers are background-verified, licensed and trained in Bangalore routes." },
    { q: "What payment methods do you accept?", a: "Cash, UPI, bank transfer and corporate billing for monthly clients." },
    { q: "Is there a cancellation fee?", a: "Free cancellation up to 2 hours before pickup for local trips. Outstation has a small driver allowance." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full rounded-2xl border border-border/70 bg-card p-5 text-left shadow-card transition-smooth hover:shadow-elegant"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-smooth ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="relative overflow-hidden rounded-[1.5rem] gradient-hero p-6 text-center text-primary-foreground shadow-elegant sm:rounded-[2rem] sm:p-16">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-25 blur-2xl animate-float" style={{ background: "var(--gold)" }} />
        <div className="absolute -left-10 bottom-0 h-64 w-64 rounded-full opacity-25 blur-2xl animate-float" style={{ background: "var(--whatsapp)", animationDelay: "1.2s" }} />
        <div className="absolute inset-0 noise opacity-[0.05] mix-blend-overlay" />
        <div className="relative">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Ready to ride? <span className="font-serif italic text-gradient-gold" style={{ backgroundImage: "linear-gradient(135deg, oklch(0.92 0.13 90), oklch(0.78 0.15 75))" }}>Let's get you moving.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">Tell us your trip on WhatsApp — we'll confirm the price and driver in minutes.</p>
        <a href={waLink(messages.general)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
          <Button size="lg" className="group relative h-12 gap-2 overflow-hidden gradient-cta border-0 px-8 text-base font-semibold text-whatsapp-foreground shadow-glow transition-smooth hover:scale-[1.03]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <MessageCircle className="h-5 w-5" />
            Book on WhatsApp
          </Button>
        </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-card ${align === "center" ? "" : ""}`} style={{ color: "var(--whatsapp)" }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--whatsapp)" }} />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}
