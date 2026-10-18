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
const mysore = getRoute("bangalore-to-mysore-cab")!;
const v = (n: string) => vehicles.find((x) => x.name === n)!;
const fare = (n: string, days: number) => {
  const x = v(n);
  return coorg.km * 2 * rate(x.acRate) + x.bata * days;
};
const mfare = (n: string, days: number) => {
  const x = v(n);
  return mysore.km * 2 * rate(x.acRate) + x.bata * days;
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
  {
    slug: "bangalore-to-mysore-day-trip-taxi",
    title: "Bangalore to Mysore Day Trip: Taxi Fare, Route and Plan",
    description:
      "What a Bangalore to Mysore taxi costs for a one-day round trip, how long the drive takes, which vehicle to choose and a simple itinerary covering the palace, Chamundi Hills and Srirangapatna.",
    date: "2026-10-19",
    readMins: 5,
    route: "bangalore-to-mysore-cab",
    faqs: [
      {
        q: "What is the taxi fare from Bangalore to Mysore for a day trip?",
        a: `For a one-day round trip of about ${mysore.km * 2} km, an Innova Crysta works out to roughly ${inr(mfare("Innova Crysta", 1))} and a Tempo Traveller to roughly ${inr(mfare("Tempo Traveller", 1))} at our listed AC rates, before tolls and parking. We confirm the exact fare before you book.`,
      },
      {
        q: "How far is Mysore from Bangalore?",
        a: `Mysore is about ${mysore.km} km from Bangalore and takes ${mysore.hours} by road.`,
      },
      {
        q: "Is Mysore possible as a one-day trip from Bangalore?",
        a: "Yes. Leave early, keep to two or three main stops, and plan to start the return drive by early evening. It is a long day, but very doable.",
      },
      {
        q: "Can I combine Mysore and Coorg in one trip?",
        a: "Yes. Coorg is roughly 120 km from Mysore, so a three-day plan of Bangalore, Mysore, Coorg and back works well. Tell us the route and we quote it as one trip.",
      },
    ],
    body: [
      { t: "p", text: `Mysore is the most popular day trip from Bangalore. It is about ${mysore.km} km away, roughly ${mysore.hours} by road, so you can see the main sights and be back the same night. This guide covers what the taxi costs, which vehicle to choose and how to use the day well.` },
      { t: "h2", text: "Bangalore to Mysore taxi fare (one-day round trip)" },
      { t: "p", text: `The estimates below use our listed AC per-km rate on the full ${mysore.km * 2} km round trip, plus one day of driver bata. Tolls and parking are extra.` },
      {
        t: "table",
        head: ["Vehicle", "Seats", "AC rate / km", "Driver bata / day", "Day-trip estimate"],
        rows: pick.map((n) => [n, String(v(n).seats), v(n).acRate, inr(v(n).bata), inr(mfare(n, 1))]),
      },
      { t: "note", text: "These are indicative estimates from published per-km rates. The final fare is confirmed when you book and depends on your date, pickup point and the places you want to visit." },
      { t: "h2", text: "What changes the fare" },
      { t: "ul", items: [
        "Vehicle type: a 12-seater costs more per km than a 7-seater, but is usually cheaper per person for a group.",
        "AC or non-AC: non-AC has a lower per-km rate if you are travelling in the cooler months.",
        "Local driving in Mysore: visits to Chamundi Hills, Srirangapatna or KRS add km to the day.",
        "Staying overnight: a second day adds driver bata and the extra km.",
        "Tolls and parking: charged on actuals and not part of the per-km rate.",
      ] },
      { t: "h2", text: "Which vehicle should you choose?" },
      { t: "table", head: ["Group size", "Best vehicle"], rows: [
        ["Up to 6 people", "Innova Crysta"],
        ["8 to 12 people", "Tempo Traveller or Force Urbania"],
        ["15 to 22 people", "22 seater bus"],
        ["25 or more", "25 to 50 seater bus"],
      ] },
      { t: "h2", text: "Route and drive time" },
      { t: "p", text: `The usual route is the ${mysore.via}. Expect about ${mysore.hours} without long stops. The road is fast, but traffic leaving Bangalore in the morning can add time, so an early start makes the day easier.` },
      { t: "h2", text: "Best time to visit Mysore" },
      { t: "p", text: mysore.bestTime },
      { t: "h2", text: "A simple one-day plan" },
      { t: "ul", items: [
        "5:30 to 6:00 AM: leave Bangalore and stop for breakfast on the highway.",
        "Late morning: Srirangapatna, with its Ranganathaswamy Temple and Tipu Sultan's Summer Palace, on the way into Mysore.",
        "Afternoon: Mysore Palace, then Chamundi Hills for the view and the temple. Check opening hours before you go.",
        "Evening: Brindavan Gardens at KRS if you have time, or an early dinner in Mysore.",
        "Start the return drive by early evening so you reach Bangalore at a reasonable hour.",
      ] },
      { t: "h2", text: "Tips before you book" },
      { t: "ul", items: [
        "Book at least a few days ahead for weekends and the Dasara season, when the palace and the roads are very busy.",
        "Tell us your must-see places, so the driver can plan the order and parking.",
        "Palace and garden timings can change, so check them on the day before you travel.",
        "For a relaxed trip, consider staying one night and adding Coorg or Ooty as a second leg.",
      ] },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
