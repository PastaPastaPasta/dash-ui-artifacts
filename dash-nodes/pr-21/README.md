# dash-nodes PR #21: "What they run" opens on the pie, and a tidier pie card

PR: https://github.com/PastaPastaPasta/dash-nodes/pull/21

| | Revision |
|---|---|
| Before (exact PR base) | `c75dcf6879ed90c95cc4dc36536878ea71bf7ec7` |
| After (full PR head) | `87aa1e5051e21024b7bbd94164c2eb30fabc741e` |

**How these were taken:**
- Playwright Chromium, device scale factor 2; captured 2026-11-03.
- Each revision's `web/` (`index.html` and `/assets/*`) was served from its own checkout under https://radar.dashhq.org.
- `/api/*` came from the live API, fetched **once** and replayed to both revisions, so before and after show identical data (mainnet masternodes, 23.1.10 latest release at 49.7%).
- The sticky header is set to static so it can't overlap the crop.
- Each image is the "What they run" section plus 8 px of padding.

| File | Viewport | URL query | Shows |
|---|---|---|---|
| `desktop-default-1440.png` | 1440 px, light | `?scope=mn&days=7` (no `versions`) | **Default view.** Before: "Share over time". After: "Share now" pie. |
| `desktop-pie-1440.png` | 1440 px, light | `?scope=mn&days=7&versions=now` | **Pie layout.** Before: short card, ragged legend, "0.0%". After: card as tall as the ladder, aligned legend with group rules, "<0.1%". After is byte-identical to after `desktop-default-1440.png`: the default *is* the pie. |
| `desktop-pie-1100-dark.png` | 1100 px, dark | `?scope=mn&days=7&versions=now` | The same comparison in dark mode at a narrower desktop width. |
| `mobile-pie-390.png` | 390 px, light | `?scope=mn&days=7&versions=now` | **Phone.** Before: "Over time" first, inline legend shares. After: Now first, right-aligned legend shares with group rules, "Every version and user agent" under the card. |
| `after/desktop-time-1440.png` | 1440 px, light | `?scope=mn&days=7&versions=time` | After only: an explicit `versions=time` still opens the time chart; the toggle reads Now / Over time. |

**Not shown in images:**
- Covered by scripted checks, not screenshots:
  - URL behaviour: picking "Over time" writes `versions=time`, which survives a reload; picking "Now" removes it.
  - The empty-scope fix (the pie hides and the legend says no answers).
  - No overflow at 320–1440 px.
- See the PR description for these.

`SHA256SUMS` lists the hash of every image.
