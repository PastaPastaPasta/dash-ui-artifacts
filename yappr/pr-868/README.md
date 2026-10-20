# yappr PR #868: Explore flicker and classic-scrollbar jiggle

- **Before:** live https://yap.pr/devnet and https://yap.pr/staging, base staging `cc3f44c2`.
- **After:** a `npm run build:staging` static build of the PR head before rebase (`ad1c57bf`), served locally. The rebased head `3cf245a3` carries the same diff on top of later staging merges.
- **Data:** testnet staging contracts. Explore was captured logged out. The other-tabs probe signed in as test persona 30.

| File | What it shows |
|---|---|
| `*/explore-tabs-classic-scrollbars.mp4` | Chromium (new headless) with a forced classic 15px scrollbar. Hard load, then the first visit and a revisit to Top, Creators, Blogs and Trending, then the sign-in dialog opened and closed. |
| `*/to-creators-frames.png` | Six frames, 50 ms apart, right after switching back to Creators. Before: the old panel fades out, the panel goes blank, then "Loading top creators..." shows, then the list. After: the list is shown at once. |
| `*/width-probe-{chromium,webkit}.txt` | `documentElement.clientWidth` and `<main>` x and width, sampled every 30 ms per action. Before: `<main>` width flips 640↔655 on first loads and on every Creators visit. After: constant. The clientWidth change while the dialog is open comes from the scroll lock, which pads the body by the same width, so `<main>` doesn't move. |
| `*/explore-frame-burst.json` | 16 frames per revisit switch. Each value is lowest panel opacity / visible skeleton bars / rows. Before: dips to 0.08–0.17. After: 1.00 throughout. |
| `before/other-tabs-probe.json`, `after/notifications-probe.json`, `after/feed-hashtag-probe.json` | Revisit probes on notifications filters, home Latest/Top, the tag page, blog and store. Each value is lowest opacity in `<main>` / visible placeholders / visible posts. |
