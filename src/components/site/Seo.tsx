import { Link } from "@tanstack/react-router";
import { ChevronRight, Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { openBooking, type BookingPrefill } from "@/lib/booking-dialog";
import { callLink } from "@/lib/whatsapp";
import type { Crumb, Faq } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {i < items.length - 1 ? (
              <Link to={c.path} className="hover:text-white hover:underline">{c.name}</Link>
            ) : (
              <span className="text-white">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ crumbs, eyebrow, title, lead, chips, prefill }: {
  crumbs: Crumb[]; eyebrow: string; title: string; lead: string;
  chips?: { label: string; value: string }[]; prefill?: BookingPrefill;
}) {
  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      <div className="absolute inset-0 gradient-mesh opacity-80" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</div>
        <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{lead}</p>
        {chips && (
          <dl className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {chips.map((c) => (
              <div key={c.label} className="rounded-xl glass px-3 py-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{c.label}</dt>
                <dd className="text-sm font-bold sm:text-base">{c.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => openBooking(prefill)} className="h-12 gap-2 gradient-cta border-0 px-7 text-base font-semibold text-whatsapp-foreground shadow-glow">
            <CalendarCheck className="h-5 w-5" /> Book this trip
          </Button>
          <a href={callLink()}>
            <Button size="lg" variant="outline" className="h-12 w-full gap-2 border-white/25 bg-white/5 px-7 text-base font-semibold text-white hover:bg-white/15 hover:text-white">
              <Phone className="h-5 w-5" /> Call +91 81472 60587
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-2xl border border-border/70 bg-card px-5">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`}>
          <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function TableBox({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card">{children}</div>;
}

import { Link as RouterLink } from "@tanstack/react-router";
import { vehicles as allVehicles, inr } from "@/data/vehicles";

export function RatesTable({ list = allVehicles }: { list?: typeof allVehicles }) {
  return (
    <TableBox>
      <table className="w-full min-w-[600px] text-left text-sm tabular-nums">
        <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Vehicle</th><th className="px-4 py-3">Seats</th>
            <th className="px-4 py-3">AC / km</th><th className="px-4 py-3">Non AC / km</th><th className="px-4 py-3">Driver bata</th>
          </tr>
        </thead>
        <tbody>
          {list.map((v) => (
            <tr key={v.slug} className="border-t border-border/60">
              <td className="px-4 py-3 font-medium">
                <RouterLink to="/vehicles/$slug" params={{ slug: v.slug }} className="hover:underline">{v.name}</RouterLink>
              </td>
              <td className="px-4 py-3">{v.seats}</td>
              <td className="px-4 py-3">{v.acRate}</td>
              <td className="px-4 py-3">{v.nonAcRate}</td>
              <td className="px-4 py-3">{inr(v.bata)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableBox>
  );
}

export function GroupGuide() {
  const rows = [
    { who: "1 to 4 people", pick: "Innova Crysta", slug: "innova-crysta-on-rent-bangalore" },
    { who: "5 to 6 people (with luggage)", pick: "Innova Crysta", slug: "innova-crysta-on-rent-bangalore" },
    { who: "8 to 12 people", pick: "Tempo Traveller or Force Urbania", slug: "tempo-traveller-on-rent-bangalore" },
    { who: "15 to 22 people", pick: "22 Seater mini bus", slug: "22-seater-on-rent-bangalore" },
    { who: "25 to 33 people", pick: "25 or 33 Seater bus", slug: "33-seater-on-rent-bangalore" },
    { who: "35 to 50 people", pick: "40, 45 or 50 Seater bus", slug: "45-seater-on-rent-bangalore" },
  ];
  return (
    <TableBox>
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
          <tr><th className="px-4 py-3">Group size</th><th className="px-4 py-3">Best vehicle</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.who} className="border-t border-border/60">
              <td className="px-4 py-3 font-medium">{r.who}</td>
              <td className="px-4 py-3">
                <RouterLink to="/vehicles/$slug" params={{ slug: r.slug }} className="hover:underline">{r.pick}</RouterLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableBox>
  );
}

export function HubLinks() {
  const links = [
    { to: "/car-rental-with-driver-bangalore", label: "Car rental with driver" },
    { to: "/drop-taxi-bangalore", label: "Drop taxi from Bangalore" },
    { to: "/outstation-cabs-bangalore", label: "Outstation cabs from Bangalore" },
    { to: "/mini-bus-on-rent-bangalore", label: "Mini bus on rent in Bangalore" },
    { to: "/routes", label: "All routes" },
    { to: "/fleet", label: "Full fleet" },
  ] as const;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <RouterLink key={l.to} to={l.to} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-smooth hover:border-foreground/40">
          {l.label}
        </RouterLink>
      ))}
    </div>
  );
}
