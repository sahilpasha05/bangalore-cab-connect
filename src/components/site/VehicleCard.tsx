import { Users, Briefcase, Snowflake, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, messages } from "@/lib/whatsapp";

export type Vehicle = {
  name: string;
  tagline: string;
  image: string;
  seats: number;
  luggage: number;
  ac: boolean;
  priceFrom: string;
  badge?: string;
};

export function VehicleCard({ v, index = 0 }: { v: Vehicle; index?: number }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {v.badge && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          {v.badge}
        </div>
      )}
      <div className="aspect-[4/3] overflow-hidden bg-secondary/60">
        <img
          src={v.image}
          alt={v.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight">{v.name}</h3>
            <p className="text-sm text-muted-foreground">{v.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
            <div className="text-base font-bold">{v.priceFrom}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Spec icon={<Users className="h-3.5 w-3.5" />} label={`${v.seats} Seats`} />
          <Spec icon={<Briefcase className="h-3.5 w-3.5" />} label={`${v.luggage} Bags`} />
          {v.ac && <Spec icon={<Snowflake className="h-3.5 w-3.5" />} label="AC" />}
        </div>

        <a
          href={waLink(messages.vehicle(v.name))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5"
        >
          <Button className="w-full gradient-cta border-0 text-whatsapp-foreground shadow-glow transition-smooth group-hover:scale-[1.02]">
            <MessageCircle className="h-4 w-4" />
            Book on WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
      {icon}
      {label}
    </span>
  );
}