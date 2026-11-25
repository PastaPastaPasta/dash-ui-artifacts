# dash-forge #726: dash.site build (docs off-site, SDK wasm from npm)

Both images are the header's **Docs** link clicked on Forge served through the dash-sites service-worker harness at forg3.localhost, in headless Chromium on boat.dev.

- **Before:** `before/docs-in-app.png`, the exact base master ea6784c4 default export packed as a v1 site (1,007 chunks). Docs open in-app at `/docs/`.
- **After:** `after/docs-redirected.png`, PR head 6ba0e401 `build:dash-site` with FORGE_DOCS_URL=https://forge.dashhq.org/docs. The click lands on https://forge.dashhq.org/docs/; the URL is recorded by the e2e, not visible in the screenshot. The page is the same, now served by forge.dashhq.org instead of being stored on Platform.

forge.dashhq.org itself has no visible change: its build is byte-identical (308 files).
