import { fleet } from "@/data/fleet";
import type { Vehicle } from "@/components/site/VehicleCard";

export type VehicleInfo = Vehicle & {
  slug: string;
  headline: string;
  group: string;
  idealFor: string[];
  about: string;
  seoTitle?: string;
  guide?: { h: string; p: string }[];
  moreFaqs?: { q: string; a: string }[];
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const copy: Record<string, Pick<VehicleInfo, "headline" | "group" | "idealFor" | "about" | "seoTitle" | "guide" | "moreFaqs">> = {
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
    seoTitle: "33 Seater Bus on Rent in Bangalore | Rate per km and Price",
    group: "25 to 33 passengers",
    idealFor: ["Large family groups", "Corporate offsites", "College and school trips", "Event transport"],
    about:
      "A 33-seater covers larger groups on city and outstation routes without needing to arrange several smaller vehicles.",
    guide: [
      { h: "When a 33 seater is the right size", p: "A 33 seater suits groups of about 26 to 33 people. It is the step up from a 25 seater when you have more people than seats, and it is usually simpler and cheaper than hiring a 22 seater and a Tempo Traveller together. If your group is closer to 40, look at the 40 seater instead so nobody is squeezed." },
      { h: "33 seater vs 25 seater and 40 seater", p: "Compare the per-km rate with your group size, not just the headline price. A fuller bus brings the cost per person down. If you are unsure between sizes, tell us the exact headcount and luggage and we suggest one. Having a few spare seats makes long highway trips more comfortable." },
      { h: "Things to check before booking", p: "Share the date, pickup points, destination and return time. Mention if you need AC or non-AC, and whether you have a lot of luggage. Tolls, parking and state entry fees are charged on actuals, and a longer stay adds driver bata for each extra day." },
    ],
    moreFaqs: [
      { q: "How many people can a 33 seater bus carry comfortably?", a: "It has 33 seats, so it suits groups of about 26 to 33 with luggage. For exactly 33 or more with bags, a 40 seater is more comfortable." },
      { q: "Is a 33 seater cheaper than two smaller vehicles?", a: "For most groups of 26 or more, one bus costs less than two vehicles and keeps everyone together with one driver. We can quote both options so you can compare." },
    ],
  },
  "40 Seater": {
    headline: "40 Seater Bus on Rent in Bangalore",
    seoTitle: "40 Seater Bus on Rent in Bangalore | Rate per km and Price",
    group: "30 to 40 passengers",
    idealFor: ["School and college tours", "Company annual trips", "Wedding parties", "Pilgrimage groups"],
    about:
      "A 40-seater is a practical choice for big groups travelling together on a fixed itinerary.",
    guide: [
      { h: "When a 40 seater is the right size", p: "A 40 seater suits groups of about 32 to 40 people. It is a common pick for school and college tours, company annual trips and pilgrimage groups that travel on a fixed schedule with one pickup point. Keep a few seats free for bags so the ride stays comfortable." },
      { h: "40 seater vs 33 seater and 45 seater", p: "If your headcount is under about 30, a 33 seater is usually the better fit. If you are close to 40 and carrying luggage, go up to a 45 seater. The right size depends on headcount and bags, so tell us both and we recommend one." },
      { h: "Plan a group trip with a 40 seater", p: "For large groups, fix the pickup time and the list of stops early. Confirm the return time and any night halts. A single driver and one point of contact keeps a big group organised. Tolls, parking and state entry fees are extra, charged on actuals." },
    ],
    moreFaqs: [
      { q: "What group size is a 40 seater best for?", a: "It suits groups of about 32 to 40 people. For fewer than 30, a 33 seater is usually cheaper per person on the same trip." },
      { q: "Can a 40 seater be used for school or college tours?", a: "Yes. 40 seater buses are commonly used for school and college tours, company outings and pilgrimages. Share the date, route and number of days and we confirm the fare." },
    ],
  },
  "45 Seater": {
    headline: "45 Seater Bus on Rent in Bangalore",
    seoTitle: "45 Seater Bus on Rent in Bangalore | Rate per km and Price",
    group: "35 to 45 passengers",
    idealFor: ["Large corporate groups", "Educational tours", "Wedding guest transfers", "Long-distance pilgrimages"],
    about:
      "A 45-seater keeps a large group on one bus, with a single driver and a single point of contact for the whole trip.",
    guide: [
      { h: "When a 45 seater is the right size", p: "A 45 seater suits groups of about 38 to 45 people. It is used for large corporate trips, educational tours, wedding guest transfers and long-distance pilgrimages where the whole group should travel together on one bus." },
      { h: "45 seater vs 40 seater and 50 seater", p: "Choose a 45 seater over a 40 seater when your group is near 40 and you have bags. Choose a 50 seater when you need every seat. A fuller bus lowers the cost per person, but leaving a few seats spare is more comfortable on a long journey." },
      { h: "Booking tips for long trips", p: "For multi-day or long-distance trips, share the full route, halts and return date. Driver bata is charged for each day, so a longer stay changes the total. Tolls, parking and state entry fees are charged on actuals, and we confirm the final fare before you book." },
    ],
    moreFaqs: [
      { q: "How many people fit in a 45 seater bus?", a: "It has 45 seats and suits about 38 to 45 passengers with luggage. For smaller groups, a 40 seater costs less per km." },
      { q: "Is a 45 seater good for long-distance pilgrimages?", a: "Yes. It keeps a large group on one vehicle with one driver. For multi-day trips, share the route and halts so we can plan the days and confirm the fare." },
    ],
  },
  "50 Seater": {
    headline: "50 Seater Bus on Rent in Bangalore",
    seoTitle: "50 Seater Bus on Rent in Bangalore | Rate per km and Price",
    group: "40 to 50 passengers",
    idealFor: ["Large events and conferences", "School and university tours", "Mass pilgrimages", "Wedding transport"],
    about:
      "A 50-seater is the largest vehicle in the fleet, meant for the biggest groups and fixed-schedule trips.",
    guide: [
      { h: "When a 50 seater is the right size", p: "A 50 seater is our largest bus. It suits groups of about 42 to 50 people: large events, school and university tours, mass pilgrimages and wedding transport. For groups beyond 50, we can arrange more than one vehicle." },
      { h: "50 seater vs 45 seater", p: "The 50 seater has a higher per-km rate and driver bata than the 45 seater, but costs less per person when the bus is full. If your group is under about 40, a smaller bus is usually the better value. Tell us your headcount and we recommend the size." },
      { h: "Planning a big group trip", p: "With a large group, the schedule matters. Share the pickup points, timings, route and return date early so we can plan the vehicle and driver. Tolls, parking and state entry fees are extra, charged on actuals, and a longer stay adds driver bata." },
    ],
    moreFaqs: [
      { q: "What is the maximum group a 50 seater can carry?", a: "It has 50 seats. For more than 50 people we arrange two vehicles, for example a 50 seater plus a smaller bus." },
      { q: "Is a 50 seater worth it for a mid-sized group?", a: "Not usually. A 50 seater costs more per km, so it makes sense when the bus is nearly full. For 30 to 40 people a 33 or 40 seater is better value." },
    ],
  },
};

export const vehicles: VehicleInfo[] = fleet.map((v) => {
  const c = copy[v.name];
  return { ...v, slug: `${slugify(v.name)}-on-rent-bangalore`, ...c };
});

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
export const rate = (s: string) => Number(s.replace(/[^\d.]/g, ""));
export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
