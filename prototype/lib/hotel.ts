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
  size?: string;
  blurb: string;
  photo: string; // slot name in /public/images
};

export const rooms: Room[] = [
  {
    id: "superior-queen",
    name: "Superior Queen",
    bed: "Queen bed",
    from: 3288,
    size: "About 21 m²",
    blurb: "A comfortable room for up to two adults, with a queen bed.",
    photo: "room-superior",
  },
  {
    id: "deluxe-king",
    name: "Deluxe King",
    bed: "King bed",
    from: 4288,
    blurb: "More space and refined furnishings, with a king bed.",
    photo: "room-deluxe-king",
  },
  {
    id: "deluxe-twin",
    name: "Deluxe Twin",
    bed: "Two single beds",
    from: 4288,
    blurb: "The Deluxe layout with twin beds, for friends or colleagues.",
    photo: "room-deluxe-twin",
  },
  {
    id: "premier-king",
    name: "Premier King",
    bed: "King bed",
    from: 5288,
    blurb: "Upscale design and comfort. Some Premier rooms overlook the city.",
    photo: "room-premier-king",
  },
  {
    id: "premier-twin",
    name: "Premier Twin",
    bed: "Two single beds",
    from: 5288,
    blurb: "The Premier styling with twin beds. Some rooms overlook the city.",
    photo: "room-premier-twin",
  },
  {
    id: "one-bedroom-suite",
    name: "One Bedroom Suite",
    bed: "King bed",
    from: 12288,
    blurb: "A suite designed for privacy and relaxation, for longer stays.",
    photo: "room-suite",
  },
];

export function formatPeso(n: number): string {
  return "₱" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export type Chapter = {
  id: "morning" | "afternoon" | "evening" | "night";
  when: string;
  title: string;
  text: string;
  photo: string;
  alt: string;
  tone: "dusk" | "stone";
  cta?: boolean;
};

// The scroll story. Every line maps to something the hotel offers.
export const chapters: Chapter[] = [
  {
    id: "morning",
    when: "Morning",
    title: "Breakfast, then the gym.",
    text: "Continental breakfast is served from 6:30 to 9:30 AM, and there’s a fitness room on site.",
    photo: "story-morning",
    alt: "Breakfast at The Maximilian Hotel",
    tone: "stone",
  },
  {
    id: "afternoon",
    when: "Afternoon",
    title: "The pool and the gardens.",
    text: "Swim in the outdoor pool, or take a slow walk through the gardens.",
    photo: "story-pool",
    alt: "The outdoor pool and gardens",
    tone: "stone",
  },
  {
    id: "evening",
    when: "Evening",
    title: "Dinner on site.",
    text: "Gusto Restaurant serves Filipino and international dishes. King’s Row is the casual option.",
    photo: "story-evening",
    alt: "Dining at Gusto Restaurant",
    tone: "dusk",
  },
  {
    id: "night",
    when: "Night",
    title: "Then your room.",
    text: "Six room types from ₱3,288 a night for two guests, and a front desk that stays open all night.",
    photo: "story-night",
    alt: "A guest room at night",
    tone: "dusk",
    cta: true,
  },
];

export const goodToKnow: { name: string; detail: string }[] = [
  { name: "Check-in and out", detail: "Check-in from 2:00 PM. Check-out by 12:00 noon." },
  { name: "Breakfast", detail: "Continental, 6:30 to 9:30 AM." },
  { name: "Front desk", detail: "Open 24 hours." },
  { name: "Wi-Fi and parking", detail: "Free Wi-Fi in public areas and free self parking." },
];
