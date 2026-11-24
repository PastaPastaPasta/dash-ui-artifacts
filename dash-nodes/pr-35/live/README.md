# Live check after deploy: radar.dashhq.org/v24

Deployed d8f6e9e (app and Worker). Captured 2026-11-24 about 15:58 UTC at block 2,577,695 from the public site, in Chromium (Playwright 1.56.1). 1440×900 at 1x and 390×844 at 2x, light and dark, full page.

The API (window.pools) was cross-checked against dashd getdeploymentinfo (elapsed 1,248, count 707) and an independent RPC recount of the 1,248 blocks' versions and coinbase tags. Every row matched.

SHA-256:
    693677bd2e0f6d284463f9edd4d2b9158bab5a1d1dbe409f5168f5a2be3e0ea2  live-1440-dark.png
    f9f00b424604f3733e2760406755aa1f2d295ea969d56aef33b19a0025ce3190  live-1440-light.png
    cf8cbf577deb20f3cf9181613e273feff570aa8cd762d182b5bf15f84994b27b  live-390-dark.png
    444f8cc20cd79393d8c2b6a333170ac302cb646afdb38fef79140391817905cb  live-390-light.png
