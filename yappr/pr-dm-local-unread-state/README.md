# QA93: local DM read state with receipts disabled

Before: `cf0efbc10b8757137063113ebbd2061e8b87d8f7` (frozen staging base), independently built and served at port 3288. After: full PR head `204e337b3b6a9e12c696ab22b5d56f91f01c161f`, built after the signed commit and served at port 3296. Both use `/devnet`, a production static export, Chromium, light theme, and a 1440×1000 recipient viewport. Source worktrees were clean at capture.

The same real incoming message `QA93 review read without receipts 1789534961654` and conversation were used in independent disposable browser contexts. Recipient: Nils Mahoney, `BBXcGMZay7ZN6r71CK14VaGxwDn6CJCQcvFgrFpg8miz`; sender: Noor Brennan, `HMqf6LRJ4uxwjQqNYdJXrENQNFSuLbB91hfj7j8zy8P3`. The QA harness supplies dedicated identity sessions; this is not evidence of login correctness. Messages were sent and opened through ordinary UI. No response, notification, or read-state result was mocked.

| Surface | Before state | After state | Expected delta |
| --- | --- | --- | --- |
| Opened conversation | Receipts off, message opened | Same message and preference | Both clear the badge |
| Inbox after full reload | Same browser rereads inbox | Same browser rereads inbox | Base restores unread 1; head retains read state |
| New incoming message | Compatibility check on head | New real message after local read | New message still increments unread 1 |
| Sender receipt | Receipts off, then enabled for a new message | Actual public receipt readback | No write while disabled; normal update when enabled |

## After reading, then reloading

| Before — exact base | After — full PR head |
| --- | --- |
| ![Base restores an unread badge of 1](before/reloaded-focused.png) | ![Head keeps the read conversation clear](after/reloaded-focused.png) |
| [Full-resolution overview](before/reloaded.png) | [Full-resolution overview](after/reloaded.png) |

Focused images are unannotated crops of `(x275,y40,width400,height235)` from the original overviews. Both recipient reload states show the same resolved Noor Brennan profile. The sender screenshots retain their observed participant-ID fallback; profile hydration is unchanged by this PR.

## Both versions opened the message before reload

| Before — exact base | After — full PR head |
| --- | --- |
| ![Base conversation opened and badge clear](before/opened.png) | ![Head conversation opened and badge clear](after/opened.png) |

## Additional live checks

![A later incoming message still becomes unread on head](after/new-incoming.png)

The sender stayed on the base revision at 1280×900 for both compatibility checks. With receipts disabled, the new message has no Read indicator; the older QA136 message retains its earlier receipt:

![Sender with receipts disabled](sender-receipts-off.png)

After enabling receipts and opening a newly sent message, the fresh sender thread shows Read on that new message:

![Sender with receipts enabled](sender-receipts-on.png)

Read-only SDK queries independently verified receipt `Gy21nqRZ66zuH6eA7UrWzbUQmAYKzRhmrFZJJ8fpVHg` remained at `$updatedAt=1789534954683` after the disabled-receipt comparison; after enabling receipts and opening the third QA93 message it advanced to `1789534995753`. Full public identifiers and assertions are in [result.json](result.json).

## Validation and limits

Two service regression cases failed against the unchanged base integration; all 13 focused service/storage tests pass on head. Type checking, full lint, and production build pass. Independent source review approved. The local history is bounded to 1,000 confirmed incoming message IDs per deployment, DM contract, viewer, and conversation; no cross-device persistence is claimed. Corrupt/unavailable storage, independent scopes, own/optimistic messages, and equal message timestamps are covered by unit tests rather than screenshots.

All nine final PNGs were opened and visually inspected at original resolution, including both crops. No keys, seed phrases, authentication state, or populated secret inputs are included. Disposable browser contexts were closed. Three dedicated QA93 messages remain because ordinary DM deletion is not available; preferences were restored in the head context before disposal. Nine earlier dedicated QA messages remain visible and unchanged.

## Review correction and superseded evidence

This full-head comparison supersedes artifact `7dfc07fc56e3abe0be971def63509a9e11b1340c`, which covered the earlier implementation. Review found that insertion-order eviction could discard recent read IDs when older conversation history was replayed. The final implementation stores the Platform creation time beside each ID and uses it only to keep the newest 1,000 records. Unread status still uses exact ID membership, preserving distinct messages that share a timestamp; it never uses the device clock or a read-time watermark.

The historical replay regression failed before the correction. The final suite includes older page replay, arrival of a newer message, and the inbox service consuming the latest 100 records after historical replay. These bounded-history cases use controlled in-memory SDK fixtures, not thousands of live network writes. The browser comparison above is a new real three-message run against the final head. The unpublished candidate storage format is not claimed as a production migration.
