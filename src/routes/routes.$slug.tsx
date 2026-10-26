import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section, FaqList, TableBox, GroupGuide, HubLinks } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { openBooking } from "@/lib/booking-dialog";
import { getRoute, routes, areaDistances } from "@/data/routes";
import { vehicles, rate, inr } from "@/data/vehicles";
import { posts } from "@/data/posts";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";
import { MapPin, Clock, Route as RouteIcon, CalendarDays, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/routes/$slug")({
  loader: ({ params }) => {
    const r = getRoute(params.slug);
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => {
    const r = loaderData!;
    const path = `/routes/${r.slug}`;
    const description =
      r.kind === "airport"
        ? `Book a pre-planned Bangalore airport taxi (BLR). Sedan, Innova Crysta, Tempo Traveller and bus options, 24x7 pickups and drops. See distances and rates.`
        : `${r.title}: about ${r.km} km, ${r.hours}. Innova Crysta, Tempo Traveller, Urbania and bus rental with driver. See per-km rates, bata and a trip estimate.`;
    return seoHead({
      title: `${r.title} | Rates, Distance & Booking`,
      description,
      path,
      ld: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Routes", path: "/routes" },
          { name: r.title, path },
        ]),
        serviceLd(r.title, description, path),
        faqLd(buildFaqs(r)),
      ],
    });
  },
  component: RoutePage,
});

function buildFaqs(r: ReturnType<typeof getRoute> & {}): Faq[] {
  const innova = vehicles.find((v) => v.name === "Innova Crysta")!;
  const tt = vehicles.find((v) => v.name === "Tempo Traveller")!;
  if (r.kind === "airport") {
    return [
      { q: "How far is Bangalore airport from the city?", a: `Kempegowda International Airport is in Devanahalli, about 35 to 40 km from MG Road and up to 60 km from Electronic City. Allow ${r.hours} depending on traffic.` },
      { q: "Can I book an airport taxi at night or early morning?", a: "Yes. Airport pickups and drops are handled 24x7. Book the cab in advance and confirm the pickup time with us." },
      { q: "Which vehicle should I choose for airport transfers?", a: `An Innova Crysta (7 seats) suits families with luggage, a Tempo Traveller (12 seats) suits groups of up to 12, and our 22 to 50 seater buses suit larger groups.` },
      { q: "Which terminal will the driver pick me up from?", a: "Share your airline and flight number when you book. The driver is told the correct terminal and waits at arrivals. Bangalore airport has Terminal 1 and Terminal 2, so confirming the flight avoids confusion." },
      { q: "When should I leave for my flight?", a: `Allow the drive time of ${r.hours} plus about 2 hours before a domestic flight or 3 hours before an international flight. Add extra time in the 7 to 10 AM and 5 to 9 PM traffic windows.` },
      { q: "How much does an airport taxi cost?", a: `Cost depends on the vehicle and your pickup area. Our listed outstation rate for an Innova Crysta is ${innova.acRate} per km (AC). Call or book online and we confirm the airport fare before you travel.` },
    ];
  }
  const roundKm = r.km * 2;
  return [
    ...(r.moreFaqs ?? []),
    { q: `How far is ${r.to} from Bangalore by road?`, a: `${r.to} is about ${r.km} km from Bangalore and takes ${r.hours}, going ${r.via}. Actual time depends on traffic and halts.` },
    { q: `How much does a cab from Bangalore to ${r.to} cost?`, a: `Fares depend on the vehicle and days. An Innova Crysta is ${innova.acRate} per km (AC) with ${inr(innova.bata)} driver bata per day, so a ${roundKm} km round trip is roughly ${inr(roundKm * rate(innova.acRate) + innova.bata)}. We confirm the exact fare before you book.` },
    { q: `Which vehicle is best for a trip to ${r.to}?`, a: `Up to 6 people fit comfortably in an Innova Crysta. For 8 to 12 people choose a Tempo Traveller (${tt.acRate} per km AC) or Force Urbania. For 15 or more, a 22 to 50 seater bus is cheaper per person.` },
    { q: `What is the best time to visit ${r.to}?`, a: r.bestTime },
    { q: "What does driver bata mean?", a: "Driver bata is the daily allowance paid to the driver on outstation trips, in addition to the per-km rate. It is shown in the price table above." },
    { q: `Should I plan ${r.to} as a day trip or an overnight stay?`, a: r.km <= 150 ? `At about ${r.km} km, ${r.to} works as a one-day return trip if you start early.` : r.km <= 300 ? `At about ${r.km} km, an overnight stay is more comfortable. A same-day return leaves little time at the destination.` : `At about ${r.km} km, plan at least two days so the driver and your group are not rushed.` },
    { q: `Can I book a one-way drop to ${r.to}?`, a: `Yes, one-way drops are possible. Tell us your date and pickup point and we confirm the one-way fare. See our drop taxi page for more.` },
  ];
}

function RoutePage() {
  const r = Route.useLoaderData();
  const faqs = buildFaqs(r);
  const isAirport = r.kind === "airport";
  const others = routes.filter((x) => x.slug !== r.slug && x.kind === r.kind).slice(0, 6);
  const path = `/routes/${r.slug}`;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Routes", path: "/routes" }, { name: r.title, path }]}
        eyebrow={isAirport ? "Airport transfers" : "Outstation cab"}
        title={r.title}
        lead={r.intro}
        chips={[
          { label: isAirport ? "From city" : "Distance", value: isAirport ? `${r.km - 5} to ${r.km + 20} km` : `~${r.km} km` },
          { label: "Drive time", value: r.hours },
          { label: "Available", value: "24x7" },
          { label: "Vehicles", value: "7 to 50 seats" },
        ]}
        prefill={{ drop: r.to }}
      />

      <Section title={isAirport ? "What you get" : `What to see on a ${r.to} trip`}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {r.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--whatsapp)" }} />
              <span className="font-medium">{h}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Trip facts">
        <div className="grid gap-4 sm:grid-cols-3">
          <Fact icon={<RouteIcon className="h-5 w-5" />} label="Route" value={r.via} />
          <Fact icon={<Clock className="h-5 w-5" />} label="Drive time" value={r.hours} />
          <Fact icon={<CalendarDays className="h-5 w-5" />} label="Best time" value={r.bestTime} />
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-secondary p-4 text-sm">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--gold)" }} />
          <p><b>Tip:</b> {r.tip}</p>
        </div>
      </Section>

      {r.guide?.map((g) => (
        <Section key={g.h} title={g.h}>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">{g.p}</p>
        </Section>
      ))}

      {isAirport ? (
        <Section title="Distance from popular areas">
          <TableBox>
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-4 py-3">Pickup area</th><th className="px-4 py-3">Distance to airport</th><th className="px-4 py-3">Typical time</th></tr>
              </thead>
              <tbody>
                {areaDistances.map((a) => (
                  <tr key={a.area} className="border-t border-border/60">
                    <td className="px-4 py-3 font-medium">{a.area}</td><td className="px-4 py-3">{a.km}</td><td className="px-4 py-3">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableBox>
          <p className="mt-3 text-sm text-muted-foreground">Distances are approximate and change with the exact pickup point and traffic. Call us for the confirmed airport fare.</p>
        </Section>
      ) : (
        <Section title={`Rates for Bangalore to ${r.to}`}>
          <TableBox>
            <table className="w-full min-w-[640px] text-left text-sm tabular-nums">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Vehicle</th><th className="px-4 py-3">Seats</th><th className="px-4 py-3">AC / km</th>
                  <th className="px-4 py-3">Driver bata</th><th className="px-4 py-3">Round-trip estimate (AC)</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.slug} className="border-t border-border/60">
                    <td className="px-4 py-3 font-medium"><Link to="/vehicles/$slug" params={{ slug: v.slug }} className="hover:underline">{v.name}</Link></td>
                    <td className="px-4 py-3">{v.seats}</td>
                    <td className="px-4 py-3">{v.acRate}</td>
                    <td className="px-4 py-3">{inr(v.bata)}</td>
                    <td className="px-4 py-3 font-semibold">{inr(r.km * 2 * rate(v.acRate) + v.bata)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableBox>
          <p className="mt-3 text-sm text-muted-foreground">
            Estimate = {r.km * 2} km round trip × AC per-km rate + one day's driver bata. Tolls, parking and permits are extra and a longer stay adds bata per day. We confirm the final fare before you book.
          </p>
        </Section>
      )}

      {!isAirport && (
        <Section title={`Which vehicle for Bangalore to ${r.to}?`}>
          <GroupGuide />
        </Section>
      )}

      {isAirport && (
        <Section title="How airport pickup works">
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>Book with your date, flight number and pickup address.</li>
            <li>We confirm the vehicle and fare, and share the driver's details before the trip.</li>
            <li>The driver is at your pickup point on time, or waits at arrivals for your flight.</li>
            <li>For drops, the driver takes the airport road and stops at the departures level.</li>
          </ol>
        </Section>
      )}

      <Section title="Frequently asked questions">
        <FaqList faqs={faqs} />
      </Section>

      <Section title="Ready to go?">
        <div className="rounded-2xl gradient-hero p-6 text-white sm:p-8">
          <p className="max-w-xl text-lg font-semibold">Tell us your date and pickup point. We reply with a confirmed fare and driver details.</p>
          <Button size="lg" onClick={() => openBooking({ drop: r.to })} className="mt-5 h-12 gradient-cta border-0 px-8 font-semibold text-whatsapp-foreground shadow-glow">
            Book {isAirport ? "airport taxi" : `Bangalore to ${r.to}`}
          </Button>
        </div>
      </Section>

      {posts.filter((x) => x.route === r.slug).length > 0 && (
        <Section title="Read the guide">
          <div className="flex flex-wrap gap-2">
            {posts.filter((x) => x.route === r.slug).map((g) => (
              <Link key={g.slug} to="/blog/$slug" params={{ slug: g.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-foreground/40">{g.title}</Link>
            ))}
          </div>
        </Section>
      )}

      <Section title="Explore more">
        <HubLinks />
      </Section>

      <Section title="More routes from Bangalore">
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} to="/routes/$slug" params={{ slug: o.slug }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-smooth hover:border-foreground/40">
              {o.title}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <p className="mt-2 text-sm font-medium leading-relaxed">{value}</p>
    </div>
  );
}
