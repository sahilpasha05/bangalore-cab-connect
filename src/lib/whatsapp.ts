export const WHATSAPP_NUMBER = "918123140946";
export const CALL_NUMBER = "+918123140946";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function callLink(): string {
  return `tel:${CALL_NUMBER}`;
}

export const messages = {
  general: "Hi! I'd like to book a cab in Bangalore. Could you share details?",
  airport: "Hi! I'd like to book an Airport Transfer cab. Please share the rates.",
  outstation: "Hi! I'm planning an Outstation trip from Bangalore. Need a quote.",
  local: "Hi! I'd like to book a Local Rental cab in Bangalore.",
  vehicle: (name: string) =>
    `Hi! I'd like to book a ${name} in Bangalore. Please share availability and price.`,
  booking: (pickup: string, drop: string, date: string) =>
    `Hi! I'd like to book a cab.\nPickup: ${pickup || "—"}\nDrop: ${drop || "—"}\nDate: ${date || "—"}\nPlease confirm availability.`,
};
