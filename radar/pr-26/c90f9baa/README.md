# radar PR #26: UI proof at head c90f9baa

This set supersedes the earlier one at `aa80db7c`, which shows an older iteration of the PR.

- **Before:** production https://explorer.dashhq.org/nodes, which serves exact base `17830ca01c1e85e73f27b78181ecbc887203269d` (main). Its `/nodes` route chunk is byte-identical to a build of that commit apart from chunk-hash file names, and its stylesheet hash matches that build exactly.
- **After:** full PR head `c90f9baae57fa77ff128ada2bfa84879807cc9eb`, served from a clean tree at that commit by the Vite dev server.
- **Data:** both read the live mainnet Radar API. They were captured side by side on 2026-11-26 around 04:15 UTC from the same crawl: counted at block 2,578,519, 2,084 masternodes answered, 8,308 addresses tried. The numbers match pair for pair.
- **Shapes:** desktop is 1440×900 at 1×, phone is 390×844 at 2×, each in light and dark. Every capture is full-page (`shot.mjs`): load, wait 12 s, scroll through once, then capture from the top.
- **Phone captures:** the fixed bottom tab bar is drawn where the first viewport ended, partway down the image. That is how a full-page screenshot draws a fixed element. It happens on both sides and is not part of the page layout.
- **Popover:** `comparison/after/phone-light-size-popover.png` shows the network-size (i) note, opened with `pop.mjs`. On the live page this text sits under the chart.

| | Before (exact base) | After (PR head) |
|---|---|---|
| Desktop, light | `comparison/before/desktop-light.png` (1440×4331) | `comparison/after/desktop-light.png` (1440×3217) |
| Desktop, dark | `comparison/before/desktop-dark.png` | `comparison/after/desktop-dark.png` |
| Phone, light | `comparison/before/phone-light.png` (780×13832) | `comparison/after/phone-light.png` (780×12178) |
| Phone, dark | `comparison/before/phone-dark.png` | `comparison/after/phone-dark.png` |
