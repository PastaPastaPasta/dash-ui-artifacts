# radar PR #21 — UI proof at head add55b31

- **Before:** exact base `45ea342e6f` (main), live on https://explorer.dashhq.org (Worker deployment df9b1b70, message "perf: shared tip read (#18, 45ea342e)").
- **After:** full PR head `add55b31`, built from that tree and deployed to https://explorer-next.dashhq.org (radar-web-preview version 225f130f).
- **Same steps on both:** open mainnet `/blocks?from=2200000`; wait for block 2,200,000; scroll to the foot of the page with a wheel turn; wait 4 s; centre block 2,199,981 (the last row of the base's page) in the view.
- **Shapes:** desktop 1440×900 at 1×, phone iPhone 13 profile (390×844 at 3×), with light and dark colour schemes.
- **Data:** live mainnet data, captured 2026-11-24 ~22:00 UTC. The tip height in the header differs by a block or two between captures.

**What it shows:**
- Before ends at 2,199,981 with Newer and Older.
- After keeps going past 2,199,981 to the next page loaded by scrolling, with the "newer blocks · jump to the newest" pill. The URL then names the first block in view (see `capture-notes.json`).

`capture.mjs` is the Playwright script used.
