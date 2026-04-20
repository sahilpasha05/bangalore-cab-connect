import innova from "@/assets/innova.jpg";
import tempo from "@/assets/tempo.jpg";
import sedan from "@/assets/sedan.jpg";
import bus from "@/assets/bus.jpg";
import type { Vehicle } from "@/components/site/VehicleCard";

export const fleet: Vehicle[] = [
  {
    name: "Sedan (Etios / Dzire)",
    tagline: "Comfortable city rides",
    image: sedan,
    seats: 4,
    luggage: 2,
    ac: true,
    priceFrom: "₹12/km",
  },
  {
    name: "Toyota Innova Crysta",
    tagline: "Spacious family travel",
    image: innova,
    seats: 7,
    luggage: 4,
    ac: true,
    priceFrom: "₹17/km",
    badge: "Popular",
  },
  {
    name: "Tempo Traveller",
    tagline: "Group trips made easy",
    image: tempo,
    seats: 12,
    luggage: 8,
    ac: true,
    priceFrom: "₹24/km",
  },
  {
    name: "Luxury Coach Bus",
    tagline: "Corporate & event travel",
    image: bus,
    seats: 35,
    luggage: 25,
    ac: true,
    priceFrom: "On request",
  },
];