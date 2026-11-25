# dash-forge PR #725: repo Settings redesign

- **Before:** exact PR base `ea6784c46b6d81e6de16f5487a4fab60cb7537c0` (master).
- **After:** PR head `27b8d253719173ce1befdee83ccdbb6cb6504681`.
- Both are `NEXT_PUBLIC_NETWORK=testnet pnpm build` static exports, built in the same boat.dev sandbox and served by `e2e/static-server.mjs`.
- **Fixture:** testnet repo `pocket-wallet`, owned by the demo identity `CnEZ2xeVqpmjkQ7eLoFcpRwgBrHbgbSZygUp47etPQSY`. The same browser session, signed in as that owner (a maintainer), is used for both builds.
- **Captures:** Playwright Chromium full-page shots, desktop at 1280×900 and mobile at 390×844 (touch), light and dark (`prefers-color-scheme`).
- **Before:** one long page; every section is stacked in it.
- **After:** one shot per section, opened by its hash: `#general`, `#branches`, `#collaborators`, `#storage`, `#danger`.
