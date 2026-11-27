# dash-nodes: /platform turn lookup and vote age

- After: `web/` from branch `feat/platform-turn-lookup` at `10bfb7ec1e2718d412ddbed685ae189dc38e3f79`. Before: `web/` from base `df4a1d7` (origin/main).
- Data: live https://radar.dashhq.org/api/v1/mainnet/platform, 27 Nov 2026 about 01:15 UTC, proxied to a local static server. The live crawler predates the PR, so it has no `upgrade.updated` yet, and the "as of" age falls back to `now.updated`.
- Headless Chrome via Playwright. Desktop 1280x900, phone 390x844 (isMobile), at 2x, in light and dark. Clipped from the Protocol upgrade section through the lookup. The lookup holds `89.125.209.234`, submitted.
