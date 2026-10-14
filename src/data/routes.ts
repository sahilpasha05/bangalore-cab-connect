export type RouteInfo = {
  slug: string;
  kind: "outstation" | "airport";
  to: string;
  km: number;
  hours: string;
  title: string; // H1 / SEO subject
  intro: string;
  highlights: string[];
  bestTime: string;
  tip: string;
  via: string;
};

// Distances and times are approximate road figures from Bangalore city centre.
export const routes: RouteInfo[] = [
  {
    slug: "bangalore-to-mysore-cab",
    kind: "outstation",
    to: "Mysore",
    km: 145,
    hours: "3 to 3.5 hours",
    title: "Bangalore to Mysore Cab",
    intro:
      "Mysore is the most requested day trip from Bangalore. The drive is about 145 km on a fast highway, so a one-day return trip is easy to plan.",
    highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens, KRS", "Srirangapatna"],
    bestTime: "October to February. Dasara season is busy, so book early.",
    tip: "Start before 6 AM to clear city traffic and reach Mysore for breakfast.",
    via: "Bengaluru-Mysuru highway via Ramanagara and Mandya",
  },
  {
    slug: "bangalore-to-coorg-cab",
    kind: "outstation",
    to: "Coorg",
    km: 250,
    hours: "5.5 to 6 hours",
    title: "Bangalore to Coorg Taxi",
    intro:
      "Coorg (Madikeri) is a favourite weekend break for families and friend groups. The last stretch is a hill road, so a driver who knows the route makes the trip safer and calmer.",
    highlights: ["Abbey Falls", "Raja's Seat", "Dubare Elephant Camp", "Namdroling Monastery"],
    bestTime: "October to March. Heavy rain from June to August can slow the ghat sections.",
    tip: "Plan at least two days. A same-day return is possible but leaves little time to see anything.",
    via: "Mysore Road via Channapatna, Mandya and Kushalnagar",
  },
  {
    slug: "bangalore-to-ooty-cab",
    kind: "outstation",
    to: "Ooty",
    km: 280,
    hours: "6.5 to 7 hours",
    title: "Bangalore to Ooty Cab",
    intro:
      "Ooty is a long but scenic drive through Mysore, Gundlupet and the Bandipur forest. A rested driver and an early start matter more here than on shorter routes.",
    highlights: ["Botanical Gardens", "Ooty Lake", "Doddabetta Peak", "Pykara Falls"],
    bestTime: "March to June and September to November. Mornings are cool all year.",
    tip: "Travel through the Bandipur forest stretch in daylight. Night traffic is restricted there.",
    via: "Mysore, Gundlupet and Bandipur",
  },
  {
    slug: "bangalore-to-chikmagalur-cab",
    kind: "outstation",
    to: "Chikmagalur",
    km: 245,
    hours: "5 to 5.5 hours",
    title: "Bangalore to Chikmagalur Taxi",
    intro:
      "Chikmagalur offers coffee estates, hill viewpoints and waterfalls. It suits a weekend away and works well for both small groups and larger families.",
    highlights: ["Mullayanagiri", "Baba Budangiri", "Hebbe Falls", "Kemmanagundi"],
    bestTime: "October to March. The hills are green after the monsoon, from September.",
    tip: "Some estate and viewpoint roads are rough. Tell us your homestay so the driver can plan the last stretch.",
    via: "NH75 via Hassan or via Belur",
  },
  {
    slug: "bangalore-to-tirupati-cab",
    kind: "outstation",
    to: "Tirupati",
    km: 250,
    hours: "5 to 5.5 hours",
    title: "Bangalore to Tirupati Cab",
    intro:
      "Many pilgrims travel from Bangalore to Tirupati for darshan. A cab lets you leave at night or early morning and keep the timing flexible around your darshan slot.",
    highlights: ["Tirumala Venkateswara Temple", "Sri Padmavathi Temple, Tiruchanur", "Kapila Theertham"],
    bestTime: "September to February. Weekends and festivals are very crowded.",
    tip: "Book your darshan slot in advance and tell us the time, so we can schedule the pickup around it.",
    via: "Kolar, Mulbagal and Chittoor",
  },
  {
    slug: "bangalore-to-chennai-cab",
    kind: "outstation",
    to: "Chennai",
    km: 345,
    hours: "6 to 7 hours",
    title: "Bangalore to Chennai Taxi",
    intro:
      "The Bangalore to Chennai drive is a long highway run used by business travellers, families and airport passengers. A one-way drop is the most common request.",
    highlights: ["Marina Beach", "Mahabalipuram", "Chennai Airport and Central station drops"],
    bestTime: "Year-round. Avoid the peak of the northeast monsoon in November.",
    tip: "For flights, leave with at least a 2-hour buffer. Toll and traffic near Chennai can add time.",
    via: "Hosur, Krishnagiri, Vellore and Sriperumbudur",
  },
  {
    slug: "bangalore-to-pondicherry-cab",
    kind: "outstation",
    to: "Pondicherry",
    km: 310,
    hours: "6.5 to 7 hours",
    title: "Bangalore to Pondicherry Taxi",
    intro:
      "Pondicherry is a popular long weekend trip for beaches, cafes and the French Quarter. The drive is long, so most travellers take a two-night plan.",
    highlights: ["Promenade Beach", "Auroville", "White Town", "Paradise Beach"],
    bestTime: "October to March. Summers are hot and humid.",
    tip: "Start early on Friday or Saturday to avoid the heaviest Hosur traffic.",
    via: "Hosur, Krishnagiri, Tiruvannamalai and Tindivanam",
  },
  {
    slug: "bangalore-to-goa-cab",
    kind: "outstation",
    to: "Goa",
    km: 560,
    hours: "10 to 11 hours",
    title: "Bangalore to Goa Cab",
    intro:
      "Goa is a long drive, so it is best done as a relaxed multi-day trip with two drivers or overnight halts. Larger groups usually choose a Tempo Traveller or mini bus.",
    highlights: ["North Goa beaches", "Old Goa churches", "Dudhsagar Falls", "Panjim"],
    bestTime: "November to February. Monsoon months are quiet and many beach shacks close.",
    tip: "Break the journey at Hubballi or Dharwad. Do not plan a same-day return.",
    via: "NH48 via Tumakuru, Chitradurga and Hubballi, then Belagavi or Karwar",
  },
  {
    slug: "bangalore-to-hampi-cab",
    kind: "outstation",
    to: "Hampi",
    km: 340,
    hours: "6.5 to 7 hours",
    title: "Bangalore to Hampi Taxi",
    intro:
      "Hampi is a UNESCO World Heritage site with temples and boulder landscapes spread over a large area. Having a cab with you for the full stay is much easier than relying on local rides.",
    highlights: ["Virupaksha Temple", "Vittala Temple stone chariot", "Hemakuta Hill", "Matanga Hill sunrise"],
    bestTime: "October to February. Summers are very hot.",
    tip: "Reach by afternoon and keep sunrise for the second morning. Carry water and a hat.",
    via: "NH48 and NH50 via Tumakuru, Chitradurga and Hosapete",
  },
  {
    slug: "bangalore-to-wayanad-cab",
    kind: "outstation",
    to: "Wayanad",
    km: 280,
    hours: "6 to 6.5 hours",
    title: "Bangalore to Wayanad Taxi",
    intro:
      "Wayanad is a green hill district with waterfalls, caves and wildlife. The route goes through Mysore, Gundlupet and Bandipur, so timing the forest stretch is part of the planning.",
    highlights: ["Edakkal Caves", "Banasura Sagar Dam", "Chembra Peak", "Soochipara Falls"],
    bestTime: "September to May. Monsoon brings heavy rain and landslide risk on some roads.",
    tip: "Cross the Bandipur forest stretch in daylight, since night traffic is restricted.",
    via: "Mysore, Gundlupet, Bandipur and Sultan Bathery",
  },
  {
    slug: "bangalore-to-kabini-cab",
    kind: "outstation",
    to: "Kabini",
    km: 220,
    hours: "5 to 5.5 hours",
    title: "Bangalore to Kabini Taxi",
    intro:
      "Kabini is known for its backwaters and the Nagarhole forest on the other side of the river. It is a popular weekend break for wildlife and nature lovers, and the last stretch runs through village roads.",
    highlights: ["Kabini backwaters and boating", "Nagarhole National Park safaris", "Bird watching along the river", "Bheemanakolli and surrounding villages"],
    bestTime: "October to May. Safaris are most rewarding from March to May when animals come to the water.",
    tip: "Book your safari slot with the resort in advance and share the timing with us so the driver can plan arrival.",
    via: "Mysore, Hunsur and HD Kote",
  },
  {
    slug: "bangalore-to-hogenakkal-cab",
    kind: "outstation",
    to: "Hogenakkal",
    km: 130,
    hours: "3 to 3.5 hours",
    title: "Bangalore to Hogenakkal Taxi",
    intro:
      "Hogenakkal Falls on the Kaveri is a short day trip from Bangalore, known for coracle rides and cascading water. It fits easily into a one-day return plan.",
    highlights: ["Coracle rides on the Kaveri", "Hogenakkal Falls viewpoints", "Local fish fry and food stalls", "Oil massage stalls by the river"],
    bestTime: "August to December, when water flow is good. Coracle rides stop when the river is in heavy flow.",
    tip: "Check the water-flow status before you leave, and start early to avoid crowds at the coracle point.",
    via: "Hosur, Krishnagiri and Dharmapuri",
  },
  {
    slug: "bangalore-to-shivanasamudra-cab",
    kind: "outstation",
    to: "Shivanasamudra",
    km: 130,
    hours: "3 hours",
    title: "Bangalore to Shivanasamudra Cab",
    intro:
      "Shivanasamudra has two waterfalls, Gaganachukki and Barachukki, on the Kaveri. It is a quick one-day trip from Bangalore and combines well with nearby temple towns.",
    highlights: ["Gaganachukki Falls", "Barachukki Falls", "Talakadu sand dunes and temples", "Somanathapura Chennakeshava Temple"],
    bestTime: "July to November, when the falls are full.",
    tip: "Add Somanathapura or Talakadu to the same day to get more from the trip.",
    via: "Kanakapura, Malavalli and Shivanasamudra Road",
  },
  {
    slug: "bangalore-to-mangalore-cab",
    kind: "outstation",
    to: "Mangalore",
    km: 350,
    hours: "6.5 to 7 hours",
    title: "Bangalore to Mangalore Taxi",
    intro:
      "Mangalore is a common trip for business, family visits and temple tours along the coast. The route crosses the Western Ghats, so an experienced ghat driver matters.",
    highlights: ["Panambur and Tannirbhavi beaches", "Kadri Manjunath Temple", "St Aloysius Chapel", "Dharmasthala and Kukke Subramanya nearby"],
    bestTime: "October to March. Heavy monsoon rain can affect the ghat sections.",
    tip: "Leave early and plan a halt at Hassan or Sakleshpur. Avoid driving the ghat after dark in the rainy season.",
    via: "NH75 via Nelamangala, Hassan and Shiradi Ghat",
  },
  {
    slug: "bangalore-to-coimbatore-cab",
    kind: "outstation",
    to: "Coimbatore",
    km: 365,
    hours: "6.5 to 7 hours",
    title: "Bangalore to Coimbatore Taxi",
    intro:
      "Coimbatore is a regular route for business travellers, families and visitors to Isha Yoga Centre. It is a long highway drive, so a one-way drop or a two-day plan works best.",
    highlights: ["Isha Yoga Centre and Adiyogi statue", "Marudhamalai Temple", "Siruvani Waterfalls", "Coimbatore airport and railway drops"],
    bestTime: "October to March. Summers are warm but travel is fine year-round.",
    tip: "For flights or trains, leave with a 2-hour buffer, since toll queues near Salem can add time.",
    via: "Hosur, Krishnagiri, Salem and Erode",
  },
  {
    slug: "bangalore-airport-taxi",
    kind: "airport",
    to: "Kempegowda International Airport",
    km: 40,
    hours: "1 to 1.5 hours",
    title: "Bangalore Airport Taxi",
    intro:
      "Kempegowda International Airport (BLR) is in Devanahalli, roughly 35 to 60 km from most parts of the city. A pre-booked cab means the driver is there when you land, whatever the hour.",
    highlights: ["24x7 pickups and drops", "Pre-booked, no waiting for a ride", "Luggage space in Innova and Tempo Traveller", "Group transfers in bus-size vehicles"],
    bestTime: "Any time. Allow extra time for the 7 to 10 AM and 5 to 9 PM city traffic.",
    tip: "For an early flight, book the cab the day before and confirm the pickup time with us.",
    via: "NH44 and the airport road (Hebbal flyover)",
  },
];

export const getRoute = (slug: string) => routes.find((r) => r.slug === slug);

export const areaDistances = [
  { area: "MG Road / Indiranagar", km: "about 35 to 40 km", time: "1 to 1.25 hours" },
  { area: "Whitefield", km: "about 50 km", time: "1.25 to 1.5 hours" },
  { area: "Electronic City", km: "about 60 km", time: "1.25 to 1.75 hours" },
  { area: "Jayanagar / JP Nagar", km: "about 50 to 55 km", time: "1.25 to 1.5 hours" },
  { area: "Yelahanka / Hebbal", km: "about 20 to 30 km", time: "45 to 60 minutes" },
];
