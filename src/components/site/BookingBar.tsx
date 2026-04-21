import { useState } from "react";
import { MapPin, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, messages } from "@/lib/whatsapp";

export function BookingBar() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");

  const href = waLink(messages.booking(pickup, drop, date));

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-2.5 shadow-elegant sm:p-4">
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto] sm:gap-3">
        <Field icon={<MapPin className="h-4 w-4" />} label="Pickup">
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Indiranagar"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
        </Field>
        <Field icon={<MapPin className="h-4 w-4" />} label="Drop">
          <input
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="e.g. KIA Airport"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
        </Field>
        <Field icon={<Calendar className="h-4 w-4" />} label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
        </Field>
        <a href={href} target="_blank" rel="noopener noreferrer" className="sm:self-stretch">
          <Button
            size="lg"
            className="h-11 w-full gradient-cta border-0 text-whatsapp-foreground shadow-glow transition-smooth sm:h-full hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            Book Now
          </Button>
        </a>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="group flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5 transition-smooth focus-within:bg-secondary sm:px-4 sm:py-3">
      <span className="text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        {children}
      </div>
    </label>
  );
}