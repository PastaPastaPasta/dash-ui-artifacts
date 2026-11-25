# /new against the final dash-sites contract (testnet)

dash-sites PR #14, head 9d618d1. A local testnet build of `/new` (packages/builder) runs against the final contract, with the DPNS owner check on `site.normalizedLabel`, registered on testnet as `CjzpdgCPJdLgVZdUu8SNacWVnrhDv34LstjPdBeJ4dT`.

- `new-start-*`: the first screen, in light and dark, at desktop (1280×800) and phone (390×844).
- `new-ready-*`: signed in with a key file, `builder2026.dash` chosen and a page written, ready to publish. The fee is shown before anything is sent.
- `new-preview-*`: the same screen scrolled to the live preview.
- `new-published-light-desktop.png`: after publishing from the builder e2e (`e2e/builder.mjs`): 2 new parts stored, the cost paid.
- `new-live-builder2026.png`: `https://builder2026.dash.site/` through a local build of the static site, read from Dash Platform by the browser.
