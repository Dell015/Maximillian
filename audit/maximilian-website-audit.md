# Website audit: themaximilianhotel.com

Audit run: 16 Nov 2026, ~2:30-2:45 AM (Asia/Manila), built-in browser on the user's computer.
All numbers below are from a single cold (uncached) load unless noted. Re-run on your own phone/connection before sending to the client.

## Evidence captured
| What | Value | Where from |
|---|---|---|
| Google PageSpeed (mobile) | Failed: "NO_FCP - the page did not paint any content" on every metric | pagespeed.web.dev (screenshot: 01-pagespeed-mobile-error.png) |
| Load event fired | ~34.9 s | Browser Navigation Timing |
| First paint / First Contentful Paint | ~35.2 s / ~37.6 s | Browser Paint Timing |
| Server response (TTFB) | ~1.85 s | Navigation Timing |
| DOMContentLoaded | ~5.0-5.6 s | Navigation Timing |
| Page weight, cold load | ~8.6 MB over 232 requests (only ~1.2 MB on reload, cached) | Resource Timing |
| Scripts on the page | 99 | DOM |
| DOM elements | 13,820 | DOM |
| Images | 1,767 | DOM |
| Links | 910 | DOM |

Screenshot 02 shows a blank white mobile screen ~3 s after load (and still blank at ~8 s). Screenshot 03 shows the page after it finally loaded.

## Problems found

### A. Speed (what you noticed)
1. Very slow first paint: ~35 s to load, ~37 s to first content in this test. Google's own mobile test could not get anything to paint.
2. Heavy page: ~8.6 MB and 232 requests on first load.
3. 99 scripts and 13,820 DOM elements, far more than a hotel homepage needs.
4. Too many overlapping plugins/builders: Elementor, Elementor Pro, Happy Elementor Addons (free + Pro), Animation Pack, DevsBlink Framework, Safar theme core, MotoPress Hotel Booking + Reviews, Contact Form 7, WP Review Slider Pro, plus GSAP/Lenis/ScrollTrigger/particles animation libraries.
5. WooCommerce is loaded on the site even though it is a hotel (extra scripts for no visible reason).
6. The review slider fetches ~60+ reviewer avatars on first load (individual requests to /wp-json/wp-review-slider-pro/.../avatar).
7. 1,320 of 1,767 images have no width/height set, which causes layout shifting.
8. Slow server response (~1.85 s TTFB) before anything is sent.

### B. Mobile (the "complete flop")
9. The Google-reviews slider builds elements 33,554,432 px wide on a phone viewport (classes wprev_badge_div, slickwprev-track). This makes the page absurdly wide on mobile and breaks horizontal layout/scroll.
10. Blank white screen for many seconds on mobile before anything shows.
11. Sections hidden until scroll animations fire: one scroll position rendered completely blank in testing.
12. 280 buttons/links smaller than 44 px (hard to tap).

### C. SEO / trust / conversion
13. Page title is just the domain ("themaximilianhotel.com"), not a descriptive title.
14. No meta description.
15. No Open Graph image (poor link previews on Facebook/Messenger).
16. No structured data (schema.org Hotel markup), so Google can't show rich hotel info.
17. 254 images with no alt text (accessibility + SEO), including the hero icons.
18. Facebook, Instagram and LinkedIn icons are dead links (href="#").
19. No clickable phone number or email on the homepage (no tel:/mailto: links found).
20. Footer shows the correct copyright year but no designer/credit, and no visible address/contact in the part of the page checked.

### Not confirmed (don't claim these without more testing)
- Google's NO_FCP error could be caused by the site's Cloudflare bot-check, the slow load, or a test glitch. Don't present it as proof of "the site is down".
- Desktop Google PageSpeed run never finished in this session.
- Load times depend on the connection; the ~35 s figure is from one computer.

## Suggested proof to save (in order of strength)
1. Mobile PageSpeed report (run it yourself, then share/save the link) + 01 screenshot.
2. Screen recording on your own phone, 4G, cold load: from tapping the link to first content.
3. Chrome DevTools > Network tab screenshot showing total size / requests / load time (Disable cache on).
4. DevTools > Elements screenshot of the .wprev slider width, or the page scrolling sideways on mobile.
5. Screenshots of page title in the browser tab and Facebook share preview (no image).
6. Dead social icon links (hover shows "#").
Store the PSI link, dates and times with each one.
