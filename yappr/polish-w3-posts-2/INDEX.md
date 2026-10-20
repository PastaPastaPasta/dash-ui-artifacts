# W3 PR 2 (compose/posts follow-ups): visual evidence

- Before: `d5829da5`, the head of PR #826, whose tree is what #826 merged into staging. The PR's actual base is `0f50f6f8` (staging = #824 + #826); #824 only touches sign-in surfaces, none of the ones shown here.
- After: PR head `1db306e8`.
- Both were served with `next dev` and `.env.staging` against live testnet staging, signed in as persona 24 (`44Rn4rFG3D8zeZSEmPu3TSscS3c4KWzCwYhEmyqJ5RAX`). Viewports were 1280×900 and 390×844, DPR 2.

| File | Shows |
|---|---|
| mention-* | Typing "@ypstage26-07" in the composer. Before: suggestions clipped by the modal. After: a portaled popover, fully visible. |
| reply-* | The reply composer. After: the parent post shows above the editor, with its header on one line. |
| storage-* | The image-upload prompt. Before: "Connect a Storage Provider … IPFS". After: "Set up image uploads". |
| bookmarks-* | The bookmarks header. After: no separator dot. |
| report-* | After only: the post report dialog with no fee line and the short description. |
| reply-filled-desktop / reply-posting-desktop / reply-count-card | After only: a real testnet reply from persona 24 to its own post `EdE8SFYczXWGn4pWffQKzwUzA4fE1fNQ6PnxmmBaMa8C`. The mention was picked with ArrowDown+Enter, the button showed "Posting", and the card's count went 2 → 3 without a reload. |
