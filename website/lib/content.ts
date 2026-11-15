// Photographs grouped by where they appear on the homepage. Slugs are files in
// /public/images (see lib/photos.json). Every photo the hotel supplied that is clean
// enough to show (no promo text baked in) is used somewhere on the site.

export type Shot = { slug: string; alt: string; caption?: string; shape?: "tall" | "wide" | "square" };

/** The walk through the building: a pinned sideways rail. */
export const house: Shot[] = [
  { slug: "courtyard", alt: "The courtyard pool between the room wings", caption: "The courtyard", shape: "wide" },
  { slug: "chandeliers", alt: "Lantern chandeliers in the double-height lobby", caption: "Lantern light", shape: "tall" },
  { slug: "art-hall", alt: "A long hall ending in a painting", caption: "The gallery hall", shape: "wide" },
  { slug: "lounge", alt: "The lobby lounge with a hanging rattan chair", caption: "The lounge", shape: "wide" },
  { slug: "sofa", alt: "A sofa and carved side table", caption: "A quiet corner", shape: "tall" },
  { slug: "lounge-low", alt: "The long timber table under tall windows", caption: "The long table", shape: "wide" },
  { slug: "sculpture", alt: "A red sculpture in a corridor", caption: "Red, on purpose", shape: "wide" },
  { slug: "glass-corridor", alt: "A glass corridor beside the garden", caption: "The glass walk", shape: "tall" },
  { slug: "garden-path", alt: "The garden path between the rooms", caption: "The garden path", shape: "tall" },
  { slug: "lamps", alt: "Hanging lamps over a timber screen", caption: "Timber and brass", shape: "tall" },
];

/** Plates from Gusto, shown as two columns that drift at different speeds. */
export const plates: Shot[] = [
  { slug: "gusto-ribeye", alt: "US ribeye steak with mashed potato" },
  { slug: "faith-a", alt: "Grilled fish with vegetable curry and rice" },
  { slug: "gusto-kare", alt: "Beef kare-kare in a clay pot" },
  { slug: "gusto-spag", alt: "Spaghetti bolognese with garlic toast" },
  { slug: "faith-d", alt: "Soy garlic tofu over rice" },
  { slug: "gusto-grill", alt: "A grilled plate with tomato and green beans" },
  { slug: "faith-b", alt: "Fish fillet in a light sauce with rice" },
  { slug: "gusto-love", alt: "Golden fritters around a dipping sauce" },
  { slug: "faith-c", alt: "Tempura with dipping sauce and rice" },
  { slug: "gusto-pair", alt: "A plated steak beside a cocktail" },
  { slug: "cocktail-dessert", alt: "A cocktail and dessert at the bar" },
];

/** The dining rooms themselves. */
export const tables: Shot[] = [
  { slug: "gusto-room", alt: "Gusto's dining room in the evening" },
  { slug: "dining", alt: "The bright dining room set for breakfast" },
  { slug: "gusto-crowd", alt: "A full dining room at dinner" },
  { slug: "red-table", alt: "A long table set in red for a private dinner" },
  { slug: "gusto-servers", alt: "Two of Gusto's servers" },
  { slug: "gusto-chef", alt: "A cook plating under the heat lamps" },
  { slug: "long-table", alt: "A long boardroom table for private events" },
];

/** King's Row: coffee in the day, cocktails after dark. */
export const pours: Shot[] = [
  { slug: "kr-cheers", alt: "Two iced drinks raised over the pool" },
  { slug: "kr-frappe", alt: "Matcha and chocolate frappes with whipped cream" },
  { slug: "kr-wine", alt: "Sangria, a spritz and a mojito" },
  { slug: "kings-row", alt: "A burger and fries at King's Row" },
  { slug: "kr-summer", alt: "Lemonade and iced tea with fresh fruit" },
  { slug: "gusto-cocktail", alt: "A sugar-rimmed cocktail" },
  { slug: "kr-cups", alt: "Iced teas in King's Row cups among the plants" },
  { slug: "gusto-drinks", alt: "A row of colourful cocktails on the bar" },
  { slug: "gusto-night", alt: "Two cocktails lit warm at night" },
];

/** Everything else worth seeing: an album of the house and the people in it. */
export const album: Shot[] = [
  { slug: "robe-woman", alt: "A guest in a robe by the window" },
  { slug: "couple-robes", alt: "Two guests at breakfast in their robes" },
  { slug: "pool-swim", alt: "A guest in the pool" },
  { slug: "garden-night", alt: "The garden lit low at night" },
  { slug: "team", alt: "The hotel team in the lobby" },
  { slug: "hall-bench", alt: "A bench between tall doors" },
  { slug: "housekeeping", alt: "Housekeeping making up a room" },
  { slug: "bridal", alt: "A bride getting ready in a suite" },
  { slug: "corridor", alt: "A quiet guest corridor" },
  { slug: "chef", alt: "The chef at the pass" },
  { slug: "gym", alt: "The fitness room" },
  { slug: "lobby-table", alt: "The lobby table under the stairs" },
];
