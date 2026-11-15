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

export type Amenity =
  | "breakfast" | "wifi" | "aircon" | "tv" | "safe" | "toiletries" | "roomservice"
  | "pool" | "parking" | "elevator" | "security" | "desk" | "usb" | "airport"
  | "minibar" | "fullbath" | "bathtub" | "sofabed" | "lounge" | "garden";

export type Room = {
  id: string;
  name: string;
  tier: "Superior" | "Deluxe" | "Premier" | "Suite";
  bed: string;
  bedKind: "king" | "queen" | "twin";
  from: number; // PHP per night, "from" rate for two guests
  size: string;
  /** Who fits. Used to grey out rooms in the booking flow. */
  fits: { adults: number; children: number; total: number };
  sleeps: string;
  bestFor: string;
  view: string;
  blurb: string;
  story: string[];
  /** The three or four things that make this room different, shown on cards. */
  highlights: Amenity[];
  amenities: Amenity[];
  photos: string[]; // first is the room, the rest are details (bath, lounge)
};

// Shared by every room, per the hotel's own room pages.
const base: Amenity[] = [
  "breakfast", "wifi", "aircon", "tv", "safe", "toiletries", "roomservice",
  "pool", "parking", "elevator", "security",
];

export const rooms: Room[] = [
  {
    id: "superior-queen",
    name: "Superior Queen",
    tier: "Superior",
    bed: "Queen bed",
    bedKind: "queen",
    from: 3288,
    size: "21 m²",
    fits: { adults: 2, children: 1, total: 3 },
    sleeps: "2 adults, plus 1 child under 12 (no extra bed)",
    bestFor: "Solo travellers and couples",
    view: "City",
    blurb: "The most intimate room in the house: a queen bed, warm wood and premium bedding.",
    story: [
      "A quiet 21 m² room with a queen bed, premium bedding and calm, warm décor. Natural light and a simple layout make it an easy base for a short stay, whether you are here for work or a weekend.",
      "Breakfast is included, and the pool, Gusto and King’s Row are a short walk from your door.",
    ],
    highlights: ["breakfast", "wifi", "tv", "pool"],
    amenities: [...base],
    photos: ["room-superior-queen", "room-superior-queen-bath"],
  },
  {
    id: "superior-twin",
    name: "Superior Twin",
    tier: "Superior",
    bed: "Two single beds",
    bedKind: "twin",
    from: 3288,
    size: "21 m²",
    fits: { adults: 2, children: 1, total: 3 },
    sleeps: "2 adults, plus 1 child under 12 (no extra bed)",
    bestFor: "Friends and colleagues travelling together",
    view: "City",
    blurb: "The same quiet footprint with two single beds, for friends or colleagues.",
    story: [
      "The Superior room laid out with two single beds. Everything you need and nothing you don’t: premium bedding, a smart TV, an electronic safe and fast Wi-Fi.",
      "A practical choice for two people sharing who still want a proper hotel, with breakfast included.",
    ],
    highlights: ["breakfast", "wifi", "tv", "pool"],
    amenities: [...base],
    photos: ["room-superior-twin", "room-superior-twin-b"],
  },
  {
    id: "deluxe-king",
    name: "Deluxe King",
    tier: "Deluxe",
    bed: "King bed",
    bedKind: "king",
    from: 4288,
    size: "28 m²",
    fits: { adults: 2, children: 1, total: 3 },
    sleeps: "2 adults, plus a toddler",
    bestFor: "Couples, or a couple with a toddler",
    view: "City",
    blurb: "More floor space, a king bed and a proper work desk. Airport transfers included.",
    story: [
      "Extra space and a king bed, with a dedicated work desk, USB charging and a smart LED TV. Room to unwind after a long day, or to get a few hours of work done.",
      "Deluxe rooms include airport transfers, so the stay starts the moment you land in Cauayan.",
    ],
    highlights: ["airport", "desk", "breakfast", "usb"],
    amenities: [...base, "desk", "usb", "airport"],
    photos: ["room-deluxe-king", "room-deluxe-king-b", "room-deluxe-king-bath"],
  },
  {
    id: "deluxe-twin",
    name: "Deluxe Twin",
    tier: "Deluxe",
    bed: "Two single beds",
    bedKind: "twin",
    from: 4288,
    size: "28 m²",
    fits: { adults: 2, children: 1, total: 3 },
    sleeps: "2 adults, plus a toddler",
    bestFor: "Two people sharing who want more room",
    view: "City",
    blurb: "The Deluxe room with twin beds, a work desk and airport transfers.",
    story: [
      "The Deluxe room laid out with two single beds, a work desk and USB charging. Good for business trips for two, or family sharing.",
      "Airport transfers and breakfast are included.",
    ],
    highlights: ["airport", "desk", "breakfast", "usb"],
    amenities: [...base, "desk", "usb", "airport"],
    photos: ["room-deluxe-twin", "room-deluxe-twin-b", "room-deluxe-twin-bath"],
  },
  {
    id: "premier-king",
    name: "Premier King",
    tier: "Premier",
    bed: "Super king bed",
    bedKind: "king",
    from: 5288,
    size: "34 m²",
    fits: { adults: 2, children: 1, total: 3 },
    sleeps: "2 adults",
    bestFor: "Anniversaries, longer stays, a little indulgence",
    view: "Pool and garden",
    blurb: "A super king bed, a mini bar and a full bath, looking over the pool and garden.",
    story: [
      "Our Premier rooms are the most generous standard rooms in the house: a super king bed, a mini bar and full bath amenities.",
      "Windows look out over the pool and the manicured garden, so the quietest part of the hotel is the view from your bed.",
    ],
    highlights: ["garden", "minibar", "fullbath", "breakfast"],
    amenities: [...base, "minibar", "fullbath", "garden"],
    photos: ["room-premier-king", "room-premier-king-b", "room-premier-king-bath"],
  },
  {
    id: "premier-twin",
    name: "Premier Twin",
    tier: "Premier",
    bed: "Two single beds",
    bedKind: "twin",
    from: 5288,
    size: "34 m²",
    fits: { adults: 2, children: 1, total: 3 },
    sleeps: "2 adults",
    bestFor: "Two people sharing, with a view",
    view: "Pool and garden",
    blurb: "Premier proportions with twin beds, a mini bar and garden-facing windows.",
    story: [
      "The Premier room with two single beds, a mini bar and full bath amenities.",
      "Long windows face the pool and garden.",
    ],
    highlights: ["garden", "minibar", "fullbath", "breakfast"],
    amenities: [...base, "minibar", "fullbath", "garden"],
    photos: ["room-premier-twin", "room-premier-twin-b", "room-premier-twin-bath"],
  },
  {
    id: "one-bedroom-suite",
    name: "One Bedroom Suite",
    tier: "Suite",
    bed: "King bed and sofa bed",
    bedKind: "king",
    from: 12288,
    size: "68 m²",
    fits: { adults: 3, children: 2, total: 4 },
    sleeps: "2 adults in the bedroom, plus the sofa bed for family or a guest",
    bestFor: "Families, honeymoons and long stays",
    view: "City",
    blurb: "A separate bedroom, a lounge with a sofa bed, and a deep soaking tub.",
    story: [
      "Built for privacy. A separate master bedroom with a king bed, and an ante room with a lounge and a sofa bed for extra guests or family.",
      "End the day in the suite’s own bathtub. Breakfast is included.",
    ],
    highlights: ["lounge", "sofabed", "bathtub", "breakfast"],
    amenities: [...base, "lounge", "sofabed", "bathtub"],
    photos: ["room-suite", "room-suite-living", "room-suite-living-b", "room-suite-bath"],
  },
];

export const roomPolicies = [
  { name: "Check-in and out", detail: "Check-in from 2:00 PM. Check-out by 12:00 noon." },
  { name: "Cancellation", detail: "Free cancellation up to 48 hours before check-in." },
  { name: "Payment", detail: "Credit card, QR code or bank transfer. The hotel confirms the final price before you pay." },
  { name: "Children", detail: "Children under 12 can share the room in the existing beds. Superior rooms have no extra bed option." },
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
    text: "Breakfast is included with every room, served at Gusto from 6:00 AM. A fitness room is open if you want it.",
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
  { name: "Breakfast", detail: "Included with every room, served at Gusto." },
  { name: "Front desk", detail: "Open 24 hours." },
  { name: "Wi-Fi and parking", detail: "Free Wi-Fi in public areas and free self parking." },
];
