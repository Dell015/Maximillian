// Content for the prototype. Facts come from the hotel's own site, its Facebook page
// and public booking listings. Items marked "confirm" in README.md need the hotel's OK.

export const hotel = {
  name: "The Maximilian Hotel",
  address: {
    street: "Prenza National Highway, District 1",
    city: "Cauayan City",
    region: "Isabela",
    postal: "3305",
    country: "PH",
  },
  mobile: { display: "0917 888 5959", href: "tel:+639178885959" },
  landline: { display: "+63 78 258 2918", href: "tel:+63782582918" },
  email: "hello@themaximilianhotel.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=The+Maximilian+Hotel+Cauayan+Isabela",
  checkIn: "2:00 PM",
  checkOut: "12:00 noon",
  rating: { score: "4.6", count: "1,505", sources: "Agoda, Google and Booking.com" },
};

export type Room = {
  id: string;
  name: string;
  bed: string;
  from: number; // PHP per night, "from" rate for two guests
  size: string;
  blurb: string;
  photos: string[]; // first is the room, the rest are details (bath, lounge)
};

export const rooms: Room[] = [
  {
    id: "superior-queen",
    name: "Superior Queen",
    bed: "Queen bed",
    from: 3288,
    size: "21 m²",
    blurb:
      "The most intimate room in the house. A queen bed, a writing desk and warm wood panelling, for one or two guests.",
    photos: ["room-superior-queen", "room-superior-queen-bath"],
  },
  {
    id: "superior-twin",
    name: "Superior Twin",
    bed: "Two single beds",
    from: 3288,
    size: "21 m²",
    blurb:
      "The same quiet footprint with two beds, for friends or colleagues travelling together.",
    photos: ["room-superior-twin", "room-superior-twin-b"],
  },
  {
    id: "deluxe-king",
    name: "Deluxe King",
    bed: "King bed",
    from: 4288,
    size: "28 m²",
    blurb:
      "Extra floor space, a work desk and softer light. Comfortable for couples, or a couple with a toddler.",
    photos: ["room-deluxe-king", "room-deluxe-king-b", "room-deluxe-king-bath"],
  },
  {
    id: "deluxe-twin",
    name: "Deluxe Twin",
    bed: "Two single beds",
    from: 4288,
    size: "28 m²",
    blurb: "The Deluxe room laid out with twin beds and an armchair by the window.",
    photos: ["room-deluxe-twin", "room-deluxe-twin-b", "room-deluxe-twin-bath"],
  },
  {
    id: "premier-king",
    name: "Premier King",
    bed: "King bed",
    from: 5288,
    size: "34 m²",
    blurb:
      "A generous king bed, a mini bar and a full bath, with views over the pool and garden.",
    photos: ["room-premier-king", "room-premier-king-b", "room-premier-king-bath"],
  },
  {
    id: "premier-twin",
    name: "Premier Twin",
    bed: "Two single beds",
    from: 5288,
    size: "34 m²",
    blurb: "Premier proportions with twin beds, a mini bar and long garden-facing windows.",
    photos: ["room-premier-twin", "room-premier-twin-b", "room-premier-twin-bath"],
  },
  {
    id: "one-bedroom-suite",
    name: "One Bedroom Suite",
    bed: "King bed",
    from: 12288,
    size: "68 m²",
    blurb:
      "A separate bedroom, a lounge with a sofa bed, and a deep soaking tub. Built for privacy and longer stays.",
    photos: [
      "room-suite",
      "room-suite-living",
      "room-suite-living-b",
      "room-suite-bath",
    ],
  },
];

export function formatPeso(n: number): string {
  return "₱" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export type Chapter = {
  id: string;
  when: string;
  title: string;
  text: string;
  main: string;
  aux: string;
  alt: string;
  auxAlt: string;
  cta?: boolean;
};

// The scroll story: one day at the hotel, in five scenes.
export const chapters: Chapter[] = [
  {
    id: "arrive",
    when: "Arrive",
    title: "The desk is always open.",
    text: "The front desk runs around the clock, so there is never a wrong hour to arrive. Check-in from 2:00 PM.",
    main: "arrival-desk",
    alt: "The reception desk at The Maximilian Hotel",
    aux: "lobby-stair",
    auxAlt: "The staircase in the lobby",
  },
  {
    id: "morning",
    when: "Morning",
    title: "Breakfast, unhurried.",
    text: "Continental breakfast from 6:30 to 9:30, in the dining room or on a tray in your room. A fitness room is open if you want it.",
    main: "buffet",
    alt: "The breakfast spread in the morning",
    aux: "couple-robes",
    auxAlt: "Two guests sharing breakfast in robes",
  },
  {
    id: "midday",
    when: "Midday",
    title: "The pool, the palms.",
    text: "An outdoor pool set in a courtyard garden, with loungers in the shade and the rooms stacked quietly around it.",
    main: "pool",
    alt: "The pool and palms",
    aux: "pool-swim",
    auxAlt: "A guest in the pool",
  },
  {
    id: "evening",
    when: "Evening",
    title: "Dinner at Gusto.",
    text: "Filipino favourites and international plates in the hotel’s own restaurant, with King’s Row for something more casual.",
    main: "gusto-table",
    alt: "A long table laid at Gusto Restaurant",
    aux: "cocktail-dessert",
    auxAlt: "A cocktail and dessert at the bar",
  },
  {
    id: "night",
    when: "Night",
    title: "Then the garden, then your room.",
    text: "The courtyard is lit low after dark. Seven room types, from ₱3,288 a night for two guests.",
    main: "walkway-night",
    alt: "The garden walkway lit at night",
    aux: "room-premier-king",
    auxAlt: "A Premier King room",
    cta: true,
  },
];

// The house: a slow horizontal walk through the building.
export type Frame = { slug: string; alt: string; caption: string; shape: "tall" | "wide" | "square" };

export const house: Frame[] = [
  { slug: "courtyard", alt: "The courtyard and pool from above", caption: "The courtyard", shape: "wide" },
  { slug: "chandeliers", alt: "Lantern chandeliers in the lobby", caption: "Lantern light", shape: "tall" },
  { slug: "lobby-stair", alt: "The stone staircase", caption: "The staircase", shape: "wide" },
  { slug: "art-hall", alt: "A hall with a painting at its end", caption: "A hall, a painting", shape: "wide" },
  { slug: "lobby-table", alt: "The long lounge table", caption: "The lounge", shape: "tall" },
  { slug: "sofa", alt: "A sofa and carved side table", caption: "A quiet corner", shape: "tall" },
  { slug: "sculpture", alt: "A red sculpture in a corridor", caption: "The corridor", shape: "wide" },
  { slug: "garden-path", alt: "The garden path between the rooms", caption: "The garden path", shape: "tall" },
  { slug: "lamps", alt: "Hanging lamps over a timber screen", caption: "Timber and brass", shape: "tall" },
];

export const goodToKnow: { name: string; detail: string }[] = [
  { name: "Check-in and out", detail: "Check-in from 2:00 PM. Check-out by 12:00 noon." },
  { name: "Breakfast", detail: "Continental, 6:30 to 9:30 AM." },
  { name: "Front desk", detail: "Open 24 hours." },
  { name: "Wi-Fi and parking", detail: "Free Wi-Fi in public areas and free self parking." },
];
