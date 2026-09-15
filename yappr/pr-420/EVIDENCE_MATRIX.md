# Script embed navigation comparison

Before — exact stacked PR base / PR417 head: `5ca005cafe8111fcee1b37aebec212f53421fd0f`, independently built production devnet export on localhost:4184. This is the deployment-path fix, NOT the staging revision before PR417.
After — full navigation PR head: `70573048d3aeeb39d8f5490ada75037dfae18c18`, independently built production devnet export on localhost:4186.

Shared real persisted fixture: post `5cY37VaxiKxBnprHfXG11Nx37eDv6Jb8RHYDMCmWWi8G`, owner `H4P7NB1JNJ3B9LRpPixi3sUs7qhN5w9xs9YbQSBFh8Z1`, blog `BkqjYQ95Mm2vNGEaoKbE473jodp7ZPFQr1Mj3jmqw6wA`, title **QA embed navigation 20260915**. Created through the normal editor, read directly through the actual SDK. No fabricated product DOM or data responses.

| Surface | Shared action | Expected delta |
| --- | --- | --- |
| External host with real product script and script-created iframe | Load actual devnet post in an otherwise static external host fixture | Same populated embed appears before and after. Compatibility check. |
| View on Yappr link | Normal click inside the generated iframe | Before the host stays unchanged; after the host tab opens the full article with DEVNET banner. |

The external HTML host is a disclosed test fixture served at a different origin (`127.0.0.1:4185`) from the product app (`localhost:4184` / `localhost:4186`). Its only code is a normal div + real product embed.js script tag. Both runs use fresh signed-out contexts, Chromium, 1440×1000, 1×, en-US, America/Chicago, light global preference and light embed; the blog's own dark theme remains unchanged. Only the app server port/revision differs. Record link and top-frame destinations alongside console output. No broader sandbox behavior is probed.
