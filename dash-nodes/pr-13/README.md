# dash-nodes PR #13: DashHQ Radar rebrand + radar pings

PR: https://github.com/PastaPastaPasta/dash-nodes/pull/13

- **Before:** exact base `2c3f27058402549df8e47630fddb2b72252aaec3` (main), `web/` from `git archive`.
- **After:** full PR head `8e83c36adb1ced58f85c64bbda14a020c0674983` (radar-rebrand), `web/` from `git archive`.
- **Fixture:** both revisions' static files were served in place of nodes.dashhq.org's through Playwright route interception, with `/api/*` from the live Worker. Each before/after pair was captured back to back from one browser, and every capture shows the same crawl ("2,579 Dash nodes answered our last crawl", block 2,564,529).
- **Profiles:** desktop Chromium at 1440×900 @2x, and iPhone 13 WebKit at 390×844 @3x. Both use `prefers-color-scheme` light or dark as named.
- **Animation:** for the stills, every CSS animation (the existing dot fade-in and the new pings) was paused at the same document time, 3300 ms after the hero drew. At that moment ring 1 is fading, ring 2 is mid-pulse and ring 3 is starting. `motion/` is an unaltered 9 s recording of the after revision (desktop, dark), cropped to the map for the GIF.

| File | Shows |
| --- | --- |
| `comparison/*/top-desktop-light.png` | header wordmark "Dash Nodes / nodes.dashhq.org" → "DashHQ Radar / radar.dashhq.org", and the hero |
| `comparison/*/map-desktop-{dark,light}.png` | hero map box: no rings → rings around the Singapore and India clusters |
| `comparison/*/map-iphone-{light,dark}.png` | the same on a phone, where the map sits above the headline |
| `comparison/*/footer-desktop.png` | the footer names DashHQ Radar |
| `motion/ping-desktop-dark.{gif,webm}` | the pings running |

SHA-256:

    630f1e7b6b087cf346fcbdd3f8e5f170365d107feab85b2855da42c2b920d5b3  comparison/after/footer-desktop.png
    b1ffcac63f96c3975f040e00fbd0b643ad86e4a9935bd69ffb66eeaccb72250b  comparison/after/map-desktop-dark.png
    03a3b9add9eaf5aa532658aa413139ee8529031221860ce49731b357f19f5e5a  comparison/after/map-desktop-light.png
    1db94644f4f8a5f8d9c29eee71fcf6e00dfeb6861e19c388a1c058c8071396b2  comparison/after/map-iphone-dark.png
    cecef59568613590b01004d20d5204da2e070df1f346986155ff3b48480d4a20  comparison/after/map-iphone-light.png
    1a2b4876a180d114c59d41994e3e2f03b6230e353716231ebf27d5f7c1a70808  comparison/after/top-desktop-light.png
    435a1fac0c38bfb1639136ce3a8d11c64161e42d1bdc96bce456a06c4ec26adf  comparison/before/footer-desktop.png
    6690408cdad53a8ea0d492768b88bdf84bdc226b563a999833edece7ebe97f00  comparison/before/map-desktop-dark.png
    98fd84106186c9df1628851e5ac378808d35e3eea3185c7721dd3ffe27e6a6f9  comparison/before/map-desktop-light.png
    24c1f5fdd2b35d31ba591b2083da38a89128903c14c6e2dea392c5f229757045  comparison/before/map-iphone-dark.png
    9a0107cb642e3fa88a8069447bd3c9ee556313482036043d8f4bcabf3f9e8b1e  comparison/before/map-iphone-light.png
    8d236d5536172f5cb060befc6e03594e8592eb883fa898eb5bf48458c391f4d2  comparison/before/top-desktop-light.png
    4da9b20efb5ae4241501b9f67bf84b44cccdd790e55d1d41ebe754ba41caf2cd  motion/ping-desktop-dark.gif
    bc7d52fcc43b243224fb787c0ba5ffa24bf2615f15e20449090e46edc6b832d0  motion/ping-desktop-dark.webm
