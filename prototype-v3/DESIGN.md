# The Maximilian Hotel: prototype design notes (v3)

## Direction
Quiet, old-money hotel rather than a booking engine. The palette comes from the hotel's own
wordmark: its warm white (#FBF9F2), its gold (#BFA52B) and the brand navy (#0D2B49 / #0A1C2E).
The logo is used three ways: white over the opening photograph, navy in the header once you
scroll, and gold, very large, in the footer.

## Type
- Libre Caslon Display: headlines, set large.
- Libre Caslon Text italic: the small serif moments (times of day, captions, reviews).
- Albert Sans: reading text and the tracked labels that echo the logo's THE / HOTEL.
All free (Google Fonts via Fontsource). None of the live site's fonts are used.

## Motion
GSAP + ScrollTrigger, with Lenis inertia scrolling on desktop (phones keep native momentum).
Every timed ease is expo-out: fast to start, long to settle. Scroll-tied effects follow the
reader directly, so nothing makes you wait for an animation to finish.
Respects prefers-reduced-motion (everything shows, nothing moves).

## Homepage, top to bottom
1. Opening: the wordmark draws in gold, then the page lifts (about 1 second).
2. Hero: the night facade, wordmark in the sky, buttons on the road, facade sign left clear.
3. Welcome: words brighten as you read; two photos open like curtains.
4. A day here: five full-screen scenes that stack over each other (arrive to night).
5. The house: pinned sideways walk through 10 interiors.
6. Rooms: price list; desktop photo follows the pointer, phones swipe each room's photos.
7. Eat and drink: an arch that opens to a full-screen table; Gusto's plates in two columns at
   different speeds; dining rooms sliding sideways; King's Row drinks in two rows going
   opposite ways; the Starbucks coffee counter.
8. Album: the people and the rest of the house, three drifting columns.
9. Reviews, then Reserve (booking bar, phone, email, map) and the footer.

## Photos
About 80 processed photos in public/images (lib/photos.json holds sizes and average colours).
Promo posters were cropped to remove baked-in text. Mapping lives in lib/content.ts and
lib/hotel.ts.

## To confirm with the hotel
- Higher-resolution originals of the facade photos (the supplied ones are small).
- Breakfast inclusion and hours (sources disagree).
- The Hotels.com quotes, the rates and the 4.6 / 1,505 rating.
- That the lobby café serves Starbucks, and permission to show staff and guests.
