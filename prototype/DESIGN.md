# Design notes
- Palette: dusk navy #14283A, limestone #ECEDE8, paper #F6F7F4, brass #B08D3C (detail only).
- Type: Marcellus for display, Jost for body. Balanced headings, tabular numerals on prices.
- Memorable moment: a pinned "day at the hotel" scene. The sky shifts from morning to night while the sun becomes the moon and four chapters wipe in.
- Other motion: hero lines rise on load with a photo parallax, a statement whose words fill as you scroll, a swipeable room rail with image drift, a full-screen mobile menu.
- Easing: every transition uses expo-out (cubic-bezier(0.16,1,0.3,1)), so it starts fast and lands slowly. Durations: 320 / 640 / 950 ms.
- Fallback: without scroll-driven animation support or with reduced motion, chapters stack as plain tinted sections.
