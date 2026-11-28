# pshenmic/platform-explorer — UI proof

Captured with headless Chrome (Playwright) against production builds (`next build && next start`)
of each revision, using the default testnet API (`testnet.platform-explorer.pshenmic.dev`).
The app ships a dark theme only (`data-theme="dark"` is hard-coded), so there is no light variant.
Desktop: 1440×900. Phone: 390×844 @2x, mobile + touch emulation.

| Set | Before (exact base) | After (PR head) |
|---|---|---|
| `keep-data-on-load-error/` | `develop` 277cbc7cf6239e18986d85cb00e238513b1f80c8 | `fix/keep-data-on-load-error` e1d0af962b8d0801e0b19fe490f7793c7f9c87a4 |
| `search-enter-results-page/` | `develop` 277cbc7cf6239e18986d85cb00e238513b1f80c8 | `fix/search-enter-results-page` c360a17f3f8880861e727c8a5c72c8993e69591b |

Failures were injected identically for before and after by fulfilling matching API requests
with HTTP 503 in the browser:

- `list-first-page-fails`: every `/blocks*` request on `/blocks`.
- `list-load-more-fails`: `/blocks` requests with `page != 1`, then scroll to the end of the list.
- `home-latest-lists-fail`: every API request except `/status` and `/rate`; crop of the home overview card.

Search sets type in the navbar field on `/validators`:

- `enter-before-results-load`: type `abc` and press Enter immediately (before the 200 ms debounce returns).
- `enter-with-no-match`: type `qqqzzz`, wait 2 s, press Enter.
