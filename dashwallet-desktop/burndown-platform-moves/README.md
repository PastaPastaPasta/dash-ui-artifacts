# Held Platform payment exit

Headless Chromium 1.64.0 Playwright image, 1280 × 820, en-US, using the `platform-send-failed-may-land` testnet fixture and its `ps-held` row.

- Before is `a518432bd0121817ecd16b8c22264034f5a818ae`. The candidate’s regression test drives the fixture on that revision.
- After is `c91e95a98c47664f39c2a5bf0ce65ba621ed4f66`. All 52 Chromium and WebKit tests in the held-exit spec passed.
- `exit-confirm-checking-{light,dark}.png` shows a quote whose held payment is missing from Activity. The checking message replaces the generic full-balance copy.
- `exit-result-checking-{light,dark}.png` shows a failed call result before Activity confirms that it cannot land. The result waits for that evidence before naming the paid recipient.
- `exit-result-unattributed-{light,dark}.png` uses the same fixture with both attempts marked unable to land and no confirmed winner. The result names no paid recipient.
