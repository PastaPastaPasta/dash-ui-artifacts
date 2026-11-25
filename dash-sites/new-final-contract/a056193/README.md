# /new against the final dash-sites contract (testnet)

dash-sites PR #14, head a056193. A local testnet build of `/new` (packages/builder) runs against the final contract registered on testnet as `5BS87xCmGqFKv6fndGjv6cJWbokqWtGs6ui91oRn7q6u`.

- `new-start-*`: the first screen, in light and dark, at desktop (1280×800) and phone (390×844).
- `new-ready-*`: signed in with a key file, `builder2026.dash` chosen and a page written, ready to publish. The fee is shown before anything is sent.
- `new-preview-*`: the same screen scrolled to the live preview. Full-page phone captures render the preview iframe blank; this viewport capture shows it.
- `new-published-light-desktop.png`: after publishing ("Stored 2 new parts, reused 0. Cost 0.00206 DASH").
- `new-live-builder2026.png`: `https://builder2026.dash.site/` served by a local dash.site build (wrangler dev). It shows the page just published, proved from Platform by the browser.

Captured with Playwright and Chromium on 2026-11-25.
