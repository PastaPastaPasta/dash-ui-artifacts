# radar PR #24 — UI proof at head 36db8670

- **Before:** exact base `17c7888d` (main), built and deployed to https://explorer-next.dashhq.org (radar-web-preview version 2478a222).
- **After:** full PR head `36db8670`, built from that tree and deployed to the same host (radar-web-preview version c2e507cd).
- **Same steps on both:** open mainnet `/platform/blocks`; wait for the first page; scroll to the foot of the page with a wheel turn; wait; centre block 478,849 (the last row of the base's first page) in the view.
- **Shapes:** desktop 1440×900 at 1×, phone iPhone 13 profile (390×844 at 3×), with light and dark colour schemes.
- **Data:** live mainnet data, captured 2026-11-24 ~23:10 UTC.

**What it shows:**
- Before ends at 478,849 with "1–25 of 478,873" and Previous / Next.
- After keeps going past 478,849 into the next page, loaded by scrolling; there's no pager.

`capture.mjs` is the Playwright script used.
