import { vehicles, rate, inr } from "@/data/vehicles";
import { getRoute } from "@/data/routes";

export type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMins: number;
  route?: string; // related route page slug
  faqs: { q: string; a: string }[];
  body: Block[];
};

const coorg = getRoute("bangalore-to-coorg-cab")!;
const v = (n: string) => vehicles.find((x) => x.name === n)!;
const fare = (n: string, days: number) => {
  const x = v(n);
  return coorg.km * 2 * rate(x.acRate) + x.bata * days;
};
const pick = ["Innova Crysta", "Tempo Traveller", "Force Urbania", "22 Seater"];

export const posts: Post[] = [
  {
    slug: "bangalore-to-coorg-taxi-fare",
    title: "Bangalore to Coorg Taxi Fare: Price, Distance and Trip Plan",
    description:
      "What a taxi from Bangalore to Coorg costs for a 2-day round trip in an Innova Crysta, Tempo Traveller or bus, plus distance, drive time, best season and a sample itinerary.",
    date: "2026-10-15",
    readMins: 6,
    route: "bangalore-to-coorg-cab",
    faqs: [
      {
        q: "What is the taxi fare from Bangalore to Coorg?",
        a: `For a 2-day round trip of about ${coorg.km * 2} km, an Innova Crysta works out to roughly ${inr(fare("Innova Crysta", 2))} and a Tempo Traveller to roughly ${inr(fare("Tempo Traveller", 2))} at our listed AC rates, before tolls and parking. We confirm the exact fare before you book.`,
      },
      {
        q: "How far is Coorg from Bangalore?",
        a: `Madikeri, the main town in Coorg, is about ${coorg.km} km from Bangalore and takes ${coorg.hours} by road.`,
      },
      {
        q: "Can I do Coorg as a day trip from Bangalore?",
        a: "It is possible but tiring: about 12 hours of driving for a 500 km round trip leaves very little time in Coorg. Most people take at least one night.",
      },
      {
        q: "Which vehicle is best for a Coorg trip?",
        a: "An Innova Crysta suits up to 6 people. A Tempo Traveller or Force Urbania suits 8 to 12. Groups of 15 or more are usually cheaper per person in a 22 seater or larger bus.",
      },
    ],
    body: [
      { t: "p", text: `Coorg (Madikeri) is about ${coorg.km} km from Bangalore, roughly ${coorg.hours} by road. It is one of the most popular weekend trips from the city, so the first question is nearly always the same: what will the taxi cost? This guide gives you realistic numbers and explains what changes them.` },
      { t: "h2", text: "Bangalore to Coorg taxi fare (2-day round trip)" },
      { t: "p", text: `The estimates below use our listed AC per-km rate on the full ${coorg.km * 2} km round trip, plus driver bata for 2 days. Tolls, parking and any entry charges are extra.` },
      {
        t: "table",
        head: ["Vehicle", "Seats", "AC rate / km", "Driver bata / day", "2-day estimate"],
        rows: pick.map((n) => [n, String(v(n).seats), v(n).acRate, inr(v(n).bata), inr(fare(n, 2))]),
      },
      { t: "note", text: "These are indicative estimates from published per-km rates. The final fare is confirmed when you book and depends on your dates, pickup point and route." },
      { t: "h2", text: "What changes the fare" },
      { t: "ul", items: [
        "Vehicle type: a 12-seater costs more per km than a 7-seater, but is often cheaper per person for a group.",
        "AC or non-AC: non-AC is a lower per-km rate if you are travelling in cooler months.",
        "Number of days: driver bata is charged for every day the vehicle is with you, including a night halt.",
        "Extra sightseeing: local drives around Coorg add to the km on day 2.",
        "Tolls and parking: charged on actuals and not part of the per-km rate.",
      ] },
      { t: "h2", text: "Which vehicle should you choose?" },
      { t: "table", head: ["Group size", "Best vehicle"], rows: [
        ["Up to 6 people", "Innova Crysta"],
        ["8 to 12 people", "Tempo Traveller or Force Urbania"],
        ["15 to 22 people", "22 seater bus"],
        ["25 or more", "25 to 50 seater bus"],
      ] },
      { t: "h2", text: "Distance, route and drive time" },
      { t: "p", text: `The usual route is ${coorg.via}. Expect about ${coorg.hours} without long stops. The last stretch into Madikeri is a hill road, so a driver who knows it makes the trip calmer, especially in rain or fog.` },
      { t: "h2", text: "Best time to visit Coorg" },
      { t: "p", text: coorg.bestTime },
      { t: "h2", text: "A simple 2-day plan" },
      { t: "ul", items: [
        "Day 1: leave Bangalore by 6 AM, stop for breakfast on the way, visit Dubare Elephant Camp near Kushalnagar, reach Madikeri by afternoon and watch sunset at Raja's Seat.",
        "Day 2: Abbey Falls in the morning, Omkareshwara Temple in Madikeri, then Namdroling Monastery at Bylakuppe on the way back, and return to Bangalore by evening.",
      ] },
      { t: "h2", text: "Tips before you book" },
      { t: "ul", items: [
        "Book at least a week ahead for weekends, long weekends and the October to January peak season.",
        "Tell us your homestay or resort so the driver can plan the final stretch, which can be narrow and steep.",
        "Carry a light jacket. Evenings in Madikeri are cool even in summer.",
        "In heavy monsoon rain, plan extra time for the ghat roads.",
      ] },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
