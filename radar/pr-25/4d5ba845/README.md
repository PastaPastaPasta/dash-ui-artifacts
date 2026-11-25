# radar PR #25 — UI proof at head 4d5ba845

- **Before:** exact base `37a376f1` (main), built and deployed to https://explorer-next.dashhq.org (radar-web-preview version 223053f5).
- **After:** full PR head `4d5ba845`, built from that tree and deployed to the same host (radar-web-preview version 7c8bcfe0).
- **Same steps on both:** open mainnet `/masternodes`; wait for the first rows; scroll to the foot of the page with wheel turns; wait 4 s; centre row 100 (`data-index="99"`, the last row of the base's first page).
- **Shapes:** desktop 1440×900 at 1×, phone iPhone 13 profile (390×844 at 3×), with light and dark colour schemes.
- **Data:** live mainnet data, captured 2026-11-25 ~00:30 UTC. Masternode addresses are the network's public registry.

**What it shows:**
- Before stops at row 100 (0c76b6…c6f4) with "1–100 of 3,001" and Previous / Next.
- After keeps going past row 100 into the next rows, revealed by scrolling, with no pager.

`capture.mjs` is the Playwright script used.
