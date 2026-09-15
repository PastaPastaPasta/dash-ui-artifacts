# Embed deployment-path comparison

Before: exact staging `4105c5d1c914f5d0838619da93c3b8d28b4a780e`, independently built production devnet export on localhost:3211.
After: full PR head `5ca005cafe8111fcee1b37aebec212f53421fd0f`, independently built production devnet export on localhost:4184.

Same persisted devnet fixture in both runs:
- Blog `BkqjYQ95Mm2vNGEaoKbE473jodp7ZPFQr1Mj3jmqw6wA`
- Post `5cY37VaxiKxBnprHfXG11Nx37eDv6Jb8RHYDMCmWWi8G`
- Owner `H4P7NB1JNJ3B9LRpPixi3sUs7qhN5w9xs9YbQSBFh8Z1` (`ike-park7`)
- Title `QA embed navigation 20260915`
- Slug `qa-embed-navigation-20260915`

| Surface | Shared action | Expected visible delta |
| --- | --- | --- |
| Embed dialog | Open More actions → Embed from the real saved article | Both generated URLs include `/devnet` after; before both point to site root. |
| Populated embed | Open actual saved post by ID | Same article renders in both; compatibility check, no invented visual difference. |
| Footer destination | Click View on Yappr | Before escapes to root `/blog` (404 on this isolated local export); after opens the same article under `/devnet/blog` with devnet banner. |

Chromium, 1440×1000, 1×, light browser/global theme preference (the saved blog retains its own dark theme), en-US, America/Chicago, fresh signed-out contexts. No SDK mocks, DOM reconstruction, capture-only product routes, or synthetic blog responses. The article was created through the normal blog editor and verified through a fresh signed-out read. A separate live check of the baseline footer reached `https://yap.pr/blog/` and showed TESTNET plus Blog not found; the exact-revision pair uses isolated local exports to control source provenance.
