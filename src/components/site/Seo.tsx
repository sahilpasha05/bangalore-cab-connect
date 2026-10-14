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
              <Phone className="h-5 w-5" /> Call +91 81231 40946
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
