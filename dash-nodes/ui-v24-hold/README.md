# dash-nodes: hold the protocol check, hero stats in rows of three

Built from origin/main (04242bc, before) and branch `ui-v24-hold` (after), served locally with `/api` proxied
to the live radar.dashhq.org. Chromium via Playwright, dark scheme; desktop 1440 px at 2x, iPhone 390 px at 3x.
The "after" API responses were rewritten in the browser to what the branch's API sends (no protocol check in a
masternode's result or the overall verdict, `rules.protocol_check` false), since the live API still has the old shape.

- `*-hero-desktop.png`, `*-hero-iphone.png`: the six home-page figures. 4 + 2 before, 3 + 3 after; 2 + 2 + 2 on iPhone in both.
- `*-dkg-desktop.png`: the home page's DKG readiness section. 0.2% ready before, 97.5% after; no protocol column.
- `*-mn-dkg-upgrade-only.png`: a masternode whose only failure was the protocol: Not ready before, Ready after.
- `*-mn-dkg-relay-off.png`: a masternode with relay off: still Not ready, now 1 of 3 checks.
