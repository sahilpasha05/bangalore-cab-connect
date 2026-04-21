import { Users, UserRound, Gauge, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, messages, callLink } from "@/lib/whatsapp";

export type Vehicle = {
  name: string;
  image: string;
  seats: number;
  bata: number;
  acRate: string;
  nonAcRate: string;
  badge?: string;
};

export function VehicleCard({ v, index = 0 }: { v: Vehicle; index?: number }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-b-3xl bg-[#f6f6f6] p-4 pt-5">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white">
          {v.name}
        </div>
        <img
          src={v.image}
          alt={v.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-52 w-full object-contain pt-8 transition-smooth group-hover:scale-[1.02] sm:h-56"
        />
      </div>

      {v.badge && (
        <div className="absolute right-6 top-[52%] z-10 rounded-full bg-[#e8d919] px-4 py-1 text-sm font-semibold text-black sm:top-[53%]">
          {v.badge}
        </div>
      )}

      <div className="flex flex-1 flex-col bg-[#020f1f] px-6 pb-6 pt-7 text-white">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Detail icon={<Users className="h-5 w-5" />} label={`${v.seats} Seater`} />
          <Detail icon={<Gauge className="h-5 w-5" />} label={`AC ${v.acRate}`} />
          <Detail icon={<UserRound className="h-5 w-5" />} label={`${v.bata} Bata`} />
          <Detail icon={<Gauge className="h-5 w-5" />} label={`Non AC ${v.nonAcRate}`} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={waLink(messages.vehicle(v.name))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="h-11 w-full rounded-full border-0 bg-[#0ca01e] text-base font-medium text-white hover:bg-[#0b8e1a]">
              <MessageCircle className="h-4 w-4" />
              Whatsapp
            </Button>
          </a>

          <a href={callLink()}>
            <Button className="h-11 w-full rounded-full border-0 bg-[#ff5a00] text-base font-medium text-white hover:bg-[#e65100]">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[1.1rem] font-medium leading-none text-white sm:text-xl">
      {icon}
      {label}
    </span>
  );
}