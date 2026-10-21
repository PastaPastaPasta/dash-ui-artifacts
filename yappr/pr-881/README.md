# yappr PR #881: overlay one-frame flash

PR: https://github.com/PastaPastaPasta/yappr/pull/881

## Provenance

- **Before:** `c4ba6c43c41fad6bbb7eaec4a28929b74ae86229`, the `staging` tip and PR base. framer-motion 11.18.2.
- **After:** `744609be1e21bcb7de7771868f26b3a5cdd537c9`, the PR head. framer-motion 12.43.0.
- **Build:** both are `npm run build:staging` bundles served locally under `/staging/`. Each has one extra uncommitted line in `lib/store.ts` that exposes the app store as `window.__flashStore`. That is how compose is opened while signed out. Product code is otherwise exactly the revision above.
- **Browser:** headed Brave on macOS (ProMotion display), with a fresh profile per run. The window was 1100x860 for desktop and 420x860 for mobile, in the default light theme.
- **Capture:** CDP `Page.startScreencast` (every compositor frame, JPEG). Per-frame mean luma is ffmpeg `signalstats` YAVG.
- **Procedure:** each run opens the overlay 6 times. Each open is held 1.3 s, closed (Escape, or "Close menu" for the sheet), then followed by a 1.1 s wait.
- **Spike definition:** a frame that overshoots both neighbours in the same direction by more than 2 luma, and by more than the neighbours differ from each other. A monotonic fade never qualifies.

## Results

| Overlay | Before spikes | After spikes |
|---|---|---|
| Sign-in dialog (desktop) | 9 | 0 |
| Compose | 8 | 0 |
| Sign-in dialog (mobile) | 8 | 0 |
| Mobile menu sheet (CSS transition, no framer) | 0 | 0 |

In the "after" traces each run has exactly 6 dark episodes, one per open, so every open and close happened.

The live staging run (`traces/before-live-staging-*`, https://yap.pr/staging/, before) had 7 screencast spikes and 10 spikes in a display-region capture (avfoundation, about 90 fps effective).

## Files

- `luma-*.png`: the per-frame luma traces, before above and after below.
- `comparison/before/*-open.png`, `*-close.png`: three consecutive frames at the end of the open and close fades. The middle frame is the flash.
- `comparison/after/*`: the same moment on the PR head.
- `traces/*.txt`: raw per-frame luma (`seconds luma frame-file`), with the spikes listed at the end.

## Live check after merge

Live https://yap.pr/staging/ was serving build id `6e77fcb`, the merge commit. The same headed Brave procedure, 6 opens per overlay, gave these results:

| Overlay | Live before (`traces/before-live-staging-*`) | Live after (`traces/live-after-*`) |
|---|---|---|
| Sign-in dialog (desktop) | 7 screencast spikes | 0 |
| Sign-in dialog (mobile) | not captured | 0 |
| Mobile menu sheet | not captured | 0 |

In every live run, each open produced exactly one dark episode. `live/*.png` shows three consecutive frames at the end of the open and close fades. Live staging showed "0 posts" at that time because its data was empty. That is unrelated to this PR.
