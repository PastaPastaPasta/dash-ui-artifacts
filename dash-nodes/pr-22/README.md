# dash-nodes PR #22: shareable links to page sections (production)

- PR: https://github.com/PastaPastaPasta/dash-nodes/pull/22
- Merged as `a6617f878b2a0bf41507038a491059af68fccca4` on 2026-11-03 at 17:59Z; live by 18:08Z.

**How these were taken:** captured on https://radar.dashhq.org itself, with live data. Headless Chromium, device scale factor 2, and the real sticky header.

| File | Viewport | URL | Shows |
|---|---|---|---|
| `production/overview-1440-light.png` | 1440 px, light | `/?scope=mn&days=7#what-they-run` | Deep link landed just under the header; hovering the heading shows the link icon |
| `production/api-1440-light.png` | 1440 px, light | `/api#payments` | Endpoint deep link landed; icon beside the endpoint heading |
| `production/overview-390-dark.png` | 390 px, dark | `/?scope=mn&days=7#what-they-run` | Phone: landed under the header; the icon is always shown (faded) on touch screens |
| `production/api-390-dark.png` | 390 px, dark | `/api#payments` | Phone: wrapped endpoint headings with their icons |

**Checked on production:**
- **Links per page:** overview 7, Platform 5, API 13, masternode 8; Masternodes, Changes and Map have none.
- **Deep links:** they land 72 px from the top (the header is 55–56 px) on load and on reload, at 1440 and 390 px. Tested: `#earnings` with a scope, `#platform` on testnet, Platform `#epochs`, API `#payments`, and masternode `#uptime`/`#payments`. The masternode `#payments` is the page's last section, so at 1440 px the page is at its bottom.
- **Clicking a link:** it keeps `?scope=mn&days=7`, copies the full link, and announces "Link copied: Where they run".
- **Scope switch:** changing the scope keeps the hash.
- **No overflow and no page errors.**
