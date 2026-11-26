# dash-sites: publish-time link warnings

- Before: `main` at ffb3227. After: `feat/publish-link-check` at 08bfcbe.
- Fixture: a synthetic two-file site (`index.html` with `<a href="cv.pdf" download>`, `site.css`), uploaded through the builder's "Upload" tab with a headless Chromium, 1280×900 and 390×844 at 2x, light and dark.
- Shows the upload step of the builder (dash.site/new). Before: no warning. After: a missing-file and a download-link warning.
