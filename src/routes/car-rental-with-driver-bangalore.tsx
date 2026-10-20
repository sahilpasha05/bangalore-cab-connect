import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, FaqList, RatesTable, GroupGuide, HubLinks } from "@/components/site/Seo";
import { vehicles } from "@/data/vehicles";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";

const path = "/car-rental-with-driver-bangalore";
const innova = vehicles.find((v) => v.name === "Innova Crysta")!;

const faqs: Faq[] = [
  { q: "What does car rental with driver mean?", a: "You rent a car and a professional driver together. The driver handles the driving, the route and parking, so you can relax, work or sightsee. It is different from self-drive, where you drive the car yourself." },
  { q: "How much does car rental with driver cost in Bangalore?", a: `The price depends on the vehicle, the distance and the number of days. Our listed rate for an Innova Crysta is ${innova.acRate} per km (AC), with driver bata of ₹${innova.bata} per day. Tell us your plan and we confirm the fare before you book.` },
  { q: "Which vehicles can I rent with a driver?", a: "Innova Crysta for families of up to 6, Tempo Traveller and Force Urbania for 8 to 12 people, and 22 to 50 seater buses for larger groups." },
  { q: "Can I rent a car with driver for local use in Bangalore?", a: "Yes. Ask us for local use, such as a day of meetings, shopping or sightseeing. We confirm the arrangement and fare for your plan before you book." },
  { q: "Can I take the car outside Bangalore?", a: "Yes. Outstation trips to Mysore, Coorg, Ooty, Chikmagalur, Tirupati, Chennai and more are our most common bookings. The fare is based on the round-trip distance plus driver bata for each day." },
  { q: "What is not included in the rental?", a: "Tolls, parking and any state entry fees are charged on actuals and are not part of the per-km rate. We tell you what to expect for your route before you book." },
  { q: "How do I book?", a: "Call or WhatsApp +91 81472 60587, or use the Book Now form on this site. Share the date, pickup point, destination and group size, and we confirm the vehicle and fare." },
];

const uses = [
  "Airport pickups and drops at any hour",
  "Outstation trips with family or friends",
  "Business meetings and corporate travel",
  "Weddings and function transport for guests",
  "Temple and pilgrimage tours",
  "Full-day sightseeing with a local driver",
];

export const Route = createFileRoute("/car-rental-with-driver-bangalore")({
  head: () => {
    const description = "Car rental with driver in Bangalore for airport, local, outstation and group trips. Innova Crysta, Tempo Traveller and bus options with per-km rates. Call or book online.";
    return seoHead({
      title: "Car Rental with Driver in Bangalore | Rates and Booking",
      description,
      path,
      ld: [
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Car rental with driver", path }]),
        serviceLd("Car rental with driver in Bangalore", description, path),
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
        crumbs={[{ name: "Home", path: "/" }, { name: "Car rental with driver", path }]}
        eyebrow="Cars with professional drivers"
        title="Car rental with driver in Bangalore"
        lead="Rent a car with an experienced driver for the airport, a day around the city or an outstation trip. Tell us your plan and we confirm the vehicle and fare before you travel."
        chips={[
          { label: "Driver", value: "Included" },
          { label: "Available", value: "24x7" },
          { label: "Vehicles", value: "7 to 50 seats" },
          { label: "Fare", value: "Confirmed first" },
        ]}
      />

      <Section title="When people rent a car with a driver">
        <ul className="grid gap-2 sm:grid-cols-2">
          {uses.map((u) => (
            <li key={u} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">{u}</li>
          ))}
        </ul>
      </Section>

      <Section title="Car rental rates by vehicle"><RatesTable /></Section>
      <p className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground">Rates are per km, plus driver bata for each day. Tolls, parking and entry fees are extra. Outstation fares are based on the full round-trip distance. See <Link to="/outstation-cabs-bangalore" className="underline">outstation cabs</Link> and <Link to="/drop-taxi-bangalore" className="underline">drop taxi</Link> for trip-specific pricing.</p>

      <Section title="Which vehicle for your group?"><GroupGuide /></Section>

      <Section title="How booking works">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>Send your date, pickup point, destination and group size by call, WhatsApp or the booking form.</li>
          <li>We suggest the right vehicle and confirm the fare before you commit.</li>
          <li>The driver arrives at the agreed time, and you pay as agreed at booking.</li>
        </ol>
      </Section>

      <Section title="Explore more"><HubLinks /></Section>
      <Section title="Car rental with driver questions"><FaqList faqs={faqs} /></Section>
    </>
  );
}
