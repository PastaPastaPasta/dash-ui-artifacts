# Reader and embed QA evidence plan

Frozen source/build: cf0efbc10b8757137063113ebbd2061e8b87d8f7, `/Users/pasta/.t3/worktrees/yappr/qa-staging-cf0efbc1/out`, served at http://127.0.0.1:3288/devnet. Confirmed process command references that output and worktree HEAD matches. Normal guest UI and scoped read-only persona65 sessions; no public product writes.

| Claim | State | Fixture | Intended evidence |
|---|---|---|---|
| Reader font/palette choices change content, persist, reset | Four font sizes, Author/Light/Dark/Sepia | existing embed article | computed styles plus selected overview captures |
| Reader popover keyboard and mobile usability | Escape/Tab/focus and 320/390 | same | event assertions and mobile screenshot if issue |
| App theme restored when leaving reader | preexisting app theme then reader then Blogs | same | actual storage/document state observations |
| Embed dialog theme, copy, close and mobile reachability | light/dark, clipboard, Escape/backdrop, 320/390 short viewport | same | exact clipboard comparison and screenshot/bounds |
| Embed route error/owner/theme variants | matching/absent/wrong owner, missing/nonexistent post, unsupported theme | known post and ordinary valid-shaped unknown ID | visible text, footer href, theme state |
| Broken blog/article links and navigation | nonexistent blog/slug and offline; ordinary back paths | existing lifecycle/embed blogs | visible recovery and mobile screenshot where needed |

These are single-revision QA captures, not before/after fix evidence. Any injected host page will be disclosed as a test harness; it does not replace product DOM.
