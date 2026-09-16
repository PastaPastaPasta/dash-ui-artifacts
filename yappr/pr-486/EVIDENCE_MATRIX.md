# QA85 evidence matrix

| Surface | Before | After | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Reset Private Feed after keyboard Escape | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | f612ec3b8720385ee8cbbc7cbd0166b701b59d98 | Persona39 9NFhqxW8upkFMVTE5h5VmYWLdSEJ26B2iMKdhCFgsWkd; enabled private feed; empty reset form; normal key2 WIF login | Before focus falls to BODY with no focus ring. After original Reset Private Feed button regains native blue focus ring and Enter reopens. |

Independent production devnet builds, fresh Chromium contexts, 1440×1200, scale 1, en-US, America/Chicago, light theme. Frozen base served on 3288, fix on 3295. Capture overview plus unmodified focused crop. No CSS or DOM modifications. Exact head verified from About. No encryption key entered; no reset confirmation; no network writes. Screenshot guard rejects populated credential/password fields. Escape, Cancel, Close, overlay dismissal, Tab containment and nested key recovery are procedural compatibility checks; no fabricated visual difference.

Shared feed backdrop at capture: epoch 2, 0 private followers, 1 residual request from another coordinated QA cycle. Both comparison sides use this same stable state. This supersedes the unpublished epoch 1 / pending 0 pair taken before rebase. Focus QA performs no writes.

Both local servers strip the /devnet prefix for exported pages and also serve root public assets. The head-only capture with a missing footer logo from a stricter server mapping was discarded before publication.
