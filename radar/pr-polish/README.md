# radar pools-bar polish (follow-up to PR #30)

- before: main `6b632f53` (as deployed), local dev build
- after: branch `fix/pools-bar-polish` at `c6b07ca2`, same setup
- Both sides use the same live mainnet `/api/v1/mainnet/activation` snapshot (tip 2,578,988), pinned with a Playwright route. The viewports are 1280×900 and 390×844 (2×), light and dark, UTC.
- prod: explorer.dashhq.org/v24 after deploying 707ea9da as radar-web version cf467183, with live mainnet data on 2026-11-27 (window at 2,560 blocks). Captured from a cloud runner with the service worker blocked and requests paced 250 ms apart.
