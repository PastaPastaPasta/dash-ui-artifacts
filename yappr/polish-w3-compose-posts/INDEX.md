# W3 compose + posts: visual evidence

- Before: exact base `ac1975fcffda3df089d58fd28519b83fcbfb126c` (origin/staging), exported with `git archive`.
- After: PR head `d5829da5` (branch `polish/w3-compose-posts`).
- Both were served with `next dev`, using `.env.staging`, `BASE_PATH=/staging` and `YAPPR_STAGING_REHEARSAL=1`, against live testnet staging contracts.
- Viewer: persona 24 (`44Rn4rFG3D8zeZSEmPu3TSscS3c4KWzCwYhEmyqJ5RAX`), signed in with its HIGH auth key. Light theme, DPR 2.
- Widths: desktop is 1280×900; narrow is 390×844.
- Private post used: `8tJioUo1zLJYMsSTLMx9WRF5FiH2iZaHeSqo6kQ8utFZ` (Maya Chen, "Coffee notes for friends."). Persona 24 can't read it.

| File | Shows |
|---|---|
| compose-* | The new-post composer. The fee/YAPP line is gone, and the Post button is plain text with no send glyph. "Markdown supported" is gone. |
| reply-* | The reply composer. The fee line is gone and the placeholder reads "Post your reply". |
| private-menu-* | The "…" menu on an unreadable private post. After: it has "Hide private posts I can't see". |
| private-card-* | The locked private card. After: no duplicate header lock, and the name is no longer truncated at narrow width. |
| after-hide-feed-* | After only: the feed once Hide is chosen. No locked private posts remain, and an Undo toast shows. |
| settings-account-* | Before: the "Pay for posts with" select. After: a "Pay with YAPP when you can" switch. |
| settings-privacy-* | After: the new "Hide private posts you can't see" switch, which is on following the menu action. |

## Layout shift (private card height, px, from first paint to settled)

| | loading | locked |
|---|---|---|
| Before (ac1975fc) | 231 | 171 |
| After (d5829da5) | 171 | 171 |

These numbers are the same at 1280 and 390 widths, for all 8 private posts in the feed. They were measured by polling `getBoundingClientRect` every 50 ms for 60 s.
