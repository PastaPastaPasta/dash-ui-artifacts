# grovedb-structure-viewer PR #1 — responsive layout evidence

- Before — exact base: `ce199f2b25eaa7fb9911663be839647be46c50dc` (main)
- After — full PR head: `d1c7a2a6d00ebe1125a6ec169a1682308754ffbb` (fix/responsive-layout)
- Each revision served from its own checkout with `python3 -m http.server`; captured with headless Chromium (Playwright 1.62.1), deviceScaleFactor 2, prefers-reduced-motion: reduce, dark theme.
- Fixture: the bundled `data/snapshot.json` fallback (identical in both revisions), default ref v4.2-dev, PV 14.

| File | Viewport (CSS px) | State |
|---|---|---|
| wide.png | 1440×900 | root layer, Keys |
| short.png | 1440×640 | root layer, Keys |
| mid.png | 1100×1000 | root layer, Keys (rail hidden range 861–1180) |
| embed-mid.png | 1100×800 | `?embed=1`, root layer |
| phone.png | 455×1000 | root layer, Keys |
| tokens-phone.png | 455×1000 | `#/tokens` |
| merk-phone.png | 455×1000 | root layer, Merk tree |
| merk-phone-scrolled.png | 455×1000 | Merk tree after 6 horizontal wheel ticks over the stage (before: scrollLeft 0, after: 377) |
