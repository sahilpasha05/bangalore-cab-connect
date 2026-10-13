import { defineHandler } from "nitro/h3";
import { addBooking, json } from "../../../utils/store";

const clip = (v: unknown, n = 500) => String(v ?? "").trim().slice(0, n);

export default defineHandler(async (event) => {
  let body: Record<string, unknown>;
  try {
    body = await event.req.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = clip(body.name, 100);
  const phone = clip(body.phone, 20).replace(/\D/g, "");
  if (!name) return json({ error: "Name is required" }, { status: 400 });
  if (phone.length !== 10)
    return json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
  const booking = await addBooking({
    name,
    phone,
    pickup: clip(body.pickup, 200),
    drop: clip(body.drop, 200),
    date: clip(body.date, 20),
    time: clip(body.time, 20),
    vehicle: clip(body.vehicle, 100),
    passengers: clip(body.passengers, 10),
    notes: clip(body.notes, 1000),
  });
  return json({ ok: true, id: booking.id }, { status: 201 });
});
