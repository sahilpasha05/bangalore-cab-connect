import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, messages } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bangalore Cab Rental" },
      { name: "description", content: "Get in touch with Bangalore Cab Rental. Call, email or WhatsApp us — 24×7." },
      { property: "og:title", content: "Contact — Bangalore Cab Rental" },
      { property: "og:description", content: "Reach us 24×7 on WhatsApp, phone or email." },
    ],
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
          { icon: MessageCircle, title: "WhatsApp", value: "+91 81231 40946", action: "Chat now", href: waLink(messages.general), highlight: true },
          { icon: Phone, title: "Call us", value: "+91 81231 40946", action: "Call now", href: "tel:+918123140946" },
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
