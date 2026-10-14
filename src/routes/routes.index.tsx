import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plane, MapPin } from "lucide-react";
import { PageHero, Section } from "@/components/site/Seo";
import { routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { breadcrumbLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/routes/")({
  head: () =>
    seoHead({
      title: "Outstation Cab Routes from Bangalore | Distance & Rates",
      description:
        "Cab and tempo traveller rates from Bangalore to Mysore, Coorg, Ooty, Chikmagalur, Tirupati, Chennai, Pondicherry, Goa, Hampi and Wayanad, plus airport taxi.",
      path: "/routes",
      ld: [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Routes", path: "/routes" }])],
    }),
  component: RoutesIndex,
});

function RoutesIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Routes", path: "/routes" }]}
        eyebrow="Routes"
        title="Cab routes from Bangalore"
        lead="Pick your destination to see the distance, drive time, per-km rates and a trip estimate for every vehicle in our fleet."
      />
      <Section title="Destinations">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Link key={r.slug} to="/routes/$slug" params={{ slug: r.slug }} className="group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {r.kind === "airport" ? <Plane className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {r.kind === "airport" ? "Airport" : `~${r.km} km`}
              </div>
              <h3 className="mt-2 text-lg font-bold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.hours}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--whatsapp)" }}>
                View rates <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Vehicles">
        <div className="flex flex-wrap gap-2">
          {vehicles.map((v) => (
            <Link key={v.slug} to="/vehicles/$slug" params={{ slug: v.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-smooth hover:border-foreground/40">
              {v.name} ({v.seats} seats)
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
