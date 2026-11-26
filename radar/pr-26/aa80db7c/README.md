# radar PR #26: UI proof at head aa80db7c

- **Before:** production https://explorer.dashhq.org/nodes, which serves exact base `17830ca01c1e85e73f27b78181ecbc887203269d` (main). Its `/nodes` route chunk is byte-identical to a build of that commit apart from chunk-hash file names, and its stylesheet hash matches that build exactly.
- **After:** full PR head `aa80db7c7f2005ab984fa44b87ab8f98f1db9e7a`, served from that tree by the Vite dev server.
- **Data:** both read the live mainnet Radar API, captured 2026-11-26 around 03:55 UTC from the same crawl (block 2,578,512, 2,083 masternodes answered), so the numbers match pair for pair.
- **Shapes:** desktop 1440×900 at 1×, phone 390×844 at 2×, each in light and dark. Full-page captures (`shot.mjs`). Load, wait 12 s, scroll through once, then capture from the top.
- **Phone captures:** the fixed bottom tab bar is drawn where the first viewport ended, partway down the image. That is how a full-page screenshot draws a fixed element; it happens on both sides and is not part of the page layout.
- `comparison/after/phone-light-reach-popover.png`: the "Who is counted" info popover on the reach section, opened with `pop.mjs`. This is where the explanation that used to be the section's opening paragraph now lives.

| | Before (exact base) | After (PR head) |
|---|---|---|
| Desktop, light | `comparison/before/desktop-light.png` (1440×4331) | `comparison/after/desktop-light.png` (1440×3132) |
| Desktop, dark | `comparison/before/desktop-dark.png` | `comparison/after/desktop-dark.png` |
| Phone, light | `comparison/before/phone-light.png` (780×13832) | `comparison/after/phone-light.png` (780×11776) |
| Phone, dark | `comparison/before/phone-dark.png` | `comparison/after/phone-dark.png` |
