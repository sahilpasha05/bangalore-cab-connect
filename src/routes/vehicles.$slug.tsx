import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Users, Gauge, UserRound } from "lucide-react";
import { PageHero, Section, FaqList, TableBox, HubLinks } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { openBooking } from "@/lib/booking-dialog";
import { getVehicle, vehicles, rate, inr } from "@/data/vehicles";
import { routes } from "@/data/routes";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";

export const Route = createFileRoute("/vehicles/$slug")({
  loader: ({ params }) => {
    const v = getVehicle(params.slug);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => {
    const v = loaderData!;
    const path = `/vehicles/${v.slug}`;
    const description = `${v.headline}. ${v.seats} seats, AC ${v.acRate} per km, non-AC ${v.nonAcRate} per km, driver bata ${inr(v.bata)}. Airport, outstation and local rentals with driver.`;
    return seoHead({
      title: v.seoTitle ?? `${v.headline} | Price per km & Booking`,
      description,
      path,
      ld: [
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Fleet", path: "/fleet" }, { name: v.name, path }]),
        serviceLd(v.headline, description, path),
        faqLd(buildFaqs(v)),
      ],
    });
  },
  component: VehiclePage,
});

type V = NonNullable<ReturnType<typeof getVehicle>>;

function buildFaqs(v: V): Faq[] {
  return [
    { q: `What is the ${v.name} rental price per km in Bangalore?`, a: `The ${v.name} is ${v.acRate} per km with AC and ${v.nonAcRate} per km without AC, plus driver bata of ${inr(v.bata)} per day on outstation trips. We confirm the exact fare before you book.` },
    { q: `How many people can sit in a ${v.name}?`, a: `The ${v.name} has ${v.seats} seats. It is best suited for ${v.group}, leaving room for luggage.` },
    { q: "What does driver bata mean?", a: "Driver bata is the daily allowance paid to the driver on outstation trips, charged in addition to the per-km rate." },
    { q: `${v.name} price in Bangalore for one day`, a: `Charges are per km plus driver bata. At ${v.acRate} per km (AC), a 250 km day trip works out to about ${inr(250 * rate(v.acRate) + v.bata)} including ${inr(v.bata)} bata, before tolls and parking. We confirm the exact fare for your date and route.` },
    { q: `AC or non-AC: which ${v.name} should I book?`, a: `AC costs ${v.acRate} per km and non-AC costs ${v.nonAcRate} per km. AC is the better choice for long highway trips and hot months, and non-AC is a lower-cost option for short city trips.` },
    { q: `Can I rent a ${v.name} for airport transfers or local use?`, a: `Yes. The ${v.name} is available for airport pickups and drops, outstation trips and local rentals in Bangalore. Share your date and pickup point and we confirm availability.` },
  ];
}

function VehiclePage() {
  const v = Route.useLoaderData();
  const path = `/vehicles/${v.slug}`;
  const popular = routes.filter((r) => r.kind === "outstation").slice(0, 6);
  const others = vehicles.filter((x) => x.slug !== v.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Fleet", path: "/fleet" }, { name: v.name, path }]}
        eyebrow="Vehicle rental"
        title={v.headline}
        lead={v.about}
        chips={[
          { label: "Seats", value: `${v.seats}` },
          { label: "AC / km", value: v.acRate },
          { label: "Non AC / km", value: v.nonAcRate },
          { label: "Driver bata", value: inr(v.bata) },
        ]}
        prefill={{ vehicle: v.name }}
      />

      <Section title="At a glance">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-[#f6f6f6] p-4">
            <img src={v.image} alt={`${v.name} for rent in Bangalore`} width={768} height={431} className="h-auto w-full object-contain" />
          </div>
          <div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <Spec icon={<Users className="h-4 w-4" />} label="Seating" value={`${v.seats} seater`} />
              <Spec icon={<UserRound className="h-4 w-4" />} label="Best for" value={v.group} />
              <Spec icon={<Gauge className="h-4 w-4" />} label="AC rate" value={`${v.acRate} / km`} />
              <Spec icon={<Gauge className="h-4 w-4" />} label="Non AC rate" value={`${v.nonAcRate} / km`} />
            </ul>
            <h3 className="mt-6 font-semibold">Ideal for</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {v.idealFor.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <Button size="lg" onClick={() => openBooking({ vehicle: v.name })} className="mt-6 h-12 gradient-cta border-0 px-8 font-semibold text-whatsapp-foreground shadow-glow">
              Book {v.name}
            </Button>
          </div>
        </div>
      </Section>

      <Section title={`${v.name} price in Bangalore`}>
        <TableBox>
          <table className="w-full min-w-[480px] text-left text-sm tabular-nums">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Option</th><th className="px-4 py-3">Rate per km</th><th className="px-4 py-3">Driver bata (per day)</th></tr>
            </thead>
            <tbody>
              <tr className="border-t border-border/60"><td className="px-4 py-3 font-medium">AC</td><td className="px-4 py-3">{v.acRate}</td><td className="px-4 py-3">{inr(v.bata)}</td></tr>
              <tr className="border-t border-border/60"><td className="px-4 py-3 font-medium">Non AC</td><td className="px-4 py-3">{v.nonAcRate}</td><td className="px-4 py-3">{inr(v.bata)}</td></tr>
            </tbody>
          </table>
        </TableBox>
        <p className="mt-3 text-sm text-muted-foreground">
          Example: a 250 km day trip in AC is about {inr(250 * rate(v.acRate) + v.bata)} including bata. Tolls, parking and permits are extra.
        </p>
      </Section>

      <Section title={`${v.name} trip estimates from Bangalore`}>
        <TableBox>
          <table className="w-full min-w-[520px] text-left text-sm tabular-nums">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Destination</th><th className="px-4 py-3">One way</th><th className="px-4 py-3">Round-trip estimate (AC)</th></tr>
            </thead>
            <tbody>
              {popular.map((r) => (
                <tr key={r.slug} className="border-t border-border/60">
                  <td className="px-4 py-3 font-medium"><Link to="/routes/$slug" params={{ slug: r.slug }} className="hover:underline">{r.to}</Link></td>
                  <td className="px-4 py-3">~{r.km} km</td>
                  <td className="px-4 py-3 font-semibold">{inr(r.km * 2 * rate(v.acRate) + v.bata)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableBox>
        <p className="mt-3 text-sm text-muted-foreground">
          Estimate = round-trip distance × AC per-km rate + one day's driver bata. Tolls, parking and permits are extra. We confirm the final fare before you book.
        </p>
      </Section>

      <Section title="Frequently asked questions">
        <FaqList faqs={buildFaqs(v)} />
      </Section>

      <Section title="Explore more">
        <HubLinks />
      </Section>

      <Section title="Other vehicles">
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} to="/vehicles/$slug" params={{ slug: o.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-smooth hover:border-foreground/40">
              {o.name} ({o.seats} seats)
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="rounded-xl border border-border/70 bg-card p-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </li>
  );
}
