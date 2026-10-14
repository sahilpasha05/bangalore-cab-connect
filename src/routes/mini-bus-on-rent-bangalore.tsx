import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, FaqList, RatesTable } from "@/components/site/Seo";
import { vehicles, inr } from "@/data/vehicles";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";

const path = "/mini-bus-on-rent-bangalore";
const buses = vehicles.filter((v) => v.seats >= 22);
const small = buses[0];
const big = buses[buses.length - 1];

const faqs: Faq[] = [
  { q: "How much does a mini bus on rent in Bangalore cost?", a: `Our ${small.name} mini bus is ${small.acRate} per km (AC) and ${small.nonAcRate} per km (non-AC), with ${inr(small.bata)} driver bata. The ${big.name} is ${big.acRate} per km (AC) with ${inr(big.bata)} bata. We confirm the exact fare for your trip before you book.` },
  { q: "What sizes of mini bus and coach are available?", a: `We offer ${buses.map((b) => b.seats).join(", ")} seater buses, plus 12 seater Tempo Traveller and Force Urbania vans for smaller groups.` },
  { q: "Which bus is right for my group?", a: "Choose a seat count slightly above your group size so there is space for luggage and a comfortable ride. For 15 to 22 people a 22 seater works, and for 40 or more a 45 or 50 seater is the better fit." },
  { q: "Can I hire a bus for a wedding or a corporate outing?", a: "Yes. Buses are commonly used for wedding guest transfers, office outings, college trips and pilgrimages. Share the date, pickup points and timings and we plan the vehicle." },
  { q: "Is AC available in all buses?", a: "Rates are listed for both AC and non-AC. Tell us which you prefer when you enquire and we confirm what is available for your date." },
];

export const Route = createFileRoute("/mini-bus-on-rent-bangalore")({
  head: () => {
    const description = `Mini bus and coach on rent in Bangalore: ${buses.map((b) => b.seats).join(", ")} seaters with driver. Per-km rates for weddings, corporate outings, college trips and pilgrimages.`;
    return seoHead({
      title: "Mini Bus on Rent in Bangalore | 22 to 50 Seater Rates",
      description,
      path,
      ld: [
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Mini bus on rent", path }]),
        serviceLd("Mini bus on rent in Bangalore", description, path),
        faqLd(faqs),
      ],
    });
  },
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Mini bus on rent", path }]}
        eyebrow="Group transport"
        title="Mini bus on rent in Bangalore"
        lead="One vehicle, one driver and one contact for your whole group. Choose from 22 to 50 seater buses for weddings, corporate outings, college tours and pilgrimages."
        chips={[
          { label: "Seat options", value: `${small.seats} to ${big.seats}` },
          { label: "Starting AC rate", value: `${small.acRate} / km` },
          { label: "Pricing", value: "Per km + bata" },
          { label: "Available", value: "24x7" },
        ]}
        prefill={{ vehicle: small.name }}
      />

      <Section title="Bus sizes and rates"><RatesTable list={buses} /></Section>

      <Section title="What groups use a bus for">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Wedding and function guest transfers",
            "Corporate outings and offsites",
            "School, college and university tours",
            "Temple and pilgrimage trips",
            "Airport and railway group transfers",
            "Event and conference shuttles",
          ].map((u) => (
            <div key={u} className="rounded-xl border border-border/70 bg-card p-4 font-medium">{u}</div>
          ))}
        </div>
      </Section>

      <Section title="Individual vehicle pages">
        <div className="flex flex-wrap gap-2">
          {buses.map((b) => (
            <Link key={b.slug} to="/vehicles/$slug" params={{ slug: b.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-smooth hover:border-foreground/40">
              {b.name} ({b.seats} seats)
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Mini bus questions"><FaqList faqs={faqs} /></Section>
    </>
  );
}
