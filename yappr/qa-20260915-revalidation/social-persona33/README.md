# Social write QA — persona33

All tested paths passed on exact staging `4105c5d1c914f5d0838619da93c3b8d28b4a780e`, independently built and served at `http://127.0.0.1:3211/devnet/`. This is normal use of the production application against live devnet, with provisioned QA personas. No application UI was fabricated or mocked.

Actor: `6XrmCbPVLPWyda1fRTeFNZ9xhx8tdPH5rkNmtG9FWqek` (`cats-eitan6`). Target: `sNnNFK4vrjhy6nPYpj2FSUhREY8CRG3QZscn61nXhAg` (`jimenez-votes5`). Root post: `9mcdDNznWP86bScjmMykF1kzNpecneoFoZVVNAB5qCFd`.

| Story | Result | Evidence |
|---|---|---|
| Publish reply and read it after a new browser session | PASS; reply `Fm49xnhGoKheyBWKPn2KuzgeMwwuVDPgd61MRznovZg4` visible and independently read from Platform | `reply-fresh-readback.png`, `after-unfollow.json` |
| Repost and read state in a new browser session | PASS; count 1 and Undo Repost action | `repost-fresh-readback.png` |
| Undo repost and read state in a new browser session | PASS; no count, Repost action, Platform repost count0 | `undo-repost-fresh-readback.png`, `after-unfollow.json` |
| Follow target and read own Following list | PASS; target present, Platform follow document `CL5jkCc8mn1ycP499pUrufSYnM2udf8GKy1CB4Fz5BUC` | `follow-own-list.png`, `after-follow.json` |
| Read target Followers list in another fresh session | PASS; actor present | `follow-target-list.png` |
| Unfollow and read both lists from fresh sessions | PASS; both rows absent, Platform follow count0 | `unfollow-own-list.png`, `unfollow-target-list.png`, `after-unfollow.json` |

The initial relationship and repost states were both absent and were restored. The clearly labeled QA reply remains. All authoritative images listed in `provenance.json` were opened and inspected at original resolution. Do not publish `reply-before-submit.png`: it was captured during an animation and is excluded. Final unfollow images were recaptured with read-only navigation after profile names resolved; the actor/target and final relationship state were unchanged. Live global statistics may differ. The intermediate repost document ID was not collected before undo; do not claim independent intermediate SDK verification for that one step.

`reply-repost-browser.json` and `follow-browser.json` record normal interaction steps. `initial.json`, `after-follow.json`, and `after-unfollow.json` contain public SDK readbacks. `read-state.mjs` is a read-only probe; no private key material is included in this directory. No confirmed feature defect was found in these specific paths.
