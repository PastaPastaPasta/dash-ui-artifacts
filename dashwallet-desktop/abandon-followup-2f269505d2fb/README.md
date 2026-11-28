# Abandon and Repair confirmation copy

Before: `55a0ab87672daf196e3ecb7341d705a5736355ad` (main). After: `2f269505d2fb1a64aba1442c7f3dd09f60c53cb5` (PR head).

Captured with Playwright 1.64.0 Chromium in `mcr.microsoft.com/playwright:v1.64.0-noble`, fixture build (`pnpm build:fixture`), 1280×820 viewport, light and dark.

- `activity-spending-*`: Activity → transaction details → Abandon, on fixture `abandon-debit-unknown` (txid `d0…d0`, wallet-funded inputs).
- `activity-unknown-inputs-*`: Activity → pending receive → Abandon, on fixture `funded` (inputs the wallet can't resolve).
- `repair-remove-unconfirmed-*`: Tools → Repair → Remove unconfirmed transactions, on fixture `funded`.

All data is fixture data.
