import { Phone, CalendarCheck } from "lucide-react";
import { openBooking } from "@/lib/booking-dialog";
import { callLink } from "@/lib/whatsapp";

// Mobile-only bar so calling or booking is always one tap away.
export function StickyBookBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-2.5 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={callLink()}
        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-semibold"
      >
        <Phone className="h-4 w-4" /> Call now
      </a>
      <button
        type="button"
        onClick={() => openBooking()}
        className="flex h-11 items-center justify-center gap-2 rounded-xl gradient-cta text-sm font-semibold text-whatsapp-foreground"
      >
        <CalendarCheck className="h-4 w-4" /> Book now
      </button>
    </div>
  );
}
