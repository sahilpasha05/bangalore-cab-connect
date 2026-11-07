import type { Booking } from "./store";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Sends a new booking to Telegram. Never throws: a Telegram problem must not lose or fail a booking.
export async function notifyBooking(b: Pick<Booking, "id" | "name" | "phone" | "pickup" | "drop" | "date" | "time" | "vehicle" | "passengers" | "notes">) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  const line = (label: string, v: string) => (v ? `${label}: ${esc(v)}\n` : "");
  const text =
    "<b>New booking</b>\n" +
    line("Name", b.name) +
    line("Phone", b.phone) +
    line("Pickup", b.pickup) +
    line("Drop", b.drop) +
    line("Date", b.date) +
    line("Time", b.time) +
    line("Vehicle", b.vehicle) +
    line("Passengers", b.passengers) +
    line("Notes", b.notes) +
    `\nhttps://wa.me/91${b.phone}`;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // ignore
  }
}
