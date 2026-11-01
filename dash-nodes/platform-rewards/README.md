# dash-nodes: Platform rewards for evonodes

Branch `platform-rewards` at 2a0183b. The release app ran against live mainnet and testnet DAPI; the built site was
served with the production `_headers` (and the Worker's `/mn/<protx>` CSP); everything else came from the live
radar.dashhq.org API. Playwright Chromium: 1440 px, 375 px and 360 px, light and dark. No page had horizontal
overflow or a console or CSP error.

- `platform-*`: the new /platform page (mainnet and testnet).
- `mn-rewards-*`: an evonode's Platform rewards section, including the live proof-checked part (evo-sdk in the page).
- `mn-*`: the whole evonode page.
- `list-*`: the masternode list filtered to evonodes, with the Platform columns.
- `home-*`: the home page's earnings section, Core and Platform shown separately.
