import { fleet } from "@/data/fleet";
import type { Vehicle } from "@/components/site/VehicleCard";

export type VehicleInfo = Vehicle & {
  slug: string;
  headline: string;
  group: string;
  idealFor: string[];
  about: string;
  seoTitle?: string;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const copy: Record<string, Pick<VehicleInfo, "headline" | "group" | "idealFor" | "about" | "seoTitle">> = {
  "Innova Crysta": {
    headline: "Innova Crysta on Rent in Bangalore",
    group: "4 to 6 passengers",
    idealFor: ["Airport pickups and drops", "Family outstation trips", "Business travel", "Weddings and functions"],
    about:
      "The Innova Crysta is the default choice for families and small groups. It seats 7 with room for luggage and suits both city rentals and long highway drives.",
  },
  "Tempo Traveller": {
    headline: "Tempo Traveller on Rent in Bangalore",
    seoTitle: "Tempo Traveller on Rent in Bangalore | 12 Seater Price per km",
    group: "8 to 12 passengers",
    idealFor: ["Group tours and weekend trips", "Family functions", "Corporate outings", "Pilgrimage trips"],
    about:
      "A 12-seater Tempo Traveller keeps a group together in one vehicle, which is simpler and usually cheaper per person than two cars.",
  },
  "Force Urbania": {
    headline: "Force Urbania on Rent in Bangalore",
    group: "8 to 12 passengers",
    idealFor: ["Premium group travel", "Corporate teams and client transfers", "Long outstation trips", "Wedding guests"],
    about:
      "The Force Urbania is a newer 12-seater van for groups that want a more comfortable ride on long routes.",
  },
  "22 Seater": {
    headline: "22 Seater Bus on Rent in Bangalore",
    seoTitle: "22 Seater Bus on Rent in Bangalore | Rate per km and Price",
    group: "15 to 22 passengers",
    idealFor: ["Wedding guest transport", "Corporate and college outings", "Temple and pilgrimage groups", "Airport group transfers"],
    about:
      "A 22-seater mini bus suits mid-sized groups that are too big for a Tempo Traveller but do not need a full coach.",
  },
  "25 Seater": {
    headline: "25 Seater Bus on Rent in Bangalore",
    seoTitle: "25 Seater Bus on Rent in Bangalore | Rate per km and Price",
    group: "18 to 25 passengers",
    idealFor: ["Wedding and family functions", "Office and school trips", "Tours across Karnataka", "Event shuttles"],
    about:
      "A 25-seater gives a mid-sized group one vehicle with space for bags, and works for both city shuttles and outstation tours.",
  },
  "33 Seater": {
    headline: "33 Seater Bus on Rent in Bangalore",
    group: "25 to 33 passengers",
    idealFor: ["Large family groups", "Corporate offsites", "College and school trips", "Event transport"],
    about:
      "A 33-seater covers larger groups on city and outstation routes without needing to arrange several smaller vehicles.",
  },
  "40 Seater": {
    headline: "40 Seater Bus on Rent in Bangalore",
    group: "30 to 40 passengers",
    idealFor: ["School and college tours", "Company annual trips", "Wedding parties", "Pilgrimage groups"],
    about:
      "A 40-seater is a practical choice for big groups travelling together on a fixed itinerary.",
  },
  "45 Seater": {
    headline: "45 Seater Bus on Rent in Bangalore",
    group: "35 to 45 passengers",
    idealFor: ["Large corporate groups", "Educational tours", "Wedding guest transfers", "Long-distance pilgrimages"],
    about:
      "A 45-seater keeps a large group on one bus, with a single driver and a single point of contact for the whole trip.",
  },
  "50 Seater": {
    headline: "50 Seater Bus on Rent in Bangalore",
    group: "40 to 50 passengers",
    idealFor: ["Large events and conferences", "School and university tours", "Mass pilgrimages", "Wedding transport"],
    about:
      "A 50-seater is the largest vehicle in the fleet, meant for the biggest groups and fixed-schedule trips.",
  },
};

export const vehicles: VehicleInfo[] = fleet.map((v) => {
  const c = copy[v.name];
  return { ...v, slug: `${slugify(v.name)}-on-rent-bangalore`, ...c };
});

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
export const rate = (s: string) => Number(s.replace(/[^\d.]/g, ""));
export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
