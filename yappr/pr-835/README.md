# yappr PR #835 — W5 notifications / explore / trending polish

- **Before:** exact base `ac1975fcffda3df089d58fd28519b83fcbfb126c` (origin/staging when the branch was cut).
- **After:** `1c05bd45` / `e25ac04d` (the PR's two commits before rebase). The rebased head `8387b71a` carries the same W5 diff (range-diff identical apart from the blog copy that #825 had already landed).
- **Build:** `next dev` with `.env.staging` and `BASE_PATH=/staging` (testnet, staging contracts), dark theme, deviceScaleFactor 2.
- **Fixture:** signed in as testnet persona 30 (`ypstage26-030.dash`, `39PErAgLUdHw3ouz3ypqCiEty5TVgJzWmhrKy69pLrkk`).
  - Persona 31 followed it and replied to its post.
  - It follows Staging 17's "Shavings" blog.
  - Live testnet data: counts and the QA reply from Staging 76 vary slightly between captures.
- **Widths:** desktop 1280×900, mid 1060×900 (narrow centre column next to both rails, as in the owner's screenshot), narrow 390×844.

| File | Shows |
|---|---|
| notifications-mid | The tabs that ran together ("LikesRepostsReplies") are now spaced and scroll; the tab dots no longer stick to the next label; rows put time and unread dot on the avatar line, so "published a new blog post" no longer wraps "post 1d" |
| notifications-narrow | The mobile filter dropdown is replaced by the same scrollable tabs; the row layout is the same as at mid width |
| explore-trending-desktop | "24h" becomes "Recent"; the tabs have no icons; the right-rail Trending box (whose "Show more" pointed back at this page) is hidden on Explore |
| explore-trending-narrow | The tabs fit at 390px, "Blog Posts" becomes "Blogs", and "24h" becomes "Recent" |
| hashtag-top-narrow | The second pill row ("24h / All time") is folded into the Latest/Top row as "Recent / All time" |
| after/feed-top-desktop | Home: Latest/Top with "Recent / All time" inline; the right rail on any page other than Explore still has "Show more" |
