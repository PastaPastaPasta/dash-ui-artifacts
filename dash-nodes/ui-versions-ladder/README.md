# dash-nodes: release ladder and merged map bubbles

Before: main + PR #14 (`ui-v24-hold`); after: `ui-versions-ladder`. Local build, `/api` proxied to the live
radar.dashhq.org; `/api/v1/releases` served from GitHub's release list the way the publisher builds it.
Playwright Chromium, 1440 px at 2x and iPhone 390 px at 3x.

- `sw-{before,after}-desktop-{dark,light}.png`, `sw-*-iphone-dark.png`: the "What they run" section.
- `lad-rel-all-dark.png`: all nodes (older lines folded into one row).
- `lad-norel-mn-dark.png`: without the release list (the most common versions get the tints).
- `map-{before,after}.png`: the home map, 200 dots before, 75 merged bubbles after.
