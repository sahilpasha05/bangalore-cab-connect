import type { Vehicle } from "@/components/site/VehicleCard";

const vehicleImages = {
  innova:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=576,fit=crop/YbN4xQGZyZslMMpK/innova-crysta-9-240-6220979502261-YbN4NRkRDyt4B2kM.png",
  tempo:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/untitled-design-1-m6L2LaV5qrhbbVV8.png",
  urbania:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/untitled-design-mjE4EnMKGOFkPNkE.png",
  bus22:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/indian-new-generation-ac-luxury-small-white-bus-with-avm-tourist-brand-name-with-white-background-11-m6L2LBaqe7IebzMe.jpg",
  bus25:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/indian-new-generation-ac-luxury-small-white-bus-with-avm-tourist-brand-name-with-white-background-9-Yan0nRRv7vt3QpjM.jpg",
  bus33:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/indian-new-generation-ac-luxury-small-white-bus-with-avm-tourist-brand-name-with-white-background-10-YKb8by47jOuDlbR4.jpg",
  bus40:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/indian-new-generation-ac-luxury-small-white-bus-with-avm-tourist-brand-name-with-white-background-10-YKb8by47jOuDlbR4.jpg",
  bus45:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/indian-new-generation-ac-luxury-small-white-bus-with-avm-tourist-brand-name-with-white-background-10-YKb8by47jOuDlbR4.jpg",
  bus50:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=431,fit=crop/YbN4xQGZyZslMMpK/indian-new-generation-ac-luxury-small-white-bus-with-avm-tourist-brand-name-with-white-background-3-Aq2GkR8v20f2v1Wa.jpg",
};

export const fleet: Vehicle[] = [
  {
    name: "Innova Crysta",
    image: vehicleImages.innova,
    seats: 7,
    bata: 400,
    acRate: "₹19",
    nonAcRate: "₹18",
    badge: "Top Rated",
  },
  {
    name: "Tempo Traveller",
    image: vehicleImages.urbania,
    seats: 12,
    bata: 500,
    acRate: "₹22",
    nonAcRate: "₹20",
    badge: "Top Rated",
  },
  {
    name: "Force Urbania",
    image: vehicleImages.tempo,
    seats: 12,
    bata: 500,
    acRate: "₹43",
    nonAcRate: "₹41",
    badge: "Top Rated",
  },
  {
    name: "22 Seater",
    image: vehicleImages.bus22,
    seats: 22,
    bata: 600,
    acRate: "₹32",
    nonAcRate: "₹30",
    badge: "Top Rated",
  },
  {
    name: "25 Seater",
    image: vehicleImages.bus25,
    seats: 25,
    bata: 700,
    acRate: "₹34",
    nonAcRate: "₹32",
    badge: "Top Rated",
  },
  {
    name: "33 Seater",
    image: vehicleImages.bus33,
    seats: 33,
    bata: 700,
    acRate: "₹42",
    nonAcRate: "₹40",
    badge: "Top Rated",
  },
  {
    name: "40 Seater",
    image: vehicleImages.bus40,
    seats: 40,
    bata: 700,
    acRate: "₹50",
    nonAcRate: "₹48",
    badge: "Top Rated",
  },
  {
    name: "45 Seater",
    image: vehicleImages.bus45,
    seats: 45,
    bata: 800,
    acRate: "₹54",
    nonAcRate: "₹52",
    badge: "Top Rated",
  },
  {
    name: "50 Seater",
    image: vehicleImages.bus50,
    seats: 50,
    bata: 1000,
    acRate: "₹58",
    nonAcRate: "₹56",
    badge: "Top Rated",
  },
];
