# PR506 R7 exact stack comparison

Before: full #494 head b859758af3926c76fba47a5dd149ff30ce8b7a5c (`fix/create-blog-focus-return`). After: full rebased #506 head40dfb424fe6f7314af6bb2e359e9d4195798263f. Separate committed devnet builds on3316/3317; verify About hashes before test. This supersedes the old cf0/e186 comparison after restacking.

| Surface | Before | After |
|---|---|---|
|320×700 Create Blog | Centered dialog extends above/below screen; wheel cannot reach footer | Entire panel fits with internal scroll; footer reachable |
|700×320 landscape | Header/footer outside viewport | Scrollable panel fits; focus follows tabs into view |
|1280×900 desktop | Existing full dialog | Same full dialog |

Same QA owner64 existing blogs/main11articles; empty local creation form, no submissions. Seeded sessions are not login evidence. Light Chromium, no provider credentials. Capture top/bottom after settling; ensure labels/controls visible or intentionally demonstrate clipping. Verify 24 Tab/Shift+Tab steps remain inside and on-screen after; Cancel/Escape/X/backdrop restores opener; no new blogs or uploads. Before has494focusfix already, so focus restoration is compatibility, not a fabricated delta. Final originals/public bytes/type/hash/rendered comparison must be inspected.
