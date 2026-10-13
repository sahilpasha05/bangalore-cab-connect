import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { closeBooking, useBookingDialog } from "@/lib/booking-dialog";
import { fleet } from "@/data/fleet";
import { waLink } from "@/lib/whatsapp";

const OTHER = "My choice is not available";
const empty = { otherVehicle: "", name: "", phone: "", phone2: "", pickup: "", drop: "", date: "", time: "", vehicle: "", passengers: "", notes: "" };

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground/40";

export function BookingDialog() {
  const { open, prefill } = useBookingDialog();
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ ...empty, ...prefill });
      setError("");
      setDone(false);
    }
  }, [open, prefill]);

  const setPhone = (k: "phone" | "phone2") => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value.replace(/\D/g, "").slice(0, 10) }));

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = (v: string) => v.replace(/\D/g, "");
    if (digits(form.phone).length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (digits(form.phone) !== digits(form.phone2)) {
      setError("Phone numbers don't match. Please re-enter the same number.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone2: undefined,
          otherVehicle: undefined,
          vehicle:
            form.vehicle === OTHER && form.otherVehicle.trim()
              ? `${OTHER}: ${form.otherVehicle.trim()}`
              : form.vehicle,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not submit booking");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <h3 className="mt-4 text-xl font-bold">Booking request received</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks {form.name}! We'll call you on {form.phone} shortly to confirm.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <a
                href={waLink(`Hi! I just submitted a booking request.\nName: ${form.name}\nPickup: ${form.pickup || "—"}\nDrop: ${form.drop || "—"}\nDate: ${form.date || "—"}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2 bg-[#0ca01e] text-white hover:bg-[#0b8e1a]">
                  <MessageCircle className="h-4 w-4" /> Also message on WhatsApp
                </Button>
              </a>
              <Button variant="outline" onClick={closeBooking}>Close</Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book your cab</DialogTitle>
              <DialogDescription>Fill in your trip details and we'll confirm by phone.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-3">
              <input required placeholder="Your name *" value={form.name} onChange={set("name")} className={inputCls} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required type="tel" inputMode="numeric" maxLength={10} pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number" placeholder="Phone number (10 digits) *"
                  value={form.phone} onChange={setPhone("phone")} className={inputCls}
                />
                <input
                  required type="tel" inputMode="numeric" maxLength={10} pattern="[0-9]{10}"
                  placeholder="Confirm phone number *" value={form.phone2} onChange={setPhone("phone2")}
                  className={`${inputCls} ${form.phone2 && form.phone.replace(/\D/g, "") !== form.phone2.replace(/\D/g, "") ? "border-red-500" : ""}`}
                />
              </div>
              {form.phone2 && form.phone.replace(/\D/g, "") !== form.phone2.replace(/\D/g, "") && (
                <p className="-mt-1 text-xs text-red-600">Numbers don't match yet.</p>
              )}
              <input placeholder="Pickup location" value={form.pickup} onChange={set("pickup")} className={inputCls} />
              <input placeholder="Drop location" value={form.drop} onChange={set("drop")} className={inputCls} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="date" value={form.date} onChange={set("date")} className={inputCls} />
                <input type="time" value={form.time} onChange={set("time")} className={inputCls} />
              </div>
              <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                <select value={form.vehicle} onChange={set("vehicle")} className={inputCls}>
                  <option value="">Any vehicle</option>
                  {fleet.map((v) => (
                    <option key={v.name} value={v.name}>{v.name} ({v.seats} seats)</option>
                  ))}
                  <option value={OTHER}>{OTHER}</option>
                </select>
                <input type="number" min={1} placeholder="Passengers" value={form.passengers} onChange={set("passengers")} className={inputCls} />
              </div>
              {form.vehicle === OTHER && (
                <input
                  placeholder="Tell us which vehicle you need (optional)"
                  value={form.otherVehicle} onChange={set("otherVehicle")} className={inputCls}
                />
              )}
              <textarea rows={2} placeholder="Notes (optional)" value={form.notes} onChange={set("notes")} className={inputCls} />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" disabled={busy} className="h-11 gradient-cta border-0 text-whatsapp-foreground">
                {busy ? "Submitting…" : "Submit booking"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
