# yappr PR #878: one howling-fox mark

- Before: base `815b4b2bb089a07be7f0383ab466b51ac04884e0`
- After: PR head `05073c009842105f975b64329803c43c9fee24eb`

The web shots come from one static export of the head, with the base's brand files restored for the before side. The web code is identical between the two; only the brand assets differ. They were rendered in headless Chromium at 2x with network calls blocked. The icon sheets are the generated files, taken from git at each revision.

| File | Shows | sha256 |
|---|---|---|
| header-1024.png | Collapsed sidebar mark at 1024 px, light and dark | `8fc40f3478d6e38f8fbd268de8cf95aea4430a78677e9e7e5e418a967d414fcd` |
| header-1440.png | Sidebar lockup at 1440 px, light and dark | `1f6da3c1f4419962e04f9a5bbe3c183bc3ca744a510300888224b14588d383f3` |
| header-360.png | Mobile web header at 360 px: no logo before or after (unchanged) | `2f9bfb6f07b11a977a545734e165d3c6f2134042775bb95ab066e2e0f46f2bd6` |
| mobile-icons.png | iOS light/dark/tinted (testnet), Android foreground/monochrome, splash | `ef02967f98c99d885edbd20c044f3a230a9f2d3b880c1c17226a873254764e79` |
| og-image.png | Link preview image (og-image.jpg) | `ff439ab350b617645db9ac22cccb1c35ef2e4b80f8b7979af5cebd8455452409` |
| tiles.png | App tile colour comparison at 180/120/60 px (ink chosen) | `ece116311d4585154cbe4d2979df2625ef0fc887004071ddd86f46bf0d20b5ec` |
| web-icons.png | apple-touch-icon, icon-192, icon-512, icon-maskable-512 | `714752248d3d95eeffa39a8bfba76a04d166d601a5ff2b38d34220425c07fe2d` |
