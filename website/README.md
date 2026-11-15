# The Maximilian Hotel: website design prototype

An unofficial design prototype (Next.js 16, React 19, TypeScript). Homepage, rooms and a mock booking flow. Nothing is sent anywhere.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Add photos
Put files in `public/images/` using the names in `public/images/README.txt` (hero, story-morning, story-pool, story-evening, story-night, room-*). Until then, placeholders show the file name.

## Needs the hotel's confirmation
Room rates and sizes, breakfast hours, review quotes and the two phone numbers were taken from public listings. Verify before showing as fact. No social links are included because the official URLs were not verified.

## What it fixes from the audit
Self-hosted fonts and no render-blocking scripts (speed), mobile-first layout with a fixed Call/Reserve bar (mobile), real headings, Hotel structured data and metadata (SEO), and a short direct-booking path (conversion).

## Motion
All scroll effects are CSS only (scroll-driven animations), guarded by `@supports` and `prefers-reduced-motion`. See DESIGN.md.
