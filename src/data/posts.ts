import { vehicles, rate, inr } from "@/data/vehicles";
import { getRoute, areaDistances } from "@/data/routes";

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
const ooty = getRoute("bangalore-to-ooty-cab")!;
const v = (n: string) => vehicles.find((x) => x.name === n)!;
const fare = (n: string, days: number) => {
  const x = v(n);
  return coorg.km * 2 * rate(x.acRate) + x.bata * days;
};
const mfare = (n: string, days: number) => {
  const x = v(n);
  return mysore.km * 2 * rate(x.acRate) + x.bata * days;
};
const ofare = (n: string, days: number) => {
  const x = v(n);
  return ooty.km * 2 * rate(x.acRate) + x.bata * days;
};
const pick = ["Innova Crysta", "Tempo Traveller", "Force Urbania", "22 Seater"];

const routeFare = (slug: string, n: string, days: number) => {
  const r = getRoute(slug)!;
  const x = v(n);
  return r.km * 2 * rate(x.acRate) + x.bata * days;
};

const highwayPost = (o: {
  slug: string;
  routeSlug: string;
  title: string;
  description: string;
  days: number;
  readMins: number;
  lead: string;
  oneWay: string;
  plan: string[];
  tips: string[];
  extraFaq: { q: string; a: string };
}): Post => {
  const r = getRoute(o.routeSlug)!;
  return {
    slug: o.slug,
    title: o.title,
    description: o.description,
    date: "2026-10-20",
    readMins: o.readMins,
    route: o.routeSlug,
    faqs: [
      {
        q: `What is the taxi fare from Bangalore to ${r.to}?`,
        a: `For a ${o.days}-day round trip of about ${r.km * 2} km, an Innova Crysta works out to roughly ${inr(routeFare(o.routeSlug, "Innova Crysta", o.days))} and a Tempo Traveller to roughly ${inr(routeFare(o.routeSlug, "Tempo Traveller", o.days))} at our listed AC rates, before tolls and parking. One-way drops are quoted on request.`,
      },
      {
        q: `How far is ${r.to} from Bangalore?`,
        a: `${r.to} is about ${r.km} km from Bangalore and takes ${r.hours} by road, via ${r.via}.`,
      },
      o.extraFaq,
      {
        q: `Which vehicle is best for a trip to ${r.to}?`,
        a: "An Innova Crysta suits up to 6 people. A Tempo Traveller or Force Urbania suits 8 to 12. Larger groups are usually cheaper per person in a 22 seater or bigger bus.",
      },
    ],
    body: [
      { t: "p", text: o.lead },
      { t: "h2", text: `Bangalore to ${r.to} taxi fare (${o.days}-day round trip)` },
      { t: "p", text: `The estimates below use our listed AC per-km rate on the full ${r.km * 2} km round trip, plus ${o.days} days of driver bata. Tolls and parking are extra.` },
      {
        t: "table",
        head: ["Vehicle", "Seats", "AC rate / km", "Driver bata / day", `${o.days}-day estimate`],
        rows: pick.map((n) => [n, String(v(n).seats), v(n).acRate, inr(v(n).bata), inr(routeFare(o.routeSlug, n, o.days))]),
      },
      { t: "note", text: "These are indicative estimates from published per-km rates. The final fare is confirmed when you book and depends on your date, pickup point and stops." },
      { t: "h2", text: "One-way drop or round trip?" },
      { t: "p", text: o.oneWay },
      { t: "h2", text: "What changes the fare" },
      { t: "ul", items: [
        "Vehicle type: a 12-seater costs more per km than a 7-seater, but is usually cheaper per person for a group.",
        "One-way or round trip: a drop is quoted differently from a return journey.",
        "Number of days: each day adds driver bata.",
        "AC or non-AC: non-AC has a lower per-km rate.",
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
      { t: "p", text: `The usual route is via ${r.via}. Expect about ${r.hours} without long stops. ${r.tip}` },
      { t: "h2", text: `Best time to visit ${r.to}` },
      { t: "p", text: r.bestTime },
      { t: "h2", text: "What to see and do" },
      { t: "ul", items: r.highlights },
      { t: "h2", text: "A simple plan" },
      { t: "ul", items: o.plan },
      { t: "h2", text: "Tips before you book" },
      { t: "ul", items: o.tips },
    ],
  };
};

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
  {
    slug: "tempo-traveller-12-seater-price-bangalore",
    title: "Tempo Traveller 12 Seater Price in Bangalore: Rates and Sample Fares",
    description:
      "Tempo Traveller 12 seater rental price in Bangalore: per-km rate, driver bata, sample fares for popular outstation trips and what changes the final price.",
    date: "2026-10-20",
    readMins: 5,
    route: "bangalore-to-coorg-cab",
    faqs: [
      {
        q: "What is the Tempo Traveller 12 seater price in Bangalore?",
        a: `Our listed rate for a Tempo Traveller is ${v("Tempo Traveller").acRate} per km for AC, plus driver bata of ${inr(v("Tempo Traveller").bata)} per day. The final fare depends on the route, the number of days and the total km.`,
      },
      {
        q: "How is the outstation fare calculated?",
        a: "Outstation trips are charged on the round-trip distance (to and back) at the per-km rate, plus driver bata for each day. Tolls, parking and state entry fees are extra on actuals.",
      },
      {
        q: "How many people fit in a Tempo Traveller?",
        a: "The standard Tempo Traveller seats 12 passengers plus the driver. With luggage for a long trip, 10 to 12 people is comfortable.",
      },
      {
        q: "Is a Tempo Traveller cheaper than two cars?",
        a: "For a group of 9 to 12 it usually is, and everyone stays together. For 6 or fewer people, an Innova Crysta is normally the better value.",
      },
    ],
    body: [
      { t: "p", text: "A 12 seater Tempo Traveller is the most booked vehicle for family trips, office outings and pilgrimages from Bangalore. This guide explains how the price is worked out and gives sample fares for popular trips." },
      { t: "h2", text: "Tempo Traveller rental rates" },
      {
        t: "table",
        head: ["Vehicle", "Seats", "AC rate / km", "Driver bata / day"],
        rows: [["Tempo Traveller", String(v("Tempo Traveller").seats), v("Tempo Traveller").acRate, inr(v("Tempo Traveller").bata)]],
      },
      { t: "h2", text: "Sample outstation fares (2-day round trip)" },
      { t: "p", text: "Estimates use the full round-trip distance at our AC per-km rate plus two days of driver bata. Tolls and parking are extra." },
      {
        t: "table",
        head: ["Trip", "One-way km", "2-day estimate"],
        rows: ["bangalore-to-mysore-cab", "bangalore-to-coorg-cab", "bangalore-to-ooty-cab", "bangalore-to-chikmagalur-cab", "bangalore-to-tirupati-cab"].map((slug) => {
          const r = getRoute(slug)!;
          const t = v("Tempo Traveller");
          return ["Bangalore to " + r.to, String(r.km), inr(r.km * 2 * rate(t.acRate) + t.bata * 2)];
        }),
      },
      { t: "note", text: "These are indicative estimates from published per-km rates. The final fare is confirmed when you book." },
      { t: "h2", text: "What changes the price" },
      { t: "ul", items: [
        "Total km: the round-trip distance plus any local sightseeing at the destination.",
        "Number of days: each day adds driver bata.",
        "AC or non-AC: non-AC has a lower per-km rate.",
        "Season: weekends, long weekends and festivals fill up early, so book ahead.",
        "Tolls, parking and state entry fees: charged on actuals.",
      ] },
      { t: "h2", text: "Tempo Traveller or something else?" },
      { t: "table", head: ["Group size", "Best vehicle"], rows: [
        ["Up to 6 people", "Innova Crysta"],
        ["8 to 12 people", "Tempo Traveller or Force Urbania"],
        ["15 to 22 people", "22 seater bus"],
      ] },
      { t: "h2", text: "Tips before you book" },
      { t: "ul", items: [
        "Share your pickup point, dates and the places you want to visit, so we can quote the full km.",
        "Confirm luggage: 12 people with large bags may need a second vehicle or a luggage carrier.",
        "Ask about night halt charges if the driver will stay overnight.",
        "For a relaxed trip, plan no more than 8 to 9 hours of driving a day.",
      ] },
    ],
  },
  {
    slug: "bangalore-airport-taxi-guide",
    title: "Bangalore Airport Taxi Guide: Distance, Time, Booking and Vehicle Choice",
    description:
      "How to book a taxi to or from Kempegowda International Airport, Bangalore: distance from major areas, travel time, which vehicle to choose, and tips for early flights and late arrivals.",
    date: "2026-10-20",
    readMins: 5,
    route: "bangalore-airport-taxi",
    faqs: [
      {
        q: "How far is Bangalore airport from the city?",
        a: "Kempegowda International Airport is in Devanahalli, about 35 to 60 km from most parts of Bangalore. From MG Road it is roughly 35 to 40 km, and from Electronic City about 60 km.",
      },
      {
        q: "How long does it take to reach Bangalore airport by taxi?",
        a: "Usually 1 to 1.5 hours. Late at night it can be under an hour, while the 7 to 10 AM and 5 to 9 PM rush hours can add a lot of time.",
      },
      {
        q: "Can I pre-book an airport taxi for a late-night or early-morning flight?",
        a: "Yes. Pre-booking means the driver is waiting when you land, or reaches your home on time for an early flight. Airport pickups and drops run at any hour.",
      },
      {
        q: "Which vehicle should I book for the airport?",
        a: "A sedan or Innova Crysta suits up to 6 people with luggage. A Tempo Traveller or Force Urbania suits 8 to 12 people. Larger groups can use a mini bus.",
      },
      {
        q: "How is the airport taxi fare decided?",
        a: "The fare depends on your pickup or drop area, the vehicle and any waiting time. Tolls and parking are charged on actuals. Share your area and flight time and we confirm the price before you travel.",
      },
    ],
    body: [
      { t: "p", text: "Kempegowda International Airport (BLR) is in Devanahalli, well outside the city, so the ride is long and the timing matters. This guide covers how far it is from major areas, how long to allow, which vehicle to choose and how to avoid the common problems with early flights and late arrivals." },
      { t: "h2", text: "Distance and time from major areas" },
      {
        t: "table",
        head: ["Area", "Distance to airport", "Typical time"],
        rows: areaDistances.map((a) => [a.area, a.km, a.time]),
      },
      { t: "note", text: "Times are typical figures without heavy traffic. Allow extra during the 7 to 10 AM and 5 to 9 PM peaks." },
      { t: "h2", text: "Which vehicle should you book?" },
      {
        t: "table",
        head: ["Group size", "Best vehicle", "Why"],
        rows: [
          ["1 to 4 people", "Sedan", "Comfortable and the most economical for a small group"],
          ["Up to 6 people with luggage", v("Innova Crysta").name, `${v("Innova Crysta").seats} seats and good boot space`],
          ["8 to 12 people", "Tempo Traveller or Force Urbania", "Everyone travels together with room for bags"],
          ["15 or more", "Mini bus", "One vehicle for a group or a family function"],
        ],
      },
      { t: "h2", text: "How airport taxi pricing works" },
      { t: "ul", items: [
        "The price depends on your area, the vehicle type and the time of travel.",
        "Waiting time for a delayed flight is usually charged separately, so share your flight number when you book.",
        "Tolls and parking are charged on actuals.",
        "We confirm the price when you book, so there is no surprise at the end of the trip.",
      ] },
      { t: "h2", text: "Tips for a smooth airport trip" },
      { t: "ul", items: [
        "For an early flight, book the cab the day before and confirm the pickup time.",
        "Leave earlier than you think. Allow about 1.5 to 2 hours of travel from the far side of the city in peak traffic.",
        "For arrivals, share your flight number and terminal so the driver can track the landing.",
        "Keep the driver's number handy so you can meet quickly after you collect your bags.",
        "For a group with a lot of luggage, choose the next size up.",
      ] },
      { t: "h2", text: "Airport drop and pickup in one booking" },
      { t: "p", text: "If you are travelling out and back, you can book both legs together. Tell us your drop time and your return flight, and the driver will be there on both days. For trips that go beyond the city, such as an airport arrival followed by a drive to Mysore or Coorg, we quote the whole journey as one trip." },
    ],
  },
  {
    slug: "bangalore-to-ooty-taxi-fare",
    title: "Bangalore to Ooty Taxi Fare: Price, Distance and Trip Plan",
    description:
      "What a taxi from Bangalore to Ooty costs for a 2 or 3 day round trip in an Innova Crysta, Tempo Traveller or bus, plus distance, drive time, the Bandipur forest stretch, best season and a sample itinerary.",
    date: "2026-10-20",
    readMins: 6,
    route: "bangalore-to-ooty-cab",
    faqs: [
      {
        q: "What is the taxi fare from Bangalore to Ooty?",
        a: `For a 3-day round trip of about ${ooty.km * 2} km, an Innova Crysta works out to roughly ${inr(ofare("Innova Crysta", 3))} and a Tempo Traveller to roughly ${inr(ofare("Tempo Traveller", 3))} at our listed AC rates, before tolls, parking and entry fees. We confirm the exact fare when you book.`,
      },
      {
        q: "How far is Ooty from Bangalore?",
        a: `Ooty is about ${ooty.km} km from Bangalore and takes ${ooty.hours} by road, via ${ooty.via}.`,
      },
      {
        q: "Can Ooty be done in two days from Bangalore?",
        a: "Yes, but it is a long drive each way. Two days gives you one afternoon and one morning in Ooty. Three days is more relaxed, and lets you add Coonoor or Pykara.",
      },
      {
        q: "Is it safe to drive through Bandipur at night?",
        a: "Night traffic is restricted on the Bandipur forest stretch, so plan to cross it in daylight. Leave Bangalore early so you reach that stretch well before evening.",
      },
      {
        q: "Which vehicle is best for an Ooty trip?",
        a: "An Innova Crysta suits up to 6 people. A Tempo Traveller or Force Urbania suits 8 to 12. The hill roads have many bends, so a rested and experienced driver matters more than the vehicle size.",
      },
    ],
    body: [
      { t: "p", text: `Ooty is one of the most popular hill trips from Bangalore. It is about ${ooty.km} km away, roughly ${ooty.hours} by road, through Mysore, Gundlupet and the Bandipur forest. This guide covers what the taxi costs, which vehicle to choose and how to plan the days.` },
      { t: "h2", text: "Bangalore to Ooty taxi fare (3-day round trip)" },
      { t: "p", text: `The estimates below use our listed AC per-km rate on the full ${ooty.km * 2} km round trip, plus three days of driver bata. Tolls, parking and entry fees are extra.` },
      {
        t: "table",
        head: ["Vehicle", "Seats", "AC rate / km", "Driver bata / day", "3-day estimate"],
        rows: pick.map((n) => [n, String(v(n).seats), v(n).acRate, inr(v(n).bata), inr(ofare(n, 3))]),
      },
      { t: "p", text: "For a 2-day trip, the km cost stays the same and you save one day of driver bata." },
      {
        t: "table",
        head: ["Vehicle", "2-day estimate", "3-day estimate"],
        rows: pick.map((n) => [n, inr(ofare(n, 2)), inr(ofare(n, 3))]),
      },
      { t: "note", text: "These are indicative estimates from published per-km rates. The final fare is confirmed when you book and depends on your dates, pickup point and the places you visit in and around Ooty." },
      { t: "h2", text: "What changes the fare" },
      { t: "ul", items: [
        "Vehicle type: a 12-seater costs more per km than a 7-seater, but is usually cheaper per person for a group.",
        "Number of days: each day adds driver bata, and a longer stay usually means more local km.",
        "Local sightseeing: Ooty Lake, Doddabetta, Pykara and Coonoor all add km on the hill roads.",
        "AC or non-AC: non-AC has a lower per-km rate in the cooler months.",
        "Tolls, parking and entry fees: charged on actuals and not part of the per-km rate.",
      ] },
      { t: "h2", text: "Which vehicle should you choose?" },
      { t: "table", head: ["Group size", "Best vehicle"], rows: [
        ["Up to 6 people", "Innova Crysta"],
        ["8 to 12 people", "Tempo Traveller or Force Urbania"],
        ["15 to 22 people", "22 seater bus"],
        ["25 or more", "25 to 50 seater bus"],
      ] },
      { t: "h2", text: "Route and drive time" },
      { t: "p", text: `The usual route is via ${ooty.via}. Expect about ${ooty.hours} without long stops, and more on weekends and holidays. ${ooty.tip}` },
      { t: "h2", text: "Best time to visit Ooty" },
      { t: "p", text: ooty.bestTime },
      { t: "h2", text: "A simple 3-day plan" },
      { t: "ul", items: [
        "Day 1: Leave Bangalore by 5 to 6 AM, breakfast near Mysore, cross Bandipur in daylight and reach Ooty by afternoon. Evening at Ooty Lake or the market.",
        "Day 2: Doddabetta Peak early, then the Botanical Gardens. Add Pykara Falls or Coonoor if you have time.",
        "Day 3: Start the return after breakfast, so you cross the Bandipur stretch in daylight and reach Bangalore in the evening.",
      ] },
      { t: "h2", text: "Tips before you book" },
      { t: "ul", items: [
        "Book at least a week ahead for weekends, long weekends and the summer season.",
        "Ask for a driver who knows the hill roads, and keep to the daytime driving on the Bandipur stretch.",
        "Carry a light jacket. Mornings in Ooty are cool all year.",
        "Entry fees at gardens and viewpoints are paid on the spot and are not included in the fare.",
      ] },
    ],
  },
  highwayPost({
    slug: "bangalore-to-chennai-taxi-fare",
    routeSlug: "bangalore-to-chennai-cab",
    title: "Bangalore to Chennai Taxi Fare: One Way and Round Trip Guide",
    description:
      "What a taxi from Bangalore to Chennai costs, how long the drive takes, one-way drop versus round trip, and which vehicle to choose, with sample fares for an Innova Crysta, Tempo Traveller and bus.",
    days: 2,
    readMins: 5,
    lead: "Bangalore to Chennai is a long highway drive used by business travellers, families and airport passengers. It is about 345 km, so planning the vehicle, the buffer for flights and the type of trip saves money and stress. This guide explains the fare and how to book.",
    oneWay: "Most Chennai trips are one-way: an airport or station drop, a business visit or a move. If you are not coming back by road with the same vehicle, a one-way drop is simpler. If you are returning to Bangalore within a day or two, a round trip with the same vehicle usually works out better. Tell us your plan and we quote both.",
    plan: [
      "Early start: leave Bangalore by 5 to 6 AM to reach Chennai before the city traffic builds up.",
      "Flights: for a flight, allow at least 2 hours of buffer. Toll and traffic near Chennai can add time.",
      "Stop at Vellore or Krishnagiri for a break. The road is fast but long.",
      "If staying over, add Mahabalipuram or Marina Beach on the second day.",
    ],
    tips: [
      "Book the day before for an early airport drop, and confirm the pickup time with us.",
      "Avoid the peak of the northeast monsoon in November for sightseeing.",
      "Share your drop address so the driver can plan the final stretch.",
      "Tolls are charged on actuals, so keep some cash or FASTag balance ready.",
    ],
    extraFaq: {
      q: "Can I book a one-way taxi from Bangalore to Chennai?",
      a: "Yes. One-way drops to Chennai are our most common request on this route. Share your date, pickup point and drop location, and we confirm the fare before you book.",
    },
  }),
  highwayPost({
    slug: "bangalore-to-coimbatore-taxi-fare",
    routeSlug: "bangalore-to-coimbatore-cab",
    title: "Bangalore to Coimbatore Taxi Fare: Price, Distance and Isha Trip Plan",
    description:
      "What a taxi from Bangalore to Coimbatore costs for a round trip, how long the drive takes, one-way drop options and a plan that includes Isha Yoga Centre, with sample fares by vehicle.",
    days: 2,
    readMins: 5,
    lead: "Coimbatore is a regular route for business travellers, families and visitors to the Isha Yoga Centre. It is about 365 km from Bangalore, so a one-way drop or a two-day trip works best. This guide covers the fare, the route and how to plan the days.",
    oneWay: "A one-way drop suits airport, railway and business trips. For a visit to Isha Yoga Centre or Coimbatore sightseeing, a two-day round trip with the same vehicle is usually more convenient, since the driver stays with you and you avoid arranging a return. We quote both.",
    plan: [
      "Day 1: leave Bangalore early, break near Salem or Erode, and reach Coimbatore by afternoon.",
      "Evening: Isha Yoga Centre and the Adiyogi statue, or the Marudhamalai Temple.",
      "Day 2: Siruvani Waterfalls or a local visit, then start the return after breakfast.",
      "For a flight or train, leave with a 2-hour buffer, since toll queues near Salem can add time.",
    ],
    tips: [
      "Check visiting hours and any booking rules for Isha Yoga Centre before you go.",
      "Book ahead for weekends and festival periods.",
      "Share the number of people and luggage so we pick the right vehicle.",
      "Tolls and parking are charged on actuals.",
    ],
    extraFaq: {
      q: "Can I visit Isha Yoga Centre on a Bangalore to Coimbatore trip?",
      a: "Yes. Many passengers combine the drive with a visit to Isha Yoga Centre and the Adiyogi statue. Check the centre's visiting hours first, and tell us your plan so the driver can time the day.",
    },
  }),
  highwayPost({
    slug: "bangalore-to-tirupati-taxi-fare",
    routeSlug: "bangalore-to-tirupati-cab",
    title: "Bangalore to Tirupati Taxi Fare: Price, Distance and Darshan Trip Plan",
    description:
      "What a taxi from Bangalore to Tirupati costs for a round trip, how long the drive takes, how to plan the pickup around your darshan slot, and which vehicle suits your group, with sample fares.",
    days: 2,
    readMins: 5,
    lead: "Tirupati is one of the most common pilgrimage trips from Bangalore. It is about 250 km, roughly 5 to 5.5 hours each way, so most families go for a night and a day. This guide explains the fare, the timing around your darshan slot and how to choose a vehicle.",
    oneWay: "Most pilgrims book a round trip so the same driver waits and brings them back. If you are travelling only one way, for example a drop to Tirupati and a return by train, we can quote a one-way drop instead. Tell us your plan and we quote both.",
    plan: [
      "Night or early start: many travellers leave Bangalore at night or very early so they reach Tirupati before the darshan slot.",
      "Tirumala: the drive up the ghat road takes extra time, so keep a buffer before your slot.",
      "After darshan: Sri Padmavathi Temple at Tiruchanur or Kapila Theertham fit well on the way back.",
      "Return: start after a meal and rest, since the drive back is long after a day of queues.",
    ],
    tips: [
      "Book your darshan slot in advance and share the time, so we can plan the pickup around it.",
      "Weekends and festival days are very crowded, so book the cab early.",
      "Tell us the number of people and elderly passengers so we choose the right vehicle.",
      "Tolls and parking are charged on actuals.",
    ],
    extraFaq: {
      q: "Can the driver wait while we do darshan?",
      a: "Yes. On a round trip the driver stays with the vehicle for the duration of your visit and brings you back. Share your darshan slot and expected finish time so we can plan the return.",
    },
  }),
  {
    slug: "one-way-drop-taxi-bangalore-to-erode-cuddalore-salem",
    title: "One Way Drop Taxi from Bangalore to Erode, Cuddalore and Salem",
    description:
      "How one-way drop taxis from Bangalore to Erode, Cuddalore and Salem work: distances, drive times, how the fare is quoted, which vehicle to pick and how to book a drop with a driver.",
    date: "2026-10-26",
    readMins: 4,
    route: "bangalore-to-coimbatore-cab",
    faqs: [
      {
        q: "How much is a one way drop taxi from Bangalore to Erode?",
        a: "The fare depends on the vehicle, the date and your pickup point. Share your pickup area and drop location on WhatsApp or call, and we confirm the one-way fare before you book. Tolls and parking are charged on actuals.",
      },
      {
        q: "How far are Erode, Cuddalore and Salem from Bangalore?",
        a: "Salem is roughly 200 km, Erode roughly 270 km and Cuddalore roughly 290 km from Bangalore by road. Drive times are about 4 to 5 hours for Salem and 5 to 7 hours for Erode and Cuddalore, depending on traffic near Hosur.",
      },
      {
        q: "Can I book a drop taxi for a family or a group?",
        a: "Yes. An Innova Crysta suits up to 6 people, a Tempo Traveller or Force Urbania suits 8 to 12, and larger groups can book a 22 seater or bigger bus.",
      },
      {
        q: "Do you take other towns in Tamil Nadu?",
        a: "Yes. We take one-way drops to most towns on the Hosur, Krishnagiri, Salem and Tiruvannamalai highways. Ask us for your destination and we confirm the fare.",
      },
    ],
    body: [
      { t: "p", text: "Many people leave Bangalore for a one-way trip to a Tamil Nadu town: a family function, a home visit, a job move or a pickup from the railway station. A drop taxi suits these trips, because you do not pay for the vehicle to wait or for a full round trip. This guide covers the three most requested drops: Salem, Erode and Cuddalore." },
      { t: "h2", text: "Distance and drive time from Bangalore" },
      {
        t: "table",
        head: ["Destination", "Approx distance", "Drive time", "Usual route"],
        rows: [
          ["Salem", "200 km", "4 to 5 hours", "Hosur, Krishnagiri, Dharmapuri"],
          ["Erode", "270 km", "5 to 6 hours", "Hosur, Krishnagiri, Salem"],
          ["Cuddalore", "290 km", "6 to 7 hours", "Hosur, Krishnagiri, Tiruvannamalai, Villupuram"],
        ],
      },
      { t: "note", text: "Distances and times are approximate and change with the route, traffic and stops. We confirm the actual route when you book." },
      { t: "h2", text: "How the one-way fare is worked out" },
      { t: "p", text: "A one-way drop is quoted for your vehicle, date and pickup point, not as a fixed price for the town. Because the driver has to return, a drop is quoted differently from a round trip. Send us your pickup area, the drop address and your travel date, and we confirm the fare before you book." },
      { t: "ul", items: [
        "Vehicle type: an Innova Crysta, Tempo Traveller or bus is priced differently.",
        "Pickup point: Whitefield, Electronic City and Hebbal start from different distances.",
        "Time of travel: night and festival-day trips can cost more.",
        "Tolls and parking: charged on actuals and not part of the base fare.",
      ] },
      { t: "h2", text: "Which vehicle to choose" },
      { t: "table", head: ["Group size", "Best vehicle"], rows: [
        ["Up to 6 people", "Innova Crysta"],
        ["8 to 12 people", "Tempo Traveller or Force Urbania"],
        ["15 to 22 people", "22 seater bus"],
        ["25 or more", "25 to 50 seater bus"],
      ] },
      { t: "h2", text: "Tips for a one-way trip" },
      { t: "ul", items: [
        "Leave Bangalore before 6 AM or after 9 PM to avoid the heaviest traffic towards Hosur.",
        "Share the full drop address and a local contact number so the driver can find it.",
        "Book a day ahead for weekends and festival days.",
        "Tell us about the luggage, so we choose a vehicle with enough space.",
      ] },
      { t: "p", text: "For other destinations, see our drop taxi page, or message us your route on WhatsApp for a quick quote." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
