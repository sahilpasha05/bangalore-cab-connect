export const WHATSAPP_NUMBER = "919999999999"; // TODO: Replace with real number

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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