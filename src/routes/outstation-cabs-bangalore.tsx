import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, FaqList, RatesTable, GroupGuide } from "@/components/site/Seo";
import { routes } from "@/data/routes";
import { vehicles, inr } from "@/data/vehicles";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";

const path = "/outstation-cabs-bangalore";
const innova = vehicles.find((v) => v.name === "Innova Crysta")!;

const faqs: Faq[] = [
  { q: "How do outstation cab rates work?", a: `Outstation trips are charged per km, with a driver bata per day. For example, an Innova Crysta is ${innova.acRate} per km (AC) plus ${inr(innova.bata)} bata per day. The distance for a round trip counts both ways.` },
  { q: "Which outstation destinations are most popular from Bangalore?", a: "Mysore, Coorg, Ooty, Chikmagalur, Tirupati, Chennai, Pondicherry and Wayanad are the most requested. Short day trips include Hogenakkal and Shivanasamudra." },
  { q: "Can I take a cab for multiple days?", a: "Yes. Tell us your start date, number of days and stops. We plan the vehicle and driver for the full trip and confirm the fare up front." },
  { q: "Are tolls, parking and permits included?", a: "These are normally charged separately. Ask us when you book so the full fare, including any permits or entry charges for your route, is clear before you travel." },
  { q: "Which vehicle should I choose for an outstation trip?", a: "An Innova Crysta suits up to 6 people. A Tempo Traveller or Force Urbania suits 8 to 12 people. Groups of 15 or more are better in a 22 to 50 seater bus." },
];

export const Route = createFileRoute("/outstation-cabs-bangalore")({
  head: () => {
    const description = "Outstation cabs from Bangalore to Mysore, Coorg, Ooty, Chikmagalur, Tirupati, Chennai, Goa and more. Innova Crysta, Tempo Traveller and bus rentals with per-km rates and driver bata.";
    return seoHead({
      title: "Outstation Cabs from Bangalore | Rates & Routes",
      description,
      path,
      ld: [
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Outstation cabs", path }]),
        serviceLd("Outstation cabs from Bangalore", description, path),
        faqLd(faqs),
      ],
    });
  },
  component: Page,
});

function Page() {
  const out = routes.filter((r) => r.kind === "outstation");
  const groups = [
    { title: "Day trips (up to 150 km)", list: out.filter((r) => r.km <= 150) },
    { title: "Weekend trips (150 to 300 km)", list: out.filter((r) => r.km > 150 && r.km <= 300) },
    { title: "Long trips (300 km and above)", list: out.filter((r) => r.km > 300) },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Outstation cabs", path }]}
        eyebrow="Outstation"
        title="Outstation cabs from Bangalore"
        lead="Pick a destination, a vehicle and your dates. Every trip has a driver who knows the route, and the fare is confirmed before you travel."
        chips={[
          { label: "Destinations", value: `${out.length}+` },
          { label: "Pricing", value: "Per km + bata" },
          { label: "Available", value: "24x7" },
          { label: "Vehicles", value: "7 to 50 seats" },
        ]}
      />

      {groups.map((g) => (
        <Section key={g.title} title={g.title}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.list.map((r) => (
              <Link key={r.slug} to="/routes/$slug" params={{ slug: r.slug }} className="rounded-xl border border-border/70 bg-card p-4 transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">~{r.km} km · {r.hours}</div>
                <div className="mt-1 font-bold">{r.title}</div>
              </Link>
            ))}
          </div>
        </Section>
      ))}

      <Section title="Outstation rates by vehicle"><RatesTable /></Section>
      <Section title="Which vehicle for your group?"><GroupGuide /></Section>
      <Section title="Outstation cab questions"><FaqList faqs={faqs} /></Section>
    </>
  );
}
