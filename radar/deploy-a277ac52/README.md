# radar production deploy a277ac52 — live check

- **Deployed:** main `17830ca0` (PRs #21, #24 and #25 merged), Worker `radar-web` version `a277ac52`, on https://explorer.dashhq.org, 2026-11-25 ~01:55 UTC.
- **Rollback:** `npx wrangler rollback 3da9d232 --name radar-web -y` (the version it replaced, #23).
- **Live check:** `/`, `/blocks`, `/blocks?from=2200000`, `/block/2577000`, `/masternodes` and `/platform/blocks` answer 200 over IPv4 and IPv6 and serve this build's entry, `assets/index-CwmDFK0s.js`.
- **Captures:** live mainnet, desktop 1440×900 and iPhone 13, light and dark, using each PR's capture steps:
  - `blocks/`: `/blocks?from=2200000` scrolled past the first page, with the next page loaded and the jump-to-newest pill.
  - `platform-blocks/`: `/platform/blocks` scrolled past row 25 into the next page.
  - `masternodes/`: `/masternodes` scrolled past row 100 into the next revealed rows.
