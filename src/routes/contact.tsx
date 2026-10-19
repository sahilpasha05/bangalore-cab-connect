import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, messages } from "@/lib/whatsapp";
import { openBooking } from "@/lib/booking-dialog";
import { FaqList, HubLinks } from "@/components/site/Seo";
import { breadcrumbLd, faqLd, seoHead, type Faq } from "@/lib/seo";

const faqs: Faq[] = [
  { q: "How do I book a cab with Bangalore Cab Rental?", a: "Call +91 81472 60587, message us on WhatsApp, or use the Book Now form on this site. Share your date, pickup and drop and we confirm the vehicle and fare before you travel." },
  { q: "How early should I book?", a: "For airport and local trips, as early as you can. For outstation trips, at least 4 hours in advance is recommended, and a day or more for weekends, holidays and large groups." },
  { q: "Which areas of Bangalore do you cover?", a: "We cover all of Bangalore, including Whitefield, Electronic City, Indiranagar, Koramangala, Jayanagar, Yelahanka and the airport at Devanahalli, plus trips across Karnataka and neighbouring states." },
  { q: "Are you available on weekends and holidays?", a: "Yes. We operate 24x7, including weekends and public holidays." },
];

export const Route = createFileRoute("/contact")({
  head: () =>
    seoHead({
      title: "Contact Bangalore Cab Rental | Call, WhatsApp or Book Online",
      description: "Call +91 81472 60587, message on WhatsApp or book online. Cab, Tempo Traveller and bus rental in Bangalore, available 24x7.",
      path: "/contact",
      ld: [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), faqLd(faqs)],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="gradient-soft border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--whatsapp)" }}>Contact</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">Let's plan your trip</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">We respond to every WhatsApp message within minutes — 24 hours a day.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        {[
          { icon: MessageCircle, title: "WhatsApp", value: "+91 81472 60587", action: "Chat now", href: waLink(messages.general), highlight: true },
          { icon: Phone, title: "Call us", value: "+91 81472 60587", action: "Call now", href: "tel:+918147260587" },
          { icon: Mail, title: "Email", value: "chandrshekar45555@gmail.com", action: "Send email", href: "mailto:chandrshekar45555@gmail.com" },
          { icon: MapPin, title: "Based in", value: "Bangalore, Karnataka", action: "Service area: All of Bangalore + Karnataka" },
        ].map((c, i) => (
          <div key={c.title}
            className={`group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant animate-fade-in-up sm:p-7 ${c.highlight ? "ring-1" : ""}`}
            style={{ animationDelay: `${i * 80}ms`, ...(c.highlight ? { boxShadow: "var(--shadow-glow)" } : {}) }}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.highlight ? "gradient-cta text-whatsapp-foreground" : "gradient-hero text-primary-foreground"}`}>
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{c.value}</div>
            {c.href ? (
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-5 inline-block">
                <Button variant={c.highlight ? "default" : "outline"} className={c.highlight ? "gradient-cta border-0 text-whatsapp-foreground" : ""}>
                  {c.action}
                </Button>
              </a>
            ) : (
              <div className="mt-5 text-xs text-muted-foreground">{c.action}</div>
            )}
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">How to book</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Tell us the trip", "Share your date, pickup point, drop and number of people."],
            ["Choose a vehicle", "Innova Crysta for up to 6, Tempo Traveller for 8 to 12, buses for larger groups."],
            ["Get the fare", "We confirm the vehicle and fare before you travel."],
            ["Travel", "The driver reaches your pickup point on time and shares the trip details."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-xl border border-border/70 bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
              <div className="mt-1 font-bold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <Button size="lg" onClick={() => openBooking()} className="mt-6 h-12 gradient-cta border-0 px-8 font-semibold text-whatsapp-foreground">
          Book online
        </Button>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Areas we serve</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Pickups across Bangalore including Whitefield, Electronic City, Indiranagar, Koramangala, Jayanagar, JP Nagar, Yelahanka, Hebbal and Devanahalli (Kempegowda International Airport), and trips to Mysore, Coorg, Ooty, Chikmagalur, Tirupati, Chennai and more.
        </p>
        <div className="mt-4"><HubLinks /></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Contact questions</h2>
        <FaqList faqs={faqs} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-7">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5" style={{ color: "var(--whatsapp)" }} />
            <div className="font-semibold">Operating hours</div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">We operate 24×7, including all weekends and holidays. Outstation bookings recommended at least 4 hours in advance.</p>
        </div>
      </section>
    </>
  );
}
