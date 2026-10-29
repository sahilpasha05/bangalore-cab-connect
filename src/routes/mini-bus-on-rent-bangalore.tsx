import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, FaqList, RatesTable, TableBox } from "@/components/site/Seo";
import { vehicles, inr, rate } from "@/data/vehicles";
import { getRoute } from "@/data/routes";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";

const path = "/mini-bus-on-rent-bangalore";
const buses = vehicles.filter((v) => v.seats >= 22);
const small = buses[0];
const big = buses[buses.length - 1];
const sample = buses.filter((b) => b.seats === 22 || b.seats === 25);
const sampleRoutes = ["bangalore-to-mysore-cab", "bangalore-to-coorg-cab", "bangalore-to-ooty-cab", "bangalore-to-tirupati-cab"].map((s) => getRoute(s)!);

const faqs: Faq[] = [
  { q: "How much does a mini bus on rent in Bangalore cost?", a: `Our ${small.name} mini bus is ${small.acRate} per km (AC) and ${small.nonAcRate} per km (non-AC), with ${inr(small.bata)} driver bata. The ${big.name} is ${big.acRate} per km (AC) with ${inr(big.bata)} bata. We confirm the exact fare for your trip before you book.` },
  { q: "What sizes of mini bus and coach are available?", a: `We offer ${buses.map((b) => b.seats).join(", ")} seater buses, plus 12 seater Tempo Traveller and Force Urbania vans for smaller groups.` },
  { q: "Which bus is right for my group?", a: "Choose a seat count slightly above your group size so there is space for luggage and a comfortable ride. For 15 to 22 people a 22 seater works, and for 40 or more a 45 or 50 seater is the better fit." },
  { q: "Can I hire a bus for a wedding or a corporate outing?", a: "Yes. Buses are commonly used for wedding guest transfers, office outings, college trips and pilgrimages. Share the date, pickup points and timings and we plan the vehicle." },
  { q: "Mini bus or Tempo Traveller: which is better?", a: "A Tempo Traveller seats about 12 and suits smaller groups. A mini bus of 22 or 25 seats suits larger groups, and is usually cheaper per person once you have more than 13 or 14 people." },
  { q: "Can the bus be booked for a one-way trip?", a: "Yes. Share your pickup and drop, and we confirm the one-way fare. One-way trips are quoted differently from round trips." },
  { q: "Are tolls and parking included in the rate?", a: "No. Tolls, parking and state entry fees are charged on actuals, in addition to the per-km rate and driver bata." },
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

      <Section title="Sample day-trip fares (22 and 25 seater)">
        <TableBox>
          <table className="w-full min-w-[520px] text-left text-sm tabular-nums">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Trip</th><th className="px-4 py-3">Round trip</th>{sample.map((b) => <th key={b.slug} className="px-4 py-3">{b.name}</th>)}</tr>
            </thead>
            <tbody>
              {sampleRoutes.map((r) => (
                <tr key={r.slug} className="border-t border-border/60">
                  <td className="px-4 py-3 font-medium">Bangalore to {r.to}</td>
                  <td className="px-4 py-3">{r.km * 2} km</td>
                  {sample.map((b) => <td key={b.slug} className="px-4 py-3 font-semibold">{inr(r.km * 2 * rate(b.acRate) + b.bata)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </TableBox>
        <p className="mt-3 text-sm text-muted-foreground">Estimate = round-trip km × AC per-km rate + one day of driver bata. Tolls, parking and a longer stay are extra. We confirm the final fare before you book.</p>
      </Section>

      <Section title="How to choose the right bus size">
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground max-w-3xl">
          <p>Count everyone travelling, then add a few seats of buffer so there is room for bags and a comfortable ride. A 22 seater suits groups of 15 to 22, and a 25 seater suits 18 to 25. Larger groups can look at 33, 40, 45 or 50 seaters.</p>
          <p>For 8 to 12 people a Tempo Traveller or Force Urbania is usually the better fit, since a bus would run mostly empty. If your group is 13 to 14, a 22 seater is normally simpler than two vehicles.</p>
          <p>For a detailed fare comparison, read our <Link to="/blog/$slug" params={{ slug: "22-seater-25-seater-bus-rent-bangalore-price" }} className="font-medium underline">22 and 25 seater bus price guide</Link>. To see what a bus costs for a full day at 100, 150 or 250 km, read <Link to="/blog/$slug" params={{ slug: "bus-on-rent-in-bangalore-per-day-rate" }} className="font-medium underline">bus on rent in Bangalore per day</Link>.</p>
        </div>
      </Section>

      <Section title="How to book a bus">
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed max-w-3xl">
          <li>Send your date, pickup point, destination and group size on WhatsApp or call.</li>
          <li>We suggest the right size and confirm the fare and availability.</li>
          <li>You get the vehicle and driver details before the trip.</li>
          <li>The bus reaches your pickup point on time, and you pay as agreed with us.</li>
        </ol>
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
