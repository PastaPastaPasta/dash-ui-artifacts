# dash-forge PR #752: sign-in scan-safety copy

- Before, exact base: master `8ddf9bdd3596532411707f7460227eedfdb7055d`
- After, full PR head: `d8f30f7e9959df136cff065cf79518ff361cf078` (PR commits plus a merge of that same master)
- Build: `NEXT_PUBLIC_NETWORK=testnet pnpm build`, served by `e2e/static-server.mjs`, headless Chromium, 1280×1000, light theme.
- Steps: Sign in → wallet tile → QR step → **Details** expanded. The capture is of the sign-in dialog only.
- Expected change: one new bullet, `scan-warning-sync`. It appears only where forge-user is deployed: testnet now, and mainnet once #750 merges.
- Varies per request, and is not part of the change: the QR code (a new ephemeral request each time) and the countdown, 9:58 vs 9:59.
