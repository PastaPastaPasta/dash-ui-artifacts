# Shell 2.0.1: dark mode lifted to Radar's navy-slate (pre-merge evidence)

**Claim.** In dark mode, every family site that vendors the shell moves from 2.0.0's near-black canvas, grey cards and royal-navy bar to Radar's navy-slate surfaces. Solid blue stays only on primary actions: the current nav item, tab and family-menu entry are marked in ink, and the hub map's "dashhq tool" tiles are neutral slate. Light mode is unchanged.

## Provenance

| Site | Repo | Before: exact base (live) | After: PR head |
|---|---|---|---|
| dashhq.org, /directory/ | PastaPastaPasta/dashhq | `3b545a1e598351c6fac2010c15ad850d53174e64` | `1a937ff05b3be6c93f5eb9a2834b7f7634441c9c` |
| arch.dashhq.org | PastaPastaPasta/dash-platform-architecture | `21789527cc0b05d444d758c1aec09c077db4499f` | `4d6d341b7fdc1ea2cf8a4597d4eef0f94b50ffdb` |
| fees.dashhq.org | PastaPastaPasta/dash-contract-fee-estimator | `8cf5861f10780961c9098ec6805e23ccb1813ce0` | `3840d66313210fac2db159954b9daf56b4b2cbab` |
| faucet.dashhq.org | PastaPastaPasta/dash-faucet-cf | `a4adb00dcb2c5ec8ea178e9cd9043cf2d1abb92f` | `738d4f7ca4a97656c435936f467472dbe2d2db73` |
| dapi.dashhq.org | PastaPastaPasta/dapi-explorer | `3b3b3cfbb2d6ed7cf33a72a50951e1588be4beaf` | `33698c7e32ab15623655d4aa36c651cfabbe79fc` |

Shell: 2.0.0 is design `ec94ac4`, and 2.0.1 is design `05c825184fd11dba85c5ba3b31549690f94659b5`. Reference: https://new-radar.dashhq.org/ (shell 1.9.5 with Radar's dark set).

## Method

- **Before:** the production host as served on 2026-11-24 between 14:27 and 14:36 UTC. `window.dashhq.version` reported `2.0.0` on every page (`before/log.json`).
- **After:** the same production URL and the same live HTML and data. The browser serves only the files the PR changes, from the PR head: `dashhq-tokens.css`, `dashhq-shell.css`, `dashhq-shell.js`, `dashhq-components.css`, `VERSION`, `SHA256SUMS`, plus `hub.css` on the hub. The document's `integrity=` values are rewritten, and the after set was captured between 14:44 and 14:50 UTC to the PR head's values, which are byte-identical to the PR's HTML. Every page reported `2.0.1` with SRI satisfied (`after/log.json`: served and sri counts).
- **Browser:** Playwright 1.61.1 Chromium on a boat.dev Ubuntu sandbox, with service workers blocked and every non-GET request aborted.
  - Desktop: 1440×900 at 1×.
  - Phone: 390×844 at 2×, with isMobile and hasTouch.
  - Theme: `prefers-color-scheme` dark and light, with no theme cookie.
- **Console errors:** identical before and after: 0 on hub, directory, faucet and arch; 2 on fees and 5 on DAPI, which were already present on prod.
- **Light unchanged:** a fresh light capture of prod and the PR head was taken back to back and compared with ImageMagick `compare -metric AE -fuzz 2%`.
  - Arch, DAPI, directory, faucet and fees: 0 differing pixels at both sizes.
  - Hub: 63 pixels (desktop) and 188 (phone). They are the live "Radar crawl · N min ago" text, which changed between the two loads.
- Data such as crawl age and percentages is live, so it can differ slightly between columns.

## Files

- `sbs/<page>__<desktop|phone>-<dark|light>__first.png`: first screen, before | after | new-radar.
- `sbs/<page>__<desktop|phone>-dark__full.png`: full page, before | after | new-radar.
- `before/`, `after/`: the raw captures (`__first` is the viewport, `__full` the full page) and `log.json`.

Pages: `hub` (dashhq.org/), `directory` (dashhq.org/directory/), `faucet`, `fees`, `dapi`, `arch`.
