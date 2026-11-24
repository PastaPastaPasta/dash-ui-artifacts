# Radar PR #21: blocks list scrolls instead of paging

- **Before:** exact base `45ea342e639697b48bf1d65a77044790826494d2`, live explorer.dashhq.org (`/assets/index-CPM86KIc.js`).
- **After:** PR head `cc04e029ec5fb94712b9ce7e9ad77cbcfb901245`, deployed to explorer-next.dashhq.org (`/assets/index-DSJVcVg0.js`).
- **Page:** `/blocks?from=2200000` on mainnet, the same live chain data on both sides.
- **Before:** the page as it opens, scrolled to its end (the Newer/Older pager).
- **After:** the page scrolled down by mouse wheel until the next page loaded (40 rows). The URL has moved to the first block in view: `from=2199992` on desktop, `from=2199988` on phone.
- **Viewports:** desktop 1440×900 at 1x; phone 390×844 at 2x, mobile emulation. Light and dark, with a fresh profile and service workers blocked.
- **Captured with:** Playwright Chromium in a disposable cloud sandbox, 2026-11-24.

| Variant | Before | After |
|---|---|---|
| Desktop, light | comparison/before/desktop-light.png | comparison/after/desktop-light.png |
| Desktop, dark | comparison/before/desktop-dark.png | comparison/after/desktop-dark.png |
| Phone, light | comparison/before/phone-light.png | comparison/after/phone-light.png |
| Phone, dark | comparison/before/phone-dark.png | comparison/after/phone-dark.png |
