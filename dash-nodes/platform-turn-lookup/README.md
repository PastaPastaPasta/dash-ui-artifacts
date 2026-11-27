# dash-nodes: /platform turn lookup and vote age

- After: `web/` from branch `feat/platform-turn-lookup` at `0af0bfb366a531d3ee18a38a8ff81e72adc08ce3`. Before: `web/` from base `df4a1d7` (origin/main).
- Data: live https://radar.dashhq.org/api/v1/mainnet/platform, 27 Nov 2026 about 01:20 UTC, proxied to a local static server.
- Clock: the browser clock is pinned to the live schedule's `ts` + 120 s (Playwright `clock.install`).
  - Production still publishes `platform.json` every 15 minutes. That is older than the lookup's 15-minute staleness guard, so at real time the lookup would say "no estimate right now".
  - After this PR, the document is published every 2 minutes, so a page sees a sample a few minutes old. The pinned clock shows that case.
  - The live crawler predates the PR, so the "as of" age falls back to `now.updated`.
- Headless Chrome via Playwright. Desktop 1280x900, phone 390x844 (isMobile), at 2x, in light and dark. Clipped from the Protocol upgrade section through the lookup. The lookup holds `89.125.209.234`, submitted.
