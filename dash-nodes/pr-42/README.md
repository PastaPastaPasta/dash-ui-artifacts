# dash-nodes PR #42: SDK download note

- Before: exact base `24410219214d630e34dc3574cc52af7827f4a4e5` (origin/main), `web/assets/mn.js` and `web/assets/platform-live.js` from that commit.
- After: full PR head `ddfa87a601c51186369b5448feaf07325903243b`, same two files from that commit.
- Fixture: the live https://nodes.dashhq.org testnet evonode page `/mn/05b687978344fa2433b2aa99d41f643e2d8581a789cdc23084889ceca5244ea8?net=testnet`. Headless Chromium, 1100x900, light theme. Playwright serves the two files from each revision. The SDK request is held so the loading state stays on screen. `button` uses an emulated `saveData` so the page shows the "Check live" button instead of starting on its own.
- Visible delta: "a 9 MB download" becomes "an 11 MB download" (5.1.0 bundle: 15,048,880 bytes, 10.9 MB gzipped).
