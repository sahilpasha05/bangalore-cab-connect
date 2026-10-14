import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, FaqList, RatesTable, GroupGuide, TableBox } from "@/components/site/Seo";
import { routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { breadcrumbLd, faqLd, serviceLd, seoHead, type Faq } from "@/lib/seo";

const path = "/drop-taxi-bangalore";
const innova = vehicles.find((v) => v.name === "Innova Crysta")!;

const faqs: Faq[] = [
  { q: "What is a drop taxi?", a: "A drop taxi is a one-way cab. It takes you from Bangalore to your destination and you do not keep the vehicle for the return journey. It suits airport drops, railway and bus connections, and one-way trips to another city." },
  { q: "How much does a drop taxi from Bangalore cost?", a: `The fare depends on the vehicle and the distance. Our listed rate for an Innova Crysta is ${innova.acRate} per km (AC), with driver bata of ₹${innova.bata}. Share your destination and date and we confirm the one-way fare before you book.` },
  { q: "Which cities can I take a drop taxi to from Bangalore?", a: "Popular one-way drops include Mysore, Coorg, Ooty, Chikmagalur, Tirupati, Chennai, Pondicherry, Mangalore and Coimbatore, as well as airport drops within Bangalore. Ask us for any other destination." },
  { q: "Can I book a drop taxi for a group?", a: "Yes. For 8 to 12 people choose a Tempo Traveller or Force Urbania, and for larger groups a 22 to 50 seater bus." },
  { q: "Should I book a one-way drop or a round trip?", a: "If you are leaving the destination on a different day or by a different route, a one-way drop is simpler. If you are returning to Bangalore the same trip, a round trip with the same vehicle usually makes more sense. We can quote both." },
];

export const Route = createFileRoute("/drop-taxi-bangalore")({
  head: () => {
    const description = "Book a drop taxi in Bangalore for one-way trips to Mysore, Coorg, Ooty, Chennai, Tirupati and more. Innova Crysta, Tempo Traveller and bus options with driver.";
    return seoHead({
      title: "Drop Taxi in Bangalore | One Way Cab Booking",
      description,
      path,
      ld: [
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Drop taxi", path }]),
        serviceLd("Drop taxi in Bangalore", description, path),
        faqLd(faqs),
      ],
    });
  },
  component: Page,
});

function Page() {
  const out = routes.filter((r) => r.kind === "outstation");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Drop taxi", path }]}
        eyebrow="One way cabs"
        title="Drop taxi in Bangalore"
        lead="Need a one-way cab from Bangalore? Tell us where you are going and when. We send a vehicle with a driver and confirm the fare before you travel."
        chips={[
          { label: "Trip type", value: "One way" },
          { label: "Available", value: "24x7" },
          { label: "Vehicles", value: "7 to 50 seats" },
          { label: "Fare", value: "Confirmed first" },
        ]}
      />

      <Section title="Popular one-way drops from Bangalore">
        <TableBox>
          <table className="w-full min-w-[520px] text-left text-sm tabular-nums">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">Destination</th><th className="px-4 py-3">Distance</th><th className="px-4 py-3">Drive time</th></tr>
            </thead>
            <tbody>
              {out.map((r) => (
                <tr key={r.slug} className="border-t border-border/60">
                  <td className="px-4 py-3 font-medium"><Link to="/routes/$slug" params={{ slug: r.slug }} className="hover:underline">Bangalore to {r.to}</Link></td>
                  <td className="px-4 py-3">~{r.km} km</td>
                  <td className="px-4 py-3">{r.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableBox>
        <p className="mt-3 text-sm text-muted-foreground">Distances are approximate. Ask us for the confirmed one-way fare for your date, vehicle and pickup point.</p>
      </Section>

      <Section title="Rates by vehicle"><RatesTable /></Section>
      <Section title="Which vehicle for your group?"><GroupGuide /></Section>
      <Section title="Drop taxi questions"><FaqList faqs={faqs} /></Section>
    </>
  );
}
