import { createFileRoute } from "@tanstack/react-router";
import { VehicleCard } from "@/components/site/VehicleCard";
import { fleet } from "@/data/fleet";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Our Fleet — Bangalore Cab Rental" },
      { name: "description", content: "Choose from sedans, Innova, Tempo Traveller and luxury coaches. Book on WhatsApp." },
      { property: "og:title", content: "Our Fleet — Bangalore Cab Rental" },
      { property: "og:description", content: "Sedans, Innova, Tempo Traveller and coaches for every trip." },
    ],
  }),
  component: FleetPage,
});

function FleetPage() {
  return (
    <>
      <section className="gradient-soft border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--whatsapp)" }}>Our Fleet</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">Premium cars, every category</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">From quick city sedans to large group coaches — every vehicle is well-maintained, sanitised and driver-ready.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((v, i) => <VehicleCard key={v.name} v={v} index={i} />)}
        </div>
      </section>
    </>
  );
}