import { MessageCircle } from "lucide-react";
import { waLink, messages } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-whatsapp-foreground shadow-glow transition-smooth hover:scale-105"
      style={{ backgroundColor: "var(--whatsapp)" }}
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
    </a>
  );
}