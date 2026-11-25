Bench and proof tools for PastaPastaPasta/dash-sites (dash.site), kept here so they don't exist on just one machine.
- Cold load: `tools/coldphases.mjs` through `tools/throttle.mjs` (a CONNECT proxy: port, bytes/s, RTT ms; 6250000 = 50 Mbit), run on a boat sandbox via `tools/inner*.sh` (base64-embedded).
- Warm repeat visits: `tools/warm.mjs` (persistent profile: cold, warm1, warm2) via `v6/warmbench.sh`. Before/after for #23 are in `v6/warm-before.txt` and `v6/warm-after.txt`.
- IPv4/IPv6 parity: `v6/v6check.sh` (bodies and headers) and `v6/cachecheck.sh` (Cache-Control per path). Run them on boat: agentbox has no IPv6.
- Screenshots: `tools/shots-theme.mjs` (light/dark, desktop/phone), `tools/hardreload.mjs`, `v6/hardreload-boat.mjs`.
